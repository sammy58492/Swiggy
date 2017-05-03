<div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-12">
        	<div class="home_video_dv">
            	<iframe width="100%" height="500" src="https://www.youtube.com/embed/MfSFzHq-CZ4" frameborder="0" allowfullscreen></iframe>
            </div><!--home_video_dv-->
        </div><!--col-md-12-->
      </div><!--row-->
    </div><!--container-->
<!--//Fooetr-->    
      <footer>
      	<div class="container">
        	<div class="row">
            	<div class="col-md-12">
                <ul class="ft_nav">
                    <li><a href="#"><?=$lang_resource['FOOTER_ABOUT_CONTACT']?></a></li>
                    <li><a href="#"><?=$lang_resource['FOOTER_PRIVACY_POLICY']?></a></li>
                    <li><a href="#"><?=$lang_resource['TERMS_CONDITION']?></a></li>
                    <li><a href="#"><?=$lang_resource['PRICING']?></a></li>
                </ul>
       <hr>
        <p><?=$lang_resource['POWERED_BY_TEXT']?>&nbsp;OrderingOnlineSystem.com</p>
                </div><!--col-md-12-->
            </div><!--row-->
        </div><!--container-->
      	<div class="small_footer"><a href="#"><img src="images/footer-logo.png"></a></div><!--small_footer-->
      </footer>

    
  </body>
  	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script>
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
        //$('.popdiv').hide();
		$('.popdiv_pop').toggle();
        event.stopPropagation();
      });

    });
    </script>
    <style>
	.popdiv_pop {
    position: absolute !important;
    right: 133px !important;
    top: 66px !important;
    z-index: 999 !important;
}
	</style>
    
</html>