var IS_PAYPAL_ENABLED = 1;

var SplitPayment = {
	
    Main: function (id1) {

      Main.Loading();
	
		    $.post("lib/spiltpayment.php", "f=FetchPaymentData&id=" + id1, function (a) {
 		
       var d = new Array();
    
		d.push(JSON.parse('{"id":"0","caption":"No"}'));
        d.push(JSON.parse('{"id":"1","caption":"Yes (<?=$lang_resource['ALL_DROPDOUN_SELECT_DEFAULT']?>)"}'));
        d.push(JSON.parse('{"id":"2","caption":"Yes (<?=$lang_resource['SUPERADMIN_CUSTOM_CITY_TAX']?>)"}'));
        Main.Ready();
  
       if(a!=0)
	   {   
	   
	   		var m = new Array();
        m.push(JSON.parse('{"id":"-1","caption":"Select"}')); 
        m.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        m.push(JSON.parse('{"id":"0","caption":"No"}'));
			
    
		
		
		var itax = new Array();
        itax.push(JSON.parse('{"id":"0","caption":"No"}')); 
        itax.push(JSON.parse('{"id":"1","caption":"Yes City Tax"}'));
        itax.push(JSON.parse('{"id":"2","caption":"Custom %"}'));
      a = JSON.parse(a)
	  var b = "";
        var c = "";
        b += Visuals.CreateMainButton("Save", "ok", "SplitPayment.Save('spiltform')");
        b += Visuals.CreateMainButton("Cancel", "cancel", "Business.PrintMain()");
        Forms.Clean("spiltform", "mainbuttonok");
		
		Forms.Form.spiltform.type = "modify";
		
		Forms.Form.spiltform.bus_id = id1;
		
		Forms.Form.spiltform.usr = null;
		
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; SET SPLIT SETTINGS</span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
	
		c += '<input type="hidden" id="bus_id" value="'+id1+'">';
		
        c += '<div class="row"><span class="caption">Split Payment:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "splitcase", d, a[0].splitcase, true, "SplitPayment.TypeChanged3(this.value)", false) + "</div></div>";
	  
		
      if (a[0].splitcase == 1 || a[0].splitcase == 2) {
	  c +='<div id="mails">'	
		c += '<div class="row"><span class="caption">Mail to recieve payments:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "paymail", m, a[0].paymail, true) + "</div></div>";
        c += '<div class="row"><span class="caption">Paypal Adaptive E-mail:</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "payadaptivemail", a[0].payadaptivemail, true) + "</div></div>";
	    c +='</div>'
	  
	  }else{
	   
		c +='<div id="mails" style="display:none;">'	
		c += '<div class="row"><span class="caption">Mail to recieve payments:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "paymail", m, a[0].paymail, false) + "</div></div>";
        c += '<div class="row"><span class="caption">Paypal Adaptive E-mail:</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "payadaptivemail", a[0].payadaptivemail, false) + "</div></div>";
	    c +='</div>'
	  }
	if (a[0].splitcase == 2) {
		
	    c +='<div id="taxs">'
		c += '<div class="row"><span class="caption">Percentage of Commision(%):</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_per", a[0].com_per, true) + "</div></div>";
       
        c += '<div class="row"><span class="caption">Fixed rate of Commision($):</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_rate", a[0].com_rate, true) + "</div></div>";
       
         c += '<div class="row"><span class="caption">Including Tax:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "tax", itax, a[0].tax, false, "SplitPayment.TypeChanged2(this.value)", false) + "</div></div>";
		 

      if (a[0].tax == 2) {
		  
          c += '<div class="row" id="idpercent"><span class="caption">Custom(%):</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "custom", a[0].custom, true) + "</div></div>";
		  
      }else{
      	  c += '<div class="row" id="idpercent" style="display:none"><span class="caption">Custom(%):</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "custom", a[0].custom, false) + "</div></div>";
      }
        
         c +='</div>'
	}else{
		  c +='<div id="taxs" style="display:none;">'
		c += '<div class="row"><span class="caption">Percentage of Commision(%):</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_per", a[0].com_per, false) + "</div></div>";
       
        c += '<div class="row"><span class="caption">Fixed rate of Commision($):</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_rate", a[0].com_rate, false) + "</div></div>";
       
         c += '<div class="row"><span class="caption">Including Tax:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "tax", itax, a[0].tax, false, "SplitPayment.TypeChanged2(this.value)", false) + "</div></div>";
		 

      if (a[0].tax == 2) {
		  
          c += '<div class="row" id="idpercent"><span class="caption">Custom(%):</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "custom", a[0].custom, false) + "</div></div>";
		  
      }else{
      	  c += '<div class="row" id="idpercent" style="display:none"><span class="caption">Custom(%):</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "custom", a[0].custom, false) + "</div></div>";
      }
        
         c +='</div>'	
		
	}
		
        c += "</div>";
        c += "</div>";
        c += "</div>";
     
	
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
	  
	   }
	   else if(a==0)
	   {
		  
		   var b = "";
        var c = "";
        b += Visuals.CreateMainButton("Save", "ok", "SplitPayment.Save()");
        b += Visuals.CreateMainButton("Cancel", "cancel", "Business.PrintMain()");
        Forms.Clean("spiltform", "mainbuttonok");
		
		Forms.Form.spiltform.type = "create";
		
		Forms.Form.spiltform.bus_id = id1;
		
		Forms.Form.spiltform.usr = null;
		
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; SET SPLIT SETTINGS</span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
	
       c += '<div class="row"><span class="caption">Split Payment:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "splitcase", d, "",true, "SplitPayment.TypeChanged1(this.value)") + "</div></div>";
	   
	   c +='<div id="mails">'	   
		 c +='<div class="row" style="display:none;"><span class="caption">Paypal Adaptive E-mail:</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "payadaptivemail", "", true) + "</div></div>";
		c +='</div>'
		
	    c +='<div id="taxs">'

        c +='</div>'
        
		
        c += "</div>";
        c += "</div>";
        c += "</div>";
     
	
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
	   }
	
       
   

        
        
        })
		
		//Main.Ready();
    },
	
	TypeChanged: function (a) {
	
	var tmp2 = '<div class="row"><span class="caption">Custom(%):</span><div class="inputbox">'+ Forms.CreateInputProperty("spiltform", "custom","", true) + "</div></div>";
		
        if(a == 2)		{
			$('#taxs_c').empty().append(tmp2);		
		
		}else{
				$('#taxs_c').empty();			
		}
		
    },
	TypeChanged1: function (a) {
	
	var m = new Array();
        m.push(JSON.parse('{"id":"-1","caption":"Select"}')); 
        m.push(JSON.parse('{"id":"1","caption":"Yes"}'));
        m.push(JSON.parse('{"id":"0","caption":"No"}'));
		
	var itax = new Array();
        itax.push(JSON.parse('{"id":"0","caption":"No"}')); 
        itax.push(JSON.parse('{"id":"1","caption":"Yes City Tax"}'));
        itax.push(JSON.parse('{"id":"2","caption":"Custom %"}'));
	
	

    if(a == 1){	
	var tmp = '';	
		tmp += '<div class="row"><span class="caption">Mail to recieve payments:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "paymail", m, "", true) + "</div></div>";		 
	   tmp += '<div class="row"><span class="caption">Paypal Adaptive E-mail:</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "payadaptivemail", "", true) + "</div></div>";
		$('#taxs').empty();	
   		$('#mails').empty().append(tmp);		
	}else if(a == 2){	
	
	var tmp = '';	
		tmp += '<div class="row"><span class="caption">Mail to recieve payments:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "paymail", m, "", true) + "</div></div>";		 
	   tmp += '<div class="row"><span class="caption">Paypal Adaptive E-mail:</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "payadaptivemail", "", true) + "</div></div>";
	
	var tmp1 = '';   
	 tmp1 += '<div class="row"><span class="caption">Percentage of Commision(%):</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_per", "",true) + "</div></div>";
       
     tmp1 += '<div class="row"><span class="caption">Fixed rate of Commision($):</span><div class="inputbox">' + Forms.CreateInputProperty("spiltform", "com_rate", "",true) + "</div></div>";
       
     tmp1 += '<div class="row"><span class="caption">Including Tax:</span><div class="inputbox">' + Forms.CreateSelectProperty("spiltform", "tax", itax,"", false, "SplitPayment.TypeChanged(this.value)") + "</div></div>";
	 tmp1 +='<div id="taxs_c">'
     tmp1 +='</div>'	
			$('#mails').empty().append(tmp);
			$('#taxs').empty().append(tmp1);
		Forms.CanSave("spiltform") == false;
			
		}else{			
			$('#mails').empty();
			$('#taxs').empty();
		}
    },
	
	TypeChanged2: function (a) {
	
	    if(a == 2)
			$('#idpercent').show();			
		else
			$('#idpercent').hide();			
	},
	
	TypeChanged3: function (a) {

		if(a == 1){		
			$('#mails').show();	
			$('#taxs').hide();
				
		}else if(a == 2){
			$('#mails').show();	
			$('#taxs').show();
				
		}else{			
			$('#mails').hide();	
			$('#taxs').hide();
		}
    },
    

Save: function (a) {
        if (Forms.CanSave("spiltform") == false) {
            return
        }
        Forms.PrepareForSaving("spiltform");
       
       Main.Loading();
            Main.Request("spiltpayment", null, "f=SavePay&data=" + JSON.stringify(Forms.Form.spiltform), "Business.PrintMain()")
     
    
    },
Save1: function () {
       alert(JSON.stringify(Forms.Form.spiltform))
	   return
       
       Main.Loading();
            Main.Request("spiltpayment", null, "f=SavePay&data=" + JSON.stringify(Forms.Form.spiltform), "Business.PrintMain()")
     
    
    }
};	