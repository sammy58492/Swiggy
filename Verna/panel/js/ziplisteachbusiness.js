var IS_PAYPAL_ENABLED = 1;

var Invoice = {
    Main: function (p) {
		
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
		Main.businessid = p;
		  $.post("lib/zipseach.php", "f=Fetchbusinessname&bid="+p, function (s) {
			  console.log(s);
			  Invoice.businessname = new Object();
			  Invoice.businessname= s;
			  Invoice.businessid= p;
			    })		
        $.post("lib/zipseach.php", "f=FetchAllOrdersData&bid="+p, function (c) {
		
		
		//alert(c);
		Main.businessid = p;
			
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            if (c != "") {
                Invoice.Orders = JSON.parse(c);
               /* for (var b in Invoice.Orders) {
                  //  Invoice.Orders[b].cname = Invoice.Orders[b].city.name
                }*/
			
                Invoice.PrintMain(p);
				
            } else {
                alert("Error")
            }
        })
    },
    PrintMain: function (k) {
        var c = new Array();
        var b = new Array();
        var a = Visuals.CreateSearchBox();
        var d = "";
		
		 c.push(Visuals.CreateSubMenuItem("Invoice.ZipcodeForm()", "<?= $lang_resource['CONTROL_PANEL_ZIP_BUTTON_ADD'] ?>"));
        c.push(Visuals.CreateSubMenuItem("Invoice.ZipcodeEdit()", "<?= $lang_resource['CONTROL_PANEL_ZIP_BUTTON_EDIT'] ?>"));
        c.push(Visuals.CreateSubMenuItem("Invoice.ZipcodeDelete()", "<?= $lang_resource['CONTROL_PANEL_ZIP_BUTTON_DELETE'] ?>"));
		c.push(Visuals.CreateSubMenuItem("Invoice.UploadCSV()", "<?= $lang_resource['CONTROL_PANEL_ZIP_BUTTON_UPLOAD'] ?>"));
		c.push(Visuals.CreateSubMenuItem("ZipBusiness.PrintMain()", "Cancel"));
        /*c.push(Visuals.CreateSubMenuItem("Orders.Edit()", "<?= $lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EDIT'] ?>"));
    
		 b.push({
            caption: "Invoice download",
            link: "Invoice.Export(0)"
        });
        c.push(Visuals.CreateSubMenuItem("", "<?= $lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EXPORT'] ?>", b));*/
      
        a += Visuals.CreateSubMenu(c);
        document.getElementById("leftcol").innerHTML = a;
        d += '<div class="contentbox">';
        d += '<div class="titlebox nonselectable">';
        d += '<span class="title">&gt;&gt;<?=$lang_resource['CONTROL_PANEL_ZIPCODELIST_TITLE']?> </span>';
        d += "</div>";
        d += '<div class="table">';
        d += '<div class="title nonselectable">';
        d += '<div class="oid hand" onclick="Invoice.PupulateTable(\'id\')"><span class="caption">#</span></div>';
        d += '<div class="select hand" onclick="Main.ToogleAllCheckBoxes()"><div class="checkimage"></div></div>';
        d += '<div class="businessprovider hand" onclick="Invoice.PupulateTable(\'date\')" style="width:250px"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ZIPCODE_ZIP'] ?></span></div>';
        d += '<div class="businessprovider hand" onclick="Invoice.PupulateTable(\'cname\')" style="width:173px"><span class="caption"><?= $lang_resource['CONTROL_PANEL_ZIPCODE_PRICE'] ?></span></div>';
        d += '<div class="enabled hand" onclick="Invoice.PupulateTable(\'cname\')" ><span class="caption"><?= $lang_resource['CONTROL_PANEL_ZIPCODELIST_ENABLE'] ?></span></div>';
		     

		
        d += "</div>";
        d += '<div class="container" id="orders"></div>';
        d += "</div>";
        document.getElementById("main").innerHTML = d;
        document.getElementById("search").onkeyup = function () {
            Invoice.PupulateTable(Main.Config.Orders.List.SortBy, true)
        };
        Invoice.PupulateTable(Main.Config.Orders.List.SortBy, true)
    },
    PupulateTable: function (a, d) {
		
		//alert("ok");
        var e = "";
        //var j = this.Orders.length;
		
        if (d) {
            this.Orders.sort(Main.SortByProperty(a));
            if (Main.Config.Orders.List.SortByStatus == "max") {
                this.Orders.reverse()
            }
        } else {
            if (Main.Config.Orders.List.SortBy != a) {
                this.Orders.sort(Main.SortByProperty(a));
                Main.Config.Orders.List.SortByStatus = "min"
            } else {
                this.Orders.reverse();
                if (Main.Config.Orders.List.SortByStatus == "min") {
                    Main.Config.Orders.List.SortByStatus = "max"
                } else {
                    Main.Config.Orders.List.SortByStatus = "min"
                }
            }
        }
        Main.Config.Orders.List.SortBy = a;
        if (!d) {
            Main.SaveConfig()
        }
		 var l = new Array();
        var j = false;
        var g = "";
		        for (var f in this.Orders) {
           j = false;
            g = document.getElementById("search").value.toLowerCase();
            if (String(this.Orders[f].id).toLowerCase().indexOf(g) >= 0 ) {
                j = true;
                l.push(this.Orders[f])
            }
           
            if (j) {
				
			
                var m;
                if (f % 2 == 0) {
                  	
					
					    m = " grey";
					
                } else {
					
				
					    m = " ";
						
					
                }
				
				
                e += '<div class="default row' + m + '" style="border-bottom:1px solid #e4e4e4;">';
                e += '<div class="oid"><div class="cap"><span class="caption hand" >' +this.Orders[f].id + "</span></div></div>";
                e += '<div class="select"><input type="checkbox" class="checkbox" value="' + this.Orders[f].id + '"/></div>';
		
                e += '<div class="businessprovider" style="width:250px"><div class="cap"><span class="caption hand"  onclick="Invoice.ZipcodeEdit(' + this.Orders[f].id + ')">' + Main.NullToEmpty(this.Orders[f].zipcode) + "</span></div></div>";
               
                    e += '<div class="businessprovider"  style="width:173px"><div class="cap"><span class="caption">' + Main.NullToEmpty(parseFloat(this.Orders[f].cost).toFixed(Main.IS_DECIMAL_POINT)) + "</span></div></div>"
             
               e += '<div class="enabled"><span class="caption"><div id="switch_' + this.Orders[f].id + '"></div></span></div>';
				

                e += "</div>"
            }
		
		}
        
        document.getElementById("orders").innerHTML = e
		
		  var h = false;
        Switch.Init();
        for (e in l) {
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + l[e].id, h);
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                Invoice.SetEnabled(m.replace("switch_", ""), i)
            })
		}
    },
	 SetEnabled: function (b, a) {
		//alert(Main.businessid);
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/zipseach.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
			
        })
    },
	
	UploadCSV: function () {
    
     var a = "";
        var c = "";
     
        
        a += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Invoice.Main(Main.businessid)");
        Forms.Clean("category", "mainbuttonok");
       
            Forms.Form.category.type = "create"
      
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        if (Forms.Form.category.type == "create") {
            c += '<span class="title">&gt;&gt;   UPLOAD ZIPCODE</span>'
        } 
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';
        
            c +='<form name="zipcode" action="csv/zipcode.php" method="post" enctype="multipart/form-data" onsubmit="return Invoice.csvFile(this);">';
            c += '<div class="row"><span class="caption"><?=$lang_resource['PANEL_CSV_ZIP_CODE_TEXT']?></span><div class="inputbox"><input name="csvfile"  type="file" ></div></div><input type="hidden" value="'+Main.businessid +'" name="businessid" >';
             c += '<div class="row"><div class="inputbox"><input name="submit" type="submit" value="<?=$lang_resource['PANEL_CSV_BUTTON_LEVEL']?>" class="mainbutton" style="background: none repeat scroll 0 0 #D40200;border: 2px solid #D40200;height: 100%;width: 32%; margin:20px 0 0 110px; color:#FFFFFF; float:left" ></div></div>';
             c +='</form>';
      
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#name").focus()
    },
	 csvFile: function (frm) {
 			
			var csvfile=frm.csvfile.value;
           var ext = csvfile.substring(csvfile.lastIndexOf('.') + 1);
					if(csvfile==""){
                        swal("Error","<?= $lang_resource['PANEL_CSV_PERMISSION_BLANK'] ?>","error");
					   return false;
					}
					else if(ext!="csv"){
                        swal("Error","<?= $lang_resource['PANEL_CSV_PERMISSION_EXT'] ?>","error");
					return false;
					}
                    else
                    {
                    return true;
                    
                    }
			
    },
    ZipcodeEdit: function (a) {
        var d = false;
        if (a) {
            d = true
        } else {
            var c = Main.GetMarkedCheckBoxesValues();
            if (c.length == 1) {
                a = c[0];
                d = true
            }
        } if (d) {
            Main.Loading();
            var b = new Date().getTime();
            Main.Aid = b;
		
            $.post("lib/zipseach.php", "f=FetchEachzipData&id=" + a, function (e) {
				
				
                if (b != Main.Aid) {
                    return
                }
                Main.Ready();
                if (e != "") {
				
					
                    Invoice.ZipcodeForm(JSON.parse(e))
                } else {
                    alert("Error")
                }
            })
        }
    },
     ZipcodeForm: function (b) {
    
	  // alert(b[0].id);
	  // alert(b);
       
        var a = "";
        var c = "";
        a += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] ?>", "ok", "Invoice.SaveZipcode()");
        a += Visuals.CreateMainButton("<?= $lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] ?>", "cancel", "Invoice.Main(Main.businessid)");
        Forms.Clean("category", "mainbuttonok");
        if (b) {
           
			 Forms.Form.category.type = "modify";
            Forms.Form.category.id = b[0].id
			
        } else {
			
            Forms.Form.category.type = "create"
        }
		  
        c += '<div class="contentbox">';
        c += '<div class="titlebox nonselectable">';
        if (Forms.Form.category.type == "create") {
            c += '<span class="title">&gt;&gt; <?=$lang_resource['PANEL_CREATE_ZIPCODE']?></span>'
        } else {
            c += '<span class="title">&gt;&gt; <?=$lang_resource['PANEL_EDIT_ZIPCODE']?></span>'
        }
        c += "</div>";
        c += '<div class="editform">';
        c += '<div class="leftcol">';
		
        if (b) {
            c += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_ZIPCODE_ZIP']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("category", "zipcode", b[0].zipcode, true) + "</div></div>"
        } else {
            c += '<div class="row"><span class="caption"><?=$lang_resource['CONTROL_PANEL_ZIPCODE_ZIP']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("category", "zipcode", "", true) + "</div></div>"
        }
		 if (b) {
		 c += '<div class="row"><span class="caption"><?=$lang_resource['PANEL_FORM_ZIP_DELIVERYTEXT']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("category", "cost",  b[0].cost, true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>"
		 }
		 else
		 {
			 	 c += '<div class="row"><span class="caption"><?=$lang_resource['PANEL_FORM_ZIP_DELIVERYTEXT']?>:</span><div class="inputbox">' + Forms.CreateInputProperty("category", "cost",  '', true, "", false, false, "return Main.IsNumberKey(event)") + "</div></div>"
		}
		
		 Forms.CreateInputProperty("category", "businessid", this.businessid);
		 
		
		
        c += "</div>";
        c += "</div>";
        c += "</div>";
        document.getElementById("leftcol").innerHTML = a;
        document.getElementById("main").innerHTML = c;
        $("#name").focus()
    },
	 ZipcodeDelete : function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("categories", null, "f=DeleteZipcode&data=" + JSON.stringify(a), "Invoice.Main(Main.businessid)")
    },
	  SaveZipcode: function () {
        if (Forms.CanSave("category") == false) {
            return
        }
      //  Forms.PrepareForSaving("category");
		
	//Forms.Form.category.
		/*alert(JSON.stringify(Forms.Form.category))
		return false;*/
        
        Main.Request("categories", null, "f=SaveZipcode&data=" + JSON.stringify(Forms.Form.category), "Invoice.Main(Main.businessid)");
        Forms.Clean("category")
    },
    Export: function (b) {
		
		
        var c = Main.GetMarkedCheckBoxesValues();
        if (c.length == 0) {
            return
        }
        var a = new Object();
        a.ids = c;
        a.type = b;
		
        document.getElementById("exp_data").value = c[0];
        document.exp_form.submit()
    },
	Gopdf: function (b,c) {	
	//alert(c);	
        document.getElementById("exp_data").value = b +"-"+c;
        document.exp_form.submit()
    },
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
            return
        }
        var a = new Object();
        a.ids = b;
        Main.Request("orders", null, "f=DeleteOrder&data=" + JSON.stringify(a), "Orders.Main()")
    }
};
