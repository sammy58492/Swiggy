var SiteSchedule = {
   Main: function(){
	   Main.Loading();
			var a = new Date().getTime();
        	Main.Aid = a;	
		$.post("lib/panel-configs.php", "f=FetchSiteSchedule", function (b) {			
			
			if (a != Main.Aid) {
                return
            }		
			Main.Ready();    		
			SiteSchedule.PrintMain(JSON.parse(b));			        
        });	
   },
	   
	   
	 PrintMain: function(e){ 
	 
	 
	   
        var c = "";
        Forms.Clean("siteschedule", "mainbuttonok");
		 var f = e.siteschedule;
		
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
       
		var L = ["", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		
		
		for (var B = 1; B <= 7; B++) {
			
			switch(B){
				
				case 1:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_MONDAY']?>";
					break;
				case 2:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_TUESDAY']?>";
					break;
				case 3:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_WEDNESDAY']?>";
					break;
				case 4:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_THURSDAY']?>";
					break;
				case 5:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_FRIDAY']?>";
					break;
				case 6:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SATURDAY']?>";
					break;
				case 7:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SUNDAY']?>";
					break;
			}
       	var z;
        var O;
        var J;
        var d;    
        if(f !=null){
            if(f.sdays){       
                z = f.sdays[B].opens.hour;
                J = f.sdays[B].opens.minute;
                O = f.sdays[B].closes.hour;
                d = f.sdays[B].closes.minute         
            }
        }else{
            z = "00";
            J = "00";
            O = "00";
            d = "00"; 
        }    
		/*if(f.sdays){       
            z = f.sdays[B].opens.hour;
            J = f.sdays[B].opens.minute;
            O = f.sdays[B].closes.hour;
            d = f.sdays[B].closes.minute         
		}*/
		
		
		Forms.CreateValue("siteschedule", "siteschedule", '',false);
		c +='<h5 style="font-weight:600">'+text+'</h5>'
		c +='<div class="row">'

		c +='<div class="col-md-3">'
		c +='<div class="timing-dv form-group">'
		c +='<label><?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_OPEN_TIME']?></label>'
        c +='<select class="form-control" id="schedule_open_'+text+'">'
        for (var E = 0; E < 24; E++) {
            if(Main.timeformat=="12"){
                E2=Business.convertTimeFormatHour(E);
            }else{
                E2= Business.zeroPad((E),2);
            }
            if (z == E) {
                c += "<option SELECTED  value="+E+" >" +  E2+ "</option>";
            } else {
                c += "<option  value="+E+" >" +  E2 + "</option>";
            }
        }
        c +='</select>' 
		/*c +='<div class="input-group input-append bootstrap-timepicker tm-pkr">'
		c +='<input type="text" class="form-control timepickero1" readonly id="schedule_open_'+text+'" value="'+z+'">'
		c +='<span class="input-group-addon add-on" id="open_'+text+'_check" ><i class="icon-clock"></i></span>'
		c +='</div>'*/

		c +='</div>'
		c +='</div>'
		<!--col-md-3-->

        c +='<div class="col-md-3">'
        c +='<div class="timing-dv form-group">'
        c +='<label>&nbsp;</label>'
        c +='<select class="form-control" id="schedule_open_min_'+text+'">'
        for (var E = 0; E < 60; E++) {
            if (J == E) {
                c += '<option SELECTED value="'+E+'">' +  Business.zeroPad((E),2)+ "</option>"
            } else {
                c += '<option value="'+E+'">' +  Business.zeroPad((E),2) + "</option>"
            }
        }
        c +='</select>' 
        /*c +='<div class="input-group input-append bootstrap-timepicker tm-pkr">'
        c +='<input type="text" class="form-control timepickero1" readonly id="schedule_open_'+text+'" value="'+z+'">'
        c +='<span class="input-group-addon add-on" id="open_'+text+'_check" ><i class="icon-clock"></i></span>'
        c +='</div>'*/
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->



		c +='<div class="col-md-3">'
		c +='<div class="timing-dv form-group">'
		c +='<label><?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_CLOSE_TIME']?></label>'
        c +='<select class="form-control" id="schedule_close_'+text+'">'
        for (var E = 0; E < 29; E++) {
            if(E > 24){
                var q = E-24;
                if (O == E) {
                    c += "<option  SELECTED value="+E+">" + q + "am</option>"
                }else{
                    c += "<option value="+E+">" + q + "am</option>"
                }
            }else {
                if(Main.timeformat=="12"){
                    E2=Business.convertTimeFormatHour(E);
                }else{
                    E2=Business.zeroPad((E),2);
                }
                if (O == E) {
                    c += "<option  SELECTED value="+E+">" + E2+ "</option>"
                }else{
                    c += "<option value="+E+">" + E2+ "</option>"
                }
            }
        }
        c +='</select>' 
		/*c +='<div class="input-group input-append bootstrap-timepicker tm-pkr">'
		c +='<input type="text" class="form-control timepickerc1" readonly id="schedule_close_'+text+'" value="'+O+'">'
		c +='<span class="input-group-addon add-on" id="close_'+text+'_check"><i class="icon-clock"></i></span>'
		c +='</div>'*/
		c +='</div>'
		c +='</div>'
		<!--col-md-3-->
        
        c +='<div class="col-md-3">'
        c +='<div class="timing-dv form-group">'
        c +='<label>&nbsp;</label>'
        c +='<select class="form-control" id="schedule_close_min_'+text+'">'
        for (var E = 0; E < 60; E++) {
            if (d == E) {
                c += "<option SELECTED value="+E+">" + Business.zeroPad((E),2) + "</option>"
            } else {
                c += "<option value="+E+">" + Business.zeroPad((E),2) + "</option>"
            }
        }
        c +='</select>' 
        /*c +='<div class="input-group input-append bootstrap-timepicker tm-pkr">'
        c +='<input type="text" class="form-control timepickerc1" readonly id="schedule_close_'+text+'" value="'+O+'">'
        c +='<span class="input-group-addon add-on" id="close_'+text+'_check"><i class="icon-clock"></i></span>'
        c +='</div>'*/
        c +='</div>'
        c +='</div>'
        <!--col-md-3-->

		c +='</div>'
		<!--row-->
		}
		
		
		c +='</div>'<!--config-box-->
        c +='</div>'<!--col-md-9-->
        c +='</div>'<!--row-->
		c +='</div>'

		$("#sitesetting").empty().append(c);		

        //$("#ga").focus()
		
		
		/*<!--Monday-->
    	var input2 = $('#schedule_open_monday');
        input2.clockpicker({
            autoclose: true
        });
        
        $('#open_monday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_open_monday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
        
        var input3 = $('#schedule_close_monday');
        input3.clockpicker({
            autoclose: true
        });
        
        $('#close_monday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_close_monday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
		<!--Monday-->
	 	<!--Tuesday-->
    	var input4 = $('#schedule_open_tuesday');
        input4.clockpicker({
            autoclose: true
        });
        
        $('#open_tuesday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_open_tuesday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
        
        var input5 = $('#schedule_close_tuesday');
        input5.clockpicker({
            autoclose: true
        });
        
        $('#close_tuesday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_close_tuesday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
		<!--Tuesday-->
	 	<!--Wednesday-->
    	var input6 = $('#schedule_open_wednesday');
        input6.clockpicker({
            autoclose: true
        });
        
        $('#open_wednesday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_open_wednesday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
        
        var input7 = $('#schedule_close_wednesday');
        input7.clockpicker({
            autoclose: true
        });
        
        $('#close_wednesday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_close_wednesday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
		<!--Wednesday-->
	 	<!--Thursday-->
    	var input8 = $('#schedule_open_thursday');
        input8.clockpicker({
            autoclose: true
        });
        
        $('#open_thursday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_open_thursday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
        
        var input9 = $('#schedule_close_thursday');
        input9.clockpicker({
            autoclose: true
        });
        
        $('#close_thursday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_close_thursday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
		<!--Thursday-->
	 	<!--Friday-->
    	var input10 = $('#schedule_open_friday');
        input10.clockpicker({
            autoclose: true
        });
        
        $('#open_friday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_open_friday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
        
        var input11 = $('#schedule_close_friday');
        input11.clockpicker({
            autoclose: true
        });
        
        $('#close_friday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_close_friday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
		<!--Friday-->
	 	<!--Saturday-->
    	var input12 = $('#schedule_open_saturday');
        input12.clockpicker({
            autoclose: true
        });
        
        $('#open_saturday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_open_saturday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
        
        var input13 = $('#schedule_close_saturday');
        input13.clockpicker({
            autoclose: true
        });
        
        $('#close_saturday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_close_saturday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
		<!--Saturday-->
	 	<!--Sunday-->
    	var input14 = $('#schedule_open_sunday');
        input14.clockpicker({
            autoclose: true
        });
        
        $('#open_sunday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_open_sunday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
        
        var input15 = $('#schedule_close_sunday');
        input15.clockpicker({
            autoclose: true
        });
        
        $('#close_sunday_check').click(function(e){
            e.stopPropagation();
            $("#schedule_close_sunday").clockpicker('show')
                    .clockpicker('toggleView', 'hours');
        });
		<!--Sunday-->*/
		
   },
   
   
   UpdateSchedule: function () {
       
        var f = new Object();
        var e;
       // f = {days:[0]};
        f.sdays = new Object();
        
        for (var d = 1; d <= 7; d++) {
            switch(d) {
				
				case 1:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_MONDAY']?>";
					break;
				case 2:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_TUESDAY']?>";
					break;
				case 3:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_WEDNESDAY']?>";
					break;
				case 4:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_THURSDAY']?>";
					break;
				case 5:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_FRIDAY']?>";
					break;
				case 6:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SATURDAY']?>";
					break;
				case 7:
					text = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SUNDAY']?>";
					break;
			}
            
            f.sdays[d] = new Object();
            f.sdays[d].opens = new Object();
            f.sdays[d].closes = new Object();
            e = document.getElementById("schedule_open_"+text).value+':'+document.getElementById("schedule_open_min_"+text).value;
            var res = e.split(":");
            if(res[0] =='00'){
                var ohour = '0';
            }else{
                var ohour = res[0]; 
            }
            if(res[1] =='00'){
                var chour = '0';
            }else{
                var chour = res[1]; 
            }
            f.sdays[d].opens.hour = ohour;
            f.sdays[d].opens.minute = chour;
            
            e = document.getElementById("schedule_close_"+text).value+':'+document.getElementById("schedule_close_min_"+text).value;
            var res = e.split(":");
            if(res[0] =='00'){
                var ohour = '0';
            }else{
                var ohour = res[0]; 
            }
            if(res[1] =='00'){
                var chour = '0';
            }else{
                var chour = res[1]; 
            }
            f.sdays[d].closes.hour = ohour;            
            f.sdays[d].closes.minute = chour;
        }
        
        Forms.UpdateValue("siteschedule", "siteschedule", JSON.stringify(f), true);
		

    },
	
	
	
	
	Save: function () {
		
		SiteSchedule.UpdateSchedule();

		$.post("lib/panel-configs.php", "f=SaveSiteSchedule&data=" + JSON.stringify(Forms.Form.siteschedule), function (a) {

			 SiteSchedule.Main()
        });
		
        
        Forms.Clean("siteschedule")
    },
	
};
	
