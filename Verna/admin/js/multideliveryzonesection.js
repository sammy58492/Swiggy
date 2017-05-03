var MultiDeliverySection = {
	
	Main: function(){
		Switch.Init();
		var htms='';
		htms +='<div class="row">'
		htms +='<div class="top-bar">'
		htms +='<div class=" col-md-6 col-md-offset-6">'
		htms +='<div class=" pull-right">'
		htms +='<button class="btn btn-default btn-rounded-lg close-btn panel-btn-2" onclick="Home.Main()"><i class="fa icon-close"></i><?$lang_resource['BUSINESS_CANCEL']?></button></div>'
		htms +='</div>'
		<!--col-md-5-->
		htms +='</div>'
		<!--top-bar-->
		htms +='</div>'
		<!--row-->
		htms +='<div id="deliverybymap"></div>'
		htms +='<div id="deliverybykm"></div>'
		htms +='<div id="deliverybyzip"></div>'
		htms +='<div id="deliverymapdemo" style="display:none;"></div>'
		document.getElementById("main").innerHTML = htms;
		e= new Object();
		e.latitud = 40.7176195;
		e.longitud = -73.99223970000003;
		e.zoom = 10
		
		GoogleMap.Init("deliverymapdemo", e.latitud, e.longitud, e.zoom, null, null, '', "bottomright")
			DeliveryByMap.Main();
			
		
	},
	
};
