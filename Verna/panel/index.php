<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))ob_start("ob_gzhandler");else ob_start();
header("Content-type: text/html; charset: UTF-8");
session_start();

if(!isset($_SESSION['user'])){
       echo "<script type='text/javascript'>alert('Please Login');</script>";
       echo "<script>window.location='../'</script>";
}
$lang_file;
if(isset($_GET['l']) && $_GET['l'] != '')
	$lang_file = GetLangFile($_GET['l']);
else
	$lang_file = GetLangFile('en');
//Time selection settings. 	
$records = FetchAllsettingsCustomOrg();	
require_once('login/common.php');
require("../languages/lang.en.php");
require_once('lib/order-details.php');

require_authentication();
$random = substr(md5(uniqid(rand())),0,5);
////////////////////////

function FetchAllsettingsCustomOrg()
       {
		include_once $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
		$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
		$link = pg_connect($string);
       pg_prepare($link,'sql3','SELECT * from w_configs ');
       $result = pg_execute($link,'sql3',array());

       //$settings = array();

       while($row = pg_fetch_array($result))
               {

               $id = $row['id'];
               $name =  $row['name'];
               $setting[$name] = $row['value'];
               //array_push($settings,$setting);
               }

       return $setting;
   	}
function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';
	
	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}
// Get language from get or put default as en
include_once $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);

$dcm = "decimal_point";
pg_prepare($link,'sqldcpfetch1','SELECT * FROM w_configs WHERE name=$1');
$resultdcm = pg_execute($link,'sqldcpfetch1',array($dcm));
$rowdcm = pg_fetch_array($resultdcm);

function GetDecimalPoint($a){	
	
	$nuber_decimal_point = number_format($a,$_SESSION['decimal_value']);
	return $nuber_decimal_point;
	
}

?>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie6"> <![endif]-->
<!--[if IE 7 ]><html class="ie7"><![endif]-->
<!--[if IE 8 ]><html class="ie8"><![endif]-->
<!--[if (gt IE 8)|!(IE)]><!--><html class=""><!--<![endif]-->
<head>
<meta charset="utf-8"/>
<title><?=$records['sitename']?></title>
<link type='text/css' rel='stylesheet' href='http://fonts.googleapis.com/css?family=Open+Sans:400,700'/>
<link type='text/css' rel='stylesheet' href="theme/panel.css"/>



<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
<script src="https://code.jquery.com/jquery-migrate-1.0.0.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true&libraries=geometry"></script>
<script type="text/javascript" src="js/panel-bulk.php?v=1.2.2&u=<?php echo $_SESSION['user']->level;?>&l=<?php isset($_GET['l']) ? $_GET['l'] : 'en' ?>">
</script>

<script type="text/javascript" src="cms/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="cms/ckeditor/plugins/image/plugin.js"></script>
<script type="text/javascript" src="cms/ckeditor/config.js"></script>


<!-- Date Picker -->
<link href="../resources/datepicker/jquery.datepick.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../resources/datepicker/jquery.datepick.js"></script>

<script type="text/javascript">

$(function() {
	$('#dfrm').datepick();
	 $("#tfrm").datepick();
});

</script>

<!-- Date Picker -->



