var AdminLanguage={
	Main: function(){
		AdminLanguage.pageNumForm = 0;
		AdminLanguage.Main_Next();
	},
	
	Main_Next: function () {	

		Main.Loading();
        var a = new Date().getTime();		
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=GetManagelangConfig", function (b) {	
        	//alert(b)		
            if (a != Main.Aid) {
                return
            }
            Main.Ready();			
			if (b != "") {
				Main.Config.language = new Object();
                Main.Config.language.List = new Object();
				AdminLanguage.language = JSON.parse(b);				
				AdminLanguage.default_lang_id =  AdminLanguage.language[0].default_lang_id;
				AdminLanguage.PrintMain()
			}else{
                alert("Error")
            }	
        })
	},


	PrintMain: function () {
		var c = "";
		
		c+='<div class="row">'
        c+='<div class="top-bar">'
                        
        c+='<div class=" col-md-6 col-md-offset-6">'
                       
        c+='<div class=" pull-right">' 
                                    
                                   
        c+='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
                    
        c+='</div>'<!--col-md-5-->
                                                            
        c+='</div>'<!--top-bar-->
        c+='</div>'<!--row-->
		c +='<div class="panel panel-success panel-square panel-no-border">'
        c +='<div class="panel-heading panel-heading-2">'
        c +='<div class="row">'
        c +='<div class="col-md-7">'
        c +='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANGUAGE_ADMIN']?></h3>'
        c +='</div>'
        <!--col-md-5-->
        c+='<div class="col-md-3">'
        c +='<div class="" id="ordercf">'
		
		c +='</div>'
        c+='</div>'
        <!--col-md-3-->
        c +='<div class="col-md-2">'
        c +='<div class="panel-btn pull-right">'
        c +='<div class="">'
  
        c +='<span class=" panel-btn-2">'
        c +='<a class="btn btn-default btn-rounded-lg panel-green-btn" href="javascript:AdminLanguage.Form()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c +='</span>'
        c +='</div>'
        
        
        c +='</div>'
        c +='</div>'
        <!--col-md-4-->
        c +='</div>'
        <!--row-->
        c +='</div>'
        
        c +='<div class="panel-body">'
        c +='<div class="table-responsive">'
        c +='<table id="adminmultilanguage-example" class="table table-th-block table-striped tbl_enebal">'
        c +='<thead>'
        c +='<tr>'
        c+='<th style="width:15% !important;" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
        c+='<th style="width:20% !important;" class="hand"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_VARIABLR']?></th>'
        c+='<th style="width:20% !important;" class="hand"><?=$lang_resource['ADMIN_PAGE_MANAGE_DEFAULT_LANG_HEADER']?></th>'
        c+='<th style="width:20% !important;" class="hand"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_FLAG']?></th>'
        c+='<th style="width:12.5% !important;" ><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ACTION']?></th>'
        c +='</tr>'
        c +='</thead>'
        c +='<tbody id="admin_lang">'
        c +='</tbody>'
        c +='</table>'
        c +='</div>'
        <!--table-responsive-->
        c +='</div>'
        <!-- /.panel-body -->
        c +='</div>'

       document.getElementById("main").innerHTML = c;
       AdminLanguage.PupulateTable()
	},
	PupulateTable: function (a, c) {
        var d = "";
    
        if (!c) {
            Main.SaveConfig()
        }
		
        var j = false;
        var g = "";
        var l = new Array();
	
		//alert(JSON.stringify(Managelanguage.language[0].langdataadmin))
        for (var e in this.language[0].langdataadmin) {
				d+='<tr>'
       			d+='<td>'+ this.language[0].langdataadmin[e].id +'</td>'
        		d+='<td>'+ Main.NullToEmpty(this.language[0].langdataadmin[e].lang_key) +'</td>'
        		d+='<td>'+ Main.NullToEmpty(this.language[0].langdataadmin[e].lang_default) +'</td>'
        		d+='<td>'
        		d+='<ul class="lang_img">';
				flaginfo=this.language[0].flaginfo;
							
				for(Z in flaginfo)
				{
				var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
					if(flaginfo[Z].id==this.default_lang_id)
					{
					
					  if(flaginfo[Z].Flaglangcheck == 0 ) {
						d+='<li class="active1 deactive" ><img src="'+p+'" style="width:33px;height:21px;"></li>'
					  } else {
						d+='<li class="active1" ><img src="'+p+'" style="width:33px;height:21px;"></li>'	  
						  }
					}
					else
					{
						if(flaginfo[Z].Flaglangcheck == 0 ) {
						d+='<li class="deactive"><img src="'+p+'" style="width:33px;height:21px;"></li>'
						} else {
						d+='<li ><img src="'+p+'" style="width:33px;height:21px;"></li>'
							}
					}
				}        	
				
        		d+='</ul>'
        		d+='</td>'
        		d+='<td><button class="edit_lang_btn" type="button" onclick="AdminLanguage.Edit('+this.language[0].langdataadmin[e].id+')"><?=$lang_resource['ADVERTISEMENT_EDIT']?></button></td>'
        		d+='</tr>'
				
		}
	
        document.getElementById("admin_lang").innerHTML = d;
        $(document).ready(function () {
            $('#adminmultilanguage-example').dataTable({           
				"iDisplayLength": 5,	
				"start": 1,			
				"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
				"oLanguage": { "sSearch": '',"sInfo": "<?= $lang_resource['ADMIN_PAGE_TOTAL_ORDERS'] ?>  : _START_ - _END_ / <span>_TOTAL_</span>" },
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0 ] }] ,
				"fnHeaderCallback": function( nHead, aData, iStart, iEnd, aiDisplay ) {
					//alert("iStart"+iStart)
					//alert("iEnd"+iEnd)
					var perpage = iEnd - iStart;
					//alert("perpage"+perpage)
					var pagenum = iEnd / perpage;
					AdminLanguage.paginationnumber = Math.ceil(pagenum)  - 1;					
					//alert("pagenum"+Math.ceil(pagenum))	
					//alert("paginationnumber"+AdminLanguage.paginationnumber)	

				},
			});
			var table = $('#adminmultilanguage-example').dataTable();
			//alert("pagin"+AdminLanguage.pageNumForm)
			table.fnPageChange(AdminLanguage.pageNumForm,true);
	    }); 
 
        var tr = $( "#adminmultilanguage-example_wrapper #filtersearch" ).children();
		$("#ordercf").empty().append(tr); 

		
	
      
    },
    Edit: function (a) {


        var d = false;
        if (a) {
            d = true
        }

        if (d) {

            Main.Loading();		    
			var gk = new Date().getTime();
			Main.Aid = gk;
           
		    $.post("lib/panel-configs.php", "f=FetchLanguagemanageDataAdmin&id=" + a, function (b) {
				
			    if (gk != Main.Aid) {
					return
				}

           		Main.Ready();
							
				AdminLanguage.Form(JSON.parse(b));				
			})
        }
    },

    Form: function (e) {
		AdminLanguage.pageNumForm = AdminLanguage.paginationnumber;
		
        Forms.Clean("lang", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.lang.type = "create"
        } 
		else if(e.mode == 0) {
            Forms.Form.lang.type = "create"
			}
		else {
            Forms.Form.lang.type = "modify";
            Forms.Form.lang.id = e.id
        }
		 //Forms.Form.lang.lang = e;
        this.ActiveForm = "ad";
		
         var k = "";
		if (Forms.Form.lang.type == "create" || e.mode==0) {
			k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANGUAGE']?></h3>'
		}else{
			k += '<h3 class="popup-heading"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANGUAGE_UPDATE']?></h3>'   
		}   
	  
            	
		k +='<div class="row">'
		k +='<ul class="pop_lang_img">'
		flaginfo=AdminLanguage.language[0].flaginfo;
		for(Z in flaginfo){
			var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
			if(flaginfo[Z].id == AdminLanguage.default_lang_id){								  
				k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="AdminLanguage.show_id1('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
			}else{
				k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="AdminLanguage.show_id1('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'	
			}
		}

		k +='</ul>'
		k +='</div>'<!--row-->
		k +='<div class="flage_wrapper">'
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_VARIABLR1']?></label>'
		if(e.id){
			k +=Forms.CreateInputPropertydisreadonlyPopup("lang", "lang_key", e.lang_key, true, "AdminLanguage.PreValidation()")  
		}else{
			k +=Forms.CreateInputPropertyPopup("lang", "lang_key", "", true, "AdminLanguage.PreValidation()")
		}
		k +='<small data-bv-validator="notEmpty" class="help-block" id="lang_key_text" style="color:#F00;display:none;"><?=$lang_resource['LANGUAGE_VALIDATION_LANGUAGE_VARIABLE'] ?></small>'
		k +='</div>'
		k +='</div>'<!--col-md-12-->
		k +='</div>'<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_TEXT1']?></label>'

		for(var p in flaginfo){
			var i=flaginfo[p].id;
			var as = "langtext_"+i;
			if (Forms.Form.lang.type == "create") {
				var langvalue = '';	
			}else{
				var langvalue = e.langtext[as];
			}
			if(flaginfo[p].id == AdminLanguage.default_lang_id){			
				k +='<input type="text" id="langtext_'+flaginfo[p].id+'" style="display:block;" class="form-control"  value="'+Main.NullToEmpty(langvalue)+'"/>'
			}else{
				k +='<input type="text" id="langtext_'+flaginfo[p].id+'" style="display:none;" class="form-control"  value="'+Main.NullToEmpty(langvalue)+'"/>'
			}
		}

		k +='<small data-bv-validator="notEmpty" class="help-block" id="langtext_text" style="color:#F00;display:none;"><?=$lang_resource['LANGUAGE_VALIDATION_LANGUAGE_TEXT']?></small>'
		k +='</div>'
		k +='</div>'<!--col-md-12-->
		k +='</div>'<!--row-->
		k +='</div>'<!--flage_wrapper-->
		k +='<div class="row">'
		k +='<div class="col-md-6 col-md-offset-3">'

		if (Forms.Form.lang.type == "create" || e.mode==0) {
			k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="AdminLanguage.PreSave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE']?></button></center>'
		}else{
			k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="AdminLanguage.PreSave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE']?></button></center>'	  
		}
		k +='</div>'<!--col-md--->
		k +='</div>'<!--row-->

		Popup.Show(k);
		$("#name").focus();
    },
    show_id1 : function(ID){
		
		for(Z in flaginfo){
			document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
			document.getElementById("langtext_"+flaginfo[Z].id).style.display  = "none";
		}
		
		if(Forms.Form.lang.fields.langid) {
		    Forms.Form.lang.fields.langid.value = ID;
		}
		
		document.getElementById("langFlag-"+ID).className  = 'active';
		document.getElementById("langtext_"+ID).style.display  = "block";
	},
	PreValidation: function(){
   		var count = 0;	    
    	if(document.getElementById("lang_key").value == ""){
            $("#lang_key_text").show();
            $("#lang_key").addClass("error-text-field");
            $("#lang_key").removeClass("success-text-field");
            count ++;
        }else{
        	$("#lang_key_text").hide();
            $("#lang_key").addClass("success-text-field");
            $("#lang_key").removeClass("error-text-field");
        }
        if(count == 0)
        	return true
        else 
        	return false  
    },
	
	
	
	PreSave: function () {
		
		if(AdminLanguage.PreValidation()== false){			
			return	
		}		
		if(document.getElementById("langtext_"+AdminLanguage.default_lang_id).value == ""){
			alert("<?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_DEFAULT_TEXT_REQUIRED']?>")
			return
			
		}	
		
		AdminLanguage.lang = new Object();		
		/*for(var t in flaginfo){
			AdminLanguage.lang["langtext_"+flaginfo[t].id]= document.getElementById("langtext_"+flaginfo[t].id).value.split("+").join("@@");
		}*/
		for(var t in flaginfo){
			if(document.getElementById("langtext_"+flaginfo[t].id).value !=""){
				AdminLanguage.lang["langtext_"+flaginfo[t].id]= document.getElementById("langtext_"+flaginfo[t].id).value.split("+").join("@@");
			}			
		}
		Forms.Form.lang.fields.langtext = AdminLanguage.lang;

		if(AdminLanguage.PreValidation() != true){
            return false     
        }
		
		for(var s in Forms.Form.lang.fields.langtext){			
			Forms.Form.lang.fields.langtext[s] = window.btoa(unescape(encodeURIComponent(Forms.Form.lang.fields.langtext[s])))
			Forms.Form.lang.fields.langtext[s] = Forms.Form.lang.fields.langtext[s].split("+").join("@@");
		}
		$.post("lib/panel-configs.php", "f=SaveManageLanguageAdminAvailabilityCheck&data=" + JSON.stringify(Forms.Form.lang), function (d) {
			
		if(d.trim() == "ok"){
        alert("<?=$lang_resource['ADMIN_PANEL_MANAGELANGUAGE_LANG_KEY_EXIT']?>");
		for(var s in Forms.Form.lang.fields.langtext){			
			Forms.Form.lang.fields.langtext[s] = decodeURIComponent(escape(window.atob(Forms.Form.lang.fields.langtext[s])))
			Forms.Form.lang.fields.langtext[s] = Forms.Form.lang.fields.langtext[s].split("@@").join("+");
		}
        }else{
        
        AdminLanguage.Save();
        
        }

        });

    },
	
	
	
    Save: function () {
		


	    var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading();
		
	    $.post("lib/panel-configs.php", "f=SaveAdminManagelang&data=" + JSON.stringify(Forms.Form.lang), function (f){
			
			if(f.trim()=="Already Exist")
				alert("<?=$lang_resource['ADMIN_PAGE_MANAGE_ALREADY_EXIST']?>");
			
            Main.Ready();
            if (b != Main.Aid){
                return;
            }
			Popup.Close();
			
			AdminLanguage.Main_Next();
			
		});	
		Forms.Clean("lang")
    },
};