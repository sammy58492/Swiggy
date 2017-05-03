var Popup = {
    
    Init: function (b) {
        var a=''
        <!-- Modal -->
        a +='<div class="modal fade" id="mymodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
        a +='<div class="modal-dialog" role="document" id="popupcontent">'       
        
        a +='</div>'
        a +='</div>'<!--Modal-->

        document.getElementById(b).innerHTML = a;
        
    },
    Inits: function (b) {
        var a=''
        <!-- Modal -->
        a +='<div class="modal fade" id="mymodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
        a +='<div class="modal-dialog" role="document" id="popupcontent">'       
        
        a +='</div>'
        a +='</div>'<!--Modal-->

        document.getElementById(b).innerHTML = a;
    },
    Show: function (a,e) {
        var n =''
        n +='<div class="modal-content" >'  
        n +=a
        n +='</div>'
        document.getElementById("popupcontent").innerHTML = n;
        $("#mymodal").modal({backdrop: "static"});
        if (e) {
            e()
        }
    },    
    Close: function(){
       $('#mymodal').modal('hide');
       $('.modal-backdrop').remove();      
    },
    LoginClose: function () {
        $('#hedlogbox').modal('hide');
         $('.modal-backdrop').hide();
        $('.modal-backdrop').remove();
    },   
    EnableSubmitButton: function (a) {
        var b = $(this.PopupBox).find(".ok");
        if (a) {
            this.CanSubmit = true;
            $(b).removeClass("disabled");
            $(b).removeClass("default");
            $(b).addClass("enabled")


        } else {

            this.CanSubmit = false;
            $(b).removeClass("enabled");
            $(b).addClass("disabled");
            $(b).addClass("default")
        }

    }
};
