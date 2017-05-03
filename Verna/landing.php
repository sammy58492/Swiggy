<?php
session_start();
include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);


$fbappid = "facebookappid";
pg_prepare($link,'sqlfbappidfetch10','SELECT * FROM w_configs WHERE name=$1');
$resultfbappid10 = pg_execute($link,'sqlfbappidfetch10',array($fbappid));
$rowfbappid10 = pg_fetch_array($resultfbappid10);

 $_SESSION['fbappid']=$rowfbappid10['value'];
?>


<!DOCTYPE HTML>
<html>
<head>


<meta charset="utf-8">
<title><?php echo  $landings->pagetitle ?></title>

<link rel="shortcut icon" type="image/png" href="http://happyclothes.co.uk/images/logo_cloths_fb.png"/>

<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="<?php echo $landings->pagetitle ?>" content="<?php echo $landings->metacontent ?>" keywords="<?php echo $landings->metakeyword ?>">

    <!-- Bootstrap -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <?php
if($fetch_switching_theme['is_separate']== 0){ ?>

<script type="text/javascript" src="panel/js/front-bulk.php?v=1.2.2&script_id=<?=$switch_setting['script_id']?>&theme_id=<?=$switch_setting['script_front_theme_id']?>&random=<?=rand()?>"></script>

<? } else { 
?>

<script type="text/javascript" src="panel/js/front-bulk-switching.php?v=1.2.2&script_id=<?=$switch_setting['script_id']?>&device=<?=$DeviceType?>&theme_id=<?=$switch_setting['script_front_theme_id']?>&random=<?=rand()?>"></script>
<? } ?>
</head>

<body>

<div id="fb-root"></div>
<?include("header_landing.php");?>
<?include("content_landing.php");?>
<?include("footer_landing.php");?>
</body>