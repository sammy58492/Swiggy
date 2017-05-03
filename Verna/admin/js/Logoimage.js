var Logoimage = {	
		Main: function () {
			
        Main.Loading();
		var a = new Date().getTime();
        	Main.Aid = a;
		$.post("lib/logoimage.php", "f=FetchImageStatus", function (b) {
			if (a != Main.Aid) {
                return
            }		
			 Main.Ready(); 			
			 Logoimage.PrintMain(JSON.parse(b));		
			
		})
		
		
        
    },
	
		PrintMain: function(e){
			var c="";
			
			Forms.Clean("logoimage", "mainbuttonok");
			
			if (e == null) {
				e = new Object();
				Forms.Form.logoimage.type = "create"
			} else {
				Forms.Form.logoimage.type = "modify";				
			}
			
			if(e.status1==true){
				//alert(IS_SCRIPTID)
				if(IS_SCRIPTID == 0) {
				var src1= '../panel/images/logo/1/normal.jpg?time1=' + new Date().getTime();
				} else {
				var src1= '../panel/images/logo/1/'+IS_SCRIPTID+'/normal.jpg?time1=' + new Date().getTime();	
					}
							
				
			}else{
				var src1= 'images/dummy/default-logo_invoice.png';	
			}
			if(e.status2==true){
				if(IS_SCRIPTID == 0) {
				var src2= '../panel/images/logo/3/normal.jpg?time2=' + new Date().getTime();	
				} else {	
				var src2= '../panel/images/logo/3/'+IS_SCRIPTID+'/normal.jpg?time2=' + new Date().getTime();
				}
				
			}else{
				var src2= 'images/dummy/default-logo_invoice.png';
				
			}
		
		
			c += '<div class="tab-box">'
            c += '<div class="row">'					
            c += '<div class="col-md-6">'
            c += '<div class="form-group">'
			c += '<label><?=$lang_resource['TOPLOGO_V21']?><br>'
            c += '<small style="font-weight:400"><?=$lang_resource['LOGO_FILE_SIZE']?></small></label>'
			c += '<div class="input-group">'
			c += '<input type="text" id="imagefile1" class="form-control" readonly>'
			c += '<span class="input-group-btn">'
			c += '<span class="btn btn-default btn-file btn-light ">'
			c +='<form id="uform_bimg1" name="uform_bimg1" enctype="multipart/form-data" method="post" >';
            c +='<?= $lang_resource['ADMIN_MULTIDELIVERY_STATICS_BROWSE_REQUIRED'] ?><input id="uploadImage1" type="file" name="uploadImage1" onChange="Logoimage.PreviewImage(1);" >'
           	c += '<input id="showImage1" name="showImage1" type="hidden" value=""  />';
            c += '<input type="submit" name="submit" onclick="Logoimage.triggerImageupload(1)" style="display:none" />';
            c += '</form>';
			c += '</span>'
            c += '</span>'
            c += '</div>'
			<!-- /.input-group -->
            c += '<div class="top-logo-box ">'
			c +='<img id="uploadPreview1" src="'+src1+'">'
            c += '</div>'
			c += '</div>'
            c += '</div>'
			<!--col-md-6-->
            c += '<div class="col-md-6">'
            c += '<div class="form-group">'
			c += '<label><?=$lang_resource['BOTTOMLOGO_V21']?><br>'
            c += '<small style="font-weight:400"><?=$lang_resource['LOGO_FILE_SIZE']?></small></label>'
			c += '<div class="input-group">'
			c += '<input type="text" id="imagefile2" class="form-control" readonly>'
			c += '<span class="input-group-btn">'
			c += '<span class="btn btn-default btn-file btn-light rounded">'
			c +='<form id="uform_bimg2" name="uform_bimg2" enctype="multipart/form-data" method="post" >';
            c +='<?= $lang_resource['ADMIN_MULTIDELIVERY_STATICS_BROWSE_REQUIRED'] ?><input id="uploadImage2" type="file" name="uploadImage2" onChange="Logoimage.PreviewImage(2);" >'
           	c += '<input id="showImage2" name="showImage2" type="hidden" value=""  />';
            c += '<input type="submit" name="submit" onclick="Logoimage.triggerImageupload(2)" style="display:none" />';
            c += '</form>';
			c += '</span>'
            c += '</span>'
            c += '</div>'
			<!-- /.input-group -->
            c += '<div class="top-logo-box rounded">'
			c +='<img id="uploadPreview2" src="'+src2+'">'
            c += '</div>'
			c += '</div>'
            c += '</div>'
			<!--col-md-6-->
            c += '</div>'
			<!--row-->
            c += '</div>'
			$("#websitesetting").empty().append(c);
			
		},
		
		
		
	    triggerImageupload: function(no) {
        
        $("#uform_bimg"+no).submit(function (event) {
            
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: 'upload-image.php',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (html) {
                  
                  document.getElementById("showImage"+no).value = html
                   
                },
                error: function(){
                    alert("error in ajax form submission");
                }
            });
        });
    },

    PreviewImage: function(no) {
         
        document.getElementById("uploadPreview"+no).src ="";

        $('form#uform_bimg'+no).find('input[type="submit"]').trigger('click');
         
        var oFReader = new FileReader();

        oFReader.readAsDataURL(document.getElementById("uploadImage"+no).files[0]);
        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview"+no).src = oFREvent.target.result;
            document.getElementById("imagefile"+no).value = document.getElementById("uploadImage"+no).files[0].name;
        };        
    },
	
	Save: function(){
		if(document.getElementById("showImage1").value != ""){
			Forms.Form.logoimage.image1 = document.getElementById("showImage1").value;
		}
		if(document.getElementById("showImage2").value != ""){
			Forms.Form.logoimage.image2 = document.getElementById("showImage2").value;
		}

		Main.Loading();
		var a = new Date().getTime();
        	Main.Aid = a;
		$.post("lib/logoimage.php", "f=SaveLogo&data=" + JSON.stringify(Forms.Form.logoimage), function (b) {
			
			
			if (a != Main.Aid) {
                return
            }		
			 Main.Ready(); 			
			 Logoimage.Main();
			
		})
		
		/*Main.Request("logoimage", null, "f=SaveLogo&data=" + JSON.stringify(Forms.Form.logoimage), "Logoimage.Main()");
		Logoimage.Main();*/
		
		Forms.Clean("logoimage")
	},
};