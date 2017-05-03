var CMS = {
	Strat: function(){
		$.post("panel/lib/front-main.php", "f=CmsContent&id=" + Main.RedirectToCMS, function (d) {
			d=JSON.parse(d)
			Main.Ready();
			CMS.Main(d);
	 	});
		
	},
	Main: function(d){
		$("body").addClass("grey_body")
		
		var n ='';
		n +='<div class=" inner_banner_black">'
		n +='<div class="container">'
		n +='<div class="restaurant_info">'
		n +='<h3>'+d.pagetitle+'</h3>'

		n +='</div>'<!--restaurant_info-->
		n +='</div>'<!--container-->
		n +='</div>'<!--inner_banner_black-->

		n +='<div class="container">'
		n +='<div class="row">'
		n +='<div class="col-md-12">'            
		n +='<div class="border_box">'
		n +='<div class="narrow_wrapper">'
		n +='<div class="cms-container">'   
		n +='<div class="row">'
		n +='<div class="col-md-12">'
		n +='<div class="cms-bg-dv">'
		n +='<h1>'+d.pageheading+'</h1>'
		n +='<hr>'

		n +=d.pagecontent

		n +='</div>'<!--cms_white_bg--->
		n +='</div>'<!--col-md-12-->
		n +='</div>'<!--row-->    	
		n +='</div>'
		n +='</div>'<!--narrow_wrapper-->
		n +='</div>'<!--border_box-->
		n +='</div>'<!--col-md-8-->
		n +='</div>'<!--row-->
		n +='</div>'<!--container-->

	
		document.getElementById("top").innerHTML= n;
		document.getElementById("left").style.display = 'none';
		document.getElementById("right").style.display ='none';
		$("#frontvisual").empty();
		
	},
};