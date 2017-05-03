 var UserPoints = 
 {
    Main: function () {
        UserPoints.namelang = Array();
       // Main.Loading();
        var a = new Date().getTime();
        Main.Aid = a;

        $.post("lib/userpoints.php", "f=FetchAllUserPointData", function (b) {          

          if (a != Main.Aid) {
                return
            }
           
            Main.Ready();
            if (b != "") {
              
                UserPoints.UserPoints = JSON.parse(b);
                UserPoints.PrintMain()
            } else {
                alert("Error")
            }
            
           
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
      c +='<h3 class="panel-title-2"><?=$lang_resource['USERSPOINT_HEADING']?></h3>'
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
      c +='<a class="btn btn-default btn-rounded-lg panel-red-btn" href="javascript:void(0)"  data-effect="mfp-zoom-in"><i class="fa icon-edit"></i> <?=$lang_resource['USERSPOINT_EDIT']?></a>'
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
      c +='<th width="3%" onclick="UserPoints.PupulateTable(\'id\')"><?=$lang_resource['USERSPOINT_POPULATE_HEADING_ID']?></th>'
	 c +='<th width="10%" onclick="Main.ToogleAllCheckBoxes(\'UserPoints\')"><?=$lang_resource['USERSPOINT_POPULATE_HEADING_ALL']?></th>'
      c +='<th width="10%"><?=$lang_resource['USERSPOINT_POPULATE_HEADING_CNAME']?></th>'
      c +='<th width="15%"><?=$lang_resource['USERSPOINT_POPULATE_HEADING_TOTALPOINT']?></th>'
      c +='<th width="15%"><?=$lang_resource['USERSPOINT_POPULATE_HEADING_AVAILABLEPOINTS']?></th>'
      c +='<th width="20%"></th>'
      c +='</tr>'
      c +='</thead>'
      c +='<tbody id="UserPoints">'
      c +='</tbody>'
      c +='</table>'
      c +='</div>'
      <!--table-responsive-->
      c +='</div>'
      <!-- /.panel-body -->
      c +='</div>'


    



      
        //alert(c);
      document.getElementById("main").innerHTML = c;

    // document.getElementById("asearch").onkeyup = function () {
        //  Business_Review.PupulateTable(Main.Config.Business_Review.List.SortBy, true)
     // };
        
      //Business_Review.PupulateTable(Main.Config.Business_Review.List.SortBy, true)
      UserPoints.PupulateTable()
    UserPoints.Main()

    },
    
    PupulateTable: function () {
        
        var d = "";

        var b = this.UserPoints.length;
        var j = true;
        var g = "";
         var f = new Array();
        var l = new Array();
        //alert(JSON.stringify(Business_Review.Business_Review));
        for (var e in UserPoints.UserPoints) {
             f.push(UserPoints.UserPoints[e])
            j = true;
            if (j) {
                
                d += '<tr>'
                d += '<td>'+ this.UserPoints[e].id +'</td>'
                d += '<td><input type="checkbox" class="UserPoints checkbox" value="' + this.UserPoints[e].id + '"></td>'
      
                d += '<td class="hand" onclick="UserPoints.Edit(' + this.UserPoints[e].w_id_customer + ')">'+ Main.NullToEmpty(this.UserPoints[e].customername) +'</td>'
                
                d += '<td class="hand" onclick="UserPoints.Edit(' + this.UserPoints[e].w_id_customer + ')">' + Main.NullToEmpty(this.UserPoints[e].total_points) +'</td>'

                d += '<td class="hand" onclick="UserPoints.Edit(' + this.UserPoints[e].w_id_customer + ')">' + Main.NullToEmpty(this.UserPoints[e].points_available) +'</td>'
                d += '<td class="hand"><div class="inline-popups"><a class="point-history-btn"  onclick="UserPoints.ShowHisotry(' + this.UserPoints[e].w_id_customer + ')" data-effect="mfp-zoom-in">Point History</a></div></td>'
                
                
                d+='</td>'
               
                d += '</tr>'
       
        
            }
        }
        document.getElementById("UserPoints").innerHTML = d;
          
       // var h = false;
        
         var h = false;
        Switch.Init();
        for (d in f) {
            if (f[d].enabled == "t") {
                h = true
            } else {
                h = false
            }
            Switch.Create("switch_" + f[d].id, h);
            Switch.OnChange("switch_" + f[d].id, function (l, i) {
                Business_Review.SetEnabled(l.replace("switch_", ""), i)
            })
        }
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


    

    
   
    
    Edit: function (a) {
        var d = false;
        if (a) {
            d = true
        } else {
            
            var c = Main.GetMarkedCheckBoxesValues();
            
            if (c.length == 1) {
                a = c[0];
                d = true
            }else if(c.length > 1){
                alert("<?=$lang_resource['USERSPOINT_CHECBOX_SELECT_ONE']?>");
                return
            }else{
                alert("<?=$lang_resource['USERSPOINT_CHECBOX_SELECT_EDIT']?>");
                return
            }
        }
        
         if (d) {
            
            
          //  Main.Loading();
            
            $.post("lib/userpoints.php", "f=FetchUsersPointsData&id=" + a, function (c) {
               // alert(c)
                if(c != ""){
                  
                  
                  
                  
                    
                     
                       UserPoints.Form(JSON.parse(c))
                      Main.Ready();
                      //alert("Processing..")
                    
                
                 


                }
            });
         }
    },

    show_id: function(id){
        flaginfo=Main.languageinfo
        for(Z in flaginfo){
            document.getElementById("langFlag-"+flaginfo[Z].id).className  = '';
            document.getElementById("name_"+flaginfo[Z].id).style.display  = "none";
        }
        
        document.getElementById("langFlag-"+id).className  = 'active';
        document.getElementById("name_"+id).style.display  = "block";
    },
    
    
    Form: function (e) {

        var k = "";
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "modify"
        } 
        
        

        k +='<h3 class="popup-heading"><?=$lang_resource['USERSPOINT_EDIT_HEADING']?></h3>'
        
        
        
        <!--row-->
        
        k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['USERSPOINT_CREATE_FIELD_CUSTOMERNAME']?></label>'
        
        k +=Forms.CreateInputPropertyPopupHidden("ad","id",e.customer_id)
        k +='<p>'+e.customername+'</p>'
        
        //k +=Forms.CreateInputPropertyPopup("ad", "name", e.name, true,"Business_Review.PreValidation()") 
       
        k +='</div>'
        k +='</div>'<!--col-md-6-->
    k+='</div>' <!--row-->

        
    k +='<div class="row">'
        k +='<div class="col-md-12">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['USERSPOINT_CREATE_FIELD_TOTALPOINTS']?></label>'
       
        k +='<p>'+Main.NullToEmpty(e.total_points)+'</p>'
        k +='</div>'
        k +='</div>'
        <!--col-md-6-->
        k +='</div>'

        k +='<div class="row">'
        k +='<div class="col-md-8">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['USERSPOINT_CREATE_FIELD_AVAILABLEPOINTS']?></label>'
        k += '<p>'+e.points_available+'</p>'
        k +='</div>'
        k +='</div>'
        k +='</div>'
        <!--row-->
        k +='<div class="row">'
        k +='<div class="col-md-8">'
        k +='<div class="form-group">'
        k +='<label><?=$lang_resource['USERSPOINT_CREATE_FIELD_EXTRAPOINTS']?></label>'
        k += Forms.CreateInputPropertyPopup("ad", "extra_point_added_by_super_admin", e.extra_point_added_by_super_admin, false)
        k +='</div>'
        k +='</div>'

        k +='<div class="col-md-4">'
        k +='<div class="form-group">'
        k +='<label></label>'
       // k +='<button type="submit" class="btn btn-primary popup-submit-btn" style="margin-top:24px;" onclick="UserPoints.ShowHisotry(' + e.customer_id + ')">Point History</button>'
        k +='</div>'
        k +='</div>'

        <!--col-md-6-->
        k +='</div>'<!--row-->

         k +='<div class="row">'
         k +='<div class="col-md-6 col-md-offset-3">'
         k +='<center><button type="submit" class="btn btn-primary popup-submit-btn" onclick="UserPoints.Save()"><?=$lang_resource['BUSINESSREVIEW_UPDATE']?></button></center>'
         k +='</div>'
         k +='</div>'

    <!--row-->





        
        Popup.Show(k);
        
       
      
        
    },

    
    
   
    Save: function () {
 
          for(var s in Forms.Form.ad.fields){           
             Forms.Form.ad.fields[s].value = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].value)))
            Forms.Form.ad.fields[s].ivalue = window.btoa(unescape(encodeURIComponent(Forms.Form.ad.fields[s].ivalue)))
          }
       // alert(JSON.stringify(Forms.Form.ad))
       Main.Request("userpoints", null, "f=UpdateUsersPoint&data=" + JSON.stringify(Forms.Form.ad), "UserPoints.Main()");
      
        Popup.Close();
        Forms.Clean("ad")
    },

