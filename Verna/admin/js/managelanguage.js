var Managelanguage = {
	Main: function(){
		Managelanguage.pageNumForm = 0;
		Managelanguage.Main_Next();
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
				Managelanguage.language = JSON.parse(b);				
				Managelanguage.default_lang_id =  Managelanguage.language[0].default_lang_id;
				Managelanguage.PrintMain()
			}else{
                alert("Error")
            }	
        })
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
	
	
	
	
	
	
	
	PrintMain: function () {

	//	a = JSON.parse(a);
       // var b = "";
        var c = "";
		
		c+='<div class="row">'
        c+='<div class="top-bar">'
                        
        c+='<div class=" col-md-6 col-md-offset-6">'
                       
        c+='<div class=" pull-right">' 
                                    
                                   
        c+='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
                    
        c+='</div>'<!--col-md-5-->
                                                            
        c+='</div>'<!--top-bar-->
        c+='</div>'<!--row-->
		
		
		c+='<div class="panel panel-danger panel-no-border">'
        c+='<div class="panel-heading panel-heading-2">'                    
        c+='<div class="row">'
        c+='<div class="col-md-7">'
        c+='<h3 class="panel-title-2"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANGUAGE']?></h3>'
        c+='</div>'<!--col-md-5-->
                            
        c+='<div class="col-md-3">'
        c +='<div class="" id="orderf">'
		
		c +='</div>'
        c+='</div>'<!--col-md-3-->
                            
        c+='<div class="col-md-2">'
		c+='<div class="panel-btn pull-right">'
                  
        c+='<div class="inline-popups ">'
                                                    
        c+='<span class=" panel-btn-2">'
        c+='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Managelanguage.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_ADD']?></a>'
        c+='</span>'                        
        c+='</div>'
							
            
        c+='</div>'
        c+='</div>'<!--col-md-4-->
                            
        c+='</div>'<!--row-->

        c+='</div>'
        c+='<div class="panel-body">'
        c+='<div class="table-responsive">'
        c+='<table id="multilanguage-example" class="table table-th-block table-striped tbl_enebal">'
        c+='<thead>'
        c+='<tr>'
        c+='<th style="width:15% !important;" onclick="Managelanguage.PupulateTable(\'id\')" class="hand"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ID']?></th>'
        c+='<th style="width:20% !important;" class="hand"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_VARIABLR']?></th>'
        c+='<th style="width:20% !important;" class="hand"><?=$lang_resource['ADMIN_PAGE_MANAGE_DEFAULT_LANG_HEADER']?></th>'
        c+='<th style="width:20% !important;" class="hand"><?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_FLAG']?></th>'
        c+='<th style="width:12.5% !important;"><?=$lang_resource['BUSINESS_TAB_PRODUCT_OPTION_POPULATE_ACTION']?></th>'
        c+='</tr>'
        c+='</thead>'
        c+= '<tbody id="language_code">'
        
        
        
                    										
        c+='</tbody>'
        c+='</table>'
        c+='</div>'<!--table-responsive-->

        c+='</div>'<!-- /.panel-body -->
        c+='</div>'


        <!-- Admin Language -->
        //c +='<div id="admin_language"></div>'
        <!-- Admin Language -->
		
		
        document.getElementById("main").innerHTML = c;
        $("#ga").focus()
		

		Managelanguage.PupulateTable(Main.Config.language.List.SortBy, true)
		//AdminLanguage.Main();
		
    },
	 PupulateTable: function (a, c) {
        var d = "";
    
        if (!c) {
            Main.SaveConfig()
        }
		
        var j = false;
        var g = "";
        var l = new Array();
	
		
        for (var e in this.language[0].langdata) {
				d+='<tr>'
       			d+='<td>'+ this.language[0].langdata[e].id +'</td>'
        		d+='<td>'+ Main.NullToEmpty(this.language[0].langdata[e].lang_key) +'</td>'
        		d+='<td>'+ Main.NullToEmpty(this.language[0].langdata[e].lang_default) +'</td>'
        		d+='<td>'
        		d+='<ul class="lang_img">';
				flaginfo=this.language[0].flaginfo;
							
				for(Z in flaginfo)
				{
				var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
					if(flaginfo[Z].id==Managelanguage.default_lang_id)
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
        		/*d+='<li><img src="images/lang-2.png"></li>'
        		d+='<li class="deactive"><img src="images/lang-3.png"></li>'
        		d+='<li class="deactive"><img src="images/lang-4.png"></li>'*/
				
        		d+='</ul>'
        		d+='</td>'
        		d+='<td><button class="edit_lang_btn" type="button" onclick="Managelanguage.Edit('+this.language[0].langdata[e].id+')"><?=$lang_resource['ADVERTISEMENT_EDIT']?></button></td>'
        		d+='</tr>'
				
		}
	
        document.getElementById("language_code").innerHTML = d;

        $(document).ready(function () {
            $('#multilanguage-example').dataTable({           
				"iDisplayLength": 5,
				"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]], 
				"oLanguage": { "sSearch": '',"sInfo": "<?= $lang_resource['ADMIN_PAGE_TOTAL_ORDERS'] ?> : _START_ - _END_ / <span>_TOTAL_</span>" },
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0 ] }],
				"fnHeaderCallback": function( nHead, aData, iStart, iEnd, aiDisplay ) {
					//alert("iStart"+iStart)
					//alert("iEnd"+iEnd)
					var perpage = iEnd - iStart;
					//alert("perpage"+perpage)
					var pagenum = iEnd / perpage;
					Managelanguage.paginationnumber = Math.ceil(pagenum)  - 1;					
					//alert("pagenum"+Math.ceil(pagenum))	
					//alert("paginationnumber"+Managelanguage.paginationnumber)	

				},
			});
			var table = $('#multilanguage-example').dataTable();
			//alert("pagin"+AdminLanguage.pageNumForm)
			table.fnPageChange(Managelanguage.pageNumForm,true);
        });
        var fr = $( "#filtersearch" ).children();
		$("#orderf").empty().append(fr); 
      
    },
	
	
	
	
	New: function () {
        var a = this;
       
		
			
		Main.GetFranchisesData("Managelanguage.Form()")
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
           
		    $.post("lib/panel-configs.php", "f=FetchLanguagemanageData&id=" + a, function (b) {
				
			    if (gk != Main.Aid) {
					return
				}

           		Main.Ready();
				//Managelanguage.Form1(JSON.parse(b));				
				Managelanguage.Form(JSON.parse(b));				
			})
        }
    },
	

	Form: function (e) {
		Managelanguage.pageNumForm = Managelanguage.paginationnumber;
		
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
		flaginfo=this.language[0].flaginfo;
		for(Z in flaginfo){
			var p = "../panel/images/lang/" + Main.NullToEmpty(flaginfo[Z].id) + "/1/mini.jpg?c=" + new Date().getTime();
			if(flaginfo[Z].id == Managelanguage.default_lang_id){								  
				k+='<li class="active" id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Managelanguage.show_id1('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'
			}else{
				k+='<li  id="langFlag-'+flaginfo[Z].id+'"><a href="javascript:void(0)" onClick="Managelanguage.show_id1('+flaginfo[Z].id+')"><img src="'+p+'"" ></a></li>'	
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
			k +=Forms.CreateInputPropertydisreadonlyPopup("lang", "lang_key", e.lang_key, true, "Managelanguage.PreValidation()")  
		}else{
			k +=Forms.CreateInputPropertyPopup("lang", "lang_key", "", true, "Managelanguage.PreValidation()")
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
			if(flaginfo[p].id == Managelanguage.default_lang_id){
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
			k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Managelanguage.PreSave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_CREATE']?></button></center>'
		}else{
			k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Managelanguage.PreSave()"><?=$lang_resource['BUSINESS_TAB_DELIVERY_ZONE_DELIVERY_UPDATE']?></button></center>'	  
		}
		k +='</div>'<!--col-md--->
		k +='</div>'<!--row-->

		Popup.Show(k);
		$("#name").focus();
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
		
		if(Managelanguage.PreValidation()== false){			
			return	
		}		
		if(document.getElementById("langtext_"+Managelanguage.default_lang_id).value == ""){
			alert("<?=$lang_resource['ADMIN_PAGE_MANAGE_LANG_DEFAULT_TEXT_REQUIRED']?>")
			return
			
		}	
		
		Managelanguage.lang = new Object();	
		/*for(var t in flaginfo){
			Managelanguage.lang["langtext_"+flaginfo[t].id]= document.getElementById("langtext_"+flaginfo[t].id).value.split("+").join("@@");
		}*/
		for(var t in flaginfo){
			if(document.getElementById("langtext_"+flaginfo[t].id).value !=""){
				Managelanguage.lang["langtext_"+flaginfo[t].id] = document.getElementById("langtext_"+flaginfo[t].id).value.split("+").join("@@");
			}			
		}
		Forms.Form.lang.fields.langtext = Managelanguage.lang;
		
		
		

		if(Managelanguage.PreValidation() != true){
            return false     
        }
		
		for(var s in Forms.Form.lang.fields.langtext){			
			Forms.Form.lang.fields.langtext[s] = window.btoa(unescape(encodeURIComponent(Forms.Form.lang.fields.langtext[s])))
			Forms.Form.lang.fields.langtext[s] = Forms.Form.lang.fields.langtext[s].split("+").join("@@");
		}
		
		Main.Loading();
		$.post("lib/panel-configs.php", "f=SaveManageLanguageAvailabilityCheck&data=" + JSON.stringify(Forms.Form.lang), function (d) {
			Main.Ready();
	        if(d.trim() == "ok"){
				
		        alert("<?=$lang_resource['ADMIN_PANEL_MANAGELANGUAGE_LANG_KEY_EXIT']?>");
				for(var s in Forms.Form.lang.fields.langtext){			
					Forms.Form.lang.fields.langtext[s] = decodeURIComponent(escape(window.atob(Forms.Form.lang.fields.langtext[s])))
					Forms.Form.lang.fields.langtext[s] = Forms.Form.lang.fields.langtext[s].split("@@").join("+");
				}
				
			}else{        
	        	Managelanguage.Save();        
	        }
        });

    },
	
	
	
	Save: function () {
		

	    var b = new Date().getTime();
        Main.Aid = b;
        Main.Loading();
		

	    $.post("lib/panel-configs.php", "f=SaveManagelang&data=" + JSON.stringify(Forms.Form.lang), function (f){
			
			if(f.trim()=="Already Exist")
				alert("<?=$lang_resource['ADMIN_PAGE_MANAGE_ALREADY_EXIST']?>");
			
            Main.Ready();
            if (b != Main.Aid){
                return;
            }
			Popup.Close();
			
			Managelanguage.Main_Next();
			
		});	
		Forms.Clean("lang")
    },
	
	
	
};
	
