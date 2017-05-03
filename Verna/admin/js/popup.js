var Popup = {
    Show: function (b,e) {
		
		var a='<div id="newpopup" class="white-popup mfp-with-anim popupfixed" style="">'
		a +='<span class="button b-close" style="float: right; cursor:pointer;"><span>X</span></span>'
		a += '<div id="popup_content"></div>'
		
		a +='</div>'
       
		
		
		$("#popup_container").empty().append(a);
		
		$("#popup_content").empty().append(b);


		var g =0;
		var s = $(window).width();
        var f = $(window).height();
        var c = $("#newpopup").width()
        var a = $("#newpopup").height();       
        var g = f / 2 - a / 2;
        var d = s / 2 - c / 2;
        if (g < 30) {
            g = 30
        }
        g += $(document).scrollTop();
       

		var bPopup = $('#newpopup').bPopup({
            modalClose: false,
            follow: [false, false], //x, y
            position: [d, g], //x, y
            opacity: 0.6,
			escClose: false,
			onOpen: function() {  $('div[id*=newpopup]').remove();  $("#popup_container").empty();  },
			onClose: function() { $('div[id*=newpopup]').remove();  $("#popup_container").empty();  }
        });
		if (e) {
            e()
        }
    },
	Close: function () {
		
		var bPopup = $('#newpopup').bPopup();
		bPopup.close();
		
	
		$('div[id*=newpopup]').remove();
		
		$("#popup_container").empty();
		
    },
	
	
	
};
