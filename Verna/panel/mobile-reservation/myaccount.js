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
					alert("<?=$lang_resource['SHOPPING_LOGIN_FIRST']?>")
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
					var uid=b.user.id;
				   $.post("panel/lib/myaccount.php", "f=FetchAllDataByUser&uid="+uid, function (f){
				
				     
					 if (f != "") { 
						f = JSON.parse(f);
						MyAccount.acount =f;
						MyAccount.commonForm(MyAccount.acount,c,1);
					 } else {
						alert("<?=$lang_resource['MOBILE_MYACCOUNT_ERROR']?>")
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
					alert("<?=$lang_resource['MOBILE_MYACCOUNT_PLEASE_LOGIN_FIRST']?>")
				} 
				else {
					
					$.post("panel/lib/front-bulk.php", 'data=[{"operation":"FetchAllCountriesData"}]', function (e)
				   {
					  if (e != ""){
					  e = JSON.parse(e);
					  MyAccount.Countries = e.countries;
					  }
				   });
					var uid=b.user.id;

				  $.post("panel/lib/myaccount.php", "f=FetchAllDataByUserBillingOnly&uid="+uid, function (f1){
					 if (f1 != "") { 
						f1 = JSON.parse(f1);
						MyAccount.acount1 =f1;
						MyAccount.commonForm2(MyAccount.acount1,c,2);
					 } else {
						alert("<?=$lang_resource['MOBILE_MYACCOUNT_ERROR']?>")
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
					alert("<?=$lang_resource['SHOPPING_LOGIN_FIRST']?>")
				} 
				else {
	
					var uid=b.user.id;
				   		 
						MyAccount.favresturantForm(4,uid,true);	
								
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
					alert("<?=$lang_resource['MOBILE_MYACCOUNT_PLEASE_LOGIN_FIRST']?>")
				} 
				else {
	
					var uid=b.user.id;
				
				
						MyAccount.OrderForm(3,uid);
								
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
                        d += '<div class="businessprovider" style="width:117px !important;"><div class="cap"><span class="caption">' + Main.NullToEmpty(Main.Orders[e].date) + "</span></div></div>";
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
		   a_htm +='<div id="usermenu1"><div onclick="Facebook.Login()" style="text-align: center; margin-top:20px;"><img src="images/fb_login.png" /></div><center style="margin-top:10px;"><?=$lang_resource['MOBILE_MYACCOUNT_OR']?></center><br><div style="margin-left:90px; font-family: Arial, Helvetica, sans-serif; font-size: 14px;"><span style="margin-bottom:5px;"><?=$lang_resource['MOBILE_MYACCOUNT_EMAIL_ID']?></span><br clear="all" /><input type="text" placeholder="<?= $lang_resource['LOGIN_INPUT_EMAIL'] ?>" id="loginemail" class="pop_text" style="margin-top:8px;"/><span><br clear="all" /><?=$lang_resource['MOBILE_MYACCOUNT_PASSWORD']?></span><br clear="all" /><input type="password" class="pop_text" style="margin-top:8px;" placeholder="<?= $lang_resource['LOGIN_INPUT_PASSWORD'] ?>" id="loginpassword" onkeyup="Main.LoginPwdType(event)"/></div><div class="buttonbox"><div class="buttoninner hand" onclick="Main.Login()"><span class="login-btn-cst trcknw hand nonselectable primary-login1"><?= $lang_resource['LOGIN_BUTTON_LOGIN'] ?></span></div></div><br clear="all"/><div style="float:left; margin-left:90px;font-family:Arial, Helvetica, sans-serif; font-size:12px;"><input type="checkbox" name="remember" value="1" style="margin-right:5px;"><?=$lang_resource['MOBILE_MYACCOUNT_REMEMBER_ME']?></div><span class="recover hand nonselectable"  style="margin-left:20px;font-family:Arial, Helvetica, sans-serif; font-size:12px;" onclick="Main.RecoverPassword(true)"><?= $lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] ?></span><span class="register hand nonselectable" style="float:left; margin-left:180px;font-family:Arial, Helvetica, sans-serif; font-size:12px; background: #f5f5f5; width: auto; padding: 5px 10px; border: 1px solid #ccc; border-radius: 5px;" onclick="Main.EditAccount(true)"><?= $lang_resource['LOGIN_LINK_CREATE_ACCOUNT'] ?></span><div>';
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
				b += '<span class="category_name" style="text-align: center !important; width: 100% !important; float: left; margin-top: 20px;"><?=$lang_resource['MOBILE_MYACCOUNT_MY_ADDRESS']?></span>'
			}else if(check == 2){
				b += '<span class="category_name" style="text-align: center !important; width: 100% !important; float: left; margin-top: 20px;"><?=$lang_resource['MOBILE_MYACCOUNT_BILLING_INFO']?></span>'
			}
			 	b +='</div>'
				b += '<div class="myeditform wrapp">'

				b += '<div class="leftwr">'
			var counter = 1;	
			for (var h in e) {
				b +='<div class="field"><span class="mycaption"><b style="margin:0 0 0 0; display: block;">Address '+counter+'</b>'+  Main.NullToEmpty(e[h].address)+', '+  Main.NullToEmpty(e[h].city)+'</span>'
				counter +=1;
				b +='<div class="clearfix"></div>'
				b +='<button class="btn-red-small" style="margin-top: 5px;" onclick="MyAccount.Edit('+Main.NullToEmpty(e[h].id)+','+check+')"><?=$lang_resource['MOBILE_MYACCOUNT_EDIT_ADDRESS']?></button>'
				b +='</div>'
			}
				b +='</div>'
				
				
				
				
				var g="";
				if(check == 1){
				g ='[{"id":" ","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_SELECT_ONE']?>"},{"id":"3","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_HOME']?>"},{"id":"4","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_OFFICE']?>"},{"id":"5","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_PUBLIC_AREA']?>"}]';
				}else if(check == 2){
				g ='[{"id":"1","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_BILLING']?>"}]';	
				}
        		g = JSON.parse(g);
				
				b += '<div class="field"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_TYPE']?> </span><div class="myinputbox">'+ Forms.CreateSelectWhereAmIBox("myaddressform", "billingtype", g, c.billingtype, true) +'</div></div>'
				b += '<div class="field"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_NAME']?> </span><div class="myinputbox">' + Forms.CreateTextWhereAmIBox("myaddressform", "name",c.name, true) + '</div></div>'
				b += '<div class="field"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_COMPANY']?> </span><div class="myinputbox">'+ Forms.CreateTextWhereAmIBox("myaddressform", "company",c.company, true) + '</div></div>'
				b += '<div class="field"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_ADDRESS']?> </span><div class="myinputbox">' + Forms.CreateTextWhereAmIBox("myaddressform", "address", c.address, true) + '</div></div>'
				b += '<div class="field"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_CITY']?> </span><div class="myinputbox">' + Forms.CreateTextWhereAmIBox("myaddressform", "city",c.city, true) + '</div></div>'
				b += '<div class="field"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_STATE']?> </span><div class="myinputbox">' + Forms.CreateTextWhereAmIBox("myaddressform", "state",c.state, true) + '</div></div>'
				b += '<div class="field"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_POSTAL_CODE']?> </span><div class="myinputbox">' + Forms.CreateTextWhereAmIBox("myaddressform", "pcode", c.pcode, true) + '</div></div>'
				b += '<div class="field"><span class="myrcaption">Phone No </span><div class="myinputbox">' + Forms.CreateTextWhereAmIBox("myaddressform", "phone", c.phone, true) + '</div></div>'
				
				b += '<div class="field"><div class="myinputbox">'
				if(check == 1){
				b +='<button class="btn-red" onclick="MyAccount.Save(1);"><?=$lang_resource['MOBILE_MYACCOUNT_SAVE_ADDRESS']?></button>'
	 			}else if(check == 2){
				b +='<button class="btn-red" onclick="MyAccount.Save(2);"><?=$lang_resource['MOBILE_MYACCOUNT_SAVE_ADDRESS']?></button>'
	 			}
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
			
				b += '<span class="mytitle">Billing Info</span>'
			
			 	b +='</div>'
				b += '<div class="myeditform">'

				b += '<div class="leftwr">'
			var counter = 1;
			
			
			
			if(e!="")
			{
				
			for (var h in e) {
				b +='<div class="row"><span class="mycaption"><b style="margin:0 0 10px 0; display: block;"><?=$lang_resource['MOBILE_MYACCOUNT_CARD_NO']?> </b>'+  Main.NullToEmpty(e[h].cardno)+ '</span>'
				counter +=1;
				b +='<div class="clearfix"></div>'
				b +='<button class="editbtn" onclick="MyAccount.Edit('+Main.NullToEmpty(e[h].id)+','+check+')"><?=$lang_resource['MOBILE_MYACCOUNT_EDIT']?></button></div>'
			}
			
			}
			
			
				b +='</div>'
				
				
				b += '<div class="rightwr">'
				var g="";
				var g1="";
				var g2="";
				
				g ='[{"id":"","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_SELECT_TYPE']?>"},{"id":"6","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_VISA']?>"},{"id":"7","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_MASTER']?>"},{"id":"8","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_DISCOVERY']?>"}]';	
				g = JSON.parse(g);
				
				g1 ='[{"id":"","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_SELECT_MONTH']?>"},{"id":"January","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_JAN']?>"},{"id":"February","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_FEB']?>"},{"id":"March","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_MAR']?>"},{"id":"April","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_APR']?>"},{"id":"May","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_MAY']?>"},{"id":"June","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_JUN']?>"},{"id":"July","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_JUL']?>"},{"id":"August","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_AUG']?>"},{"id":"September","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_SEP']?>"},{"id":"October","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_OCT']?>"},{"id":"November","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_NOV']?>"},{"id":"December","caption":"<?=$lang_resource['MOBILE_MYACCOUNT_DEC']?>"}]';	
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
				
				
				
				b += '<div class="row"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_TYPE']?> </span><div class="myinputbox">'+ Forms.CreateSelectProperty("myaddressform", "billingtype", g, c.billingtype, true) +'</div></div>'
				b += '<div class="row"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_CARD_NO']?> </span><div class="myinputbox">' + Forms.CreateInputProperty7("myaddressform", "cardno",c.cardno, true) + '</div></div>'
				
				
				b += '<div class="row"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_EXPIRY_MONTH']?> </span><div class="myinputbox">' + Forms.CreateSelectProperty("myaddressform", "month", g1, c.month, true) + '</div></div>'
				
				
				
				b += '<div class="row"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_EXPIRY_YEAR']?> </span><div class="myinputbox">' + Forms.CreateSelectProperty("myaddressform", "year", g2, c.year, true) + '</div></div>'
				
				b += '<div class="row"><span class="myrcaption"><?=$lang_resource['MOBILE_MYACCOUNT_CVV_NO']?> </span><div class="myinputbox">' + Forms.CreateInputProperty("myaddressform", "cvvno",c.cvvno, true) + '</div></div>'
				
				
				b += '<div class="row"><div class="myinputbox">'
				
				b +='<button class="editbtn" onclick="MyAccount.SaveBilling(2);"><?=$lang_resource['MOBILE_MYACCOUNT_SAVE']?></button>'
	 		
				b +='<span style="margin: 0 0 0 8px;">Or</span>'
				b +='<button class="editbtn" onclick="MyAccount.tabs(1);"><?=$lang_resource['MOBILE_MYACCOUNT_CANCEL']?></button>'				
				b +='</div></div>'

               
						
        		b += '</div>'
				b +='</div>'
				
			
				
				MyAccount.accounttab(b,check);
				
	 },
	 
	 
	  favresturantForm: function (check,uid,rc){
			
	 		Main.Ready();
			
		
			var search_txt = document.getElementById("searchs_txt").value;
			
				
			var b = '<div class="mytitlebox">';
				b += '<span class="category_name" style="text-align: center !important; width: 100% !important; float: left; margin-top: 20px;"><?=$lang_resource['MOBILE_MYACCOUNT_FAVORITE_RESTAURANT']?></span>'
		
			 	b +='</div>'
				
				
				
				
				
				if(search_txt)
				{
				
				$.post("panel/lib/front-main.php", "f=FetchFav&search_txt="+search_txt, function (c)
                {
					
					
			        var recData = new Array();
			         recData = JSON.parse(c);
					 
				
					 
					 if(recData.length > 0)
					 {
				b +='<div class="wrapp">'	 		 
				b +='<div class="field"><input type="text" id="searchs_txt" class="field-text " placeholder="Search" onkeyup="MyAccount.CheckFav(this)" onkeydown="Javascript: if (event.keyCode==13) { MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\') }"></div>'
				b +='<div class="field"><button onclick="MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\')" class="btn-red-small"><?=$lang_resource['MOBILE_MYACCOUNT_SEARCH']?></button></div>'
				b +='<div class="field"><button onclick="MyAccount.DelFav()" class="btn-red-small"><?=$lang_resource['MOBILE_MYACCOUNT_REMOVE']?></button></div>' 
				 b +='</div>'	  
				b +='<div class="wrapp">'	 		 
					 b +='<table class="favorite"  id="tab1" style="width:100%">'
					 var cnt_ch =1;	  
					 for (var h in recData) {
					
					    b +='<tr>'	 
					b += '<td><div><input type="checkbox" id="chk'+cnt_ch+'" name="chkfav[]" value="'+recData[h].id+'" class="switch checkbox_2 hand ch_box"></input><label for="chk'+cnt_ch+'">&nbsp;</label></div></td>'

					   b += '<td>'+recData[h].bname+'</td>';	 
					   b += '<td>'+recData[h].badd+'</td>';	 	
					    b +='</tr>'	 	
						 cnt_ch +=1; 
						  }
					 
					 
			
					 b +='</table>'
					  b +='</div>'	
					 }
					 else
					 {
						  b +='<div style="text-align: center;width: 100%; margin-top: 10px;">'	 	 
					     b += '<?=$lang_resource['MOBILE_MYACCOUNT_NO_SEARCH_RESULT_FOUND']?>';	 	
					    b +='</div>'	
						 
					 }
			 
			    
				MyAccount.accounttab(b,check,rc);	 
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
					 b +='<div class="wrapp">'
					  b +='<div class="field"><input type="text" id="searchs_txt" class="field-text" placeholder="<?=$lang_resource['MOBILE_MYACCOUNT_SEARCH']?>" onkeyup="MyAccount.CheckFav(this)" onkeydown="Javascript: if (event.keyCode==13) { MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\') }"></div>'
				b +='<div class="field"><button onclick="MyAccount.favresturantForm(\'' + check + '\',\'' + uid + '\')" class="btn-red-small">Search</button></div>'
				b +='<div class="field"><button onclick="MyAccount.DelFav()" class="btn-red-small"><?=$lang_resource['MOBILE_MYACCOUNT_REMOVE']?></button></div>'
				b +='</div>'
				
				b +='<div class="wrapp">'	 
					 b +='<table class="favorite"  id="tab1" style="width:100%">'	 
					
					  var cnt_ch = 1;
					 for (var h in recData) {
					
					    b +='<tr>'
					b += '<td><div><input type="checkbox" id="chk'+cnt_ch+'" name="chkfav[]" value="'+recData[h].id+'" class="switch checkbox_2 hand ch_box"></input><label for="chk'+cnt_ch+'">&nbsp;</label></div></td>'
					   b += '<td>'+recData[h].bname+'</td>';	 
					   b += '<td>'+recData[h].badd+'</td>';	 	
					    b +='</tr>'	 	
						cnt_ch = cnt_ch + 1;  
						  }
					 
				
					 b +='</table>'	
					 b +='</div>'
					 
					  }
					 else
					 {
						  b +='<div class="field">'	 	 
					     b += '<span class="nofavresturant"><?=$lang_resource['MOBILE_MYACCOUNT_NO_FAVORITE_RESTAURANT_ADDED']?></span>';	 	
					    b +='</div>'	
						 
					 }
			 
			    
				MyAccount.accounttab(b,check,rc);	 
		        });
					
				}
				
				
				
				
	 },
	 
	 
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
	
	   
	   var cboxes = document.getElementsByName('checkAll');
		   
		if (cboxes[0].checked) {
			

        } else {
		
        }
  
		
	}
	,
	accounttab: function (b,check,rc){
		var a = '<div class="popup_wrapper">';
			
			
			a += '<div class="pop_header">';
      	a +='<div class="pop_heading">';
	    	a +='<h3><?=$lang_resource['MOBILE_MYACCOUNT_MY_ACCOUNT_SETTINGS']?></h3>';
        a +='</div>';
		 a +='<div class="pull_right" style="margin:8px 8px 0px 0px">';
        	a +='<button class="pop_close_btn" type="button" onclick="Popup.OnCancel()">X</button>';
        a +='</div>';
		
		a +='</div>';
			
				
			if(check == 1){
				
				a +='<div class="wrapp">'
				a +='<div class="menu-btn-2">'
				a +='<ul id="myTab">'
				a +='<li ><a href="javascript:MyAccount.tabs(1)" id="tab1"  class="menu_active"><?=$lang_resource['MYACOUNT_ADD_EDIT']?></a></li>'
				a +='<li ><a href="javascript:MyAccount.tabs(4)" id="tab4"  class=""><?=$lang_resource['FAVOURITE_RESTAURENT_TEXT']?></a></li>'
				a +='<li ><a href="javascript:MyAccount.tabs(2)" id="tab2"  class=""><?=$lang_resource['MYACCOUNT_MYPROFILE']?></a></li>'
				a +='</ul>'
				a +='</div>'
				a +='</div>'
				
				
				
				
				
				
				a +='<div class="tab-content" style="overflow:visible; border-bottom: none;">'
			
				a +='<div class="tab-pane"  id="myaddress" style="display:block !important;">'+b+'</div>'	
				a +='<div class="tab-pane"  style="display:none;" id="billing">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="history">'+b+'</div>'
				a +='<div class="tab-pane"  style="display:none;" id="resturants">'+b+'</div>'
				a +='</div>';
			}
			else if(check == 4){
				
		
				a +='<div class="wrapp">'
				a +='<div class="menu-btn-2">'
				a +='<ul id="myTab">'
				a +='<li ><a href="javascript:MyAccount.tabs(1)" id="tab1" class=""><?=$lang_resource['MYACOUNT_ADD_EDIT']?></a></li>'
				a +='<li ><a href="javascript:MyAccount.tabs(4)" id="tab4" class="menu_active"><?=$lang_resource['FAVOURITE_RESTAURENT_TEXT']?></a></li>'
				a +='<li ><a href="javascript:MyAccount.tabs(2)" id="tab2"  class=""><?=$lang_resource['MYACCOUNT_MYPROFILE']?></a></li>' 
				a +='</ul>'
				a +='</div>'
				a +='</div>'
				
				
				
				a +='<div class="tab-content" style="overflow:visible; border-bottom: none;">'
				a +='<div class="tab-pane" style="display:none;" id="myaddress">'+b+'</div>'					
			
				a +='<div class="tab-pane" id="resturants" style="display:block !important;">'+b+'</div>'
				a +='</div>';
				
				
				
			}
			
		
		a +='</div>';		
		//Popup.ShowNew(700, "", e,Shopping.EditEndUserChoices, null,null)
			Popup.Show(700, 700, a, function ()
			{
				
	
			}, function ()
			{
				
				Forms.Clean("myaddress");
				Main.Ga(Main.ActiveView)
			})
	
	},	 



 	tabs: function (a)
    {
		
		
		if(a==1){
			
			$("#myaddress").show();
			$("#billing").hide();
			$("#history").hide();
			$("#resturants").hide();
			
			
			
			$("#tab1").addClass("menu_active");
			
			$("#tab2").removeClass("menu_active");
			$("#tab3").removeClass("menu_active");
			$("#tab4").removeClass("menu_active");
			
			MyAccount.Start()
			
		}
		else if(a == 2){
			
			Popup.OnCancel()
			
			 Main.EditAccount()
			
		}
		else if(a == 3){
			
			$("#myaddress").hide();
			$("#billing").hide();
			$("#history").show();
			$("#resturants").hide();
			
			$("#tab3").addClass("order_now");
			
			$("#tab1").removeClass("order_now");
			$("#tab2").removeClass("order_now");
			$("#tab4").removeClass("order_now");
			
			MyAccount.Start4()
			
		}
		else if(a == 4){
		
			
		
			
			//$("#myaddress").html("");
			
			$("#tab4").addClass("menu_active");

			$("#tab1").removeClass("menu_active");			
		
        
            document.getElementById("searchs_txt").value = "";
			
			
			MyAccount.Start3()
		}
	},
	
	Save: function (c) {

                
				
			
				//Forms.PrepareForSaving("myaddressform");
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
			MyAccount.Start3()
		});
		
	},
	Remove1: function (uid){
			var b=[]	
  $('.checkbox:checked').each(function(){
        b.push($(this).val());
    });
       
		$.post("panel/lib/myaccount.php", "f=DeleteresturantChoiceByCheck&data="+ JSON.stringify(b)+"&uid="+uid, function (f){
			MyAccount.Start3()
		});
		
	}
	
}