<script>
$( document ).ready(function() {
window.setInterval(function(){
		 SuperAdmin.autoLogout();
	}, 30000);


	$( "#todayBt" ).click(function() {
		$( "#todayBt" ).addClass("tab_active");
		$( "#weekBt" ).removeClass("tab_active");
		$( "#monthBt" ).removeClass("tab_active");
		$( "#yearBt" ).removeClass("tab_active");

		$( "#todayId" ).show();
		$( "#weekId" ).hide();
		$( "#monthId" ).hide();
		$( "#yearId" ).hide();
	});

	$( "#weekBt" ).click(function() {
		$( "#todayBt" ).removeClass("tab_active");
		$( "#weekBt" ).addClass("tab_active");
		$( "#monthBt" ).removeClass("tab_active");
		$( "#yearBt" ).removeClass("tab_active");

		$( "#todayId" ).hide();
		$( "#weekId" ).show();
		$( "#monthId" ).hide();
		$( "#yearId" ).hide();


	});

	$( "#monthBt" ).click(function() {
		$( "#todayBt" ).removeClass("tab_active");
		$( "#weekBt" ).removeClass("tab_active");
		$( "#monthBt" ).addClass("tab_active");
		$( "#yearBt" ).removeClass("tab_active");

		$( "#todayId" ).hide();
		$( "#weekId" ).hide();
		$( "#monthId" ).show();
		$( "#yearId" ).hide();

	});

	$( "#yearBt" ).click(function() {
		$( "#todayBt" ).removeClass("tab_active");
		$( "#weekBt" ).removeClass("tab_active");
		$( "#monthBt" ).removeClass("tab_active");
		$( "#yearBt" ).addClass("tab_active");

		$( "#todayId" ).hide();
		$( "#weekId" ).hide();
		$( "#monthId" ).hide();
		$( "#yearId" ).show();

	});

})
</script>


</head>
<?php
if(!empty($_REQUEST['bidr']) && $_REQUEST['bidr'] !=""){
	$bid = $_REQUEST['bidr'];

?>

<body onLoad="Business.Main()">
<?php } else { ?>
<body>
<?php } ?>
<div class="header nonselectable">
	<div class="logo"></div>
	<div class="tools">
		<div class="type" style="float:left">
			<div id="usericon" title="Perfil"></div>
			<div id="usertype" class="caption"></div>
		</div>
	<div id="msgsicon" class="hand" title="Mensajes" style="display:none"></div>

   <div class="navigation" id="panel_1">

    <div id="panel-member">

    	<div class="box_blue">
        <span class="box_icon"><img src="../images/panel/total_order_icon.png"></span>
        <div class="qnt" id="total_orders"><?=$total_orders?></div><!--qnt-->
        <div class="box_text"><?=$lang_resource['Total_Orders']?></div><!--box_text-->
        </div><!--box_blue-->

        <div class="box_green">
        <span class="box_icon"><img src="../images/panel/total_sales_icon.png"></span>
        <div class="qnt" id="total_sales"><?=$lang_resource['Panel_Currency']?> <?=GetDecimalPoint($total_price)?></div><!--qnt-->
        <div class="box_text"><?=$lang_resource['Total_Sales']?></div><!--box_text-->
        </div><!--box_green-->

        <div class="box_purp">
        <span class="box_icon"><img src="../images/panel/total_comm_icon.png"></span>
        <div class="qnt" id="total_comm_icon"><?=$lang_resource['Panel_Currency']?> <?=GetDecimalPoint($comission)?></div><!--qnt-->
        <div class="box_text"><?=$lang_resource['Total_Commissions']?></div><!--box_text-->
        </div><!--box_purp-->

        <div class="box_orng">
        <span class="box_icon"><img src="../images/panel/total_turnover_icon.png"></span>
        <div class="qnt" id="total_trunover"><?=$lang_resource['Panel_Currency']?> <?=GetDecimalPoint($total_trunover)?></div><!--qnt-->
        <div class="box_text"><?=$lang_resource['Total_Turnover']?></div><!--box_text-->
        </div><!--box_blue-->

        <div class="settings"><a href="javascript:void(0)" id="opcsicon" class="hand"><img src="../images/panel/settings.png"></a></div><!--settings-->

        </div>
        <div class="logout"><a href="javascript:void(0)" id="logouticon" class="hand"><img src="../images/panel/log_out.png"></a></div><!--logout-->

        </div>

    </div>
	</div>
</div>
<div class="menubox nonselectable">
	<div class="bg">
		<div class="gradient">
			<div id="menu"></div>
		</div>
	</div>
</div>
<div class="mainleft">
	<div id="leftcol"></div>
	<div id="loadingbox">
		<div id="progressbox" class="progressbox">
			<div id="progressbar" class="bar"></div>
		</div>
	</div>
