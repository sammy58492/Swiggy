<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/html; charset=UTF-8");
session_start();

include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);

$dcm = "decimal_point";
pg_prepare($link,'sqldcpfetch1','SELECT * FROM w_configs WHERE name=$1');
$resultdcm = pg_execute($link,'sqldcpfetch1',array($dcm));
$rowdcm = pg_fetch_array($resultdcm);

$_SESSION['decimal_value']=$rowdcm['value'];





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
//print_r($lang_resource);

pg_prepare($link,'sqlcitysetengis','SELECT * from w_frontsettings WHERE id =$1');
$result_city = pg_execute($link,'sqlcitysetengis',array(1));
$row_city = pg_fetch_array($result_city);

$city_home = $row_city["cityhomepage"];

require_once("switching_configs.php");
pg_close($link);


require_once("panel/lib/front-main.php");

/*if(isset($_SESSION['l'])){
	$lang_file = 'lang.'.$_SESSION['l'].'.php';
}else{*/
	//$lang_file = 'lang.en.php';
/*}*/
/*$pathlanguage = "languages/".$lang_file;
require($pathlanguage);*/


//echo $_SERVER[HTTP_HOST];
//echo $_SERVER[REQUEST_URI];

$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$backuplink = explode("/",$_SERVER[REQUEST_URI]);

$widgetchk = explode("_",$backuplink[1]);
 
if($city_home=='t')
{
	if($_SERVER[REQUEST_URI]=='/')
	{
		$_SESSION["citylist"]="1";

		if($_SESSION["citylist"]=="1")
		{
		header("location: ".$configRec['siteurl']."/".$row_city["homedefaultcity"]);
		$_SESSION["citylist"]=2;
		}
	}	
}

if($backuplink[1] == "admin" && $_REQUEST['template'] == "true") { ?>

	<script>

		top.location.href = '<?=$configRec['siteurl']?>/admin?template=true';
	</script>
                    
	<? exit(); }
	else if($backuplink[1] == "admin") { ?>

	<script>

		top.location.href = '<?=$configRec['siteurl']?>/admin';
	</script>
                    
	<? exit(); }
else if($backuplink[1]!="") {
$backuplinks = explode("?",$backuplink[1]);

 $business = CheckForBusinessDirectLink($backuplinks[0],$lang_resource);
 
}

$_SESSION['scriptid'] =0;

$widgetsid = -1;
$_SESSION['widgetsid'] =-1;

$widgetResid = -1;
$_SESSION['widgetResid'] =-1;

$widgetResBuid = -1;
$_SESSION['widgetResBuid'] =-1;

$landings=FetchLandingPageData($_SESSION['l']);
$landingSetData=FetchLandingSettingData();

$configRec = FetchAllsettingsCustom();



$configLanding= FetchLandingSetting();

if($widgetchk[0])
$wdgt_explode = explode("?",$widgetchk[0]);

 $wdgt = base64_decode($wdgt_explode[0]); 

if($wdgt =="widgetTheme") {
	//echo "<pre>";
	$widgetsid = $wdgt_explode[1];
	require_once("widget_switching_configs.php");	
	
	
	
//	print_r($fetch_switching_theme);	

}

if($wdgt =="widgetThemeIframe") {

$widgetResid = $wdgt_explode[1];
require_once("widget_switching_configs.php");		
//echo $widgetResid;	
}

if($wdgt =="widgetThemeButton") {

 
$widgetResBuid = $wdgt_explode[1];
require_once("widget_switching_configs.php");     
//echo $widgetResBuid;  
}

if($fetch_switching_theme['type'] == 2 && $business->pagetype=='') {
	
	$_GET['id'] = 'oos_desktop_mobile';
	 $mtitle = $lang_resource['OOS_DIRECT_MTITLE'];
	
} else if($business->pagetype == 'cms'){

	    $_GET['id'] = 'oos_re_direct_to_cms_'.$business->id;
        $mtitle = $business->pagetitle;
        $mdescription = $business->metacontent;
        $mkeywords = $business->metakeyword;
		$mbusiness = "Yes";
		$businessName = $business->customurl;
}
else if($business->pagetype == 'searchBy' && $configRec["sitepagesettings"] == 2){

	    $_GET['id'] = 'oos_re_direct_to_searchBy_'.$business->address.'_'.$business->city.'_'.$business->country.'_'.$business->cityname.'_'.$business->deliveryType.'_'.$business->latitud.'_'.$business->longitud.'_'.$business->zipcode.'_'.$business->zoom.'_'.$business->nighbourid.'_'.$business->resturantsid.'_'.$business->cuisinesid.'_'.$business->reservation.'_'.$business->guest.'_'.$business->rdate.'_'.$business->rhour.'_'.$business->rmint;
        
}
else if($business->pagetype == 'city' && $configRec["sitepagesettings"] == 2)
		{
	    $_GET['id'] = 'oos_re_direct_to_city_'.$business->id;
        $mtitle = $business->name;
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
		$businessName = $business->city;

		}
