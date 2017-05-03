<?
session_start();

require_once("login/authenticate.php");
require_once('login/common.php');
//require("../admin/languages/lang.en.php");
include $_SERVER['DOCUMENT_ROOT'].'/admin/config.php';
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
	$_SESSION['admin_lang'] = $defaultlang;
}else{
	$counter=1;
	if(isset($_SESSION['admin_lang'])){
		if(!in_array($_SESSION['admin_lang'], $langarray)){
			$_SESSION['admin_lang'] = $defaultlang;
		}
	}else{
		$_SESSION['admin_lang'] = $defaultlang;
	}
}

$dcm = "decimal_point";
pg_prepare($link,'sqldcpfetch1','SELECT * FROM w_configs WHERE name=$1');
$resultdcm = pg_execute($link,'sqldcpfetch1',array($dcm));
$rowdcm = pg_fetch_array($resultdcm);
$_SESSION['decimal_value']=$rowdcm['value'];


if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
  
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 =pg_fetch_array($result1);
    $_SESSION['admin_lang'] = $row1['id'];
}

pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_admin');
$result = pg_execute($link,'sqlfetchlang',array());
while($row = pg_fetch_array($result)){
    $lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['admin_lang']];    
}
require_once("switching_panel_configs.php");

if($_REQUEST['mode']=="login") {
	login($_POST['email'],$_POST['password']);
}
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="description" content="Sentir, Responsive admin and dashboard UI kits template">
		<meta name="keywords" content="admin,bootstrap,template,responsive admin,dashboard template,web apps template">
		<meta name="author" content="Ari Rusmanto, Isoh Design Studio, Warung Themes">
		<title>Admin Panel</title>

		<!-- BOOTSTRAP CSS (REQUIRED ALL PAGE)-->
		<link href="assets/css/bootstrap.min.css" rel="stylesheet">

		<!-- PLUGINS CSS -->
		<link href="assets/plugins/weather-icon/css/weather-icons.min.css" rel="stylesheet">
		<link href="assets/plugins/prettify/prettify.min.css" rel="stylesheet">
		
		<!--<link href="assets/plugins/owl-carousel/owl.carousel.min.css" rel="stylesheet">
		<link href="assets/plugins/owl-carousel/owl.theme.min.css" rel="stylesheet">
		<link href="assets/plugins/owl-carousel/owl.transitions.min.css" rel="stylesheet">-->
		<link href="assets/plugins/chosen/chosen.min.css" rel="stylesheet">
		<!--<link href="assets/plugins/icheck/skins/all.css" rel="stylesheet">-->
		<link href="assets/plugins/datepicker/datepicker.min.css" rel="stylesheet">
		<link href="assets/plugins/timepicker/bootstrap-timepicker.min.css" rel="stylesheet">
		<!--<link href="assets/plugins/validator/bootstrapValidator.min.css" rel="stylesheet">-->
	
		<link href="assets/plugins/datatable/css/bootstrap.datatable.min.css" rel="stylesheet">
		<!--<link href="assets/plugins/markdown/bootstrap-markdown.min.css" rel="stylesheet">
		
		<link href="assets/plugins/morris-chart/morris.min.css" rel="stylesheet">
		<link href="assets/plugins/c3-chart/c3.min.css" rel="stylesheet">
		<link href="assets/plugins/slider/slider.min.css" rel="stylesheet">-->

		<!-- MAIN CSS (REQUIRED ALL PAGE)-->
		<link href="assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
		<link href="assets/css/style.css" rel="stylesheet">
		<link href="assets/css/style-responsive.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="assets/color-picker/jquery.minicolors.css">

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->

        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
        <link rel="stylesheet" type="text/css" href="style.css">

        <link href='assets/js/source/css.css' rel='stylesheet' type='text/css'>

		

