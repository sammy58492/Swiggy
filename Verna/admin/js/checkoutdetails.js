var Checkout={
	Main: function(){
		Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetCheckoutField", function (b) {
        	 if (a != Main.Aid) {
                return
            }
            Main.Ready();
        	//alert(b)
        	b = JSON.parse(b);
        	Checkout.infodetails=b;
        	Checkout.PrintMain(b);
        });
	},
	PrintMain: function(b){
		var n =''
		n +='<div class="tab-box">'
		n +='<div class="table-responsive">'
		n +='<table class="table table-th-block table-striped tbl_enebal">'
		n +='<thead>'
		n +='<tr>'
		n +='<th width="10%"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ID'] ?></th>'
		n +='<th width="25%"><?=$lang_resource['ADMIN_PAGE_FIELD_NAME'] ?></th>'
		n +='<th width="25%"><?=$lang_resource['ADMIN_PAGE_FIELD_TYPE'] ?></th>'
		n +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_FIELD_REQUIRED'] ?></th>'
		n +='<th width="10%"><?=$lang_resource['ADMIN_PAGE_STATUS'] ?></th>'
		n +='</tr>'
		n +='</thead>'
		n +='<tbody>'
		var h = false;
		var k = new Array();
		for(var d in b){
			h = true;
			k.push(b[d])
			if (h) {
			n +='<tr>'
			n +='<td>'+b[d].id+'</td>'
			if(b[d].field_name =="Name"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_NAME'] ?></td>'
			}
			if(b[d].field_name =="Last Name"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_LASTNAME'] ?></td>'
			}
			if(b[d].field_name =="Email"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_EMAIL'] ?></td>'
			}
			if(b[d].field_name =="Full Address"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_FULLADDRESS'] ?></td>'
			}
			if(b[d].field_name =="APT/Suit"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_APTSUIT'] ?></td>'
			}
			if(b[d].field_name =="Zipcode"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_ZIPCODE'] ?></td>'
			}
			if(b[d].field_name =="City"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_CITY'] ?></td>'
			}
			if(b[d].field_name =="Area / Neighborhood"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_AREA_NEIGHBORTHOOD'] ?></td>'
			}
			if(b[d].field_name =="Where did you find about us"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_FIND_ABOUTUS'] ?></td>'
			}
			if(b[d].field_name =="Phone"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_PHONE'] ?></td>'
			}
			if(b[d].field_name =="Receive SMS"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_RECEIVESMS'] ?></td>'
			}
			if(b[d].field_name =="Takeout Date"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_TAKEOUT_DATE'] ?></td>'
			}
			if(b[d].field_name =="Tip For The Driver"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_FOR_THE_DRIVER'] ?></td>'
			}
			if(b[d].field_name =="Discount Coupon"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_DISCOUNT_COUPON'] ?></td>'
			}
			if(b[d].field_name =="ChackoutMap"){
			n +='<td><?=$lang_resource['ADMIN_CHECKOUTPAGE_MAP'] ?></td>'
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			n +='<td>'+b[d].type+'</td>'
			n +='<td>'
			n +='<select class="status_combo" id="required'+b[d].id+'" name="required">'
			if(b[d].required == 't'){
				n +='<option value="TRUE" selected ><?=$lang_resource['ADMIN_PAGE_YES'] ?></option>'
				n +='<option value="FALSE"><?=$lang_resource['ADMIN_PAGE_No'] ?></option>'
			}else{
				n +='<option value="TRUE" ><?=$lang_resource['ADMIN_PAGE_YES'] ?></option>'
				n +='<option value="FALSE" selected><?=$lang_resource['ADMIN_PAGE_No'] ?></option>'
			}	
			
			n +='</select>'
			n +='</td>'
			n +='<td><div class="enebal" id="switch_' + b[d].id + '"></div></td>'
			n +='</tr>'
			}
		}
		

		n +='</tbody>'
		n +='</table>'
		n +='</div>'
		n +='</div>'


		$("#websitesetting").empty().append(n);
		var g = false;
        Switch.Init();
        for (d in k) {
            if (k[d].id != b.id) {
                if (k[d].status == "t") {
                    g = true
                } else {
                    g = false
                }
				
                Switch.Create("switch_" + k[d].id, g);
                Switch.OnChange("switch_" + k[d].id, function (m, l) {
               	Checkout.SetEnabled(m.replace("switch_", ""), l)
                })
            }
        }
		
		
	},
	
	SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
		$.post("lib/checkout.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
       
        
            if (c != "ok") {
                Switch.SwitchTo("switch_" + b, !a)
            }
        })
    },
    Save: function(){
    	var requiredarray = Array();
    	for(var a in Checkout.infodetails){
    		var val = $("#required"+Checkout.infodetails[a].id).val();
    		requiredarray[Checkout.infodetails[a].id]=val;
    	}
    	$.post("lib/checkout.php", "f=saverequired&data=" + JSON.stringify(requiredarray), function (c) {
    		Checkout.Main();
    	});
    }	
};