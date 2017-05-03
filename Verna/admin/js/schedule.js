var Schedule = {
    Main: function(M){  
        var C = Business.Scheduletext;
        Forms.Clean("schedule", "mainbuttonok");
        Forms.CreateValue("schedule", "business", Business.id, false);
        Forms.CreateValue("schedule", "schedule", '', false);

		var n ='';
		n +='<div class="panel-heading panel-heading-2">'
		n +='<div class="row">'
		n +='<div class="col-md-10">'
		n +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_OPEN_TIME']?></h3>'
		n +='</div>'
		<!--col-md-10-->
        n +='<div class="col-md-2">'
        n +='<span class=" panel-btn-2 schedule-save-btn" style=" float: right;">'
        n +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Schedule.UpdateSchedule()" data-effect="mfp-zoom-in"><i class="fa icon-save"></i><?=$lang_resource['ORDER_DETAILS_SAVE']?> </a>'
        n +='</span>'
        n +='</div>'

		n +='</div>'
		<!--row-->
		n +='</div>'
		n +='<div class="panel-body">'
		
		var L = ["", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		
		for (var B = 1; B <= 7; B++) {
			
			switch(B){
				
				case 1:
					text = "Monday";
                    textp = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_MONDAY']?>";
					break;
				case 2:
					text = "Tuesday";
                    textp = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_TUESDAY']?>";
					break;
				case 3:
					text = "Wednesday";
                    textp = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_WEDNESDAY']?>";
					break;
				case 4:
					text = "Thursday";
                    textp = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_THURSDAY']?>";
					break;
				case 5:
					text = "Friday";
                    textp = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_FRIDAY']?>";
					break;
				case 6:
					text = "Saturday";
                    textp = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SATURDAY']?>";
					break;
				case 7:
					text = "Sunday";
                    textp = "<?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_SUNDAY']?>";
					break;
			}
        var z=0; 
        var O=0; 
        var J=0;
        var d=0; 
        //alert(JSON.stringify(C.sdays))
        if (M && C.sdays) {
            z = C.sdays[B].opens.hour;
            J = C.sdays[B].opens.minute;
            O = C.sdays[B].closes.hour;
            d = C.sdays[B].closes.minute;                      
        }
			
		n +='<h5 style="font-weight:600">'+textp+'</h5>'
		n +='<div class="row">'

		n +='<div class="col-md-3">'
		n +='<div class="timing-dv form-group">'
		n +='<label><?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_OPEN_TIME']?></label>'
        n +='<select class="form-control" id="schedule_open_'+text+'">'
        for (var E = 0; E < 24; E++) {
            if(Main.timeformat=="12"){
                E2=Business.convertTimeFormatHour(E);
            }else{
                E2= Business.zeroPad((E),2);
            }
            if (z == E) {                
                n += "<option SELECTED  value="+E+" >" +  E2+ "</option>"
            } else {
                n += "<option  value="+E+" >" +  E2 + "</option>"
            }
        }       
        n +='</select>'		
		n +='</div>'
		n +='</div>'
		<!--col-md-3-->
        n +='<div class="col-md-3">'
        n +='<div class="timing-dv form-group">'
        n +='<label>&nbsp;</label>'
        n +='<select class="form-control" id="schedule_open_min_'+text+'">'
        for (var E = 0; E < 60; E++) {
            if (J == E) {
                n += '<option SELECTED value="'+E+'">' + Business.zeroPad((E),2) + "</option>"
            } else {
                n += '<option value="'+E+'" >' +  Business.zeroPad((E),2) + "</option>"
            }
        }
               
        n +='</select>'
      
        n +='</div>'
        n +='</div>'
        <!--col-md-3-->

        n +='<div class="col-md-3">'
        n +='<div class="timing-dv form-group">'
        n +='<label><?=$lang_resource['ADMIN_PAGE_RESTURANT_SCHEDULE_CLOSE_TIME']?></label>'
        n +='<select class="form-control" id="schedule_close_'+text+'">'
        for (var E = 0; E < 29; E++) {
            if(E > 24){
                var q = E-24;
                if (O == E) {
                    n += "<option  SELECTED value="+E+">" + q + "am</option>"
                }else{
                    n += "<option value="+E+">" + q + "am</option>"
                }
            } else {
                if(Main.timeformat=="12"){
                    E2=Business.convertTimeFormatHour(E);
                }else{
                    E2= Business.zeroPad((E),2) ;
                }
                if (O == E) {
                    n += "<option  SELECTED value="+E+">" + E2+ "</option>"
                }else{
                    n += "<option value="+E+">" + E2+ "</option>"
                }
            }
        }
        n +='</select>'     
        n +='</div>'
        n +='</div>'
        <!--col-md-3-->
        n +='<div class="col-md-3">'
        n +='<div class="timing-dv form-group">'
        n +='<label>&nbsp;</label>'
        n +='<select class="form-control" id="schedule_close_min_'+text+'">'
        for (var E = 0; E < 60; E++) {
            if (d == E) {
                n += '<option SELECTED value="'+E+'">' +  Business.zeroPad((E),2) + "</option>"
            } else {
                n += '<option value="'+E+'">' + Business.zeroPad((E),2) + "</option>"
            }
        }              
        n +='</select>'
      
        n +='</div>'
        n +='</div>'
        <!--col-md-3-->

		

		n +='</div>'
		<!--row-->
		}



		n +='</div>'
		<!-- /.panel-body -->

		return n;
	},
	
     UpdateScheduleClock: function(){
	 	<!--Monday-->
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
		<!--Sunday-->
    },

    UpdateSchedule: function () {
       
        var f = new Object();
        var e;
        f = {days:[0]};
        f.sdays = new Object();
        
        for (var d = 1; d <= 7; d++) {
            switch(d) {
				
				case 1:
                    text = "Monday";
                    break;
                case 2:
                    text = "Tuesday";
                    break;
                case 3:
                    text = "Wednesday";
                    break;
                case 4:
                    text = "Thursday";
                    break;
                case 5:
                    text = "Friday";
                    break;
                case 6:
                    text = "Saturday";
                    break;
                case 7:
                    text = "Sunday";
                    break;
            }
            
            f.sdays[d] = new Object();
            f.sdays[d].opens = new Object();
            f.sdays[d].closes = new Object();
            e = document.getElementById("schedule_open_"+text).value+':'+document.getElementById("schedule_open_min_"+text).value;
            //alert(e)
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
        
        Forms.UpdateValue("schedule", "schedule", JSON.stringify(f), true);

        Schedule.SaveSchedule();

    },

    SaveSchedule: function(){
        Main.Loading();       
        $.post("lib/business.php", "f=SaveSchedule&data=" + JSON.stringify(Forms.Form.schedule), function (b) {            
             $.post("lib/panel-bulk.php", 'data=[{"operation":"FetchBusinessData","id":"' + Business.id + '"}]', function (a) {
                Main.Ready();
                a = JSON.parse(a);
                Schedule.Refetch(a.business)

            });                
        });
    },
    Refetch: function(F){
        if (F == "") {
            alert("Error")
        }
        Business.Scheduletext = JSON.parse(F.schedule)

        if(Business.Scheduletext){
            var M = true;
        }else{
            var M = false;
        }
        
        MenuCatalog.Main(M);
    }

};