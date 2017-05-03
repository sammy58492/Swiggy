var DraggableAccordion = {
    Init: function (b, a) {
        document.getElementById(b).innerHTML = '<div id="dboxdraggable" class="' + a + '"></div>'
    },
    AddCategory: function (b, a) {
        var c = document.createElement("h3");
        c.innerHTML = '<a href="#" class="nonselectable">' + a + "</a>";
        var e = document.createElement("div");
        var d = document.createElement("ul");
        d.setAttribute("id", "dboxdraggablecategory_" + b);
        e.appendChild(d);
        document.getElementById("dboxdraggable").appendChild(c);
        document.getElementById("dboxdraggable").appendChild(e)
    },
    AddItem: function (b, a, d) {
        var c = document.createElement("li");
        c.setAttribute("id", "dboxdraggableitem_" + b);
        c.setAttribute("class", "dboxli hand");
        c.innerHTML = a;
        document.getElementById("dboxdraggablecategory_" + d).appendChild(c);
        $(c).draggable({
            helper: "clone"
        });
        $(c).hover(function () {
            $(this).addClass("hover")
        }, function () {
            $(this).removeClass("hover")
        })
    },
    Clean: function () {
        this.Accepted = null;
        $(".dboxli").draggable("destroy");
        $("#dboxdraggable").accordion("destroy")
    },
    StartAcordion: function () {
        $("#dboxdraggable").accordion({
            active: false,
            autoHeight: false,
            collapsible: true,
            icons: {
                header: "ui-accordion-ico1",
                headerSelected: "ui-accordion-ico2"
            }
        })
    }
};