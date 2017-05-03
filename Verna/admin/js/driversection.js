var DriverSection={
	Main: function(){
		Switch.Init();
		var htms='';
		htms +='<div class="row">'
		htms +='<div class="top-bar">'
		htms +='<div class=" col-md-6 col-md-offset-6">'
		htms +='<div class=" pull-right">'
		htms +='<button class="btn btn-default btn-rounded-lg close-btn panel-btn-2" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_DRIVER_GROUP_CANCEL'] ?></button></div>'
		htms +='</div>'
		<!--col-md-5-->
		htms +='</div>'
		<!--top-bar-->
		htms +='</div>'
		<!--row-->
		htms +='<div id="drivermanager"></div>'
		htms +='<div id="drivergroup">'		
		htms +='</div>'
		htms +='<div id="driver-list">'		
		htms +='</div>'
		document.getElementById("main").innerHTML = htms;
		if(Main.User.level < 2){
			DriverManager.Main();
		}else if(Main.User.level == 5){
			DriverGroup.Main();
		}
		
		
		
		
	},

};