ShowHisotry: function (a) {
    Popup.Close();

        var d = false;
        if (a) {
            d = true
        } else {
            
            var c = Main.GetMarkedCheckBoxesValues();
            
            if (c.length == 1) {
                a = c[0];
                d = true
            }else if(c.length > 1){
                alert("<?=$lang_resource['USERSPOINT_CHECBOX_SELECT_ONE']?>");
                return
            }else{
                alert("<?=$lang_resource['USERSPOINT_CHECBOX_SELECT_EDIT']?>");
                return
            }
        }
        
         if (d) {
            
            
         //   Main.Loading();
            $.post("lib/userpoints.php", "f=FetchUsersPointsHistoryData&id=" + a, function (c) {
                //alert(c)
                if(c != ""){
                  
                  
                  
                  
                    
                      
                       UserPoints.Form1(JSON.parse(c))
                       // UserPoints.UserPoints = JSON.parse(b);
                      Main.Ready();
                      //alert("Processing..")
                    
                
                 


                }
            });
         }
    },

Form1: function (e) {
        //alert (JSON.stringify(e));

        var pp = "";
        Forms.Clean("ad", "mainbuttonok");
        if (e == null) {
            e = new Object();
            Forms.Form.ad.type = "modify"
        } 
                
            

        pp +='<h3 class="popup-heading"><?=$lang_resource['USERSPOINT_HISTORY_HEADING']?></h3>'
        
        pp +='<div class="table-responsive">'
        pp +='<table class="table table-th-block table-striped">'
        pp +='<thead>'
        pp +='<tr>'
        pp +='<th width="15%"><?=$lang_resource['USERSPOINT_HISTORY_ORDERID_HEADING']?>.</th>'
        pp +='<th width="30%"><?=$lang_resource['USERSPOINT_HISTORY_HEADING_RESTAURANT']?></th>'
        pp +='<th width="20%"><?=$lang_resource['USERSPOINT_HISTORY_HEADING_DATE']?></th>'
        pp +='<th width="20%"><?=$lang_resource['USERSPOINT_HISTORY_HEADING_PRICE']?></th>'
        pp +='<th width="20%"><?=$lang_resource['USERSPOINT_HISTORY_HEADING_POINTS']?></th>'
        pp +='</tr>'
        pp +='</thead>'
        pp +='<tbody id="history">'

         var d = "";

        var b = this.UserPoints.length;
        var j = true;
        var g = "";
         var f = new Array();
        var l = new Array();
        
        for (var po in e) {
            //alert(e[po].id)
             f.push(e[po])
            j = true;
            if (j) {
                
                pp += '<tr>'
                pp += '<td>'+ e[po].id +'</td>'
                pp += '<td>'+Main.NullToEmpty(e[po].bname)+'</td>'
                pp += '<td class="hand">'+e[po].points_date +'</td>'
                pp += '<td class="hand">' + Main.NullToEmpty(e[po].points_price)+'</td>'
                pp += '<td class="hand">' + Main.NullToEmpty(e[po].points_received)+'</td>'
                pp +='</td>'
               
                pp += '</tr>'
       
        
            }
        }
        pp +='</tbody>'
        pp +='</table>'
        

        pp +='<table width="300">'
        pp +='<tbody>'
        pp +='<tr>'
        pp +='<td width="150">Total Price</td>'
        pp +='<td width="20">:</td>'
        pp +='<td width="130">'+Main.NullToEmpty(e[po].points_total_price)+'</td>'
        pp +='</tr>'
        pp +='<tr>'
        pp +='<td width="150">Total Points</td>'
        pp +='<td width="20">:</td>'
        pp +='<td width="130">'+Main.NullToEmpty(e[po].points_total_points)+'</td>'
        pp +='</tr>'
        pp +='<tr>'
        pp +='<td width="150">Available Points</td>'
        pp +='<td width="20">:</td>'
        pp +='<td width="130">'+Main.NullToEmpty(e[po].points_available)+'</td>'
        pp +='</tr>'


        
        Popup.Show(pp);
        // if(Popup.Close(pp))
        // {
        //     Popup.Show(Edit(e[po].customer_id));
        // }
      
        
    },
    
};
