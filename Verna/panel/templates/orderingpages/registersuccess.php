<?php
$msg ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>*|MC:SUBJECT|*</title>

</head>
<body>
<table  background="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/bg.png" cellspacing="0" cellpadding="0" style="width:570px; background-size:cover; margin:0 auto; background-repeat:no-repeat; padding:10px 20px;">
  <tr>
    <td width="276"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/logo.png" alt="" /></td>
    <td width="292" style="text-align:right">';
    if($fblink !=""){
	    $msg .='<a href="https://www.facebook.com/'.$fblink.'" style="margin:0 10px">
		    	<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/face.png" alt="" />
		    </a>';
    }
    if($twlink !=""){	    
	    $msg .='<a href="http://www.twitter.com/'.$twlink.'"  style="margin:0 10px">
		    	<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/twi.png" alt="" />
		    </a>';
	}
	if($rsslink !=""){
	    $msg .='<a href="'.$rsslink.'"  style="margin:0 10px">
		    	<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/rss.png" alt="" />
		    </a>';
	}
$msg .='</td>
  </tr>
  <tr>
    <td colspan="2" style="text-align:center"><h1 style="text-align:center; font-size:30px;	color:#fff;	font-weight:100;text-shadow: 1px 0 2px rgba(0, 0, 0, 0.30);	margin:28px 0 5px;">'.$lang_resource['THANK_YOU_REGISTERING'].'</h1></td>
  </tr>
  <tr>
    <td colspan="2" style="	text-align:center;	font-size:20px;	color:#fff;	font-weight:500;	text-shadow: 1px 0 2px rgba(0, 0, 0, 0.30);"><span style="font-weight:100;">'.$lang_resource['YOUR_NEW_PASSWORD_IS'].' </span>: '.$pwd.'</td>
  </tr>
  <tr>
    <td colspan="2" style="	text-align:center;"	><div style="font-size:18px;	color:#fff;	font-weight:500;	margin:25px 0 10px 0;	text-shadow: 1px 0 2px rgba(0, 0, 0, 0.30);">'.$lang_resource['TO_VIEW_OUR_TUTORIAL'].'</div></td>
  </tr>
  <tr>
    <td colspan="2" style="text-align:center" ><a href="'.$lang_resource['CONTROL_PANEL_TUTORIALS_URL'].'" style="cursor:pointer;"><button type="button" style="padding:7px 20px;	background:#ee4a4a;	font-size:13px;	font-weight:500;	color:#fff;	border:none;	border-radius:2px;	cursor:pointer;	box-shadow: 1px 0 5px rgba(0, 0, 0, 0.30);">'.$lang_resource['CLICK_HERE'].'</button></a></td>
  </tr>
  <tr>
    <td colspan="2" style="text-align:center;"><div style="text-align:center; 	text-align:center;	font-size:18px;	color:#fff;	font-weight:500;	margin:25px 0 10px 0;	text-shadow: 1px 0 2px rgba(0, 0, 0, 0.30);">'.$lang_resource['GOTO_ADMIN_PANEL'].'</div></td>  
  </tr>
  <tr>
    <td colspan="2" style="text-align:center"><a href="http://'.$_SERVER["HTTP_HOST"].'/admin/" style="cursor:pointer;"><button type="button" style="	padding:7px 20px;	background:#62a778;	font-size:13px;	font-weight:500;	color:#fff;	border:none;	border-radius:2px;	cursor:pointer;	box-shadow: 1px 0 5px rgba(0, 0, 0, 0.30);">'.$lang_resource['CLICK_HERE'].'</button></a></div></td>
  </tr>
  <tr>
    <td colspan="2" style="text-align:center">&nbsp;</td>
  </tr>
  
</table>

<table cellspacing="0" cellpadding="0" style="width:570px;  margin:0 auto; padding:0 0; background:#fff; ">
  <tr>
    <td style="text-align:center">
    	<div style="	width:100%;	text-align:center;	background:#f6f6f6;	margin:3px 0 0 0;	padding:20px 0;	font-size:20px;	color:#717171;">'.$lang_resource['ORDERS_FOLLOW_US_ON'];  
    		if($fblink !=""){
	    		$msg .='<a href="https://www.facebook.com/'.$fblink.'">
	    			<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/soc1.png" alt="" style="margin:0 10px" />
	    		</a>';
	    	}
	    	if($twlink !=""){	 
    		$msg .='<a href="http://www.twitter.com/'.$twlink.'">
    			<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/soc2.png" alt=""  style="margin:0 10px" />
    		</a>';
    		}
    		if($rsslink !=""){
    		$msg .='<a href="'.$rsslink.'">
    			<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/soc3.png" alt=""   style="margin:0 10px"/>
    		</a>';
    		}

    		$msg .='</div></td>
  </tr>
  <tr>
    <td  style="text-align:center"><div style="	width:100%;	text-align:center;	margin:0 0 20px 0;	padding:35px 0 20px 0;	border-bottom:1px solid #e5e5e5;">
    	<a href="'.$lang_resource['HOMEPAGE_ANDROID_APP_URL'].'" style="margin:0 10px">
    		<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/icon1.png" alt="" />
    	</a>
    	<a href="'.$lang_resource['HOMEPAGE_IPHONE_APP_URL'].'"  style="margin:0 10px">
    		<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/icon2.png" alt="" />
    	</a>
    	<a href="http://'.$_SERVER["HTTP_HOST"].'/mobile.php" style="margin:0 10px">
    		<img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/icon3.png" alt="" />
    	</a>
    </div></td>
  </tr>
  <tr>
    <td style="text-align:center"><div style="	width:100%;	text-align:center;	margin:0 0 10px 0;">
    	<a href="#" style="	font-size:13px;	color:#a2a2a2;	margin:0 20px;">'.$lang_resource['FOOTER_ABOUT_ABOUT'].'</a>
    	<a href="#" style="	font-size:13px;	color:#a2a2a2;	margin:0 20px;">'.$lang_resource['FOOTER_ABOUT_CONTACT'].'</a>
    	<a href="#" style="	font-size:13px;	color:#a2a2a2;	margin:0 20px;">'.$lang_resource['FOOTER_ABOUT_BLOG'].'</a>
    </div></td>  
  </tr>
  <tr>
    <td  style="text-align:center"><div style="	width:100%;	text-align:center;	padding:0 0 30px 0;"><a href="#"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/templates/orderingpages/images/flogo.png" alt="" /></a></div></td>
  </tr>
</table>

</body>
</html>';
?>