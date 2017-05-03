var HowBox = {
    Init: function (b, f, d) {
        HowBox.ImagesLoaded = new Array();
        HowBox.Images = f;
        HowBox.ImagesCount = f.length;
        HowBox.Loaded = 0;
        HowBox.Duration = d;
        b = document.getElementById(b);
        var c = document.createElement("img");
        c.setAttribute("id", "howboximage");
        c.setAttribute("style", "display:none;");
        if(b !== null) {
          b.appendChild(c);          
        }
        var a = document.createElement("div");
        a.setAttribute("class", "forward hand");
        a.innerHTML = '<div class="arrow"></div>';
        $(a).css({
            opacity: 0
        }).hover(function () {
            $(this).fadeTo(150, 1)
        }, function () {
            $(this).fadeTo(250, 0)
        });
        if(b !== null) {
          b.appendChild(a);          
        }
        a.onclick = HowBox.NextImage;
        var e = document.createElement("div");
        e.setAttribute("class", "back hand");
        e.innerHTML = '<div class="arrow"></div>';
        e.onclick = HowBox.PreviousImage;
        $(e).css({
            opacity: 0
        }).hover(function () {
            $(this).fadeTo(150, 1)
        }, function () {
            $(this).fadeTo(250, 0)
        });
        if(b !== null) {
          b.appendChild(e);          
        }
        HowBox.ImageIndex = 0;
        HowBox.AutoRotate()
    },
    AutoRotate: function () {
        HowBox.TimeInterval = null;
        $(new Image()).attr("src", HowBox.Images[HowBox.ImageIndex]).one("load", function () {
            if (!HowBox.TimeInterval) {
                $("#howboximage").fadeOut("fast", function () {
                    $(this).attr("src", HowBox.Images[HowBox.ImageIndex]).fadeIn("fast");
                    if (HowBox.ImageIndex >= HowBox.ImagesCount - 1) {
                        HowBox.ImageIndex = 0
                    } else {
                        HowBox.ImageIndex++
                    }
                    HowBox.TimeInterval = setTimeout(HowBox.AutoRotate, parseInt(HowBox.Duration) * 1000)
                })
            }
        }).each(function () {
            if (Main.IsNavigator("Explorer", "9")) {
                if (this.complete) {
                    if (!HowBox.TimeInterval) {
                        $("#howboximage").fadeOut("fast", function () {
                            $(this).attr("src", HowBox.Images[HowBox.ImageIndex]).fadeIn("fast");
                            if (HowBox.ImageIndex >= HowBox.ImagesCount - 1) {
                                HowBox.ImageIndex = 0
                            } else {
                                HowBox.ImageIndex++
                            }
                            HowBox.TimeInterval = setTimeout(HowBox.AutoRotate, parseInt(HowBox.Duration) * 1000)
                        })
                    }
                }
            }
        })
    },
    ManualRotate: function (a) {
        clearInterval(HowBox.TimeInterval);
        HowBox.TimeInterval = null;
        $("#howboximage").fadeOut("fast", function () {
            $(this).attr("src", HowBox.Images[HowBox.ImageIndex]).one("load", function () {
                if (!HowBox.TimeInterval) {
                    $(this).attr("src", HowBox.Images[HowBox.ImageIndex]).fadeIn("fast");
                    if (a == 1) {
                        if (HowBox.ImageIndex >= HowBox.ImagesCount - 1) {
                            HowBox.ImageIndex = 0
                        } else {
                            HowBox.ImageIndex++
                        }
                    } else {
                        if (HowBox.ImageIndex <= 0) {
                            HowBox.ImageIndex = HowBox.ImagesCount - 1
                        } else {
                            HowBox.ImageIndex--
                        }
                    }
                    HowBox.TimeInterval = setTimeout(HowBox.AutoRotate, parseInt(HowBox.Duration) * 1000)
                }
            }).each(function () {
                if (Main.IsNavigator("Explorer", "9")) {
                    if (this.complete) {
                        if (!HowBox.TimeInterval) {
                            $(this).attr("src", HowBox.Images[HowBox.ImageIndex]).fadeIn("fast");
                            if (a == 1) {
                                if (HowBox.ImageIndex >= HowBox.ImagesCount - 1) {
                                    HowBox.ImageIndex = 0
                                } else {
                                    HowBox.ImageIndex++
                                }
                            } else {
                                if (HowBox.ImageIndex <= 0) {
                                    HowBox.ImageIndex = HowBox.ImagesCount - 1
                                } else {
                                    HowBox.ImageIndex--
                                }
                            }
                            HowBox.TimeInterval = setTimeout(HowBox.AutoRotate, parseInt(HowBox.Duration) * 1000)
                        }
                    }
                }
            })
        })
    },
    NextImage: function () {
        clearInterval(HowBox.TimeInterval);
        HowBox.ManualRotate(1)
    },
    PreviousImage: function () {
        clearInterval(HowBox.TimeInterval);
        HowBox.ManualRotate(0)
    }
};
