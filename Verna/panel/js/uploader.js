var Uploader = {
    IE: false,
    IEData: [{
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }],
    Whitelist: new Array("jpg", "png", "jpeg"),
    Init: function (a, p, o, c, j, n, m, b) {
        this.ActiveForm = p;
        this.UForm[this.ActiveForm] = document.getElementById(p);
        this.RandomName[this.ActiveForm] = c;
        this.CallBack[this.ActiveForm] = j;
        this.FileSelectCallBack[this.ActiveForm] = n;
        this.FilesToUpload[this.ActiveForm] = new Object();
        this.FilesUploading[this.ActiveForm] = null;
        this.FilesUploadingCount[this.ActiveForm] = null;
        this.FilesUploadingCompleteCount[this.ActiveForm] = null;
        this.Type[this.ActiveForm] = a;
        this.OnStartUpload[this.ActiveForm] = m;
        this.CanUpload[this.ActiveForm] = true;
        if (b) {
            this.ProgressSufix[this.ActiveForm] = b
        } else {
            this.ProgressSufix[this.ActiveForm] = ""
        }
        var g = "";
        var d;
        var l;
        var h = "'" + p + "'";
        for (var f = 0; f < this.UForm[this.ActiveForm].elements.length; f++) {
            if (this.UForm[this.ActiveForm].elements[f].type == "file") {
                l = document.createElement("div");
                l.setAttribute("class", "uploaderbox uploaderbox" + a);
                g = "background-image:" + this.UForm[this.ActiveForm].elements[f].style.backgroundImage;
                g = g.replace(/"/g, "'");
                l.innerHTML = '<div class="preview ' + a + '" id="' + p + "_upreview" + f + '" style="' + g + '"></div><input type="file" name="file[]" onchange="Uploader.FileSelected(this,' + f + "," + h + ');" class="fileinput hand"/>';
                this.UForm[this.ActiveForm].elements[f].parentNode.replaceChild(l, this.UForm[this.ActiveForm].elements[f])
            }
        }
        if (o) {
            document.getElementById(o).onclick = function () {
                Uploader.UploadFiles(p)
            }
        }
        if (this.SimpleIEDetection(this.IEData) == "Explorer") {
            this.IE = true;
            this.UForm[this.ActiveForm].target = "uploaderiframe";
            var e = document.createElement("iframe");
            e.setAttribute("style", "width:0;height:0;border:0px solid #fff;");
            e.setAttribute("frameborder", "0");
            e.name = "uploaderiframe";
            document.body.appendChild(e);
            if (this.RandomName[this.ActiveForm]) {
                var k = document.createElement("input");
                k.type = "hidden";
                k.name = "random";
                k.value = "true";
                this.UForm[this.ActiveForm].appendChild(k)
            }
        }
    },
    SimpleIEDetection: function (d) {
        for (var a = 0; a < d.length; a++) {
            var b = d[a].string;
            var c = d[a].prop;
            this.versionSearchString = d[a].versionSearch || d[a].identity;
            if (b) {
                if (b.indexOf(d[a].subString) != -1) {
                    return d[a].identity
                }
            } else {
                if (c) {
                    return d[a].identity
                }
            }
        }
    },
    FileSelected: function (a, d, f) {
        this.ActiveForm = f;
        if (this.Uploading[f]) {
            return
        }
        if (this.IE) {
            var c = a.value.split("\\");
            var i = c[c.length - 1];
            if (this.ValidExtension(i) == false) {
                var e = a.cloneNode(true);
                a.parentNode.replaceChild(e, a);
                alert("Invalid File Extension");
                return
            }
            document.getElementById(f + "_upreview" + d).setAttribute("style", "background-image:none;");
            document.getElementById(f + "_upreview" + d).innerHTML = '<div style="text-align:center;padding-top:46%;"><span style="font-size:12px;font-weight:bold;">' + i + "</span></div>";
            if (this.FileSelectCallBack[f]) {
                this.FileSelectCallBack[f](i, d)
            }
            return
        }
        var h = a.files[0];
        if (h) {
            if (this.ValidExtension(h.name)) {
                this.FilesToUpload[f][d] = a.files[0]
            } else {
                this.FilesToUpload[f][d] = null;
                delete this.FilesToUpload[f][d];
                alert("Invalid File Extension");
                return
            }
            var g = new FileReader();
            var b = this;
            g.onload = (function (j) {
                return function (k) {
                    document.getElementById(f + "_upreview" + d).innerHTML = '<img src="' + k.target.result + '" class="img ' + b.Type[f] + 'img"/>'
                }
            })(h);
            g.readAsDataURL(h);
            if (this.FileSelectCallBack[f]) {
                this.FileSelectCallBack[f](h.name, d)
            }
        }
    },
    ValidExtension: function (c) {
        var e = c.split(".");
        var a = e[0];
        var f = e[e.length - 1];
        var b = false;
        for (var d in this.Whitelist) {
            if (this.Whitelist[d] == f) {
                b = true
            }
        }
        return b
    },
    UploadFiles: function (f) {
        if (this.Uploading[f] || this.CanUpload[f] == false || Forms.CanSave(this.Type[f]) == false) {
            return
        }
        this.ActiveForm = f;
        this.Uploading[f] = true;
        if (this.IE) {
            var c = true;
            for (var d = 0; d < this.UForm[f].elements.length; d++) {
                if (this.UForm[f].elements[d].type == "file") {
                    if (this.UForm[f].elements[d].value != "") {
                        c = false
                    }
                }
            }
            if (c) {
                this.Uploading[f] = false;
                this.CallBack[f]('{"status": "no files selected"}');
                return
            }
            this.UForm[f].submit();
            if (this.OnStartUpload[f]) {
                this.OnStartUpload[f]()
            }
            this.CanUpload[f] = false;
            return
        }
        this.FilesUploading[f] = new Object();
        this.FilesUploadingCount[f] = 0;
        this.FilesUploadingCompleteCount[f] = 0;
        document.getElementById(this.ProgressSufix[f] + "progressbar").style.width = "2%";
        document.getElementById(this.ProgressSufix[f] + "progressbox").style.display = "block";
        var b = 0;
        for (var d in this.FilesToUpload[f]) {
            var a = this.FilesToUpload[f][d];
            if (a) {
                var e = new XMLHttpRequest();
                e.root = this;
                e.upload.root = this;
                e.upload.id = d;
                e.id = d;
                e.upload.addEventListener("loadstart", this.UploadStart, false);
                e.upload.addEventListener("progress", this.UploadProgress, false);
                e.addEventListener("load", this.UploadComplete, false);
                if (e.upload) {
                    e.open("POST", this.UForm[f].action, true);
                    e.setRequestHeader("FILENAME", a.name);
                    e.setRequestHeader("FILEID", d);
                    if (this.RandomName[f]) {
                        e.setRequestHeader("RANDOMNAME", "true")
                    }
                    e.send(a)
                }
                b++
            }
        }
        if (b == 0) {
            document.getElementById(this.ProgressSufix[f] + "progressbox").style.display = "none";
            this.Uploading[f] = false;
            this.CallBack[f]('{"status": "no files selected"}')
        } else {
            if (this.OnStartUpload[f]) {
                this.OnStartUpload[f]()
            }
            this.CanUpload[f] = false
        }
    },
    UploadStart: function (a) {
        this.root.FilesUploading[this.root.ActiveForm][this.id] = new Object();
        this.root.FilesUploading[this.root.ActiveForm][this.id].percentage = 0;
        this.root.FilesUploadingCount[this.root.ActiveForm]++
    },
    UploadProgress: function (d) {
        if (d.lengthComputable) {
            this.root.FilesUploading[this.root.ActiveForm][this.id].percentage = Math.round(d.loaded * 100 / d.total);
            var a = 0;
            for (var c in this.root.FilesUploading[this.root.ActiveForm]) {
                a += this.root.FilesUploading[this.root.ActiveForm][c].percentage
            }
            var b = a / this.root.FilesUploadingCount[this.root.ActiveForm];
            if (b > 2 && b < 100) {
                $("#" + this.root.ProgressSufix[this.root.ActiveForm] + "progressbar").animate({
                    width: b.toString() + "%"
                }, 250)
            }
        }
    },
    UploadComplete: function (c) {
        if (typeof (c) == "string") {
            this.Uploading[this.ActiveForm] = false;
            if (this.CallBack[this.ActiveForm]) {
                this.CallBack[this.ActiveForm](c)
            }
        } else {
            this.root.FilesUploadingCompleteCount[this.root.ActiveForm]++;
            this.root.FilesUploading[this.root.ActiveForm][this.id].response = c.target.responseText;
            if (this.root.FilesUploadingCompleteCount[this.root.ActiveForm] == this.root.FilesUploadingCount[this.root.ActiveForm]) {
                c = "[";
                var a = 0;
                for (var b in this.root.FilesUploading[this.root.ActiveForm]) {
                    if (a > 0) {
                        c += ","
                    }
                    c += this.root.FilesUploading[this.root.ActiveForm][b].response;
                    a++
                }
                c += "]";
                $("#" + this.root.ProgressSufix[this.root.ActiveForm] + "progressbar").animate({
                    width: "100%"
                }, 250);
                this.root.Uploading[this.root.ActiveForm] = false;
                this.root.CallBack[this.root.ActiveForm](c)
            }
        }
    },
    Clean: function () {
        this.UForm = null;
        this.RandomName = null;
        this.FilesToUpload = null;
        this.FilesUploading = null;
        this.FilesUploadingCount = null;
        this.FilesUploadingCompleteCount = null;
        this.CallBack = null;
        this.FileSelectCallBack = null;
        this.Uploading = null;
        this.OnStartUpload = null;
        this.ProgressSufix = null;
        this.Type = null;
        this.CanUpload = null
    },
    Activate: function () {
        this.UForm = new Object();
        this.RandomName = new Object();
        this.FilesToUpload = new Object();
        this.FilesUploading = new Object();
        this.FilesUploadingCount = new Object();
        this.FilesUploadingCompleteCount = new Object();
        this.CallBack = new Object();
        this.OnStartUpload = new Object();
        this.FileSelectCallBack = new Object();
        this.Uploading = new Object();
        this.ProgressSufix = new Object();
        this.Type = new Object();
        this.CanUpload = new Object()
    }
};
