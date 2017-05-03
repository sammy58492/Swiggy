var count=-1;
var Forms = {
    Form: new Object(),
    SubmitButton: null,
    CanSubmit: false,
    CreateValue: function (d, f, b, g, e, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var c = new Object();
        c.ivalue = Main.NullToEmpty(b);
        c.value = c.ivalue;
        c.obligatory = e;
        c.alwayssave = a;
        c.local = g;
        this.Form[d].fields[f] = c
    },
    UpdateValue: function (b, d, a, c) {
        this.Form[b].fields[d].value = a;
        if (c) {
            this.Form[b].fields[d].save = true
        } else {
            if (a != this.Form[b].fields[d].ivalue) {
                this.Form[b].fields[d].save = true
            } else {
                this.Form[b].fields[d].save = false
            }
        }
    },
	
    GetValue: function (a, b) {
        return this.Form[a].fields[b].value
    },
	
	
	 //tabsetting Start
	 
	 CreateCheckBoxPropertyTab1 : function (c, f, e, d, a) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var b = new Object();
        b.ivalue = e.toString();
        b.value = b.ivalue;
        b.obligatory = d;
        b.alwayssave = a;
        this.Form[c].fields[f] = b;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        } if (e) {
            e = "CHECKED"
        } else {
            e = ""
        }
        return d + '<input type="checkbox" id="' + f + '" class="checkbox tabcheck" onchange="Forms.CheckTextInput1(' + Main.Quote(c) + ',this);"' + e + "/>"
    },
		CreateCheckBoxPropertyTab: function (c, f, e, d, a) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var b = new Object();
        b.ivalue = e.toString();
        b.value = b.ivalue;
        b.obligatory = d;
        b.alwayssave = a;
        this.Form[c].fields[f] = b;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        } if (e) {
            e = "CHECKED"
        } else {
            e = ""
        }
        return d + '<input type="checkbox" id="' + f + '" class="checkbox tabcheck" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ',this);"' + e + "/>"
    },
	 //tabsetting end 
	CreateInputPropertyDate: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onchange="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },
CreateTextAreaPropertyD: function (d, f, g, c, i, h, b, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var e = new Object();
        if (a) {
            e.isHtml = true;
            g = unescape(decodeURI(g))
        }
        e.ivalue = Main.NullToEmpty(g);
        e.value = e.ivalue;
        e.obligatory = c;
        e.alwayssave = h;
        this.Form[d].fields[f] = e;
        if (c) {
            c = '<span class="obligatory nonselectable default">*</span>'
        } else {
            c = '<span class="nonobligatory nonselectable default">*</span>'
        }
        return c + '<textarea id="' + f + '" class="' + b + '" disabled="disabled" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
    },
	
CreateTextAreaPropertyCMS: function (d, f, g, c, i, h, b, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var e = new Object();
        if (a) {
            e.isHtml = true;
            g = unescape(decodeURI(g))
        }
        e.ivalue = Main.NullToEmpty(g);
        e.value = e.ivalue;
        e.obligatory = c;
        e.alwayssave = h;
        this.Form[d].fields[f] = e;
       
        return '<textarea id="' + f + '" name="' + f + '" class="' + b + ' ckeditor"  onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '" cols="80" rows="10" >' + e.value + "</textarea>"
    },	
	
	
	
