<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/html; charset: UTF-8");
session_start();
require_once("panel/lib/front-main.php");
if(isset($_GET["collection_id"]))
{
require_once "panel/payment-gateway/mercadopago/mercadopago.php";
$mp = new MP("3518378222107317", "NWaNUHshAOaxAQSpQrFazNvnMX5zWgKX");
$mp->sandbox_mode(TRUE);
$paymentInfo = $mp->get_payment_info ($_GET["collection_id"]);
 $xid=explode("-",$paymentInfo['response']['collection']['reason']);
 $id=$xid[1];
 $_REQUEST['ou'] = $id;
}
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie6"> <![endif]-->
<!--[if IE 7 ]><html class="ie7"><![endif]-->
<!--[if IE 8 ]><html class="ie8"><![endif]-->
<!--[if (gt IE 8)|!(IE)]><!--><html class=""><!--<![endif]-->
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta charset="utf-8"/>
<title><?= $lang_resource['MOBILE_MAIN_PAGE_TITLE'] ?></title>
<link type='text/css' rel='stylesheet' href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800'/>
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
<link rel="stylesheet" href="mobile.css" />

<link type='text/css' rel='stylesheet' href="panel/theme/<?= (isset($_GET['l']) && $_GET['l'] != '') ? $_GET['l'] : 'en'?>/mobile-front.css"/>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
<script type="text/javascript" src="panel/js/mobile-front-bulk.php?v=1.2.2&l=<?= isset($_GET['l']) ? $_GET['l'] : 'en' ?>"></script>
<script type="text/javascript">
	var Config = <?php GetConfig(array('ga')); ?>;
  var _gaq = _gaq || [];
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

	  function showConfirmOrder(id)
	  {
	  var a = '<table class="confirmorder" align="center"><tbody>';
                a += '<tr><td align="center">';
                a += '<span class="title">THANK YOU FOR YOUR ORDER</span>';
                a += '<span class="completedmessage nonselectable default">Your order has been placed, number:</span>';
                a += '<span class="completednumber">' + id + "</span>";
                a += '<span class="completedmessage nonselectable default">Please come back soon!</span>';
                a += "</td></tr>";
                a += "</tbody></table>";

	                document.getElementById("main1").innerHTML = a;
	  }
	    //});
</script>


<style type="text/css">
#link		{
	height: 52px;
	width: 260px;
	display: block;
}

</style>
</head>


<body <? if(isset($_REQUEST['ou'])) { ?>onLoad="showConfirmOrder('<?=$_REQUEST['ou']?>')" <? }  ?>>
<div id="header" style="display:none">
	<div class="logobox"><div class="logo"><a onclick='window.location.href="<?php echo SITE_URL; ?>";' id="link" /></a></div></div>
	<span class="title"><?= $lang_resource['MOBILE_MAIN_PAGE_ORDER_FOOD_ONLINE'] ?></span>
	<div id="panel-icon" onclick="top.location.href='panel'"></div>
<div id="navigation">
	<table><tbody>
		<tr>
			<td>
				<div id="backbtn" class="button nonselectable">
					<div class="innerbox hand">
						<div class="captionbox">
							<span class="caption">Sign out</span>
						</div>
					</div>
				</div>
			</td>
			<td>
				<div id="cartbtn" class="button nonselectable">
					<div class="innerbox hand">
						<div class="captionbox">
							<span class="caption">Check order status</span>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td >
				<div id="whereamibtn" class="whereamibutton nonselectable">
					<div class="innerbox hand" onclick="">
						<div class="captionbox">
							<span class="caption">Where are you?</span>
						</div>
					</div>
				</div>
			</td>
			<td >
				<div id="geobtn" class="geobutton nonselectable">
					<div class="innerbox hand" onclick="">
						<div class="captionbox">
							<span class="caption">Let us find you!</span>
						</div>
					</div>
				</div>
			</td>
		</tr>
	</tbody></table>
</div>
</div>
<div id="header1">
	<div class="logobox"><div class="logo"><a href="/mobile.php" id="link" /></a></div></div>
	<span class="title"><?= $lang_resource['MOBILE_MAIN_PAGE_ORDER_FOOD_ONLINE'] ?></span>
	<div id="panel-icon" onclick="top.location.href='panel'"></div>
<div id="navigation">
	<table><tbody>


        <tr>
			<td class="whereami" colspan="2">
				<div id="whereamibtn" class="whereamibutton nonselectable">
					<div class="innerbox hand" onclick="">
						<div class="captionbox">
							<span class="caption" style="text-decoration:none !important; color:#FCFCFC !important"><a href="mobile.php" style="text-decoration:none; color:#FCFCFC">BACK</a></span>
						</div>
					</div>
				</div>
			</td>
		</tr>
	</tbody></table>
</div>
</div>
<table id="maintable"><tbody><tr><td valign="top">
	<div id="main" style="display:none"></div>
    <div id="main1" ></div>
	</td></tr>
</tbody></table>
<div id="loadingbox">
	<div id="progressbox" class="progressbox">
		<div id="progressbar" class="bar"></div>
	</div>
</div>
<div id="msgs">
	<span id="themsg"></span>
</div>
<div id="dishadded"></div>
</body>
</html>
