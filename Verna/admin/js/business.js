document.write("<?php session_start(); require_once('../login/common.php'); require_authentication(1); ?>");
var IS_PAYPAL_ENABLED = 1;

/*var IS_BUSINESS_LIMIT = 2;
var IS_BUSINESS_START = 0;
var IS_BUSINESS_LIMIT_FIXED = 6;
var IS_BUSINESS_COUNT = 1;*/
var bPopup = '';



<!--%PRODUCT OPTION%-->
var max_rank=0;
var choice1=0;
var choice_number=0;
var choice_delete_array=new Array();
var choice_number_array=new Array();
var e=0;
var rank=0;
var set_id=0;
var option_choice=0;
var total_options=0;
var choice_data=[];
var choice=[];
var gaint_choice_array=new Array();
var old_gaint_choice_array=new Array();
var choice_count=0;
var ids=Array();
var new_gaint_array=new Array();
<!--%PRODUCT OPTION%-->

var Business = {
    Main: function () {
		
    	$('#activeoff').removeClass("active");
    	
       Main.GetAllBusinessDataFilter("Business.PrintMain()")
       
    },
    PrintMain: function () {

        for (var f in Main.AllBusiness) {
            Main.AllBusiness[f].cname = Main.AllBusiness[f].city.name;
            Main.AllBusiness[f].pname = Main.AllBusiness[f].provider.name
        }
        
        var g = "";
     
        
        g += '<div class="row">'
        g += '<div class="top-bar">'
        g += '<div class=" col-md-4 col-md-offset-8">'
        g += '<div class="row">'
        g += '<div class="col-md-8" id="searchbox"><input type="text" id="bsearch" class="form-control rounded" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>"></div>'
        g += '<div class="col-md-2 topbar-search-div"><button class="btn btn-default btn-rounded-lg close-btn" onclick="Business.New()"><i class="fa icon-plus"></i> <?= $lang_resource['BUSINESS_ADD'] ?></button></div>'
        g += '</div>'
        <!--row-->
        g += '</div>'
        <!--col-md-5-->
        g += '</div>'
        <!--top-bar-->
        g += '</div>'
        <!--row-->
		
        g += '<div  id="business"></div>'
        
		/*<!-- For Pagination -->
        if(Main.AllBusiness[0]){
        var pag = Main.AllBusiness[0].length;
        var pagination =parseInt( pag / IS_BUSINESS_LIMIT_FIXED);
        if(pag % IS_BUSINESS_LIMIT_FIXED !=0){
          pagination = pagination + 1;
        }
        var cl = '';
        g += '<div class="row">'
        g += '<div class="col-md-6 col-md-offset-6">'
        g += '<ul class="pagination danger pull-right" id="paginationbusiness" >'
        if(IS_BUSINESS_COUNT == 1){
         var cld ='class="disabled"';
        }else{
         var cld ='';
        }
        g += '<li><a href="javascript:Business.Business_more(1)">&laquo;</a></li>'
        g += '<li '+cld+'><a href="javascript:Business.Business_prev()">&lsaquo;</a></li>'
        for(var i=1;i<=pagination; i++){
       
        if(IS_BUSINESS_COUNT == i){
            var cl ='class="active"';
        }else{
             var cl = '';
        }
        g += '<li '+cl+'><a href="javascript:Business.Business_more('+i+')">'+i+'</a></li>'
        }
        if(IS_BUSINESS_COUNT == pagination){
         var clpd ='class="disabled"';
        }else{
         var clpd ='';
        }
        g += '<li '+clpd+'><a href="javascript:Business.Business_next()">&rsaquo;</a></li>'
        g += '<li><a href="javascript:Business.Business_more('+pagination+')">&raquo;</a></li>'
        g += '</ul>'
        g += '</div>'
        <!--col-md-6-->
        g += '</div>'
        <!--row-->
        <!-- For Pagination -->
        }else{
        g += '<div class="col-md-12">'
        g += '<div class="the-box">'
        g += '<div class="clearfix" style="padding:5px 0">'
        g +='<p class="text-center">No Records of Business </p>'
        g += '</div></div></div>'
        }*/
        
        
        document.getElementById("main").innerHTML = g;


        document.getElementById("bsearch").onkeyup = function () {
            Business.PupulateTable(Main.Config.Business.List.SortBy, true)
        };
        Business.PupulateTable(Main.Config.Business.List.SortBy, true)
    },
    
    <!--For Pagination -->
    Business_next: function(){
    	IS_BUSINESS_START = IS_BUSINESS_START + IS_BUSINESS_LIMIT_FIXED;
       
        IS_BUSINESS_COUNT = IS_BUSINESS_COUNT + 1;
       Main.GetAllBusinessDataFilter("Business.PrintMain()",IS_BUSINESS_LIMIT_FIXED,IS_BUSINESS_START)
    },
    Business_prev: function(){
    	IS_BUSINESS_START = IS_BUSINESS_START - IS_BUSINESS_LIMIT_FIXED;
        
        IS_BUSINESS_COUNT = IS_BUSINESS_COUNT - 1;
      Main.GetAllBusinessDataFilter("Business.PrintMain()",IS_BUSINESS_LIMIT_FIXED,IS_BUSINESS_START)
    },
    Business_more: function(val){
    
    	IS_BUSINESS_LIMIT = val * IS_BUSINESS_LIMIT_FIXED;
        IS_BUSINESS_START = IS_BUSINESS_LIMIT - IS_BUSINESS_LIMIT_FIXED;
        
        IS_BUSINESS_COUNT = val;
      Main.GetAllBusinessDataFilter("Business.PrintMain()",IS_BUSINESS_LIMIT_FIXED,IS_BUSINESS_START)
    
    },
    <!--For Pagination -->
    PupulateTable: function (t, r) {
           
        var q = "";
        var s = Main.AllBusiness.length;
        
        if (r) {
            Main.AllBusiness.sort(Main.SortByProperty(t));
            if (Main.Config.Business.List.SortByStatus == "max") {
                Main.AllBusiness.reverse()
            }
        } else {
            if (Main.Config.Business.List.SortBy != t) {
                Main.AllBusiness.sort(Main.SortByProperty(t));
                Main.Config.Business.List.SortByStatus = "min"
            } else {
                Main.AllBusiness.reverse();
                if (Main.Config.Business.List.SortByStatus == "min") {
                    Main.Config.Business.List.SortByStatus = "max"
                } else {
                    Main.Config.Business.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Business.List.SortBy = t;
        if (!r) {
            Main.SaveConfig()
        }
        var m = false;
        var o = "";
        var i = new Array();
        
        var cnt =0;
        var cocnt =0;

        for (var p in Main.AllBusiness) {
            m = false;
            o = document.getElementById("bsearch").value.toLowerCase();
            if (String(Main.AllBusiness[p].id).toLowerCase().indexOf(o) >= 0 || Main.AllBusiness[p].name.toLowerCase().indexOf(o) >= 0 || Main.NullToEmpty(Main.AllBusiness[p].city.name).toLowerCase().indexOf(o) >= 0 || (Main.NullToEmpty(Main.AllBusiness[p].provider.name) + " " + Main.NullToEmpty(Main.AllBusiness[p].provider.lastname) + " " + Main.NullToEmpty(Main.AllBusiness[p].provider.lastname2)).toLowerCase().indexOf(o) >= 0) {
                m = true;
                
                i.push(Main.AllBusiness[p])
            }
          
            if (m) {


                     <!--%PRODUCT OPTION%-->
                var switc=0;
                if(Main.NullToEmpty(Main.AllBusiness[p].is_active)== '3')
                {

                    //q += '<div class="default row' + l + '" style="border-bottom:1px solid #e4e4e4; background-color: #adff2f;">';
                }
                else      {
                <!--%PRODUCT OPTION%-->

                //q += '<div class="default row' + l + '" style="border-bottom:1px solid #e4e4e4;">';
                }
            
          
              if(cnt % 3 == 0){  
               q += '<div class="row">'
               }
               cnt ++;
               
               q += '<div class="col-sm-4">'
               q += '<div class="business-box">'
               q += '<div class="the-box text-center business-inner-box">'
               


if (Main.User.level == 0) {
	
                    var chkd ='';
					
                     if(Main.AllBusiness[p].ispopular =='t'){
                         chkd ='checked=""';
                         chkval='false';
                     }
                     else
                     {
						 	
                         chkd ='';
                         chkval='true';
                      }
 q += '<div class="pull-left">'
                       q += '<div class="pull-left">'
                       q += '<input type="checkbox" id="reorder'+ Main.AllBusiness[p].id +'" class="switch checkbox_2 hand" onclick="Business.Popular(' + Main.AllBusiness[p].id + ', '+chkval+')" '+chkd+' >'
                       q += '<label for="reorder'+ Main.AllBusiness[p].id +'">&nbsp;</label>Popular</div>'
                       q += '</div>'
                }
               
               q += '<div class=" pull-right">'
               q += '<div class="open_dv" id="switchbu_'+ Main.AllBusiness[p].id+'"></div>'
          
               <!--open_dv-->
               q += '</div>'
               q += '<div class="clearfix"></div>'
               
               q += '<div class="full store-item text-center" >'
               if(Main.AllBusiness[p].isimg ==1){
      				bg = "../panel/images/business/" + Main.NullToEmpty(Main.AllBusiness[p].id) + "/panel.jpg?c=" + new Date().getTime();
               } else  {
                   bg = "images/business/default-restaurant.jpg"
               }

          
               q += '<img src="'+bg+'" class="item-image" alt="Image" onclick="Business.Edit(' + Main.AllBusiness[p].id + ')" style="cursor:pointer;">'
               q += '<div class="no-margin no-border item-des">'
               q += '<p class=" business-name"><strong>'+ Main.TitleCase(Main.AllBusiness[p].name)+'</strong></p>'
               if (Main.User.level == 0) {
               q += '<h4 class=" business-address">'+ Main.NullToEmpty(Main.AllBusiness[p].city.name) +'</h4>'
               }else{
               q += '<h4 class=" business-address">'+ Main.NullToEmpty(Main.AllBusiness[p].city.name) +'</h4>'
               }
               q += '<div class="row">'
               q += '<div class="col-md-4 business-btn-dv">'
               q += '<button class="btn btn-warning btn-block" onclick="Business.Edit(' + Main.AllBusiness[p].id + ')"><i class="fa icon-edit"></i><?= $lang_resource['BUSINESS_EDIT'] ?></button>'
               q += '</div>'
               <!--col-md-4-->
               q += '<div class="col-md-4 business-btn-dv">'
               q += '<button class="btn btn-success btn-block" onclick="Business.Copy(' + Main.AllBusiness[p].id + ')"><i class="fa icon-copy3"></i><?= $lang_resource['BUSINESS_COPY'] ?></button>'
               q += '</div>'
               <!--col-md-4-->
               q += '<div class="col-md-4 business-btn-dv">'
               q += '<button class="btn btn-danger btn-block" onclick="Business.Delete(' + Main.AllBusiness[p].id + ')"><i class="fa icon-close2"></i><?= $lang_resource['BUSINESS_DELETE'] ?></button>'
               q += '</div>'
               <!--col-md-4-->
               q += '</div>'
               <!--row-->
			   
			   q += '<div class="row">'
			   q += '<div class="col-md-12 business-btn-dv">'
               q += '<button class="btn btn-default btn-block invoice_btn" onclick="InvoiceSettings.Main(' + Main.AllBusiness[p].id + ')"><?= $lang_resource['ADMIN_PAGE_INVOICE_SETTINGS'] ?></button>'
			   q += '</div>'
			   <!--col-md-8-->
               q += '</div>'
			   <!--row-->
			   
               q += '</div>'
               q += '</div>'
               q += '</div>'
               <!-- /.the-box -->
               q += '</div>'
               <!--business-box-->
               q += '</div>'               
		       <!-- /.col-sm-4 -->
               
			   if(cnt % 3 == 0){  
			   q += '</div>' 
               }
            }else{
            	cocnt ++;
                
            }
            
           /* if(cocnt == s){
            	$("#paginationbusiness").hide();
               
            }else{
           		 $("#paginationbusiness").show();
            }*/
        }
        
        document.getElementById("business").innerHTML = q;
        
        
        Switch.Init();
        for (p in i) {
            delete n;
            if (i[p].enabled == "t") {               
                var n = true
            } else {
                var n = false                
            }

            Switch.Create("switchbu_" + i[p].id, n);
            Switch.OnChange("switchbu_" + i[p].id, function (a, b) {
            	
                Business.SetEnabled(a.replace("switchbu_", ""), b, "business")
            })
        }
    },
    SetEnabled: function (e, f, h) {
        Estr = "";
        if (f) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        var g;
        switch (h) {
        case "menu":
            g = "f=MenuSetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        case "dish":
            g = "f=DishSetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        case "extra":
            g = "f=ExtraSetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        case "business":
            g = "f=SetEnabled&id=" + e + "&enabled=" + Estr;
            break;
        default:
            return;
            break
        }
        $.post("lib/business.php", g, function (a) {
            if (a != "ok") {
                Switch.SwitchTo("switch_" + e, !f)
               <!--%PRODUCT OPTION%-->
                if(h == "business") {
                Business.Main();
                }
                <!--%PRODUCT OPTION%-->

            }
        })
    },
    New: function () {
        Business.Fromtype = 0;
        if(Business.id){
            delete Business.id;
        }
        if (Main.User.level < 2) {
            Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchTabSettings"},{"operation":"FetchAllFranchisesData"},{"operation":"FetchAllCategoriesData"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"2"}]}]', "Business.PreNew")
        } else {
            Main.BulkRequest('data=[{"operation":"FetchAllCategoriesData"},{"operation":"FetchTabSettings"}]', "Business.PreNew")
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
        Main.tabsettings = b.tab;
        
        this.Form()
    },
    Copy:function (b) {
	   
		$.fn.jAlert({
		'message': '<?= $lang_resource['ADMIN_PAGE_ARE_YOU_SURE_WANT_TO_COPY_THIS_BUSINESS'] ?>',
		'btn': [
			{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
                Main.Loading();
				$.post("lib/business_copy.php", "f=CopyBusiness&id=" +b, function (c) {
					Main.Ready();
				alert('Business Copied Successfully');
				Business.Main();
				});
			} },
			{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
		],
		'closeBtn': false
		
		});

    },
    Edit: function (g, f) {
        Business.Fromtype = 1;
		 Main.Ready();
        var h = false;
        if (g) {
            h = true;
            Visuals.ForceMainButtonCancelEvent = f;
            Business.ForceMainButtonEvent = f
        } else {
            var i = Main.GetMarkedCheckBoxesValues();
            if (i.length == 1) {
                g = i[0];
                h = true
            }
        } if (h) {
            var j = this;
          
            if (Main.User.level < 2) {
                Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchTabSettings"},{"operation":"FetchAllFranchisesData"},{"operation":"FetchBusinessData","id":"' + g + '"},{"operation":"FetchAllCategoriesData"},{"operation":"FetchAllUsersData","filters":[{"modifier":"user","name":"level","operator":"=","value":"2"}]}]', "Business.PreEdit")
            } else {
                Main.BulkRequest('data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchTabSettings"},{"operation":"FetchBusinessData","id":"' + g + '"},{"operation":"FetchAllCategoriesData"}]', "Business.PreEdit")
            }
        }
    },
    
    PreEdit: function (b) {
		
        if (b == "") {
            alert("Error")
        }
        b = JSON.parse(b);
        if (Main.User.level < 2) {
            Main.Franchises = b.franchises;
            this.Providers = b.users
        }
        this.Categories = b.categories;
        Main.Countries = b.countries;
		
		Main.BusinessHistory = b.business;
        Main.tabsettings = b.tab;
		
        this.Form(b.business)
    },
    Form: function (F) {
      
        var N = "";
        var P = new Array();
        for (var E in this.Categories) {
            P.push(this.Categories[E].name)
        }
		
        
        
        Business.DishesIds = null;
        Business.Dishes = null;
        Business.ExtrasIds = null;
        Business.Extras = null;
        Business.MenusIds = null;
        Business.Menus = null;
        Business.ExtrasDetails=null;
        Forms.Clean("business", "mainbuttonok");
        this.ActiveForm = "business";
        var M = false;
        if (F == null) {
            F = new Object();
            Forms.Form.business.type = "create"
            delete Business.Scheduletext;
            
        } else {
            Forms.Form.business.type = "modify";
			Business.id = F.id;
            Forms.Form.business.id = F.id;
            var C = JSON.parse(F.schedule);
            M = true
            Business.Scheduletext = JSON.parse(F.schedule);

        }

        Forms.CreateValue("business", "schedule", JSON.stringify(C));
        if( Forms.Form.business.type == "create"){
            Business.UpdateSchedule();
        }
        this.FormTab = "general";

        N += '<div class="row">'
        N += '<div class="top-bar">'
        N += '<div class=" col-md-2 col-md-offset-10">'
        N += '<div class=" pull-right"><button class="btn btn-default btn-rounded-lg close-btn" onclick="Business.Main()"><i class="fa icon-close"></i> <?= $lang_resource['BUSINESS_CANCEL'] ?></button></div>'
        N += '</div>'
        <!--col-md-5-->
        N += '</div>'
        <!--top-bar-->
        N += '</div>'
        <!--row-->

      
         N += '<div class="row">'
         N += '<div class="col-md-12">'
         N += '<div class="the-box">'
         N += '<div class="clearfix" style="padding:5px 0">'
         N += '<ul class="business-nav">'
         N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="general"><?= $lang_resource['BUSINESS_TAB_RESTURANT'] ?></a></li>'
         N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="delivery"><?= $lang_resource['BUSINESS_TAB_DELIVERY'] ?></a></li>'
         N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="catagories"><?= $lang_resource['BUSINESS_TAB_CATEGORIES'] ?></a></li>'
         N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="extras"><?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION'] ?></a></li>'
         N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="dishes"><?= $lang_resource['BUSINESS_TAB_PRODUCTS'] ?></a></li>'
         N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="menus"><?= $lang_resource['BUSINESS_TAB_MENU'] ?></a></li>'
         N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="image_video"><?= $lang_resource['BUSINESS_TAB_IMAGE_VIDEO'] ?></a></li>'
		 N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="notification"><?= $lang_resource['BUSINESS_TAB_ORDER_NOTIFICATION'] ?></a></li>'
		 N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="reservation"><?= $lang_resource['BUSINESS_TAB_ORDER_RESERVATION'] ?></a></li>'
		 N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="metaseo"><?= $lang_resource['BUSINESS_TAB_ORDER_META'] ?></a></li>'
		 N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="app"><?= $lang_resource['BUSINESS_TAB_APP'] ?></a></li>'
      //   N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="widget"><?= $lang_resource['BUSINESS_WIDGET_SETTINGS'] ?></a></li>'
		/* N += '<li><a href="javascript:void(0)" onclick="Business.SwitchTab(this)" alt="reviews"><?= $lang_resource['BUSINESS_TAB_REVIEW_SETTINGS'] ?></a></li>'*/
         N += '</ul>'
         N += '</div>'
         N += '</div>'
         <!--the-box-->
         N += '</div>'
         <!--col-md-12-->
         N += '</div>'
         <!--row-->

        <!--For 1st Tab Resturant Info -->
        N +=BResturantInfo.Main(F);
        <!--For 1st Tab Resturant Info -->
		
		
	
		if(!Switch.OnSwitchChange) {		
			Switch.Init();
		}
        <!--For 2nd Tab Delivery -->
		//if(F.id){
		N += '<div id="tab_delivery" style="display:none;">'		
		N += '<div id="tab_delivery_1">'		
		N += '</div>'		
		N += '<div id="tab_delivery_2">'		
		N += '</div>'
		N += '<div id="tab_delivery_3">'		
		N += '</div>'
		N += '<div id="tab_delivery_4">'		
		N += '</div>'		
		N += '</div>'		
        <!--For 2nd Tab Delivery -->
		
		<!-- For 3rd Tab Category -->

		N +='<div id="tab_catagories" style="display:none;">' 
		N += '<div id="tab_catagories_1">'		
		N += '</div>'		
		N += '<div id="tab_catagories_2">'		
		N += '</div>'         
        N +='</div>'
		<!-- For 3rd Tab Category -->
		
		<!-- For 4th Tab Product_Option -->			
        N +='<div id="tab_extras" style="display:none;">'		
		//N +=ProductOption.Main(F);					
		N +='</div>'		
		N +='</div>'
		<!-- For 4th Tab Product_Option -->
		
		
		<!-- For 5th Tab Product -->
        N +='<div id="tab_dishes" style="display:none;">'
		//N +=Products.Main();
		N +='</div>'
		<!-- For 5th Tab Product -->
		
		<!-- For 6th Tab Product -->
		N +='<div id="tab_menus" style="display:none;">'
        //N +=MenuCatalog.Main(C,M);
        N +='</div>'	
		<!-- For 6th Tab Product -->
		
		<!-- For 7th Tab Product -->
		N +='<div id="tab_image_video" style="display:none;">'      
        N +='</div>'	
		<!-- For 7th Tab Product -->

        <!-- For 8th Tab Product -->
        N +='<div id="tab_notification" style="display:none;">'      
        N +='</div>'    
        <!-- For 8th Tab Product -->
		
		<!-- For 9th Tab Product -->
        N +='<div id="tab_reservation" style="display:none;">'      
        N +='</div>'    
        <!-- For 9th Tab Product -->
		<!-- For 10th Tab Product -->
        N +='<div id="tab_metaseo" style="display:none;">'      
        N +='</div>'    
        <!-- For 10th Tab Product -->
        <!-- For 11th Tab Product -->
        N +='<div id="tab_app" style="display:none;">'      
        N +='</div>'    
        <!-- For 11th Tab Product -->
		<!-- For 12th Tab Product -->
        N +='<div id="tab_widget" style="display:none;">' 
             
        N +='</div>'
        N +='<div id="tab_reviews" style="display:none;">'      
        N +='</div>'    
        <!-- For 11th Tab Product -->
		/*}else{            
		N += '<div class="col-md-12">'
		N += '<div class="the-box">'
		N += '<div class="clearfix" style="padding:5px 0">'
		N +='<p class="text-center">Please Create Business First</p>'
		N += '</div></div></div>'	           
		}*/
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
       
       
       
        N += '<div id="tab_metas" style="display:none;" class="editform">';
        N += '<div class="leftcol fullcol">';
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_METAS_KEYWORDS'] ?></span></div>';
        N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "mkeywords", Main.NullToEmpty(F.mkeywords), false, "", false, "metarea") + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_METAS_DESCRIPTION'] ?></span></div>';
        N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "mdescription", Main.NullToEmpty(F.mdescription), false, "", false, "metarea") + "</div></div>";
         N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_DESCRIPTION'] ?></span></div>';
         N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "pdesc", Main.NullToEmpty(F.pdesc), false, "", false, "metarea") + "</div></div>";
         N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_ABOUT'] ?></span></div>';
         N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "abusiness", Main.NullToEmpty(F.abusiness), false, "", false, "metareasmall") + "</div></div>";
        N += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_PROMOTIONCODE'] ?></span></div>';
        N += '<div class="row"><div class="inputbox">' + Forms.CreateTextAreaProperty("business", "promotion", Main.NullToEmpty(F.promotion), false, "", false, "metareasmall") + "</div></div>";
        N += "</div>";
        N += "</div>";
        
        
var S = false;
      
        
        <!---------------------------------------------------Reserve tab------------------------------------------------------------------------------->
        
        	N += '<div id="tab_reserve" style="display:none;">';
        N += '<div class="table">';
        N += '<div class="title nonselectable">';
        N += '<div class="id hand" onclick="Business.PupulateMenusTable(\'id\')"><span class="caption">#</span></div>';
        N += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        N += '<div class="menuname hand" style="width: 150px !important;" onclick="Business.PupulateMenusTable(\'name\')"><span class="caption"><?= $lang_resource['ADMIN_PAGE_RESTAURANT_NAME'] ?></span></div>';
        N += '<div class="menuname hand" style="width: 150px !important;" onclick="Business.PupulateMenusTable(\'name\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_NAME_HEADER'] ?></span></div>';
        
        N += '<div class="menucomments hand" style="width: 150px !important;" onclick="Business.PupulateMenusTable(\'comments\')"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_SEAT_HEADER'] ?></span></div>';
        N += '<div class="enabled default"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_ENABLE_HEADER'] ?></span></div>';
        N += "</div>";
        N += '<div class="container" id="reserve"></div>';
        N += "</div>";
        N += "</div>";        
        <!---------------------------------------------------Reserve tab------------------------------------------------------------------------------->
		

		
        document.getElementById("main").innerHTML = N;
        $(document).ready(function(){
            $('#email').attr('autocomplete','off');
            
        });
		
		
		BResturantInfo.ShowDeliverypickupTime();
		
		//Schedule.UpdateScheduleClock()
		
		
		Main.Ready();

		
		
		
        if (F.location == "" || F.location == null) {
            var Q = new Object();
            Q.latitud = lat1;
            Q.longitud = long1;
            Q.zoom = 15;
            F.location = JSON.stringify(Q)
        }
        Forms.CreateValue("business", "location", F.location);
        Forms.CreateValue("business", "zones", F.zones, false, true);


        GoogleMap.Clean();
        
        BResturantInfo.MapBusiness();
		
	//	console.log("iii="+JSON.stringify(F))
		
		 if(Main.neighsettings == 'f'){
		//get neighorhood for address
		$.post("lib/panel-bulk.php", 'data=[{"operation":"FetchNName","id":'+F.colony+'}]', function (b) {
			b = JSON.parse(b);
			console.log("h1="+b.fetchnname)
			$("#colony").val(b.fetchnname);
		});
		
		 }
		
	
		
        if (M && Main.User.level < 2) {
			
			Business.PopulateNeighborhoodSelect(F.city.id, F.colony)
            Business.PopulateCitySelect(F.country, F.city.id)
			
			
        }
		 if (Forms.Form.business.type == "modify") {
            BResturantInfo.TimeZoneSelected(document.getElementById("timezone"))
        }
       
		//Schedule.UpdateSchedule();
        $("#name").focus()
		/*if(document.getElementById("bproducts")){
            document.getElementById("bproducts").onkeyup = function () {
                Products.PupulateDishesTable(Main.Config.Business.List.SortBy, true)
            };
        }*/
		
		/*if(document.getElementById("catalogsearch")){
            document.getElementById("catalogsearch").onkeyup = function () {
                MenuCatalog.PupulateMenusTable(Main.Config.Business.List.SortBy, true)
            };
        }*/
		
		
   	
	
    },
    UpdateSchedule: function () {
        var f = new Object();
        f = {days:[0]};
        
        f.sdays = new Object();
        for (var d = 1; d <= 7; d++) {
            f.sdays[d] = new Object();
            f.sdays[d].opens = new Object();
            f.sdays[d].closes = new Object();            
            f.sdays[d].opens.hour = "0";            
            f.sdays[d].opens.minute = "0";           
            f.sdays[d].closes.hour ="0";            
            f.sdays[d].closes.minute = "0";
        }
        Forms.UpdateValue("business", "schedule", JSON.stringify(f), true);
        
    },


    CountrySelected: function (b) {
        Business.PopulateCitySelect(b.options[b.selectedIndex].value)
    },
    PopulateCitySelect: function (f, d) {
        Main.Loading();
        var e = new Date().getTime();
        Main.Aid = e;
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllFranchisesData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + f + '"}]}]', function (b) {//alert(b);
            if (e != Main.Aid) {
                return
            }
            Main.Ready();
            if (b != "") {
                var c = JSON.parse(b).franchises;
				
				c.sort(Main.SortByProperty("city"));
				
				
				
				console.log("franchise="+c)
				
                var i = document.getElementById("city");
                i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
                var a = 0;
                for (var j in c) {
                    if (d) {
                        if (c[j].id == d) {
                            a = j
                        }
                    }
                    i.options[i.options.length] = new Option(c[j].city, c[j].id)
                }
                if (d) {
                    i.selectedIndex = parseInt(a) + 1
                } else {
                    Forms.Form.business.fields.city.value = "";
                    if (Forms.CanSave("business")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }
                }
            }
        })
    },
	
	/*******************start Neighborhood select**************/	
  CitySelected: function (a) {
	$.post("lib/business.php", "f=GetTimeZoneData&id=" + a.value, function (b) {
		if(b !=""){
			Business.PopulateNeighborhoodSelect(a.options[a.selectedIndex].value)	
            Forms.UpdateValue("business", "timezone", b,true);			
			$('#timezone option[value="'+b+'"]').attr("selected", "selected");

			BResturantInfo.PreValidation() 
		}
		
	});
},
PopulateNeighborhoodSelect: function (c, b) {
//alert(b);
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        if (!c) {
            c = -1
        }
        $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchAllNeighborhoodData","filters":[{"modifier":"franchise","name":"country","operator":"=","value":"' + c + '"}]}]', function (g) {
			
            if (a != Main.Aid) {
                //return
            }
            Main.Ready();
            if (g != "") {
				
				
                var f = JSON.parse(g).colony;
				
				console.log("colony="+f)
				
			
                var e = document.getElementById("colony");
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
					//alert(JSON.stringify(f[d]));
                    e.options[e.options.length] = new Option(f[d].name, f[d].id)
                }
				//alert(e.options[e.options.length]);
				//alert(b);alert(j);
                if (b && j) {
					
                    e.selectedIndex = parseInt(h) + 1
                } else {
                    Forms.Form.user.fields.colony.value = "";
                   
                }
            }
        })
    
	
},