else if($business->pagetype == 'category' && $configRec["sitepagesettings"] == 2)
		{
	    $_GET['id'] = 'oos_re_direct_to_category_'.$business->id;
		//$_GET['bid'] = 'online_ordering_system_'.$business->name;
        $mtitle = $business->category;
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
		$businessName = $business->category;

		}

else if($business->pagetype == 'restaurant' && $configRec["sitepagesettings"] == 2)
        {
        $_GET['id'] = 'oos_re_direct_to_business_'.$business->id;
        $mtitle = $business->name."-".$business->address."-".$business->cityname."-".$business->countryname;
		$mbusiness = "Yes";
        $mdescription = $business->mdescription;
        $mkeywords = $business->mkeywords;
		$isbusinessheaderoff = $configRec['businesspageheadersetting'];
		$isbusinesspagefootersetting = $configRec['businesspagefootersetting'];

        }else if($business->pagetype == 'Request' && $configRec["sitepagesettings"] == 2)
        {
        $_GET['id'] = 'oos_re_direct_to_custompage_1';
     

        }
       else if($business->pagetype == 'landing' && $configRec["sitepagesettings"] == 2)
        {
        	include("landing.php");
        // echo "save me";
         exit;
     	

        } 
		else if($wdgt =="widgetTheme") {
		 $_GET['id'] = 'oos_re_direct_to_widget';	
	    $mtitle = "OOS_widgetTheme";
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
			
			
		}
		else if($wdgt =="widgetThemeIframe") {
		 $_GET['id'] = 'oos_re_direct_to_widget';	
	    $mtitle = "OOS_widgetTheme";
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
			
			
		}
		else if($wdgt =="widgetThemeButton") {
         $_GET['id'] = 'oos_re_direct_to_widget';   
        $mtitle = "OOS_widgetTheme";
        $mdescription = '';
        $mkeywords = '';
        $mbusiness = "No";
            
            
        }
        else
        {
        //DEFAULT METAS
        $mtitle = $lang_resource['OOS_DIRECT_MTITLE'];
        $mdescription = '';
        $mkeywords = '';
		$mbusiness = "No";
        }


$countrylist = countrieslist();

//Reset counter start
$configRecUnchanged=FetchAllsettingsCustomUnchanged();
//Reset counter end





      
	




if(trim($backuplinks[0])!="") {
	
	if($mtitle == $lang_resource['OOS_DIRECT_MTITLE']) { 
	?>
		<!DOCTYPE html>
		<html>
		<head>
		<!-- Sweet Alert -->
		<script src="dist/sweetalert-dev.js"></script>
		<link rel="stylesheet" href="dist/sweetalert.css">
		<!-- End Sweet alert -->
		</head>
		<body>
		<script>
		swal({
		   	title: "Error",
		   	text: "<?=$lang_resource['MAIN_WRONG_URL']?>",
		   	type: "error",
		   	confirmButtonText: "Ok!",
			closeOnConfirm: false,
		},
		function(isConfirm){
			if (isConfirm) {
				top.location.href = '<?=$configRec['siteurl']?>';   
			}  
		});
		window.stop();
		</script>
		</body>
		</html>
	<? }
	}
if($business->enabled == "f") { ?>
	<!DOCTYPE html>
	<html>
	<head>
	<!-- Sweet Alert -->
	<script src="dist/sweetalert-dev.js"></script>
	<link rel="stylesheet" href="dist/sweetalert.css">
	<!-- End Sweet alert -->
	</head>
	<body>
	<script>
	swal({
		title: "Error",
		text: "<?=$lang_resource['RESTDISABLED']?>",
		type: "error",
		confirmButtonText: "Ok!",
		closeOnConfirm: false,
	},
	function(isConfirm){
		if (isConfirm) {
			top.location.href = '<?=$configRec['siteurl']?>';   
		}  
	});
	window.stop();
	</script>
	//<script> alert("<?=$lang_resource['RESTDISABLED']?>"); top.location.href = '<?=$configRec['siteurl']?>'; </script>
	</body>
	</html>
<? }

