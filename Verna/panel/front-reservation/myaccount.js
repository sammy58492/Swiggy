var MyAccount ={
	Start: function(){
	    $('#main').hide();
	    $("body").addClass("grey_body");
	    $("header").removeClass("inner_header")
	    Popup.LoginClose();
		var mca = ''
		mca +='<div class=" inner_banner_black">'
		mca +='<div class="container">'
		mca +='<div class="restaurant_info">'
		mca +='<h3>MY ACCOUNT</h3>'

		mca +='</div>'<!--restaurant_info-->
		mca +='</div>'<!--container-->
		mca +='</div>'<!--inner_banner_black-->

		mca +='<div class="container">'
		mca +='<div class="row">'
		mca +='<div class="col-md-8 col-md-offset-2">'
		mca +='<div class="border_box_tab">'
		mca +='<div class="tabs_dv">'
		mca +='<ul class="myaccounttab">'
		mca +='<li><a href="javascript:MyAccount.EditProfile()" class="active">Edit account</a></li>'
		mca +='<li><a href="javascript:MyAccount.MyOrders()">My orders</a></li>'
		mca +='<li><a href="javascript:MyAccount.FavResturant()">Favorite restaurants</a></li>'
		//mca +='<li><a href="javascript:MyAccount.ManageAddress()">Manage addresses</a></li>'
		mca +='<li><a href="javascript:MyAccount.ChangePassword()">Change password</a></li>'
		mca +='</ul>'
		mca +='</div>'<!--tabs_dv-->
		mca +='<div class="clearfix"></div>'<!--clearfix-->
		mca +='<div class="tab_content_wrapper" id="myaccountcontent">'
		//content of all tab
		mca +='</div>'<!--tab_content_wrapper-->
		mca +='</div>'<!--border_box_tab-->
		mca +='</div>'<!--col-md-8-->
		mca +='</div>'<!--row-->
		mca +='</div>'<!--container-->

		
		$("#frontvisual").empty().append(mca)
		$('ul.myaccounttab li a').click(function(e) {
			$('.myaccounttab li a.active').removeClass('active');
			var $this = $(this);
			$this.addClass('active');			
		});
		MyAccount.EditProfile()

	},
	EditProfile: function(){
		var e = new Date().getTime();
		Main.Aid = e;
		Main.Loading();
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"},{"operation":"FetchUserInfo"}]', function (c){
			if (e != Main.Aid){
				return
			}
			Main.Ready();
			if (c != ""){
				c = JSON.parse(c);
				MyAccount.Countries = c.countries;
				Forms.Clean("user", "popupmainbuttonok");
		        Main.ActiveForm = "user";
		        Uploader.Clean();
		        GoogleMap.Clean();
		        Forms.Form.user.user = c.user;
				MyAccount.EditAccount(c.user);				
			}
		})
	},
	EditAccount: function(b){
		if (b){
			var FF = new Array();
			FF.push({
				id: "",
				caption: "<?=$lang_resource['PLEASE_SELECT']?>"
			});
			Forms.Form.user.type = "modify"
			Forms.Form.user.city = b.city;
		
			for (i in Main.Franchises){
				FF.push({
					id: Main.Franchises[i].id,
					caption: Main.Franchises[i].city
				})
			}
		}else{
			b = new Object();
			Forms.Form.user.type = "create";
			Forms.CreateValue("user", "config", "{}", false, false, true)

			var FF = new Array();
			FF.push({
				id: "",
				caption: "<?=$lang_resource['PLEASE_SELECT']?>"
			});
		}

		/* Choose country */
		var d = new Array();
		d.push({
			id: "",
			caption: "<?=$lang_resource['PLEASE_SELECT']?>"
		});
		for (i in Main.Countries){
			d.push({
				id: Main.Countries[i].id,
				caption: Main.Countries[i].name
			})
		}
		var FF1 = new Array();
		FF1.push({
			id: "",
			caption: "<?=$lang_resource['PLEASE_SELECT']?>"
		});
		/* Choose country */

		var html =''
		html += Visuals.RegisterField(b,d,FF,FF1)
		html +='<div class="row">'
		html +='<div class="col-md-6 col-md-offset-3">'
		html +='<div class="form-group create_btn_dv">'
		html +='<button type="button" class=" red_btn_small" id="pop_submit_btn" onclick="Main.PreUserForm()">Update</button>'
		html +='</div>'<!--form-group-->
		html +='</div>'<!--col-md-12-->
		html +='</div>'
		$("#myaccountcontent").empty().append(html) 
		Main.PreUserForm()
	},
	MyOrders: function (a){
		var b = new Date().getTime();
		Main.Loading(a);
		Main.Aid = b;
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchMyOrders"}]', function (c){

			if (b != Main.Aid){
				return
			}
			Main.Ready(a);

			if (c != ""){
				Main.Ga("/orders");
				Main.Orders = JSON.parse(c).orders;

				var myod = ''
				myod +='<div class="row">'
				myod +='<div class="col-md-12">'
				myod +='<div class="table-responsive">'
				myod +='<table class="table table-striped">'
				myod +='<thead>'
				myod +='<tr>'
				myod +='<th>No.</th>'
				myod +='<th><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?></th>'
				myod +='<th><?= $lang_resource['ORDERS_BOX_BUSINESS_HEADER'] ?></th>'
				myod +='<th><?= $lang_resource['ORDERS_BOX_CITY_HEADER'] ?></th>'
				myod +='<th><?= $lang_resource['ORDERS_BOX_STATUS_HEADER'] ?></th>'
				myod +='<th>&nbsp;</th>'
				myod +='</tr>'
				myod +='</thead>'
				myod +='<tbody>'
				for (var e in Main.Orders){		
					myod +='<tr class="hand">'
					myod +='<td onclick="Main.OpenOrderConfirm('+Main.Orders[e].id+')">'+Main.Orders[e].id+'</td>'
					//Time selection settings. 
					time_format="<?=$lang_resource['TIME_FORMAT']?>";
					if(time_format=="12"){
						closetime1='';
						opentime1='';
						opentime=new Array();
						closetime=new Array();
						openclosetime=new Array();
						openclosetime1='';
						openclosetime=Main.Orders[e].date.split(" ");
						closetime=openclosetime[1].split(":");
						closetime1= Main.convertTimeFormat(closetime[0],closetime[1]);
						openclosetime1=openclosetime[0]+' '+closetime1;
					}else{
						openclosetime1=Main.Orders[e].date;
					}
					myod +='<td onclick="Main.OpenOrderConfirm('+Main.Orders[e].id+')">'+Main.NullToEmpty(openclosetime1)+'</td>'
					myod +='<td onclick="Main.OpenOrderConfirm('+Main.Orders[e].id+')">'+Main.NullToEmpty(Main.Orders[e].busname)+'</td>'
					myod +='<td onclick="Main.OpenOrderConfirm('+Main.Orders[e].id+')">'+Main.NullToEmpty(Main.Orders[e].city)+'</td>'
					myod +='<td onclick="Main.OpenOrderConfirm('+Main.Orders[e].id+')">'+Main.NullToEmpty(Main.Orders[e].statustext)+'</td>'
					if(Main.Orders[e].bpermission == "t") {
						myod +='<td><button type="button" class="re-order" onclick="Main.Reorderalert('+Main.Orders[e].id+')"><?= $lang_resource['TRACK_REORDER'] ?></button></td>'
					}else{
						myod +='<td>&nbsp;</td>'
					}
					myod +='</tr>'
				}
				myod +='</tbody>'
				myod +='</table>'
				myod +='</div>'
				myod +='</div>'<!--col-md-6-->

				myod +='</div>'<!--row-->
				$("#myaccountcontent").empty().append(myod) 
			}else{
				alert("Error")
			}
		})
	},
	FavResturant: function(){
		var e = new Date().getTime();
		Main.Aid = e;
		Main.Loading();

		$.post("panel/lib/front-main.php", "f=FetchFav", function (c){
			if (e != Main.Aid){
				return
			}
			Main.Ready();
			MyAccount.recData = new Array();
			MyAccount.recData = JSON.parse(c);
			MyAccount.FavResturantPrintmain()
		});
	},
	FavResturantPrintmain:function () {
		var html = ''
		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<input type="text" class="form-control listing_searcfield" id="favressearch" placeholder="Search here">'
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		html +='<div class="row">'
		html +='<div class="col-md-12">'
		html +='<div class="table-responsive">'
		html +='<table class="table">'
		html +='<tbody id="favrestlist">'



		html +='</tbody>'
		html +='</table>'
		html +='</div>'
		html +='</div>'<!--col-md-6-->

		html +='</div>'<!--row-->
		$("#myaccountcontent").empty().append(html) 

		document.getElementById("favressearch").onkeyup = function () {
            MyAccount.PupulateFavResturantTable()
        };
        MyAccount.PupulateFavResturantTable()
	},
	PupulateFavResturantTable: function () {
		var htms =''
		for (var n in MyAccount.recData) {  

            rsl = false;
            rss = document.getElementById("favressearch").value.toLowerCase();           
            if (MyAccount.recData[n].bname.toLowerCase().indexOf(rss) >= 0){
                rsl = true;
            }

            if(rsl){
            	MyAccount.recData[n].bname = MyAccount.recData[n].bname.replace("`","'")
				htms +='<tr>'
				htms +='<td width="43%">'+MyAccount.recData[n].bname+'</td>'
				htms +='<td width="43%">'+MyAccount.recData[n].badd+'</td>'
				htms +='<td width="23%"><button type="button" class="remove_btn" onclick="MyAccount.DelFav('+MyAccount.recData[n].id+')"><?= $lang_resource['MYACCOUNT_REMOVE'] ?></button></td>'
				htms +='</tr>'
            }
        }
        $("#favrestlist").empty().append(htms)
	},
	DelFav: function(id){
		$.post("panel/lib/front-main.php", "f=DelFav&id="+id, function (k){
			MyAccount.FavResturant();
		});
	},
	ManageAddress: function () {
		$.post("panel/lib/myaccount.php", "f=FetchAllDataByUser", function (f){
			if (f != "") { 
				f = JSON.parse(f);
				MyAccount.acount = f;
				MyAccount.ManageAddressPrintMain()
			} else {
				alert("<?= $lang_resource['ERROR_V21'] ?>")
			}
		});
	},
	ManageAddressPrintMain: function (c) {
		Forms.Clean("myaddressform", "popupmainbuttonok");
		if (c == null) {
			c = new Object();
			Forms.Form.myaddressform.type = "create";
		} else {
			Forms.Form.myaddressform.type = "modify";
			Forms.Form.myaddressform.id = c.id
		}
		this.ActiveForm = "myaddressform";
		Forms.Form.myaddressform.country = 1;
		Forms.Form.myaddressform.usr = Main.User.id;

		var html = ''
		html +='<h5><?= $lang_resource['MYACCOUNT_MY_ADDRESS'] ?></h5>'
		html +='<div class="row">'
		html +='<div class="col-md-6">'

		var g="";
		g ='[{"id":" ","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_SELECT_ONE']?>"},{"id":"3","caption":"Home"},{"id":"4","caption":"Office"},{"id":"5","caption":"Public Area"}]';
		g = JSON.parse(g);

		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['CONTROL_PANEL_GALLERY_TYPE_HEADER'] ?></label>'
		html +=Forms.CreateSelectProperty("myaddressform", "billingtype", g, c.billingtype, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['NAMECITY_V21'] ?></label>'
		html +=Forms.CreateInputProperty("myaddressform", "name",c.name, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['MYACCOUNT_COMPANY'] ?></label>'
		html +=Forms.CreateInputProperty("myaddressform", "company",c.company, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['Home_address_V2'] ?></label>'
		html +=Forms.CreateInputProperty("myaddressform", "address", c.address, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['EXPORT_CITY'] ?></label>'
		html +=Forms.CreateInputProperty("myaddressform", "city",c.city, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['MYACCOUNT_STATE'] ?></label>'
		html +=Forms.CreateInputProperty("myaddressform", "state",c.state, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['MYACCOUNT_POSTAL_CODE'] ?></label>'
		html +=Forms.CreateInputProperty("myaddressform", "pcode", c.pcode, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['FRONT_PANEL_PHONE_NUMBER'] ?></label>'
		html +=Forms.CreateInputProperty("myaddressform", "phone", c.phone, true)
		html +='</div>'<!--form-group-->
		html +='<div class="form-group">'
		html +='<button type="button" class=" red_btn_small" onclick="MyAccount.ManageAddressSave();"><?= $lang_resource['MYACCOUNT_SAVE_ADDRESS'] ?></button>'
		html +='</div>'<!--form-group-->

		html +='</div>'<!--col-md-6-->
		html +='<div class="col-md-6">'
		
		var counter = 1;	
		for (var h in MyAccount.acount){
			html +='<div class="form-group">'
			html +='<label>Address '+counter+'</label>'
			html +='<div class=" my_address_dv">'
			html +='<p>'+Main.NullToEmpty(MyAccount.acount[h].address)+'</p>'
			html +='<p>'+Main.NullToEmpty(MyAccount.acount[h].city)+'</p>'
			html +='</div>'
			html +='</div>'<!--form-group-->
			html +='<div class="form-group">'
			html +='<button type="button" class=" red_btn_small" onclick="MyAccount.ManageAddressEdit('+Main.NullToEmpty(MyAccount.acount[h].id)+')">Edit Address</button>'
			html +='</div>'<!--form-group-->
		}

		html +='</div>'<!--col-md-6-->
		html +='</div>'<!--row-->
		$("#myaccountcontent").empty().append(html) 
	},
	ManageAddressSave: function () {
		if (Forms.CanSave("myaddressform") == false) {
			alert("Please Enter Mandatory Field")
			return
		}
		Forms.PrepareForSaving("myaddressform");
		Main.Loading();
		var b = new Date().getTime();
		Main.Aid = b;
		$.post("panel/lib/myaccount.php", "f=SaveAddress&data=" + JSON.stringify(Forms.Form.myaddressform), function (e) {
			if (b != Main.Aid) {
				return
			}
			Main.Ready();
			MyAccount.ManageAddress()			
		})
		Forms.Clean("myaddressform")
	},
	ManageAddressEdit: function (id) {	
		Main.Loading();
		var b = new Date().getTime();
		Main.Aid = b;	
		$.post("panel/lib/myaccount.php", "f=FetchAllDataById&id=" +id, function (f){
			if (b != Main.Aid) {
				return
			}
			Main.Ready();
	 		if (f != "") {				
				MyAccount.ManageAddressPrintMain(JSON.parse(f));				
			} 
       	});
	},
	ChangePassword: function(){
		Forms.Clean("change", "popupmainbuttonok");
		var html = ''
		html +='<div class="row">'
		html +='<div class="col-md-12">'                        
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['CHANGE_PASSWORD_CURRENT'] ?></label>'
		html +=Forms.CreateInputPropertyPopUp("change", "current", "", true,"","",true)
		html +='</div>'<!--form-group-->                            
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		html +='<div class="row">'
		html +='<div class="col-md-12">'                        
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['CHANGE_PASSWORD_NEW'] ?></label>'
		html +=Forms.CreateInputPropertyPopUp("change", "newpwd", "", true,"","",true)
		html +='</div>'<!--form-group-->                            
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		html +='<div class="row">'
		html +='<div class="col-md-12">'                        
		html +='<div class="form-group">'
		html +='<label><?= $lang_resource['CHANGE_PASSWORD_CONFIRM'] ?></label>'
		html +=Forms.CreateInputPropertyPopUp("change", "retype", "", true,"","",true)
		html +='</div>'<!--form-group-->                            
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		html +='<div class="row">'
		html +='<div class="col-md-6 col-md-offset-3">'                       
		html +='<div class="form-group"><br>'
		html +='<button type="button" class=" red_btn_small" onclick="Main.ChangePassSend()"><?= $lang_resource['FRONT_MY_SUBMIT'] ?></button>'
		html +='</div>'<!--form-group-->                            
		html +='</div>'<!--col-md-12-->
		html +='</div>'<!--row-->
		$("#myaccountcontent").empty().append(html) 
	},
};