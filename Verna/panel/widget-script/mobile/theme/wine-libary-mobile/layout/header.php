<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/templates/style.css">

<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/main-stylesheet.css">
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/responsive-stylesheet.css">

<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/jquery.maximage.css?v=1.2" media="screen" charset="utf-8">




<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/jquery.cycle.all.js"></script>

<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/jquery.maximage.js"></script>




<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/range/jquery-ui.js"></script>

<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/jPages.min.js"></script>


<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/lightbox/imagelightbox.js"></script>

<?php 
  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  $link = pg_connect($string);
  pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1'); 
  $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));

?>



  <div id="header"></div>

  <div id="hedlogbox"></div>

      <!--header-->

   
<script>
 function langChange(a){

  $.post("panel/lib/front-main.php", "f=langchangehistory&id="+a, function (f) {    
    top.location = "/"
  })
}
</script>