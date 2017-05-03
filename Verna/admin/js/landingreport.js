 var Landing_Report = 
 {
    Main: function () {
        Landing_Report.namelang = Array();
        Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;

        $.post("lib/landingreport.php", "f=FetchAllReportData", function (b) {        
       // alert(JSON.stringify(b))    
         
           
            Main.Ready();
            if (b != "") {
              
                Landing_Report.Landing_Report = JSON.parse(b);
                
            } else {
                alert("Error")
            }
            Landing_Report.PrintMain();
           
        })
    },
    PrintMain: function () {

      var c = "";
  
      c +='<div class="row">'
      c +='<div class="top-bar">'
      c +='<div class=" col-md-6 col-md-offset-6">'
      c +='<div class=" pull-right">'
      c +='<button class="btn btn-default btn-rounded-lg close-btn" onclick="Home.Main()"><i class="fa icon-close"></i><?= $lang_resource['ADMIN_PAGE_CANCEL'] ?></button>'
      c +='</div>'
      c +='</div>'
      <!--col-md-5-->
      
      c +='</div>'
      <!--top-bar-->
      c +='</div>'
      <!--row-->
      
      
      c +='<div class="panel panel-danger panel-square panel-no-border">'
      c +='<div class="panel-heading panel-heading-2">'
      c +='<div class="row">'
      c +='<div class="col-md-4">'
      c +='<h3 class="panel-title-2"><?=$lang_resource['LANDING_REPORT_HEADING']?></h3>'
      c +='</div>'
      <!--col-md-5--> 
      c +='<div class="col-md-3">'
      c +='<div class="panel-btn filtr_margin">'
      c +='<input type="text" id="asearch" class="form-control rounded panel-red-field white-placeholder" style="display:none" placeholder="<?= $lang_resource['ADMIN_PAGE_Filter'] ?>">'
      c +='</div>'
      c +='</div>'
      <!--col-md-3-->
      c +='<div class="col-md-5">'
      c +='<div class="panel-btn pull-right">'
      c +='<div class="inline-popups ">'
      c +='<span class=" panel-btn-2">'
      //c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:Business_Review.New()" data-effect="mfp-zoom-in"><i class="fa icon-plus"></i> <?=$lang_resource['BUSINESS_REVIEW_ADD']?></a>'
      c +='</span>'
      c +='<span class=" panel-btn-2">'
      
      c +='</span>'
      c +='<span class=" panel-btn-2">'
      
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
      c +='<table class="table table-th-block table-striped tbl_enebal">'
      c +='<thead>'
      c +='<tr>'
      c +='<th width="3%"><?=$lang_resource['LANDING_REPORT_HEADING_ID']?></th>'
      c +='<th width="3%"><?=$lang_resource['LANDING_REPORT_HEADING_NAME']?></th>'
      c +='<th width="10%"><?=$lang_resource['LANDING_REPORT_HEADING_POSTCODE']?></th>'
      c +='<th width="15%"><?=$lang_resource['LANDING_REPORT_HEADING_EMAIL']?></th>'
      c +='</tr>'
      c +='</thead>'
      c +='<tbody id="Landing_Report">'
      c +='</tbody>'
      c +='</table>'
      c +='</div>'
      <!--table-responsive-->
      c +='</div>'
      <!-- /.panel-body -->
      c +='</div>'


    /////////////////////////////////////New Tab with Photo//////////////////////////////////
   



      
        //alert(c);
      document.getElementById("main").innerHTML = c;

    // document.getElementById("asearch").onkeyup = function () {
        //  Business_Review.PupulateTable(Main.Config.Business_Review.List.SortBy, true)
     // };
        
      //Business_Review.PupulateTable(Main.Config.Business_Review.List.SortBy, true)
      Landing_Report.PupulateTable()
    

    },
    
    PupulateTable: function () {
        
        var d = "";

        var b = this.Landing_Report.length;
        var j = true;
        var g = "";
         var f = new Array();
        var l = new Array();
        //alert(JSON.stringify(Business_Review.Business_Review));
        for (var e in Landing_Report.Landing_Report) {
             f.push(Landing_Report.Landing_Report[e])
            j = true;
            if (j) {
                
                d += '<tr>'
                d += '<td>'+ this.Landing_Report[e].id +'</td>'
                
      
                
                
                d += '<td class="hand">' + this.Landing_Report[e].name +'</td>'

                d += '<td class="hand">' + this.Landing_Report[e].postcode +'</td>'
                d += '<td class="hand">' + this.Landing_Report[e].email +'</td>'
                d += '</tr>'
       
        
            }
        }
        document.getElementById("Landing_Report").innerHTML = d;
          
       // var h = false;
        
       
        
        //Switch.Init();
//alert(JSON.stringify(l))
        /*for (e in l) {
           var h = false;
        
            if (l[e].enabled == "t") {
                h = true
            } else {
                h = false
            }
            //alert(l[e].id);
  //          alert(h);
            Switch.Create("switch_" + l[e].id, h);
            
            Switch.OnChange("switch_" + l[e].id, function (m, i) {
                Business_Review.SetEnabled(m.replace("switch_", ""), i)
            })
       
        }
*/
    },

    
};
