var Business_Photo={
	
	Main:function(){
	
		$.post("lib/Business_Review.php", "f=FetchAllBusinessDataP", function (c) {		
			Business_Photo.businessrest = JSON.parse(c);		
		})
	
		$.post("lib/Business_Review.php", "f=FetchAllBusinessReviewPhotoData", function (e) {
           // alert(e)
             if(e !=""){
             	Business_Photo.Business_Photo = JSON.parse(e);
          Business_Photo.PopulatTable(JSON.parse(e));
        }
    });

	},
	PopulatTable: function(){
		
		 var bp="";
		//var b = PopulatTable.length;
		 var b = this.Business_Photo.length;
		 
        var j = true;
        var g = "";
	//	var data = new Array();
		 var f = new Array();
        var l = new Array();

		for (var e in Business_Photo.Business_Photo) {
			 f.push(Business_Photo.Business_Photo[e])
			//alert(this.Business_Photo[e].id)
			bp +='<tr>'
	        bp += '<td>'+ this.Business_Photo[e].id +'</td>'
	        bp += '<td><input type="checkbox" class="Business_Review_Photo checkbox" value="' + this.Business_Photo[e].id + '"></td>'
	        
	        bp += '<td class="hand" onclick="Business_Photo.Edit1(' + this.Business_Photo[e].id+ ')">'+ this.Business_Photo[e].name +'</td>'
	        bp += '<td class="hand" onclick="Business_Photo.Edit1(' + this.Business_Photo[e].id+ ')">'+ Main.NullToEmpty(this.Business_Photo[e].email) +'</td>'
	        bp += '<td class="hand" onclick="Business_Photo.Edit1(' + this.Business_Photo[e].id+ ')">'+ this.Business_Photo[e].bname +'</td>'

	        //bp += '<td>' + this.Business_Photo[e].email +'</td>'

	        //bp += '<td>' + this.Business_Photo[e].bname +'</td>'

	       bp +='<td> <ul class="review-photo">'
		 
		   
	   	  var data1 =this.Business_Photo[e].photos
		 
		  var data = JSON.parse(this.Business_Photo[e].photos)
		 
	    var ig="../panel/images/gallery/"+data[0]+"/gallery.jpg?c=" + new Date().getTime();
	       bp +='<li id="showImage5"><img style="width:82px;height:56px" src="'+ig+'"></li>'
						//bp +='<li><img src="images/reviews-photo.png"></li>'
						//bp +='<li><img src="images/reviews-photo.png"></li>'
	        bp +='</ul>'
	        bp +='</td>'
			 var noofphoto = (JSON.parse(this.Business_Photo[e].photos)).length
		
		 
			bp += '<td class="hand" onclick="Business_Photo.Edit1(' + this.Business_Photo[e].id+ ')">'+ noofphoto +'</td>'
			
	        bp += '<td>'
			//alert(this.Business_Photo[e].view_status);
	                if(this.Business_Photo[e].view_status=='f'){
	                    bp += '<a href="javascript:void(0)" id="unread1" class="text-unread" >Unread</a>'
	                    bp += '<a href="javascript:void(0)" id="read1" class="text-read" style="display:none;">Read</a>'
	                }else{
	                    bp += '<a href="javascript:void(0)" id="unread1" class="text-unread" style="display:none;">Unread</a>'
	                    bp += '<a href="javascript:void(0)" id="read1" class="text-read" >Read</a>'
	                }
	                bp+='</td>'
	        bp += '<td><div class="enebal" id="switchb_' + this.Business_Photo[e].id + '"></div></td>'

	        bp +='</tr>'
		}
		
			document.getElementById("Business_Review_Photo").innerHTML = bp;
			 var h = false;
			//Switch.Init();
			for (d in f) {
				if (f[d].enabled == "t") {
					h = true
				} else {
					h = false
				}
				Switch.Create("switchb_" + f[d].id, h);
				Switch.OnChange("switchb_" + f[d].id, function (l, i) {
					Business_Photo.SetEnabled(l.replace("switchb_", ""), i)
				})
			}

		        
	},
	SetEnabled: function (b, a) {
        Estr = "";
        if (a) {
            Estr = "true"
        } else {
            Estr = "false"
        }
        $.post("lib/Business_Review.php", "f=SetEnabled_p&id=" + b + "&enabled=" + Estr, function (c) {
        	//alert(c)
            if (c != "ok") {
                Switch.SwitchTo("switchb_" + b, !a)
            }

        })
    },
	
	New: function () {
        
      Business_Photo.Form1();
    },
	
	
	Edit1: function(a){
	
        var d = false;
        if (a) {
            d = true
        } else {
			
            var c = Main.GetMarkedCheckBoxesValues();
			
            if (c.length == 1) {
                a = c[0];
                d = true
            }else if(c.length > 1){
				alert("<?=$lang_resource['BUSINESS_REVIEW_CHECBOX_SELECT_ONE']?>");
                return
            }else{
            	alert("<?=$lang_resource['BUSINESS_REVIEW_CHECBOX_SELECT_EDIT']?>");
                return
            }
        }
		
		 if (d) {
			
            
            Main.Loading();
            $.post("lib/Business_Review.php", "f=FetchBusinessReviewDataPhoto&id=" + a, function (c) { 
                if(c != ""){
					$('#unread1').hide();
                  Estr = "true"
                  
		            
                  $.post("lib/Business_Review.php", "f=SetReadPhotos&id=" + a + "&enabled=" + Estr, function (n) {
                    if (n != "ok") {
                    }else{  
                      $('#read1').show();
                       Business_Photo.Form1(JSON.parse(c))
                       Main.Ready();
                    }
                  
                 
                  })

                }
				Business_Review.Main();
            });
			
         }
    
	},


	Form1: function (e) {

        var k = "";
        Forms.Clean("bp", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.bp.type = "create"
			Forms.Form.bp.id="";
        } else {
            Forms.Form.bp.type = "modify";
            Forms.Form.bp.id = e.id
        }
		
		if (Forms.Form.bp.type == "create") {
		k +='<h3 class="popup-heading"><?=$lang_resource['BUSINESSPHOTO_CREATE_HEADING']?></h3>'
		}else{

		k +='<h3 class="popup-heading"><?=$lang_resource['BUSINESSREVIEW_EDIT_HEADING_PHOTO']?></h3>'
		}
		
		
        <!--row-->
		k += '<form id="addphoto" name="addphoto" enctype="multipart/form-data" method="post" >';
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_NAME']?></label>'
		
		if (Forms.Form.bp.type == "create") {
		//k +='<p>'+e.name+'</p>'
		k +='<input type="text" id="name" name="name" autocomplete="off" class="form-control ">'
		}else{
		k +='<p>'+e.name+'</p>'	
			
		}
		//k +=Forms.CreateInputPropertyPopup("bp", "name", e.name, true) 
       
		k +='</div>'
		k +='</div>'<!--col-md-6-->
    	k+='</div>' <!--row-->

		
    	k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_EMAIL']?></label>'
       
		//k +='<p>'+e.email+'</p>'
		if (Forms.Form.bp.type == "create") {
		k +='<input type="text" id="email" name="email" autocomplete="off" class="form-control ">'
		}else{
		k +='<p>'+e.email+'</p>'	
		}
		//k +=Forms.CreateInputPropertyPopup("bp", "email", e.email, true) 
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		<!--row-->
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'
		k +='<label><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESS']?></label>'
		var c = new Array();
        		c.push({
            	id: "",
            	caption: ""
        	});
        	for (i in Business_Photo.businessrest) {
            c.push({
                id: Business_Photo.businessrest[i].id,
                caption: Business_Photo.businessrest[i].name
            })
        }
		
		if (Forms.Form.bp.type == "create") {
		k +='<select id="business_id" name="business_id" class="form-control">'
		k +='<option value="">Select Business</option>'
		for (i in Business_Photo.businessrest) {
		k +='<option value="'+Business_Photo.businessrest[i].id+'">'+Business_Photo.businessrest[i].name+'</option>'		
		}
		k +='</select>'
		
		}else{
		k +='<p>'+e.bname+'</p>'	
		}
		
		//k += Forms.CreateSelectPropertyPopup("bp", "business_id", c, Main.NullToEmpty(e.business_id), true, "Business_Photo.PreValidation()")
		
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
    	k +='</div>'<!--row-->

		if (Forms.Form.bp.type == "create") {
		k +='<div class="row">'
		k +='<div class="col-md-12">'
		k +='<div class="form-group">'	
		k +='<label><?=$lang_resource['CNTROL_PANEL_REVIEW_UPLOAD_PHOTO']?></label>'
		
		k +='<div class="add_photo_field">'
		k +='<input type="file" id="files" name="files[]" multiple>'
		k +='</div>'<!--add_photo_field-->
		k +='<ul class="added_photo">'
		
		k +='</ul>'		
		k +='</div>'
		k +='</div>'
		<!--col-md-6-->
		k +='</div>'
		}else{
		k+='<h5 style="margin-top:20px;"><strong><?=$lang_resource['BUSINESSREVIEW_CREATE_FIELD_BUSINESS_PHOTO']?></strong></h5>'
		 k +='<div class="row" id="updatephoto">'
    
	var data = JSON.parse(e.photos)
	Business_Photo.image =  data;
	for(var i in data)
	{
		 k +='<div class="col-md-4" id="img_'+data[i]+'">'

		var igs="../panel/images/gallery/"+data[i]+"/gallery.jpg?c=" + new Date().getTime();
	   
		k +='<img src="'+igs+'" width="100%">'
		k +='<button type="submit" class="btn btn-danger popup-submit-btn"  onclick="Business_Photo.DeletePhoto('+data[i]+','+e.id+')">Delete Photo</button>'
		k += '</div>'<!--col-md-4-->
	}
		}
     
     k+='</div>'<!--col-md-12-->
     k+= '</div>'<!--row-->
    
			k += '<div class="row">'
			k += '<div class="col-md-6 col-md-offset-3">'
			if (Forms.Form.bp.type == "create") {
				k +='<center><button type="submit" name="submit" class="btn btn-primary popup-submit-btn" onclick="Business_Photo.Save()" ><?=$lang_resource['ADMIN_PAGE_DRIVER_CREATE'] ?></button></center>'
				
				//k += '<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="Business_Photo.Save()"><?=$lang_resource['ADMIN_PAGE_DRIVER_CREATE'] ?></button></center>'
			} else {
				//k += '<center><button type="submit" onclick="Business_Photo.Save()" class="btn btn-primary popup-submit-btn"><?=$lang_resource['ADMIN_PAGE_DRIVER_UPDATE'] ?></button></center>'
			}
			
			k += '</div>'<!--col-md--->
		k += '</div>'<!--row-->

k += '</form>'
    <!--row-->





		
		Popup.Show(k);
		
       $(document).ready(function() {
	 
	 if(window.File && window.FileList && window.FileReader) {
	 $("#files").on("change",function(e) {
	 var files = e.target.files ,
	 filesLength = files.length ;
	 for (var i = 0; i < filesLength ; i++) {
	 var f = files[i]
	 var fileReader = new FileReader();
	 fileReader.onload = (function(e) {
	 var file = e.target;
	 $("<img></img>",{
	 class : "imageThumb",
	 src : e.target.result,
	 title : file.name
	 }).insertAfter(".added_photo");
	 });
	 fileReader.readAsDataURL(f);
	 }
	});
	 } else { alert("Your browser doesn't support to File API") }
	});
      
        
    },
	
	
	Save: function() {
		
		
		
		
		
	Main.Loading();
	$("#addphoto").submit(function (event) 
            {
				if(document.getElementById("business_id").value == ""){
					alert("Please select any one Shop");
					return false;
				}
				
				if(document.getElementById("files").value == ""){
					alert("Please select Photo");
					return false;
				}
                 event.preventDefault();
         
                var formData = new FormData($(this)[0]);
				
             $.ajax({
				
                        url: 'theUpload.php',
                        type: 'POST',
                        data: formData,
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (html) 
                        {
                        	Main.Ready();
                           document.addphoto.reset();
                           Popup.Close();
						   Business_Photo.Main();
						   alert('<?= $lang_resource['FRONT_PHOTO_THANK_YOU_RATING'] ?>');
                        },
                        error: function(html)
                        {
                        	Main.Ready();
                            alert(html);
                        }
                    });
                });
},
	
	Delete: function () {
		
        var b = Main.GetMarkedCheckBoxesValues();
        if (b.length == 0) {
			alert("<?=$lang_resource['BUSINESSREVIEW_CHECBOX_SELECT']?>");
            return
        }
        var a = new Object();
        a.ids = b;
		
		$.fn.jAlert({
			'message': '<?=$lang_resource['BUSIENESSREVIEW_DELETE_MSG']?>',
			'btn': [
				{'label':'Yes', 'cssClass': 'green', 'closeOnClick': true, 'onClick': function(){
					$.post("lib/Business_Review.php", "f=DeleteBusinessReview_photo&data=" + JSON.stringify(a),  function (c) {
						alert('<?=$lang_resource['BUSINESSREVIEW_DELETE_SUCCESS']?>');
						Business_Review.Main()
					
					});
				} },
				{'label':'No', 'cssClass': 'red', 'closeOnClick': true }
			],
			'closeBtn': false
			
			});
    },


    DeletePhoto: function (a,id) { 
		
      photos = JSON.stringify(Business_Photo.image);
	  
		$.post("lib/Business_Review.php", "f=DeleteFolder&id=" + a + "&photos_data=" + photos + "&data_id=" + id, function (c) { 
			 

            if (c != "ok") {
               // Switch.SwitchTo("switch_" + b, !a)
               alert("Could not be deleted.")
            }
            else{
            	
            	alert("Photo Deleted");
            	$('#img_'+a).hide();
            }

        })
		  //Popup.Close();
		  Business_Review.Main();
    },
};

