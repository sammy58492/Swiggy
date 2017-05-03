var tmp=""
var MyAccount = {

  Start: function (c)
    {
            
			
        	 var e = new Date().getTime();
			Main.Aid = e;
			Main.Loading();
		
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"},{"operation":"FetchMostPopularsData"},{"operation":"FetchWhereAmIData"},{"operation":"FetchRecentActivityData"}]', function (b)
        {
			
		
	          Main.Ready();
			  
			 if (b != "")
			 {
				b = JSON.parse(b);
				if(!b.user) {
					swal("Error","<?= $lang_resource['SHOPPING_LOGIN_FIRST'] ?>","error");
				} 
				else {
					$('.popdiv').hide();
					$('.popdiv_pop').hide();
					
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (e)
				   {
					  if (e != ""){
					  e = JSON.parse(e);
					  MyAccount.Countries = e.countries;
					  }
				   });
		//alert(b.user.id)
					var uid=b.user.id;
				   $.post("panel/lib/myaccount.php", "f=FetchAllDataByUser&uid="+uid, function (f){
				
				     
					 if (f != "") { 
						f = JSON.parse(f);
						MyAccount.acount =f;
						MyAccount.commonForm(MyAccount.acount,c,1);
					 } else {
					 	swal("Error","<?= $lang_resource['ERROR_V21'] ?>","error");
					 }
				  });
				 								
			   }
						
			}
		});
			
 },
 
Start1: function (c)
    {
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"},{"operation":"FetchMostPopularsData"},{"operation":"FetchWhereAmIData"},{"operation":"FetchRecentActivityData"}]', function (b)
        {
	 
			 if (b != "")
			 {
				b = JSON.parse(b);
				if(!b.user) {
					swal("Error","<?= $lang_resource['MYACCOUNT_PLEASE_LOGIN_FIRST'] ?>","error");
				} 
				else {
					
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (e)
				   {
					  if (e != ""){
					  e = JSON.parse(e);
					  MyAccount.Countries = e.countries;
					  }
				   });
		//alert(b.user.id)
					var uid=b.user.id;

				  $.post("panel/lib/myaccount.php", "f=FetchAllDataByUserBillingOnly&uid="+uid, function (f1){
					//alert(f1)
					 if (f1 != "") { 
						f1 = JSON.parse(f1);
						MyAccount.acount1 =f1;
						MyAccount.commonForm2(MyAccount.acount1,c,2);
					 } else {
					 	swal("Error","<?= $lang_resource['ERROR_V21'] ?>","error");
					 }
				  });	
								
			   }
						
			}
		});
			
			
			
	},
	
	
	Start3: function (c)
    {
		  var e = new Date().getTime();
        Main.Aid = e;
        Main.Loading();
		
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"},{"operation":"FetchMostPopularsData"},{"operation":"FetchWhereAmIData"},{"operation":"FetchRecentActivityData"}]', function (b)
        {
			
	
			 if (b != "")
			 {
				b = JSON.parse(b);
				if(!b.user) {
					swal("Error","<?= $lang_resource['MYACCOUNT_PLEASE_LOGIN_FIRST'] ?>","error");
				} 
				else {
	
					var uid=b.user.id;
				   		 
						MyAccount.favresturantForm(4,uid);	
								
			   }
						
			}
		});
			
		
	},
	
	
	Start4: function (c)
    {
		
		$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"},{"operation":"FetchMostPopularsData"},{"operation":"FetchWhereAmIData"},{"operation":"FetchRecentActivityData"}]', function (b)
        {
	 
			 if (b != "")
			 {
				b = JSON.parse(b);
				if(!b.user) {
					swal("Error","<?= $lang_resource['MYACCOUNT_PLEASE_LOGIN_FIRST'] ?>","error");
				} 
				else {
	
					var uid=b.user.id;
				
				
						MyAccount.OrderForm(3,uid);
								
			   }
						
			}
		});
			
			
			
	},

	Start5: function (c)
    {
		  var e = new Date().getTime();
        Main.Aid = e;
        Main.Loading();
		
			$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"},{"operation":"FetchMostPopularsData"},{"operation":"FetchWhereAmIData"},{"operation":"FetchRecentActivityData"}]', function (b)
        {
			
	
			 if (b != "")
			 {
				b = JSON.parse(b);
				if(!b.user) {
					swal("Error","<?= $lang_resource['MYACCOUNT_PLEASE_LOGIN_FIRST'] ?>","error");
				} 
				else {
	
					var uid=b.user.id;
				   		 
						MyAccount.accountpointform(5,uid);	
								
			   }
						
			}
		});
	},
	
	
	 OrderForm: function (check,uid){
			
			
              $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchMyOrders"}]', function (c)
              {
				  Main.Orders = JSON.parse(c).orders;
				
			if (Main.Orders.length > 0)
            {
				
                Main.Ga("/orders");
               
				
                var d = '<div class="contentbox">';
                d += '<div class="titlebox nonselectable">';
                d += '<span class="title">&gt;&gt; <?= $lang_resource['ORDERS_BOX_TITLE'] ?></span>';
                d += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
                d += "</div>";
                d += '<div class="table">';
                d += '<div class="title nonselectable default">';
                d += '<div class="oid" style="width:82px !important;"><span class="caption">#</span></div>';
                d += '<div class="businessprovider"" style="width:117px !important;"><span class="caption"><?= $lang_resource['ORDERS_BOX_DATE_HEADER'] ?></span></div>';
                d += '<div class="ordercity" style="width:182px !important;"><span class="caption"><?= $lang_resource['ORDERS_BOX_CITY_HEADER'] ?></span></div>';
                d += '<div class="orderstatus" style="width:166px !important;"><span class="caption"><?= $lang_resource['ORDERS_BOX_STATUS_HEADER'] ?></span></div>';
                d += "</div>";
				 d += '<div class="container" style="width: auto; height: auto; overflow: hidden;" id="orders">';
               
                
                     	  
                    for (var e in Main.Orders)
                    {
                        var f;
                        if (e % 2 == 0)
                        {
                            f = " grey"
                        }
                        else
                        {
                            f = ""
                        }
                        d += '<div class="nonselectable hand row' + f + '" style="border-bottom:1px solid #e4e4e4;" onclick="Main.OpenEachOrder(' + Main.Quote(Main.NullToEmpty(Main.Orders[e].id)) + ',true)">';
                        d += '<div class="oid" style="width:82px !important;"><div class="cap"><span class="caption">' + Main.Orders[e].id + "</span></div></div>";
						
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
                        d += '<div class="businessprovider" style="width:117px !important;"><div class="cap"><span class="caption">' + Main.NullToEmpty(openclosetime1) + "</span></div></div>";
                        d += '<div class="ordercity" style="width:182px !important;"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].city) + "</span></div></div>";
                        d += '<div class="orderstatus" style="width:166px !important;"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].statustext) + "</span></div></div>";
                        d += "</div>"
                    }
				  
					
					 d += "</div></div>";
                
            }
			 else
				  {
					   var d = '<div class="contentbox">';
                         d += '<div class="titlebox nonselectable">';
					   d += "<div>No order present</div>";
				  }
			
			

			MyAccount.accounttab(d,check);
			  });
				
				
	 },


