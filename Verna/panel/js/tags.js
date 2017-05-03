var Tags = {
    Init: function () {
        this.Tags = new Object();
        this.OnChangeFunctions = new Object()
    },
    CreateContainer: function (b) {
        var a = document.getElementById(b);
        $(a).addClass("tags");
        a.innerHTML = "";
        this.Tags[b] = new Object()
    },
    CreateTag: function (e, f, b) {
        if (!f || !f.caption || !f.id) {
            return
        }
        var d = document.getElementById(e);
        var c = "";
        if (!f.cclass) {
            f.cclass = "ingredient"
        }
        if (f.enabled == null) {
            f.enabled = true
        }
        var a = f.id;
        var h = "";
        var g = "";
        if (!f.enabled) {
            h = f.cclass + "disabled";
            g = f.cclass + "captiondisabled"
        }
        if (b) {
            c += '<div class="tag default ' + f.cclass + " " + h + '" id="tags_' + e + "_tag_" + a + '">';
            c += '<span class="icaption nonselectable caption' + f.cclass + " " + g + '">' + f.caption + "</span>";
            c += '<div class="close"></div>';
            c += "</div>";
            $(d).append(c)
        } else {
            c += '<div class="tag hand ' + f.cclass + " " + h + '" id="tags_' + e + "_tag_" + a + '">';
            c += '<span class="icaption nonselectable caption' + f.cclass + " " + g + '">' + f.caption + "</span>";
            c += '<div class="close"></div>';
            c += "</div>";
            $(d).append(c);
            document.getElementById("tags_" + e + "_tag_" + a).onclick = function () {
                Tags.ToggleStatus(e, a)
            }
        }
        this.Tags[e][a] = f
    },
    ToggleStatus: function (c, a) {
        var d = this.Tags[c][a];
        var b = document.getElementById("tags_" + c + "_tag_" + a);
        if (d.enabled) {
            $(b).addClass(d.cclass + "disabled").find(".icaption").addClass(d.cclass + "captiondisabled");
            d.enabled = false
        } else {
            $(b).removeClass(d.cclass + "disabled").find(".icaption").removeClass(d.cclass + "captiondisabled");
            d.enabled = true
        } if (this.OnChangeFunctions[c]) {
            d.id = a;
            this.OnChangeFunctions[c](d)
        }
    },
    GetTags: function (b) {
        var a = new Array();
        for (var c in this.Tags[b]) {
            var d = this.Tags[b][c];
            d.id = c;
            a.push(d)
        }
        return a
    },
    OnChange: function (b, a) {
        this.OnChangeFunctions[b] = a
    },
    Clear: function () {
        this.Tags = null;
        this.OnChangeFunctions = null
    }
};
