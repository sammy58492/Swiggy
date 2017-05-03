var ZipcodePattern ={
	Main: function(){
		   Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
         $.post("lib/panel-configs.php", "f=Getzipcodevalidation", function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            ZipcodePattern.Getzipcodevalidation(b) 
         console.log(JSON.parse(b));
         
        })              
       
	},
	
	Getzipcodevalidation: function(a){
		
		 if (a == "") {
            return
        }
		
		 Main.zipcodevalidation = JSON.parse(a).zipcodevalidation;
		
		
		var c = "";
		c+= '<div class="row">'
        c+= '<div class="top-bar">'
        c+= '<div class=" col-md-6 col-md-offset-6">'
        c+= '<div class=" pull-right">'
		c+= '<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?=$lang_resource['ADMIN_PAGE_CANCEL']?></button></div>'
        c+= '</div>'
		<!--col-md-5-->
        c+= '</div>'
		<!--top-bar-->
        c+= '</div>'
		c+= '<div class="panel panel-danger panel-square panel-no-border">'
		c+= '<div class="panel-heading panel-heading-2">'
        c+= '<div class="row">'
        c+= '<div class="col-md-4">'
        c+= '<h3 class="panel-title-2"><?=$lang_resource['ZIPCODE_PATTERN'] ?></h3>'
        c+= '</div>'
	
		<!--col-md-3-->
      
		<!--col-md-4-->
        c+= '</div>'
        <!--row-->
		c+= '</div>'
		c+= '<div class="panel-body">'
        c+= '<div class="table-responsive">'
		c+= '<table class="table table-th-block table-striped">'
		c+= '<thead>'
		c+= '<tr>'
        c+= '<th width="10%"><?=$lang_resource['CITY_SUPER_POPULATE_HEADING_ID']?></th>'
           
        c+= '<th width="10%"><?= $lang_resource['ZIPCODE_VALIDATION_LENGTH'] ?></th>'
        c+= '</tr>'
		c+= '</thead>'
		c+= '<tbody id="zipcodepatternlist">'
		
		c+= '</tbody>'
		c+= '</table>'
        c+= '</div>'
		<!--table-responsive-->
        c+= '</div>'
		<!-- /.panel-body -->
		c+= '</div>'
		document.getElementById("main").innerHTML = c;
	
		ZipcodePattern.ZipCodePatternTable("id", true)
	},
	
	ZipCodePatternTable: function (b, c) {
		var d = "";
       // var a = Neighborhood.Neighborhoodlist.length;
		var h = false;
        var f = "";
        var k = new Array(); 
		
		 var i=1;
		
		for (var e in Main.zipcodevalidation) {      
       		
            h = false;
      
    			d += '<tr>'
				d += '<td>'+ i +'</td>'
                d += '<td class="hand" onclick="ZipcodePattern.Edit(' + Main.zipcodevalidation[e].length + ')">'+ Main.zipcodevalidation[e].length +' <?= $lang_resource['ZIPCODE_VALIDATION1']?></td>'
                		
    			d += '</tr>' 

 i++;				
          
        }
       
        document.getElementById("zipcodepatternlist").innerHTML = d;
		
	
		
	},
	
	
	
	Edit: function (a1) { 
     Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;
        $.post("lib/panel-configs.php", "f=Getzipcodevalidationall&value="+a1, function (b) {
            if (a != Main.Aid) {
                return
            }
            Main.Ready();
            
            ZipcodePattern.GetzipcodevalidationLength(JSON.parse(b),a1)
         
        })},
	
	
	GetzipcodevalidationLength: function (F,F1) {  

       Forms.Clean("zipcodevalidationLength", "mainbuttonok");
         if (F == null) {
            F = new Object();
             Forms.Form.zipcodevalidationLength.type = "create"
            }else{
             Forms.Form.zipcodevalidationLength.type = "modify";
         
            }
             Forms.CreateValue("zipcodevalidationLength", "length", F1);
		
		var k = "";
		
		
		var r=1;
		 var codeval= F.zipcodevalidation;
		 var loop_1 = codeval.length;
		
		
		k +='<h3 class="popup-heading">'+loop_1+' <?=$lang_resource['ZIPCODE_VALIDATION2']?></h3>'	
		
		for (var p in codeval) {
   		  d5= new Array();
           d5.push({"id":0,"caption":"Select"});
             d5.push({"id":1,"caption":"<?= $lang_resource['ZIPCODE_CHARECTER'] ?>"});
               d5.push({"id":2,"caption":"<?= $lang_resource['ZIPCODE_NUMERIC'] ?>"});
                d5.push({"id":3,"caption":"<?= $lang_resource['ZIPCODE_ALPHANUMERIC'] ?>"});
                 d5.push({"id":4,"caption":"<?= $lang_resource['ZIPCODE_SPACE'] ?>"});
		
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label>'+r+'<?=$lang_resource['ZIPCODE_VALIDATION3']?></label>'
		
        /*k += Forms.CreateSelectPropertyPopup("zipcodevalidationLength", "element"+r, d5, codeval[p].value,false,"ZipcodePattern.PreValidation("+loop_1+")")*/
		
		k += Forms.CreateSelectPropertyPopup("zipcodevalidationLength", "element"+r, d5, codeval[p].value,false)
		
        k +='</div>'
        k +='</div>'
		<!--col-md-12-->

        k +='</div>'
		
		r++;
		}
		
		
		k +='<small data-bv-validator="notEmpty" class="help-block" id="element_text" style="color:#F00;display:none;"><?=$lang_resource['ZIPCODE_VALIDATION4']?></small>'
		      
        k +='<div class="row">'
        k +='<div class="col-md-6 col-md-offset-3">'
		
		k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="ZipcodePattern.Save('+loop_1+')"><?=$lang_resource['CITY_SUPER_CREATE_FIELD_EDIT']?></button></center>'	
		
        k +='</div>'
		<!--col-md--->
        k +='</div>'
		<!--row-->
        k +='</div>'
		Popup.Show(k);
		
	},
	
	
	
	PreValidation: function(r){
   	var count = 0;  
	for(var i=1;i<=r;i++)
	{
		
		if(document.getElementById("element"+i).value != 0){			
           
            count ++;
        }
	}
        if(count == 0)
		{
			 $("#element_text").show();
        	return false
		}
        else 
		{  
		    $("#element_text").hide();
        	return true    
		}
       
    },
	
	Save: function (r) {
		
		/*if(ZipcodePattern.PreValidation(r) == false){
            return
        }*/
        /*if (Forms.CanSave("zipcodevalidationLength") == false) {
            return
        }*/
		
		 Main.Loading();
	   
        $.post("lib/panel-configs.php", "f=SaveSettingszipcodevalidationLength&value=" + JSON.stringify(Forms.Form['zipcodevalidationLength'].fields), function (c) {
			
		
       Popup.Close(); 
	   Forms.Clean("zipcodevalidationLength");
	   
		});
		
	Main.Ready();		
  
    },
	

	
};