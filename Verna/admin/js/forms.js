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
	/* New Design Admin */
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
				return '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onchange="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control datepicker rounded" data-date-format="mm-dd-yy" placeholder="<?= $lang_resource['PLACEHOLDER_DD_MM_YYY'] ?>" />'
			},	
			
	CreateTextAreaPropertyOrder: function (d, f, g, c, i, h, b, a) {
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
			
			return '<textarea id="' + f + '" class="' + b + '"  style="resize: none;" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
		},	
		
    CreateInputPropertyOrder: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" placeholder="<?= $lang_resource['PLACEHOLDER_SEARCH'] ?>" class="form-control rounded" />'
    },
    CreateInputPropertyAdmin: function (e, g, h, d, j, i, c, b,l) {
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
        return '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" onpaste="'+l+'" class="form-control rounded" />'
    },
	CreateInputPropertyAdminReadonly: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="' + a + '" id="' + g + '" readonly autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control rounded" />'
    },
	CreateInputPropertySettings: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control" />'
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

             return '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="false" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="return ProductOption.PreValidationOption3(event);"  class="form-control "   />'
         }
        else

        return '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="false"  onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="return ProductOption.PreValidationOption3(event);"  class="form-control "  />'

    },
	
	CreateInputPropertyChoicesetnone: function (e, g, h, d, j, i, c, b) {
	
	

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

             return '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="false" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="return ProductOption.PreValidationOption3(event);"  class="form-control "   />'
         }
        else

        return '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="false"  onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="return ProductOption.PreValidationOption3(event);"  class="form-control " style="display:none;"  />'

    },
	CreateInputPropertyChoicesetPrice : function (e, g, h, d, j, i, c, b) {
    
    

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

             return '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="false" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="return ProductOption.PreValidationOption4(event);"  class="form-control "   />'
         }
        else

        return '<input   type="' + a + '" id="' + g + '" value="' + f.value + '" autocomplete="false"  onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="return ProductOption.PreValidationOption4(event);"  class="form-control "  />'

    },	
		
    CreateCheckBoxPropertyAdmin: function (c, f, e, d, a,n) {
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
        return '<input type="checkbox" id="' + f + '" class="switch checkbox_2 hand" onclick="'+n+'" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ',this); '+n+'"' + e + "/>"
    },
	
	 CreateCheckBoxPropertyAdmin1: function (c, f, e, d, a,n) {
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
        return '<input type="checkbox" id="' + f + '" class="switch checkbox_21 hand" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ',this); '+n+'"' + e + "/>"
    },
		
		
    CreateSelectPropertyAdmin: function (c, e, g, f, b, k, j) {
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
        var h = '<select id="' + e + '" class="form-control rounded" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
	CreateSelectPropertyAdminReadonly: function (c, e, g, f, b, k, j) {
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
        var h = '<select id="' + e + '" class="form-control rounded" disabled="disabled" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
            b = '<span class="obligatory nonselectable default"> </span>'
        } else {
            b = '<span class="nonobligatory nonselectable default"> </span>'
        }
        var h = b + '<select id="' + e + '" class="form-control" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
	CreateSelectPropertyOrderDriver: function (c, e, g, f, b, k, j) {
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
        var h = '<select id="' + e + '" class="form-control rounded" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
		
        for (var a in g) {
			
            if (d.ivalue == g[a].id) {
				if(g[a].bringgpermission)
                h += '<option value="' + g[a].id + '" SELECTED style="color: #00FF00"  SELECTED>' + g[a].caption + ' <?=$lang_resource['BRINGG_APPROVED']?></option>';
				else 
				 h += '<option value="' + g[a].id + '" SELECTED>' + g[a].caption + " </option>"
				
            } else {
				if(g[a].bringgpermission)
                h += '<option value="' + g[a].id + '" style="color:#00FF00">' + g[a].caption + ' <?=$lang_resource['BRINGG_APPROVED']?></option>'
				else 
				 h += '<option value="' + g[a].id + '" >' + g[a].caption + " </option>"
            }
        }
        this.Form[c].fields[e] = d;
        return h + "</select>"
    },
	CreateSelectPropertyOrder: function (c, e, g, f, b, k, j) {
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
        var h = '<select id="' + e + '" class="form-control rounded" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
	CreateSelectPropertyAdminSettings: function (c, e, g, f, b, k, j) {
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
        var h = '<select id="' + e + '" class="form-control" onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
    CreateInputPropertyPopup: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="' + a + '" id="' + g + '" autocomplete="off" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control " />'
		
    },
	
	
	CreateInputPropertyPopupWithColor: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="' + a + '" id="' + g + '" value="' + f.value + '" class="form-control demo" />'
		
    },
	
    CreateInputPropertyDatePopup: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="' + a + '" id="' + g + '" requestservice value="' + f.value + '" onchange="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control datepicker " data-date-format="mm-dd-yy" placeholder="<?=$lang_resource['ADMIN_PAGE_FORM_MMDDYY']?>" />'
    },
    CreateInputPropertyPopupHidden: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="hidden" id="' + g + '" autocomplete="false"  value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control " />'
    },
    CreateInputPropertyPopupPlaceholder: function (e, g, h, d, j, i, c, b,n) {
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
        return '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control " placeholder="'+n+'" />'
    },
	CreateSelectPropertySettings: function (c, e, g, f, b, k, j) {
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
        var h ='<select id="' + e + '" class="form-control " 	onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
	
		CreateSelectPropertySettingsRequestCollection: function (c, e, g, f, b, k, j) {
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
        var h ='<select id="' + e + '" class="form-control " 	onchange="Requestcollection.changecity(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
        var h ='<select id="' + e + '" class="form-control " 	onchange="Forms.CheckTextInput(' + Main.Quote(c) + ",this);" + Main.NullToEmpty(k) + '">';
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
	 CreateInputPropertydisreadonlyPopupdis: function (e, g, h, d, j, i, c, b,k) {
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
        return '<input type="' + a + '" id="' + g + '" class="form-control" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" onblur="' + k + '"/>'
    },
    CreateInputPropertydisreadonlyPopup: function (e, g, h, d, j, i, c, b) {
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
        return '<input type="' + a + '" id="' + g + '" class="form-control" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" readonly="readonly" />'
    },
    CreateTextAreaPropertyPopup: function (d, f, g, c, i, h, b, a) {
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
        return '<textarea  id="' + f + '" class="' + b + ' form-control " onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
    },

	 CreateTextAreaPropertyPopupchat: function (d, f, g, c, i, h, b, a) {
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
        return '<textarea rows="15"  cols="50" id="' + f + '" class="' + b + ' form-control " onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
    },	
	CreateInputPropertyAdminCustomSlug: function (e, g, h, d, j, i, c, b) {
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
        return  '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);Forms.CheckCustomSlug();" + Main.NullToEmpty(j) + '" onkeypress="' + b + '" class="form-control rounded" />'
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

    CreateTextAreaPropertyGalleryPopup: function (d, f, g, c, i, h, b, a) {
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
        return  '<textarea  id="' + f + '" class="form-control" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
    },
    CreateTextAreaPropertyAdminReadonly: function (d, f, g, c, i, h, b, a) {
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
        return '<textarea id="' + f + '" class="form-control" readonly onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
    },
    CreateTextAreaPropertyAdmin: function (d, f, g, c, i, h, b, a,l) {
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
        if(l!=null)
        {
            return '<textarea id="' + f + '" class="form-control rounded" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
        }
        else
        {
            return '<textarea id="' + f + '" class="form-control" onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '">' + e.value + "</textarea>"
        }
        
    },

    CreateTextAreaPropertyCMS: function (d, f,f1, g, c, i, h, b, a,k) {
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
       
       
        return '<textarea id="' + f + '" name="' + f1 + '" class="' + b + ' ckeditor"  onkeyup="Forms.CheckTextInput(' + Main.Quote(d) + ",this);" + Main.NullToEmpty(i) + '" cols="80" rows="10" style="'+k+'"; >' + e.value + "</textarea>"
    },
		
	/* New Design Admin */
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
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
	
	
	CreateInputPropertyMap: function (e, g, h, d, j, i, c, b) {
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
		  
			return '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
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
        return d + '<input type="' + a + '" id="' + g + '" autocomplete="false" value="' + f.value + '" onkeyup="Forms.CheckTextInput(' + Main.Quote(e) + ",this);" + Main.NullToEmpty(j) + '" onkeypress="' + b + '"/>'
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
	
	
	//tabsetting Start
	 
	 CreateCheckBoxPropertyTab1 : function (c, f, e, d, a, b) {
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
            d = '<span class="obligatory nonselectable default"></span>'
        } else {
            d = '<span class="nonobligatory nonselectable default"></span>'
        } if (e) {
            e = "CHECKED"
        } else {
            e = ""
        }
        return '<input type="checkbox" id="' + f + '" class="switch checkbox_2 hand" onchange="Forms.CheckTextInput1(' + Main.Quote(c) + ',this);"' + e + "/>"
    },
     CreateCheckBoxPropertyTabBusinessType : function (c, f, e, d, a, b,s) {
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
            d = '<span class="obligatory nonselectable default"></span>'
        } else {
            d = '<span class="nonobligatory nonselectable default"></span>'
        } if (e) {
            e = "CHECKED"
        } else {
            e = ""
        }
        return '<input type="checkbox" id="' + f + '" class="switch checkbox_2 hand '+s+'" onchange="Forms.CheckTextInput1(' + Main.Quote(c) + ',this);"' + e + "/>"
    },

	 //tabsetting end 
	 CheckTextInput1: function (c, d) {
		var dd="false";
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
                document.getElementById("tab_delivery_country").checked = true;
                document.getElementById("tab_delivery_city").checked = true;
                document.getElementById("tab_pickup_country").checked = true;
                document.getElementById("tab_pickup_city").checked = true;
                document.getElementById("tab_reservation_country").checked = true;
                document.getElementById("tab_reservation_city").checked = true;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
            if($("#tab_delivery_country").prop('checked') == false){
                document.getElementById("tab_delivery_country").checked = false;
                document.getElementById("tab_pickup_country").checked = false;
                document.getElementById("tab_reservation_country").checked = false;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);                  
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);              
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);                    
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
            }
            
        }
        if(a=="tab_delivery_city"){
            if($("#tab_delivery_city").prop('checked') == false){
                document.getElementById("tab_delivery_country").checked = false;
                document.getElementById("tab_delivery_city").checked = false;
                document.getElementById("tab_pickup_country").checked = false;
                document.getElementById("tab_pickup_city").checked = false;
                document.getElementById("tab_reservation_country").checked = false;
                document.getElementById("tab_reservation_city").checked = false;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
            if($("#tab_delivery_city").prop('checked') == true){               
                document.getElementById("tab_delivery_city").checked = true;                
                document.getElementById("tab_pickup_city").checked = true;                
                document.getElementById("tab_reservation_city").checked = true;
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }            
        }
        if(a=="tab_delivery_neighborhood"){
            if($("#tab_delivery_neighborhood").prop('checked') == true){
                document.getElementById("tab_delivery_neighborhood").checked = true;
                document.getElementById("tab_delivery_address").checked = false;
            }else{
                document.getElementById("tab_delivery_neighborhood").checked = false;   
                document.getElementById("tab_delivery_address").checked = false;
            }
            Forms.UpdateValue("tabsettings", "tab_delivery_neighborhood",b);
            this.Form[c].fields["tab_delivery_neighborhood"].value = b;
            Forms.UpdateValue("tabsettings", "tab_delivery_address",dd);
            this.Form[c].fields["tab_delivery_address"].value = dd;
        }
        if(a=="tab_delivery_address"){
            if($("#tab_delivery_address").prop('checked') == true){
                document.getElementById("tab_delivery_address").checked = true;
                document.getElementById("tab_delivery_neighborhood").checked = false;
            }else{
                document.getElementById("tab_delivery_neighborhood").checked = false;   
                document.getElementById("tab_delivery_address").checked = false;
            }
            Forms.UpdateValue("tabsettings", "tab_delivery_address",b);
            this.Form[c].fields["tab_delivery_address"].value = b;
            Forms.UpdateValue("tabsettings", "tab_delivery_neighborhood",dd);
            this.Form[c].fields["tab_delivery_neighborhood"].value = dd;
        }



        if(a=="tab_pickup_country"){
            if($("#tab_pickup_country").prop('checked') == true){
                document.getElementById("tab_delivery_country").checked = true;
                document.getElementById("tab_delivery_city").checked = true;
                document.getElementById("tab_pickup_country").checked = true;
                document.getElementById("tab_pickup_city").checked = true;
                document.getElementById("tab_reservation_country").checked = true;
                document.getElementById("tab_reservation_city").checked = true;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
            if($("#tab_pickup_country").prop('checked') == false){
                document.getElementById("tab_delivery_country").checked = false;
                document.getElementById("tab_pickup_country").checked = false;
                document.getElementById("tab_reservation_country").checked = false;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
            }            
        }
        if(a=="tab_pickup_city"){
            if($("#tab_pickup_city").prop('checked') == false){
                document.getElementById("tab_delivery_country").checked = false;
                document.getElementById("tab_delivery_city").checked = false;
                document.getElementById("tab_pickup_country").checked = false;
                document.getElementById("tab_pickup_city").checked = false;
                document.getElementById("tab_reservation_country").checked = false;
                document.getElementById("tab_reservation_city").checked = false;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
            if($("#tab_pickup_city").prop('checked') == true){               
                document.getElementById("tab_delivery_city").checked = true;                
                document.getElementById("tab_pickup_city").checked = true;                
                document.getElementById("tab_reservation_city").checked = true;
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
        }

        if(a=="tab_reservation_country"){
            if($("#tab_reservation_country").prop('checked') == true){
                document.getElementById("tab_delivery_country").checked = true;
                document.getElementById("tab_delivery_city").checked = true;
                document.getElementById("tab_pickup_country").checked = true;
                document.getElementById("tab_pickup_city").checked = true;
                document.getElementById("tab_reservation_country").checked = true;
                document.getElementById("tab_reservation_city").checked = true;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
            if($("#tab_reservation_country").prop('checked') == false){
                document.getElementById("tab_delivery_country").checked = false;
                document.getElementById("tab_pickup_country").checked = false;
                document.getElementById("tab_reservation_country").checked = false;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
            }            
        }
        if(a=="tab_reservation_city"){
            if($("#tab_reservation_city").prop('checked') == false){
                document.getElementById("tab_delivery_country").checked = false;
                document.getElementById("tab_delivery_city").checked = false;
                document.getElementById("tab_pickup_country").checked = false;
                document.getElementById("tab_pickup_city").checked = false;
                document.getElementById("tab_reservation_country").checked = false;
                document.getElementById("tab_reservation_city").checked = false;
                Forms.UpdateValue("tabsettings", "tab_delivery_country",b);
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_country",b);
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_country",b);
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_country"].value = b;
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_country"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_country"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
            if($("#tab_reservation_city").prop('checked') == true){               
                document.getElementById("tab_delivery_city").checked = true;                
                document.getElementById("tab_pickup_city").checked = true;                
                document.getElementById("tab_reservation_city").checked = true;
                Forms.UpdateValue("tabsettings", "tab_delivery_city",b);    
                Forms.UpdateValue("tabsettings", "tab_pickup_city",b);    
                Forms.UpdateValue("tabsettings", "tab_reservation_city",b);       
                this.Form[c].fields["tab_delivery_city"].value = b;
                this.Form[c].fields["tab_pickup_city"].value = b;
                this.Form[c].fields["tab_reservation_city"].value = b;
            }
        }











			/*
			if(a=="tab_delivery_country"){

			
				if($("#tab_delivery_country").prop('checked') == true){
					
					document.getElementById("tab_delivery_country").checked = true;
					document.getElementById("tab_delivery_city").checked = true;
					document.getElementById("tab_pickup_country").checked = true;
					document.getElementById("tab_pickup_city").checked = true;
					document.getElementById("tab_reservation_country").checked = true;
					document.getElementById("tab_reservation_city").checked = true;				
					
					
				
				}else{
					document.getElementById("tab_delivery_country").checked = false;
					document.getElementById("tab_delivery_city").checked = false;
					document.getElementById("tab_pickup_country").checked = false;
					document.getElementById("tab_pickup_city").checked = false;
					document.getElementById("tab_reservation_country").checked = false;
					document.getElementById("tab_reservation_city").checked = false;
					
					
					
					
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
					document.getElementById("tab_delivery_country").checked = true;
					document.getElementById("tab_delivery_city").checked = true;
					document.getElementById("tab_pickup_country").checked = true;
					document.getElementById("tab_pickup_city").checked = true;
					document.getElementById("tab_reservation_country").checked = true;
					document.getElementById("tab_reservation_city").checked = true;	
					
					
				
				}else{
					document.getElementById("tab_delivery_country").checked = false;
					document.getElementById("tab_delivery_city").checked = false;
					document.getElementById("tab_pickup_country").checked = false;
					document.getElementById("tab_pickup_city").checked = false;
					document.getElementById("tab_reservation_country").checked = false;
					document.getElementById("tab_reservation_city").checked = false;
					
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

			
			}
			
			else if(a=="tab_delivery_neighborhood"){
				if($("#tab_delivery_neighborhood").prop('checked') == true){
				document.getElementById("tab_delivery_neighborhood").checked = true;
				document.getElementById("tab_delivery_address").checked = false;
				}else{
				document.getElementById("tab_delivery_neighborhood").checked = false;	
				document.getElementById("tab_delivery_address").checked = false;
				}
				Forms.UpdateValue("tabsettings", "tab_delivery_neighborhood",b);
				this.Form[c].fields["tab_delivery_neighborhood"].value = b;
				Forms.UpdateValue("tabsettings", "tab_delivery_address",dd);
				this.Form[c].fields["tab_delivery_address"].value = dd;
				
				
			}
			else if(a=="tab_delivery_address"){
				if($("#tab_delivery_address").prop('checked') == true){
				document.getElementById("tab_delivery_address").checked = true;
				document.getElementById("tab_delivery_neighborhood").checked = false;
				
				
				
				}else{
				document.getElementById("tab_delivery_neighborhood").checked = false;	
				document.getElementById("tab_delivery_address").checked = false;
				}
				Forms.UpdateValue("tabsettings", "tab_delivery_address",b);
				this.Form[c].fields["tab_delivery_address"].value = b;
				Forms.UpdateValue("tabsettings", "tab_delivery_neighborhood",dd);
				this.Form[c].fields["tab_delivery_neighborhood"].value = dd;
				
			}
			
			
			else if(a=="tab_pickup_country"){
				if($("#tab_pickup_country").prop('checked') == true){
					document.getElementById("tab_delivery_country").checked = true;
					document.getElementById("tab_delivery_city").checked = true;
					document.getElementById("tab_pickup_country").checked = true;
					document.getElementById("tab_pickup_city").checked = true;
					document.getElementById("tab_reservation_country").checked = true;
					document.getElementById("tab_reservation_city").checked = true;	
					
					
				
				}else{
					document.getElementById("tab_delivery_country").checked = false;
					document.getElementById("tab_delivery_city").checked = false;
					document.getElementById("tab_pickup_country").checked = false;
					document.getElementById("tab_pickup_city").checked = false;
					document.getElementById("tab_reservation_country").checked = false;
					document.getElementById("tab_reservation_city").checked = false;
					
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
					document.getElementById("tab_delivery_country").checked = true;
					document.getElementById("tab_delivery_city").checked = true;
					document.getElementById("tab_pickup_country").checked = true;
					document.getElementById("tab_pickup_city").checked = true;
					document.getElementById("tab_reservation_country").checked = true;
					document.getElementById("tab_reservation_city").checked = true;	
					
					
				
				}else{
					document.getElementById("tab_delivery_country").checked = false;
					document.getElementById("tab_delivery_city").checked = false;
					document.getElementById("tab_pickup_country").checked = false;
					document.getElementById("tab_pickup_city").checked = false;
					document.getElementById("tab_reservation_country").checked = false;
					document.getElementById("tab_reservation_city").checked = false; 
					
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
					document.getElementById("tab_delivery_country").checked = true;
					document.getElementById("tab_delivery_city").checked = true;
					document.getElementById("tab_pickup_country").checked = true;
					document.getElementById("tab_pickup_city").checked = true;
					document.getElementById("tab_reservation_country").checked = true;
					document.getElementById("tab_reservation_city").checked = true;	
					
					
				
				}else{
					document.getElementById("tab_delivery_country").checked = false;
					document.getElementById("tab_delivery_city").checked = false;
					document.getElementById("tab_pickup_country").checked = false;
					document.getElementById("tab_pickup_city").checked = false;
					document.getElementById("tab_reservation_country").checked = false;
					document.getElementById("tab_reservation_city").checked = false;
					
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
					document.getElementById("tab_delivery_country").checked = true;
					document.getElementById("tab_delivery_city").checked = true;
					document.getElementById("tab_pickup_country").checked = true;
					document.getElementById("tab_pickup_city").checked = true;
					document.getElementById("tab_reservation_country").checked = true;
					document.getElementById("tab_reservation_city").checked = true;	
					
					
				
				}else{
					document.getElementById("tab_delivery_country").checked = false;
					document.getElementById("tab_delivery_city").checked = false;
					document.getElementById("tab_pickup_country").checked = false;
					document.getElementById("tab_pickup_city").checked = false;
					document.getElementById("tab_reservation_country").checked = false;
					document.getElementById("tab_reservation_city").checked = false;
					
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
	*/
	
	if(a=="country"){
		
		if(($("#tab_delivery_country").prop('checked') == false) ) {
					
					if((this.Form[c].fields["city"].value=="-1") ||(d.value=="-1")){
							alert('<?=$lang_resource['ADMIN_PAGE_FORM_PLEASE_SELECT_DEFAULT_COUNTRY']?>'); 
							set=0;
						}
				}
	}else if(a=="city"){
		
		if(($("#tab_delivery_country").prop('checked') == false) ) {
					
					if((this.Form[c].fields["country"].value=="-1") ||(d.value=="-1")){
							alert('<?=$lang_resource['ADMIN_PAGE_FORM_DEFAULT_COUNTRY_CITY']?>'); 
							set=0;
						}
				}
	}else{
			if(($("#tab_delivery_country").prop('checked') == false) ) {
					
					if((this.Form[c].fields["country"].value=="-1") ||(this.Form[c].fields["city"].value=="-1")){
							alert('<?=$lang_resource['ADMIN_PAGE_FORM_COUNTRY_CITY_CHECK']?>'); 
							set=0;
						}
				}
	}
	if(($("#tab_delivery").prop('checked') == true) && ($("#tab_delivery_address").prop('checked') == false) && ($("#tab_delivery_neighborhood").prop('checked') == false) ) {
			alert('<?=$lang_resource['ADMIN_PAGE_FORM_ADDRESS_NEIGHBOURHOOD']?>'); 
			set=0;
						
		}

		
		if(a=="tab_delivery"){
			if((b=="false") && (this.Form[c].fields["tab_pickup"].value=="false") && (this.Form[c].fields["tab_reservation"].value=="false") ){
				set=0;
				alert('<?=$lang_resource['ADMIN_PAGE_FORM_CHECK_DELIVERY']?>');
			}
		}else if(a=="tab_pickup"){
			if((b=="false") && (this.Form[c].fields["tab_delivery"].value=="false") && (this.Form[c].fields["tab_reservation"].value=="false") ){
				set=0;
				alert('<?=$lang_resource['ADMIN_PAGE_FORM_PLEASE_CHECK_DELIVERY']?>');
			}
		}else if(a=="tab_reservation"){
			
			if((b=="false") && (this.Form[c].fields["tab_pickup"].value=="false") && (this.Form[c].fields["tab_delivery"].value=="false") ){
				set=0;
				alert('<?=$lang_resource['ADMIN_PAGE_FORM_DELIVERY_PICKUP_RESERVATION']?>');
			}
		
			
		}else{
			if((this.Form[c].fields["tab_reservation"].value=="false") && (this.Form[c].fields["tab_pickup"].value=="false") && (this.Form[c].fields["tab_delivery"].value=="false") ){
				set=0;
				alert('<?=$lang_resource['ADMIN_PAGE_FORM_CHECK_DELIVERY_OR_PICKUP_RESERVATION']?>');
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
	
	
};
