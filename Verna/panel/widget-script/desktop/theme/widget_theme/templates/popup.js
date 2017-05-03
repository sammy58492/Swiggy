var Popup = {
    Init: function (b) {
        var a = '<div id="popupbg"></div>';
        a += '<div id="popupbox">';
        //a += '<div class="cancel hand" id="cancel_ID" onclick="Popup.OnCancel()"></div><div id="popupmainbuttonok" class="ok disabled hand"></div>';
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
        // this.PopupBg = $("#popupbg");
        this.PopupBox = $("#popupbox");
        this.Popup = $("#popup");
        this.CanSubmit = false
    },
    ShowTrack: function (a, g, c, d, f, e, b) {
		
	      //this.PopupBox.height('');
		  //this.PopupBox.width('');
		  this.Popup.width('');
		  this.Popup.height('');
		  
		 /* alert("ok1")*/
		 
        this.Width = a;
        this.Height = g;
        ////$("#popupbox").css('width','100%');
		//$("#popupbox").css('z-index','999');
        //this.PopupBox.height('');
        this.Popup.height('');
        this.Popup.html(c);
       /* $("#popupmainbuttonok").css('display','block');
        $("#popupmainbuttonok").click(function () {
            Popup.OnAccept()
        });*/
        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
		$("body").addClass("popopen")
		//this.TrackCenter();
        if (e) {
            e()
        }
        if (b) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }




    },
	TrackCenter: function () {
        var e = $(window).width();
        var f = $(window).height();
        var c = this.Width;
        var a = this.Height;
        var b = f / 2 - a / 2;
        var d = e / 2 - c / 2;
        this.PopupBox.css({
            top: '5%',
            left: '0%',
			right: '0%',
			position:'absolute',
        })
    },
    Show: function (a, g, c, d, f, e, b) {
		
		
	      //this.PopupBox.height('');
		  //this.PopupBox.width('');
		  this.Popup.width('');
		  this.Popup.height('');
		  
		 /* alert("ok1")*/
		 
        this.Width = a;
        this.Height = g;
        //$("#popupbox").css('width','100%');
		//$("#popupbox").css('z-index','999');
        //this.PopupBox.height('');
        this.Popup.height('');
        this.Popup.html(c);
       /* $("#popupmainbuttonok").css('display','block');
        $("#popupmainbuttonok").click(function () {
            Popup.OnAccept()
        });*/
        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
		////this.Center();
$("body").addClass("popopen")
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
	      //this.PopupBox.height('');
		  this.Popup.width('');
		  this.Popup.height('');
		 var top = ($("#left").height() + $("#showcanvas").height()) / 2;
        this.Width = a;
        this.Height = g;
        //$("#popupbox").css('width','100%');
        this.PopupBox.height(g);
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
        //this.Center();
$("body").addClass("popopen")
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
		//$("#popupbox").css('top',top);
        if (e) {
            e()
        }
        if (b) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
	
	ShowSearch: function (a, g, c, d, f, e, b) {
        this.Width = a;
        this.Height = g;
        //$("#popupbox").css('width','100%');
        this.PopupBox.height(g);
        this.Popup.height(g - 68);
        this.Popup.html(c);
        $("#popupmainbuttonok").click(function () {
            Popup.OnAccept()
        });
		$("#popupmainbuttonok").css('display','none');
        if (d) {
            this.AccceptCallBack = d
        } else {
            this.AccceptCallBack = null
        } 
		
		if (f) {
            this.CancelCallBack = f
        } else {
            this.CancelCallBack = null
        }
        //this.Center();
$("body").addClass("popopen")
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
	     //this.PopupBox.height('');
		 this.Popup.width('');
	
		 
        this.Width = a;
        this.Height = g;
        //$("#popupbox").css('width','100%');
        this.PopupBox.height(g);
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
        //this.Center();
$("body").addClass("popopen")
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
		 this.Height = $("#popupbox").height();
		 
		 //this.Center();
		 //$("#popupbox").css('top','55px');
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
		
		 this.Popup.height('');
	     //this.PopupBox.height('');
		 
		  this.Popup.width('');
		 
        this.Width = a;
        this.Height = g;
		
		var top = $("#left").height() / 2;
		
       //$("#popupbox").css('width','100%');
        this.PopupBox.height(g);
        this.Popup.html(c);
		
		$("#popupbox").css('top',top);
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
        //this.Center();
$("body").addClass("popopen")
        this.PopupBg.css("filter", "alpha(opacity=50)").show();
        this.PopupBox.show();
		 this.Height = $("#popupbox").height();
		 //this.Center();
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
        //this.Center();
$("body").addClass("popopen")
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
        $("body").removeClass("popopen")
        this.PopupBg[0].style.display = "none";
        this.PopupBox[0].style.display = "none";
        this.Popup.html("")
    },
    Center: function () {
		
        var e = $(window).width();
        var f = $(window).height();
		//var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var c = this.Width;
        var a = this.Height;
        var b = f / 2 - a / 2;
        var d = e / 2 - c / 2;
		//var top = ((f / 2) - (a / 2)) + dualScreenTop;
		
		b = 70;
		/*alert($("#left").height())
		alert($("#showcanvas").height())
		alert(b)*/
        //b += $(document).scrollTop();
		
	
		
       /* this.PopupBox.css({
            top: '50%',
            left: '0%',
			right: '0%',
			position:'absolute',
        })*/
        
         /*this.PopupBox.css({
            top: '20%',
            left: '0%',
            right: '0%',
            position:'fixed',
        })*/
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
