<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/html; charset: UTF-8");
session_start();
include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);

pg_prepare($link,'sqllangfetch2','SELECT * FROM w_lang_setting WHERE enabled=$1');
$result = pg_execute($link,'sqllangfetch2',array('TRUE'));

$langarray = array();
while($row1 =pg_fetch_array($result)){
	array_push($langarray,$row1['id']);
	if($row1['opdefault'] == 1 )
		$defaultlang =  $row1['id'];      
}      
if(pg_num_rows($result)==1){
	$counter=0;
	$_SESSION['l'] = $defaultlang;
}else{
	$counter=1;
	if(isset($_SESSION['l'])){
		if(!in_array($_SESSION['l'], $langarray)){
			$_SESSION['l'] = $defaultlang;
		}
	}else{
		$_SESSION['l'] = $defaultlang;
	}
}

global $lang_resource;
if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
  
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 =pg_fetch_array($result1);
    $_SESSION['l'] = $row1['id'];
}

pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_static');
$result = pg_execute($link,'sqlfetchlang',array());
while($row = pg_fetch_array($result)){
    $lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
}
pg_close($link);
require_once("panel/lib/front-main.php");
//require("languages/lang.en.php");
$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

if(isset($_REQUEST['code'])) {
	header("location: mobile.php?fbk=access");
	exit;
}

if(isset($_REQUEST['alias'])) {
$business = CheckForBusinessDirectLink($_REQUEST['alias'],$lang_resource);
}



if($business->pagetype == 'cms'){
	
	    $_GET['id'] = 'oos_re_direct_to_cms_'.$business->id;
        $mtitle = $business->pagetitle;
        $mdescription = $business->metacontent;
        $mkeywords = $business->metakeyword;
		$mbusiness = "Yes";
		$businessName = $business->customurl;
}
else if($business->pagetype == 'city')
		{
	    $_GET['id'] = 'oos_re_direct_to_city_'.$business->id;
        $mtitle = $business->name;
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
		$businessName = $business->city;

		}
			else if($business->pagetype == 'Request')
		{
	    $_GET['id'] = 'oos_re_direct_to_custompage_'.$business->id;
		//$_GET['bid'] = 'online_ordering_system_'.$business->name;
        $mtitle = $business->pagetype;
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";

		}		
else if($business->pagetype == 'searchBy'){

	    $_GET['id'] = 'oos_re_direct_to_searchBy_'.$business->address.'_'.$business->city.'_'.$business->country.'_'.$business->cityname.'_'.$business->deliveryType.'_'.$business->latitud.'_'.$business->longitud.'_'.$business->zipcode.'_'.$business->zoom;
        
}		
else if($business->pagetype == 'category')
		{
	    $_GET['id'] = 'oos_re_direct_to_category_'.$business->id;
		//$_GET['bid'] = 'online_ordering_system_'.$business->name;
        $mtitle = $business->category;
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
		$businessName = $business->category;

		}		
		
else if($business->pagetype == 'restaurant')
        {
        $_GET['id'] = 'oos_re_direct_to_business_'.$business->id;
        $mtitle = $business->name."-".$business->address."-".$business->cityname."-".$business->countryname;
		$mbusiness = "Yes";
        $mdescription = $business->mdescription;
        $mkeywords = $business->mkeywords;

        }
        else
        {
        //DEFAULT METAS
        $mtitle = $configRec['sitename'];
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
        }
if(isset($_REQUEST['order'])) {
	
	$orderhistory = CountReviewmain($_REQUEST['order']);
	
	
if($orderhistory->orderExist  == "true" && $orderhistory->orderDublicate  == "false"  ) {  ?>
					<script>
					alert("<?=$lang_resource['REVIEW_ALREADY_REVIEWED']?>");
					top.location.href = '<?=$configRec['siteurl']?>/mobile.php';

					</script>

<? }
else if($orderhistory->orderExist  == "false" && $orderhistory->orderDublicate  == "false"  ) {  ?>
					<script>
					alert("<?=$lang_resource['REVIEW_MSG2']?>");
					top.location.href = '<?=$configRec['siteurl']?>/mobile.php';

					</script>

<? }

	}
	
	
