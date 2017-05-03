var BusinessCSV = {
	 Main: function () {		
    	BusinessCSV.UploadCSV();
       
    },
    UploadCSV: function () {
		
	  $('div[id*=newpopup]').remove();	
		
	  var c = "";
	  
	  c +='<h3 class="popup-heading">CSV BUSINESS UPLOAD</h3>'
	  c +='<form name="zipcode" id="csvimage" method="post" action="javascript:BusinessCSV.CsvUpload()" enctype="multipart/form-data" >'
	  c +='<div class="row">'
	  c +='<div class="col-md-12">'
	  c +='<div class="form-group">'
	  c +='<label>Business Upload</label>'
	  c +='<input name="csvfile"  type="file" id="csvpath"  class="form-control" accept=".csv">'
	  c +='</div>'
	  c +='</div>'
	  <!--col-md-12-->
	  c +='</div>'
	  <!--row-->
	  
	  c +='<div class="row">'
	  c +='<div class="col-md-6 col-md-offset-3">'
	  c +='<center><button type="submit" class="btn btn-primary popup-submit-btn" >Upload</button></center>'
	  c +='</div>'
	  <!--col-md--->
	  c +='</form>'
	  c +='</div>'
	  <!--row-->
	  
	  
	  Popup.Show(c);
	 
    },
    CsvUpload: function(){	
		
		var csvfile=document.getElementById("csvpath").value;
        var ext = csvfile.substring(csvfile.lastIndexOf('.') + 1);
		if (ext == "csv") {	
			Main.Loading()	 
	
			var formData = new FormData($("#csvimage")[0]);
		  $.ajax({
            url: 'csv/csvbusiness.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (html) {             
			 Popup.Close();
			 Main.Ready();
			 //alert(html)
			 Business.Main();
            },
            error: function(){
                alert("Error");
			}
   
		
		});
		
		}
	},
};