if($switch_setting['script_id']  == 1) {

$_SESSION['scriptid']=0;
	}
else if($switch_setting['script_id']  == 5) {

	$_SESSION['scriptid']=0;
	
}
	else {
    $_SESSION['scriptid']=$switch_setting['script_id'];
	}

?>

<?php
if($_SESSION['user']->id=='')
{
if(isset($_REQUEST['sms']))
{
?>


<script>
window.onload = function(e){ 
   Visuals.smsActivation(<?=$_REQUEST['sms']?>)
}

</script>
<?php
}
}
?>

<?php
//$lang_resource = array();
if($configLanding=="t")
{
 include("landing.php");
}	
//end of landing page
else{
?>
<!DOCTYPE html >

<!--[if lt IE 7 ]><html class="ie6"> <![endif]-->
<!--[if IE 7 ]><html class="ie7"><![endif]-->
<!--[if IE 8 ]><html class="ie8"><![endif]-->
<!--[if (gt IE 8)|!(IE)]><!--><html class="" ><!--<![endif]--><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<? if($mbusiness == "No") { ?>
<meta name="description" content="<?=$configRec['googleanalyticscode']?>"  />
<meta name="keywords" content="<?=$configRec['analyticscode'] ?>" />
<meta name="author" content="<?=$lang_resource['MAIN_PAGE_META_AUTHOR'] ?>" />
<meta name="robots" content="index, follow"/>
<meta property="og:title" content="<?=$configRec['sitename']?>"  />
<meta property="og:image" content="<?=$configRec['siteurl']?>/images/logo-facebook-share-500x500.png" />
<meta property="og:description" content="<?=$configRec['googleanalyticscode']?>" />
<meta property="og:url" content="<?=$configRec['siteurl']?>/" />
<meta  name="<?=$configRec['sitename']?>" content="dont delete this tag"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><?=$configRec['sitename']?></title>
<? } else { ?>
<meta name="description" content="<?php echo $mdescription;?>"/>
<meta name="keywords" content="<?php echo $mkeywords;?>"/>
<meta property="og:image" content="<?=$configRec['siteurl']?>/panel/images/business/<?=$business->id?>/panel.jpg?c=1400018035955" />
<meta property="og:url" content="<?=$configRec['siteurl']?>/<?=$backuplinks[0]?>" />
<? if($business->pagetype == 'restaurant')
        { ?>
<title><?php echo $mtitle;?></title>
<? } else { ?>
<title><?=$configRec['sitename']?>-<?php echo $mtitle;?></title>
<?  } ?>

<meta property="og:description" content="<?php echo $mdescription;?>" />
<meta  http-equiv="Content-Type"  content="text/html; charset=utf-8" />
<title><?php echo $mtitle;?></title>
<? } ?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<? if($business->pagetype != 'restaurant'){ ?>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry,places"></script>
<? } ?>
<!--<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha1.js"></script>-->
<?php

if($fetch_switching_theme['is_separate']== 0){ ?>
<script type="text/javascript" src="panel/js/front-bulk.php?v=1.2.2&script_id=<?=$switch_setting['script_id']?>&theme_id=<?=$switch_setting['script_front_theme_id']?>&random=<?=rand()?>"></script>
<style>
#owl-demo .item img{
	display: block;
	width: 100%;
	
}
body, html{
margin:0;
padding:0;
}

.owl-prev{
  position: absolute;
  left: 30px;
  top: 400px;
  border-radius: 100%;
  width: 30px;
  height: 44px;
  background-color: transparent !important;
  border: 2px solid #fff;
  font-family: monospace;
  font-size: 35px !important;
}
.owl-next{
  position: absolute;
  right: 30px;
  top: 400px;
  border-radius: 100%;
  width: 30px;
  height: 44px;
  background-color: transparent !important;
  border: 2px solid #fff;
  font-family: monospace;
  font-size: 35px !important;
}
</style>
<link href="css/owl.carousel.css" rel="stylesheet">
<link href="css/owl.theme.css" rel="stylesheet">

<? } else { 
?>

<script type="text/javascript" src="panel/js/front-bulk-switching.php?v=1.2.2&script_id=<?=$switch_setting['script_id']?>&device=<?=$DeviceType?>&widgetsid=<?=$widgetsid?>&widgetResid=<?=$widgetResid?>&widgetResBuid=<?=$widgetResBuid?>&theme_id=<?=$switch_setting['script_front_theme_id']?>&random=<?=rand()?>"></script>
<? } ?>