require_once("switching_mobile_configs.php");

if($switch_setting['script_id']  == 1) {
$_SESSION['scriptid']=0;
	} else {
    $_SESSION['scriptid']=$switch_setting['script_id'];
	}	

$countrylist = countrieslist();
$configRec = FetchAllsettingsCustom();
	// echo "<a href=http://www.orderingonlinesystem.com style='display:none'>OrderingOnlineSystem</a>"
?>

<?php
pg_prepare($link,'sqlsmsactivation','SELECT * from w_configs WHERE name=$1');
$resultsmsactivation = pg_execute($link,'sqlsmsactivation',array('smsactivation'));
$rowsmsactivation = pg_fetch_array($resultsmsactivation);
if($rowsmsactivation['value'] == 1){
	if($_SESSION['user']->id=='')
	{
		if(isset($_REQUEST['sms']))
		{
	
?>
<script>
//alert("a");
window.onload = function(e){ 
Visuals.smsActivation(<?=$_REQUEST['sms']?>)
}

</script>
<?php
	}
	}
}
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie6"> <![endif]-->
<!--[if IE 7 ]><html class="ie7"><![endif]-->
<!--[if IE 8 ]><html class="ie8"><![endif]-->
<!--[if (gt IE 8)|!(IE)]><!--><html class=""><!--<![endif]--><head>
<? if($mbusiness == "No") { ?>
<title><?=$configRec['sitename']?></title>
<meta name="description" content="<?=$configRec['googleanalyticscode']?>" />
<meta name="keywords" content="<?=  $configRec['analyticscode'] ?>" />
<meta name="author" content="<?= $lang_resource['MAIN_PAGE_META_AUTHOR'] ?>"
<meta name="robots" content="index, follow" />
<meta property="og:title" content="<?=$configRec['sitename']?>" />
<meta property="og:image" content="<?=$configRec['siteurl']?>/images/logo-facebook-share-500x500.png" />
<meta property="og:description" content="<?=$configRec['googleanalyticscode']?>" />
<meta property="og:url" content="<?=$configRec['siteurl']?>/" />
<meta name="<?=$configRec['sitename']?>" content="dont delete this tag"/>
<meta charset="utf-8"/>
<? } else { 
if($business->pagetype == 'restaurant')
        { ?>
<title><?php echo $mtitle;?></title>
<? } else { ?>
<title><?=$configRec['sitename']?>-<?php echo $mtitle;?></title>
<?  } ?>

<meta name="description" content="<?php echo $mdescription;?>"/>
<meta name="keywords" content="<?php echo $mkeywords;?>"/>
<meta property="og:image" content="<?=$configRec['siteurl']?>/panel/images/business/<?=$business->id?>/panel.jpg?c=1400018035955" />
<meta property="og:url" content="<?=$configRec['siteurl']?>/<?=$backuplinks[0]?>" />
<meta property="og:title" content="<?php echo $mtitle;?>" />
<meta property="og:description" content="<?php echo $mdescription;?>" />

<meta charset="utf-8"/>
<? } ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> <!--320-->
<meta name="robots" content="index, follow" />
<!-- site Schedule popup -->
<? if($fetch_switching_theme['is_separate'] == 0) { ?>
<link href="panel/<?=$moduleName?>/css/sorry-popup.css" rel="stylesheet" type="text/css">
<? } ?>
<? if($fetch_switching_theme['is_separate'] == 0) { ?>
<link href="panel/<?=$moduleName?>/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/css/mobile-style.css"/>
<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/css/reservation.css"/>
<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/css/my-mobile-style.css"/>
<link href="panel/<?=$moduleName?>/assets/css/custom.css" rel="stylesheet">
<link rel="stylesheet" href="panel/<?=$moduleName?>/css/jquery-ui.css" />
<? } ?>

<!--  site Schedule popup  -->



<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="js/jquery-migrate-1.0.0.js"></script>
<script type="text/javascript" src="panel/js/jCarouselLite.js"></script>
<!--<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>-->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>

