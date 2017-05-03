var Lang = { 
		 Main: function () {
			
			Main.Loading();
			var a = new Date().getTime();
        	Main.Aid = a;
		$.post("lib/lang.php", "f=GetLanguage", function (b) {
			if (a != Main.Aid) {
                return
            }
			Main.Ready();
			Lang.b = JSON.parse(b);	
			Lang.default_lang_id =  Lang.b[0].default_lang_id;	
			
			Lang.PrintMain();
		})
	},

	
	PrintMain: function(e){
		var c="";
	
		c +='<div class="row">'
		c +='<ul class="pop_lang_img">'
		for (var e in Lang.b) {
		
		var p = "images/lang/" + Main.NullToEmpty(Lang.b[e].id) + "/1/mini.jpg?p=" + new Date().getTime();
		
		if(Lang.b[e].id == Lang.default_lang_id)
		{
		c+='<li class="active" id="'+Lang.b[e].id+'"><a href="javascript:void(0)" onClick="Lang.show_id('+Lang.b[e].id+');"><img src="'+p+'"" ></a></li>'
		}
		else
		{
		c+='<li id="'+Lang.b[e].id+'"><a href="javascript:void(0)" onClick="Lang.show_id('+Lang.b[e].id+');"><img src="'+p+'"" ></a></li>'
		}
		}

		c +='</ul>'
      	c +='</div>'<!--row-->
		
		$("#langGroup").empty().append(c);
	},
	
	show_id : function(ID)
		{
		
			for (var e in Lang.b) 
				{
					
					document.getElementById(Lang.b[e].id).className  = '';
					
				}
				
			Lang.langvalue = document.getElementById(ID);
			//alert(Lang.langvalue.id)
			document.getElementById(ID).className  = 'active';
			
			 
		},
	
};