<script language='javascript'>window._wfx_settings={"ent_id":"56aaf1d0-5b90-11e5-a354-448a5b5dd1ba"};</script><script language='javascript' async='true' type='text/javascript' src='//whatfix.com/embed/embed.nocache.js'></script>
        		<!--
		===========================================================
		Placed at the end of the document so the pages load faster
		===========================================================
		-->
		<!-- MAIN JAVASRCIPT (REQUIRED ALL PAGE)-->
		<script src="assets/js/jquery.min.js"></script>
		<script src="assets/js/bootstrap.min.js"></script>		
		<script src="assets/plugins/retina/retina.min.js"></script>
		<script src="assets/plugins/nicescroll/jquery.nicescroll.js"></script>
		<script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>
		<script src="assets/plugins/backstretch/jquery.backstretch.min.js"></script>

		<!-- PLUGINS -->
		<!--<script src="assets/plugins/skycons/skycons.js"></script>-->
		<script src="assets/plugins/prettify/prettify.js"></script>
		<script src="assets/plugins/chosen/chosen.jquery.min.js"></script>
        
		<!--<script src="assets/plugins/owl-carousel/owl.carousel.min.js"></script>
		
		<script src="assets/plugins/icheck/icheck.min.js"></script>
		<script src="assets/plugins/datepicker/bootstrap-datepicker.js"></script>
		<script src="assets/plugins/timepicker/bootstrap-timepicker.js"></script>
		<script src="assets/plugins/mask/jquery.mask.min.js"></script>
		<script src="assets/plugins/validator/bootstrapValidator.min.js"></script>
		
	
		<script src="assets/plugins/markdown/markdown.js"></script>
		<script src="assets/plugins/markdown/to-markdown.js"></script>
		<script src="assets/plugins/markdown/bootstrap-markdown.js"></script>
		<script src="assets/plugins/slider/bootstrap-slider.js"></script>-->

		<!-- EASY PIE CHART JS -->
		<!--<script src="assets/plugins/easypie-chart/easypiechart.min.js"></script>
		<script src="assets/plugins/easypie-chart/jquery.easypiechart.min.js"></script>-->

		<!-- KNOB JS -->
		<!--[if IE]>
		<script type="text/javascript" src="assets/plugins/jquery-knob/excanvas.js"></script>
		<![endif]-->
		<!--<script src="assets/plugins/jquery-knob/jquery.knob.js"></script>
		<script src="assets/plugins/jquery-knob/knob.js"></script>-->

		<!-- FLOT CHART JS -->
		<!--<script src="assets/plugins/flot-chart/jquery.flot.js"></script>
		<script src="assets/plugins/flot-chart/jquery.flot.tooltip.js"></script>
		<script src="assets/plugins/flot-chart/jquery.flot.resize.js"></script>
		<script src="assets/plugins/flot-chart/jquery.flot.selection.js"></script>
		<script src="assets/plugins/flot-chart/jquery.flot.stack.js"></script>
		<script src="assets/plugins/flot-chart/jquery.flot.time.js"></script>-->

		<!-- MORRIS JS -->
		<!--<script src="assets/plugins/morris-chart/raphael.min.js"></script>
		<script src="assets/plugins/morris-chart/morris.min.js"></script>-->

		<!-- C3 JS -->
		<!--<script src="assets/plugins/c3-chart/d3.v3.min.js" charset="utf-8"></script>
		<script src="assets/plugins/c3-chart/c3.min.js"></script>-->

		<!-- MAIN APPS JS -->
		<script src="assets/js/apps.js"></script>
		
        <!-- VALIDATION JS -->
         <script src="assets/plugins/validator/example.js"></script>
	




<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry"></script>

<script type="text/javascript" src="../admin/js/md5.js"></script>
<script type="text/javascript" src="assets/js/source/jquery.min.js"></script>



<script type="text/javascript" language="javascript">
function logout(){
	$.post("../admin/login/logout.php", "", function () {
		Main.User = null;
		top.location.href ='http://<?=$_SERVER['SERVER_NAME']?>/admin/';
	});
}

function isEmails(b){
	  var a = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
 	   return a.test(b)	;
}

</script>