<script src="panel/<?=$moduleName?>/assets/js/bootstrap.min.js"></script>
<? 
if($fetch_switching_theme['is_separate']== 0){ ?>

<script type="text/javascript" src="panel/js/mobile-front-bulk.php?v=1.2.2&script_id=<?=$switch_setting['script_id']?>&theme_id=<?=$switch_setting['mobile_theme_id']?>&random=<?=rand()?>"></script>

<? } else { 
if($fetch_switching_theme['type'] ==2 ) {
	
	$DeviceType = "desktop";
	}
else {
	
	$DeviceType = "mobile";
	}	
?>
<script type="text/javascript" src="panel/js/switching-mobile-front-bulk.php?v=1.2.2&script_id=<?=$switch_setting['script_id']?>&device=<?=$DeviceType?>&theme_id=<?=$fetch_switching_theme['id']?>&random=<?=rand()?>"></script>
<? }  ?>
<!--<script type="text/javascript" src="panel/js/mobile-front-bulk.php?v=1.2.2&l=<?//isset($_GET['l']) ? $_GET['l'] : 'en' ?>"></script>-->


<script src="js/jquery-ui.min.js"></script>
<link rel="stylesheet" type="text/css" href="datetimepicker-master/jquery.datetimepicker.css"/>
<script src="datetimepicker-master/jquery.datetimepicker.js"></script>
  <script>
  $(function() {
  //  $( "#accordion" ).accordion({ heightStyle: "content"  });
	//$( "#accordion" ).accordion( "option", "autoHeight", false );
  });
  </script>

<? if(isset($_REQUEST['fbk']) && $_REQUEST['fbk']== "access" ) { ?>
 <script>
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
	
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } 
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '<?=$configRec['facebookappid']?>',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
 
  function testAPI() {
  
    FB.api('/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified', function(response) {
     // alert('Successful login for: ' + response.name);
	 
	  Facebook.User = response;
	  Main.FacebookLoggedIn();
      
      
    });
  }
</script>

  <? } ?>
  
  


<script type="text/javascript">
var Config = <?php GetConfig(array('ga'));?>;
var Link = '<?php echo $_GET['id'];?>';
var _gaq = _gaq || [];
(function()
{
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
<script>
$( document ).ready(function() {
	
	
    if(history.pushState && history.replaceState) {
    
	
    window.onpopstate = function(e) {
		
		//alert(e.state.id )
		 if(e.state.id == "99"){
			
			// home  page
			
			window.location.href = '../';
			
			
			}
		
        if(e.state.id == "100"){
			
			// business page
			if(Shopping.RedirectToCity) {
			
			Shopping.changeDelType(3)
			}
			else {
				
			Shopping.changeDelType(3)	
				
				}
			
			}
		if(e.state.id == "101"){
			// restaurant page
			
			Shopping.OpenBusiness(currentshop)
			}
		if(e.state.id == "102"){
			// checkout page
			if(Main.stepBack == 5) {
				var custom_link = "searchBy_";
		
		if(Main.WhereAmIData.address) {
			custom_link += Main.WhereAmIData.address.split(" ").join("_");
			}
		if(Main.WhereAmIData.cityname) {
			custom_link +=   "_"+Main.WhereAmIData.cityname.split(" ").join("");
			}
		if(Main.WhereAmIData.country) {
			
			var con = Main.GetIndexOnPropertyValueFound(Main.Countries, "id", Main.WhereAmIData.country);
			custom_link +=   "_"+Main.Countries[con].name.split(" ").join("");
			}		
			window.history.pushState( {"id":100} , "Business list", custom_link );
				if(Shopping.RedirectToCity) {	
						Shopping.changeDelType(3)
						}
						else {
						Shopping.changeDelType(2)	
							
							}
				
				}
			 else {
			Shopping.OpenCartCheck();
			}
			}	
		if(e.state.id == "105"){
			// confirmation page
			
			
			}	
				
			
        //perhaps use an ajax call to update content based on the e.state.id
    };
}
});

</script>

  <!------------- For Most Popular ---------------------->
    <!--<link href="assets/css/bootstrapTheme.css" rel="stylesheet">-->
    

    <!-- Owl Carousel Assets -->
    <link href="resources/owl_carousel/owl-carousel/mobile-owl.carousel.css" rel="stylesheet">
    <link href="resources/owl_carousel/owl-carousel/owl.theme.css" rel="stylesheet">
  <!------------- END Most Popular ---------------------->
<style type="text/css">
#link                {
        height: 92px;
        width: 350px;
        display: block;
}
</style>

<script>
$(window).load(function () {

$("body").height("");
});

</script>



<link rel="stylesheet" type="text/css" href="fonts/font-awesome.min.css">
<!-- Date Picker -->
<link href="resources/datepicker/jquery.datepick.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="resources/datepicker/jquery.datepick.js"></script>

<script type="text/javascript">
$(function() {
	$('#rdate').datepick();
});
</script>

<!-- Date Picker -->

<!-- Fancybox -->

<!-- Add mousewheel plugin (this is optional) -->
<script type="text/javascript" src="js/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>

<!-- Add fancyBox main JS and CSS files -->
<script type="text/javascript" src="js/fancybox/jquery.fancybox.js?v=2.1.5"></script>
<link rel="stylesheet" type="text/css" href="js/fancybox/jquery.fancybox.css?v=2.1.5" media="screen" />

<!-- Add Button helper (this is optional) -->
<link rel="stylesheet" type="text/css" href="js/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
<script type="text/javascript" src="js/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
<!-- Fancybox -->




<link rel="stylesheet" type="text/css" href="font/fontcss.css">
<style>
.checkoutloading{	
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: rgba(0,0,0,0.7) url(images/step4-checkout/cbt-spinner.gif) no-repeat center center;
}
</style>

<link rel="stylesheet" href="css/mobile/jquery.maximage.css?v=1.2" type="text/css" media="screen" charset="utf-8" />
<link rel="stylesheet" href="css/mobile/screen.css?v=1.2" type="text/css" media="screen" charset="utf-8" />
<style type="text/css" media="screen">			

/*Set my logo in bottom left*/
#logo {
	bottom:30px;
	height:auto;
	left:30px;
	position:absolute;
	width:34%;
	z-index:1000;
}
#logo img {
	width:100%;
}

