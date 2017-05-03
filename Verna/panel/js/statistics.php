<?php
session_start();
require_once('../login/common.php');
require_authentication(2);
?>
var Statistics = {
    Main: function () {
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/orders.php", "f=FetchAllOrdersData&business=t", function (c) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                Statistics.Orders = JSON.parse(c);
                Statistics.PupulateStats()
            } else {
                alert("Error")
            }
        });
        var b = '<div class="contentbox">';
        b += '<div class="titlebox nonselectable">';
        b += '<span class="title">&gt;&gt; <?= $lang_resource['CONTROL_PANEL_STATISTICS_TITLE'] ?></span>';
        b += "</div>";
        b += '<span class="sellstitle"><?= $lang_resource['CONTROL_PANEL_STATISTICS_SALES_TITLE'] ?></span>';
        b += '<div id="graph"></div>';
        b += '<span class="sellstitle"><br/><?= $lang_resource['CONTROL_PANEL_STATISTICS_TOP_10'] ?></span>';
        b += '<div id="topten"></div>';
        b += "</div>";
        document.getElementById("main").innerHTML = b;
        document.getElementById("leftcol").innerHTML = Visuals.CreateSearchBox();
        document.getElementById("search").onkeyup = function () {
            Statistics.PupulateStats()
        }
    },
    PupulateStats: function () {
        var p = false;
        var l = "";
        var j = new Array();
         document.getElementById("totalOrderBox").style.display = "none";
        for (var g in Statistics.Orders) {
            p = false;
            l = document.getElementById("search").value.toLowerCase();
            if (Statistics.Orders[g].date.toLowerCase().indexOf(l) >= 0) {
                p = true
            }
            if (l.indexOf(" a ") >= 0) {
                var a = l.split(" a ");
                var s = $.trim(a[0]).toLowerCase();
                var q = $.trim(a[1].toLowerCase());
                if (s != "" || q != "") {
                    var m = this.Orders[g].date.toLowerCase();
                    var e = m;
                    if (q.length == 10) {
                        e = m.split(" ")[0]
                    }
                    if (m >= s && e <= q) {
                        p = true
                    }
                }
            }
            if (p) {
                j.push(Statistics.Orders[g])
            }
        }
        var f;
        var c;
        Statistics.DaySells = new Object();
        for (g in j) {
            f = j[g].date.split("-");
            c = String(f[0]) + "/" + String(parseInt(f[1]) - 1) + "/" + String(f[2].split(" ")[0]);
            if (j[g].status == 1) {
                if (Statistics.DaySells[c] != null) {
                    Statistics.DaySells[c].sells++;
                    if (Statistics.DaySells[c].citys[j[g].city.id]) {
                        Statistics.DaySells[c].citys[j[g].city.id].sells++
                    } else {
                        Statistics.DaySells[c].citys[j[g].city.id] = new Object();
                        Statistics.DaySells[c].citys[j[g].city.id].name = j[g].city.name;
                        Statistics.DaySells[c].citys[j[g].city.id].sells = 1
                    }
                } else {
                    Statistics.DaySells[c] = new Object();
                    Statistics.DaySells[c].sells = 1;
                    Statistics.DaySells[c].citys = new Object();
                    Statistics.DaySells[c].citys[j[g].city.id] = new Object();
                    Statistics.DaySells[c].citys[j[g].city.id].name = j[g].city.name;
                    Statistics.DaySells[c].citys[j[g].city.id].sells = 1
                }
            }
        }
        var h = new Array();
        var r;
        for (g in Statistics.DaySells) {
            f = g.split("/");
            r = "";
            for (var d in Statistics.DaySells[g].citys) {
                r += Statistics.DaySells[g].citys[d].name + ": " + Statistics.DaySells[g].citys[d].sells + "<br/>"
            }
            h.push([(new Date(f[0], f[1], f[2])).getTime(), Statistics.DaySells[g].sells, r])
        }
        h.sort();
        Statistics.PlotGraph("graph", h, "day");
        var o = new Object();
        for (g in j) {
            for (var d in j[g].business) {
                if (j[g].status == 1) {
                    if (o[j[g].business[d].id] == null) {
                        o[j[g].business[d].id] = new Object();
                        o[j[g].business[d].id].name = j[g].business[d].name;
                        o[j[g].business[d].id].city = j[g].city.name;
                        o[j[g].business[d].id].sells = 1
                    } else {
                        o[j[g].business[d].id].sells++
                    }
                }
            }
        }
        var b = new Array();
        for (g in o) {
            b.push({
                id: g,
                name: o[g].name,
                sells: o[g].sells,
                city: o[g].city
            })
        }
        b.sort(Main.SortByProperty("sells")).reverse();
        var n = "";
        for (g in b) {
            n += '<div class="row default"><span class="position">' + (parseInt(g) + 1) + '.- </span><span class="business">' + b[g].name + " (" + b[g].city + ")  <?=$lang_resource['CONTROL_PANEL_STATISTIC_WITH']?> " + b[g].sells + " <?=$lang_resource['CONTROL_PANEL_STATISTIC_SALES']?></span></div>";
            if (parseInt(g) + 2 > 10) {
                break
            }
        }
        document.getElementById("topten").innerHTML = n
    },
    PlotGraph: function (b, c, a) {
    
        b = $("#" + b);
        this.Data = c;
        $.plot(b, [c], {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                },
            },
            grid: {
                hoverable: true,
                clickable: false,
            },
            xaxis: {
                mode: "time",
                ticks: 7,
                minTickSize: [1, a],
            },
            yaxis: {
                min: 0,
                ticks: 6,
                autoscaleMargin: 0.1
            },
            selection: {
                mode: "x"
            }
        });
        b.bind("plothover", function (g, i, f) {
            if (f) {
                if (previousPoint != f.dataIndex) {
                    previousPoint = f.dataIndex;
                    $("#tooltip").remove();
                    var d = f.datapoint[0].toFixed(Main.IS_DECIMAL_POINT),
                        h = f.datapoint[1].toFixed(Main.IS_DECIMAL_POINT);
                    var e = '<span style="float:left;width:100%;text-align:center;margin-bottom:5px;">' + new Date(Statistics.Data[f.dataIndex][0]).format("mmm d") + "</span>";
                    e += "<span>Total: " + Statistics.Data[f.dataIndex][1] + "<br/>";
                    e += Statistics.Data[f.dataIndex][2] + "</span>";
                    Statistics.ShowTooltip(f.pageX, f.pageY, e)
                }
            } else {
                $("#tooltip").remove();
                previousPoint = null
            }
        })
    },
    ShowTooltip: function (a, c, b) {
        $('<div id="tooltip"><div style="font-size:11px;line-height:15px">' + b + "</div></div>").css({
            position: "absolute",
            display: "none",
            top: c + 5,
            left: a + 5,
            border: "1px solid #fdd",
            padding: "7px",
            "background-color": "#fee",
            opacity: 0.8
        }).appendTo("body").fadeIn(200)
    }
};
var dateFormat = function () {
    var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        d = /[^-+\dA-Z]/g,
        c = function (f, e) {
            f = String(f);
            e = e || 2;
            while (f.length < e) {
                f = "0" + f
            }
            return f
        };
    return function (i, v, q) {
        var g = dateFormat;
        if (arguments.length == 1 && Object.prototype.toString.call(i) == "[object String]" && !/\d/.test(i)) {
            v = i;
            i = undefined
        }
        i = i ? new Date(i) : new Date;
        if (isNaN(i)) {
            throw SyntaxError("invalid date")
        }
        v = String(g.masks[v] || v || g.masks["default"]);
        if (v.slice(0, 4) == "UTC:") {
            v = v.slice(4);
            q = true
        }
        var t = q ? "getUTC" : "get",
            l = i[t + "Date"](),
            e = i[t + "Day"](),
            j = i[t + "Month"](),
            p = i[t + "FullYear"](),
            r = i[t + "Hours"](),
            k = i[t + "Minutes"](),
            u = i[t + "Seconds"](),
            n = i[t + "Milliseconds"](),
            f = q ? 0 : i.getTimezoneOffset(),
            h = {
                d: l,
                dd: c(l),
                ddd: g.i18n.dayNames[e],
                dddd: g.i18n.dayNames[e + 7],
                m: j + 1,
                mm: c(j + 1),
                mmm: g.i18n.monthNames[j],
                mmmm: g.i18n.monthNames[j + 12],
                yy: String(p).slice(2),
                yyyy: p,
                h: r % 12 || 12,
                hh: c(r % 12 || 12),
                H: r,
                HH: c(r),
                M: k,
                MM: c(k),
                s: u,
                ss: c(u),
                l: c(n, 3),
                L: c(n > 99 ? Math.round(n / 10) : n),
                t: r < 12 ? "a" : "p",
                tt: r < 12 ? "am" : "pm",
                T: r < 12 ? "A" : "P",
                TT: r < 12 ? "AM" : "PM",
                Z: q ? "UTC" : (String(i).match(b) || [""]).pop().replace(d, ""),
                o: (f > 0 ? "-" : "+") + c(Math.floor(Math.abs(f) / 60) * 100 + Math.abs(f) % 60, 4),
                S: ["th", "st", "nd", "rd"][l % 10 > 3 ? 0 : (l % 100 - l % 10 != 10) * l % 10]
            };
        return v.replace(a, function (m) {
            return m in h ? h[m] : m.slice(1, m.length - 1)
        })
    }
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
	dayNames:["<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SUN'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MON'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_TUE'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_WED'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_THU'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_FRI'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SAT'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] ?>"],
	monthNames:["<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JAN'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_FEB'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MAR'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_APR'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MAY'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JUN'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JUL'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_AUG'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SEP'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_OCT'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_NOV'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_SHORT_DEC'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_JAN'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_FEB'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAR'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_APR'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAY'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUN'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUL'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_AUG'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_SEP'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_OCT'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_NOV'] ?>",
	"<?= $lang_resource['CONTROL_PANEL_STATISTICS_LONG_DEC'] ?>"]
};
Date.prototype.format = function (a, b) {
    return dateFormat(this, a, b)
};
