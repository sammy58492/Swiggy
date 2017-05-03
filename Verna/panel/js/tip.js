var tip = {
    init: function (a) {
        var b = document.createElement("div");
        b.setAttribute("class", "tip");
        this.div = $(b);
        if (a) {
            this.opts = a
        } else {
            this.opts = new Object()
        }
        $("body").prepend(this.div);
        this.update()
    },
    update: function () {
        $("[tip]").each(function () {
            var e = $(this);
            var g = e.attr("tip");
            if (g != "") {
                var f = e.offset();
                var d = f.left;
                var c = f.top;
                var b = e.width();
                var a = e.height();
                e.live("mouseover.tip", function () {
                    tip.setShowTimer(c, d, g)
                });
                e.live("mouseout.tip", function () {
                    tip.hide()
                })
            }
        })
    },
    setShowTimer: function (c, b, d) {
        var a = 350;
        if (tip.opts.delay) {
            a = tip.opts.delay
        }
        tip.showTipTimer = setInterval("tip.show(" + c + "," + b + ',"' + d + '")', a)
    },
    clearShowTimer: function () {
        clearInterval(tip.showTipTimer)
    },
    show: function (d, c, e) {
        var b = tip.div.height();
        var a = c + 65;
        var f = d - b - 5;
        tip.div.stop();
        tip.div.css({
            top: f + "px",
            left: a + "px"
        });
        tip.div.html(e);
        tip.div.fadeIn(500);
        f -= 10;
        tip.div.animate({
            top: f
        }, {
            queue: false
        }, 350);
        tip.clearShowTimer()
    },
    hide: function () {
        this.clearShowTimer();
        this.div.fadeOut()
    }
};
