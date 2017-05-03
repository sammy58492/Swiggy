<?php
session_start();
require_once('../login/common.php');
require_authentication();
?>
var Visuals = {
    CreateMenuItem: function (c, a) {
        var b = "";
        b += '<div class="item hand" onclick="' + c + '">';
        b += '<span class="caption">' + a + "</span>";
        b += "</div>";
        return b
    },
    CreateSubMenuItem: function (c, a, d) {
        var b = new Object();
        b.link = c;
        b.caption = a;
        b.subs = d;
        return b
    },
    CreateSubMenu: function (e) {
        var a = '<div id="submenu" class="nonselectable hand">';
        var d = e.length;
        for (var c in e) {
            var f = 0;
            if (e[c].subs) {
                f = e[c].subs.length
            }
            if (c == d - 1) {
                a += '<div class="lastbox" onclick="Visuals.SubMenuItemClick(this,' + c + "," + f + "," + Main.Quote(e[c].link) + ')">'
            } else {
                a += '<div class="box" onclick="Visuals.SubMenuItemClick(this,' + c + "," + f + "," + Main.Quote(e[c].link) + ')">'
            }
            a += '<div class="img"></div>';
            a += '<span class="caption">' + e[c].caption + "</span>";
            a += '<div id="subs' + c + '" class="subs">';
            for (var b in e[c].subs) {
                a += '<div class="subbox" onclick="Visuals.SubMenuSubItemClick(event,' + Main.Quote(e[c].subs[b].link) + ')">';
                a += '<span class="subcaption">' + e[c].subs[b].caption + "</span>";
                a += "</div>"
            }
            a += "</div>";
            a += "</div>"
        }
        a += "</div>";
        return a
    },
    SubMenuItemClick: function (Obj, Item, SubsCount, OnComplete) {
        if (SubsCount > 0) {
            if ($(Obj).height() == 30) {
                $(Obj).animate({
                    height: 30 + (30 * SubsCount)
                }, 350);
                document.getElementById("subs" + Item).style.display = "block";
                if (OnComplete) {
                    eval(OnComplete)
                }
            } else {
                $(Obj).animate({
                    height: 30
                }, 350, function () {
                    document.getElementById("subs" + Item).style.display = "none"
                })
            }
        } else {
            if (OnComplete) {
                eval(OnComplete)
            }
        }
    },
    SubMenuSubItemClick: function (e, OnComplete) {
        var NormalStop = true;
        if (Main.IsNavigator("Explorer", 9)) {
            NormalStop = false
        }
        if (NormalStop) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true;
            e.returnValue = false
        } if (OnComplete) {
            eval(OnComplete)
        }
    },
    CreateBoxButton: function (c, e, d, a) {
        var b = "";
        b += '<div class="boxbutton nonselectable hand"  onclick="' + c + '">';
        b += '<div class="img ' + a + '"></div>';
        b += '<div class="caption1">' + e.toUpperCase() + "</div>";
        b += '<div class="caption2">' + d.toLowerCase() + "</div>";
        b += "</div>";
        return b
    },
    CreateSearchBox: function () {
        var a = "";
        a += '<div id="searchbox">';
        a += '<input id="search" type="text" placeholder="<?= $lang_resource['Filter_V2'] ?>"/>';
        a += "</div>";
        return a
    },
    CreateMainButton: function (a, c, d) {
        var b = "";
        if (d) {
            d = ' onclick="' + d + '"'
        }
        if (c == "ok") {
            b = ' id="mainbuttonok"';
            c = "disabled"
        } else {
            c = "enabled";
            b = ' id="mainbuttoncancel"';
            if (this.ForceMainButtonCancelEvent) {
                d = ' onclick="' + this.ForceMainButtonCancelEvent + '"';
                this.ForceMainButtonCancelEvent = null
            }
        }
        return '<div class="mainbutton hand"><div class="' + c + '"' + b + d + '><span class="caption nonselectable">' + a.toUpperCase() + "</span></div></div><br/>"
    },
    CreateTabButton: function (a, c, d, b) {
        if (d) {
            d = ' onclick="' + d + '"'
        }
        if (c == "active") {
            c = "active"
        } else {
            c = "inactive"
        }
        return '<div class="tab hand ' + c + '"' + d + ' id="' + b + '"><span class="caption">' + a.toUpperCase() + "</span></div>"
    },
    CreateZoneButton: function (a, c, b) {
        return '<div class="zonebutton hand" onclick="' + b + '"><span class="caption nonselectable">' + a + '</span><div class="charge">' + c + "</div></div>"
    },
    CreateZoneButton1: function (a, c, b) {
        return '<div class="zonebutton hand zonebuttonpressed" onclick="' + b + '"><span class="caption nonselectable">' + a + '</span><div class="charge" style="display:none;">' + c + "</div></div>"
    },
    CreateGreyButton: function (a, b) {
        return '<div class="greybutton hand nonselectable" onclick="' + b + '"><span class="caption">' + a + "</span></div>"
    }
};
