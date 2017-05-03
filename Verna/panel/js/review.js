var arrValores = new Array(6);
$(document).ready(function(){
order = document.getElementById('order').value;
review = document.getElementById('review');
if(order <= 0){
review.style.display = 'none';
$('.revfblik').hide();
}
else  {
review.style.display = '';
}
document.getElementById('50').disabled = true;
arrValores[0] = document.getElementById('business').value;
arrValores[1] = document.getElementById('order').value;
arrValores[2] = document.getElementById('customslug').value;


     $('a').click(function(){
        document.getElementById('50').disabled = false;
        var uid = this.id;
		//alert(uid);
        if(uid == 50){
        arrValores[6]= document.getElementById('date').value;

        var serialised = JSON.stringify(arrValores);
		//alert(serialised)
        $.get('/panel/lib/addrating.php',{rating: serialised}, function(result) {
	
        var sp = result.split("#");
        var ff = "[ "+sp[0]+" ]";
        var dispstars = sp[1];
        $("#final").html(dispstars);
        $("#strimg").html(ff);
        $('#res').css({opacity: 0.0, visibility: "visible"});
		
			msg4 = document.getElementById("msg4").value;
		
  			alert(msg4);
			
         

		top.location.href = "../../";
      });

        }

        else if(uid >=1 && uid <=5 )
        {
          arrValores[2]= uid;
          $('a.star1').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star2').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star3').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star4').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star5').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('#rateit').css({visibility: "hidden"});
          for(var x=1;x<=uid;x++)
          {

          $('a.star'+x).css({ color: "#FFFFFF", background: "url(../../images/review/star2.gif)" });
          }

        }
        else if(uid >=6 && uid <=10 )
        { $('a.star6').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star7').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star8').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star9').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star10').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          for(var x=6;x<=uid;x++)
          {
          $('a.star'+x).css({ color: "#FFFFFF", background: "url(../../images/review/star2.gif)" });
          }
          switch(uid)
          {
            case '6': arrValores[3]=1;
            break;
            case '7': arrValores[3]=2;
            break;
            case '8': arrValores[3]=3;
            break;
            case '9': arrValores[3]=4;
            break;
            case'10': arrValores[3]=5;
            break;
          }

        }
        else if(uid >=11 && uid <=15 )
        {

          $('a.star11').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star12').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star13').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star14').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star15').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });

          for(var x=11;x<=uid;x++)
          {
        $('a.star'+x).css({ color: "#FFFFFF", background: "url(../../images/review/star2.gif)" });
          }
          switch(uid)
          {
            case '11': arrValores[4]=1;
            break;
            case '12': arrValores[4]=2;
            break;
            case '13': arrValores[4]=3;
            break;
            case '14': arrValores[4]=4;
            break;
            case'15': arrValores[4]=5;
            break;
          }

        }

        else if(uid >=16 && uid <=20 )
        {

          $('a.star16').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star17').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star18').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star19').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          $('a.star20').css({ color: "#FFFFFF", background: "url(../../images/star.gif)" });
          for(var x=16;x<=uid;x++)
          {
            $('a.star'+x).css({ color: "#FFFFFF", background: "url(../../images/review/star2.gif)" });
          }
          switch(uid)
          {
            case '16': arrValores[5]=1;
            break;
            case '17': arrValores[5]=2;
            break;
            case '18': arrValores[5]=3;
            break;
            case '19': arrValores[5]=4;
            break;
            case'20': arrValores[5]=5;
            break;
          }

        }

    });

   });

    function get_url(){
      var url_part=document.location.href.split("/");
      var url_complete = "http://"+url_part[2];
      return url_complete;

    }
