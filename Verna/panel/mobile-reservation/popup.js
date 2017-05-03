var Popup = {
    Init: function (b) {
        var a = '<div id="popupbg"></div>';
        a += '<div id="popupbox">';
        a += '<div id="popup"></div></div></div>';
        document.getElementById(b).innerHTML = a;
        this.PopupBg = $("#popupbg");
        this.PopupBox = $("#popupbox");
        this.Popup = $("#popup");
        this.CanSubmit = false
    },
	Inits: function (b) {
        var a = '<div id="popupbox">';
        a += '</div>';
        document.getElementById(b).innerHTML = a;
        this.PopupBox = $("#popupbox");
        this.Popup = $("#popup");
        this.CanSubmit = false
    },
    Show: function (a, g, c, d, f, e, b) {
		
		
	      this.PopupBox.height('');
		  this.PopupBox.width('');
		  this.Popup.width('');
		  this.Popup.height('');
		  
		 
        this.Width = a;
        this.Height = g;
        this.PopupBox.width('');
        this.PopupBox.height('');
        this.Popup.width('');
        this.Popup.height('');
        this.Popup.html(c);
        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        this.Center();
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
        if (e) {
            e()
        }
        if (b) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
	
	ShowFP: function (a, g, c, d, f, e, b) {
		
		  this.Popup.height('');
	      this.PopupBox.height('');
		  this.Popup.width('');
		  this.Popup.height('');
		  this.PopupBox.left('');
		  this.PopupBox.top('100px');
		 
        this.Width = a;
        this.Height = g;
		
        this.Popup.width(a - 82);
        this.Popup.height(g - 68);
        this.Popup.html(c);
        
        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        this.Center();
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
        if (e) {
            e()
        }
        if (b) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
	
	
	 ShowNew: function (a, g, c, d, f, e, b) {
		
		 this.Popup.height('');
	     this.PopupBox.height('');
		 this.Popup.width('');
	
		 
        this.Width = a;
        this.Height = g;
        this.PopupBox.width(a);
        this.PopupBox.height(g);
        this.Popup.width(a - 82);
        this.Popup.height(g - 68);
        this.Popup.html(c);
		
		
		$("#popupbox .content .editform").css('padding-bottom','22px');
        $("#popupmainbuttonok").css('display','block');
		$("#popup").css('overflow-y','hidden');
        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        this.Center();
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
		 this.Height = $("#popupbox").height();
		 
		 this.Center();
		 $("#popupbox").css('top','55px');
        if (e) {
            e()
        }
        if (b) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
	ShowNewForProductOp: function (a, g, c, d, f, e, b) {
		
		//alert('inside pooup');
		 this.Popup.height('');
	     this.PopupBox.height('');		 
		  this.Popup.width('');
		 
        this.Width = a;
        this.Height = g;
        this.PopupBox.width('');
        this.PopupBox.height('');
        this.Popup.width('');
        this.Popup.height('');
        this.Popup.html(c);
		
		$("#popupbox .content .editform").css('padding-bottom','22px');
      
		$("#popup").css('overflow-y','hidden');
		$("#popup").css('overflow-x','hidden');
       
        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        this.Center();
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
		 this.Height = $("#popupbox").height();
		 this.Center();
        if (e) {
            e()
        }
        if (b) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
    ShowUp: function (a, g, c, d, f, e, b) {
        this.Width = a;
        this.Height = g;
        this.PopupBox.width(a);
        this.PopupBox.height(g);
        this.Popup.width(a - 82);
        this.Popup.height(g - 68);
        this.Popup.html(c);
        $("#popupmainbuttonok").click(function () {
            Popup.OnAccept()
        });
        $("#popupmainbuttonok").css('position','relative');
        $("#popupmainbuttonok").css('top','440');
        $("#popupmainbuttonok").css('float','right');


        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        this.Center();
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
        if (e) {
            e()
        }
        if (b) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
    Close: function () {

        this.PopupBg[0].style.display = "none";
        this.PopupBox[0].style.display = "none";
        this.Popup.html("")
    },
    Center: function () {
		
        var e = $(window).width();
        var f = $(window).height();
        var c = this.Width;
        var a = this.Height;
        var b = f / 2 - a / 2;
        var d = e / 2 - c / 2;
        if (b < 30) {
            b = 30
        }
        b = $(document).scrollTop();
						
		if($(".popup_wrapper")){
			b1=parseInt(b)+100;
			$(".popup_wrapper").css("margin", b1+"px auto 0"); 
		}
		
        this.PopupBox.css({
			top: b
        })
    },
    OnAccept: function () {
        if (this.CanSubmit) {
            if (this.AccceptCallBack) {
                this.AccceptCallBack()
            }
        }
    },
    OnCancel: function () {
        this.Close();
        if (this.CancelCallBack) {
            this.CancelCallBack()
        }
    },
    EnableSubmitButton: function (a) {
        var b = $(this.PopupBox).find(".ok");
        if (a) {
            this.CanSubmit = true;
            $(b).removeClass("disabled");
            $(b).removeClass("default");
            $(b).addClass("enabled")


        } else {

            this.CanSubmit = false;
            $(b).removeClass("enabled");
            $(b).addClass("disabled");
            $(b).addClass("default")
        }

    }
};