CreateTextAreaPropertyIconf: function (d, f, g, c, i, h, b, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var e = new Object();
        if (a) {
            e.isHtml = true;
            g = unescape(decodeURI(g))
        }
        e.ivalue = Main.NullToEmpty(g);
        e.value = e.ivalue;
        e.obligatory = c;
        e.alwayssave = h;
        this.Form[d].fields[f] = e;
        if (c) {
            c = '<span class="obligatory nonselectable default">*</span>'
        } else {
            c = '<span class="nonobligatory nonselectable default">*</span>'
        }
        return c + '<textarea id="' + f + '" class="' + b + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '" style="width:195px; !important" >' + e.value + "</textarea>"
    },


    CreateTextAreaProperty: function (d, f, g, c, i, h, b, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var e = new Object();
        if (a) {
            e.isHtml = true;
            g = unescape(decodeURI(g))
        }
        e.ivalue = Main.NullToEmpty(g);
        e.value = e.ivalue;
        e.obligatory = c;
        e.alwayssave = h;
        this.Form[d].fields[f] = e;
        if (c) {
            c = '<span class="obligatory nonselectable default">*</span>'
        } else {
            c = '<span class="nonobligatory nonselectable default">*</span>'
        }
        return c + '<textarea id="' + f + '" class="' + b + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
    },
	CreateTextAreaPropertyGallery: function (d, f, g, c, i, h, b, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var e = new Object();
        if (a) {
            e.isHtml = true;
            g = unescape(decodeURI(g))
        }
        e.ivalue = Main.NullToEmpty(g);
        e.value = e.ivalue;
        e.obligatory = c;
        e.alwayssave = h;
        this.Form[d].fields[f] = e;
        if (c) {
            c = '<span class="obligatory nonselectable default">*</span>'
        } else {
            c = '<span class="nonobligatory nonselectable default">*</span>'
        }
        return c + '<textarea  style="width:196px !important;" id="' + f + '" class="' + b + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
    },
	
    CreateTextAreaProperty2: function (e, h, c, f, g, b, a) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var d = new Object();
        d.ivalue = Main.NullToEmpty(c);
        d.value = d.ivalue;
        d.obligatory = f;
        d.alwayssave = b;
        this.Form[e].fields[h] = d;
        return '<textarea id="' + h + '" class="' + a + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(g) + '">' + d.value + "</textarea>"
    },
	 CreateTextAreaProperty4: function (e, h, c, f, g, b, a) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var d = new Object();
        d.ivalue = Main.NullToEmpty(c);
        d.value = d.ivalue;
        d.obligatory = f;
        d.alwayssave = b;
        this.Form[e].fields[h] = d;
        return '<textarea id="' + h + '" class="' + a + '" style="margin-right: -60px;margin-top:-5px;width:290px; font-size:16px;line-height:34px;color:#81807D"  placeholder="Address or Zip Code" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(g) + '">' + d.value + "</textarea>"
    },
	CreateTextAreaProperty3: function (e, h, c, f, g, b, a) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var d = new Object();
        d.ivalue = Main.NullToEmpty(c);
        d.value = d.ivalue;
        d.obligatory = f;
        d.alwayssave = b;
        this.Form[e].fields[h] = d;
        return '<input type="text" class="hm_txtbx" placeholder="<?= $lang_resource['ADDRESS_V2'] ?>" id="' + h + '" class="' + a + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(g) + '" value="'+d.value+'">';
    },
	
	CreateTextAreaPropertyNew3: function (e, h, c, f, g, b, a) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var d = new Object();
        d.ivalue = Main.NullToEmpty(c);
        d.value = d.ivalue;
        d.obligatory = f;
        d.alwayssave = b;
        this.Form[e].fields[h] = d;
        return '<input type="text" class="field_text add-icon hand" placeholder="<?= $lang_resource['ADDRESS_V2'] ?>" id="' + h + '"  onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(g) + '" value="'+d.value+'">';
    },
    CreateInputProperty: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },
	
	
	CreateInputPropertyCustomSlug: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);Forms.CheckCustomSlug();" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },
	
	CheckCustomSlug: function()
	{
	var slug = document.getElementById("customslug").value;
	
	if (/^[a-z0-9-A-Z]*$/.test(slug) == false ) {
			//cnt ++;
  			alert("please do not enter any special characters or spaces on customslug field")
			document.getElementById("customslug").value = slug.substr(0,slug.length-1);
			
			return false
			
 		}
		
	},
	
	    CreateInputPropertyPopUp: function (e, g, h, d, j, i, c, b,k) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
		
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = true;
        this.Form[e].fields[g] = f;
        
        var a = "text";
        if (c) {
            a = "password"
        }
		if(i) {
			var lk= i;
			}
		else {
			lk ='';
			}	
        return '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="field_text_pop" placeholder="'+ lk +'"/>'
    },
	CreateInputProperty_p: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="off" style="width: 370px;" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" readonly="readonly"/>'
    },
	
	SelectInputProperty_p: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = b + '<select id="' + e + '" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	
    CreateInputProperty2: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        var a = "text";
        if (c) {
            a = "password"
        }
        return '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },
	CreateInputProperty3: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        var a = "text";
        return '<input type="' + a + '" id="' + g + '" autocomplete="off"  class="hm_txtbx" value="" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + i + b + '"/>'
    },
	 CreateInputPropertydisreadonly: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" readonly="readonly" />'
    },
    CreateCheckBoxProperty: function (c, f, e, d, a) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var b = new Object();
        b.ivalue = e.toString();
        b.value = b.ivalue;
        b.obligatory = d;
        b.alwayssave = a;
        this.Form[c].fields[f] = b;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default">*</span>'
        } if (e) {
            e = "CHECKED"
        } else {
            e = ""
        }
        return d + '<input type="checkbox" id="' + f + '" class="checkbox" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ',this);"' + e + "/>"
    },
    CreateSelectProperty: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = b + '<select id="' + e + '" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	CreateSelectPropertyPopup: function (c, e, g, f, b, k, j) {
		
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = '<select id="' + e + '" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '" class="field_text_pop">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	
	
		CreateSelectPropertyPopupMob: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = '<select id="' + e + '" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '" class="field_text_pop">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	
	 CreateSelectProperty7: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = b + '<select id="' + e + '" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '" style="width:87%">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
    CreateSelectPropertyC: function (c, e, g, f, b, k, j, a) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = b + '<select id="' + e + '" class="' + a + '" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	 CreateSelectPropertyCPopup: function (c, e, g, f, b, k, j, a) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = '<select id="' + e + '" class="' + a + ' field_text_pop" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
    CreateSelectProperty2: function (d, f, h, g, c, l, k, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var e = new Object();
        e.obligatory = c;
        e.ivalue = Main.NullToEmpty(g);
        e.value = e.ivalue;
        e.alwayssave = k;
        var j = '<select class="' + a + ' hm_txtbx" id="' + f + '" onchange="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(l) + '">';
        for (var b in h) {
            if (e.ivalue == h[b].id) {
                j += '<option value="' + h[b].id + '" SELECTED>' + h[b].caption + "</option>"
            } else {
                j += '<option value="' + h[b].id + '">' + h[b].caption + "</option>"
            }
        }
        this.Form[d].fields[f] = e;
        return j + "</select>"
    },
	 CreateSelectPropertyNew3: function (d, f, h, g, c, l, k, a) {
        if (this.Form[d].fields == null) {
            this.Form[d].fields = new Object()
        }
        var e = new Object();
        e.obligatory = c;
        e.ivalue = Main.NullToEmpty(g);
        e.value = e.ivalue;
        e.alwayssave = k;
        var j = '<select class="hand field_select" id="' + f + '" onchange="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(l) + '">';
        for (var b in h) {
            if (e.ivalue == h[b].id) {
                j += '<option value="' + h[b].id + '" SELECTED>' + h[b].caption + "</option>"
            } else {
                j += '<option value="' + h[b].id + '">' + h[b].caption + "</option>"
            }
        }
        this.Form[d].fields[f] = e;
        return j + "</select>"
    },
	
	 CreateSelectProperty1: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = b + '<select id="' + e + '" onchange="Forms.CheckTextInput1(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	
	CreateSelectProperty2: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default">*</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = b + '<select id="' + e + '" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	
	
	
	    CheckTextInput1: function (c, d) {
	
        var a = $(d).attr("id");
        var b = "";
        switch (d.type) {
        case "select-one":
            b = d.options[d.selectedIndex].value;
            break;
        case "checkbox":
            if (d.checked) {
                b = "true"
            } else {
                b = "false"
            }
            break;
        default:
            b = $.trim(d.value);
			
            break
        }
		set=1;
		
			
			if(a=="tab_delivery_country"){
			
				if($("#tab_delivery_country").prop('checked') == true){
					
					$('#tab_delivery_country').attr('checked', true); 
					$('#tab_delivery_city').attr('checked', true); 
					$('#tab_pickup_country').attr('checked', true); 
					$('#tab_pickup_city').attr('checked', true); 
					$('#tab_reservation_country').attr('checked', true); 
					$('#tab_reservation_city').attr('checked', true); 
					
					
				
				}else{
					$('#tab_delivery_country').attr('checked', false); 
					$('#tab_delivery_city').attr('checked', false); 
					$('#tab_pickup_country').attr('checked', false); 
					$('#tab_pickup_city').attr('checked', false); 
					$('#tab_reservation_country').attr('checked', false); 
					$('#tab_reservation_city').attr('checked', false);
					
					
					
				}
				Forms.UpdateValue("tabsettings", "tab_delivery_city",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_city",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_city",b);
				this.Form[c].fields["tab_delivery_city"].value = b;
				this.Form[c].fields["tab_pickup_country"].value = b;
				this.Form[c].fields["tab_pickup_city"].value = b;
				this.Form[c].fields["tab_reservation_country"].value = b;
				this.Form[c].fields["tab_reservation_city"].value = b;
			
			}else if(a=="tab_delivery_city"){
				
				if($("#tab_delivery_city").prop('checked') == true){
					$('#tab_delivery_country').attr('checked', true); 
					$('#tab_delivery_city').attr('checked', true); 
					$('#tab_pickup_country').attr('checked', true); 
					$('#tab_pickup_city').attr('checked', true); 
					$('#tab_reservation_country').attr('checked', true); 
					$('#tab_reservation_city').attr('checked', true); 
					
					
				
				}else{
					$('#tab_delivery_country').attr('checked', false); 
					$('#tab_delivery_city').attr('checked', false); 
					$('#tab_pickup_country').attr('checked', false); 
					$('#tab_pickup_city').attr('checked', false); 
					$('#tab_reservation_country').attr('checked', false); 
					$('#tab_reservation_city').attr('checked', false); 
					
				}
				Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_city",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_city",b);
				this.Form[c].fields["tab_delivery_country"].value = b;
				this.Form[c].fields["tab_pickup_country"].value = b;
				this.Form[c].fields["tab_pickup_city"].value = b;
				this.Form[c].fields["tab_reservation_country"].value = b;
				this.Form[c].fields["tab_reservation_city"].value = b;

			
			}else if(a=="tab_pickup_country"){
				if($("#tab_pickup_country").prop('checked') == true){
					$('#tab_delivery_country').attr('checked', true); 
					$('#tab_delivery_city').attr('checked', true); 
					$('#tab_pickup_country').attr('checked', true); 
					$('#tab_pickup_city').attr('checked', true); 
					$('#tab_reservation_country').attr('checked', true); 
					$('#tab_reservation_city').attr('checked', true); 
					
					
				
				}else{
					$('#tab_delivery_country').attr('checked', false); 
					$('#tab_delivery_city').attr('checked', false); 
					$('#tab_pickup_country').attr('checked', false); 
					$('#tab_pickup_city').attr('checked', false); 
					$('#tab_reservation_country').attr('checked', false); 
					$('#tab_reservation_city').attr('checked', false); 
					
				}
				Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
				Forms.UpdateValue("tabsettings", "tab_delivery_city",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_city",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_city",b);
				this.Form[c].fields["tab_delivery_country"].value = b;
				this.Form[c].fields["tab_delivery_city"].value = b;
				this.Form[c].fields["tab_pickup_city"].value = b;
				this.Form[c].fields["tab_reservation_country"].value = b;
				this.Form[c].fields["tab_reservation_city"].value = b;
			}else if(a=="tab_pickup_city"){
				if($("#tab_pickup_city").prop('checked') == true){
					$('#tab_delivery_country').attr('checked', true); 
					$('#tab_delivery_city').attr('checked', true); 
					$('#tab_pickup_country').attr('checked', true); 
					$('#tab_pickup_city').attr('checked', true); 
					$('#tab_reservation_country').attr('checked', true); 
					$('#tab_reservation_city').attr('checked', true); 
					
					
				
				}else{
					$('#tab_delivery_country').attr('checked', false); 
					$('#tab_delivery_city').attr('checked', false); 
					$('#tab_pickup_country').attr('checked', false); 
					$('#tab_pickup_city').attr('checked', false); 
					$('#tab_reservation_country').attr('checked', false); 
					$('#tab_reservation_city').attr('checked', false); 
					
				}
				
				Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
				Forms.UpdateValue("tabsettings", "tab_delivery_city",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_city",b);
				this.Form[c].fields["tab_delivery_country"].value = b;
				this.Form[c].fields["tab_delivery_city"].value = b;
				this.Form[c].fields["tab_pickup_country"].value = b;
				this.Form[c].fields["tab_reservation_country"].value = b;
				this.Form[c].fields["tab_reservation_city"].value = b;
			}else if(a=="tab_reservation_country"){
				if($("#tab_reservation_country").prop('checked') == true){
					$('#tab_delivery_country').attr('checked', true); 
					$('#tab_delivery_city').attr('checked', true); 
					$('#tab_pickup_country').attr('checked', true); 
					$('#tab_pickup_city').attr('checked', true); 
					$('#tab_reservation_country').attr('checked', true); 
					$('#tab_reservation_city').attr('checked', true); 
					
					
				
				}else{
					$('#tab_delivery_country').attr('checked', false); 
					$('#tab_delivery_city').attr('checked', false); 
					$('#tab_pickup_country').attr('checked', false); 
					$('#tab_pickup_city').attr('checked', false); 
					$('#tab_reservation_country').attr('checked', false); 
					$('#tab_reservation_city').attr('checked', false); 
					
				}
				
				Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
				Forms.UpdateValue("tabsettings", "tab_delivery_city",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_city",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_city",b);
				this.Form[c].fields["tab_delivery_country"].value = b;
				this.Form[c].fields["tab_delivery_city"].value = b;
				this.Form[c].fields["tab_pickup_country"].value = b;
				this.Form[c].fields["tab_pickup_city"].value = b;
				this.Form[c].fields["tab_reservation_city"].value = b;
			}else if(a=="tab_reservation_city"){
				if($("#tab_reservation_city").prop('checked') == true){
					$('#tab_delivery_country').attr('checked', true); 
					$('#tab_delivery_city').attr('checked', true); 
					$('#tab_pickup_country').attr('checked', true); 
					$('#tab_pickup_city').attr('checked', true); 
					$('#tab_reservation_country').attr('checked', true); 
					$('#tab_reservation_city').attr('checked', true); 
					
					
				
				}else{
					$('#tab_delivery_country').attr('checked', false); 
					$('#tab_delivery_city').attr('checked', false); 
					$('#tab_pickup_country').attr('checked', false); 
					$('#tab_pickup_city').attr('checked', false); 
					$('#tab_reservation_country').attr('checked', false); 
					$('#tab_reservation_city').attr('checked', false); 
					
				}
				
					Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
				Forms.UpdateValue("tabsettings", "tab_delivery_city",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
				Forms.UpdateValue("tabsettings", "tab_pickup_city",b);
				Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
				this.Form[c].fields["tab_delivery_country"].value = b;
				this.Form[c].fields["tab_delivery_city"].value = b;
				this.Form[c].fields["tab_pickup_country"].value = b;
				this.Form[c].fields["tab_pickup_city"].value = b;
				this.Form[c].fields["tab_reservation_country"].value = b;
			}
	
	
	if(a=="country"){
		
		if(($("#tab_delivery_country").prop('checked') == false) ) {
					
					if((this.Form[c].fields["city"].value=="-1") ||(d.value=="-1")){
							alert('<?= $lang_resource['COUNTRY_CITY_TABVALIDATION'] ?>'); 
							set=0;
						}
				}
	}else if(a=="city"){
		
		if(($("#tab_delivery_country").prop('checked') == false) ) {
					
					if((this.Form[c].fields["country"].value=="-1") ||(d.value=="-1")){
							alert('<?= $lang_resource['COUNTRY_CITY_TABVALIDATION'] ?>'); 
							set=0;
						}
				}
	}else{
			if(($("#tab_delivery_country").prop('checked') == false) ) {
					
					if((this.Form[c].fields["country"].value=="-1") ||(this.Form[c].fields["city"].value=="-1")){
							alert('<?= $lang_resource['COUNTRY_CITY_TABVALIDATION'] ?>'); 
							set=0;
						}
				}
	}
	if(($("#tab_delivery").prop('checked') == true) && ($("#tab_delivery_address").prop('checked') == false)&&($("#tab_delivery_option").prop('checked') == false)&&($("#tab_delivery_neighborhood").prop('checked') == false) ) {
			alert('<?= $lang_resource['ADDRESS_OPTIONAL_TAB_VALIDATION'] ?>'); 
			set=0;
						
		}

		
		if(a=="tab_delivery"){
			if((b=="false") && (this.Form[c].fields["tab_pickup"].value=="false") && (this.Form[c].fields["tab_reservation"].value=="false") ){
				set=0;
				alert('<?= $lang_resource['DELIVERY_PICKUP_RESERVATION_VALID1'] ?>');
			}
		}else if(a=="tab_pickup"){
			if((b=="false") && (this.Form[c].fields["tab_delivery"].value=="false") && (this.Form[c].fields["tab_reservation"].value=="false") ){
				set=0;
				alert('<?= $lang_resource['DELIVERY_PICKUP_RESERVATION_VALID1'] ?>');
			}
		}else if(a=="tab_reservation"){
			
			if((b=="false") && (this.Form[c].fields["tab_pickup"].value=="false") && (this.Form[c].fields["tab_delivery"].value=="false") ){
				set=0;
				alert('<?= $lang_resource['DELIVERY_PICKUP_RESERVATION_VALID1'] ?>');
			}
		
			
		}else{
			if((this.Form[c].fields["tab_reservation"].value=="false") && (this.Form[c].fields["tab_pickup"].value=="false") && (this.Form[c].fields["tab_delivery"].value=="false") ){
				set=0;
				alert('<?= $lang_resource['DELIVERY_PICKUP_RESERVATION_VALID1'] ?>');
			}
		}
		

        if ((this.Form[c].fields[a].ivalue != b) && (set==1)){
            if (this.Form[c].fields[a].obligatory) {
                if (b.length == 0) {
                    this.Form[c].fields[a].save = false
                } else {
                    this.Form[c].fields[a].save = true
                }
            } else {
                this.Form[c].fields[a].save = true
				
				
            }
        } else {
		
			
			
             this.Form[c].fields[a].save = false
				
        }
	 
        this.Form[c].fields[a].value = b;
		Forms.TabsetValid=set;
		
        if (this.CanSave(c)&& (set==1)) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
    CheckTextInput: function (c, d) {
		
        var a = $(d).attr("id");
        var b = "";
        switch (d.type) {
        case "select-one":
            b = d.options[d.selectedIndex].value;
            break;
        case "checkbox":
            if (d.checked) {
                b = "true"
            } else {
                b = "false"
            }
            break;
        default:
            b = $.trim(d.value);
			
            break
        }
	
        if (this.Form[c].fields[a].ivalue != b) {
            if (this.Form[c].fields[a].obligatory) {
                if (b.length == 0) {
                    this.Form[c].fields[a].save = false
                } else {
                    this.Form[c].fields[a].save = true
                }
            } else {
                this.Form[c].fields[a].save = true
            }
        } else {
            this.Form[c].fields[a].save = false
        }
        this.Form[c].fields[a].value = b;
        if (this.CanSave(c)) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
	CheckTextInputCMS: function (c, d) {
		
        var a = $(d).attr("id");
        var b = "";
        c= "off";
       b =  CKEDITOR.instances.pagecontent.getData();
		
		
        if (this.Form[c].fields[a].ivalue != b) {
            if (this.Form[c].fields[a].obligatory) {
                if (b.length == 0) {
                    this.Form[c].fields[a].save = false
                } else {
                    this.Form[c].fields[a].save = true
                }
            } else {
                this.Form[c].fields[a].save = true
            }
        } else {
            this.Form[c].fields[a].save = false
        }
        this.Form[c].fields[a].value = b;
        if (this.CanSave(c)) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
	CreateInputProperty23: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        var a = "hidden";
      
        return '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },
    EnableSubmitButton: function (a) {
		// alert(a);
		// alert(this.SubmitButton);
        var b = document.getElementById(this.SubmitButton);
        if (a) {
            if (this.SubmitButton == "mainbuttonok") {
                this.CanSubmit = true;
                $(b).removeClass("disabled");
                $(b).removeClass("default");
                $(b).addClass("enabled")
            } else {
                Popup.EnableSubmitButton(true)
            }
        } else {
            if (this.SubmitButton == "mainbuttonok") {
                this.CanSubmit = false;
                $(b).removeClass("enabled");
                $(b).addClass("disabled");
                $(b).addClass("default")
            } else {
                Popup.EnableSubmitButton(false)
            }
        }
    },
    CanSave: function (a) {
        if (this.Busy) {
            return false
        }
        var c = 0;
        if (this.Form[a]) {
            for (var b in this.Form[a].fields) {
                if (this.Form[a].fields[b].save == true) {
                    c++
                }
                if (this.Form[a].fields[b].obligatory == true && this.Form[a].fields[b].value.length == 0) {
                    return false
                }
            }
        }
		// alert(c);		
	
        if (c > 0) {
            return true
        } else {
            return false
        }
    },
    PrepareForSaving: function (a) {
        for (var b in this.Form[a].fields) {
            this.Form[a].fields[b].value = Main.Sanitize(this.Form[a].fields[b].value, this.Form[a].fields[b].isHtml);
            if (this.Form[a].fields[b].local == true) {
                delete this.Form[a].fields[b]
            } else {
                if (this.Form[a].fields[b].save != true && this.Form[a].fields[b].alwayssave != true) {
                    this.Form[a].fields[b].value = "null"
                }
                delete this.Form[a].fields[b].save;
                delete this.Form[a].fields[b].ivalue;
                delete this.Form[a].fields[b].obligatory;
                delete this.Form[a].fields[b].local;
                delete this.Form[a].fields[b].alwayssave
            }
        }
        this.Freeze(a)
    },
    Freeze: function (b) {
        var a;
        for (var c in this.Form[b].fields) {
            a = document.getElementById(c);
            if (a != null) {
                a.disabled = true
            }
        }
    },
    Clean: function (a, b) {
        this.Form[a] = new Object();
        this.SubmitButton = b
    },
	
	
	<!--Mercury Payment Method-->
	
	    CreateInputPropertyMercury: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = ''
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },
	
	<!--Mercury Payment Method-->
	
	
	
	
	/***********************************************************add product option***************************************************************************************/
	
	
	 CreateCheckBoxPropertyChoiceext: function (c, f, e, d, a,j,k,m,n,p,rp,opid,setid) {
		
		
		e = false;
		
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
		if (this.Form[m] == null) {
            this.Form[m] = new Object()
        }
		if(p) {
			
			var arr_opption = p.split(","); 
			
			
		
				/*if(arr_opption.indexOf(opid)!= -1)
				{	
				
				e = true	
				}*/
			var arr_opption = p.split(","); 
			
			if(ProductOption.in_array(opid,arr_opption)) {
				e = true	
			}
			
				/*if(arr_opption.indexOf(f)!= -1)
				{
					
				e = true	
				}
				else if(arr_opption.indexOf(f+"(Whole)")!= -1)
				{
					
				e = true	
				}
				else if(arr_opption.indexOf(f+"(Left)")!= -1)
				{
					
				e = true	
				}
				else if(arr_opption.indexOf(f+"(Right)")!= -1)
				{
					
				e = true	
				}*/
				
			
			
			}
		  this.Form[m].mini = k;
		  this.Form[m].maxi = j;
		  this.Form[m].counti = "0";
		  this.Form[m].name = m;
		  this.Form[m].text = n;
        var b = new Object();
        b.ivalue = e.toString();
        b.value = b.ivalue;
        b.obligatory = d;
      //  b.alwayssave = a;
		b.id = opid;
		b.name = m;
		
	
		/*b.mini = k;
		b.maxi = j;
		b.counti = a;*/
		var fr = f + opid;
		//alert(fr)
        this.Form[c].fields[f] = b;
        if (d) {
            d = '<span class="obligatory nonselectable default" style="display:none;"></span>'
        } else {
            d = '<span class="nonobligatory nonselectable default" style="display:none;"></span>'
        } if (e) {
            e = "CHECKED"
        } else {
            e = ""
        }
        return d + '<input type="checkbox" style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" value="'+opid+'" id="' + f + '" min="'+rp+'" name="'+m+'"  max="'+setid+'" class="checkbox" onchange="Forms.CheckTextInputForProductoption(' + Main.Quote(c) + ',this);"' + e + "/>"
    },

	 CreateRadioPropertyChoice: function (c, e, g, f, b, k, j,m,n,rp,setid) {
	
	//alert(opid)
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
			

        }
		if (this.Form[m] == null) {
            this.Form[m] = new Object()
        }
		  this.Form[m].mini = k;
		  this.Form[m].maxi = j;
		  this.Form[m].counti = "0";
		  this.Form[m].name = m;
		  this.Form[m].text = n;
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = f;
	    d.id = f;
		d.name =m;
		d.save =false;
		if (b) {
            b = "checked"
        } else {
            b = ""
        }
		//alert(JSON.stringify())
       /* if (b) {
            b = '<span class="obligatory nonselectable default" style="Color:gray;margin-top:-12px;position:relative;left:100px;">(Required)</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }*/
       var h='<input style="float:left !important; width:auto !important; margin:0 5px 0 0 !important;" type="radio" id="' + e + '" value="'+f+'" name="'+g+'" alt="'+m+'"  min="'+rp+'" max="'+setid+'" '+b+' onClick="Forms.CheckTextInputForProductoption(' + Main.Quote(c) + ",this);" + ""  + '">';
        this.Form[c].fields[g] = d;
        return h;
    },
    CreateSelectPropertyChoice: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
        d.alwayssave = j;
        if (b) {
            b = '<span class="obligatory nonselectable default" style="Color:gray;margin-top:-12px;position:relative;left:100px;">(Required)</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }
        var h = b + '<select id="' + e + '" onchange="Forms.CheckTextInputForProductoption(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	CreateSelectPropertyChoiceext: function (c, e, g, f, b, k, j) {
        if (this.Form[c].fields == null) {
            this.Form[c].fields = new Object()
        }
		
		if (this.Form[e] == null) {
            this.Form[e] = new Object()
			
			  
        }
        var d = new Object();
        d.obligatory = b;
        d.ivalue = Main.NullToEmpty(f);
        d.value = d.ivalue;
		d.name = e;
        d.alwayssave = j;
		
		      /*this.Form[e].mini = 1;
			  this.Form[e].maxi = 1;
			  this.Form[e].counti = "0";
			  this.Form[e].name = e;
			  this.Form[e].text = "Pizza ingredient";*/
		  
		  
/*        if (b) {
            b = '<span class="obligatory nonselectable default" style="Color:gray;margin-top:-12px;position:relative;left:100px;">(Required)</span>'
        } else {
            b = '<span class="nonobligatory nonselectable default">*</span>'
        }*/
        var h = b + '<select id="' + e + '" onchange="Forms.CheckTextInputForProductoption(' + Main.Quote(c) + ",this,1);" + Main.NullToEmpty(k) + '">';
        for (var a in g) {
            if (d.ivalue == g[a].id) {
                h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
            } else {
                h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	
CreateInputPropertyChoiceset: function (e, g, h, d, j, i, c, b) {
	
	

        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default" style="float:left; width:130px;"></span>'
        } else {
            d = '<span class="nonobligatory nonselectable default" style="float:left; width:130px;"></span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        count++;

         if(g.indexOf('price')>-1){

             return d + '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="off" style="width:60px;float:left;" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"  /><span class="obligatory nonselectable default" style="float:left;">*</span>'
         }
        else

        return d + '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="off" style="width:60px;float:left;" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"  /><span class="obligatory nonselectable default" style="float:left;">*</span>'

    },
	CheckTextInputForIngredient: function (c, d) {
	    if(d.checked) {
			  Shopping.ingredientStore.push(d.value);
			   this.CanSave("extras_details")
	           this.EnableSubmitButton(true);
		 }
		 else {
			 var index = Shopping.ingredientStore.indexOf(d.value);
			 if (index > -1) {
			Shopping.ingredientStore.splice(index, 1);
					}
			 }
		
		   
	},
	 CheckTextInputForProductoption: function (c, d,kl) {

        var a = $(d).attr("id");
        var b = "";
        switch (d.type) {
        case "select-one":
		 b = d.options[d.selectedIndex].value;
		if(kl) {
            var fieldName = $(d).attr("id");
			
			this.Form[fieldName].counti = 1;
		}
            break;
        case "checkbox":
		
	 	var fieldName = $(d).attr("name");
		 var fieldid = $(d).attr("id");
		 var fieldvalue = $(d).attr("value");
		 var optionShowvalue = $(d).attr("min");
		
		  var optionShowvalue = $(d).attr("min");
		   var set_id = $(d).attr("max");
      //  document.getElementById(fieldName).innerHTML = optionShowvalue;

		//alert(JSON.stringify(this.Form[fieldName]))
		
            if (d.checked) {
				
					if(a == "extra_ingredients" || a == "acceptcard" || a == "twilioenabled" ) {
						
					 b = "true"
					}
				
				else {
						this.Form[fieldName].counti = parseInt(parseInt(this.Form[fieldName].counti)+1);
						if(this.Form[fieldName].counti<=this.Form[fieldName].maxi )
						{
							//this.Form["extras_details"].fields[fieldvalue].value = fieldvalue;
							b = "true"
							
							if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
			  // alert(optionShowvalue)
		  var idss=[{"id":''+optionShowvalue+'',"set_id":set_id}];
		  
           temps=JSON.stringify(idss);
		   Main.Loading(true)
		     $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
                            {
								  
								  // b=JSON.parse(b);
								   ProductOption.showcondition(b,fieldName)
									//alert(b)
								// document.getElementById(fieldName).innerHTML = b;
							
							 });	
		  
		   
		    }
		   else {
					  /* if(set_id != "X") {
						   alert("okay")
					   //document.getElementById(fieldName).innerHTML = "";
					   }	*/
			   }
		   
						}
						else {
						alert("You must be select minimum "+this.Form[fieldName].mini+" and maximun "+this.Form[fieldName].maxi)
						  b = "false"
						  //this.Form["extras_details"].fields[f].value = "";
						  this.Form[fieldName].counti = parseInt(parseInt(this.Form[fieldName].counti)-1);
						  document.getElementById(fieldid).checked =  false;
						
						}
				}
				
            } else {
				if(a == "extra_ingredients" || a == "acceptcard" || a == "twilioenabled" ) {
					 b = "false"
					} else {
                b = "false"
				//this.Form["extras_details"].fields[f].value = "";
							this.Form[fieldName].counti = parseInt(parseInt(this.Form[fieldName].counti)-1);
							if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
							document.getElementById(fieldName).innerHTML = "";
							}
					}
            }
			
			//alert(JSON.stringify(this.Form[fieldName]))
			break;
			
        
		  case "radio":
		    var fieldName = $(d).attr("alt");
			var fieldid = $(d).attr("id");
			this.Form[fieldName].counti =1
		    b = $.trim(d.value);
		    var aa = $(d).attr("name");
		    var optionShowvalue = $(d).attr("min");
		    var set_id = $(d).attr("max");
		     var sval = $(d).attr("value");
			// alert(sval)
		 //alert(optionShowvalue);
		   if(Main.NullToEmpty(optionShowvalue)!="" && optionShowvalue!= "null") {
			  // alert(optionShowvalue)
		  var idss=[{"id":''+optionShowvalue+'',"set_id":set_id}];
		  
           temps=JSON.stringify(idss);
		   Main.Loading(true)
		     $.post("panel/lib/front-bulk.php", 'data=[{"operation":"GetOptions","id":'+ temps +"}]", function (b)
                            {
								  
								  // b=JSON.parse(b);
								   ProductOption.showcondition(b,fieldName)
									//alert(b)
								// document.getElementById(fieldName).innerHTML = b;
							
							 });	
		  
		   
		    }
		   else {
					   if(set_id != "X") {
					   document.getElementById(fieldName).innerHTML = "";
					   }	
			   }
		   
			
		  this.Form[c].fields[aa].id = b;
            break;	
        default:
            b = $.trim(d.value);
			
            break
        }
		if(d.type == "radio") {
        if (this.Form[c].fields[aa].ivalue != b) {
            if (this.Form[c].fields[aa].obligatory) {
                if (b.length == 0) {
                    this.Form[c].fields[aa].save = true
                } else {
                    this.Form[c].fields[aa].save = true
                }
            } else {
                this.Form[c].fields[aa].save = true
            }
        } else {
            this.Form[c].fields[aa].save = true
        }
		
		/*
			alert("1")
			
			alert("we")*/
        this.Form[c].fields[aa].value = b;
		
		//alert(JSON.stringify(this.Form[c]))
		} else {
			if (this.Form[c].fields[a].ivalue != b) {
            if (this.Form[c].fields[a].obligatory) {
                if (b.length == 0) {
                    this.Form[c].fields[a].save = true
                } else {
                    this.Form[c].fields[a].save = true
                }
            } else {
                this.Form[c].fields[a].save = true
            }
        } else {
            this.Form[c].fields[a].save = true
        }
		
		 this.Form[c].fields[a].value = b;	
			
			}
			
        if (this.CanSave(c)) {
            this.EnableSubmitButton(true)
        } else {
            this.EnableSubmitButton(false)
        }
    },
	
	
	<!--Braintree Single Payment Method-->
	CreateSelectPropertyBraintree: function (d, f, h, g, c, l, k, a) {
			if (this.Form[d].fields == null) {
				this.Form[d].fields = new Object()
			}
			var e = new Object();
			e.obligatory = c;
			e.ivalue = Main.NullToEmpty(g);
			e.value = e.ivalue;
			e.alwayssave = k;
			var j = '<select class="' + a + ' hm_txtbx" id="' + f + '" onchange="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(l) + '">';
			for (var b in h) {
				if (e.ivalue == h[b].id) {
					j += '<option value="' + h[b].id + '" SELECTED>' + h[b].caption + "</option>"
				} else {
					j += '<option value="' + h[b].id + '">' + h[b].caption + "</option>"
				}
			}
			this.Form[d].fields[f] = e;
			return j + "</select>"
		},	
	
    CreateInputPropertyBraintree: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default">*</span>'
        } else {
            d = ''
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },
	
	<!--Braintree Single Payment Method-->
	
	/********************************AUTHORIZER PAYMENT GATEWAY**************************************/
	    CreateInputPropertyAp: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default" style="float: right; color: red;">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default" style="display:none;" >*</span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" style="float: right; width: 143px;" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },

	CreateSelectPropertyAp: function (c, e, g, f, b, k, j) {
			if (this.Form[c].fields == null) {
				this.Form[c].fields = new Object()
			}
			var d = new Object();
			d.obligatory = b;
			d.ivalue = Main.NullToEmpty(f);
			d.value = d.ivalue;
			d.alwayssave = j;
			if (b) {
				b = '<span class="obligatory nonselectable default" style="float: right; color: red;">*</span>'
			} else {
				b = '<span class="nonobligatory nonselectable default" style="display:none;" >*</span>'
			}
			var h = b + '<select id="' + e + '" style="float: right;" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
			for (var a in g) {
				if (d.ivalue == g[a].id) {
					h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + "</option>"
				} else {
					h += '<option value="' + g[a].id + '">' + g[a].caption + "</option>"
				}
			}
			this.Form[c].fields[e] = d;
			return h + "</select>"
		},	
	/********************************AUTHORIZER PAYMENT GATEWAY**************************************/

	/********************************CARD SAVE PAYMENT GATEWAY**************************************/
	    CreateInputPropertyCardSave: function (e, g, h, d, j, i, c, b) {
        if (this.Form[e].fields == null) {
            this.Form[e].fields = new Object()
        }
        var f = new Object();
        f.ivalue = Main.NullToEmpty(h);
        f.value = f.ivalue;
        f.obligatory = d;
        f.alwayssave = i;
        this.Form[e].fields[g] = f;
        if (d) {
            d = '<span class="obligatory nonselectable default" style="float: right; color: red;">*</span>'
        } else {
            d = '<span class="nonobligatory nonselectable default" style="display:none;" >*</span>'
        }
        var a = "text";
        if (c) {
            a = "password"
        }
        return d + '<input type="' + a + '" id="' + g + '" style="float: right; width: 143px;" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
    },

	/********************************CARD SAVE PAYMENT GATEWAY**************************************/
	
	
	
	
	
	
	
	
	
	
};
