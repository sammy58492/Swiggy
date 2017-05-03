<?php

require("languages/lang.en.php");
require_once("panel/lib/front-main.php");

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



<style type="text/css">
#link		{
	height: 52px;
	width: 260px;
	display: block;
}

</style>
</head>

<?php
//Check Driver Restaurant confirmation
if($_GET['order_id'] && !empty($_GET['confirm']))
{
driverConfirm($_GET['order_id'],$_GET['confirm'],$_GET['time'],$_GET['driver_id'],$_GET['rest'],$_GET['user_mail'],$_GET['driver_email'],$_GET['drivermanager_email'],$_GET['bus_mail']);	
}
?>

<body>
<div id="header">	
	<div class="logobox" style="display:none;"><div class="logo" style="cursor:pointer;"><a onclick='window.location.href="<?=$configRec['siteurl']?>";' id="link" /></a></div></div>
	<span class="title" style="display:none;"><?= $lang_resource['MOBILE_MAIN_PAGE_ORDER_FOOD_ONLINE'] ?></span>
<div id="navigation" style="  margin-top: 20px;">
	<div class="smle_img" style="text-align:center;"><img src="images/common/smile.png" class="smle"></div>
</div>
</div>

<table id="maintable" style="width:100%;"><tbody><tr><td valign="top">
	<div id="main" style="display:none"></div>
    <div id="main1" ><table class="confirmorder" align="center"><tbody>
                <tr><td align="center">
              <div class="cnfrm_scnd"><h2>
			  <?php 
			  if ($_GET['rest']!=1)
			  {//Confirm for Driver
			  
			  if($_GET['order_id'] && ($_GET['confirm']=='t')) 
			  {
				  if($_GET['time']!=1) { ?>
              <?=$lang_resource['ORDER_CONFIRM_YOU_HAVE_ACCEPTED_ORDER_NO']?>:<?=$_GET['order_id']?>.<br>
              <?=$lang_resource['YOU_WILL_DELIVER_IN']?> <?=$_GET['time']?> <?=$lang_resource['YOU_WILL_DELIVER_IN_MINS']?>.
             
             <?php }
              else
              { ?>
              <?=$lang_resource['ORDER_CONFIRM_YOU_HAVE_DELIVERED_ORDER_NO']?>:<?=$_GET['order_id']?>.
              
              <?php }
			  
			  }
			  else
			  if($_GET['order_id'] && ($_GET['confirm']=='f'))
			  {
				  ?>
                  
                  <?=$lang_resource['ORDER_CONFIRM_YOU_HAVE_CANCELLED_ORDER_NO']?>:<?=$_GET['order_id']?>. 
                  <?php
				  
			  }
			  
			  }
			  else if($_GET['rest']==1)
			  {//For restaurant Owner
				  
				 if($_GET['order_id'] && ($_GET['confirm']=='t')) 
			  {
				?>
              <?=$lang_resource['ORDER_CONFIRMED_ACCEPTED_BY_DRIVER_ESTIMATED_DELIVERY_TIME']?>:<?=$_GET['order_id']?> is <?=$_GET['time']?> mins.
             
             <?php
			  
			  }
			  else
			  if($_GET['order_id'] && ($_GET['confirm']=='f'))
			  {
				  ?>
                  
                  <?=$lang_resource['ORDER_CONFIRM_YOU_HAVE_CANCELLED_ORDER_NO']?>:<?=$_GET['order_id']?>. 
                  <?php
				  
			  }
			   
				  
			  }
			  ?>
              <?php
			  if($_GET['clickstat']==4)
			  {				  
				 ?>
                 <?=$lang_resource['ORDERS_BOX_STATUS_HEADER']?>:<?=$lang_resource['ORDER_CONFIRMED_ACCEPTED_BY_DRIVER']?>.
                 <?php
			  }
			 else if($_GET['clickstat']==1)
			  {
				 ?>
                <?=$lang_resource['ORDERS_BOX_STATUS_HEADER']?>:<?=$lang_resource['ORDER_CONFIRMED_DELIVERED']?>
                 <?php
			  }
			  else
               if($_GET['clickstat']==6)
			  {
				 ?>
                 <?=$lang_resource['V3_ORDER_CANCELLED_DRIVER']?>.
                 <?php
			  }
			  else
               if($_GET['clickstat']==5)
			  {
				 ?>
                 <?=$lang_resource['V3_ORDER_CANCELLED_RESTAURANT']?>
                 <?php
			  }
			  ?>
				 
              
              </h2>
             </div>
               
              </td></tr>
               </tbody></table></div>
	</td></tr>
</tbody></table>
</body>