</style>
<script src="js/mobile/jquery.cycle.all.js" type="text/javascript" charset="utf-8"></script>
<script src="js/mobile/jquery.maximage.js" type="text/javascript" charset="utf-8"></script>


</head>
<body>
<? if($fetch_switching_theme['is_separate'] == 0){?>
	<div id="checkoutloading" class="checkoutloading" style="display:none;"></div>
<?php if($configRec["sitepagesettings"] == 1){
include("header_switch.php");
}?>

 <? include("mobile-content.php");?>

<?php 
if($configRec["sitepagesettings"] == 1){
		include("footer_switch.php");
	}
}
else { ?>
	<div id="checkoutloading" class="checkoutloading" style="display:none;"></div>
    <? include("panel/".$moduleName."/".$DeviceType."/theme/".$fetch_switching_theme['name']."/layout/header.php");?>

    <? include("panel/".$moduleName."/".$DeviceType."/theme/".$fetch_switching_theme['name']."/layout/content.php");?>
    
    <? include("panel/".$moduleName."/".$DeviceType."/theme/".$fetch_switching_theme['name']."/layout/footer_cms.php");?>
	<? }
	?>

</body>
  <!------------- For Most Popular ---------------------->
    <script src="resources/owl_carousel/owl-carousel/owl.carousel.min.js"></script>

    <!-- Frontpage Demo -->
    <script>




    $("body").data("page", "frontpage");

    </script>
    <!------------- END Most Popular ---------------------->
</html>
<input type="hidden" name="payNumber" id="payNumber" value="0" >
<input type="hidden" name="cityName" id="cityName" value="<?=$businessName?>" >
<input type="hidden" name="mapbox1" id="mapbox1" value="0" >
<input type="hidden" name="footerinfo" id="footerinfo" value="0" >
<input type="hidden"  id="loginbottom" value="" >
<input type="hidden"  id="usermenu" value="" >
<input type="hidden" name="searchs_txt" id="searchs_txt" value="" >
<input type="hidden" name="blistName" id="blistName" value="<?=$_REQUEST['alias']?>" >
<input type="hidden" name="reviewOrderID" id="reviewOrderID" value="<?=$_REQUEST['order']?>" >