LoginBoxPOP: function ()
	 {   
	   
	    $.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchUserInfo"},{"operation":"FetchMostPopularsData"},{"operation":"FetchWhereAmIData"},{"operation":"FetchRecentActivityData"}]', function (b)
        {
			
	  var a_htm = "";
         if (b != "")
            {
                        b = JSON.parse(b);
						//alert(JSON.stringify(b.user))
						if(b.user) {
							Main.User = b.user;
							var bx = Main.GetUserBoxHtml();
			 a_htm += '<div id="usermenu1">'+bx+'<div>';
						
						} 

		else {
		   a_htm +='<div id="usermenu1"><div onclick="Facebook.Login()" style="text-align: center; margin-top:20px;"><img src="panel/theme/en/fb_login.png" /></div><center style="margin-top:10px;"><?= $lang_resource['MYACCOUNT_OR'] ?></center><br><div style="margin-left:90px; font-family: Arial, Helvetica, sans-serif; font-size: 14px;"><span style="margin-bottom:5px;"><?= $lang_resource['MYACCOUNT_EMAIL_ID'] ?></span><br clear="all" /><input type="text" placeholder="<?= $lang_resource['LOGIN_INPUT_EMAIL'] ?>" id="loginemail" class="pop_text" style="margin-top:8px;"/><span><br clear="all" /><?= $lang_resource['Password_V2'] ?></span><br clear="all" /><input type="password" class="pop_text" style="margin-top:8px;" placeholder="<?= $lang_resource['LOGIN_INPUT_PASSWORD'] ?>" id="loginpassword" onkeyup="Main.LoginPwdType(event)"/></div><div class="buttonbox"><div class="buttoninner hand" onclick="Main.Login()"><span class="login-btn-cst trcknw hand nonselectable primary-login1"><?= $lang_resource['LOGIN_BUTTON_LOGIN'] ?></span></div></div><br clear="all"/><div style="float:left; margin-left:90px;font-family:Arial, Helvetica, sans-serif; font-size:12px;"><input type="checkbox" name="remember" value="1" style="margin-right:5px;"><?= $lang_resource['FRONT_REMEMBER_ME'] ?></div><span class="recover hand nonselectable"  style="margin-left:20px;font-family:Arial, Helvetica, sans-serif; font-size:12px;" onclick="Main.RecoverPassword(true)"><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></span><span class="register hand nonselectable" style="float:left; margin-left:180px;font-family:Arial, Helvetica, sans-serif; font-size:12px; background: #f5f5f5; width: auto; padding: 5px 10px; border: 1px solid #ccc; border-radius: 5px;" onclick="Main.EditAccount(true)"><?= $lang_resource['LOGIN_LINK_CREATE_ACCOUNT'] ?></span><div>';
				//alert("hghg");
		}
			}
		
		
		Popup.Show(500, 430, a_htm);
		 })
				 
		
	},

 GetUserBoxHtml: function ()
    {
		
        var a = '<span class="welcome default"><?= $lang_resource['LOGIN_WELCOME_TEXT'] ?> ' + Main.User.name + '!</span>';
        a += '<ul class="actions">';
		if (Main.User.level < 2)
        {
        a += '<li><span class="hand" onclick="Main.MyOrders(false)"><?= $lang_resource['LOGIN_LINK_MY_ORDERS'] ?></span></li>';
		}
        if (Main.User.level < 2)
        {
            a += '<li><span class="hand" onclick="top.location.href=\'panel\'"><?= $lang_resource['LOGIN_LINK_CONTROL_PANEL'] ?></span></li>'
        }
		
        else
        {
            a += '<li><span class="hand" onclick="Main.EditAccount()"><?= $lang_resource['LOGIN_LINK_EDIT_PROFILE'] ?></span></li>'
        }
		
        a += '<li><span class="hand" onclick="Main.LogOut()"><?= $lang_resource['LOGIN_LINK_SESSION_CLOSE'] ?></span></li>';
        a += "</ul>";
		
	
        return a
    },

	
 commonForm: function (e,c,check){
	
	     
		  
		   
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

			var b = '<div class="mytitlebox">';
			if(check == 1){
				b += '<span class="mytitle"><?= $lang_resource['MYACCOUNT_MY_ADDRESS'] ?></span>'
			}else if(check == 2){
				b += '<span class="mytitle"><?= $lang_resource['MYACCOUNT_BILLING_INFO'] ?></span>'
			}
			 	b +='</div>'
				b += '<div class="myeditform">'

				b += '<div class="leftwr">'
			var counter = 1;	
			for (var h in e) {
				b +='<div class="row"><span class="mycaption"><b style="margin:0 0 10px 0; display: block;">Address '+counter+'</b>'+  Main.NullToEmpty(e[h].address)+', '+  Main.NullToEmpty(e[h].city)+'</span>'
				counter +=1;
				b +='<div class="clearfix"></div>'
				b +='<button class="editbtn" onclick="MyAccount.Edit('+Main.NullToEmpty(e[h].id)+','+check+')">Edit Address</button></div>'
			}
				b +='</div>'
				
				
				b += '<div class="rightwr" style="width: 47% !important;">'
				var g="";
				if(check == 1){
				g ='[{"id":" ","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_SELECT_ONE']?>"},{"id":"3","caption":"Home"},{"id":"4","caption":"Office"},{"id":"5","caption":"Public Area"}]';
				}else if(check == 2){
				g ='[{"id":"1","caption":"Billing"}]';	
				}
        		g = JSON.parse(g);
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['CONTROL_PANEL_GALLERY_TYPE_HEADER'] ?> </span><div class="myinputbox">'+ Forms.CreateSelectProperty("myaddressform", "billingtype", g, c.billingtype, true) +'</div></div>'
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['NAMECITY_V21'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "name",c.name, true) + '</div></div>'
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['MYACCOUNT_COMPANY'] ?> </span><div class="myinputbox">'+ Forms.CreateInputProperty("myaddressform", "company",c.company, true) + '</div></div>'
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['Home_address_V2'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "address", c.address, true) + '</div></div>'
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['EXPORT_CITY'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "city",c.city, true) + '</div></div>'
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['MYACCOUNT_STATE'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "state",c.state, true) + '</div></div>'
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['MYACCOUNT_POSTAL_CODE'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "pcode", c.pcode, true) + '</div></div>'
				/*var d = new Array();
				d.push(
				{
					id: "-1",
					caption: "Select One"
				});
				for (var i in MyAccount.Countries)
				{
					d.push(
					{
						id: MyAccount.Countries[i].id,
						caption: MyAccount.Countries[i].name
					})
				}
				
				b += '<div class="row"><span class="myrcaption">Country </span><div class="myinputbox">'+ Forms.CreateSelectProperty("myaddressform", "country",d,c.country, true) + '</div></div>'*/
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['FRONT_PANEL_PHONE_NUMBER'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "phone", c.phone, true) + '</div></div>'
				
				b += '<div class="row"><div class="myinputbox">'
				if(check == 1){
				b +='<button class="editbtn" onclick="MyAccount.Save(1);"><?= $lang_resource['MYACCOUNT_SAVE_ADDRESS'] ?></button>'
	 			}else if(check == 2){
				b +='<button class="editbtn" onclick="MyAccount.Save(2);"><?= $lang_resource['MYACCOUNT_SAVE_ADDRESS'] ?></button>'
	 			}
				//b +='<span style="margin: 0 0 0 8px;">Or</span>'
				//b +='<button class="editbtn" onclick="MyAccount.Reset();">Cancel</button>'				
				b +='</div></div>'

               
						
        		b += '</div>'
				b +='</div>'
				
				
				MyAccount.accounttab(b,check);
				
	 },
	 
	 
	 commonForm2: function (e,c,check){
	
	   
		
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
		   
	

			var b = '<div class="mytitlebox">';
			
				b += '<span class="mytitle"><?= $lang_resource['MYACCOUNT_BILLING_INFO'] ?></span>'
			
			 	b +='</div>'
				b += '<div class="myeditform">'

				b += '<div class="leftwr">'
			var counter = 1;
			
			
			
			if(e!="")
			{
				
			for (var h in e) {
				b +='<div class="row"><span class="mycaption"><b style="margin:0 0 10px 0; display: block;">Card No </b>'+  Main.NullToEmpty(e[h].cardno)+ '</span>'
				counter +=1;
				b +='<div class="clearfix"></div>'
				b +='<button class="editbtn" onclick="MyAccount.Edit('+Main.NullToEmpty(e[h].id)+','+check+')"><?= $lang_resource['MYACCOUNT_EDIT'] ?></button></div>'
			}
			
			}
			
			
				b +='</div>'
				
				
				b += '<div class="rightwr">'
				var g="";
				var g1="";
				var g2="";
				
				g ='[{"id":"","caption":"Select Type"},{"id":"6","caption":"Visa"},{"id":"7","caption":"Mastercard"},{"id":"8","caption":"Discovery"}]';	
				g = JSON.parse(g);
				
				g1 ='[{"id":"","caption":"<?= $lang_resource['MYACCOUNT_SELECT_MONTH'] ?>"},{"id":"January","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_JAN'] ?>"},{"id":"February","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FEB'] ?>"},{"id":"March","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAR'] ?>"},{"id":"April","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_APR'] ?>"},{"id":"May","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAY'] ?>"},{"id":"June","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUN'] ?>"},{"id":"July","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUL'] ?>"},{"id":"August","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_AUG'] ?>"},{"id":"September","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SEP'] ?>"},{"id":"October","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_OCT'] ?>"},{"id":"November","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_NOV'] ?>"},{"id":"December","caption":"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_DEC'] ?>"}]';	
				g1 = JSON.parse(g1);
				
				var g2 = new Array();
                g2.push({
            id: "",
            caption: "Select Year"
        });
        
		for(var i=2014;i<=2040;i++)
		{
        g2.push(
            {
                id: i,
                caption: i
            })
		}
				
				/*g2 ='[{"id":"","caption":"Select Year"},{"id":"2014","caption":"2014"},{"id":"2015","caption":"2015"},{"id":"2016","caption":"2016"},{"id":"2017","caption":"2017"},{"id":"2018","caption":"2018"}]';	
				g2 = JSON.parse(g2);*/
				
				
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_NAME_HEADER'] ?> </span><div class="myinputbox">'+ Forms.CreateSelectProperty("myaddressform", "billingtype", g, c.billingtype, true) +'</div></div>'
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['MYACCOUNT_CARD_NO'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty7("myaddressform", "cardno",c.cardno, true) + '</div></div>'
				
				
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['MYACCOUNT_EXPIRY_MONTH'] ?> </span><div class="myinputbox">' + Forms.CreateSelectProperty("myaddressform", "month", g1, c.month, true) + '</div></div>'
				
				
				
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['MYACCOUNT_EXPIRT_YEAR'] ?> </span><div class="myinputbox">' + Forms.CreateSelectProperty("myaddressform", "year", g2, c.year, true) + '</div></div>'
				
				b += '<div class="row"><span class="myrcaption"><?= $lang_resource['MYACCOUNT_CVV_NO'] ?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "cvvno",c.cvvno, true) + '</div></div>'
				
				
				b += '<div class="row"><div class="myinputbox">'
				
				b +='<button class="editbtn" onclick="MyAccount.SaveBilling(2);"><?= $lang_resource['SMS_BUSSINESS_SAVE_BUTTON'] ?></button>'
	 		
				b +='<span style="margin: 0 0 0 8px;"><?= $lang_resource['ELSE_V2'] ?></span>'
				b +='<button class="editbtn" onclick="MyAccount.tabs(1);"><?= $lang_resource['save_V2'] ?></button>'				
				b +='</div></div>'

               
						
        		b += '</div>'
				b +='</div>'
				
			
				
				MyAccount.accounttab(b,check);
				
	 },
	 
	 
	  favresturantForm: function (check,uid){
			
	 		Main.Ready();
		
			var search_txt = document.getElementById("searchs_txt").value;
			
				
			var b = '<div class="mytitlebox">';
				b += '<span class="mytitle"><?= $lang_resource['MYACCOUNT_FAVORITE_RESTAURANT'] ?></span>'
		
			 	b +='</div>'
				
				
				
				
				
				if(search_txt)
				{
				
				$.post("panel/lib/front-main.php", "f=FetchFav&search_txt="+search_txt, function (c)
                {
					console.log(c)
					
			        var recData = new Array();
			         recData = JSON.parse(c);
					 
				
					 
					 if(recData.length > 0)
					 {
							b +='<div style="float:left;"><input type="text" id="search1" class="result" placeholder="<?=$lang_resource['MY_ACCOUNT_SEARCH']?>" onkeyup="MyAccount.CheckFav(this)" onkeydown="Javascript: if (event.keyCode==13) { MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\') }">'
				//b +='<input type="checkbox" name="checkAll" id="checkAll" value="1" onclick="MyAccount.CheckAllFav()">'
				b +='<div style="float:left;"><button onclick="MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\')" class="searchAll"><?= $lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] ?></button></div>'
				//b +='<button onclick="MyAccount.favresturantForm()">Search</button>'
				b +='<div style="float:left;"><button onclick="MyAccount.DelFav()" class="removeAll"><?= $lang_resource['MYACCOUNT_REMOVE'] ?></button></div></div>' 
					  
						 
					 b +='<table class="favorite"  id="tab1">'	  
					 for (var h in recData) {
					
					    b +='<tr>'	 
					   b += '<td><input type="checkbox" name="chkfav[]" value="'+recData[h].id+'" style="opacity:1"></td>';	
					  b += '<td><a href="'+recData[h].bcslug+'" style="color: #000;text-decoration: none;">'+recData[h].bname+'</a></td>';	 	 
					   b += '<td>'+recData[h].badd+'</td>';	 	
					    b +='</tr>'	 	
						 
						  }
					 
					 
			
					 b +='</table>'	
					 }
					 else
					 {
						  b +='<div style="float: left;text-align: center;width: 100%;height: 20px;margin-top: 10px;">'	 	 
					     b += '<?= $lang_resource['MYACCOUNT_NO_SEARCH_RESULT_FOUND'] ?>';	 	
					    b +='</div>'	
						 
					 }
			 
			    
				MyAccount.accounttab(b,check);	 
		        });
				
				}
				else
				{
			
					$.post("panel/lib/front-main.php", "f=FetchFav", function (c)
                {
				
			        var recData = new Array();
			         recData = JSON.parse(c);
					 
					
					
					  if(recData.length > 0)
					 { 
					 
					  b +='<div style="float:left;"><input type="text" id="search1" class="result" placeholder="<?=$lang_resource['MY_ACCOUNT_SEARCH']?>" onkeyup="MyAccount.CheckFav(this)" onkeydown="Javascript: if (event.keyCode==13) { MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\') }">'
				//b +='<input type="checkbox" name="checkAll" id="checkAll" value="1" onclick="MyAccount.CheckAllFav()">'
				b +='<div style="float:left;"><button onclick="MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\')" class="searchAll"><?= $lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] ?></button></div>'
				//b +='<button onclick="MyAccount.favresturantForm()">Search</button>'
				b +='<div style="float:left;"><button onclick="MyAccount.DelFav()" class="removeAll"><?= $lang_resource['MYACCOUNT_REMOVE'] ?></button></div></div>'
					 
					 b +='<table class="favorite"  id="tab1">'	 
					
					  
					 for (var h in recData) {
					
					    		    b +='<tr>'	
					   b += '<td><input type="checkbox" name="chkfav[]" value="'+recData[h].id+'" style="opacity:1"></td>';	
					   b += '<td><a href="'+recData[h].bcslug+'" style="color: #000;text-decoration: none;">'+recData[h].bname+'</a></td>';	 
					   b += '<td>'+recData[h].badd+'</td>';	 	
					    b +='</tr>'	 	
						 
						  }
					 
				
					 b +='</table>'	

					 
					  }
					 else
					 {
						  b +='<div style="float:left;">'	 	 
					     b += '<?= $lang_resource['MYACCOUNT_NO_FAVORITE_RESTAURANT_ADDED'] ?>';	 	
					    b +='</div>'	
						 
					 }
			 
			    
				MyAccount.accounttab(b,check);	 
		        });
					
				}
				
				
				
				
	 },


	 //////////////////////////////////////for points//////////////////////////////////////
	  accountpointform: function (check,uid){
			
	 		Main.Ready();
		
			//var search_txt = document.getElementById("searchs_txt").value;
			
				
			var b = '<div class="mytitlebox">';
				b += '<span class="mytitle"><?= $lang_resource['MYACCOUNT_POINT_HISTORY'] ?></span>'
		
			 	b +='</div>'
				
				
				
				
				
				
				
			 
					$.post("panel/lib/myaccount.php", "f=FetchAllUsersPoint&uid="+uid, function (c)

                {
				
			        var recData = new Array();
			         recData = JSON.parse(c);
					 
					
					
					  if(recData.length > 0)
					 { 
					 
					 
				//b +='<input type="checkbox" name="checkAll" id="checkAll" value="1" onclick="MyAccount.CheckAllFav()">'
				b +='<div class="point_heading"><h3><?= $lang_resource['MYACCOUNT_EARNED_POINTS'] ?></h3></div>'
				//b +='<button onclick="MyAccount.favresturantForm()">Search</button>'
				
					 
					 
					 

					 b +='<div>'
					  b +='<table class="earned_tbl"  id="tab5" cellspacing="0">'
					  b +='<thead>'	 
					 b +='<tr>'
					
					 b+='<th width="15%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_ORDERID'] ?></th>'
					 b+='<th width="20%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_DATE'] ?></th>'
					 b+='<th width="20%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_RESTAURANT'] ?></th>'
					 b+='<th width="30%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_ORDERPRICE'] ?></th>'
					 b+='<th width="30%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_POINTS'] ?></th>'
					 b+='<th width="20%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_POINTS_VALUE'] ?></th>'
					 b+='</tr>'
					 b+='</thead>'
					 b +='<tbody id="history">' 
					 var total_point_of_values=0;
					 var total_points_recevied=0;
					 for (var h in recData) {
						
					   b +='<tr>'	
					   b += '<td>'+recData[h].orderid+'</td>';	
					   b += '<td>'+recData[h].date+'</td>';					  
					   b += '<td>'+recData[h].bname+'</td>';
					   b += '<td>'+recData[h].Price+'</td>';	 	
					   b += '<td>'+recData[h].points_received+'</td>';
					   b +='<td>'+recData[h].total_value_of_earned_points+'</td>'

					    b +='</tr>'	 

					    total_point_of_values = parseFloat(total_point_of_values)+parseFloat(recData[h].total_value_of_earned_points);	
						total_points_recevied =	parseFloat(total_points_recevied)+parseFloat(recData[h].points_received);
					}
					 



					 b +='</tbody>'
					 b +='</table>'	


					 //alert(recData[0].extra_point_added_by_super_admin)
					if(recData[0].extra_point_added_by_super_admin != 0)
					{
					 b+='<p><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_EXTRA_GIVEN_BY_SUPER_ADMIN'] ?>'

					 b+='<span>'+recData[0].extra_point_added_by_super_admin+'</span>' 
					} 
					 
						
					  
						if(recData[h].points_received!=null)
					   total_points_recevied=total_points_recevied+parseFloat(recData[0].extra_point_added_by_super_admin);
					
					 

					
					
					

					 b +='<div class="tot_earned_points">'


					 
						 b +='<p><?= $lang_resource['MYACCOUNT_EARNED_POINTS_TOTAL'] ?>: '+total_points_recevied+'</p>'
						 b +='<p><?= $lang_resource['MYACCOUNT_EARNED_POINTS_TOTAL_VALUES'] ?>: $'+total_point_of_values+'</p>'
					
					 b +='</div>'

					 b +='</div>'

					 b +='<div class="point_heading" ><h3><?= $lang_resource['MYACCOUNT_USED_POINTS'] ?></h3></div>'
					 b +='<table class="used_tbl"  id="tab5" cellspacing="0">'
					  b +='<thead>'	 
					 b +='<tr>'
					
					 b+='<th width="15%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_ORDERID'] ?></th>'
					 b+='<th width="20%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_DATE'] ?></th>'
					 b+='<th width="20%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_HEADERS_RESTAURANT'] ?></th>'
					 b+='<th width="30%"><?= $lang_resource['MYACCOUNT_EARNED_POINTS_USED_POINTS'] ?></th>'
					 
					 b+='</tr>'
					 b+='</thead>'
					 b +='<tbody id="history">' 

					 var total_points_available=0;
					 var total_value_of_points_available=0;
					 var available_points=0;
					 var point_value=0;

					 for (var h in recData) {
					
					   b +='<tr>'	
					   b += '<td>'+recData[h].orderid+'</td>';	
					   b += '<td>'+recData[h].date+'</td>';					  
					   b += '<td>'+recData[h].bname+'</td>';	 	
					   b += '<td>'+recData[h].points_used+'</td>';
					   if(recData[h].points_used != null)
					   {
					   		available_points=parseFloat(recData[h].points_received )-parseFloat(recData[h].points_used);
					   }
					   else
					   {
					   		available_points=parseFloat(recData[h].points_received );
					   }
					   //alert(available_points)
					   point_value=available_points*parseFloat(recData[h].valueofonepoint)
					   total_points_available = parseFloat(total_points_available)+parseFloat(available_points);
					   total_value_of_points_available=parseFloat(total_value_of_points_available)+parseFloat(point_value);
					    b +='</tr>'	

						 
						  }
						total_points_available=total_points_available+parseFloat(recData[0].extra_point_added_by_super_admin);
					 
					 b +='</tbody>'
					 b +='</table>'	
					 b +='<div class="tot_earned_points">'


					 
						 b +='<p><?= $lang_resource['MYACCOUNT_EARNED_POINTS_TOTAL_AVAILABLE'] ?>: '+total_points_available+'</p>'
						 b +='<p><?= $lang_resource['MYACCOUNT_EARNED_POINTS_TOTAL_AVAILABLE_POINTS_VALUE'] ?>: $'+total_value_of_points_available+'</p>'
					
					 b +='</div>'
					  }
					 else
					 {
						  b +='<div style="float:left;">'	 	 
					     b += '<?= $lang_resource['MYACCOUNT_NO_POINTS_FOUND'] ?>';	 	
					    b +='</div>'	
						 
					 }
			 
			    
				MyAccount.accounttab(b,check);	 
		        });
					
				
				
				
				
				
	 },
	 ///////////////////////////////////////for points////////////////////////////////////
	 
	CheckFav: function(a)
	{
	    var stxt = a.value.toLowerCase();
		document.getElementById("searchs_txt").value = stxt;
		
	}
	, 
	 
	 DelFav: function()
	 {
		
       var a = new Array();; 
	   
    var cboxes = document.getElementsByName('chkfav[]');
    var len = cboxes.length;
    for (var i=0; i<len; i++) {
       // alert(i + (cboxes[i].checked?' checked ':' unchecked ') + cboxes[i].value);
	   if(cboxes[i].checked)
	   a.push(cboxes[i].value)
    }
  
     $.post("panel/lib/front-main.php", "f=DelFav&checkarr="+JSON.stringify(a), function (k){
		
		MyAccount.tabs(4);
	 });
  
	 }
	 ,

    CheckAllFav: function()
	{
	
	   // alert(document.getElementById("checkAll").value)
	   
	   var cboxes = document.getElementsByName('checkAll');
		   
        /*if ($("#checkAll").is(':checked')) {*/
		if (cboxes[0].checked) {
			
           /* $("#tab1 input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });*/

        } else {
		
           /* $("#tab1 input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });*/
        }
  
		
	}
	,
	accounttab: function (b,check){

var a = '<div class="popup_wrapper">';
			//a  +='<div style="background-color:#e17257;color:white;height:50px;line-height:50px;font-weight:bold;font-size:18px; border-radius:10px 10px 0 0;"><span class="title" style="margin-left:10px;">My Account Settings</span></div>'
			
			
			a += '<div class="pop_header">';
      	a +='<div class="pop_heading">';
	    	a +='<h3><?= $lang_resource['MYACCOUNT_MY_ACCOUNT_SETTINGS'] ?></h3>';
        a +='</div>';
		 a +='<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	a +='<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()"><?= $lang_resource['MYACCOUNT_X'] ?></button>';
        a +='</div>';
		
		a +='</div>';
			
							
			if(check == 1){

				a +='<ul class="nav addtabs" role="tablist" id="myTab" style="width: 98.5% !important;">'
  				a +='<li id="tab1" class="active"><a href="javascript:void(0)" onclick="MyAccount.tabs(1)" role="tab" data-toggle="tab"><?=$lang_resource['MYACOUNT_ADD_EDIT']?></a></li>'
				//a +='<li id="tab2"><a href="javascript:void(0)" onclick="MyAccount.tabs(2)" role="tab" data-toggle="tab">Billing Info</a></li>'
				//a +='<li id="tab3" ><a href="javascript:void(0)" onclick="MyAccount.tabs(3)" role="tab" data-toggle="tab">Order History</a></li>'
				a +='<li id="tab4"><a href="javascript:void(0)" onclick="MyAccount.tabs(4)" role="tab" data-toggle="tab"><?=$lang_resource['FAVOURITE_RESTAURENT_TEXT']?></a></li>'
				a +='<li id="tab2"><a href="javascript:void(0)" onclick="Main.EditAccount()" role="tab" data-toggle="tab"><?=$lang_resource['MYACCOUNT_MYPROFILE']?></a></li>'
				if(Main.ItemPointPermission==1)
				a +='<li id="tab5"><a href="javascript:void(0)" onclick="MyAccount.tabs(5)" role="tab" data-toggle="tab"><?=$lang_resource['MYACCOUNT_MYPOINTS']?></a></li>'
				a +='</ul>'
				
				a +='<div class="tab-content" style="width: 95.6% !important;">'
				a +='<div class="tab-pane"  id="myaddress">'+b+'</div>'					
				a +='<div class="tab-pane"  style="display:none;" id="billing">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="history">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="resturants">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="points">'+b+'</div>'
				a +='</div>';
			}
			else if(check == 2){
				a +='<ul class="nav addtabs" role="tablist" id="myTab" style="width: 98.5% !important;">'
  				a +='<li id="tab1" ><a href="javascript:void(0)" onclick="MyAccount.tabs(1)" role="tab" data-toggle="tab"><?=$lang_resource['MYACOUNT_ADD_EDIT']?></a></li>'
				//a +='<li id="tab2" class="active"><a href="javascript:void(0)" onclick="MyAccount.tabs(2)" role="tab" data-toggle="tab">Billing Info</a></li>'
				//a +='<li id="tab3" ><a href="javascript:void(0)" onclick="MyAccount.tabs(3)" role="tab" data-toggle="tab">Order History</a></li>'
				a +='<li id="tab4"><a href="javascript:void(0)" onclick="MyAccount.tabs(4)" role="tab" data-toggle="tab"><?=$lang_resource['FAVOURITE_RESTAURENT_TEXT']?></a></li>'
				a +='<li id="tab2"><a href="javascript:void(0)" onclick="Main.EditAccount()" role="tab" data-toggle="tab"><?=$lang_resource['MYACCOUNT_MYPROFILE']?></a></li>'
				a +='<li id="tab5"><a href="javascript:void(0)" onclick="MyAccount.tabs(5)" role="tab" data-toggle="tab"><?=$lang_resource['MYACCOUNT_MYPOINTS']?></a></li>'
				a +='</ul>'
				
				a +='<div class="tab-content" style="width: 95.6% !important;">'
				a +='<div class="tab-pane"  style="display:none;"  id="myaddress">'+b+'</div>'					
				a +='<div class="tab-pane" id="billing">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="history">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="resturants">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="points">'+b+'</div>'
				a +='</div>';

			} 
			else if(check == 3){
                

				a +='<ul class="nav addtabs" role="tablist" id="myTab" style="width: 98.5% !important;">'
  				a +='<li id="tab1" ><a href="javascript:void(0)" onclick="MyAccount.tabs(1)" role="tab" data-toggle="tab"><?=$lang_resource['MYACOUNT_ADD_EDIT']?></a></li>'
				//a +='<li id="tab2"><a href="javascript:void(0)" onclick="MyAccount.tabs(2)" role="tab" data-toggle="tab">Billing Info</a></li>'
				//a +='<li id="tab3" class="active"><a href="javascript:void(0)" onclick="MyAccount.tabs(3)" role="tab" data-toggle="tab">Order History</a></li>'
				a +='<li id="tab4"><a href="javascript:void(0)" onclick="MyAccount.tabs(4)" role="tab" data-toggle="tab"><?=$lang_resource['FAVOURITE_RESTAURENT_TEXT']?></a></li>'
				a +='<li id="tab5"><a href="javascript:void(0)" onclick="MyAccount.tabs(5)" role="tab" data-toggle="tab"><?=$lang_resource['MYACCOUNT_MYPOINTS']?></a></li>'
				a +='</ul>'
				
				a +='<div class="tab-content" style="width: 95.6% !important;">'
				a +='<div class="tab-pane"  style=""  id="myaddress">'+b+'</div>'					
				a +='<div class="tab-pane"  style="display:none;" id="billing">'+b+'</div>'
				a +='<div class="tab-pane" id="history">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="resturants">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="points">'+b+'</div>'
				a +='</div>';
				
				
				
			}
			else if(check == 4){
				
		
				a +='<ul class="nav addtabs" role="tablist" id="myTab" style="width: 98.5% !important;">'
  				a +='<li id="tab1" ><a href="javascript:void(0)" onclick="MyAccount.tabs(1)" role="tab" data-toggle="tab"><?=$lang_resource['MYACOUNT_ADD_EDIT']?></a></li>'
				//a +='<li id="tab2"><a href="javascript:void(0)" onclick="MyAccount.tabs(2)" role="tab" data-toggle="tab">Billing Info</a></li>'
			//	a +='<li id="tab3" ><a href="javascript:void(0)" onclick="MyAccount.tabs(3)" role="tab" data-toggle="tab">Order History</a></li>'
				a +='<li id="tab4" class="active"><a href="javascript:void(0)" onclick="MyAccount.tabs(4)" role="tab" data-toggle="tab"><?=$lang_resource['FAVOURITE_RESTAURENT_TEXT']?></a></li>'
				a +='<div class="tab-pane"  style="display:none;" id="points">'+b+'</div>'
				a +='</ul>'
				//a +='<input id="search" type="text" placeholder="Filter">'
				
				a +='<div class="tab-content" id="myTab" style="width: 95.6% !important;">'
				a +='<div class="tab-pane" style="display:none;" id="myaddress">'+b+'</div>'					
				a +='<div class="tab-pane"  style="display:none;" id="billing">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="history">'+b+'</div>'
				a +='<div class="tab-pane" id="resturants">'+b+'</div>'
				a +='</div>';
				
				
				
			}
			else if(check == 5){
				a +='<ul class="nav addtabs" role="tablist" id="myTab" style="width: 98.5% !important;">'
  				a +='<li id="tab1" ><a href="javascript:void(0)" onclick="MyAccount.tabs(1)" role="tab" data-toggle="tab"><?=$lang_resource['MYACOUNT_ADD_EDIT']?></a></li>'
				//a +='<li id="tab2"><a href="javascript:void(0)" onclick="MyAccount.tabs(2)" role="tab" data-toggle="tab">Billing Info</a></li>'
			//	a +='<li id="tab3" ><a href="javascript:void(0)" onclick="MyAccount.tabs(3)" role="tab" data-toggle="tab">Order History</a></li>'
				a +='<li id="tab4"><a href="javascript:void(0)" onclick="MyAccount.tabs(4)" role="tab" data-toggle="tab"><?=$lang_resource['FAVOURITE_RESTAURENT_TEXT']?></a></li>'
				a +='<li id="tab4" class="active"><a href="javascript:void(0)" onclick="MyAccount.tabs(5)" role="tab" data-toggle="tab"><?=$lang_resource['MYACCOUNT_MYPOINTS']?></a></li>'
				a +='</ul>'
				//a +='<input id="search" type="text" placeholder="Filter">'
				
				a +='<div class="tab-content" id="myTab" style="width: 95.6% !important;">'
				a +='<div class="tab-pane" style="display:none;" id="myaddress">'+b+'</div>'					
				a +='<div class="tab-pane"  style="display:none;" id="billing">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="history">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none" id="resturants">'+b+'</div>'
				a +='<div class="tab-pane" id="points">'+b+'</div>'
				a +='</div>';
			}
		
		a +='</div>';		
		//Popup.ShowNew(700, "", e,Shopping.EditEndUserChoices, null,null)
			
			Popup.ShowFP(700, 700, a, function ()
			{
				
	
			}, function ()
			{
				
				Forms.Clean("myaddress");
				Main.Ga(Main.ActiveView)
			})
	
	},	 



 	tabs: function (a)
    {
		
		//alert(a)
		if(a==1){
			
			$("#myaddress").show();
			$("#billing").hide();
			$("#history").hide();
			$("#resturants").hide();
			
			
			
			$("#tab1").addClass("active");
			
			$("#tab2").removeClass("active");
			$("#tab3").removeClass("active");
			$("#tab4").removeClass("active");
			
			MyAccount.Start()
			
		}
		else if(a == 2){
			
			$("#myaddress").hide();
			$("#billing").show();
			$("#history").hide();
			$("#resturants").hide();			
			
			$("#tab2").addClass("active");
			
			$("#tab1").removeClass("active");
			$("#tab3").removeClass("active");
			$("#tab4").removeClass("active");
			
			 MyAccount.Start1()
			
		}
		else if(a == 3){
			
			$("#myaddress").hide();
			$("#billing").hide();
			$("#history").show();
			$("#resturants").hide();
			
			$("#tab3").addClass("active");
			
			$("#tab1").removeClass("active");
			$("#tab2").removeClass("active");
			$("#tab4").removeClass("active");
			
			MyAccount.Start4()
			
		}
		else if(a == 4){
			
			
			$("#myaddress").hide();
			$("#billing").hide();
			$("#history").hide();
			$("#resturants").show();
			
			$("#tab4").addClass("active");

			$("#tab1").removeClass("active");			
			$("#tab2").removeClass("active");
			$("#tab3").removeClass("active");
        
            document.getElementById("searchs_txt").value = "";
			
			
			MyAccount.Start3()
		}
		else if(a==5)
		{
			
			$("#myaddress").hide();
			$("#billing").hide();
			$("#history").hide();
			$("#resturants").hide();
			$('#points').show();
			
			$("#tab5").addClass("active");
			$("#tab4").removeClass("active");

			$("#tab1").removeClass("active");			
			$("#tab2").removeClass("active");
			$("#tab3").removeClass("active");
			MyAccount.Start5()
		}
	},
	
	Save: function (c) {

                if (Forms.CanSave("myaddressform") == false) {
					swal("Error","Please Enter Mandatory Field","error");
					return
				}
				
			
				Forms.PrepareForSaving("myaddressform");
				Main.Loading();
				var b = new Date().getTime();
				Main.Aid = b;
				
				$.post("panel/lib/myaccount.php", "f=SaveAddress&data=" + JSON.stringify(Forms.Form.myaddressform), function (e) {
				  
				  console.log(e);
				  if (b != Main.Aid) {
					return
				  }
				  Main.Ready();
				 if(c == 1){ 
				  MyAccount.Start()
				 }else if(c == 2){ 
				  MyAccount.Start1()
				 }
				})
				Forms.Clean("myaddressform")
		

    },
	
	
	SaveBilling: function (c) {

             
			
				//Forms.PrepareForSaving("myaddressform");
				Main.Loading();
				var b = new Date().getTime();
				Main.Aid = b;
				//alert(JSON.stringify(Forms.Form.myaddressform));
				$.post("panel/lib/myaccount.php", "f=SaveAddressBilling&data=" + JSON.stringify(Forms.Form.myaddressform), function (e) {
				  
				  console.log(e);
				  if (b != Main.Aid) {
					return
				  }
				  Main.Ready();
				 if(c == 1){ 
				  MyAccount.Start()
				 }else if(c == 2){ 
				  MyAccount.Start1()
				 }
				})
				Forms.Clean("myaddressform")
		

    },
	
	
	
	Edit: function (id,check1){
		
		check=check1;
		$.post("panel/lib/myaccount.php", "f=FetchAllDataById&id=" +id, function (f){
	 		
			if (f != "") {
				if(check == 1){
				MyAccount.Start(JSON.parse(f));
				}
				if(check == 2){
				MyAccount.Start1(JSON.parse(f));
				}
			} 
       	});
	},

	Reset: function (){
		
	},

	Remove: function (id,uid){
		$.post("panel/lib/myaccount.php", "f=DeleteresturantChoice&id="+id+"&uid="+uid, function (f){
			//alert(f)
			MyAccount.Start3()
		});
		
	},
	Remove1: function (uid){
			var b=[]	
  $('.checkbox:checked').each(function(){
        b.push($(this).val());
    });
		//alert(b);
       
		$.post("panel/lib/myaccount.php", "f=DeleteresturantChoiceByCheck&data="+ JSON.stringify(b)+"&uid="+uid, function (f){
			//alert(f)
			MyAccount.Start3()
		});
		
	}
	
}
