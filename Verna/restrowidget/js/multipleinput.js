var MultipleInput = {
    Inputs: new Array(),
    Tags: new Object(),
    Lists: new Object(),
    Hovers: new Object(),
    ForceFilters: new Object(),
    TagsChangeCB: null,
    TagAddedCB: null,
    TagDeletedCB: null,
    Init: function (b, h, g, e) {
        var a = this;
        var d = document.getElementById(b);
        this.Width = $(d).width();
        this.Height = $(d).height();
        this.Lists[b] = h;
        this.Hovers[b] = -1;
        this.ForceFilters[b] = g;
        var i = document.createElement("div");
        i.setAttribute("id", b + "suggestions");
        i.setAttribute("class", "suggestions");
        i.setAttribute("style", "width:" + (this.Width + 2) + "px;height:auto;z-index: 1;display:none;");
        var c = document.createElement("div");
        c.setAttribute("id", b + "container");
        c.setAttribute("style", "min-height:" + this.Height + "px");
        $(c).click(function () {
            $("#" + b).focus()
        });
		var txtlang = "";
		
		if(b == "resturants")
		txtlang =  $("#resturentpholder").val();
		else if(b == "cuisines")
		txtlang =   $("#cuisinespholder").val();
		else 
		txtlang = b;
		
		ffontsize=$("#ffize").val();
		ffont_color=$("#ffont_color").val();
        var f = '<input type="text" id="' + b + '" placeholder="'+txtlang +'" autocomplete="off" class="input" style="float:left;margin:0;border:0px solid #ffffff;outline:0;color:'+ffont_color+'!important; font-size:'+ffontsize+'px!important;"/>';
        c.innerHTML = f;
        d.parentNode.replaceChild(c, d);
        c.appendChild(i);
        d = document.getElementById(b);
        $(d).keyup(function (j) {
            a.KeyUp(j, a, b, this)
        });
        $(d).keydown(function (j) {
            a.KeyDown(j, a, b, this)
        });
        $(d).css("outline", "none");
		
        $(c).addClass("multipleinput");
		ffontsize=$("#ffize").val();
		 $(c).css("font-size", ffontsize);
        $(c).css("float", "left");
		
        $(c).addClass("multipleinput");
		
		ffontsize=$("#ffize").val();
		 $(c).css("font-size", ffontsize);
		
		if(b=="menu_dishes")
		{
        $(c).width("255px");
		}
		else
		{
		  $(c).width("160px");	
		}
		
		if(b=="menu_dishes")
		{
			 $(c).height("240px");
			 $(c).css("overflow","scroll");
			 $(c).css("overflow-x","hidden");
			$("#popup").css("height","auto");
			$("#popupbox").css("height","auto");
			
		}
		
		
        this.AdjustRealInputWidth(c, b, false);
        this.Tags[b] = new Array();
        if (e) {
            this.Droppable = true;
            $(c).droppable({
                accept: "li",
                greedy: true,
                drop: function (k, j) {
                    a.AddTagById(b, (j.draggable).attr("id").replace("dboxdraggableitem_", ""), true)
                }
            })
        }
    },
	 //tabsetting Start 
		Init2: function (b, h, g, e,g) {
			for(r in h){
       		if(h[r].id==null){
            	  delete h[r]
            }
       	} 
		  this.Lists[b] = h;
		  
	},
	
	InitFrontCountry: function (b, h, g, e,g) {
		
        var a = this;
        var d = document.getElementById(b);
        this.Width = $(d).width();
        this.Height = $(d).height();
        this.Lists[b] = h;
        this.Hovers[b] = -1;
        this.ForceFilters[b] = g;
		
        var i = document.createElement("div");
        i.setAttribute("id", b + "suggestions");
        i.setAttribute("class", "suggestions");
        i.setAttribute("style", "width:" + (this.Width + 2) + "px;height:auto;z-index: 1;display:none;");
        var c = document.createElement("div");
        c.setAttribute("id", b + "container");
        c.setAttribute("style", "min-height:" + this.Height + "px");
        $(c).click(function () {
            $("#" + b).focus()
        });
		ffontsize=$("#ffize").val();
		ffont_color=$("#ffont_color").val();
        var f = '<textarea id="' + b + '" autocomplete="off" class="input" style="float:left;margin:0;border:0px solid #ffffff;outline:0;color:'+ffont_color+'!important; font-size:'+ffontsize+'px!important;" onchange="'+g+'"></textarea>';
        c.innerHTML = f;
        d.parentNode.replaceChild(c, d);
        c.appendChild(i);
        d = document.getElementById(b);
        $(d).keyup(function (j) {
			
            a.KeyUp(j, a, b, this)
        });
        $(d).keydown(function (j) {
			
            a.KeyDown(j, a, b, this)
        });
        $(d).css("outline", "none");
        $(c).addClass("multipleinput");
		ffontsize=$("#ffize").val();
		 $(c).css("font-size", ffontsize);
        $(c).css("float", "left");
        $(c).addClass("multipleinput");
		ffontsize=$("#ffize").val();
		 $(c).css("font-size", ffontsize);
		
        $(c).width(this.Width);
        this.AdjustRealInputWidth(c, b, false);
        this.Tags[b] = new Array();
        if (e) {
            this.Droppable = true;
            $(c).droppable({
                accept: "li",
                greedy: true,
                drop: function (k, j) {
                    a.AddTagById(b, (j.draggable).attr("id").replace("dboxdraggableitem_", ""), true)
                }
            })
        }
    },
	
	 //tabsetting end 
    KeyUp: function (i, a, d, g) {
			
        switch (i.which) {
        case 188:
            if (a.Hovers[d] == -1) {
                g.value = g.value.replace(",", "");
                a.AddTypedTag(g, true)
            }
            break;
        case 13:
            if (a.Hovers[d] == -1) {
                a.AddTypedTag(g, true)
            } else {
                var f = document.getElementById(d + "suggestions");
                var j = $(f).find("ul");
                var b = $(j).children().eq(a.Hovers[d]).children(":first");
                var c = $(b).attr("id").replace("suggestion_", "");
			
                a.AddTagById(d, c, true);
                a.CloseSuggestions(d)
            }
            break;
        case 188:
            if (a.Hovers[d] == -1) {
                a.AddTypedTag(g, true)
            }
            break;
        case 38:
            a.MoveOnSuggestions(d, "up");
            break;
        case 40:
            var h = g.value;
            if (document.getElementById(d + "suggestions").style.display == "none") {
                a.ShowMatchedSuggestions(h, d)
            } else {
                a.MoveOnSuggestions(d, "down")
            }
            break;
        case 27:
            a.CloseSuggestions(d);
            break;
        default:
            var h = g.value;
            if (h.length < 1) {
                a.CloseSuggestions(d);
                return
            }
            a.ShowMatchedSuggestions(h, d);
			
            break
        }
    },
    ShowMatchedSuggestions: function (b, a) {
        var d = new Array();
		
        for (var c in this.Lists[a]) {
			
            if (this.Lists[a][c].name.toLowerCase().indexOf(b.toLowerCase()) >= 0) {
                d.push(this.Lists[a][c])
            }
        }
        if (d.length > 0) {
            this.PrintSuggestionsBox(d, a)
        } else {
            this.CloseSuggestions(a)
        }
    },
    CloseSuggestions: function (a) {
        var b = document.getElementById(a + "suggestions");
        b.style.display = "none";
        b.innerHTML = ""
    },
    KeyDown: function (f, g, b, d) {
        switch (f.which) {
        case 8:
            var c = d.value;
            if (c.length == 0) {
                var a = $("#" + b + "container").find(".tag:last").find(".close").attr("id");
                if (a) {
                    g.DeleteTag(b, a)
                }
            }
            break
        }
    },
    AddTagByElem: function (b, c, g, f) {
		
		//tabsetting start
      //  if (this.ForceFilters[b]) {
		   if( (this.ForceFilters[b]) ||(b=='restaurant')) {
	//tabsetting End		   
            for (var e in this.Tags[b]) {
                if (this.Tags[b][e].id == c.id) {
                    document.getElementById(b).value = "";
                    return
                }
            }
        }
		if(c!=null){
		
        this.Tags[b].push(c);
		}
		
        var a = document.getElementById(b + "container");
        a.innerHTML = "";
        var d = document.createElement("div");
        d.setAttribute("id", b + "suggestions");
        d.setAttribute("class", "suggestions");
        d.setAttribute("style", "width:" + (this.Width + 2) + "px;height:auto;z-index: 1;display:none;");
        a.appendChild(d);
        for (e in this.Tags[b]) {
            if (this.Tags[b][e].name != "") {
				
				//tabsetting start
              //  $(a).append(this.CreateTag(this.Tags[b][e], b, e));
			  if((b=="countrytag")||(b=="citytag")||(b=="restaurant")){
					if(this.Tags[b][e].id=='-1'){
						e1=-1;
					}else{
						e1=this.Tags[b][e].id;
					}
				
			}else{
				e1=e;
				}
				
				 $(a).append(this.CreateTag(this.Tags[b][e], b, e1));
			
			  
			  
				//tabsetting end
				
				
                var h = this;
			//tabsetting start
              //  $("#" + b + "_" + e + "close").click(function () {
					 $("#" + b + "_" + e1 + "close").click(function () {
				//tabsetting end
                    h.DeleteTag(b, this.id)
					
					//tabsetting start
					if(b=="countrytag"){
						
						  
						   var e3 = this.id.replace( "countrytag_","");
						      var e3 = e3.replace( "close","");
							   
						//SuperAdmin.setCityList(parseInt(e3));
						
					}
					if(b=="citytag"){
						
						  
						   var e3 = this.id.replace( "citytag_","");
						      var e3 = e3.replace( "close","");
							   
						//SuperAdmin.setRestaurantsList(parseInt(e3));
						
					}
					if(b=="restaurant"){
						
						  
						   var e3 = this.id.replace( "restaurant_","");
						      var e3 = e3.replace( "close","");
							   
						//SuperAdmin.setRestaurantsvalue(parseInt(e3));
						
					}
						//tabsetting end
					
                })
            }
        }
		
		//tabsetting start
       // $(a).append('<input type="text" id="' + b + '" value="" class="input" style="float:left;margin:0;border:0px solid #ffffff;outline:0;"/>');evtstr='';
	    var  evtstr = '';
		
		if(b=="countrytag"){
			
		//	evtstr=' onchange="SuperAdmin.setCityList()" ';
		}
		if(b=="citytag"){
			//evtstr=' onchange="SuperAdmin.setRestaurantsList()" ';
		}
		if(b=="restaurant"){
			
			//evtstr=' onchange="SuperAdmin.setRestaurantsvalue()" ';
		}
		ffontsize=$("#ffize").val();
		ffont_color=$("#ffont_color").val();
		if((evtstr!='') ||(b=='restaurant')){
			
			  $(a).append('<textarea id="' + b + '" value="" class="input" style="float:left;margin:0;border:0px solid #ffffff;outline:0;color:'+ffont_color+'!important; font-size:'+ffontsize+'px!important;" '+evtstr+'></textarea>');
		}else{
			  $(a).append('<input type="text" id="' + b + '" value="" class="input" style="float:left;margin:0;border:0px solid #ffffff;outline:0;color:'+ffont_color+'!important; font-size:'+ffontsize+'px!important;" '+evtstr+'/>');
		}
		
		//tabsetting end
		
        $(a).click(function () {
            $("#" + b).focus()
        });
        Input = document.getElementById(b);
        var h = this;
        $(Input).keyup(function (i) {
            h.KeyUp(i, h, b, this)
        });
        $(Input).keydown(function (i) {
            h.KeyDown(i, h, b, this)
        });
        this.AdjustRealInputWidth(a, b, g);
        if (!f) {
            this.TagAdded(b, Input.value);
            this.TagsChange(b)
        }
		
		if((document.getElementById("citytag")) && (document.getElementById("countrytag")) && (document.getElementById("restaurant")) ){
		// SuperAdmin.setCityList();
		//  SuperAdmin.setRestaurantsList();
		}
    },
    AddTagById: function (a, f, e, d) {
        var b;
        for (var c in this.Lists[a]) {
            if (this.Lists[a][c].id == f) {
                b = this.Lists[a][c]
            }
        }
        if (b) {
            this.AddTagByElem(a, b, e, d)
        }
    },
    AddTypedTag: function (f, e) {
        var a = f.id;
        var b = f.value;
        var c;
        if (this.ForceFilters[a]) {
            for (var d in this.Lists[a]) {
                if (this.Lists[a][d].name.toLowerCase() == b.toLowerCase()) {
                    c = this.Lists[a][d]
                }
            }
            if (!c) {
                return
            }
        } else {
            c = {
                name: b
            }
        }
        this.AddTagByElem(a, c, e)
    },
    CreateTag: function (c, b, d) {
		 ffont_color=$("#ffont_color").val();
		ffontsize=$("#ffize").val();
		bbuttoncolor=$("#bbuttoncolor").val();
        var a = '<div class="tag nonselectable default" style="background-color: '+bbuttoncolor+'!important;" id="' + b + "_" + d + 'tag">';
        a += '<span class="icaption" style="font-size: '+ffontsize+'px!important;color:'+ffont_color+'!important;" >' + c.name + "</span>";
        a += '<div class="close hand" id="' + b + "_" + d + 'close"></div>';
        a += "</div>";
        return a
    },
    DeleteTag: function (b, g) {
        var a = document.getElementById(b + "container");
        var h = document.getElementById(g);
        var f = h.id.replace("close", "");
        var e = f.replace(b + "_", "");
        var d = document.getElementById(f + "tag");
        var c = this.Tags[b][e];
        d.parentNode.removeChild(d);
        delete this.Tags[b][e];
        this.AdjustRealInputWidth(a, b, true);
        this.TagDeleted(b, c);
        this.TagsChange(b)
    },
    AdjustRealInputWidth: function (b, c, i) {
        var g = document.getElementById(c);
        var d = $(b).width();
        if (this.Tags[c]) {
            var a = $(b).children(":last").prev().offset();
            var h = 0;
            if (a) {
                h = a.left
            }
            var f;
            if ((h - $(b).offset().left) > 0) {
                var e = (h - $(b).offset().left) + $(b).children(":last").prev().width();
                f = (d - e) - 10;
                if (f <= 40) {
                    f = d - 10
                }
            } else {
                f = d - 10
            }
            $(g).css("width", f + "px")
        } else {
            f = d - 10;
            $(g).css("width", f + "px")
        } if (i) {
            setTimeout(function () {
                $(g).focus()
            }, 100)
        }
    },
    PrintSuggestionsBox: function (o, c) {
        var d = document.getElementById(c + "container");
        var j = $(d).position();
        var h = document.getElementById(c);
        var b = $(h).height();
        if (b == "" || b == null) {
            b = 21
        }
        var m = $(h).position().top - j.top;
        var l = j.top + b + m + 7;
        var g = j.left;
        var f = document.getElementById(c + "suggestions");
        $(f).css("left", g + "px");
        $(f).css("top", l + "px");
        var k = document.createElement("ul");
        var n;
        var a = this;
        for (var e in o) {
            n = document.createElement("li");
            n.setAttribute("class", "nonselectable");
            $(n).click(function () {
                var i = $(this).find("a");
                var p = $(i).attr("id").replace("suggestion_", "");
                a.AddTagById(c, p, true);
                a.CloseSuggestions(c);
                setTimeout(function () {
                    $(Input).focus()
                }, 100)
            });
            n.innerHTML = '<a id="suggestion_' + o[e].id + '">' + o[e].name + "</a>";
            k.appendChild(n);
            $(n).hover(function () {
                $(n).parent().children().each(function () {
                    $(this).removeClass("hover")
                });
                $(this).addClass("hover");
                a.Hovers[c] = $(this).index()
            })
        }
        f.innerHTML = "";
        f.appendChild(k);
        f.style.display = "block";
        this.Hovers[c] = -1
    },
    MoveOnSuggestions: function (b, a) {
        var d = document.getElementById(b + "suggestions");
        if (d.innerHTML != "") {
            var e = $(d).find("ul");
            if (a == "down") {
                this.Hovers[b]++
            } else {
                this.Hovers[b]--;
                document.getElementById(b).value = document.getElementById(b).value
            } if (this.Hovers[b] >= $(e).children().size()) {
                this.Hovers[b]--;
                return
            }
            if (this.Hovers[b] < 0) {
                this.Hovers[b] = 0;
                return
            }
            $(e).children().each(function () {
                $(this).removeClass("hover")
            });
            var c = $(e).children().eq(this.Hovers[b]);
            $(c).addClass("hover");
            this.Scroll($(c), d, a)
        }
    },
    GetTags: function (a) {
        var b = new Array();
        for (var c in this.Tags[a]) {
            if (this.Tags[a][c] != "") {
                b.push(this.Tags[a][c])
            }
        }
        return b
    },
    GetTagsIds: function (a) {
        var b = new Array();
        for (var c in this.Tags[a]) {
            if (this.Tags[a][c] != "") {
                b.push(this.Tags[a][c].id)
            }
        }
        return b
    },
    GetTagsNames: function (a) {
        var b = new Array();
        for (var c in this.Tags[a]) {
            if (this.Tags[a][c] != "") {
                b.push(this.Tags[a][c].name)
            }
        }
        return b
    },
    TagsLength: function (b) {
        var a = 0;
        for (var c in this.Tags[b]) {
            if (this.Tags[b][c] != "") {
                a++
            }
        }
        return a
    },
    TagsChange: function (Id) {
        if (this.TagsChangeCB) {
            eval(this.TagsChangeCB + "('" + Id + "');")
        }
    },
    TagAdded: function (Id, Tag) {
        if (this.TagAddedCB) {
            eval(this.TagAddedCB + "('" + Id + "','" + Tag + "');")
        }
    },
    TagDeleted: function (Id, Tag) {
        if (this.TagDeletedCB) {
            eval(this.TagDeletedCB + "('" + Id + "','" + Tag + "');")
        }
    },
    AddListener: function (b, a) {
		delete  this.TagsChangeCB;
        switch (b) {
        case "tagschange":
            this.TagsChangeCB = a;
            break;
        case "tagadded":
            this.TagAddesCB = a;
            break;
        case "tagdeleted":
            this.TagDeletedCB = a;
            break
        }
    },
	 
    InsensitiveSort: function (d, c) {
        var e = 0;
        d = d.toLowerCase();
        c = c.toLowerCase();
        if (d > c) {
            e = 1
        }
        if (d < c) {
            e = -1
        }
        return e
    },
    Scroll: function (b, c, a) {
        if (a == "down") {
            $(c).scrollTop($(c).scrollTop() + (($(b).position().top + 22) - $(c).height()))
        } else {
            if ($(b).position().top < 2) {
                $(c).scrollTop($(c).scrollTop() - 21)
            }
        }
    },
    Clean: function () {
        if (this.Droppable) {
            this.Droppable = null;
            $("#dboxdroppable").droppable("destroy")
        }
        Inputs = null;
        Tags = null;
        Lists = null;
        Hovers = null;
        ForceFilters = null;
        TagsChangeCB = null;
        TagAddedCB = null;
        TagDeletedCB = null
    }
};
