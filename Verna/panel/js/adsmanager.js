var Ads = {
    Init: function (a, b) { 
        document.getElementById(a).innerHTML = '<div class="full" id="adfullcontainer"><img id="adfullimage"/></div><div class="splited hand" id="adsplited1container"><img id="adsplitedimage1"/></div><div class="splited hand" id="adsplited2container"><img id="adsplitedimage2"/></div>';
        document.getElementById("adfullcontainer").style.display = "none";
        document.getElementById("adsplited1container").style.display = "none";
        document.getElementById("adsplited2container").style.display = "none";
	//alert(a+" "+b);
        if (b) {
            Ads.CityId = b
        }
        Ads.LastId = -1;
        Ads.GetAd();
        clearTimeout(Ads.TimeOut);
        Ads.TimeOut = null;
	document.getElementById(a).style.display = "block";
    },
    GetAd: function () {
        if (Ads.CityId) {
            Vars = 'data=[{"operation":"FetchAdData","lastad":' + Ads.LastId + ',"cityid":' + Ads.CityId + "}]"
        } else {
            Vars = 'data=[{"operation":"FetchAdData","lastad":' + Ads.LastId + "}]"
        }
        $.post("panel/lib/front-bulk.php", Vars, function (a) {
            if (a != "" && a != "null") {
                Ad = JSON.parse(a).ad;
                if (Ad != null) {
                    if (Ad.type == "0") {
                        var b = $("#adfullimage");
                        b.one("load", function () {}).each(function () {
                            if (this.complete) {
                                if (Main.NullToEmpty(Ad.link) != "") {
                                    b.attr("onclick", "Ads.OpenLink(" + Ad.id + ",'" + Ad.link + "')");
                                    b.addClass("hand")
                                }
                                Ads.LastId = Ad.id;
                                document.getElementById("adfullcontainer").style.display = "block";
                                document.getElementById("adsplited1container").style.display = "none";
                                document.getElementById("adsplited2container").style.display = "none"
                            }
                        });
                        b.attr("src", "panel/images/ads/" + Ad.id + "/full.jpg?c=" + Main.Random)
                    } else {
                        var b = $("#adsplitedimage1");
                        b.one("load", function () {}).each(function () {
                            if (this.complete) {
                                if (Main.NullToEmpty(Ad.firstlink) != "") {
                                    b.attr("onclick", "Ads.OpenLink(" + Ad.firstid + ",'" + Ad.firstlink + "')");
                                    b.addClass("hand")
                                }
                                Ads.LastId = Ad.firstid;
                                document.getElementById("adfullcontainer").style.display = "none";
                                document.getElementById("adsplited1container").style.display = "block";
                                if (Ad.secondid) {
                                    var c = $("#adsplitedimage2");
                                    c.one("load", function () {}).each(function () {
                                        if (this.complete) {
                                            if (Main.NullToEmpty(Ad.secondlink) != "") {
                                                c.attr("onclick", "Ads.OpenLink(" + Ad.secondid + ",'" + Ad.secondlink + "')");
                                                c.addClass("hand")
                                            }
                                            document.getElementById("adsplited2container").style.display = "block"
                                        }
                                    });
                                    c.attr("src", "panel/images/ads/" + Ad.secondid + "/splited.jpg?c=" + Main.Random)
                                }
                            }
                        });
                        b.attr("src", "panel/images/ads/" + Ad.firstid + "/splited.jpg?c=" + Main.Random)
                    }
                    Ads.TimeOut = setTimeout(Ads.GetAd, parseInt(Ad.time) * 1000)
                } else {
                    Ads.TimeOut = setTimeout(Ads.GetAd, parseInt(60) * 1000)
                }
            } else {
                Ads.TimeOut = setTimeout(Ads.GetAd, parseInt(60) * 1000)
            }
        })
    },
    OpenLink: function (a, b) {
        if (b.indexOf("http://") == -1) {
            b = escape("http://" + b)
        }
        window.open("panel/lib/adredirector.php?id=" + a + "&url=" + b);
        Main.Ga("/adclicked/" + a, true);
        Main.Ga(Main.ActiveView)
    }
};