<? if($business->pagetype == 'restaurant')
 { 
?>
<?php //include_once("resturantanalyticstracking.php") ?>
<script type="text/javascript">

var Config = <?php GetResturantTrack($business->id);?>;
var Link = '<?php echo $_GET['id'];?>';
var _gaq = _gaq || [];
(function()
{
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

</script> 
<?php }else{ ?>
<?php //include_once("analyticstracking.php"); ?>
<script type="text/javascript">

var Config = <?php GetConfig(array('trackingid'));?>;
var Link = '<?php echo $_GET['id']; ?>';
var _gaq = _gaq || [];
(function()
{
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

</script>
<?php } ?>

<style type="text/css">
#link    {
        height: 92px;
        width: 350px;
        display: block;
}
</style>

<!-- Date Picker -->
<script src="https://code.jquery.com/jquery-migrate-1.0.0.js"></script>

<link href="resources/datepicker/jquery.datepick.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="resources/datepicker/jquery.datepick.js"></script>
<script type="text/javascript">
	
	$(function() {
	$('#rdate').datepick();
});
	
</script>
<!-- Date Picker -->

<script src="datetimepicker-master/jquery.datetimepicker.js"></script>
<!--Reset counter end-->
<script type="text/javascript">
//Reset counter start
isupdateBackupinsec='<?php echo $configRecUnchanged["isupdateBackupinsec"];?>';
window.setInterval(function(){
		 Main.autoLogout();
	}, 30000);

$("#iscouterset").val(isupdateBackupinsec);
	window.setInterval(function(){
		 Main.iscounterset();
	}, 30000);

if(isupdateBackupinsec=='1'){

	counterUpdate();
	
	}
	

		
		
function  counterUpdate(){
	

//counter start
var nn=0;

var mint=0;
var sec=0;
var tot=0;
jQuery(function($){

	$('#retroclockbox1').flipcountdown({
		
		size:"xs",
tick:function(){
	
counterRange='<?php echo $configRecUnchanged["updateBackupinsec"];?>';
	<?php date_default_timezone_set("America/Chicago"); ?>
	if(nn==0){
		mint='<?php echo(date("i")); ?>';
		sec='<?php echo(date("s")); ?>';
		tot=parseInt(mint*60)+parseInt(sec);
		
	}else{
		tot=parseInt(tot)+1;
		
	}
timeset=parseInt(tot)%parseInt(counterRange);		
tot1=parseInt(counterRange)-parseInt(timeset);
		

extime='<?php echo $configRecUnchanged["updateBackupinsec"];?>';

mint=parseInt(parseInt(tot1)/60);
sec=parseInt(tot1)%60;
  i=addZero(mint);

  j=addZero(sec);


	if(parseInt(timeset)==0){
		
		 Main.updatedataBase();
		 
	}
	nn++;
	return [i,j];
		}
		});
})

		
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var is_scripts = <?=$switch_setting['script_id']?>;

if(is_scripts == 6) {
MainCustom.Backurlwork();
}
$(document).ready(function() {
		var is_scripts = <?=$switch_setting['script_id']?>;

		if(is_scripts == 1) {
			if(history.pushState && history.replaceState) {
				window.onpopstate = function(e) {
					if(e.state !=null){
						
						if(e.state.id == "99"){					
							window.location.href = '../';
						}else if(e.state.id == "111"){					
							window.location.href = '../';
						} else if(passingBy == "searching") {				
							window.location.href = '../';		
						}

						if(e.state.id == "100"){
							
							// business page
							if(Shopping.RedirectToCity){
								Shopping.changeDelType(3)
							}else{
								Shopping.changeDelType(3)	
							}
						}
						if(e.state.id == "101"){
							
							// restaurant page
							Shopping.OpenBusiness(currentshop)
						}
						if(e.state.id == "102"){
							// checkout page
							if(Main.stepBack == 7){
								history.go(-(history.length - 1));
								window.history.replaceState( {} , null, Shopping.ActiveBusinessSlugName );
								window.location ='./'+Shopping.ActiveBusinessSlugName;						
					
							}else if(Main.stepBack == 5) {
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
								if(Shopping.RedirectToCity){	
									Shopping.changeDelType(3)
								}else{
									Shopping.changeDelType(2)	
								}
							}else{
								Shopping.OpenCartCheck();
							}
						}	
						if(e.state.id == "105"){				

							// confirmation page
						}
					}
					
					
					//perhaps use an ajax call to update content based on the e.state.id
				};
			}
		}else{
			MainCustom.Backurlwork();
		}
	});
//AutoPop.Main1();
//Reset counter end
</script>



<!-- Date Picker -->


<style>
.checkoutloading{	
	position: fixed;
	left: 0;
	top: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: rgba(0,0,0,0.7) url(images/step4-checkout/cbt-spinner.gif) no-repeat center center;
}
.businessloading{	
	position: fixed;
	left: 0;
	top: 0;
	z-index: 1041;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: rgba(255,255,255,1);
}
</style>
<?php
require('panel/config.php');


$link = ConnectDB($CFG);
pg_prepare($link,'sql3qw',"SELECT * from w_configs where name='chatinc'");
$result = pg_execute($link,'sql3qw',array());
$row =  pg_fetch_array($result);
$value = $row['value'];

if($value==''){
	
pg_prepare($link,'sql4qw',"SELECT * from w_configs where name='olarklive'");
$result2 = pg_execute($link,'sql4qw',array());
$row =  pg_fetch_array($result2);
$value = $row['value'];
}


pg_prepare($link,'sql5qw',"SELECT * from w_configs where name='crazyegg'");
	$result2 = pg_execute($link,'sql5qw',array());
	$row3 =  pg_fetch_array($result2);
	$value2 = $row3['value'];


//echo $value2;	 
$chat = $value;
//echo $chat;

?>



<script>window._wfx_settings={"ent_id":"56aaf1d0-5b90-11e5-a354-448a5b5dd1ba"};</script><script type='text/javascript' src='//whatfix.com/embed/embed.nocache.js'></script>


<?php
echo $chat;
?>
<!-- Sweet Alert index primero -->
<script src="dist/sweetalert-dev.js"></script>
<link rel="stylesheet" href="dist/sweetalert.css">
<!-- End Sweet alert -->

<!-- CSS Modal Portfolio -->
<link href="css/portfolio-modal.css" rel="stylesheet">
<link rel="stylesheet" href="/css/font-awesome-4.6.3/css/font-awesome.min.css">

</head>
<body>
<?php 


	$_SESSION['is_device'] = $fetch_switching_theme['is_device']; ?>
<? if($fetch_switching_theme['is_separate']== 0){
	if($configRec["sitepagesettings"] == 2){
		
		
?>
	<div id="checkoutloading" class="checkoutloading" style="display:none;"></div>
	<div id="businessloading" class="businessloading" style="display:none;"></div>

	<? include("panel/".$moduleName."/layout/header.php"); ?>

	<?php } else if($configRec["sitepagesettings"] == 1){
				include("header_switch.php");
			}?>
<? 	include("panel/".$moduleName."/layout/content.php");?>

<?php 
	if($configRec["sitepagesettings"] == 2){
		include("panel/".$moduleName."/layout/footer_cms.php");
	}else if($configRec["sitepagesettings"] == 1){
		include("footer_switch.php");
	} 
} else { ?>
	<div id="checkoutloading" class="checkoutloading" style="display:none;"></div>
	<?php if($configRec["sitepagesettings"] == 2){ ?>
	<? include("panel/".$moduleName."/".$DeviceType."/theme/".$fetch_switching_theme['name']."/layout/header.php");?>
	<?php }else if($configRec["sitepagesettings"] == 1){
	include("header_switch.php"); 
	} ?>

	<? include("panel/".$moduleName."/".$DeviceType."/theme/".$fetch_switching_theme['name']."/layout/content.php");?>
	<?php if($configRec["sitepagesettings"] == 2){ ?>
	<? include("panel/".$moduleName."/".$DeviceType."/theme/".$fetch_switching_theme['name']."/layout/footer_cms.php");?>
	<?php }else if($configRec["sitepagesettings"] == 1){
	include("footer_switch.php");
	} ?>
	<? } ?>
    
<input type="hidden" name="payNumber" id="payNumber" value="0" >
<input type="hidden" name="cityName" id="cityName" value="<?=$businessName?>" >
<input type="hidden" name="mapbox1" id="mapbox1" value="0" >
<input type="hidden" name="searchs_txt" id="searchs_txt" value="" >
<input type="hidden" name="blistName" id="blistName" value="<?=$backuplinks[0]?>" >
<input type="hidden" name="reviewOrderID" id="reviewOrderID" value="<?=$_REQUEST['order']?>" >
<input type="hidden" name="isResponsive" id="isResponsive" value="<?=$fetch_switching_theme['is_device']?>" >



</body>
</html>


 




<?php } ?>