/**********end Neighborhood select**************/
    
    SwitchTab: function (e) {
   	//alert(e)reviews
    var e = $(e).attr("alt");
        document.getElementById("tab_" + this.FormTab).style.display = "none";
        document.getElementById("tab_" + e).style.display = "block";
        this.FormTab = e;
        var f = new Array();
       
        switch (e) {       
		<!--New Design -->	
        case "general":
            Forms.SubmitButton = "mainbuttonok";
            this.ActiveForm = "business";
            if(Business.id){
                Business.Edit(Business.id)
            }
        break;
		case "delivery":

            Forms.SubmitButton = "mainbuttonok";
			Deliveryzone.Main();
			
			
            break;
        case "catagories":    
            Forms.SubmitButton = "mainbuttonok";
            Catagories.Main();            
            break;
            
        case "extras":
            Forms.SubmitButton = "popupmainbuttonok";
            this.ActiveForm = "extra";
            ProductOption.Main();
            //ProductOption.GetExtras(null, true);            
            break;			
		case "dishes":
            Forms.SubmitButton = "popupmainbuttonok";
            //this.ActiveForm = "dish";
            Products.Main();                    
            break;			
        case "menus":
            Forms.SubmitButton = "popupmainbuttonok";
            this.ActiveForm = "menu";
            if(Business.Scheduletext){
                var M = true;
            }else{
                var M = false;
            }
            $.post("lib/business.php","f=GetBusinesType&id="+Business.id, function (a) {
                a = JSON.parse(a);
                Business.tab_food = a.tab_food
                Business.tab_alcohol = a.tab_alcohol
                Business.tab_groceries = a.tab_groceries
                Business.tab_laundry = a.tab_laundry

                Business.tab_food_active = a.tab_food_active
                Business.tab_alcohol_active = a.tab_alcohol_active
                Business.tab_groceries_active = a.tab_groceries_active
                Business.tab_laundry_active = a.tab_laundry_active
                
                MenuCatalog.Main(M);

            });
        
            break;       
		case "image_video":
            Forms.SubmitButton = "popupmainbuttonok";
			GalleryImg.Main();            
            break;
        case "notification":
		
            Forms.SubmitButton = "popupmainbuttonok";
            OrderNotification.Main();            
            break;  
		case "reservation":
            Forms.SubmitButton = "popupmainbuttonok";
            OrderReservation.Main();            
            break;
		case "metaseo":
            Forms.SubmitButton = "popupmainbuttonok";
            MetaSeo.Main();            
            break; 
		case "app":
            Forms.SubmitButton = "popupmainbuttonok";			
            Appnotification.Main();            
            break;

        case "widget":
        //alert("hello");
            Forms.SubmitButton = "popupmainbuttonok";           
            BusinessWidget.Main();            
            break; 


		case "reviews":
            Forms.SubmitButton = "popupmainbuttonok";			
            Reviews.Main();            
            break; 

		}
    },

    OpenMap: function () {
        var h = Forms.GetValue("business", "zones");
        if (h != "") {
            h = JSON.parse(h)
        } else {
            h = new Object();
            h.zone1 = new Object();
            h.zone1.price = "0.00";
            h.zone2 = new Object();
            h.zone2.price = "0.00";
            h.zone3 = new Object();
            h.zone3.price = "0.00"
        }
        var f = '<div id="mapbuttons" style="position:absolute;z-index:2;">';
        f += Visuals.CreateZoneButton("<?= $lang_resource['zone_V2'] ?> 01", Forms.CreateInputProperty2("business", "zone1price", h.zone1.price, false, "", false, false, "return Main.IsNumberKey(event)"), "Business.DrawingZone(this,'zone1')");
        f += Visuals.CreateZoneButton("<?= $lang_resource['zone_V2'] ?> 02", Forms.CreateInputProperty2("business", "zone2price", h.zone2.price, false, "", false, false, "return Main.IsNumberKey(event)"), "Business.DrawingZone(this,'zone2')");
        f += Visuals.CreateZoneButton("<?= $lang_resource['zone_V2'] ?> 03", Forms.CreateInputProperty2("business", "zone3price", h.zone3.price, false, "", false, false, "return Main.IsNumberKey(event)"), "Business.DrawingZone(this,'zone3')");
        f += Visuals.CreateGreyButton("<?= $lang_resource['delete_V2'] ?>", "Business.DeletingZone(this)");
        f += Visuals.CreateGreyButton("<?= $lang_resource['clear_zones_V2'] ?>", "Business.ClearZones(this)");
        f += "</div>";
        f += '<div id="mapbox" class="businessmapbox"></div>';
        Popup.Show(700, 698, f, Business.GetLocationAndZone, function () {
            GoogleMap.Clean()
        }, null, true);
        GoogleMap.Clean();
        var e = JSON.parse(Forms.GetValue("business", "location"));
        if (e.latitud != "" && e.longitud != "") {
            GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Business.MapReady, "bottomright")
        } else {
            var g = "";
            g += Forms.GetValue("business", "street") + ", ";
            g += Forms.GetValue("business", "colony") + ", ";
            g += Main.GetPropertyValueOnPropertyValueFound(Main.Franchises, "id", Forms.GetValue("business", "city"), "city") + ", ";
            g += Main.GetPropertyValueOnPropertyValueFound(Main.Countries, "id", Forms.GetValue("business", "country"), "name") + ", ";
            if (g == ", , , ") {
                e.latitud = 23.634501;
                e.longitud = -102.552784;
                e.zoom = 4
            }
            GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, g, Business.MapReady, "bottomright")
        }
    },
    DrawingZone: function (e, f) {
        var d = $("#mapbuttons");
        d.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        d.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        $(e).addClass("zonebuttonpressed");
        GoogleMap.StartDrawingShape(f)
    },
    DeletingZone: function (d) {
        var c = $("#mapbuttons");
        c.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        c.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        $(d).addClass("zonebuttonpressed");
        GoogleMap.StartDeletingShape()
    },
    ClearZones: function (d) {
        var c = $("#mapbuttons");
        c.find(".zonebutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        c.find(".greybutton").each(function () {
            $(this).removeClass("zonebuttonpressed")
        });
        GoogleMap.ClearAllShapes()
    },
    MapReady: function () {
        GoogleMap.StartShapeTool();
        GoogleMap.AddShapeDrawingStyle("zone1", "#6fbc5a", 3, "#6fbc5a");
        GoogleMap.AddShapeDrawingStyle("zone2", "#4f9bc4", 5, "#4f9bc4");
        GoogleMap.AddShapeDrawingStyle("zone3", "#fac739", 5, "#fac739");
        var b = Forms.GetValue("business", "zones");
        if (b != "") {
            b = JSON.parse(b);
            if (b.zone1.coordinates == "") {
                b.zone1.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone1", b.zone1.coordinates);
            if (b.zone2.coordinates == "") {
                b.zone2.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone2", b.zone2.coordinates);
            if (b.zone3.coordinates == "") {
                b.zone3.coordinates = new Array()
            }
            GoogleMap.PrintShape("zone3", b.zone3.coordinates)
        }
    },
    GetLocationAndZone: function () {
        Forms.UpdateValue("business", "location", JSON.stringify(GoogleMap.GetUserLocation()));
        var d = GoogleMap.GetZones();
        var c = new Object();
        c.zone1 = new Object();
        c.zone2 = new Object();
        c.zone3 = new Object();
        c.zone1.coordinates = d.zone1;
        c.zone2.coordinates = d.zone2;
        c.zone3.coordinates = d.zone3;
        Forms.Form.business.fields.zone1price.value = Main.FixToDecimal(Forms.Form.business.fields.zone1price.value);
        Forms.Form.business.fields.zone2price.value = Main.FixToDecimal(Forms.Form.business.fields.zone2price.value);
        Forms.Form.business.fields.zone3price.value = Main.FixToDecimal(Forms.Form.business.fields.zone3price.value);
        c.zone1.price = Forms.GetValue("business", "zone1price");
        c.zone2.price = Forms.GetValue("business", "zone2price");
        c.zone3.price = Forms.GetValue("business", "zone3price");
        Forms.Form.business.fields.zones.value = JSON.stringify(c);
        if (c.zone1.coordinates.length == 0 && c.zone2.coordinates.length == 0 && c.zone3.coordinates.length == 0) {
            Forms.Form.business.fields.zones.value = "";
            Forms.Form.business.fields.zones.save = false
        } else {
            if (Forms.Form.business.fields.zones.ivalue != Forms.Form.business.fields.zones.value) {
                Forms.Form.business.fields.zones.save = true
            }
        } if (Forms.CanSave("business")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
        Popup.Close()
    },
    ProfileImageSelected: function (c, d) {
        Forms.UpdateValue("business", "imgupload" + d, c, true);
        if (Forms.CanSave("business")) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },
    ProfileImageUploadFinished: function (d) {
        Main.Busy = false;
        Response = JSON.parse(d);
        if (Response.status == "no files selected") {
            Business.Save()
        } else {
            var f = true;
            for (var e in Response) {
                if (Response[e].status == "failed") {
                    f = false
                }
            }
            if (f) {
                Business.Save(Response[0].name)
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
    
    Delete: function (val) {
    
    
    $.fn.jAlert({
	'message': '<?= $lang_resource['ADMIN_PAGE_ARE_YOU_SURE_WANT_TO_DELETE_THIS_RESTAURANT'] ?>',
	'btn': [
		{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
        	$.post("lib/business_copy.php", "f=DeleteBusinessById&id=" + JSON.stringify(val), function (e) {
        	alert('Deleted permanently ');
            Business.Main();
            
        	});
        } },
        {'label':'No', 'cssClass': 'red', 'closeOnClick': true }
	],
    'closeBtn': false
    
	});
   
    },
    

    
    
    
      EditExtra: function (h, l) {
        console.log(h); <!--%PRODUCT OPTION%-->
        console.log(l); <!--%PRODUCT OPTION%-->
        var i = false;
        if (h) {
            i = true;
            Visuals.ForceMainButtonCancelEvent = l
        } else {
            var j = Main.GetMarkedCheckBoxesValues();
            if (j.length == 1) {
                h = j[0];
                i = true
            }
        } if (i) {
            var k = this;
            Main.Loading();
            var g = new Date().getTime();
            Main.Aid = g;
            $.post("lib/business.php", "f=GetExtraData&id=" + h, function (a) {
                if (g != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    k.ExtraForm(JSON.parse(a))
                } else {
                    alert("Error")
                }
            })
        }
    },
   

    PreEditExtra: function () {
        Uploader.Init("extra", "extraform", "popupmainbuttonok", true, Business.ExtraImageUploadFinished, Business.ExtraImageSelected, Business.ExtraStartUpload, "popup");
        $("#extra_name").focus()
    },
    ExtraImageSelected: function (c, d) {
        Forms.UpdateValue("extra", "imgupload" + d, c, true);
        if (Forms.CanSave("extra")) {
            Popup.EnableSubmitButton(true)
        } else {
            Popup.EnableSubmitButton(false)
        }
    },
    ExtraImageUploadFinished: function (d) {
        Main.Busy = false;
        Response = JSON.parse(d);
        if (Response.status == "no files selected") {
            Business.SaveExtra()
        } else {
            var f = true;
            for (var e in Response) {
                if (Response[e].status == "failed") {
                    f = false
                }
            }
            if (f) {
                Business.SaveExtra(Response[0].name)
            }
        }
    },
    ExtraStartUpload: function () {
        Popup.EnableSubmitButton(false);
        Main.Busy = true;
        if (Main.IsNavigator("Explorer", 9)) {
            Main.Loading()
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
            break
        }
        if (Forms.CanSave(this.ActiveForm)) {
            Forms.EnableSubmitButton(true)
        } else {
            Forms.EnableSubmitButton(false)
        }
    },

    convertTimeFormatHour:function(hour){        
        str='PM';
        if( hour < 12 ){
            str='AM';
        }
        if( hour > 23 ){
             str='AM';
        }
        hour=parseInt(hour)%12;
        return time=Business.zeroPad((hour),2)+' '+str;   
    },
    zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    },

    <!--Reserve----------------------------------------------------------------------------------->
     GetReserve: function (e, f) {
     this.Days = [{
            id: 0,
            name: "<?= $lang_resource['Every_Day_V2'] ?>"
        }, {
            id: 1,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] ?>"
        }, {
            id: 2,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] ?>"
        }, {
            id: 3,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] ?>"
        }, {
            id: 4,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] ?>"
        }, {
            id: 5,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] ?>"
        }, {
            id: 6,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] ?>"
        }, {
            id: 7,
            name: "<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] ?>"
        }];
        if (Forms.Form.business.type == "create") {
            if (Business.ReserveIds) {
                Main.Loading();
                var d = new Date().getTime();
                Main.Aid = d;
                $.post("lib/business.php", "f=FetchReserveDataByIds&ids=" + Business.ReserveIds, function (a) {
                
                
                    if (d != Main.Aid) {
                        return
                    }
                    Main.Ready();
                    if (a != "") {
                        Business.Reserve = JSON.parse(a);
                        if (f) {
                            Business.PupulateReserveTable(Main.Config.Reserve.List.SortBy, true)
                        } else {
                            Popup.Show(700, 693, e, Business.SaveReserve, null, Business.PreEditReserve)
                        }
                    } else {
                        Business.Reserve = null
                    }
                })
            } else {
                if (!f) {
                    Popup.Show(700, 693, e, Business.SaveReserve, null, Business.PreEditReserve)
                }
            }
        } else {
            Main.Loading();
            var d = new Date().getTime();
            Main.Aid = d;
            $.post("lib/business.php", "f=FetchReserveDataByBusiness&id=" + Forms.Form.business.id, function (a) {
            
                if (d != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    Business.Reserve = JSON.parse(a);
                    if (f) {
                        Business.PupulateReserveTable(Main.Config.Reserve.List.SortBy, true)
                    } else {
                        Popup.Show(700, 693, e, Business.SaveReserve, null, Business.PreEditReserve)
                    }
                }
            })
        }
    },
    EditReserve: function (h, l) {
        var i = false;
        if (h) {
            i = true;
            Visuals.ForceMainButtonCancelEvent = l
        } else {
            var j = Main.GetMarkedCheckBoxesValues();

            if (j.length == 1) {
                h = j[0];
                i = true
            }
        } if (i) {
            var k = this;
            Main.Loading();
            var g = new Date().getTime();
            Main.Aid = g;
            $.post("lib/business.php", "f=GetReserveData&id=" + h, function (a) {
                if (g != Main.Aid) {
                    return
                }
                Main.Ready();
                if (a != "") {
                    k.ReserveForm(JSON.parse(a))
                } else {
                    alert("Error")
                }
            })
        }
    },
     NewReserve: function () {
        this.ReserveForm()
    },
    PupulateReserveTable: function (j, h) {
        var k = "";
        var l = this.Reserve.length;
        if (h) {
            this.Reserve.sort(Main.SortByProperty(j));
            if (Main.Config.Reserve.List.SortByStatus == "max") {
                this.Reserve.reverse()
            }
        } else {
            if (Main.Config.Reserve.List.SortBy != j) {
                this.Reserve.sort(Main.SortByProperty(j));
                Main.Config.Reserve.List.SortByStatus = "min"
            } else {
                this.Reserve.reverse();
                if (Main.Config.Reserve.List.SortByStatus == "min") {
                    Main.Config.Reserve.List.SortByStatus = "max"
                } else {
                    Main.Config.Reserve.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Reserve.List.SortBy = j;
        if (!h) {
            Main.SaveConfig()
        }
        for (var n in this.Reserve) {
            var m;
            if (n % 2 == 0) {
                m = " grey"
            } else {
                m = ""
            }
            k += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
            k += '<div class="id"><div class="cap"><span class="caption hand" onclick="Business.EditReserve(' + this.Reserve[n].id + ')">' + this.Reserve[n].id + "</span></div></div>";
            k += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Reserve[n].id + '"/></div>';
            k += '<div class="menuname" style="width: 150px !important;"><div class="cap"><span class="caption hand" onclick="Business.EditReserve(' + this.Reserve[n].id + ')">' + this.Reserve[n].name + "</span></div></div>";
            k += '<div class="menuname" style="width: 150px !important;"><div class="cap"><span class="caption hand" onclick="Business.EditReserve(' + this.Reserve[n].id + ')">' + this.Reserve[n].rtyped + "</span></div></div>";
            k += '<div class="menucomments" style="width: 150px !important;"><div class="cap"><span class="caption">' + Main.NullToEmpty(this.Reserve[n].guest) + "</span></div></div>";
            k += '<div class="enabled"><span class="caption"><div id="switch_' + this.Reserve[n].id + '"></div></span></div>';
            k += "</div>"
        }
        document.getElementById("reserve").innerHTML = k;
        var i = false;
        Switch.Init();
        for (n in this.Reserve) {
            if (this.Reserve[n].enabled == "t") {
                i = true
            } else {
                i = false
            }
            Switch.Create("switch_" + this.Reserve[n].id, i);
            Switch.OnChange("switch_" + this.Reserve[n].id, function (a, b) {
                Business.SetEnabled(a.replace("switch_", ""), b, "menu")
            })
        }
    },
    ReserveForm: function (j) {
        Forms.Clean("reserve", "popupmainbuttonok");
        
     //  alert(JSON.stringify(j))
      
        if (j) {
            Forms.Form.reserve.type = "modify";
            Forms.Form.reserve.id = j.id
        } else {
            j = new Object();
            Forms.Form.reserve.type = "create";
            if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("reserve", "reserve_business", Forms.Form.business.id, false, true, true)
            }
        }
       
        Forms.Form.reserve.reserve = j;
        this.ActiveForm = "reserve";
        var i = '<div class="titlebox nonselectable">';
        if (Forms.Form.reserve.type == "create") {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_TITLE'] ?></span>'
        } else {
            i += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_EDIT_TITLE'] ?></span>'
        }
        i += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        i += "</div>";
        i += '<div class="editform">';
        i += '<div class="leftcol lcolmenu" style="width:585px;">';
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_NAME'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("reserve", "reserve_name", Main.NullToEmpty(j.name), true) + "</div></div>";
        Forms.CreateValue("reserve", "reserve_days", Main.NullToEmpty(j.days), false, true);
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_DAYS'] ?></span><div class="multiinputbox"><span class="obligatory nonselectable">*</span><input type="text" id="reserve_days" style="width:245px;height:60px"/></div></div>';
        var o;
        var m;
        var k;
        var n;
        var o2;
        var m2;
        var k2;
        var n2;
        if (Forms.Form.reserve.type == "modify" && j.schedule) {
            var l = JSON.parse(j.schedule);
            o = l.opens.hour;
            m = l.opens.minute;
            k = l.closes.hour;
            n = l.closes.minute
            
            o2 = l.opens.hour1;
            m2 = l.opens.minute1;
            k2 = l.closes.hour1;
            n2 = l.closes.minute1
        }
        Forms.CreateValue("reserve", "schedule", JSON.stringify(l));
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_START'] ?> </span><div class="inputbox">';
        i += '<select id="reserve_openminute" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (m == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_openhour" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 24; p++) {
            if (o == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        
          i += '<span class="caption schedulecaption"></span>';
        
        i += '<select id="reserve_openminute1" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (m2 == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_openhour1" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 24; p++) {
            if (o2 == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        
        i += "</div></div>";
        i += '<div class="row"><span class="caption">Ends : </span><div class="inputbox">';
        i += '<select id="reserve_closeminute" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (n == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_closehour" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 29; p++) {
            if (k == p) {
            	if(p > 24){
                    var c = p - 24;
                     i += "<option SELECTED value="+ p +">" + c + "am</option>"
                 }
                 else{i += "<option SELECTED value="+ p +">" + p + "</option>" }
            } 
           else if(p>24){
           		var c = p - 24;
                i += "<option value="+ p +">" + c + "am</option>"
           }
            else {
                i += "<option value="+ p +">" + p + "</option>"
            }
        }
        i += "</select>";
        
        i += '<span class="caption schedulecaption"></span>';
        
         i += '<select id="reserve_closeminute1" class="scheduleminute" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 60; p++) {
            if (n2 == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_closehour1" class="schedulehour" onchange="Business.UpdateReserveSchedule()">';
        for (var p = 0; p < 29; p++) {
            if (k2 == p) {
            	if(p > 24){
                    var c = p - 24;
                     i += "<option SELECTED value="+ p +">" + c + "am</option>"
                 }
                 else{i += "<option SELECTED value="+ p +">" + p + "</option>" }
            } 
           else if(p>24){
           		var c = p - 24;
                i += "<option value="+ p +">" + c + "am</option>"
           }
            else {
                i += "<option value="+ p +">" + p + "</option>"
            }
        }
        i += "</select>";
        i += "</div></div>";
        
        var M = new Array();
        M.push({
            id: "",
            caption: "",
        });
        
        M.push({
                id: 1,
                caption: "Table",
        });
        M.push({
                id: 2,
                caption: "Room",
        });
        M.push({
                id: 3,
                caption: "Free",
        });
        
            i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_INPUT_RESERVESION_TYPE'] ?></span><div>' + Forms.CreateSelectProperty("reserve", "reserve_rtype", M, Main.NullToEmpty(j.rtype), true) + "</div></div>";

        
        var K = new Array();
        K.push({
            id: "",
            caption: ""
        });
        for (E=1;E<=8;E++) {
            K.push({
                id: E,
                caption: E
            })
        }
            i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_INPUT_GUEST'] ?></span><div>' + Forms.CreateSelectProperty("reserve", "reserve_guest", K, Main.NullToEmpty(j.guest), true) + "</div></div>";
        
        
        
        
         Forms.CreateValue("reserve", "duration", '');
         
              var dy ;
              var dhr;
              var dmm;
          if (Forms.Form.reserve.type == "modify" && j.duration) {
            var l = JSON.parse(j.duration);
            var dy = l.duration.dday;
            var dhr = l.duration.dhour;
            var dmm = l.duration.dminute;
          
        }
        i += '<div class="row"><span class="caption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_DURATION'] ?></span><div class="inputbox">';
        i += '<select id="reserve_dmin" class="scheduleminute" onchange="Business.UpdateReserveDuration()">';
         i += "<option SELECTED>Min</option>"
        for (var p = 0; p < 60; p++) {
            if (dmm == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        
       i += '<span class="caption schedulecaption">:</span>';
        i += '<select id="reserve_dhour" class="schedulehour" onchange="Business.UpdateReserveDuration()" >';
         i += "<option SELECTED>Hour</option>"
        for (var p = 0; p < 24; p++) {
            if (dhr == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        
       //  i += '<span class="caption schedulecaption">:</span>';
        
        i += '<select id="reserve_dday" class="scheduleminute" onchange="Business.UpdateReserveDuration()" style="display:none">';
         i += "<option SELECTED>Days</option>"
        for (var p = 0; p <= 365; p++) {
            if (dy == p) {
                i += "<option SELECTED>" + p + "</option>"
            } else {
                i += "<option>" + p + "</option>"
            }
        }
        i += "</select>";
        
       
        
        i += "</div></div>";
        

       
        this.GetReserve(i)
    },
     PreEditReserve: function () {
        MultipleInput.Init("reserve_days", Business.Days, true);
        if (Forms.Form.reserve.type == "modify") {
            if (Forms.Form.reserve.reserve.days != "") {
                var i = JSON.parse(Forms.Form.reserve.reserve.days);
                for (var g in i) {
                    MultipleInput.AddTagById("reserve_days", i[g])
                }
                Forms.Form.reserve.fields.reserve_days.save = false
            }
        }
        $("#reserve_name").focus()
    },
    UpdateReserveSchedule: function () {
            var c = new Object();
            var d;
            c.opens = new Object();
            d = document.getElementById("reserve_openhour");
            c.opens.hour = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_openminute");
            c.opens.minute = d.options[d.selectedIndex].text;
            
            d = document.getElementById("reserve_openhour1");
            c.opens.hour1 = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_openminute1");
            c.opens.minute1 = d.options[d.selectedIndex].text;
            
            c.closes = new Object();
            d = document.getElementById("reserve_closehour");
            c.closes.hour = d.options[d.selectedIndex].value;
            d = document.getElementById("reserve_closeminute");
            c.closes.minute = d.options[d.selectedIndex].text;
            
            d = document.getElementById("reserve_closehour1");
            c.closes.hour1 = d.options[d.selectedIndex].value;
            d = document.getElementById("reserve_closeminute1");
            c.closes.minute1 = d.options[d.selectedIndex].text;
            
            
            
            Forms.UpdateValue("reserve", "schedule", JSON.stringify(c), true);
            if (Forms.CanSave("reserve")) {
                Forms.EnableSubmitButton(true)
            } else {
                Forms.EnableSubmitButton(false)
            }
        },   
        
         UpdateReserveDuration: function () {
            var c = new Object();
            var d;
            c.duration = new Object();
            
            d = document.getElementById("reserve_dday");
            c.duration.dday = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dhour");
            c.duration.dhour = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dmin");
            c.duration.dminute = d.options[d.selectedIndex].text;
            
            Forms.UpdateValue("reserve", "duration", JSON.stringify(c), true);
            if (Forms.CanSave("reserve")) {
                Forms.EnableSubmitButton(true)
            } else {
                Forms.EnableSubmitButton(false)
            }
        }, 
        
 
         UpdateReserveDuration: function () {
            var c = new Object();
            var d;
            c.duration = new Object();
            
            d = document.getElementById("reserve_dday");
            c.duration.dday = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dhour");
            c.duration.dhour = d.options[d.selectedIndex].text;
            d = document.getElementById("reserve_dmin");
            c.duration.dminute = d.options[d.selectedIndex].text;
            
            Forms.UpdateValue("reserve", "duration", JSON.stringify(c), true);
            if (Forms.CanSave("reserve")) {
                Forms.EnableSubmitButton(true)
            } else {
                Forms.EnableSubmitButton(false)
            }
        },
         PriceSetting1: function () {
     if(!Forms.Form.business.id){
     	alert("<?= $lang_resource['ADMIN_PAGE_PLEASE_CREATE_A_BUSINESS_FRIST'] ?>")
        return false;
     }
    	$.post("lib/business.php", "f=FetchAllPriceData&id=" + Forms.Form.business.id, function (b) {
      
        	if(b!="")
               Business.PriceSetting(b);
             else
              Business.PriceSetting(b);
         })
    },
    PriceSetting: function (b) {
   
    b = JSON.parse(b);
    var a = "";
    var c = "";
     
        
        a += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Business.Edit(Forms.Form.business.id)");
        
       
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
           c += '<span class="title">&gt;&gt;   <?= $lang_resource['ADMIN_PAGE_PRICE_SETTINGS'] ?></span>'
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        
            c +='<form name="pricesettings" action="lib/price_settings.php" method="post" enctype="multipart/form-data" onsubmit="return Business.PriceSe(this);">';
            
            c += '<div class="row"><span class="caption">Room</span><div class="inputbox"><input name="room" value="'+Main.NullToEmpty(b[0].roomprice)+'"  type="text" ></div></div>';
            
            c += '<div class="row"><span class="caption">Table</span><div class="inputbox"><input name="table" value="'+Main.NullToEmpty(b[0].tableprice)+'" type="text" ></div></div>';
            
            c += '<div class="row"><span class="caption">Free</span><div class="inputbox"><input name="free" value="'+Main.NullToEmpty(b[0].freeprice)+'"  type="text" ></div></div>';
            
            c += '<input type="hidden" value="'+ Forms.Form.business.id +'" name="businessid" >';
            
             c += '<div class="row"><div class="inputbox"><input name="submit" type="submit" value="SUBMIT" class="mainbutton"  style="background: none repeat scroll 0 0 #D40200;border: 2px solid #D40200;height: 100%;width: 32%; margin:20px 0 0 110px; color:#FFFFFF; float:left" ></div></div>';
             c +='</form>';
      
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#name").focus()
   
     },
      PriceSe: function (frm) {
 			
			var roomprice=frm.room.value;
            var tableprice=frm.table.value;
            var freeprice=frm.free.value;
            
			if(roomprice==""){
				alert("<?= $lang_resource['ADMIN_PAGE_PLEASE_FILL_THE_ROOM_PRICE'] ?>");
				return false;
			}
            else if(tableprice==""){
				alert("<?= $lang_resource['ADMIN_PAGE_PLEASE_FILL_THE_TABLE_PRICE'] ?>");
				return false;
			}
            else if(freeprice==""){
				alert("<?= $lang_resource['ADMIN_PAGE_PLEASE_FILL_THE_FREE_PRICE'] ?>");
				return false;
			}
            else{
              return true;
            }
    },
    
    SaveReserve: function () {
        if (Forms.CanSave("reserve") == false) {
            return
        }
        Forms.PrepareForSaving("reserve");
        delete Forms.Form.reserve.reserve;
        Forms.Form.reserve.fields = Main.RemoveFromPropertyNames(Forms.Form.reserve.fields, "reserve_");
        var d = true;
        Main.Loading(true);
        var c = new Date().getTime();
        Main.Aid = c;
       
        $.post("lib/business.php", "f=SaveReserve&data=" + JSON.stringify(Forms.Form.reserve), function (a) {
        
        
            if (c != Main.Aid) {
                return
            }
            Main.Ready(true);
            if (d) {
                if (Main.IsNumber(a)) {
                    if (Business.ReserveIds) {
                        Business.ReserveIds += "," + a
                    } else {
                        Business.ReserveIds = a
                    }
                }
            }
            Popup.Close();
            Business.GetReserve(null,true)
        });
        Forms.Clean("reserve")
    },
	DeleteReserve: function () {
       
        
        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var d = new Object();
        d.ids = c;
         
       
        Main.Request("business", null, "f=DeleteReserve&data=" + JSON.stringify(d), "Business.GetReserve(null,true)")
    },
        
    <!--Reserve----------------------------------------------------------------------------------->
        <!--%PRODUCT OPTION FUNCTION%-->
    
    
    
    
            
    set_rank: function(b){
      rank=b.value;
    },
    set_choice: function(b,index){

        choice[index]=b.value;
        console.log("index");
        console.log(index);
        console.log(choice[0]);



    },
    step2: function(d){
        console.log('dname');
          flag=0;

        Forms.Clean("extra_choice", "popupmainbuttonok");
       if(d)
       {
           option_choice = 0;
           total_options=0;
           choice_data=null;
           choice=null;
           gaint_choice_array=new Array();
           old_gaint_choice_array=new Array();
           flag=0;
           choice_data=JSON.parse(d);
           option_choice = 0;
           choice_count=0;
          total_options=choice_data.length;

       }
        else{
           flag=1;

       /*&data=" + JSON.stringify(Forms.Form.extra)*/

       }


           d = new Object();
        Forms.Form.extra_choice.type = "create";
        Forms.Form.extra_choice.extra_choice = d;
   //console.log(choice_data[option_choice]['option_name']);
     var mychoice=choice_data[option_choice]['num_choice'];


/*
        if (d) {
            Forms.Form.extra_choice.type = "modify";
            Forms.Form.extra_choice.id = d.id
        } else {
            d = new Object();
            Forms.Form.extra_choice.type = "create";
            */
/*  if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
            }*//*

        }
*/

        console.log(Forms.Form.extra_choice);

        this.ActiveForm = "extra_choice";
        var e1 = '<div class="titlebox nonselectable">';
        if (Forms.Form.extra_choice.type == "create") {
            e1 += '<span class="title">&gt;&gt;<?= $lang_resource['ADMIN_PAGE_CHOICE_FOR'] ?> '+ choice_data[option_choice]['option_name']+'</span>'
        } else {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] ?></span>'

        }
        e1 += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        e1 += "</div>";
        e1 += '<div class="editform">';
        e1 += '<div class="leftcol">';
        ct=0;
        var  min_choice=new Array();
        min_choice.push({
            id: "-1",
            caption: "Min Selection"
        });
        for(j=0;j< mychoice;j++){
            min_choice.push({
                id: j,
                caption: j
            })
        }
        var  max_choice=new Array();
        max_choice.push({
            id: "0-1",
            caption: "Max Selection"
        });
        for(j=0;j< mychoice;j++){
            max_choice.push({
                id: j,
                caption: j
            })
        }



        for(var i=0;i< mychoice;i++){
            e1 += '<div class="row"><span class="caption"><?= $lang_resource['ADMIN_PAGE_NAME_OF_CHOICE'] ?>:</span><div class="inputbox">' + Forms.CreateInputProperty("extra_choice", "extra_name"+i, null, true) + "</div></div>";
            if(flag==1)
            {  for(var ch=0;ch< choice_count;ch++){
                e1 += '<div class="row"><span class="caption"><?= $lang_resource['ADMIN_PAGE_WITH_RESPECT_to'] ?></span><div class="inputbox">' + Forms.CreateChoiceProperty("extra_choice", "extra_with_respect_to"+ct,gaint_choice_array[ch],[], false) + "</div></div>";
                e1 += '<div class="row"><span class="caption"><?= $lang_resource['ORDER_DETAILS_DISHES_PRICE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_choice", "extra_price"+ct,[],[], true) + "</div></div>";
                 ct++;
                    }
            }else if(flag==0)
            {
                e1 += '<div class="row"><span class="caption"><?= $lang_resource['ORDER_DETAILS_DISHES_PRICE'] ?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_choice", "extra_price"+i,[],[], true) + "</div></div>";
            }

        }
        e1 += '<div class="row"><span class="caption"><?= $lang_resource['ADMIN_PAGE_MINIMUM_SELECTION'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_choice", "extra_min_choice"+i,min_choice,[], true) + "</div></div>";
        e1 += '<div class="row"><span class="caption"><?= $lang_resource['ADMIN_PAGE_MAXIMUM_SELECTION'] ?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_choice", "extra_max_choice"+i,max_choice,[], true) + "</div></div>";

        e1 += "</div>";
        e1 += '<div class="rightcol">';
        e1 += "</div>";
        e1 += "</div>";
        Forms.Form.extra_choice.option_id = choice_data[option_choice]['option_id'];
        Forms.Form.extra_choice.set_id = choice_data[option_choice]['set_id'];
        Forms.Form.extra_choice.rank = choice_data[option_choice]['rank'];


        /*Popup.Show(700, 318, e1, null, null, null)*/
        option_choice++;

        Popup.Show(700, 518, e1, Business.SaveExtraChoice, null, null)


        /*    $.each(data,function(index,value)
                {
                    console.log(index);
                    console.log(value);
                });
        */

    },
    step_old1: function (d) {

        Forms.Clean("extra_details", "popupmainbuttonok");
        if (d) {
            Forms.Form.extra.type = "modify";
            Forms.Form.extra.id = d.id
        } else {
            d = new Object();
            Forms.Form.extra_details.type = "create";
            /*  if (Forms.Form.business.type == "modify") {
                Forms.CreateValue("extra", "extra_business", Forms.Form.business.id, false, true, true)
            }*/
        }
        Forms.Form.extra_details.extra_details = d;
        console.log(Forms.Form.extra_details);

        this.ActiveForm = "extra_details";
        var e1 = '<div class="titlebox nonselectable">';
        if (Forms.Form.extra_details.type == "create") {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_TITLE'] ?></span>'
        } else {
            e1 += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] ?></span>'
        }
        e1 += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        e1 += "</div>";
        e1 += '<div class="editform">';
        e1 += '<div class="leftcol">';
        var k=new Array();
        k.push({
            id: "0",
            caption: "Select Rank"
        });
        for(j=1;j<=rank;j++){
            k.push({
                id: j,
                caption: j
            })
        }
        for(var i=0;i< rank;i++){
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_NAME_FOR']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_name"+i, Main.NullToEmpty(d.name), true) + "</div></div>";
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_TEXT_TO_END']?></span><div class="inputbox">' + Forms.CreateInputProperty("extra_details", "extra_option_text_to_end_user"+i, Main.NullToEmpty(d.name), true) + "</div></div>";
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_CHOICE']?></span><div class="inputbox">' + Forms.CreateInputPropertyChoice("extra_details", "extra_num_choice"+i, Main.NullToEmpty(d.name), true) + "</div></div><br/></br>";
            e1 += '<div class="row"><span class="caption"><?=$lang_resource['PRODUCT_OPOTIONS_RANK_FOR']?></span><div class="inputbox">' + Forms.CreateSelectProperty("extra_details", "extra_rank"+i,k,[], true) + "</div></div>";
        }
        e1 += "</div>";
        e1 += '<div class="rightcol">';
        e1 += "</div>";
        e1 += "</div>";
        /*Popup.Show(700, 318, e1, null, null, null)*/
        Popup.Show(700, 518, e1, Business.SaveExtraDetails, null, null)
    },
    

    

    
    
    


  
    
    



    
     
    
    
    

    
    


    RankSelected: function (b) {
        Business.PopulateRanks(b.options[b.selectedIndex].value)
    },
    PopulateRanks: function (f, d) {
        console.log('populate');
        Main.Loading();
        var e = new Date().getTime();
        Main.Aid = e;
                var i = document.getElementById("extra_rank"+i);
                i.options.length = 0;
                i.options[i.options.length] = new Option("", "");
                var a = 0;
                for (var j=0;j< rank;j++) {

                    i.options[i.options.length] = j;

                }

                    if (Forms.CanSave("business")) {
                        Forms.EnableSubmitButton(true)
                    } else {
                        Forms.EnableSubmitButton(false)
                    }


    },
    PreEditExtraDetails:function(){
        Uploader.Init("extra", "extraform", "popupmainbuttonok", true,  Business.SaveExtra, null, null, "popup");
        $("#extra_name").focus()
    },
    
    
    SaveExtraChoice:function (f) {
    
    if (Forms.CanSave("extra_choice") == false) {


            return
        }


        Forms.PrepareForSaving("extra_choice");
        /*delete Forms.Form.extra_details.extra_details;*/
        Forms.Form.extra_choice.fields = Main.RemoveFromPropertyNames(Forms.Form.extra_choice.fields, "extra_");
        console.log("fomrss ok done");
        console.log( Forms.Form.extra_choice.fields);


        p=0;
       $.each(Forms.Form.extra_choice.fields,function(index,value)
        {

            if(index.indexOf('name')>-1){

            if(value['value'] != "null")
              {
                  /*console.log("hi");*/
                  console.log(value['value']);
                  old_gaint_choice_array[p++]=value['value'];
                   gaint_choice_array[choice_count]= value['value'];
                    choice_count++;
              }

            }


            /*gaint_choice_array.push({
                id: choice_count,
                caption: value['value']
            })*/


        });
        p=0;
        $.each(gaint_choice_array,function(index,value)
            {
               if(old_gaint_choice_array.indexOf(value)== -1)
                {
                 new_gaint_array[p++]=value;
                }
            });

        Forms.Form.extra_choice.chooice_array = new_gaint_array;

        //Forms.Form.extra.fields.price.value = Main.FixToDecimal(Forms.Form.extra.fields.price.value);
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
       $.post("lib/business.php","f=SaveExtraChoice&data=" + JSON.stringify(Forms.Form.extra_choice), function (a) {
            if (d != Main.Aid) {
                return
            }
            Main.Ready(true);
            if (e) {
                if (Main.IsNumber(a)) {
                    if (Business.ExtrasIds) {
                        Business.ExtrasIds += "," + a
                    } else {
                        Business.ExtrasIds = a
                    }
                }
            }
                if(option_choice < total_options)
                {

                        Business.step2();



                }
            else
             {
option_choice = 0;
 total_options=0;
 choice_data=null;
 choice=null;
  gaint_choice_array=new Array();
  old_gaint_choice_array=new Array();
      flag=0;
    choice_count=0;
}
            // Business.GetExtras(null, true)
           /* $.post("lib/business.php","f=GetChoice", function (a) {


                Business.step2(a);
            });*/

        });
        Popup.Close();
        Forms.Clean("extra_choice")
    },
    Popular:function (bid,chkval) {
    
        
                $.post("lib/business.php", "f=ChangePopular&bid=" +bid+"&chk="+chkval, function (c) {
					               
                Business.Main(bid);
                });
            },
    SaveExtraDetails: function (f) {
		
        if (Forms.CanSave("extra_details") == false) {

            return
        }
        Forms.PrepareForSaving("extra_details");
        /*delete Forms.Form.extra_details.extra_details;*/
        Forms.Form.extra.fields = Main.RemoveFromPropertyNames(Forms.Form.extra_details.fields, "extra_");
        console.log( Forms.Form.extra_details.fields);
        console.log( Forms.Form.extra_details);
        //Forms.Form.extra.fields.price.value = Main.FixToDecimal(Forms.Form.extra.fields.price.value);
        var e = true;
        Main.Loading(true);
        var d = new Date().getTime();
        Main.Aid = d;
        $.post("lib/business.php","f=SaveExtraDetails&data=" + JSON.stringify(Forms.Form.extra_details), function (a) {
            if (d != Main.Aid) {
                return
            }
            Main.Ready(true);
            if (e) {
                if (Main.IsNumber(a)) {
                    if (Business.ExtrasIds) {
                        Business.ExtrasIds += "," + a
                    } else {
                        Business.ExtrasIds = a
                    }
                }
            }

           // Business.GetExtras(null, true)
                $.post("lib/business.php","f=GetChoice", function (a) {


                              Business.step2(a);
                });

        });
        Popup.Close();
        Forms.Clean("extra_details")
    }
     <!--%PRODUCT OPTION FUNCTION%-->

};