</div>
<div id="main"></div>
<div id="totalOrderBox" style="display:none">
<div class="top_line"></div><!--top_line-->
<div class="tab_div">
	<div class="tab-nav">
    	<div class="tab-box tab_active hand" id="todayBt"><a href="javascript: void(0)" ><?=$lang_resource['Today']?></a></div><!--tab-box-->
        <div class="tab-box hand" id="weekBt"><a href="javascript: void(0)" ><?=$lang_resource['Week']?></a></div><!--tab-box-->
        <div class="tab-box hand" id="monthBt"><a href="javascript: void(0)" ><?=$lang_resource['Month']?></a></div><!--tab-box-->
        <div class="tab-box hand" id="yearBt"><a href="javascript: void(0)" ><?=$lang_resource['Year']?></a></div><!--tab-box-->
    </div><!--tab-nav-->
    <div class="tab-content-box" id="todayId">
    	<table class="tad-table">
        	<thead>
            	<tr>
                	<td colspan="2"><?=$currentdate ?></td>
                </tr>
            </thead>
        	<tr>
            	<td><strong><?=$lang_resource['Orders_Today']?></strong></td>
                <td><?=$total_orders_inday?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Sales_Today']?></strong></td>
                <td><?=$lang_resource['Panel_Currency']?><?=$today_price?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Pending_Orders']?></strong></td>
                <td><?=$today_pending_order?></td>
            </tr>

            <tr>
            	<td><strong><?=$lang_resource['Completed_Orders']?></strong></td>
                <td><?=$today_completed_order?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Cancelled_Orders']?></strong></td>
                <td><?=$today_cancelled_order?></td>
            </tr>
        </table>
    </div>

    <div class="tab-content-box"  id="weekId" style="display:none"  >
    	<table class="tad-table">
        	<thead>
            	<tr>
                	<td colspan="2"><?=$lang_resource['Last7days']?></td>
                </tr>
            </thead>
        	<tr>
            	<td><strong><?=$lang_resource['Total_Orders']?> </strong></td>
                <td><?=$week_orders_inday?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Sales_Today']?></strong></td>
                <td><?=$lang_resource['Panel_Currency']?> <?=$week_price?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Pending_Orders']?></strong></td>
                <td> <?=$week_pending_order?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Completed_Orders']?></strong></td>
                <td> <?=$week_completed_order?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Cancelled_Orders']?></strong></td>
                <td> <?=$week_cancelled_order?></td>
            </tr>
        </table>
    </div>
    <div class="tab-content-box" id="monthId" style="display:none">
    	<table class="tad-table">
        	<thead>
            	<tr>
                	<td colspan="2"><?=$lang_resource['Last30days']?></td>
                </tr>
            </thead>
        	<tr>
            	<td><strong><?=$lang_resource['Total_Orders']?> </strong></td>
                <td><?=$month_orders_inday?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Sales_Today']?></strong></td>
                <td><?=$lang_resource['Panel_Currency']?> <?=$month_price?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Pending_Orders']?></strong></td>
                <td><?=$month_pending_order?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Completed_Orders']?></strong></td>
                <td><?=$month_completed_order?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Cancelled_Orders']?></strong></td>
                <td><?=$month_cancelled_order?></td>
            </tr>
        </table>
    </div>
    <div class="tab-content-box" id="yearId" style="display:none">
    	<table class="tad-table">
        	<thead>
            	<tr>
                	<td colspan="2"><?=$yearText?></td>
                </tr>
            </thead>
        	<tr>
            	<td><strong><?=$lang_resource['Total_Orders']?> </strong></td>
                <td><?=$year_orders_inday?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Sales_Today']?></strong></td>
                <td><?=$lang_resource['Panel_Currency']?> <?=$year_price?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Pending_Orders']?></strong></td>
                <td><?=$year_pending_order?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Completed_Orders']?></strong></td>
                <td><?=$year_completed_order?></td>
            </tr>
            <tr>
            	<td><strong><?=$lang_resource['Cancelled_Orders']?></strong></td>
                <td><?=$year_cancelled_order?></td>
            </tr>
        </table>
    </div>
</div><!--tab_div-->
</div>
<div id="popupcontainer"></div>
<div id="contextmenucontainer"></div>

<div id="initbg"></div>

</body>
</html>
