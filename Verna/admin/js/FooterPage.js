var FooterPage = {
		Main: function () {
		FooterPage.namelang = Array();	
        Main.Loading();
		var a = new Date().getTime();
        Main.Aid = a;		
		$.post("lib/footerpage.php", "f=FetchAllFooterData", function (b) {	
		if (a != Main.Aid) {
                return
            }
			 Main.Ready(); 	
			 FooterPage.footer = JSON.parse(b);		
			 FooterPage.PrintMain(FooterPage.footer);		
			
		})
	},
	
	PrintMain: function(e){
	var c="";
	Forms.Clean("footerpage", "mainbuttonok");
	
	c +='<div class="tab-box">'
    c +='<div class="row">'
    c +='<div class="col-md-12">'
    c +='<div class="panel panel-danger panel-square panel-no-border">'
	c +='<div class="panel-heading-2">'
    c +='<div class="row">'
    c +='<div class="col-md-4">'
    c +='<h3 class="panel-title-2" style="color:#333"><?=$lang_resource['ADMIN_PAGE_FOOTER_LIST'] ?></h3>'
    c +='</div>'
	<!--col-md-5-->
    c +='<div class="col-md-3">'
    c +='<div class="panel-btn filtr_margin">'
    c +='<input type="text" id="footerlistsearch" class="form-control rounded panel-grey-field white-placeholder" placeholder="<?=$lang_resource['ADMIN_PAGE_Filter'] ?>">'
    c +='</div>'
    c +='</div>'
	<!--col-md-3-->
    c +='<div class="col-md-5">'
	c +='<div class="panel-btn pull-right">'
    c +='<div class="inline-popups ">'
    c +='<span class=" panel-btn-2">'
    c +='<a class="btn btn-default btn-rounded-lg panel-grey-btn" href="javascript:FooterPage.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['ADMIN_PAGE_FOOTER_ADD'] ?></a>'
    c +='</span>'
    c +='<span class=" panel-btn-2">'
    c +='<a class="btn btn-default btn-rounded-lg panel-grey-btn" href="javascript:FooterPage.Edit()" data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['ADMIN_PAGE_FOOTER_EDIT'] ?></a>'
    c +='</span>'
    c +='<span class=" panel-btn-2">'
    c +='<button class="btn btn-default btn-rounded-lg panel-grey-btn" onclick="FooterPage.Delete()"><i class="fa icon-remove2"></i> <?=$lang_resource['ADMIN_PAGE_FOOTER_DELETE'] ?></button></span>'                
    c +='</div>'
	c +='</div>'
	c +='</div>'
	<!--col-md-4-->
    c +='</div>'
    <!--row-->
	c +='</div>'
	c +='<div class="panel-body">'
    c +='<div class="table-responsive">'
	c +='<table class="table table-th-block table-striped tbl_enebal">'
	c +='<thead>'
	c +='<tr>'
    c +='<th width="10%"><?=$lang_resource['ADMIN_PAGE_FOOTER_ID'] ?></th>'
	c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'footercheck\')"><?=$lang_resource['ADMIN_PAGE_FOOTER_ALL'] ?></th>'
    c +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_FOOTER_PAGE_NAME'] ?></th>'
    c +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_FOOTER_URL'] ?></th>'
    c +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_FOOTER_COLUMN'] ?></th>'
    c +='<th width="20%"><?=$lang_resource['ADMIN_PAGE_FOOTER_ACTIVATED'] ?></th>'
    c +='</tr>'
	c +='</thead>'
	c +='<tbody id="footerpagelist">'
	c +='</tbody>'
	c +='</table>'
    c +='</div>'
	<!--table-responsive-->
    c +='</div>'
	<!-- /.panel-body -->
	c +='</div>'
    c +='</div>'
	<!--col-md-12-->
    c +='</div>'
	<!--row-->
    c +='</div>'
	
	$("#websitesetting").empty().append(c);
	document.getElementById("footerlistsearch").onkeyup = function () {         
     FooterPage.PupulateTable("id", true)
        };
	FooterPage.PupulateTable("id", true)
	},
	
	PupulateTable: function (b, c) {
    var d = "";
    var a = FooterPage.footer.length;
	var h = false;
    var f = "";
    var k = new Array();        
      
    for (var e in FooterPage.footer) {      
       
      h = false;
      f = document.getElementById("footerlistsearch").value.toLowerCase();
      if (String(FooterPage.footer[e].id).toLowerCase().indexOf(f) >= 0 || String(FooterPage.footer[e].pagename).toLowerCase().indexOf(f) >= 0) {
      h = true;
      k.push(FooterPage.footer[e])
    }
    if (h) {
	d += '<tr>'
    d += '<td>'+ FooterPage.footer[e].id +'</td>'
	d += '<td><input type="checkbox" class="checkbox footercheck" value="' + FooterPage.footer[e].id + '"></td>'
    d += '<td style="cursor:pointer;" onclick="FooterPage.Edit(' + FooterPage.footer[e].id + ')">'+ FooterPage.footer[e].pagename +'</td>'
    d += '<td style="cursor:pointer;" onclick="FooterPage.Edit(' + FooterPage.footer[e].id + ')">'+ FooterPage.footer[e].pageurl +'</td>'
    d += '<td style="cursor:pointer;" onclick="FooterPage.Edit(' + FooterPage.footer[e].id + ')">'+ FooterPage.footer[e].type +'</td>'
	d += '<td><div class="enebal" id="switchfootergroup_' + FooterPage.footer[e].id + '"></div></td>'
    d += '</tr>'
    }
    }
       
     document.getElementById("footerpagelist").innerHTML = d;
     var g = false;
        Switch.Init();
        for (e in k) {
            if (k[e].id != FooterPage.footer.id) {
                if (k[e].enabled == "t") {
                    g = true
                } else {
                    g = false
                }
				
                Switch.Create("switchfootergroup_" + k[e].id, g);
                Switch.OnChange("switchfootergroup_" + k[e].id, function (m, l) {
               	FooterPage.SetEnabled(m.replace("switchfootergroup_", ""), l)
                })
            }
        }
    },
	
	SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
		$.post("lib/footerpage.php", "f=SetEnabled&id=" + b + "&enabled=" + Estr, function (c) {
       
        
            if (c != "ok") {
                Switch.SwitchTo("switchfootergroup_" + b, !a)
            }
        })
    },
	
	 Edit: function (a) {
		 var d = false;
        if (a) {
            d = true
        } else {
            var c = Main.GetMarkedCheckBoxesValuesByClass('footercheck');
            if (c.length == 1) {
                a = c[0];
                d = true
             }else if(c.length > 1){
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CHECBOX_SELECT_EDIT']?>");
                return
            }
        } if (d) {
            Main.Loading();
		
			var gk = new Date().getTime();
			Main.Aid = gk;
		  
		     $.post("lib/footerpage.php", "f=FetchFooterData&id=" + a, function (b) {
				 //alert(b)
				
				   if (gk != Main.Aid) {
						return
					}
           			 Main.Ready();
				FooterPage.PreEdit(b);
				//alert(b);
			 })
        }
    },
    PreEdit: function (a) {
		//alert(a);
		
        if (a == "") {
            alert("Error")
        }
        a = JSON.parse(a);
        this.Form(a)
		 
    },	
	
	New: function () {
		FooterPage.Form();
    },

	show_id: function(id){		
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("pagename_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("pagename_"+id).style.display  = "block";
    },

    Form: function (e) {  

    
    Forms.Clean("footerpage", "mainbuttonok");
    if (e == null) {     		
    e = new Object();
    Forms.Form.footerpage.type = "create";
    Forms.Form.footerpage.id="";
    } else {
    g = true;
    Forms.Form.footerpage.type = "modify";
    Forms.Form.footerpage.id = e.id;           
    }	 
    var k = "";
	if (Forms.Form.footerpage.type == "create") {
	k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_CREATE_FOOTER_PAGE'] ?></h3>'
	}
	else
	{
	k +='<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_EDIT_FOOTER_PAGE'] ?></h3>'	
	}
	
	k +='<div class="row">'
        k +='<ul class="pop_lang_img">'
        flaginfo=Main.languageinfo;
        for(Z in flaginfo){
            var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
            if(flaginfo[Z].id == flaginfo[Z].admindefaulelang){    
                FooterPage.langdefault = flaginfo[Z].admindefaulelang;                             
                k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="FooterPage.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
            }else{
               k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="FooterPage.show_id('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'  
            }
        }
        k +='</ul>'
        k +='</div>'
        <!--row-->
	
	k +='<div class="row">'
    k +='<div class="col-md-12">'
    k +='<div class="form-group">'
	var g = "";
    var b;
    if (Forms.Form.footerpage.type == "modify") {
    b = ""
    } else {
    b = '{"id":"-1","caption":""},'
    }
    g = "[" + b + '{"id":"Panel1","caption":"<?=$lang_resource['ADMIN_PAGE_FOOTER_PANEL1'] ?>"},{"id":"Panel2","caption":"<?=$lang_resource['ADMIN_PAGE_FOOTER_PANEL2'] ?>"},{"id":"Panel3","caption":"<?=$lang_resource['ADMIN_PAGE_FOOTER_PANEL3'] ?>"}]';
    g = JSON.parse(g);
    k +='<label><?=$lang_resource['ADMIN_PAGE_FOOTER_COLUMN'] ?> *</label>'
	k += Forms.CreateSelectPropertyPopup("footerpage", "type", g, e.type, true,"FooterPage.PreValidation()",false, true)
	k +='<small data-bv-validator="notEmpty" class="help-block" id="type_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_SELECT_AT_LEAST_ONE'] ?></small>'
    k +='</div>'
    k +='</div>'
	<!--col-md-12-->
    k +='</div>'
	<!--row-->
    k +='<div class="row">'
    k +='<div class="col-md-12">'
    k +='<div class="form-group">'
    k +='<label><?=$lang_resource['ADMIN_PAGE_FOOTER_PAGE_NAME'] ?> *</label>'
	
	Forms.CreateValue("footerpage", "pagename", "",true)
		flaginfo=Main.languageinfo;
        for(p in flaginfo){
            if (Forms.Form.footerpage.type == "create") {
                if(flaginfo[p].id == FooterPage.langdefault){   
                    k +='<input type="text" id="pagename_'+flaginfo[p].id+'" onkeyup="FooterPage.PreValidation()" class="form-control" value="" />' 
                }else{
                    k +='<input type="text" id="pagename_'+flaginfo[p].id+'" onkeyup="FooterPage.PreValidation()" class="form-control"  value="" style="display:none;" />' 
                }   
            }else{
                if(flaginfo[p].id == FooterPage.langdefault){   
                    k +='<input type="text" id="pagename_'+flaginfo[p].id+'" onkeyup="FooterPage.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.pagename[flaginfo[p].id])+'" />' 
                }else{
                    k +='<input type="text" id="pagename_'+flaginfo[p].id+'" onkeyup="FooterPage.PreValidation()" class="form-control"  value="'+Main.NullToEmpty(e.pagename[flaginfo[p].id])+'" style="display:none;" />' 
                }  
            }     
        }
	
	//k +=Forms.CreateInputPropertyPopup("footerpage", "pagename", Main.NullToEmpty(e.pagename), true, "FooterPage.PreValidation()", false, false)
	k +='<small data-bv-validator="notEmpty" class="help-block" id="pagename_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAGE_NAME_REQURIED'] ?></small>'
    k +='</div>'
    k +='</div>'
	<!--col-md-12-->
    k +='</div>'
	<!--row-->  
    k +='<div class="row">'
    k +='<div class="col-md-12">'
    k +='<div class="form-group">'
    k +='<label>URL *</label>'
	k += Forms.CreateInputPropertyPopup("footerpage", "pageurl", Main.NullToEmpty(e.pageurl), true, "FooterPage.PreValidation()", false, false)
	k +='<small data-bv-validator="notEmpty" class="help-block" id="pageurl_text" style="color:#F00;display:none;"><?=$lang_resource['ADMIN_PAGE_PAGE_URL_REQUIRED'] ?></small>'
    k +='</div>'
    k +='</div>'
	<!--col-md-12-->
    k +='</div>'
	<!--row-->    
    k +='<div class="row">'
    k +='<div class="col-md-6 col-md-offset-3">'
	if (Forms.Form.footerpage.type == "create") {
	k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="FooterPage.Save('+Forms.Form.footerpage.id+')"><?=$lang_resource['ADMIN_PAGE_FOOTER_PAGE_CREATE'] ?></button></center>'
		}else{
	k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="FooterPage.Save('+Forms.Form.footerpage.id+')"><?=$lang_resource['ADMIN_PAGE_FOOTER_PAGE_UPDATE'] ?></button></center>'	
		}
   
    k +='</div>'
	<!--col-md--->
    k +='</div>'
	<!--row-->
	Popup.Show(k);

   },
   
   
   PreValidation: function(){
   	var count = 0;	
    	
		if(document.getElementById("type").value == "-1"){
			
            $("#type_text").show();
            $("#type").addClass("error-text-field");
            $("#type").removeClass("success-text-field");
            count ++;
        }else{
        	$("#type_text").hide();
            $("#type").addClass("success-text-field");
            $("#type").removeClass("error-text-field");
        }
		
		
		flaginfo=Main.languageinfo
        for(Z in flaginfo){
            if(flaginfo[Z].id == FooterPage.langdefault){
		if(document.getElementById("pagename_"+flaginfo[Z].id).value == ""){			
            $("#pagename_text").show();
            $("#pagename_"+flaginfo[Z].id).addClass("error-text-field");
            $("#pagename_"+flaginfo[Z].id).removeClass("success-text-field");
            count ++;
        }else{
        	$("#pagename_text").hide();
            $("#pagename_"+flaginfo[Z].id).addClass("success-text-field");
            $("#pagename_"+flaginfo[Z].id).removeClass("error-text-field");
        }
		
		}
		
			var namedata = document.getElementById("pagename_"+flaginfo[Z].id).value;
            FooterPage.namelang[flaginfo[Z].id] = namedata;
			
	}

		
		if(document.getElementById("pageurl").value == ""){
            $("#pageurl_text").show();
            $("#pageurl").addClass("error-text-field");
            $("#pageurl").removeClass("success-text-field");
            count ++;
        }else{
        	$("#pageurl_text").hide();
            $("#pageurl").addClass("success-text-field");
            $("#pageurl").removeClass("error-text-field");
        }
		
        if(count == 0)
        	return true
        else 
        	return false
        
       
    },

	Save: function () {
		
		if(FooterPage.PreValidation() == false){
            return
        }
  
        Forms.UpdateValue("footerpage", "pagename", FooterPage.namelang,true); 
		
		for(var s in Forms.Form.footerpage.fields){			
			Forms.Form.footerpage.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.footerpage.fields[s].value)))
			Forms.Form.footerpage.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.footerpage.fields[s].ivalue)))
			Forms.Form.footerpage.fields[s].value = Forms.Form.footerpage.fields[s].value.split("+").join("@@");
			Forms.Form.footerpage.fields[s].ivalue = Forms.Form.footerpage.fields[s].ivalue.split("+").join("@@");
		} 
		
	Main.Request("footerpage", null, "f=SaveFooter&data=" + JSON.stringify(Forms.Form.footerpage), "FooterPage.Main()");
	Popup.Close();
	Forms.Clean("footerpage")

    },
	
    Delete: function () {
        var b = Main.GetMarkedCheckBoxesValuesByClass('footercheck');
        if (b.length == 0) {
			alert("<?=$lang_resource['ADMIN_PAGE_PLEASE_SELECT_AT_LEAST_ONE_ITEM']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PRODUCT']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/footerpage.php", "f=DeleteAd&data=" + JSON.stringify(a), function (e) {
						FooterPage.Main()
						alert('<?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_WARNING_DELETE_PERMANENTLY']?>');
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});	
	    }

};