<!--alert popup-->
<script src='assets/js/source/jquery-2.0.3.min.js'></script>
<script src='assets/js/jAlert-v2.js'></script>
<link rel="stylesheet" type="text/css" href="assets/css/jAlert-v2.css">
<!--alert popup-->

<!--CSV-->
<script src='assets/csv/opencpu-0.4.js'></script>
<!--CSV-->

<!-- CMS -->
<script type="text/javascript" src="cms/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="cms/ckeditor/plugins/image/plugin.js"></script>
<script type="text/javascript" src="cms/ckeditor/config.js"></script>
<!-- CMS -->


<script src="assets/js/source/jquery-1.10.2.js"></script>
<script src="assets/js/source/jquery-ui.js"></script>

<!--pagination-->

<script src="assets/js/jPages.min.js" type="text/javascript"></script>
<link href="assets/css/pagination.css" rel="stylesheet" type="text/css" />

<? if($moduleName !="OOS") { ?>

<script type="text/javascript" src="js/switching-panel-bulk.php?v=1.2.2&u=<?php echo $_SESSION['user']->level;?>&l=<?php isset($_GET['l']) ? $_GET['l'] : 'en' ?>&script_id=<?=$switch_setting['script_id']?>&theme_id=<?=$switch_setting['script_admin_theme_id']?>&template=<?=$_REQUEST['template']?>&random=<?=rand()?>"></script>
<? } else {?>
<script type="text/javascript" src="js/panel-bulk.php?v=1.2.2&u=<?php echo $_SESSION['user']->level;?>&l=<?php isset($_GET['l']) ? $_GET['l'] : 'en' ?>&script_id=<?=$switch_setting['script_id']?>&theme_id=<?=$switch_setting['script_admin_theme_id']?>&template=<?=$_REQUEST['template']?>&random=<?=rand()?>"></script>
<? } ?>
<script type="text/javascript" src="assets/color-picker/jquery.minicolors.js"></script>
<style>
.glyphicon-remove,
.glyphicon-ok{
	display:none !important;
}
</style>
<style>

#loading,#loading1 {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: rgba(255,255,255,0.7) url(loadingpaypal.gif) no-repeat center center;
}

</style>

<script src="assets/clockpicker/jquery-clockpicker.min.js" type="text/javascript" language="javascript" ></script>
<link rel="stylesheet" href="assets/clockpicker/jquery-clockpicker.min.css" >
<script type="text/javascript">
function admintutorial(){
	window.location.href ='<?=$lang_resource['CONTROL_PANEL_TUTORIALS_URL']?>'
}
</script>
</head>
<?

