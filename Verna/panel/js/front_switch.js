var Switch = {
    Init: function () {
        this.OnSwitchChange = new Object();
        this.Switches = new Object()
    },
    Create: function (d, e) {
        this.Switches[d] = new Object();
        this.Switches[d].On = e;
        var c = document.getElementById(d);
        c.setAttribute("class", "switch checkbox_2 hand");
        var f = document.createElement("div");
        f.setAttribute("class", "area");
        var b = document.createElement("div");
        var a;
        if (e) {
            a = "enabled"
        } else {
            a = "disabled"
        }
        b.setAttribute("class", "selector " + a);
       //  c.appendChild(b);
        // c.appendChild(f);
		 
        if (e == false) {
            $(b).animate({
                marginLeft: $(c).width() - $(b).width()
            }, 0)
        }
        $(c).click(this.Engage)
    },
    Engage: function () {
        var b = $(this).find(".selector");
        var a = $(this).attr("id");
        if (Switch.Switches[a].On) {
            b.removeClass("enabled");
            b.addClass("disabled");
            if (Switch.OnSwitchChange[a]) {
                Switch.OnSwitchChange[a](a, false)
            }
            b.animate({
                marginLeft: $(this).width() - b.width()
            }, 200, function () {})
        } else {
            b.removeClass("disabled");
            b.addClass("enabled");
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
            c.removeClass("disabled");
            c.addClass("enabled");
            c.animate({
                marginLeft: 0
            }, 200, function () {})
        } else {
            c.removeClass("enabled");
            c.addClass("disabled");
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
