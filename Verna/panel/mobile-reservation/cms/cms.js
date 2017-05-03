var CMS = {
	Strat: function(){
		$.post("panel/lib/front-main.php", "f=CmsContent&id=" + Main.RedirectToCMS, function (d) {
			d=JSON.parse(d)
			CMS.Main(d);
	 	});
		
	},
	Main: function(d){
		
		$( ".cmain" ).addClass( "cms_main" );
		$( "#header" ).addClass( "cms_header" );
		var n ='';
		n +='<div class="aboutarea">'
		n +='<div class="container">'
		n +='<div class="aboutin">'
		n +='<div class="aboutin_hd">'+d.pageheading+'</div>'
		n +='<div class="aboutrow">'
		n +=d.pagecontent
		n +='</div>'
		n +='</div>'
		n +='</div>'
		n +='</div>'
	
		
		document.getElementById("top").innerHTML= n;
		document.getElementById("left").style.display = 'none';
		document.getElementById("right").style.display ='none';
		
	},
};