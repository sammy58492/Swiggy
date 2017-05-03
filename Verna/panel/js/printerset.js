var PrinterSet = {
	   Main: function (id){
		
		PrinterSet.BusID = id;   
		$.post("lib/printerset.php", "f=FetchAllPrinterModel", function (mm) {
			
			mm = JSON.parse(mm);
		  //  PrinterSet.AllModel = new Array();
		  
		  
		  var i = new Array();
		  i.push(JSON.parse('{"id":"-1","caption":"<?= $lang_resource['PRINTER_SELECT_ALL'] ?>"}'));
			
			 for (var E in mm) {
                var y = new Object();
                y.id = mm[E].id;
                y.caption = mm[E].model_name;
               // PrinterSet.AllModel.push(y);
			   i.push(y);
			  
            }
			
			PrinterSet.AllModel = i;
			
			
		});
		   
		$.post("lib/printerset.php", "f=FetchPrinterData&id="+id, function (c) {
        //alert(JSON.stringify(c))
		///return false;     
         	PrinterSet.Form(c);
        });
},
Form: function(val){
	v = JSON.parse(val);
	
	var b = "";
        var c = "";
       b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "PrinterSet.SavePrinterModel()");
        b += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Business.PrintMain()");
       // alert('1')
	    Forms.Clean("printer", "mainbuttonok");
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        c += '<span class="title">&gt;&gt; <?= $lang_resource['PRINTER_SET'] ?></span>';
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        c += '<div class="row"><span class="caption"><?= $lang_resource['PRINTER_PORT'] ?> :</span><div class="inputbox" style=" font-size:12px;">' + v[0].apn + "</div></div>";
		 c += '<div class="row"><span class="caption"><?= $lang_resource['PRINTER_SERVERIP'] ?> :</span><div class="inputbox" style=" font-size:12px;">' +v[0].sip+ "</div></div>";
		 c += '<div class="row"><span class="caption" style="width: 104px;"><?= $lang_resource['PRINTER_FILE_PATH'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty_p("printer", "pfp",v[0].pfp, true, "", false, false, "") + "</div></div>";
		 c += '<div class="row"><span class="caption" style="width: 104px;"><?= $lang_resource['PRINTER_CONFIRMATION_FILE_PATH'] ?> :</span><div class="inputbox">' + Forms.CreateInputProperty_p("printer", "cfp",v[0].cfp, true, "", false, false, "") + "</div></div>";
		  c += '<div class="row"><span class="caption" style="width: 104px;"><?= $lang_resource['PRINTER_SET_MODEL'] ?> :</span><div class="inputbox">' + Forms.SelectInputProperty_p("printer", "printer_model",PrinterSet.AllModel, v[0].printer_model,false, "", true) + "</div></div>";
		 
        c += "</div>";
        c += "</div>";
        c += "</div>";
		 //alert('1')
        document.getElementById("leftcol").innerHTML = b;
        document.getElementById("main").innerHTML = c;
        
	   }  
	   ,
	   
	   SavePrinterModel: function () {
        
        var model_id = document.getElementById("printer_model").value;
	  
        Main.Loading();
 
    
        $.post("lib/printerset.php", "f=SavePrinterModel&id="+PrinterSet.BusID+"&printer_model="+model_id, function (c) {
        
		//alert(c)
		if(c.trim() == "ok")
		 {
			 Main.Ready();
			 Business.PrintMain();
			 
		 }
		
		});
    }
}
