
document.write("<?php require_once('../lib/order-details.php'); ?>");
document.write("<?php require_once('../lib/panel-main.php'); ?>");

var Statistics = {
	Main: function(){
		Main.Loading(); 
		
		
			       
        $.post("lib/orders.php", "f=FetchAllOrdersData&business=t", function (c) {       
  			
            Main.Ready();
            if (c != "") {
                Statistics.Orders = JSON.parse(c);
                Statistics.PupulateStats()
            } else {
                alert("Error")
            }
        });

		
        var b ='<div class="row">'
        b +='<div class="top-bar">'
        b +='<div class=" col-md-6 col-md-offset-6">'
        b +='<div class=" pull-right">'
        b +='<button class="btn btn-default btn-rounded-lg close-btn  panel-btn-2" onclick="Statistics.Export()"><i class="fa icon-export" ></i> <?=$lang_resource['ADMIN_PAGE_USER_EXPORT']?></button>&nbsp;'
        b +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
        b +='</div>'
        <!--col-md-5-->
        b +='</div>'
        <!--top-bar-->
        b +='</div>'
        <!--row-->


        b +='<div class="the-box rounded">'
        b +='<div class="row">'
        b +='<div class="col-md-3">'
        b +='<div class="st-btn" style=" background:#6acba2;">'
        b +='<span class="pull-left st-icon"><img src="images/st-icon-1.png"></span>'
        <!--pull-left-->
        b +='<span class="pull-right st-amount" id="total_orders"><?=$total_orders?></span>'
        b +='<span class="pull-right st-text"><?=$lang_resource['ADMIN_PAGE_TOTAL_ORDERS']?></span>'
        b +='</div>'
        <!--st-btn-->
        b +='</div>'
        <!--col-md-3-->
        b +='<div class="col-md-3">'
        b +='<div class="st-btn" style="background:#0ec1e1;">'
        b +='<span class="pull-left st-icon"><img src="images/st-icon-2.png"></span>'
        <!--pull-left-->
        b +='<span class="pull-right st-amount" id="total_sales">'+Main.currency+' <?=GetDecimalPoint($total_price)?></span>'
        b +='<span class="pull-right st-text"><?=$lang_resource['ADMIN_PAGE_STATISTICS_TOTAL_SALES']?></span>'
        b +='</div>'
        <!--st-btn-->
        b +='</div>'
        <!--col-md-3-->
        b +='<div class="col-md-3">'
        b +='<div class="st-btn" style="background:#f3b100;">'
        b +='<span class="pull-left st-icon"><img src="images/st-icon-3.png"></span>'
        <!--pull-left-->
        b +='<span class="pull-right st-amount" id="total_comm_icon">'+Main.currency+' <?=GetDecimalPoint($comission)?></span>'
        b +='<span class="pull-right st-text"><?=$lang_resource['ADMIN_PAGE_STATISTICS_TOTAL_COMMISSION']?></span>'
        b +='</div>'
        <!--st-btn-->
        b +='</div>'
        <!--col-md-3-->
        b +='<div class="col-md-3">'
        b +='<div class="st-btn" style="background:#ff283d;">'
        b +='<span class="pull-left st-icon"><img src="images/st-icon-4.png"></span>'
        <!--pull-left-->
        b +='<span class="pull-right st-amount" id="total_trunover">'+Main.currency+' <?=GetDecimalPoint($total_trunover)?></span>'
        b +='<span class="pull-right st-text"><?=$lang_resource['ADMIN_PAGE_STATISTICS_TOTAL_TURNOVER']?></span>'
        b +='</div>'
        <!--st-btn-->
        b +='</div>'
        <!--col-md-3-->
        b +='</div>'
        <!--row-->
        b +='</div>'
        <!--the-box-->


        b +='<div class="the-box rounded">'
        b +='<h3 class="text-center" ><strong><?=$lang_resource['ADMIN_PAGE_STATISTICS_SALES']?></strong></h3>'
        b +='<hr style="margin-top:0px; margin-bottom:10px;">'
        b +='<div class="sales-chart-dv" id="graph"><img src="images/statistics-chart.png"></div>'
        <!--sales-chart-dv-->
        b +='<h3 class="text-center" ><strong><?=$lang_resource['CONTROL_PANEL_STATISTICS_TOP_10']?></strong></h3>'
        b +='<div class="top10-dv">'
        b +='<ol id="topten">'
        
        b +='</ol>'

        b +='</div>'
        <!--top10-dv-->
        b +='<div class="advance-statistics clearfix">'
        b +='<h5 class="pull-left"><?=$lang_resource['ADMIN_PAGE_STATISTICS_ADVANCE_STATISTICS']?></h5>'
        b +='<button class="btn btn-default btn-rounded-lg panel-red-btn pull-right" href="http://www.google.com/analytics/"><?=$lang_resource['ADMIN_PAGE_STATISTICS_GOTO']?></button>'
        b +='</div>'
        <!--advance-statistics-->
        b +='</div>'
        <!--the-box-->



        b +='<div class="tab-nav">'
        b +='<ul>'
        b +='<li class="hand"><a href="javascript: void(0)"  id="todayBt" class="active"><?=$lang_resource['ADMIN_PAGE_STATISTICS_TODAY']?></a></li>'
        b +='<li class="hand" ><a href="javascript: void(0)" id="weekBt" ><?=$lang_resource['ADMIN_PAGE_STATISTICS_WEEK']?></a></li>'
        b +='<li class="hand" ><a href="javascript: void(0)" id="monthBt"><?=$lang_resource['ADMIN_PAGE_STATISTICS_MONTH']?></a></li>'
        b +='<li class="hand" ><a href="javascript: void(0)" id="yearBt"><?=$lang_resource['ADMIN_PAGE_STATISTICS_YEAR']?></a></li>'
        b +='</ul>'
        b +='</div>'
        <!--tab-nav-->
        b +='<div class="tab-box" id="todayId">'
        b +='<table class="table table-th-block table-striped">'
        b +='<thead>'
        b +='<tr>'
        b +='<th width="90%"><?=$currentdate ?></th>'
        b +='<th>&nbsp;</th>'
        b +='</tr>'
        b +='</thead>'
        b +='<tbody>'
        b +='<tr>'
        b +='<td><?=$lang_resource['ADMIN_PAGE_STATISTICS_ORDERS_TODAY']?></td>'
        b +='<td align="right"><?=$total_orders_inday?></td>'
        b +='</tr>'
        b +='<tr>'
        b +='<td><?=$lang_resource['ADMIN_PAGE_STATISTICS_SALES']?></td>'
        b +='<td align="right">'+Main.currency+'<?=$today_price?></td>'
        b +='</tr>'
        b +='<tr>'
        b +='<td><?=$lang_resource['ORDER_PENDING_TAB']?></td>'
        b +='<td align="right"><?=$today_pending_order?></td>'
        b +='</tr>'
        b +='<tr>'
        b +='<td><?=$lang_resource['ORDER_COMPLETE_TAB']?></td>'
        b +='<td align="right"><?=$today_completed_order?></td>'
        b +='</tr>'
        b +='<tr>'
        b +='<td><?=$lang_resource['ORDER_CANCEL_TAB']?></td>'
        b +='<td align="right"><?=$today_cancelled_order?></td>'
        b +='</tr>'
        b +='</tbody>'
        b +='</table>'
        b +='</div>'
        <!--tab-box-->
         b +='<div class="tab-box"  id="weekId" style="display:none">'
       b +='<table class="table table-th-block table-striped">'
       b +='<thead>'
       b +='<tr>'
       b +='<th width="90%"><?=$lang_resource['ADMIN_PAGE_STATISTICS_LAST_DAYS']?></th>'
       b +='<th>&nbsp;</th>'
       b +='</tr>'
       b +='</thead>'
       b +='<tbody>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ADMIN_PAGE_TOTAL_ORDERS']?></strong></td>'
       b +='<td align="right"><?=$week_orders_inday?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ADMIN_PAGE_STATISTICS_SALES']?></strong></td>'
       b +='<td align="right">'+Main.currency+'<?=$week_price?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_PENDING_TAB']?></strong></td>'
       b +='<td align="right"><?=$week_pending_order?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_COMPLETE_TAB']?></strong></td>'
       b +='<td align="right"><?=$week_completed_order?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_CANCEL_TAB']?></strong></td>'
       b +='<td align="right"><?=$week_cancelled_order?></td>'
                       
       b +='</tr>'							
       b +='</tbody>'
       b +='</table>'
       b +='</div>'
       <!--tab-box--> 
        
      
      
       b +='<div class="tab-box" id="monthId" style="display:none">'
       b +='<table class="table table-th-block table-striped">'
       b +='<thead>'
       b +='<tr>'
       b +='<th width="90%"><?=$lang_resource['ADMIN_PAGE_STATISTICS_LAST_30_DAYS']?></th>'
       b +='<th>&nbsp;</th>'
       b +='</tr>'
       b +='</thead>'
       b +='<tbody>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ADMIN_PAGE_TOTAL_ORDERS']?></strong></td>'
       b +='<td align="right"><?=$month_orders_inday?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ADMIN_PAGE_STATISTICS_SALES']?></strong></td>'
       b +='<td align="right">'+Main.currency+'<?=$month_price?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_PENDING_TAB']?></strong></td>'
       b +='<td align="right"><?=$month_pending_order?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_COMPLETE_TAB']?></strong></td>'
       b +='<td align="right"><?=$month_completed_order?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_CANCEL_TAB']?></strong></td>'
       b +='<td align="right"><?=$month_cancelled_order?></td>'
                       
       b +='</tr>'							
       b +='</tbody>'
       b +='</table>'
       b +='</div>'
       <!--tab-box-->
       
       b +='<div class="tab-box" id="yearId" style="display:none">'
       b +='<table class="table table-th-block table-striped">'
       b +='<thead>'
       b +='<tr>'
       b +='<th width="90%"><?=$yearText?></th>'
       b +='<th>&nbsp;</th>'
       b +='</tr>'
       b +='</thead>'
       b +='<tbody>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ADMIN_PAGE_TOTAL_ORDERS']?></strong></td>'
       b +='<td align="right"><?=$year_orders_inday?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ADMIN_PAGE_STATISTICS_SALES']?></strong></td>'
       b +='<td align="right">'+Main.currency+'<?=$year_price?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_PENDING_TAB']?></strong></td>'
       b +='<td align="right"><?=$year_pending_order?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_COMPLETE_TAB']?></strong></td>'
       b +='<td align="right"><?=$year_completed_order?></td>'
                       
       b +='</tr>'
       b +='<tr>'
       b +='<td><strong><?=$lang_resource['ORDER_CANCEL_TAB']?></strong></td>'
       b +='<td align="right"><?=$year_cancelled_order?></td>'
                       
       b +='</tr>'							
       b +='</tbody>'
       b +='</table>'
       b +='</div>'
       <!--tab-box-->

        b +='<div class="row">'
        b +='<div class="col-md-12">'
        b +='</div>'
        b +='</div>'
        <!--row-->




        b += '<form id="exp_form" method="post" target="_blank" enctype="multipart/form-data" action="lib/export.php">';
        b += '<input type="hidden" name="f" value="ExportOrder"/>';
        b += '<input id="exp_data" type="hidden" name="data" value=""/>';
        b += '<input type="hidden" name="name" value="orders"/>';
        b += '</form>';

        document.getElementById("main").innerHTML = b;

        $( "#todayBt" ).click(function() {
		$( "#todayBt" ).addClass("active");
		$( "#weekBt" ).removeClass("active");
		$( "#monthBt" ).removeClass("active");
		$( "#yearBt" ).removeClass("active");

		$( "#todayId" ).show();
		$( "#weekId" ).hide();
		$( "#monthId" ).hide();
		$( "#yearId" ).hide();
	});

	$( "#weekBt" ).click(function() {
		$( "#todayBt" ).removeClass("active");
		$( "#weekBt" ).addClass("active");
		$( "#monthBt" ).removeClass("active");
		$( "#yearBt" ).removeClass("active");

		$( "#todayId" ).hide();
		$( "#weekId" ).show();
		$( "#monthId" ).hide();
		$( "#yearId" ).hide();


	});

	$( "#monthBt" ).click(function() {
		$( "#todayBt" ).removeClass("active");
		$( "#weekBt" ).removeClass("active");
		$( "#monthBt" ).addClass("active");
		$( "#yearBt" ).removeClass("active");

		$( "#todayId" ).hide();
		$( "#weekId" ).hide();
		$( "#monthId" ).show();
		$( "#yearId" ).hide();

	});

	$( "#yearBt" ).click(function() {
		$( "#todayBt" ).removeClass("active");
		$( "#weekBt" ).removeClass("active");
		$( "#monthBt" ).removeClass("active");
		$( "#yearBt" ).addClass("active");

		$( "#todayId" ).hide();
		$( "#weekId" ).hide();
		$( "#monthId" ).hide();
		$( "#yearId" ).show();

	});
	document.getElementById("leftcol").innerHTML = Visuals.CreateSearchBox();
        document.getElementById("search").onkeyup = function () {
            Statistics.PupulateStats()
        }
    },

    Export: function () {
        $.post("lib/orders.php", "f=FetchAllOrderId", function (b) {      
             b = JSON.parse(b);                 
             
             var a = new Object();
             a.ids = b;
             a.type = 0;
             document.getElementById("exp_data").value = JSON.stringify(a);
             document.getElementById("exp_form").submit()
         });
    },
    PupulateStats: function () {
        var p = false;
        var l = "";
        var j = new Array();
        
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
        console.log(JSON.stringify(Statistics.DaySells))
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
            n +='<li>'+b[g].name+' ('+ b[g].city +') <?= $lang_resource['ADMIN_MULTIDELIVERY_STATICS_WITH_REQUIRED'] ?> '+ b[g].sells +' <?= $lang_resource['CONTROL_PANEL_STATISTICS_SALES_TITLE'] ?></li>'
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
                    var d = f.datapoint[0].toFixed(IS_DECIMAL_POINT),
                        h = f.datapoint[1].toFixed(IS_DECIMAL_POINT);
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
