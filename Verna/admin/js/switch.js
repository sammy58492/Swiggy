var Switch = {
    Init: function () {
        Switch.OnSwitchChange = new Object();
        Switch.Switches = new Object()
    },
    Create: function (d, e) {

        Switch.Switches[d] = new Object();
        Switch.Switches[d].On = e;
        

        var c = document.getElementById(d);
        c.setAttribute("class", "enebal");
        /*var f = document.createElement("a");
        f.setAttribute("style", "display:none " );
        f.setAttribute("class", "");*/
        var b = document.createElement("a");
		
        var a;
        if (e) {
            a = "open"
        } else {
            a = "close"
        }
        b.setAttribute("class", "selector " + a);
        c.appendChild(b);
       // c.appendChild(f);
        if (e == false) {
            $(b).animate({
                marginLeft: $(c).width() - $(b).width()
            }, 0)
        }        
        $(c).click(Switch.Engage)
    },
    Engage: function () {
        var b = $(this).find(".selector");        
        var a = $(this).attr("id");
       
        if (Switch.Switches[a].On) {
            b.removeClass("open");
            b.addClass("close");
            if (Switch.OnSwitchChange[a]) {
                Switch.OnSwitchChange[a](a, false)
            }
            b.animate({
                marginLeft: $(this).width() - b.width()
            }, 200, function () {})
        } else {
            b.removeClass("close");
            b.addClass("open");
            if (Switch.OnSwitchChange[a]) {
                Switch.OnSwitchChange[a](a, true)
            }
            b.animate({
                marginLeft: 0
            }, 200, function () {})
        }
        Switch.Switches[a].On = !Switch.Switches[a].On
    },
    SwitchTo: function (a, b) {
        var c = $("#" + a).find(".selector");
        if (b) {
            c.removeClass("close");
            c.addClass("");
            c.animate({
                marginLeft: 0
            }, 200, function () {})
        } else {
            c.removeClass("");
            c.addClass("close");
            c.animate({
                marginLeft: c.parent().width() - c.width()
            }, 200, function () {})
        }
        Switch.Switches[a].On = b
    },
    OnChange: function (b, a) {
        this.OnSwitchChange[b] = a
    },
    Clear: function () {
        delete this.OnSwitchChange;
        delete this.Switches
    }
};
