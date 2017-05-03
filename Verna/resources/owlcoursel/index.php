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
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="js/owl.carousel.js"></script>
<link rel="stylesheet" href="css/owl.carousel.css" type="text/css">
<link rel="stylesheet" href="css/owl.theme.css" type="text/css">


  </head>
  <body>

  <div id="owl-demo" class="owl-carousel">
        


          



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
                      <div class="item_box">
              
				
             <?   
			 $folder = "../../panel/images/business/". $row['id']."/";
			 if(file_exists($folder))  {
			 ?>
             <a href="http://<?=$_SERVER["HTTP_HOST"]?>/<?php echo $row['customslug'] ?>" target="_top"><img src="../../panel/images/business/<?php echo $row['id'] ?>/panel.jpg"  alt="Touch"></a>
             <?  } else { ?>
             <a href="http://<?=$_SERVER["HTTP_HOST"]?>/<?php echo $row['customslug'] ?>" target="_top"><img src="../../panel/images/dummy/mostpopular.jpg" alt="Touch"></a>
             <? } ?>
             </div>
                  <?php 
              		}//in_array if 
				  } //result while
				 }// buss_fetch while
				 }// buss_fetch if

				 ?>
               

               
   </div>

   <script>
    $(document).ready(function() {
      $("#owl-demo").owlCarousel({
        autoPlay: 3000000,
        items : 5,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,5]
      });

    });
    </script>

  </body>
</html>

