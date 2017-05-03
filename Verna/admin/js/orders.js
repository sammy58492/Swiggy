var IS_PAYPAL_ENABLED = 1;
var IS_PENDING_LIMIT = 6;
var IS_UPCOMING_LIMIT = 6;
var IS_PROGRESS_LIMIT = 6;
var IS_COMPLETE_LIMIT = 6;
var IS_CANCEL_LIMIT = 6;

var IS_PENDING_COUNT = 0;
var IS_UPCOMING_COUNT = 0;
var IS_PROGRESS_COUNT = 0;
var IS_COMPLETE_COUNT = 0;
var IS_CANCEL_COUNT = 0;

var IS_COUNT = 0;

var Orders = {
    Main: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
		
		
		$.post("lib/orders.php", "f=FetchMapData", function (l) {
			//alert(l)
			if(l !=""){
				Orders.map = l;
				//alert(Orders.map)
			}
			});
	
		$.post("lib/orders.php", "f=FetchAllCityData", function (b) {
			if(b !=""){
				Orders.cityname = JSON.parse(b);
			}
		
			$.post("lib/orders.php", "f=FetchAllResData", function (j) {				
				if(j !=""){
					Orders.resname = JSON.parse(j);
				}
				$.post("lib/orders.php", "f=FetchAllOrdersData", function (c) {
					
					if (a != Main.Aid) {
						return
					}
					Main.Ready();
					if (c != "") {
						Orders.Orders = JSON.parse(c);
						for (var b in Orders.Orders) {
							Orders.Orders[b].cname = Orders.Orders[b].city.name
						}
						Orders.PrintMain()
					} else {
						alert("Error")
					}
				});
        	});
        
       }); 
    },
    PrintMain: function () {

	    Forms.Clean("ordersearch", "mainbuttonok");

		Forms.Form.ordersearch.type = "create";
        this.ActiveForm = "ordersearch";
		
	

		var d = "";
		if (Main.User.level == 0 || Main.User.level == 1) {
		d += '<div class="row">'
		d += '<div class="top-bar">'
		if(Main.User.level == 0){
		d += '<div class=" col-md-3">'
		d += '<div class="row">'
		d += '<div class="col-md-4">'
		d += '<label class="topbar-label"><i class="fa icon-filter2"></i>&nbsp;<?= $lang_resource['ORDER_SEARCH_TITLE'] ?></label></div>'
		d += '<div class="col-md-8">'
		d += Forms.CreateSelectPropertyOrder("ordersearch", "cityname", Orders.cityname, '', false, "", true)
		d += '</div>'
		d += '</div>'
		<!--row-->
		d += '</div>'
		<!--col-md-3-->
		}
		if(Main.User.level == 1){
		d += '<div class=" col-md-6">'
		}else{
		d += '<div class=" col-md-3">'
		}
		
		d += '<div class="row">'
		d += '<div class="col-md-5">'
		d += '<label class="topbar-label"><?= $lang_resource['ORDER_SEARCH_RESTURANT'] ?></label>'
		d += '</div>'
		d += '<div class="col-md-7">'
		d += Forms.CreateSelectPropertyOrder("ordersearch", "resname",Orders.resname, '', false, "", true)
		d += '</div>'
		d += '</div>'
		<!--row-->
		d += '</div>'
		<!--col-md-3-->
		d += '<div class=" col-md-4">'
		d += '<div class="row">'
		d += '<div class="col-md-2">'
		d += '<label class="topbar-label"><?= $lang_resource['ORDER_SEARCH_DATEFROM'] ?></label>'
		d += '</div>'
		d += '<div class="col-md-4">'+Forms.CreateInputPropertyDate("ordersearch", "datepickerfrom", '', '', false, "", false)+'</div>'
		d += '<div class="col-md-1"><label class="topbar-label"><?= $lang_resource['ORDER_SEARCH_DATETO'] ?></label></div>'
		d += '<div class="col-md-4">'+Forms.CreateInputPropertyDate("ordersearch", "datepickerto", '', '', false, "", false)+'</div>'
		d += '</div>'
		<!--row-->
		d += '</div>'
		<!--col-md-3-->
		
		d += '<div class=" col-md-2">'
		d += '<div class="row">'
		d += '<div class="col-md-12 topbar-search-div">'
		d += '<div class="input-group">'
		d += Forms.CreateInputPropertyOrder("ordersearch", "search",'', '', false, "", false)
		d += '<span class="input-group-btn" onclick="Orders.SearchQuery()">'
		d += '<button class="btn btn-default add-on_search_btn btnprob" type="button" ><i class="fa icon-search2"></i></button>'
		d += '</span>'
		d += '</div>'
		d += '</div>'
		<!--col-md-12-->
		d += '</div>'
		<!--row-->
		d += '</div>'
		<!--col-md-3-->
		d += '</div>'
		<!--top-bar-->
		d += '</div>'
		<!--row-->
		
		}else{
		d += '<div class="row">'
		d += '<div class="top-bar">'
		d += '<div class=" col-md-4">'
		d += '<div class="row">'
		d += '<div class="col-md-5"><label class="topbar-label"><i class="fa icon-filter2"></i> <?= $lang_resource['ORDER_SEARCH_ORDER'] ?> :</label></div>'
		d += '<div class="col-md-7">'
		d += Forms.CreateSelectPropertyOrder("ordersearch", "cityname", Orders.cityname, '', false, "", true)
		d += '</div>'
		d += '</div>'
		<!--row-->
		d += '</div>'
		<!--col-md-4-->
		
		d += '<div class=" col-md-3 ">'
		d += '<div class="row">'
		d += '<div class="col-md-12 topbar-search-div">'
		d += '<div class="input-group">'
		d += Forms.CreateInputPropertyOrder("ordersearch", "search", Orders.searchfield, '', false, "", false)
		d += '<span class="input-group-btn" onclick="Orders.SearchQuery()">'
		d += '<button class="btn btn-default add-on_search_btn btnprob" type="button" ><i class="fa icon-search2"></i></button>'
		d += '</span>'
		d += '</div>'
		d += '</div>'
		<!--col-md-12-->
		d += '</div>'
		<!--row-->
		d += '</div>'
		<!--col-md-3-->
		d += '<div class=" col-md-5">'
		d += '<div class="row">'
		d += '<div class="col-md-2"><label class="topbar-label"><?= $lang_resource['ORDER_SEARCH_DATEFROM'] ?></label></div>'
		d += '<div class="col-md-4">'+Forms.CreateInputPropertyDate("ordersearch", "datepickerfrom", '', '', false, "", false)+'</div>'
		d += '<div class="col-md-1"><label class="topbar-label"><?= $lang_resource['ORDER_SEARCH_DATETO'] ?></label></div>'
		d += '<div class="col-md-4">'+Forms.CreateInputPropertyDate("ordersearch", "datepickerto", '', '', false, "", false)+'</div>'
		d += '</div>'
		<!--row-->
		d += '</div>'
		<!--col-md-5-->
		d += '</div>'
		<!--top-bar-->
		d += '</div>'
		<!--row-->		
			
		}
		
		
		d += '<div class="panel panel-danger panel-square panel-no-border">'
		d += '<div class="panel-heading panel-heading-2"> '
		d += '<div class="row">'
		d += '<div class="col-md-6">'
		d += '<h3 class="panel-title-2"><?= $lang_resource['ORDER_PENDING_TAB'] ?></h3>'
		d += '</div>'
		<!--col-md-5-->
		d += '<div class="col-md-6">'
		d += '<div class="panel-btn pull-right">'
		d += '<div class="inline-popups ">'
		d += '<span class=" panel-btn-2">'
		d += '<div class="btn-group">'
		d += '<button type="button" class="btn dropdown-toggle  btn-rounded-lg panel-red-btn" data-toggle="dropdown">'
		d += '<i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?> <span class="caret"></span>'
		d += '</button>'
		d += '<ul class="dropdown-menu " role="menu">'
		d += '<li><a href="javascript:Orders.Export(0,1)"><?=$lang_resource['Order_details_V2']?></a></li>'
		d += '<li><a href="javascript:Orders.Export(1,1)"><?=$lang_resource['ADMIN_PAGE_ORDERS_CLIENT_DATA']?></a></li>'
		d += '</ul>'
		d += '</div>'
		d += '</span>'
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Orders.Edit()"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></button>'
		d += '</span>'
		if (Main.User.level <= 2) {
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-red-btn" onclick="Orders.Delete(1)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button>'
		d += '</span>'
		}
		d += '</div>'
		d += '</div>'
		d += '</div>'
		<!--col-md-4-->
		d += '</div>'
		<!--row-->
		d += '</div>'
		
	
		d += '<div class="panel-body">'
		d += '<div class="table-responsive">'
		d += '<table class="table table-th-block table-striped">'
		d += '<thead>'
		d += '<tr>'
		d += '<th  style="width: 30px;"  onclick="Main.ToogleAllCheckBoxes(\'checkboxpending\')"><?= $lang_resource['ORDER_TAB_ALL'] ?></th>'
		d += '<th  style="width: 110px;"  onclick="Orders.PupulateTable(\'id\')"><?= $lang_resource['ORDER_TAB_ORDER_NO'] ?></th>'
		d += '<th  style="width: 130px;"  onclick="Orders.PupulateTable(\'date\')"><?= $lang_resource['ORDER_TAB_DATE'] ?></th>'
		d += '<th  style="width: 150px;" onclick="Orders.PupulateTable(\'cname\')"><?= $lang_resource['ORDER_TAB_CITY'] ?></th>'
		d += '<th style="width: 250px;"><?= $lang_resource['ORDER_TAB_RESTURANT'] ?></th>'
		d += '<th style="width: 180px;"><?= $lang_resource['ORDER_TAB_DELIVERY_TIME'] ?></th>'
		d += '<th style="width: 100px;"><?= $lang_resource['ORDER_TAB_TOTAL'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_STATUS'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_REORDER'] ?></th>'
		d += '</tr>'
		d += '</thead>'
     	d += '<tbody id="pendingorders">'
		
		d += '</tbody>'
		d += '</table>'
		d += '</div>'	
		
		d += '<a href="javascript:Orders.orders_more(1)" id="pendingmore" style="display:none;"><?= $lang_resource['ORDER_SHOW_MORE'] ?></a>'
		<!--table-responsive-->
		
		
		d += '<h5><?= $lang_resource['ORDER_UPCOMING_TAB'] ?></h5>'
		d += '<div class=" table-responsive">'
		
		d += '<table class="table table-th-block table-striped">'
		d += '<thead>'
		d += '<tr>'
		d += '<th style="width: 30px;"  onclick="Main.ToogleAllCheckBoxes(\'checkboxupcoming\')"><?= $lang_resource['ORDER_TAB_ALL'] ?></th>'
		d += '<th style="width: 110px;"  onclick="Orders.PupulateTable(\'id\')"><?= $lang_resource['ORDER_TAB_ORDER_NO'] ?></th>'
		d += '<th style="width: 130px;"  onclick="Orders.PupulateTable(\'date\')"><?= $lang_resource['ORDER_TAB_DATE'] ?></th>'
		d += '<th style="width: 150px;" onclick="Orders.PupulateTable(\'cname\')"><?= $lang_resource['ORDER_TAB_CITY'] ?></th>'
		d += '<th style="width: 250px;"><?= $lang_resource['ORDER_TAB_RESTURANT'] ?></th>'
		d += '<th style="width: 180px;"><?= $lang_resource['ORDER_TAB_DELIVERY_TIME'] ?></th>'
		d += '<th style="width: 100px;"><?= $lang_resource['ORDER_TAB_TOTAL'] ?></th>'
		
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_STATUS'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_REORDER'] ?></th>'
		d += '</thead>'
		
		d += '<tbody id="upcomingorders">'
		d += '</tbody>'
		d += '</table>'
		d += '</div>'
		<!--table-responsive-->
		d += '<a href="javascript:Orders.orders_more(2)" id="upcomingmore" style="display:none;"><?= $lang_resource['ORDER_SHOW_MORE'] ?></a>'	
		d += '</div>'
		<!-- /.panel-body -->
		d += '</div>'
		
		
		
		d += '<div class="panel panel-warning  panel-square panel-no-border">'

		d += '<div class="panel-heading panel-heading-2"> '
		d += '<div class="row">'
		d += '<div class="col-md-6">'
		d += '<h3 class="panel-title-2"><?= $lang_resource['ORDER_PROGRESS_TAB'] ?></h3>'
		d += '</div>'
		<!--col-md-5-->
		d += '<div class="col-md-6">'
		d += '<div class="panel-btn pull-right">'
		d += '<div class="inline-popups ">'
		d += '<span class=" panel-btn-2">'
		d += '<div class="btn-group">'
		d += '<button type="button" class="btn dropdown-toggle  btn-rounded-lg panel-yellow-btn" data-toggle="dropdown">'
		d += '<i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?> <span class="caret"></span>'
		d += '</button>'
		d += '<ul class="dropdown-menu " role="menu">'
		d += '<li><a href="javascript:Orders.Export(0,3)"><?=$lang_resource['Order_details_V2']?></a></li>'
		d += '<li><a href="javascript:Orders.Export(1,3)"><?=$lang_resource['ADMIN_PAGE_ORDERS_CLIENT_DATA']?></a></li>'
		d += '</ul>'
		d += '</div>'
		d += '</span>'
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="Orders.Edit1(3)"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></button>'
		d += '</span>'
		if (Main.User.level <= 2) {
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-yellow-btn" onclick="Orders.Delete(3)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button>'
		d += '</span>'
		}
		d += '</div>'
		d += '</div>'
		d += '</div>'
		<!--col-md-4-->
		d += '</div>'
		<!--row-->
		d += '</div>'
		d += '<div class="panel-body">'
		d += '<div class="table-responsive">'
		d += '<table class="table table-th-block table-striped">'
		d += '<thead>'
		d += '<tr>'
		d += '<th style="width: 30px;"  onclick="Main.ToogleAllCheckBoxes(\'checkboxprogress\')"><?= $lang_resource['ORDER_TAB_ALL'] ?></th>'
		d += '<th style="width: 115px;"  onclick="Orders.PupulateTable(\'id\')"><?= $lang_resource['ORDER_TAB_ORDER_NO'] ?></th>'
		d += '<th style="width: 130px;"  onclick="Orders.PupulateTable(\'date\')"><?= $lang_resource['ORDER_TAB_DATE'] ?></th>'
		d += '<th  style="width: 150px;" onclick="Orders.PupulateTable(\'cname\')"><?= $lang_resource['ORDER_TAB_CITY'] ?></th>'
		d += '<th style="width: 250px;"><?= $lang_resource['ORDER_TAB_RESTURANT'] ?></th>'
		d += '<th style="width: 180px;"><?= $lang_resource['ORDER_TAB_DELIVERY_TIME'] ?></th>'
		d += '<th style="width: 100px;"><?= $lang_resource['ORDER_TAB_TOTAL'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_STATUS'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_REORDER'] ?></th>'
		d += '</tr>'
		d += '</thead>'
		d += '<tbody id="progressorders">'
		d += '</tbody>'
		d += '</table>'
		d += '</div>'
		<!--table-responsive-->
		d += '<a href="javascript:Orders.orders_more(3)" id="progressmore" style="display:none;"><?= $lang_resource['ORDER_SHOW_MORE'] ?></a>'	
		d += '</div>'
		<!-- /.panel-body -->
		d += '</div>'
		
		
		d += '<div class="panel panel-success  panel-square panel-no-border">'
		
		d += '<div class="panel-heading panel-heading-2">'
		d += '<div class="row">'
		d += '<div class="col-md-6">'
		d += '<h3 class="panel-title-2"><?= $lang_resource['ORDER_COMPLETE_TAB'] ?></h3>'
		d += '</div>'
		<!--col-md-5-->
		d += '<div class="col-md-6">'
		d += '<div class="panel-btn pull-right">'
		d += '<div class="inline-popups ">'
		d += '<span class=" panel-btn-2">'
		d += '<div class="btn-group">'
		d += '<button type="button" class="btn dropdown-toggle  btn-rounded-lg panel-green-btn" data-toggle="dropdown">'
		d += '<i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?> <span class="caret"></span>'
		d += '</button>'
		d += '<ul class="dropdown-menu " role="menu">'
		d += '<li><a href="javascript:Orders.Export(0,4)"><?=$lang_resource['Order_details_V2']?></a></li>'
		d += '<li><a href="javascript:Orders.Export(1,4)"><?=$lang_resource['ADMIN_PAGE_ORDERS_CLIENT_DATA']?></a></li>'
		d += '</ul>'
		d += '</div>'
		d += '</span>'
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Orders.Edit1(4)"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></button>'
		d += '</span>'
		if (Main.User.level <= 2) {
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-green-btn" onclick="Orders.Delete(4)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button>'
		d += '</span>'
		}
		d += '</div>'
		d += '</div>'
		d += '</div>'
		<!--col-md-4-->
		d += '</div>'
		<!--row-->
		d += '</div>'
		
		d += '<div class="panel-body">'
		d += '<div class="table-responsive">'
		d += '<table class="table table-th-block table-striped">'
		d += '<thead>'
		d += '<tr>'
		d += '<th style="width: 30px;" onclick="Main.ToogleAllCheckBoxes(\'checkboxcomplete\')"><?= $lang_resource['ORDER_TAB_ALL'] ?></th>'
		d += '<th style="width: 110px;" onclick="Orders.PupulateTable(\'id\')"><?= $lang_resource['ORDER_TAB_ORDER_NO'] ?></th>'
		d += '<th style="width: 130px;" onclick="Orders.PupulateTable(\'date\')"><?= $lang_resource['ORDER_TAB_DATE'] ?></th>'
		d += '<th style="width: 150px;" onclick="Orders.PupulateTable(\'cname\')"><?= $lang_resource['ORDER_TAB_CITY'] ?></th>'
		d += '<th style="width: 250px;" ><?= $lang_resource['ORDER_TAB_RESTURANT'] ?></th>'
		d += '<th style="width: 180px;" ><?= $lang_resource['ORDER_TAB_DELIVERY_TIME'] ?></th>'
		d += '<th style="width: 100px;"><?= $lang_resource['ORDER_TAB_TOTAL'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_STATUS'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_REORDER'] ?></th>'
		d += '</tr>'
		d += '</thead>'
		d += '<tbody id="completedorders">'
		d += '</tbody>'
		d += '</table>'
		
		d += '</div>'
		<!--table-responsive-->
		d += '<a href="javascript:Orders.orders_more(4)" id="completemore" style="display:none;"><?= $lang_resource['ORDER_SHOW_MORE'] ?></a>'
		
		d += '</div>'
		<!-- /.panel-body -->
		d += '</div>'
		
		/*d += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        d += '<input type="hidden" name="f" value="ExportOrder"/>';
        d += '<input id="exp_data" type="hidden" name="data" value=""/>';
        d += '<input type="hidden" name="name" value="orders"/>';
        d += '</form>';*/
		
		
		
		d += '<div class="panel panel-success  panel-square panel-no-border">'
		
		d += '<div class="panel-heading panel-heading-2" style=" background:#ccc; border-color: #ccc;">'
		d += '<div class="row">'
		d += '<div class="col-md-6">'
		d += '<h3 class="panel-title-2"><?= $lang_resource['ORDER_CANCEL_TAB'] ?></h3>'
		d += '</div>'
		<!--col-md-5-->
		d += '<div class="col-md-6">'
		d += '<div class="panel-btn pull-right">'
		d += '<div class="inline-popups ">'
		d += '<span class=" panel-btn-2">'
		d += '<div class="btn-group">'
		d += '<button type="button" class="btn dropdown-toggle  btn-rounded-lg panel-grey-btn2" data-toggle="dropdown">'
		d += '<i class="fa icon-export"></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?> <span class="caret"></span>'
		d += '</button>'
		d += '<ul class="dropdown-menu " role="menu">'
		d += '<li><a href="javascript:Orders.Export(0,5)"><?=$lang_resource['Order_details_V2']?></a></li>'
		d += '<li><a href="javascript:Orders.Export(1,5)"><?=$lang_resource['ADMIN_PAGE_ORDERS_CLIENT_DATA']?></a></li>'
		d += '</ul>'
		d += '</div>'
		d += '</span>'
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-grey-btn2" onclick="Orders.Edit1(5)"><i class="fa icon-edit"></i> <?=$lang_resource['BUSINESS_EDIT']?></button>'
		d += '</span>'
		if (Main.User.level <= 2) {
		d += '<span class=" panel-btn-2">'
		d += '<button class="btn btn-default btn-rounded-lg panel-grey-btn2" onclick="Orders.Delete(5)"><i class="fa icon-remove2"></i> <?=$lang_resource['BUSINESS_DELETE']?></button>'
		d += '</span>'
		}
		d += '</div>'
		d += '</div>'
		d += '</div>'
		<!--col-md-4-->
		d += '</div>'
		<!--row-->
		d += '</div>'
		
		d += '<div class="panel-body">'
		d += '<div class="table-responsive">'
		d += '<table class="table table-th-block table-striped">'
		d += '<thead>'
		d += '<tr>'
		d += '<th style="width: 30px;" onclick="Main.ToogleAllCheckBoxes(\'checkboxcancelled\')"><?= $lang_resource['ORDER_TAB_ALL'] ?></th>'
		d += '<th style="width: 115px;" onclick="Orders.PupulateTable(\'id\')"><?= $lang_resource['ORDER_TAB_ORDER_NO'] ?></th>'
		d += '<th style="width: 130px;" onclick="Orders.PupulateTable(\'date\')"><?= $lang_resource['ORDER_TAB_DATE'] ?></th>'
		d += '<th style="width: 150px;" onclick="Orders.PupulateTable(\'cname\')"><?= $lang_resource['ORDER_TAB_CITY'] ?></th>'
		d += '<th style="width: 250px;" ><?= $lang_resource['ORDER_TAB_RESTURANT'] ?></th>'
		d += '<th style="width: 180px;" ><?= $lang_resource['ORDER_TAB_DELIVERY_TIME'] ?></th>'
		d += '<th style="width: 100px;"><?= $lang_resource['ORDER_TAB_TOTAL'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_STATUS'] ?></th>'
		d += '<th style="width: 90px;"><?= $lang_resource['ORDER_TAB_REORDER'] ?></th>'
		d += '</tr>'
		d += '</thead>'
		d += '<tbody id="cancelledorders">'
		d += '</tbody>'
		d += '</table>'
		
		d += '</div>'
		<!--table-responsive-->
		d += '<a href="javascript:Orders.orders_more(5)" id="cancelemore" style="display:none;"><?= $lang_resource['ORDER_SHOW_MORE'] ?></a>'
		
		d += '</div>'
		<!-- /.panel-body -->
		d += '</div>'
		
		
		d += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        d += '<input type="hidden" name="f" value="ExportOrder"/>';
        d += '<input id="exp_data" type="hidden" name="data" value=""/>';
        d += '<input type="hidden" name="name" value="orders"/>';
        d += '</form>';
		
		
		
        document.getElementById("main").innerHTML = d;
		
		   $(document).ready(function () {
                
                $('#datepickerfrom').datepicker({
                    format: "mm/dd/yyyy"
                });  
            
				 $('#datepickerto').datepicker({
                    format: "mm/dd/yyyy"
                }); 
            });
		   
		 
        document.getElementById("search").onkeyup = function () {
            Orders.PupulateTable(Main.Config.Orders.List.SortBy, true)
		
        };
       Orders.PupulateTable(Main.Config.Orders.List.SortBy, true)
	  
    },
	PupulateTable: function (a, d) {
        var peo = "";
		var co = "";
		var pro = "";
		var uo = "";
		var ca= "";

		var j = this.Orders.length;
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
        var l = false;
        var g = "";
		var pecnt =1;
		var uocnt =1;
		var prcnt =1;
		var cocnt =1;
		var cant =1;

		var q = new Array();	
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ORDER_DETAILS_PENDING'] ?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['ORDER_DETAILS_COMPLETE'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['ORDER_DETAILS_CANCEL'] ?>"}'));		
		q.push(JSON.parse('{"id":"3","caption":"<?= $lang_resource['ORDER_DETAILS_PREPERATION'] ?>"}'));
		q.push(JSON.parse('{"id":"4","caption":"<?= $lang_resource['ORDER_DETAILS_ORDER_ON_ITS_WAY'] ?>"}'));
		q.push(JSON.parse('{"id":"5","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_RESTAURANT'] ?>"}'));
		q.push(JSON.parse('{"id":"6","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_DRIVER'] ?>"}'));
		q.push(JSON.parse('{"id":"7","caption":"<?= $lang_resource['ORDER_DETAILS_RESTAURANT_ACCEPTED'] ?>"}'));


        for (var f in this.Orders) {
	
		
            l = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.Orders[f].id).toLowerCase().indexOf(g) >= 0 || this.Orders[f].date.toLowerCase().indexOf(g) >= 0) {
                l = true
            }
            if (g.indexOf(" a ") >= 0) {
                var b = g.split(" a ");
                var n = $.trim(b[0]).toLowerCase();
                var k = $.trim(b[1].toLowerCase());
                if (n != "" || k != "") {
                    var h = this.Orders[f].date.toLowerCase();
                    var c = h;
                    if (k.length == 10) {
                        c = h.split(" ")[0]
                    }
                    if (h >= n && c <= k) {
                        l = true
                    }
                }
            }
            if (l) {

                	
			if(this.Orders[f].orderlist == 1){
        	
	           if(this.Orders[f].parent_id!=0){
				var parid = this.Orders[f].parent_id;  
			   }else{
				var parid = this.Orders[f].id;   
			   }
	                
					
					if(this.Orders[f].preorder && this.Orders[f].status == 0 && this.Orders[f].status != 1 && this.Orders[f].status != 3 ){
					 if(IS_COUNT == 0)
					 IS_UPCOMING_COUNT = IS_UPCOMING_COUNT + 1;
					 if(uocnt <= IS_UPCOMING_LIMIT){
					 uo += '<tr >'
					 uo += '<td><input type="checkbox" class="checkboxupcoming checkbox" value="' + this.Orders[f].id + '"></td>'
					 uo += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
					 uo += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
					 if (Main.User.level == 0) {
					 uo += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
					 } else {
					 uo += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
					 }
					 uo += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
					if(this.Orders[f].deliverydate != 'asap')
					 uo += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 uo += '<td></td>'
					 var nte1= Main.NullToEmpty(this.Orders[f].total);
					 uo += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+parseFloat(nte1).toFixed(IS_DECIMAL_POINT)+'</td>'
					 uo += '<td><button type="button" class=" btn btn-danger btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
					 uo +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
					 for(var sq in q){
					 if(q[sq].id == this.Orders[f].status){
					 uo +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
					 }else{
					 uo +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
					 }
					 }				
					 uo +='</select>'
					 uo += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
					 uo +='</td>'
					 uo += '</tr>'
					  uocnt = uocnt+1;
					 }
					}
					
					else if(this.Orders[f].status == 0){
					 if(IS_COUNT == 0)
					 IS_PENDING_COUNT = IS_PENDING_COUNT + 1;
					 if(pecnt <= IS_PENDING_LIMIT){
						 //alert(JSON.stringify(this.Orders[f]))
					 peo += '<tr >'
					 peo += '<td><input type="checkbox" class="checkboxpending checkbox" value="' + this.Orders[f].id + '"></td>'
					 peo += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
					 peo += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
					 
					 if (Main.User.level == 0) {
					 peo += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
					 } else {
					 peo += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
					 }
					 peo += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
					 
					// peo += '<td></td>'
					
					 if(this.Orders[f].deliverydate != 'asap' || !this.Orders[f].deliverydate)
					 peo += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 peo += '<td></td>'

					 var nte2= Main.NullToEmpty(this.Orders[f].total);
					 peo += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+parseFloat(nte2).toFixed(IS_DECIMAL_POINT)+'</td>'

					 peo += '<td><button type="button" class=" btn btn-danger btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
					 peo +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
					 for(var sq in q){
					 if(q[sq].id == this.Orders[f].status){
					 peo +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
					 }else{
					 peo +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
					 }
					 }				
					 peo +='</select>'
					 peo += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
					 peo +='</td>'
					 peo += '</tr>'
					 pecnt = pecnt+1;
					 }

				
					}
					
					
					
					else if(this.Orders[f].status == 1){
					 if(IS_COUNT == 0)
					 IS_COMPLETE_COUNT = IS_COMPLETE_COUNT + 1;
					 if(cocnt  <= IS_COMPLETE_LIMIT){
					 co += '<tr >'
					 co += '<td><input type="checkbox" class="checkboxcomplete" value="' + this.Orders[f].id + '"></td>'
					 co += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
					 co += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
					 if (Main.User.level == 0) {
					 co += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
					 } else {
					 co += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
					 }
					 co += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
					 if(this.Orders[f].deliverydate != 'asap')
					 co += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 co += '<td></td>'

					  var nte3= Main.NullToEmpty(this.Orders[f].total);
					 co += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+parseFloat(nte3).toFixed(IS_DECIMAL_POINT)+'</td>'

					 co +='<td>'
					 co += '<button type="button" class=" btn btn-success  btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
					 co +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
					 for(var sq in q){
					 if(q[sq].id == this.Orders[f].status){
					 co +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
					 }else{
					 co +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
					 }
					 }				
					 co +='</select>'
					 co += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
					 co +='</td>'
					 co += '</tr>'
					 cocnt = cocnt+1;
					 }
				
					}
					else if(this.Orders[f].status == 3 || this.Orders[f].status == 4 || this.Orders[f].status == 7 ){
					 if(IS_COUNT == 0)
					 IS_PROGRESS_COUNT = IS_PROGRESS_COUNT + 1
					 if(prcnt  <= IS_PROGRESS_LIMIT){
					 pro += '<tr >'
					 pro += '<td><input type="checkbox" class="checkboxprogress" value="' + this.Orders[f].id + '"></td>'
					 pro += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
					 pro += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
					 if (Main.User.level == 0) {
					 pro += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
					 } else {
					 pro += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
					 }
					 pro += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
					 if(this.Orders[f].deliverydate != 'asap')
					 pro += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 pro += '<td></td>'
					 
					// alert(this.Orders[f].pretime);
					/* if(this.Orders[f].pretime)
					{
						// alert('1');
						
					 pro += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					}
					 else
					 {
						
						 pro += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					// pro += '<td></td>'
					 }*/

					  var nte4= Main.NullToEmpty(this.Orders[f].total);
					 pro += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+parseFloat(nte4).toFixed(IS_DECIMAL_POINT)+'</td>'

					 pro += '<td><button type="button" class=" btn btn-warning  btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
					 pro +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
					 for(var sq in q){
					 if(q[sq].id == this.Orders[f].status){
					 pro +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
					 }else{
					 pro +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
					 }
					 }				
					 pro +='</select>'
					 pro += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
					 pro +='</td>'
					 pro += '</tr>'
					 prcnt = prcnt+1;
					 }
				
					}
				
				    else if(this.Orders[f].status == 2 || this.Orders[f].status == 5 || this.Orders[f].status == 6){
					 if(IS_COUNT == 0)
					 IS_CANCEL_COUNT = IS_CANCEL_COUNT + 1
					 if(cant  <= IS_CANCEL_LIMIT){
					 ca += '<tr >'
					 ca += '<td><input type="checkbox" class="checkboxcancelled" value="' + this.Orders[f].id + '"></td>'
					 ca += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
					 ca += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
					 if (Main.User.level == 0) {
					 ca += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
					 } else {
					 ca += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
					 }
					 ca += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
					 if(this.Orders[f].deliverydate != 'asap')
					 ca += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 ca += '<td></td>'
					  var nte5= Main.NullToEmpty(this.Orders[f].total);
					 ca += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+parseFloat(nte5).toFixed(IS_DECIMAL_POINT)+'</td>'

					 ca += '<td><button type="button" class=" btn btn-cancel  btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
					 ca +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
					 for(var sq in q){
					 if(q[sq].id == this.Orders[f].status){
					 ca +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
					 }else{
					 ca +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
					 }
					 }				
					 ca +='</select>'
					 ca += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
					 ca +='</td>'
					 ca += '</tr>'
					 cant = cant+1;
					 }
				

				else if(this.Orders[f].status == 1){
				 if(IS_COUNT == 0)
				 IS_COMPLETE_COUNT = IS_COMPLETE_COUNT + 1;
				 if(cocnt  <= IS_COMPLETE_LIMIT){
				 co += '<tr >'
				 co += '<td><input type="checkbox" class="checkboxcomplete" value="' + this.Orders[f].id + '"></td>'
				 co += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
				 co += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
				 if (Main.User.level == 0) {
				 co += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
				 } else {
				 co += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
				 }
				 co += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
				 if(this.Orders[f].deliverydate != 'asap')
					 co += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 co += '<td></td>'

				 var nte6= Main.NullToEmpty(this.Orders[f].total);
				 co += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+Main.NullToEmpty(parseFloat(nte6).toFixed(IS_DECIMAL_POINT))+'</td>'

				 co += '<td><button type="button" class=" btn btn-success  btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
				 co +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
				 for(var sq in q){
				 if(q[sq].id == this.Orders[f].status){
				 co +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
				 }else{
				 co +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
				 }
				 }				
				 co +='</select>'
				 co += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
				 co +='</td>'
				 co += '</tr>'
				 cocnt = cocnt+1;
				 }
			
				}
				else if(this.Orders[f].status == 3 || this.Orders[f].status == 4 || this.Orders[f].status == 7 ){
				 if(IS_COUNT == 0)
				 IS_PROGRESS_COUNT = IS_PROGRESS_COUNT + 1
				 if(prcnt  <= IS_PROGRESS_LIMIT){
				 pro += '<tr >'
				 pro += '<td><input type="checkbox" class="checkboxprogress" value="' + this.Orders[f].id + '"></td>'
				 pro += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
				 pro += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
				 if (Main.User.level == 0) {
				 pro += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
				 } else {
				 pro += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
				 }
				 pro += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
				 if(this.Orders[f].deliverydate != 'asap')
					 pro += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 pro += '<td></td>'

				  var nte7= Main.NullToEmpty(this.Orders[f].total);
				 pro += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+parseFloat(nte7).toFixed(IS_DECIMAL_POINT)+'</td>'

				 pro += '<td><button type="button" class=" btn btn-warning  btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
				 pro +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
				 for(var sq in q){
				 if(q[sq].id == this.Orders[f].status){
				 pro +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
				 }else{
				 pro +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
				 }
				 }				
				 pro +='</select>'
				 pro += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
				 pro +='</td>'
				 pro += '</tr>'
				 prcnt = prcnt+1;
				 }
			
				}
			
			    else if(this.Orders[f].status == 2 || this.Orders[f].status == 5 || this.Orders[f].status == 6){
				 if(IS_COUNT == 0)
				 IS_CANCEL_COUNT = IS_CANCEL_COUNT + 1
				 if(cant  <= IS_CANCEL_LIMIT){
				 ca += '<tr >'
				 ca += '<td><input type="checkbox" class="checkboxcancelled" value="' + this.Orders[f].id + '"></td>'
				 ca += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">'+ parid +'</td>'
				 ca += '<td onclick="Orders.Edit(' + Main.NullToEmpty(this.Orders[f].id) + ')" style="cursor:pointer;">' + Main.NullToEmpty(this.Orders[f].date) +'</td>'
				 if (Main.User.level == 0) {
				 ca += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'
				 } else {
				 ca += '<td>'+Main.NullToEmpty(this.Orders[f].city.name)+'</td>'	 
				 }
				 ca += '<td>'+Main.NullToEmpty(this.Orders[f].bname)+'</td>'
				 if(this.Orders[f].deliverydate != 'asap')
					 ca += '<td>'+Main.NullToEmpty(this.Orders[f].deliverydate)+' - '+Main.ConvertTimeFormat(Main.NullToEmpty(this.Orders[f].pretime))+'</td>'
					 
					 else
					 ca += '<td></td>'

				 var nte8= Main.NullToEmpty(this.Orders[f].total);
				 ca += '<td>'+Main.NullToEmpty(this.Orders[f].currency)+' '+parseFloat(nte8).toFixed(IS_DECIMAL_POINT)
+'</td>'

				 ca += '<td><button type="button" class=" btn btn-cancel  btn_pendeng" id="status_button'+this.Orders[f].id+'" onclick="Orders.openstatusbox('+this.Orders[f].id+')">'+Main.NullToEmpty(this.Orders[f].statustext)+'</button>'
				 ca +='<select style="display:none;" class="status_combo" id="status_combo'+this.Orders[f].id+'" onchange="Orders.ChangStatus(this.value,'+this.Orders[f].id+')">'
				 for(var sq in q){
				 if(q[sq].id == this.Orders[f].status){
				 ca +='<option value="'+q[sq].id+'" selected>'+q[sq].caption+'</option>'
				 }else{
				 ca +='<option value="'+q[sq].id+'">'+q[sq].caption+'</option>'
				 }
				 }				
				 ca +='</select>'
				 ca += '<td><button type="button" class=" btn btn-edit btn_pendeng" id="edit_button'+this.Orders[f].id+'" onclick="CreateOrder.Main('+this.Orders[f].businessidd+','+this.Orders[f].id+')"><?= $lang_resource['ORDER_TAB_REORDER_EDIT'] ?></button></td>'
				 ca +='</td>'
				 ca += '</tr>'
				 cant = cant+1;
				 }
			
				}
       		 }
							
	            }
        	}

        }
		
        
		
		
        document.getElementById("pendingorders").innerHTML = peo;
		document.getElementById("progressorders").innerHTML = pro;
		document.getElementById("completedorders").innerHTML = co;
		document.getElementById("upcomingorders").innerHTML = uo;
		document.getElementById("cancelledorders").innerHTML = ca;
		
		if(IS_COMPLETE_LIMIT < IS_COMPLETE_COUNT && IS_COMPLETE_COUNT>6){
			$("#completemore").show();
		}else{
			$("#completemore").hide();
		}
		if(IS_CANCEL_LIMIT < IS_CANCEL_COUNT && IS_CANCEL_COUNT>6){
			$("#cancelemore").show();
		}else{
			$("#cancelemore").hide();
		}

		if(IS_PROGRESS_LIMIT < IS_PROGRESS_COUNT && IS_PROGRESS_COUNT>6){
			$("#progressmore").show();
		}else{
			$("#progressmore").hide();
		}

		if(IS_UPCOMING_LIMIT < IS_UPCOMING_COUNT && IS_UPCOMING_COUNT>6){
			$("#upcomingmore").show();
		}else{
			$("#upcomingmore").hide();
		}

		if(IS_PENDING_LIMIT < IS_PENDING_COUNT && IS_PENDING_COUNT>6){
			$("#pendingmore").show();
		}else{
			$("#pendingmore").hide();
		}	
		IS_COUNT = 1;
    },
    openstatusbox: function(id){		
		$("#status_button"+id).hide();
		$("#status_combo"+id).show();
	},
	ChangStatus: function(status,id){
		Main.Loading();
		var b = new Array();
		b.push(id)
		var a = new Object();
	    a.ids = b;
	    
	    $.post("lib/orders.php", "f=ChangeStatusMultiple&status="+status+"&data=" + JSON.stringify(a), function (c) {
	    	Main.Ready();
	    	Orders.Main()
	    });
	},
	
	orders_more: function(val){
		if(val == 1){
			 IS_PENDING_LIMIT = IS_PENDING_LIMIT + 6;

		}
		if(val == 2){
			IS_UPCOMING_LIMIT = IS_UPCOMING_LIMIT + 6;

		}
		if(val == 3){
			IS_PROGRESS_LIMIT = IS_PROGRESS_LIMIT + 6;
		}
		if(val == 4){
			 IS_COMPLETE_LIMIT = IS_COMPLETE_LIMIT + 6;
		}
		if(val == 5){
			 IS_CANCEL_LIMIT = IS_CANCEL_LIMIT + 6;
		}
		Orders.PupulateTable()
	},
	Edit1: function(val){
		if(val == 3){var classname = 'checkboxprogress'}else if(val == 4){var classname ='checkboxcomplete'}else if(val == 5){var classname ='checkboxcancelled'}
		 var d = false;
		  var c = Main.GetMarkedCheckBoxesValuesByClass(classname);
            if (c.length == 1) {
                a = c[0];
                d = true
            }else if(c.length > 1){
				alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_EDIT']?>");
                return
            }

			
		if (d) {
            Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
            $.post("lib/orders.php", "f=FetchOrderData&id=" + a, function (e) {
				//alert(e)
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e != "") {
                    Orders.Form(JSON.parse(e))
                } else {
                    alert("Error")
                }
            })
        }
		
		
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
				alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT_EDIT']?>");
                return
            }
        } 
		
		var z12 = new Array({
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
		
		if (d) {
            Main.Loading();
            var f = new Date().getTime();
            Main.Aid = f;
            $.post("lib/orders.php", "f=FetchOrderData&id=" + a+"&zone3="+z12, function (e) {
				$.post("lib/orders.php", "f=FetchDriverGroup&order_id=" + a, function (b) {
					
					var totalrec = JSON.parse(b);
					var d = new Array();
					d.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['ORDER_DETAILS_SELECT_DRIVER']?>"}'));
					for (var c in totalrec) {
						var e1 = new Object();
						e1.id = totalrec[c].id;
						e1.caption = totalrec[c].caption ;
						e1.bringgpermission = totalrec[c].bringgpermission;
						d.push(e1)
					}
					
					Orders.driver = d;
					if (f != Main.Aid) {
	                    return
	                }
	                Main.Ready();
	                if (e != "") {
	                    Orders.Form(JSON.parse(e))
	                } else {
	                    alert("Error")
	                }
				})                
            })
        }
    },
	
	 	
    Form: function (a) {
		
        var p = "";
		Forms.Clean("order", "mainbuttonok");
        Forms.Form.order.type = "modify";
        Forms.Form.order.id = a.id;
		
		
		
		if(Main.NullToEmpty(a.driver_id)!="") {
			  Forms.Form.order.driverid = a.driver_id;
		
		}
		
		var q = new Array();
		
		//q.push(JSON.parse('{"id":"-1","caption":""}'));
        q.push(JSON.parse('{"id":"0","caption":"<?= $lang_resource['ORDER_DETAILS_PENDING'] ?>"}'));		
		q.push(JSON.parse('{"id":"7","caption":"<?= $lang_resource['ORDER_DETAILS_RESTAURANT_ACCEPTED'] ?>"}'));
		q.push(JSON.parse('{"id":"4","caption":"<?= $lang_resource['ORDER_DETAILS_ORDER_ON_ITS_WAY'] ?>"}'));
		q.push(JSON.parse('{"id":"1","caption":"<?= $lang_resource['ORDER_DETAILS_COMPLETE'] ?>"}'));
        q.push(JSON.parse('{"id":"2","caption":"<?= $lang_resource['ORDER_DETAILS_CANCEL'] ?>"}'));		
		//q.push(JSON.parse('{"id":"3","caption":"<?= $lang_resource['ORDER_DETAILS_PREPERATION'] ?>"}'));
		q.push(JSON.parse('{"id":"5","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_RESTAURANT'] ?>"}'));
		q.push(JSON.parse('{"id":"6","caption":"<?= $lang_resource['ORDER_DETAILS_CANCELLED_DRIVER'] ?>"}'));
		

		
		p +='<div class="row">'
		p +='<div class="top-bar">'
		p +='<div class=" col-md-4">'
		p +='<div class="row">'
		p +='<div class="col-md-5"><label class="topbar-label"><?= $lang_resource['ORDER_DETAILS_CHECK_ORDER_STATUS'] ?></label></div>'
		p +='<div class="col-md-7">'
		p += Forms.CreateSelectPropertyOrder("order", "status", q, a.status, false, "", true)
		p +='</div>'
		p +='</div>'
		<!--row-->
		p +='</div>'
		<!--col-md-4-->
		
		
		p +='<div class=" col-md-3">'
		p +='<div class="row">'
		p +='<div class="col-md-5"><label class="topbar-label">'
		if(Main.User.level!=4){
		p +='<?= $lang_resource['ORDER_DETAILS_SELECT_DRIVER'] ?>'
		}
		p +='</label></div>'
		p +='<div class="col-md-7">'
		if(Main.User.level!=4){
		p +=Forms.CreateSelectPropertyOrderDriver("order", "driver_id", Orders.driver, a.driver_id, false)
		}
		p +='</div>'
		p +='</div>'
		<!--row-->
		p +='</div>'
		<!--col-md-3-->
		
		
		p +='<div class="col-md-5">'
		p +='<div class="save-btn-dv  pull-right">'
		p +='<button class="btn btn-default btn-rounded-lg save-btn" onclick="Orders.Save()"><i class="fa  icon-save"></i> <?= $lang_resource['ORDER_DETAILS_SAVE'] ?></button><button class="btn btn-default btn-rounded-lg close-btn" onclick="Orders.PrintMain()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button>'
		p +='</div>'
		p +='</div>'
		<!--col-md-5-->
		p +='</div>'
		<!--top-bar-->
		p +='</div>'
		<!--row-->
		
		p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_COMMENTS_ORDER'] ?></h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		
		p +=Forms.CreateTextAreaPropertyOrder("order", "comment", Main.NullToEmpty(a.comment), false, "", true, "form-control rounded") 
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div> '
		p +='</div>'
		<!--col-md-6-->
		
		p +='<div class="col-md-6">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_DRIVER_COMMENT'] ?></h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +=Forms.CreateTextAreaPropertyOrder("order", "driver_comment", Main.NullToEmpty(a.driver_comment), false, "", true, "form-control rounded")
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div>'
		p +='</div>'
		<!--col-md-6-->
		
		
		p +='</div>'
		<!--row-->
		
		if(a.requestcollectiondata=="null"){
		var n = JSON.parse(a.data);
	
		if(n.business[0].dishes != ""){
		p +='<div class="row">'
		p +='<div class="col-md-12">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_ORDER_NO'] ?> : ' + a.id +'</h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +='<div class="row">'
		p +='<div class="col-md-3">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		
		
		if (n.business[0].paymethod.braintree == true)
				{
				
					if(a.braintree_firstname)	 {
						
		p +='<tr>'
		p +='<td colspan="3"> '+n.buyer.deliveryType.split("%20").join(" ")+' <?=$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME_ADDRESS']?></td>'
		p +='</tr>'
					}
					
					
				}
		
		if($.inArray( 'Name',n.buyer.checkoutfields ) != -1 && typeof(n.buyer.name) != "undefined" && Main.NullToEmpty(n.buyer.name) !=""){
		var strname = n.buyer.name;
		p +='<tr>'		
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + strname.split("%20").join(" ") +'</td>'
		p +='</tr>'
		}
		
		if($.inArray( 'Last Name',n.buyer.checkoutfields ) != -1 && Main.NullToEmpty(n.buyer.lastname2) !=""){
		if(typeof(n.buyer.lastname2) != "undefined")
		{
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_LASTNAME'] ?></td>'
		p +='<td>:</td>'
		var strlastname2 = n.buyer.lastname2;
		p +='<td>' + strlastname2.split("%20").join(" ") +'</td>'
		p +='</tr>'
		}
		}
		if($.inArray( 'Email',n.buyer.checkoutfields ) != -1){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_EMAIL'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.email +'</td>'
		p +='</tr>'
		}
		//alert(unescape(n.buyer.address))
		if(typeof(n.buyer.address) != "undefined" && $.inArray( 'Full Address',n.buyer.checkoutfields ) != -1 && Main.NullToEmpty(n.buyer.address) !="")
		{
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_ADDRESS'] ?></td>'
		p +='<td>:</td>'
		var straddress = unescape(n.buyer.address);
		p +='<td>' + straddress.split("%20").join(" ") +'</td>'	
		p +='</tr>'
		
		}
		if(typeof(n.buyer.api) != "undefined" && $.inArray( 'APT/Suit',n.buyer.checkoutfields ) != -1)
		{
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_APT'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.api +'</td>'
		p +='</tr>'
		}
		if($.inArray( 'Phone',n.buyer.checkoutfields ) != -1){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_PHONE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.tel +'</td>'
		p +='</tr>'
		}
		if($.inArray( 'City',n.buyer.checkoutfields ) != -1){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_CITY'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.cityname +'</td>'
		p +='</tr>'
		}
		
		if(typeof(n.buyer.colony) != "undefined" && $.inArray( 'Area / Neighborhood',n.buyer.checkoutfields ) != -1 && Main.NullToEmpty(n.buyer.colony) !="")
		{
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_NEIGHBORHOOD'] ?></td>'
		p +='<td>:</td>'
		var strcolony = n.buyer.colony;	
		p +='<td id="colony_text">' + strcolony.split("%20").join(" ") +'</td>'			
		p +='</tr>'
		
		}
		
		if(typeof(n.buyer.zipcode) != "undefined" && $.inArray( 'Zipcode',n.buyer.checkoutfields ) != -1)
		{
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_ZIPCODE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.zipcode +'</td>'
		p +='</tr>'
		
		}
		
		
		
		
		if($.inArray( 'Where did you find about us',n.buyer.checkoutfields ) != -1){
		p +='<tr>'		
		p +='<td><?= $lang_resource['ORDER_DETAILS_BUYER_REFERENCE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.buyer.reference +'</td>'
		p +='</tr>'
		}
		
		if(a.bringgpermission == true) {
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_BRINGG_STATUS'] ?></td>'
		p +='<td>:</td>'
		
		if(a.bringg_order_id != 0) {
		p +='<td><?= $lang_resource['ORDER_BRINGG_STATUS_VALIDED'] ?></td>'
		}
		else {
		p +='<td><?= $lang_resource['ORDER_BRINGG_STATUS_INVALIDED'] ?></td>'
			}
		
		p +='</tr>'
		}
		
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		
		p +='</div>'
		<!--col-md-3-->
		p +='</div>'
		<!--row-->
		
		
		//for braintree when delivery adress!=address
		
		if (n.business[0].paymethod.braintree == true)
				{
					
					
					if(a.braintree_firstname)	 {
					
					
					if(n.buyer.address != a.braintree_address1)	 {
						
						p +='<div class="row">'
		p +='<div class="col-md-3">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td style="width:53%;"><?= $lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS'] ?></td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + a.braintree_firstname +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + a.braintree_lastname +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  a.braintree_address1 +'</td>'
		p +='</tr>'
		if(a.braintree_address2 == undefined){
		p +='<tr>'
		p +='<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  a.braintree_address2 +'</td>'
		p +='</tr>'
		}
		p +='<tr>'
		p +='<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  a.braintree_city +'</td>'
		p +='</tr>'
		
		p +='<tr>'
		p +='<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_STATE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  a.braintree_state +'</td>'
		p +='</tr>'
		
		p +='<tr>'
		p +='<td><?= $lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  a.braintree_zipcode +'</td>'
		p +='</tr>'
		
		
		p +='</tbody>'
		p +='</table>'
		
		p +='</div>'
		
		p +='</div>'
		<!--col-md-3-->
		p +='</div>'
						
					}
					else
					{
						
						p +='<div class="col-md-12">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td><?= $lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME'] ?> '+n.buyer.deliveryType+' <?=$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME_ADDRESS']?></td>'
		
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		
		p +='</div>'
		
		p +='</div>'
		<!--col-md-3-->
		p +='</div>'
						
					}
					
					
				}
				
				
				}
		
		
		
		p +='<div class="doted-line"></div>'
		<!--doted-line-->
		
		
		
		
		var m = "";
        var h;
        for (var g in n.business) {
        if (n.business[g].id) {
        h = 0;
		
		p +='<h4 style="font-size:18px; color:#343434; font-weight:400; margin:30px 10px 5px 0px;">'
		p +='<span style="color:#ff283d; font-weight:600;">'+ n.business[g].name +'</span> (<?= $lang_resource['ORDER_DETAILS_BUSINESS_PHONE'] ?>: ' + n.business[g].tel + ')</h4>'
		m = "";
		
		if(IS_PAYPAL_ENABLED == 1){
		 if (n.paypalid==undefined){
		  if (n.business[g].paymethod.cash == true){
		     m = "<?= $lang_resource['CASH_DELIVERY'] ?>"
		   }
		   if (n.business[g].paymethod.card == true){
			   if (m == ""){
				   m = "<?= $lang_resource['CARD_DELIVERY'] ?>"
				}else{
				   m += " <?= $lang_resource['AND_CARD'] ?>"
				}
			}
		   }else{
			   
			   if ((a.paypaltx) && (n.business[g].paymethod.paypal == true)) {
				   m = "<?= $lang_resource['PAID_WITH_PAYPAL'] ?>";
			
			}
			else if ((!a.paypaltx) && (n.business[g].paymethod.paypal == true)) {
			    m = "<?= $lang_resource['PAID_WITH_PAYPAL_NOT'] ?>";
			}
			   
			   
			   
			   }
	  }else{
		  
		if (n.business[g].paymethod.cash == true) {
			m = "<?= $lang_resource['CASH_DELIVERY'] ?>"
		}
		if (n.business[g].paymethod.card == true) {
			if (m == "") {
				m = "<?= $lang_resource['CARD_DELIVERY'] ?>"
			} else {
				m += ", <?= $lang_resource['CARD_DELIVERY'] ?>"
			}
		}
		}
		if (n.business[g].paymethod.marco == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_WITH_MERCADOPAGO'] ?> ("+n.mercadopagoid+")";
		}
		 if (n.business[g].paymethod.paypaladaptive == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_PAYPAL_ADAPTIVE'] ?> ";
		}
		
		if (n.business[g].paymethod.transactium == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_TRANSACTIUM'] ?>";
			
		}
		if (n.business[g].paymethod.voguepay == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_VOGUE'] ?>";
			
		}
		if (n.business[g].paymethod.pexpress == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_PEXPRESS'] ?>";
			
		}
		if (n.business[g].paymethod.maksekeskus == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_MAKSEKESKUS'] ?>";
			
		}
		
		if (n.business[g].paymethod.skrill == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_SKRILL'] ?>";
			
		}
		if (n.business[g].paymethod.payeezy == true)
		{
			if(a.payeezy_result !=null){
                    m = "<?= $lang_resource['ORDER_PAID_PAYEEZY'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_PAYEEZY'] ?> ";
                }
			//m = "<?= $lang_resource['ORDER_PAID_PAYEEZY'] ?>";
			
		}
		
		if (n.business[g].paymethod.paypalpro == true)
		{
			if(a.paypalpro_result !=null){
                    m = "<?= $lang_resource['ORDER_PAID_PAYPALPRO'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_PAYPALPRO'] ?> ";
                }
			//m = "<?= $lang_resource['ORDER_PAID_PAYEEZY'] ?>";
			
		}
		
		if (n.business[g].paymethod.worldpay == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_WORLDPAY'] ?>";
			
		}
		if (n.business[g].paymethod.braintree == true)
		{
			if(a.collection_id !=null){
                    m = "<?= $lang_resource['ORDER_PAID_BRAINTREE'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_BRAINTREE'] ?> ";
                }
			
		}
		if (n.business[g].paymethod.authorize == true)
		{
			//m = "<?= $lang_resource['ORDER_PAID_AUTHORIZE'] ?>";
			if(a.a_trnx_code !=null){
                    m = "<?= $lang_resource['ORDER_PAID_AUTHORIZE'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_AUTHORIZE'] ?> ";
                }
		}
		if (n.business[g].paymethod.mercury == true)
		{
			m = "<?= $lang_resource['ORDER_PAID_MERCURY'] ?>";
			
		}
		
		if (n.business[g].paymethod.payu == true)
			{
				if(a.payu_result !=null){
					m = "<?= $lang_resource['V3_ORDER_PAID_PAYU'] ?> ";
				}else{
					m = "<?= $lang_resource['V3_ORDER_NOT_PAID_PAYU'] ?> ";
				}
			}
			
		if (n.business[g].paymethod.global == true)
        {
            //m = "<?= $lang_resource['ORDER_PAID_AUTHORIZE'] ?>";
            if(a.global_result !=null){
                    m = "<?= $lang_resource['ORDER_PAID_GLOBAL'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_GLOBAL'] ?> ";
                }
        }
		
		if (n.business[g].paymethod.btrans == true)
		{
			if(a.btrans_result !=null){
                    m = "<?= $lang_resource['ORDER_PAID_BTRANS'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_BTRANS'] ?>";
                }
			
		}
		if (n.business[g].paymethod.bsa == true)
		{
			if(a.bsa_result !=null){
                    m = "<?= $lang_resource['ORDER_PAID_BSA'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_BSA'] ?> ";
                }
			//m = "<?= $lang_resource['ORDER_PAID_PAYEEZY'] ?>";
			
		}
		if (n.business[g].paymethod.azul == true)
		{
			if(a.azul_result !=null){
                    m = "<?= $lang_resource['ORDER_PAID_AZUL'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_AZUL'] ?>";
                }
			
		}
		if (n.business[g].paymethod.quickpay == true)
			{
				if(a.quickpay_result !=null){
					m = "<?= $lang_resource['V3_ORDER_PAID_QUICKPAY'] ?> ";
				}else{
					m = "<?= $lang_resource['V3_ORDER_NOT_PAID_QUICKPAY'] ?> ";
				}
			}
			
		if (n.business[g].paymethod.paynl == true)
		{
			if(a.paynl_result !=null){
                    m = "<?= $lang_resource['ORDER_PAID_PAYNL'] ?> ";
                }else{
                    m = "<?= $lang_resource['ORDER_NOT_PAID_PAYNL'] ?>";
                }
			
		}
		if (n.business[g].paymethod.zaakpay == true)
			{
				if(a.zaakpay_result !=null){
					m = "<?= $lang_resource['V3_ORDER_PAID_ZAAKPAY'] ?> ";
				}else{
					m = "<?= $lang_resource['V3_ORDER_NOT_PAID_ZAAKPAY'] ?> ";
				}
			}
		
		if(a.pickuptime== null || a.pickuptime== undefined){
			a.pickuptime="00:00";
		}
		if(a.deliverytime== null || a.deliverytime== undefined){
			a.deliverytime="00:00";
		}
		p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_PAYMENT_METHOD'] ?>: '+m+'</p>'
		
		if (a.transactium_status=='Success')
		{
		p += "<p><?= $lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_CODE'] ?> " + a.transactium_tid + "</p>";	
		
		p += "<p><?= $lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_STATUS'] ?> " + a.transactium_status + "</p>";	
		}
		
		if(n.buyer.deliveryType) {
			
			if(n.buyer.deliveryType=="Plocka upp" || n.buyer.deliveryType=="pickup" || n.buyer.deliveryType=="Pick%20up"){
				p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: <?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_PICKUP']?></p>'					
				}else if(n.buyer.deliveryType=="Leverans" ||n.buyer.deliveryType== "delivery"){
				p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: <?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_DELIVERY']?></p>'			
				}else if(n.buyer.deliveryType=="Bokning"){
				p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: <?= $lang_resource['ADMIN_PAGE_PANEL_SEARCHBOX_TAB_RESERVATION']?></p>'			
				}
				else{
					p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: &nbsp;</p>'	
				}
			
			//p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TYPE'] ?>: '+n.buyer.deliveryType+'</p>'
		
		
		
			if(n.buyer.deliveryType.toLowerCase()=='delivery' || n.buyer.deliveryType=="Leverans"){
				if(a.deliverytime=='' || a.deliverytime=='undefined')
				a.deliverytime ='00:00';
			p +='<p><?= $lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] ?>: '+a.deliverytime+'</p>'
			}
			if(n.buyer.deliveryType.toLowerCase()=='pickup' ||n.buyer.deliveryType.toLowerCase()=='reservation' || n.buyer.deliveryType=="Pick%20up"){
				if(a.pickuptime=='' || a.pickuptime=='undefined')
				a.pickuptime ='00:00';
			p +='<p><?= $lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] ?>: '+a.pickuptime+'</p>'
			}
			
		}
		if(n.buyer.deliverydate) {
		p +='<p><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_DATE'] ?>: '+n.buyer.deliverydate+'</p>'
		}
		
		if(n.buyer.deliveryhours=='undefined' || n.buyer.deliveryhours==''){
			n.buyer.deliveryhours=00;
		}
		if(n.buyer.deliveryminute=='undefined' || n.buyer.deliveryminute==''){
			n.buyer.deliveryminute=00;
		}
		
		var deldate = n.buyer.deliverydate+" "+n.buyer.deliveryhours+":"+n.buyer.deliveryminute;
		
	if(n.buyer.deliverydate =='ASAP'){	
			 if(n.buyer.deliveryType.toLowerCase()=='pickup'|| n.buyer.deliveryType=="Plocka upp" || n.buyer.deliveryType.toLowerCase()=='reservation' || n.buyer.deliveryType=="Pick%20up"){
				 if(a.pickuptime=='' || a.pickuptime=='undefined')
				 a.pickuptime='00:00';
				if(a.pickuptime== '00:00'){
							var t3 = a.date;
				}else{
						var d = Date.parse(a.date) / 1000;		
						var openclosetime=a.pickuptime.split(":");		
						var hh = openclosetime[0]*60*60;	
						var mm = openclosetime[1]*60;		
						var hh_mm = +hh + +mm;
						var estimate_time = (+hh_mm + +d)*1000;	
						var now = new Date(estimate_time);		
						var t3 = (now.getFullYear() ) + '-' + (now.getMonth()+1) + '-' + now.getDate() + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds()))
				}
				
		}else if(n.buyer.deliveryType.toLowerCase()=='delivery' || n.buyer.deliveryType == 'Leverans'){
			if(a.deliverytime=='' || a.deliverytime=='undefined')
				 a.deliverytime='00:00';
			if(a.deliverytime== '00:00'){
				var t3 = a.date;
			}else{
				var d = Date.parse(a.date) / 1000;		
				var openclosetime=a.deliverytime.split(":");		
				var hh = openclosetime[0]*60*60;	
				var mm = openclosetime[1]*60;		
				var hh_mm = +hh + +mm;
				var estimate_time = (+hh_mm + +d)*1000;	
				var now = new Date(estimate_time);		
				var t3 = (now.getFullYear() ) + '-' + (now.getMonth()+1) + '-' + now.getDate() + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds()))
				}
		}
	}else{
		
		 if(n.buyer.deliveryType.toLowerCase()=='pickup'|| n.buyer.deliveryType=="Plocka upp" || n.buyer.deliveryType.toLowerCase()=='reservation' || n.buyer.deliveryType=="Pick%20up"){
			 if(a.pickuptime=='' || a.pickuptime=='undefined')
				 a.pickuptime='00:00';
			if(a.pickuptime== '00:00'){
				
							var t3 = deldate;
				}else{ 
			
						var d = Date.parse(deldate) / 1000;	
						
						var openclosetime=a.pickuptime.split(":");	
						
						var hh = openclosetime[0]*60*60;	
						var mm = openclosetime[1]*60;		
						var hh_mm = +hh + +mm;
					
						var estimate_time = (+hh_mm + +d)*1000;	

						var now = new Date(estimate_time);		
						var t3 = (now.getFullYear() ) + '-' + (now.getMonth()+1) + '-' + now.getDate() + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds()))
				}
				
		}else if(n.buyer.deliveryType.toLowerCase()=='delivery' || n.buyer.deliveryType == 'Leverans' || n.buyer.deliveryType == 'delivery'){
			if(a.deliverytime=='' || a.deliverytime=='undefined')
				 a.deliverytime='00:00';
			if(a.deliverytime== '00:00'){
				var t3 = deldate;
			}else{
					var d = Date.parse(deldate) / 1000;		
					var openclosetime=a.deliverytime.split(":");		
					var hh = openclosetime[0]*60*60;	
					var mm = openclosetime[1]*60;		
					var hh_mm = +hh + +mm;
					var estimate_time = (+hh_mm + +d)*1000;	
					var now = new Date(estimate_time);		
					var t3 = (now.getFullYear() ) + '-' + (now.getMonth()+1) + '-' + now.getDate() + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds()))
				}
		}
	}
	
		if(t3=="NaN-NaN-NaN NaN:NaN:NaN")
		{
			t3="00:00"
		}	
		p += '<span><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TIME'] ?> : '+t3+' </span><br/><br/>';
		if(n.buyer.deliveryhours) {}/*
						//Time selection settings. 
					time_format="<?=$lang_resource['TIME_FORMAT']?>";
					openclosetime=n.buyer.deliveryhours.split(" ");
					if(openclosetime.length>=2){
						set=false;
						for(i=0;i<openclosetime.length;i++ ){
								if(openclosetime[i]!=''){
									if(set==true){
										deliveryhours1=openclosetime[i];
									}
									set=true;
								}
							}
						
					}else{
						deliveryhours1=n.buyer.deliveryhours;
					}
				
					deliveryhours=deliveryhours1.split(":");

					time = deliveryhours[0]+':'+n.buyer.deliveryminute;
					openclosetime1= Main.ConvertTimeFormat(time);
					
					/*  if(Main.timeformat=="12"){
							
							closetime1='';
							
							openclosetime1='';
							
							
				   }else{
					   openclosetime1=Orders.zeroPad((deliveryhours[0]),2)+' : '+Orders.zeroPad((n.buyer.deliveryminute),2);
				   }*/
				
				
			//	p += '<span><?= $lang_resource['ORDER_DETAILS_BUSINESS_DELIVERY_TIME'] ?> : '+t3+' </span><br/><br/>';
				//alert(t3)
				//}
		
		
		
		
		p +='<div class=" table-responsive">'
		
		p +='<table class="table table-th-block table-striped">'
		p +='<thead>'
		p +='<tr>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_PRODUCT'] ?></th>'
		p +='<th><?= $lang_resource['BUSINESS_TAB_PRODUCT_OPTION_SET_PERSON'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_PRODUCT_OPTION'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_COMMENTS'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_DISHES_PRICE'] ?></th>'
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
        for (var f in n.business[g].dishes) {
		p +='<tr>'
		p +='<td>'+n.business[g].dishes[f].quantity+' X '+ n.business[g].dishes[f].name +'</td>'
		if(n.business[g].dishes[f].nofperson){
		p +='<td>'+ n.business[g].dishes[f].nofperson +'</td>'
		}
		else
		{
		p +='<td>&nbsp;</td>'
		}
		var c = new Array();
		var l = new Array();
		for (var e in n.business[g].dishes[f].ingredients) {
			if (n.business[g].dishes[f].ingredients[e].enabled) {
				c.push(n.business[g].dishes[f].ingredients[e].caption)
			}
		}
		
		
		
		p +='<td>'
		
		if(n.business[g].dishes[f].options)  {
		p += Main.Margeslash(n.business[g].dishes[f].options);
		}
		
		if(n.business[g].dishes[f].nofperson)  {
		p += '<?= $lang_resource['ORDER_DETAILS_DISHES_PERSON'] ?> : '+n.business[g].dishes[f].nofperson;
		}
		
	   /* var d = 0;
		for (e in c) {
			if (d == 0) {
				p += c[e]
			} else {
				p += ", " + c[e]
			}
			d++
		}*/
       p +='</td>'
		c = new Array();
		for (e in n.business[g].dishes[f].extras) {
			if (n.business[g].dishes[f].extras[e].enabled) {
				c.push(n.business[g].dishes[f].extras[e].name)
			} else {
				l.push(n.business[g].dishes[f].extras[e].name)
			}
		}
		
		
		/*p += '<td align="center">';
		d = 0;
		for (e in c) {
			if (d == 0) {
				p += c[e]
			} else {
				p += ", " + c[e]
			}
			d++
		}
		p += "</td>";*/
		
		p += '<td >' + Main.NullToEmpty(n.business[g].dishes[f].comments) + "</td>";
		
		p += '<td >'+Main.NullToEmpty(a.currency)+' '+ parseFloat(n.business[g].dishes[f].total).toFixed(IS_DECIMAL_POINT) + "</td>";
		p += "</tr>";

		h = parseFloat(parseFloat(h) + parseFloat(n.business[g].dishes[f].total)).toFixed(IS_DECIMAL_POINT)
		}
        h = parseFloat(parseFloat(h) + parseFloat(n.business[g].shipping)).toFixed(IS_DECIMAL_POINT);
		
		var b = "<?= $lang_resource['ORDER_DETAILS_DELIVERY_V2'] ?>";
		if (n.business[g].shipping == "0.00") {
			b = "<?= $lang_resource['ORDER_DETAILS_FREE_DELIVERY_V2'] ?>"
		}

		p +='<tr>'
		p +='<td>' + b +'</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		if(Main.NullToEmpty(n.buyer.comments) !=""){
			var strcomments = n.buyer.comments;	
			
			p +='<td>'+ Main.NullToEmpty(unescape(strcomments)) + '</td>'
		}else{
			p +='<td>&nbsp;</td>'
		}
		
		p +='<td>' +Main.NullToEmpty(a.currency)+' '+ parseFloat(n.business[g].shipping).toFixed(IS_DECIMAL_POINT) +'</td>'
        p +='</tr>'
		
		if(n.servicefeeTotal1){			
		p +='<tr>'
		p +='<td><?=$lang_resource['ADMIN_PAGE_SERVICE_FEE']?> ('+n.servicefee+'%)</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>' +Main.NullToEmpty(a.currency)+' '+ parseFloat(n.servicefeeTotal1).toFixed(IS_DECIMAL_POINT)  +'</td>'
        p +='</tr>'	
		}
		
		if(n.tax){			
		p +='<tr>'
		p +='<td>'
		p +='<?=$lang_resource['ADMIN_PAGE_TAX']?> ('+n.buyer.tax+'%)'
		if(n.buyer.taxtype==1){
		p +='<p><?=$lang_resource['ADMIN_PAGE_TAX_NOT_INCLUDED_IN_PRICE']?></p>'
		}else{
		p +='<p><?=$lang_resource['ADMIN_PAGE_TAX_INCLUDED_IN_PRICE']?></p>'
		}
		p +='</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>' +Main.NullToEmpty(a.currency)+ + parseFloat(n.tax).toFixed(IS_DECIMAL_POINT)  +'</td>'
        p +='</tr>'	
		}
		
		if(n.buyer.tips){
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_TIPS'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>' +Main.NullToEmpty(a.currency)+ + parseFloat(n.buyer.tips).toFixed(IS_DECIMAL_POINT)  +'</td>'
        p +='</tr>'
		}
		
		/*discount code section */
		
		if(n.discounttype > 0){
			if(parseFloat(n.discountprice)>0){
				if(n.discounttype == 1 && n.discountprice !=''){
					var discaption = '<?=$lang_resource['ORDER_DETAILS_SHOPPING_DISCOUNT_TEXT'] ?> ('+n.discountrate+'%)';
				}else{
					var discaption = '<?=$lang_resource['ORDER_DETAILS_SHOPPING_DISCOUNT_TEXT'] ?> ';
				}
				if(n.discountprice !=''){
					h = parseFloat(parseFloat(h) - parseFloat(n.discountprice)).toFixed(IS_DECIMAL_POINT);
					p +='<tr>'
					p +='<td>'+ discaption +'</td>'
					p +='<td>&nbsp;</td>'
					p +='<td>&nbsp;</td>'
					p +='<td>' + Main.NullToEmpty(n.discountcomments) + '</td>'
					p +='<td>' +Main.NullToEmpty(a.currency)+ +parseFloat(n.discountprice).toFixed(IS_DECIMAL_POINT)+ '</td>'
			        p +='</tr>'
				}
			}			
		}
		/*discount code section */
				
				
		p +='<tr>'
		p +='<td><?=$lang_resource['ADMIN_PAGE_TOTAL'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+ parseFloat(n.total).toFixed(IS_DECIMAL_POINT) +'</span></td>'
		p +='</tr>'
		
		if(Main.NullToEmpty(n.usedpointvalue) !="" && n.usedpointvalue !=0.00){
		p +='<tr>'
		p +='<td><?=$lang_resource['PAID_POINT_TOTAL'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		if(!(parseFloat(n.usedpointvalue))){
			 n.usedpointvalue=0;
			}
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+ parseFloat(n.usedpointvalue).toFixed(IS_DECIMAL_POINT) +'</span></td>'
		p +='</tr>'
		}
		

		
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div> '
		p +='</div>'
		<!--col-md-12-->
		p +='</div>'
		<!--row-->
	    }<!--if (n.business[g].id)-->
	    break;
		}<!--for (var g in n.business)-->
		}<!--if(n.business[0].dishes != "")-->

	  
	  
	  
		if(n.reservestatus){
			
		p +='<div class="row">'
		p +='<div class="col-md-12">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_RESERVE_NO'] ?> : ' + a.id +'</h3>'
		p +='</div>'
		p +='<div class="panel-body">'
		p +='<div class="row">'
		p +='<div class="col-md-3">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  Main.NullToEmpty(n.reserve.name) +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_EMAIL'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.reserve.email +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_PHONE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+ n.reserve.tel +'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_DATE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+Main.NullToEmpty(n.reserve.rdate)  +'</td>'
		p +='</tr>'
		p +='<tr>'
		
		p +='<td><?= $lang_resource['ORDER_DETAILS_RESERVE_TIME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>'+  Main.NullToEmpty(n.reserve.rhour) + ':'+ Main.NullToEmpty(n.reserve.rmin) +'</td>'
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		
		p +='</div>'
		<!--col-md-3-->
		p +='</div>'
		<!--row-->
		
		p +='<div class="doted-line"></div>'
		<!--doted-line-->
			
		p +='<div class=" table-responsive">'
		
		p +='<table class="table table-th-block table-striped">'
		p +='<thead>'
		p +='<tr>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_RESERVE_TYPE'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_RESERVE_QUANTITY'] ?></th>'
		p +='<th><?= $lang_resource['ORDER_DETAILS_RESERVE_PRICE'] ?></th>'
		p +='</tr>'
		p +='</thead>'
		p +='<tbody>'
		
		/**********************************************Room part******************************************/
		
		if(n.reserveQty.Room){
		if(n.reserveQty.Room.length != 0) {
        p += '<tr>'
		if(n.reserveQty.Room.length != 0)
		p += '<td style="font-weight: bold"><?= $lang_resource['ORDER_DETAILS_FRONT_RESERVATION_ROOM'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p += '</tr>';
		
		for(var rom = 0;rom <n.reserveQty.Room.length;rom++)  {
		p += '<tr>'
		if(n.reserveQty.Room.length != 0)
		p += '<td >'+n.reserveQty.Room[rom]+'</td>'
		 
		p += '<td >'
		if(n.reserveQty.Room.length != 0)
		p += '1'
		p += '</td>'
		var roomprice = n.reserveQty.Room.length * a.roomprice ;
		p += '<td>'
		if(roomprice != 0)
		p += '<span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+ parseFloat(a.roomprice).toFixed(IS_DECIMAL_POINT)+'</span>'
		p +='</td>'
		p += "</tr>";
			}
		}
		
		}
		/*********************************Room part****************************************************/	
		
		/************************************************table part*************************************************/
		if(n.reserveQty.Table){
		
		if(n.reserveQty.Table.length != 0) {
        p += '<tr>'
		if(n.reserveQty.Table.length != 0)
		p += '<td style="font-weight: bold"><?= $lang_resource['ORDER_DETAILS_FRONT_RESERVATION_TABLE'] ?></td>'
		tablearry = new Array();
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p += '</tr>';

		for(var tbl = 0;tbl <n.reserveQty.Table.length;tbl++)  {
		p += '<tr>'
		if(n.reserveQty.Table.length != 0)
		p +='<td>'+n.reserveQty.Table[tbl]+'</td>'
	 
		p += '<td>'
		if(n.reserveQty.Table.length != 0)
		p += '1';
		p += '</td>'
		var tableprice = n.reserveQty.Table.length * a.tableprice ;
		p += '<td >'
		if(tableprice != 0)
		p += '<span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+ parseFloat(a.tableprice).toFixed(IS_DECIMAL_POINT)+'</span>'
		p +='</td>'
		p += "</tr>";
				 }
			}
		}
		/******************************************table part****************************************************/	
		
		/*******************************************Free part******************************************/
		if(n.reserveQty.Free){
		if(n.reserveQty.Free.length != 0) {
				
        p += '<tr>'
			   
		if(n.reserveQty.Free.length != 0)
		p += '<td style="font-weight: bold"><?= $lang_resource['ORDER_DETAILS_FRONT_RESERVATION_FREE'] ?></td>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		p += '</tr>';
		
	    for(var fre = 0;fre <n.reserveQty.Free.length;fre++)  {
		p += '<tr>'
		if(n.reserveQty.Free.length != 0)
		 p += '<td>'+n.reserveQty.Free[fre]+'</td>'
		 
		 
		p += '<td>'
			if(n.reserveQty.Free.length != 0)
		p += '1'		
		p += '</td>'
		
		var freeprice = n.reserveQty.Free.length * a.freeprice ;
		p += '<td>'
		if(freeprice != 0)
		p += '<span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+ parseFloat(a.freeprice).toFixed(IS_DECIMAL_POINT)+'</span>'
		
		p +='</td>'
		p += "</tr>";
				}
			}
			
		}
		/**********************************Free part**********************************************/			
		
		
		p +='<tr>'
		p +='<td>&nbsp;</td>'
		p +='<td>&nbsp;</td>'
		
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+parseFloat(n.reserveFee).toFixed(IS_DECIMAL_POINT)+'</span></td>'
		p +='</tr>'
		
		p +='</tbody>'
		p +='</table>'
		p +='</div>'
		
		p +='</div>'
		<!-- /.panel-body -->
		p +='</div> '
		p +='</div>'
		<!--col-md-12-->
		p +='</div>'
		<!--row-->
		}
		
		}else{
			var n1 = JSON.parse(a.requestcollectiondata);
			console.log(JSON.stringify(n1));
			
			
		p +='<div class="row">'
		p +='<div class="col-md-12">'
		p +='<div class="panel panel-default  panel-square panel-no-border">'
		p +='<div class="panel-heading">'
		p +='<h3 class="panel-title"><?= $lang_resource['ORDER_DETAILS_ORDER_NO'] ?> : ' + a.id +'</h3>'
		p +='</div>'
			p +='<div class="doted-line"></div>'
		p +='<div class="panel-body">'
		
		
		
		 for(n in n1){
			 p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="table-responsive">'
			 	console.log(JSON.stringify(n1[n]));
				p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
	
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_name+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_address1+','+ n1[n].customer_address2+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_postcode+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_contactno+'</td>'
		p +='</tr>'
		
	
			p +='</tbody>'
		p +='</table>'
				p +='</div>'
		
		p +='</div>'
		<!--col-md-6-->
		
	 p +='<div class="row">'
		p +='<div class="col-md-6">'
		p +='<div class="table-responsive">'
			 	console.log(JSON.stringify(n1[n]));
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
	
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_NAME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_name+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_postcode+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' +  n1[n].resturent_collection_time+'</td>'
		p +='</tr>'
		
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_other_value+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].resturent_other_reference+'</td>'
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'] ?></td>'
		p +='<td>:</td>'
		p +='<td>' + n1[n].customer_note+'</td>'
		p +='</tr>'
			p +='</tbody>'
		p +='</table>'
				p +='</div>'
		
		p +='</div>'
		<!--col-md-6-->
				
		 }
		
		
		
		
		
	

		p +='</div>'
		<!--row-->
			p +='<div class="doted-line"></div>'
			m = "<?= $lang_resource['PAID_with_Paypal_V2'] ?> ("+n1[n].paypalid+")";
		 p +='<div class="row">'
					p +='<div class="col-md-12">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block order-datails-tbl">'
		p +='<tbody>'
		p +='<tr>'
		p +='<td><?= $lang_resource['PAYMENT_METHOD_V2'] ?> '+ m +'</td>'
		
		p +='</tr>'
		p +='<tr>'
		p +='<td><?= $lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'] ?>: <?= $lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'] ?></td>'
		
		p +='</tr>'
		p +='</tbody>'
		p +='</table>'
		
		p +='</div>'
		
		p +='</div>'
		<!--col-md-12-->
		p +='</div>'<!--row-->
						

		
		
		p +='<div class="doted-line"></div>'
		<!--doted-line-->
		
		 p +='<div class="row">'
					p +='<div class="col-md-12">'
		p +='<div class="table-responsive">'
		p +='<table class="table table-th-block table-striped">'
		p +='<tr>'
		p +='<td><?= $lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'] ?></td>'
		
		p +='<td><span style="color:#ff283d; font-weight:700; font-size:14px">' +Main.NullToEmpty(a.currency)+' '+n1[n].deliveryprice + '</span></td>'
		p +='</tr>'
		p +='</table>'
		//alert(Orders.map)
		//if(Orders.map=='t'){
		
		
		p +='</div>'
		<!--col-md-12-->
		p +='</div>'<!--row-->
			p +='<div class="doted-line"></div>'
		
		
			
		}
		if(Orders.map=='t'){
		p +='<div style="padding-top:10px">';
		
		p +='<div id="mapboxuser" class="ordermapbox" ></div>'; 
		p +='<div><button type="button" class=" btn btn-success" style="margin-bottom:10px;"  id="edit_button92" onclick="CreateOrder.Main('+n.business[0].id+','+a.id+')">Edit Order</button></div>';    
		p +='</div>';
		//}
		p +='</div>'
		}
		document.getElementById("main").innerHTML = p	
		
		//alert(a.userlocation)
		var location = JSON.parse(a.userlocation)
		
		if(Orders.map=='t'){
		    e = new Object();
            e.latitud = location.lat;
            e.longitud = location.long;
			/*e.latitud = 26.2987376;
            e.longitud = 50.19097290000002;*/
       	    e.zoom = 15
	
// GoogleMap.Init("mapbox", e.latitud, e.longitud, e.zoom, null, null, Business.MapReady, "bottomright")
            GoogleMap.Init("mapboxuser", e.latitud,e.longitud, e.zoom, Orders.UserLocationUpdated);
		/*$.post("lib/orders.php", "f=GetNeighborDataById&id=" + n.buyer.colony, function (x) {
		
		document.getElementById("colony_text").innerHTML = x
		
		});*/
		}
    },
	
	UserLocationUpdated: function () {
		
			
		  },
	
	zeroPad : function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
   },
    Save: function () {
        if (Forms.CanSave("order") == false) {
            return
        }
		 Main.Loading();
        Forms.PrepareForSaving("order");
		$.post("lib/orders.php", "f=SaveOrder&data=" + JSON.stringify(Forms.Form.order), function (b) {
		$("#chatAudio").remove();
       Main.ApprovedOrder();
			
			$.fn.jAlert({ //create an alert
					'title': 'Confirmation',
					'message': 'The Order Succesfully Updated',
					'closeBtn': false,
					'onOpen': function(alert){ //when the alert opens
						//alert.closeAlert(false); //the false means don't remove it, just hide it.
						setTimeout(function(){ alert.closeAlert(); }, 1000);
					}
				});
			Main.Ready();  	
			Orders.Main()
		});
		
        Forms.Clean("order")
    },
	SearchQuery: function () {
		Orders.searchfield = Forms.Form['ordersearch'].fields['search'].value;
		$.post("lib/orders.php", "f=SearchOrderData&data=" + JSON.stringify(Forms.Form.ordersearch), function (c) {
			
			if (c != "") {
                Orders.Orders = JSON.parse(c);
                for (var b in Orders.Orders) {
                    Orders.Orders[b].cname = Orders.Orders[b].city.name
                }
				IS_PENDING_COUNT = 0;
				IS_UPCOMING_COUNT = 0;
				IS_PROGRESS_COUNT = 0;
				IS_COMPLETE_COUNT = 0;
				IS_CANCEL_COUNT = 0;
				IS_COUNT = 0;
                Orders.PupulateTable(Main.Config.Orders.List.SortBy, true)
            } else {
                alert("Error")
            }																					   
		});
	},
    Export: function (b,val) {
		if(val == 1){var classname ='checkbox'}else if(val == 3){var classname = 'checkboxprogress'}else if(val == 4){var classname ='checkboxcomplete'}else if(val == 5){var classname ='checkboxcancelled'}
        var c = Main.GetMarkedCheckBoxesValuesByClass(classname);
        if (c.length == 0) {
			alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
       
        var a = new Object();
        a.ids = c;
        a.type = b;
        document.getElementById("exp_data").value = JSON.stringify(a);
        document.getElementById("exp_form").submit()
    },
    Delete: function (val) {
		
		if(val == 1){var classname ='checkbox'}else if(val == 3){var classname = 'checkboxprogress'}else if(val == 4){var classname ='checkboxcomplete'}else if(val == 5){var classname ='checkboxcancelled'}
        var b = Main.GetMarkedCheckBoxesValuesByClass(classname);
        if (b.length == 0) {
			alert("<?=$lang_resource['ORDER_DETAILS_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("orders", null, "f=DeleteOrder&data=" + JSON.stringify(a), "Orders.Main()")
    },
	
};
