var CMS = {
	Strat: function(){
		$.post("panel/lib/front-main.php", "f=CmsContent&id=" + Main.RedirectToCMS, function (d) {
			d=JSON.parse(d)
			CMS.Main(d);
	 	});
		
	},
	Main: function(d){
	
	var n ='';
	<!--header-->
	n +='<div class="header">'
	n +='<div class="container"><div class="cms_bck"><button class="cms_bck_btn" onclick="Main.HomeUrlCustom()"> < Back </button></div>'
	n +='<div class="row">'
	n +='<div class="rak-12">'
	n +='<div class="logo"><a href="javascript:Main.HomeUrlCustom()" ><img src="panel/images/logo/1/normal.jpg"></a></div>'
	n +='</div>'
	n +='</div>'
	n +='</div>'
	n +='</div>'
	<!--header end-->
	
	<!--aboutarea-->
	n +='<div class="aboutarea">'
	n +='<div class="container">'
	n +='<div class="aboutin">'
	n +='<div class="aboutin_hd">'+d.pageheading+'</div>'
	n +='<div class="aboutrow"> '
	n +=d.pagecontent
	n +='</div>'
	n +='</div>'
	n +='</div>'
	<!--aboutarea-->

	document.getElementById("top").innerHTML= n;
	
		
	},
};