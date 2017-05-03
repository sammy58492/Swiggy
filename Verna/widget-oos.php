<!doctype html>
<?php
$moduleName = "widget-script";
$fetch_switching_theme['name'] = "widget_theme";
$DeviceType = "desktop";
?>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="panel/js/shopping.js"></script>
		<script type="text/javascript" src="fancyBox-master/source/jquery.fancybox.pack.js?v=2.1.5"></script>
		<link rel="stylesheet" type="text/css" href="fancyBox-master/source/jquery.fancybox.css?v=2.1.5" media="screen"/>
		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/custom.css">
		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/widget-responsive-style.css">
		
		
		
		<script src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/bootstrap.min.js"></script>
		<link href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/bootstrap.min.css" rel="stylesheet">
		<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/main_front.css?rand=<?=rand()?>"/>
		<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/bootstrap.min.css?rand=<?=rand()?>"/>

		<link rel="stylesheet" type="text/css" href="css/dishscrollbar.css">

		<link rel="stylesheet" type="text/css" href="font/fontcss.css">
		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/reservation.css">
		<link type='text/css' rel='stylesheet' href='font/css.css'/>
		<link rel="stylesheet" type="text/css" href="font/stylesheet.css">
		<link rel="stylesheet" type="text/css" href="css/popup.css" />

		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/custom.css">
		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/widget-responsive-style.css">
		 <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
		 
		<!-- site Schedule popup -->
		<link href="css/sorry-popup.css" rel="stylesheet" type="text/css">

		<!--  site Schedule popup  -->
		<!-- Date Picker -->
		<link href="resources/datepicker/jquery.datepick.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="resources/datepicker/jquery.datepick.js"></script>

		<!--Reset counter start-->
		<script type="text/javascript" src="counter_plugin/jquery.flipcountdown.js"></script>
		<link rel="stylesheet" type="text/css" href="counter_plugin/jquery.flipcountdown.css" />
		<link rel="stylesheet" type="text/css" href="datetimepicker-master/jquery.datetimepicker.css"/>
		<script type="text/javascript" src="counter_plugin/jquery.flipcountdown.js"></script>
		<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/bootstrap.min.js?rand=<?=rand()?>"/></script>

		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/range/jquery-ui.css">

		<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/range/jquery-ui.js"></script>

		<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/jPages.min.js"></script>
		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/pagination.css">

		<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/lightbox/imagelightbox.js"></script>

		<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/lightbox/lightbox.css">
		<script type="text/javascript">
			function showBusinessPopup(htms) {
				$(document).ready(function () {
					$.fancybox({					
						 'scrolling'     : 'no',
							'overlayOpacity': 0.1,
							'showCloseButton'   : false,
							'content' : htms,
							'afterClose': function () { // USE THIS IT IS YOUR ANSWER THE KEY WORD IS "afterClose"
                parent.location.reload(true);
							}
					});
				});
			}
			function showMenuPopup(htms) {
				
				$(document).ready(function () {
					alert("m")
					$.fancybox.close();
					$.fancybox({					
						 'scrolling'     : 'no',
							'overlayOpacity': 0.1,
							'showCloseButton'   : false,
							'content' : htms
					});
				});
			}	
function OpenBusiness(id) {
	$(document).ready(function () {
		window.child.Shopping.OpenBusiness(id);
	});
}			
		</script>		
	</head>
	<body>		
		<iframe width="720" height="480" src="http://beta.orderingonlinesystem.com/d2lkZ2V0VGhlbWU=" seamless=""></iframe>	
	</body>
</html>