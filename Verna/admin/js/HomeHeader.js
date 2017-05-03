var HomeHeader = {
		Main: function () {
			
        Main.Loading();	
		var a = new Date().getTime();
        Main.Aid = a;	
		$.post("lib/bannerimage.php", "f=FetchAllBanner", function (b) {		
			if (a != Main.Aid) {
	                return
	        }
			Main.Ready(); 			
			HomeHeader.PrintMain(JSON.parse(b));				
		})
	},
	
	PrintMain: function(e){
	var c="";
	Forms.Clean("homeheader", "mainbuttonok");
	
	if(e.status1==true){		
	if(IS_SCRIPTID == 0) {		
	var src1= '../panel/images/banner/home1/splited.jpg?time1=' + new Date().getTime();
		} else {
	var src1= '../panel/images/banner/home1/'+IS_SCRIPTID+'/splited.jpg?time1=' + new Date().getTime();		
				}
	}else{
		var src1= 'images/dummy/default_banner.png';
	}
	if(e.status2==true){	
	if(IS_SCRIPTID == 0) {					
		var src2= '../panel/images/banner/home2/splited.jpg?time2=' + new Date().getTime();
		} else {
		var src2= '../panel/images/banner/home2/'+IS_SCRIPTID+'/splited.jpg?time2=' + new Date().getTime();
		}
	}else{
		var src2= 'images/dummy/default_banner.png';
	}
	if(e.status3==true){		
	
	if(IS_SCRIPTID == 0) {					
		var src3= '../panel/images/banner/home3/splited.jpg?time3=' + new Date().getTime();
		} else {
		var src3= '../panel/images/banner/home3/'+IS_SCRIPTID+'/splited.jpg?time2=' + new Date().getTime();
		}		
		
	}else{
		var src3= 'images/dummy/default_banner.png';
	}
	if(e.status4==true){				
		
		if(IS_SCRIPTID == 0) {					
		var src4= '../panel/images/banner/home4/splited.jpg?time4=' + new Date().getTime();
		} else {
		var src4= '../panel/images/banner/home4/'+IS_SCRIPTID+'/splited.jpg?time2=' + new Date().getTime();
		}	
	}else{
		var src4= 'images/dummy/default_banner.png';
	}
	
	c +='<div class="tab-box">'
    c +='<div class="row">'
    c +='<div class="col-md-6">'
    c +='<div class="form-group">'
	c +='<label><?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BANNER1']?></label>'
	c +='&nbsp;&nbsp;&nbsp;<small style="font-weight:400">Size 1349 px * 771 px. JPG files.</small>'
	c +='<div class="input-group">'
	c +='<input type="text" id="imagefile1" class="form-control " readonly>'
	c +='<span class="input-group-btn">'
	c +='<span class="btn btn-default btn-file btn-light ">'
	c +='<form id="uform_bimg1" name="uform_bimg1" enctype="multipart/form-data" method="post" >';
    c +='<?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BROWSE']?><input id="uploadImage1" type="file" name="uploadImage" onChange="HomeHeader.PreviewImage(1);" >'
    c += '<input id="showImage1" name="showImage1" type="hidden" value=""  />';
    c += '<input type="submit" name="submit" onclick="HomeHeader.triggerImageupload(1)" style="display:none" />';
    c += '</form>';
	c +='</span>'
    c +='</span>'
    c +='</div>'
	<!-- /.input-group -->
    c +='<div class="top-logo-box ">'
    c +='<img id="uploadPreview1" src="'+src1+'" width="269" height="173" >'
    c +='</div>'
	c +='</div>'
    c +='</div>'
	<!--col-md-6-->
    c +='<div class="col-md-6">'
    c +='<div class="form-group">'
	c +='<label><?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BANNER2']?></label>'
	c +='&nbsp;&nbsp;&nbsp;<small style="font-weight:400">Size 1349 px * 771 px. JPG files.</small>'
	c +='<div class="input-group">'
	c +='<input type="text" id="imagefile2" class="form-control " readonly>'
	c +='<span class="input-group-btn">'
	c +='<span class="btn btn-default btn-file btn-light rounded">'
	c +='<form id="uform_bimg2" name="uform_bimg2" enctype="multipart/form-data" method="post" >';
    c +='<?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BROWSE']?><input id="uploadImage2" type="file" name="uploadImage1" onChange="HomeHeader.PreviewImage(2);" >'
    c += '<input id="showImage2" name="showImage2" type="hidden" value=""  />';
    c += '<input type="submit" name="submit" onclick="HomeHeader.triggerImageupload(2)" style="display:none" />';
    c += '</form>';
	c +='</span>'
    c +='</span>'
    c +='</div>'
	<!-- /.input-group -->
    c +='<div class="top-logo-box rounded">'
    c +='<img id="uploadPreview2" src="'+src2+'" width="269" height="173" >'
    c +='</div>'
	c +='</div>'
    c +='</div>'
	<!--col-md-6-->
    c +='</div>'
	<!--row-->
    c +='<div class="row">'
    c +='<div class="col-md-6">'
    c +='<div class="form-group">'
	c +='<label><?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BANNER3']?></label>'
	c +='&nbsp;&nbsp;&nbsp;<small style="font-weight:400">Size 1349 px * 771 px. JPG files.</small>'
	c +='<div class="input-group">'
	c +='<input type="text" id="imagefile3" class="form-control " readonly>'
	c +='<span class="input-group-btn">'
	c +='<span class="btn btn-default btn-file btn-light ">'
	c +='<form id="uform_bimg3" name="uform_bimg3" enctype="multipart/form-data" method="post" >';
    c +='<?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BROWSE']?><input id="uploadImage3" type="file" name="uploadImage2" onChange="HomeHeader.PreviewImage(3);" >'
    c += '<input id="showImage3" name="showImage3" type="hidden" value=""  />';
    c += '<input type="submit" name="submit" onclick="HomeHeader.triggerImageupload(3)" style="display:none" />';
    c += '</form>';
	c +='</span>'
    c +='</span>'
    c +='</div>'
	<!-- /.input-group -->
    c +='<div class="top-logo-box ">'
    c +='<img id="uploadPreview3" src="'+src3+'" width="269" height="173" >'
    c +='</div>'
	c +='</div>'
    c +='</div>'
	<!--col-md-6-->
    c +='<div class="col-md-6">'
    c +='<div class="form-group">'
	c +='<label><?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BANNER4']?></label>'
	c +='&nbsp;&nbsp;&nbsp;<small style="font-weight:400">Size 1349 px * 771 px. JPG files.</small>'
	c +='<div class="input-group">'
	c +='<input type="text" id="imagefile4" class="form-control " readonly>'
	c +='<span class="input-group-btn">'
	c +='<span class="btn btn-default btn-file btn-light rounded">'
	c +='<form id="uform_bimg4" name="uform_bimg4" enctype="multipart/form-data" method="post" >';
    c +='<?=$lang_resource['ADMIN_PAGE_HOMEHEADER_BANNER4']?><input id="uploadImage4" type="file" name="uploadImage3" onChange="HomeHeader.PreviewImage(4);" >'
    c += '<input id="showImage4" name="showImage4" type="hidden" value=""  />';
    c += '<input type="submit" name="submit" onclick="HomeHeader.triggerImageupload(4)" style="display:none" />';
    c += '</form>';
	c +='</span>'
    c +='</span>'
    c +='</div>'
	<!-- /.input-group -->
    c +='<div class="top-logo-box rounded">'
    c +='<img id="uploadPreview4" src="'+src4+'" width="269" height="173" >'
    c +='</div>'
	c +='</div>'
    c +='</div>'
	<!--col-md-6-->
    c +='</div>'
	<!--row-->
    c +='</div>'
	
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
			Forms.Form.homeheader.image1 = document.getElementById("showImage1").value;
		}
		if(document.getElementById("showImage2").value != ""){
			Forms.Form.homeheader.image2 = document.getElementById("showImage2").value;
		}
		if(document.getElementById("showImage3").value != ""){
			Forms.Form.homeheader.image3 = document.getElementById("showImage3").value;
		}
		if(document.getElementById("showImage4").value != ""){
			Forms.Form.homeheader.image4 = document.getElementById("showImage4").value;
		}

		Main.Loading();	
		var a = new Date().getTime();
        Main.Aid = a;	
		$.post("lib/bannerimage.php", "f=SaveBanner&data=" + JSON.stringify(Forms.Form.homeheader), function (b) {		
			if (a != Main.Aid) {
	                return
	        }
			Main.Ready(); 
			HomeHeader.Main();	
		});
		
		/*Main.Request("bannerimage", null, "f=SaveBanner&data=" + JSON.stringify(Forms.Form.homeheader), "HomeHeader.Main()");
		HomeHeader.Main();*/
		
		Forms.Clean("homeheader")
	},
	
};