if(!isset($_SESSION['user'])){

include 'login.php';
 } else{

 ?>

<!--onLoad="Orders.Main()"-->

<body class="tooltips" >

<div id="leftcol"  style="display:none"></div>
	<div id="loadingbox"  style="display:none">
		<div id="progressbox" class="progressbox">
			<div id="progressbar" class="bar"></div>
		</div>
	</div>




		<div class="wrapper">

			<?php //normal user
if($_SESSION['user']->level != '3'){
?>
			<!-- BEGIN TOP NAV -->
			<div class="top-navbar">
                                <!-- Strt Loading  -->
                    <div id="loading" style="display:none;">


                    </div>
                    <!-- End Loading  -->

				<div class="top-navbar-inner">
					
                   

					<!-- Begin Logo brand -->
					<div class="logo-brand" style="height:24px !important;">

					</div><!-- /.logo-brand -->
					<!-- End Logo brand -->
					

					<div class="top-nav-content" style="margin-left: 0px;" >



						<!-- Begin button sidebar left toggle -->
						<div class="btn-collapse-sidebar-left" id="hidebutton">
							<i class="fa icon-menu2 icon-dinamic"></i>
						</div><!-- /.btn-collapse-sidebar-left -->
						<!-- End button sidebar left toggle -->

						<!-- Begin button sidebar right toggle -->
						<!-- /.btn-collapse-sidebar-right -->
						<!-- End button sidebar right toggle -->

						<!-- Begin button nav toggle -->


                        <div class="row" >
                        	<div class="col-md-2">
                                 <div class="colepls_wrapper">
                                    <div class="btn-collapse-sidebar-left toggal_btn_text" id="hidebutton2">
                                    <h5 class="header-heading hidemenu" id="hidem"><?=$lang_resource['ADMIN_PAGE_MANAGE_HIDE_MENU']?></h5>
                                    <h5 class="header-heading hidemenu" id="showm" style="display:none;"><?=$lang_resource['ADMIN_PAGE_MANAGE_SHOW_MENU']?></h5>
                                    </div><!--btn-collapse-sidebar-left-->
                                 </div><!--colepls_wrapper-->
                            </div><!--col-md-2-->
                            <div  style="height: 1px;" class="navbar-collapse collapse top-header" id="main-fixed-nav">
                           
                            <div class="col-md-2">
                            <div class="admin-language">
                             <?php if($counter == 1 ){ ?>
                            <select class="form-control rounded" onchange="langChangeAdmin(this.value)">
                            
                            <?php
							  pg_prepare($link,'sqllangfetchlang55','SELECT * FROM w_lang_setting WHERE enabled=$1');
  							  $result1 = pg_execute($link,'sqllangfetchlang55',array('TRUE'));
							  
							   while($row =pg_fetch_array($result1)){
                            if(isset($_SESSION['admin_lang'])){
                              if($row['id'] == $_SESSION['admin_lang']){  
                                $selectdvar = 'selected';
                              }else{
                                $selectdvar = ''; 
                              }
                            }							
							?>
                            <option value="<?php echo $row['id']; ?>" <?php echo $selectdvar ?> ><?php echo $row['lang_text']; ?></option>
                      <?php  } ?>  
                            </select>
                            <?php } ?>
                            </div>
                            </div>

                        	<div class="col-md-2">
                            		<div class="export-btn-dv">
                                <form class="navbar-form navbar-right export-btn-dv" role="search" action="javascript:admintutorial()" method="post">
                                    <div class="form-group">
                                        <button class="btn btn-default btn-rounded-lg tutorial-btn"><i class="fa icon-play2"></i> <?=$lang_resource['CONTROL_PANEL_MENU_TUTORIALS']?></button>
                                    </div>
                                </form>
                                </div><!--export-btn-dv-->
                            </div><!--col-md-4-->
                            <div class="col-md-4">

	
                            		<ul class="nav-user navbar-left">
                        		<li class="dropdown">
                            	<span class="my-ac"><?=$lang_resource['CONTROL_PANEL_MENU_MYACCOUNT']?></span>
							  <a href="#fakelink" class="dropdown-toggle" data-toggle="dropdown">
		
		<?php 
			$path ="../panel/images/users/".$_SESSION['user']->id;
            if (!is_dir($path)) { 
        ?>
        <img src="../admin/images/dummy/user.jpg" width="100" height="100" class="avatar img-circle" alt="Avatar">      
		<?php } else { ?>
		<img src="../panel/images/users/<? echo $_SESSION['user']->id; ?>/small.jpg?c=<?=rand()?>" width="100" height="100" class="avatar img-circle" alt="Avatar">
		<?php }  ?>

								
								<? echo $_SESSION['user']->email; ?>
							  </a>
							  <ul class="dropdown-menu square primary margin-list-rounded with-triangle">
								<li>
                                <?php
								if($_SESSION['user']->level=='0' || $_SESSION['user']->level=='1' || $_SESSION['user']->level=='2'){
								?>
                                <a href="javascript:Myprofile.EditProfile()"><?=$lang_resource['CONTROL_PANEL_MENU_MYPROFILE']?></a>
                                <?php }elseif($_SESSION['user']->level=='4'){?>
                                <a href="javascript:DriverProfile.EditProfile()"><?=$lang_resource['CONTROL_PANEL_MENU_MYPROFILE']?></a>
                                <?php }elseif($_SESSION['user']->level=='5'){?>
                                <a href="javascript:drivermanagerMyprofile.EditProfile()"><?=$lang_resource['CONTROL_PANEL_MENU_MYPROFILE']?></a>
                                <?php }else{?>
                                <?php }?>
                                </li>
								<li class="divider"></li>								
								<li><a href="javascript:logout()" ><?=$lang_resource['CONTROL_PANEL_MENU_LOGOUT']?></a></li>
							  </ul>
							</li>
						</ul>
                            </div><!--col-md-3-->
                            <div class="col-md-2">
                            		<div class="logout">
							  <a href="javascript:logout()" class="" id="logouticon" data-toggle="">
								<?=$lang_resource['CONTROL_PANEL_MENU_LOGOUT']?>
							  </a>
						</div><!--logout-->
                            </div><!--col-md-1-->
                            </div><!--toggle-->
                        </div><!--row-->

						<div class="btn-collapse-nav" data-toggle="collapse" data-target="#main-fixed-nav" style=" margin-top:-60px;">
							<i class="fa fa-plus icon-plus"></i>
						</div><!-- /.btn-collapse-sidebar-right -->
						<!-- End button nav toggle -->

					</div><!-- /.top-nav-content -->
				</div><!-- /.top-navbar-inner -->
			</div><!-- /.top-navbar -->
			<!-- END TOP NAV -->
			<?php }else{?>
<script type="text/javascript">
top.location.href ='http://<?=$_SERVER['SERVER_NAME']?>';
</script>
<?php } ?>


			<!-- BEGIN SIDEBAR LEFT -->
			<div class="sidebar-left sidebar-nicescroller">

				<ul class="sidebar-menu" id="accordion1">

				</ul>
			</div><!-- /.sidebar-left -->
			<!-- END SIDEBAR LEFT -->





			<!-- BEGIN PAGE CONTENT -->
			<div class="page-content">
				<div class="container-fluid" id="main">










				</div><!-- /.container-fluid -->



				<!-- BEGIN FOOTER -->
				<!--<footer>
					&copy; 2014 <a href="#">Ordering Online System</a><br />
					Design by <a href="#" target="_blank">Acuity</a>
				</footer>-->
				<!-- END FOOTER -->


			</div><!-- /.page-content -->
		</div><!-- /.wrapper -->
		<!-- END PAGE CONTENT -->

<div id="popup_container"></div>
</body>
<? } ?>

