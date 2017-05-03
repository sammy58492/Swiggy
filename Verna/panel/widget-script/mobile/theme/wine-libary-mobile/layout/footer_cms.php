<div class="footer" id="footer">

        	
        </div>




<?php
$cur_page = basename($_SERVER['PHP_SELF']); /* Returns The Current PHP File Name */
?>
<script>
$(".carousel").jCarouselLite({
	btnNext: ".next",
    btnPrev: ".prev",
	visible: 6
});

    $(document).ready(function(){
      $('#hedlogbox').click(function(event){
        console.log('click - form');
        event.stopPropagation();
      });
      $('html').click(function(event){
        console.log('click - body');
        //hide the form if the body is clicked
        $('.popdiv_pop').css('display','none');
      });
      $('#lo').click(function(event){
		 document.getElementById("hedlogbox").style.display = "";
        $('.popdiv').hide();
		$('.popdiv_pop').toggle();
        event.stopPropagation();
      });

    });
	
	 $(document).ready(function(){
      $('.popdiv').click(function(event){
        console.log('click - form');
        event.stopPropagation();
      });
      $('html').click(function(event){
        console.log('click - body');
        //hide the form if the body is clicked
        $('.popdiv').css('display','none');
      });
      $('#tr').click(function(event){
        
		$('.popdiv_pop').hide();
		$('.popdiv').toggle();
        event.stopPropagation();
      });

    });
</script>

</div>
<body>
</html>
