<?php  session_start();
function ConnectDB($CFG = 'empty')
{
	if ($CFG=='empty')
		require('../../panel/config.php');
		
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
}
?>
<?php 
$link = ConnectDB();
require_once("../../switching_configs.php");
if($switch_setting['script_id'] ==1){
	$_SESSION['scriptid']=0;
	} else {
    $_SESSION['scriptid']=$switch_setting['script_id'];
	}
/* Fetch Business */
pg_prepare($link,'sqlpopular',"SELECT * FROM w_configs WHERE name=$1");	
$respo = pg_execute($link,'sqlpopular',array('popularsettings'));
$rowpo = pg_fetch_array($respo);
$popularsettings = $rowpo['value'];

session_start();
$langid= $_SESSION['l'];

pg_prepare($link,'sql1','SELECT * FROM w_business_lang WHERE lang_id=$1');
$buss_fetch = pg_execute($link,'sql1',array($langid));


pg_prepare($link,'sqlSettingsFront','SELECT * FROM w_frontsettings');
$result1 = pg_execute($link,'sqlSettingsFront',array());
$row1 = pg_fetch_array($result1);
$resturant_name = $row1['restaurant'];
$resturant_name =json_decode($resturant_name);


?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Owl Carousel</title>
    <link href="assets/css/bootstrapTheme.css" rel="stylesheet">
    <link href="assets/css/custom.css" rel="stylesheet">

    <!-- Owl Carousel Assets -->
    <link href="owl-carousel/owl.carousel.css" rel="stylesheet">
    <link href="owl-carousel/owl.theme.css" rel="stylesheet">


  </head>
  <body>
          

      <div id="demo">
        <div class="con">
          <div class="row">
            <div class="span12">

              <div id="owl-example" class="owl-carousel">


			<?php

			if(pg_num_rows($buss_fetch)>0){
				if($popularsettings=="1"){
					pg_prepare($link,'sql','SELECT id,isimg,customslug,scriptid FROM w_business WHERE enabled=$1 AND id =$2 AND is_popular=$4 AND scriptid=$3');
				}else{
					pg_prepare($link,'sql','SELECT id,isimg,customslug FROM w_business WHERE enabled=$1 and id =$2 AND scriptid=$3');	
				}
				
				while($r1 = pg_fetch_array($buss_fetch)){
					if($popularsettings=="1"){
						$result = pg_execute($link,'sql',array(TRUE,$r1['business_id'],$_SESSION['scriptid'],TRUE));
					}else{
						$result = pg_execute($link,'sql',array(TRUE,$r1['business_id'],$_SESSION['scriptid']));
					}

					while($row = pg_fetch_array($result)){ 
						if (in_array(-1, $resturant_name) || in_array($row['id'],$resturant_name)){
			?>
                   
				
             <div class="item ">
             <?   
			 $folder = "../../panel/images/business/". $row['id']."/";
			 if(file_exists($folder))  {
			 ?>
             <a href="http://<?=$_SERVER["HTTP_HOST"]?>/<?php echo $row['customslug'] ?>" target="_top"><img src="../../panel/images/business/<?php echo $row['id'] ?>/panel.jpg" style="height:176px" alt="Touch"></a>
             <?  } else { ?>
             <a href="http://<?=$_SERVER["HTTP_HOST"]?>/<?php echo $row['customslug'] ?>" target="_top"><img src="../../panel/images/dummy/mostpopular.jpg" style="height:176px" alt="Touch"></a>
             <? } ?>
             </div>
                  <?php 
              		}//in_array if 
				  } //result while
				 }// buss_fetch while
				 }// buss_fetch if

				 ?>
               

              </div>


            </div>
          </div>

        </div>
      </div>


    <script src="assets/js/jquery-1.9.1.min.js"></script>
    <script src="owl-carousel/owl.carousel.min.js"></script>

    <!-- Frontpage Demo -->
    <script>

    $(document).ready(function($) {
      $("#owl-example").owlCarousel({items : 10, //10 items above 1000px browser width
itemsDesktop : [1000,5], //5 items between 1000px and 901px
itemsDesktopSmall : [900,3], // betweem 900px and 601px
itemsTablet: [600,2], //2 items between 600 and 0
itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
});
	  
    });


    $("body").data("page", "frontpage");

    </script>
    <script src="assets/js/bootstrap-collapse.js"></script>
    <script src="assets/js/bootstrap-transition.js"></script>

    <script src="assets/js/google-code-prettify/prettify.js"></script>
	  <script src="assets/js/application.js"></script>

    <script type="text/javascript">
    jQuery(function($){
      var disqus_loaded = false;
      var owldomain = window.location.hostname.indexOf("owlgraphic");
      var comments = window.location.href.indexOf("comment");

      if(owldomain !== -1){
        function check(){
          if ( (!disqus_loaded && $(window).scrollTop() + $(window).height() > top) || (comments !== -1) ){
            $(window).off( "scroll" )
            disqus_loaded = true;
            /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
            var disqus_shortname = 'owlcarousel'; // required: replace example with your forum shortname
            var disqus_identifier = 'OWL Carousel';
            //var disqus_url = 'http://owlgraphic.com/owlcarousel/';
            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
          }
        }
        $(window).on( "scroll", check )
        check();
      } else {
        $('.disqus').hide();
      }
    });
    </script>

    <script>
    var owldomain = window.location.hostname.indexOf("owlgraphic");
    if(owldomain !== -1){
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-41541058-1', 'owlgraphic.com');
      ga('send', 'pageview');
    }
    </script>

  </body>
</html>