<!--widget start-->
<?php
$ste_url=$_SERVER['HTTP_HOST'];
?>
<input type="hidden" id="main_site_url" value="<?='http://'.$ste_url?>"/>
<!--widget end-->

</html>

<style>
#accordion1 li.panel{
    margin-bottom: 0px;
}
</style>

<script>
$(document).ready(function(){
   $("#hidebutton").click(function(){
   		$(".hidemenu").toggle();
   });
     $("#hidebutton2").click(function(){
   		$(".hidemenu").toggle();
   });
	   $(window).resize(function() {
			if($(this).width() <= 991){
			  if(as == false){
				$("#showm").show();
				$("#hidem").hide();
			  }else{
				$("#hidem").show();
				$("#showm").hide();
			  }
			}else{
			 if(as == true){
				$("#hidem").show();
				$("#showm").hide();
			  }else{
				$("#showm").show();
				$("#hidem").hide();
			  }
			}
		});
});
$(document).ready(function(){
	var as = true;
	if( $(this).width() <= 991){
		as = false;
		$("#showm").show();
		$("#hidem").hide();
	}else{
		as = true;
		$("#hidem").show();
		$("#showm").hide();
	}

	/*if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		if (document.cookie.indexOf("iphone_redirect=false") == -1) {
			$("#showm").show();
			$("#hidem").hide();
		}
	}*/

});


</script>
<script>
 function langChangeAdmin(a){

  $.post("lib/panel-configs.php", "f=langchangeadmin&id="+a, function (f) {    
    location.reload(); 
  })
}
</script>