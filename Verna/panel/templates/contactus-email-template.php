<?php
session_start();
//start order email
function convert2Digit($num){
	if($num<10){
		return "0".GetDecimalPoint($num);
	}else{
		return GetDecimalPoint($num);
	}
}
		
			pg_prepare($link,'sqlfb1','SELECT value FROM w_configs where name=$1');
			$resultfbemail_from = pg_execute($link,'sqlfb1',array('email_from'));
			$rowfbemail_from = pg_fetch_array($resultfbemail_from);
			$fbemail_from = $rowfbemail_from['value'];
			
		pg_prepare($link,'sqlfab','SELECT * FROM w_contactus where id=$1');
		$result = pg_execute($link,'sqlfab',array($id));
		$row = pg_fetch_array($result);
		
		
		pg_prepare($link,'sqlfb','SELECT value FROM w_configs where name=$1');
		$resultfb = pg_execute($link,'sqlfb',array('facebooklink'));
		$rowfb = pg_fetch_array($resultfb);
		$fblink = $rowfb['value'];
		
		pg_prepare($link,'sqltw','SELECT value FROM w_configs where name=$1');
		$resulttw = pg_execute($link,'sqltw',array('twitterlink'));
		$rowtw = pg_fetch_array($resulttw);
		$twlink = $rowtw['value'];

		pg_prepare($link,'sqlrss','SELECT value FROM w_configs where name=$1');
		$resultrss = pg_execute($link,'sqlrss',array('rsslink'));
		$rowrss = pg_fetch_array($resultrss);
		$rsslink = $rowrss['value'];
		
		pg_prepare($link,'sqlgpluslink','SELECT value FROM w_configs where name=$1');
		$resultrss1 = pg_execute($link,'sqlgpluslink',array('gpluslink'));
		$rowrss1 = pg_fetch_array($resultrss1);
		$gpluslink = $rowrss1['value'];

		
		pg_prepare($link,'linkendinlink','SELECT value FROM w_configs where name=$1');
		$resultrss2 = pg_execute($link,'linkendinlink',array('linkendinlink'));
		$rowrss2 = pg_fetch_array($resultrss2);
		$linkendinlink = $rowrss2['value'];
		
		

 //Time selection settings. 




$Showmsg = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>

<style type="text/css">
body, td, input, textarea, select{
	margin:0;
	font-family: arial,sans-serif;
}
.message1{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:30px;color:#404040;	
}
.message2{
	color:#e74c3c;font-size:24px;font-weight:bold;font-family:Open Sans, Arial, Helvetica, sans-serif;	
}
.message3{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:20px;color:#000;text-align:center;		
}
.heading td{
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;
}
.even{
	background-color:#f7f7f7;
}
.odd{
	background-color:#ebebeb;
}
.detail-table{
	border:solid 1px #e3e3e3;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:15px;color:#666666;
	margin-top:15px;	
}
.detail-table tr td{
	border-bottom:solid 2px #fff;
	padding:8px;	
}
.total-price{
	width:100%;text-align:right;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#000;font-weight:bold;display:block;float:left;
}
.message4{
	text-align:center;
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:16px;color:#666666;
	border-bottom:solid 1px #dedede;
}
.app-table{
	margin-top:10px;	
}
.footer-table{
	background-color:#252a30;
	height:44px;
	margin-top:15px;	
	font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:10px;color:#fff;
	text-align:center;
}
.footer-table td a{
	color:#fff;
	text-decoration:none;
}

</style>

</head>

<body>

    <div>
        
    	<table border="0" cellpadding="0" cellspacing="0" width="570" align="center" bgcolor="#fff" style="border:solid 1px #e7e7e7;padding:0 10px">
        	<tr>
            	<td>
                	<table border="0" cellpadding="0" cellspacing="0" width="100%">
                    	<tr>
                        	<td width="50%">
                            	<a href="http://www.zipeat.com/">';
					if($_SESSION['scriptid']=='0' || $_SESSION['scriptid']=='')
					{
                      $Showmsg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/normal.jpg" alt="logo"/>';
					}
					else
					{
						 $Showmsg .=   '<img src="http://'.$_SERVER['HTTP_HOST'].'/panel/images/logo/1/'.$_SESSION['scriptid'].'/normal.jpg" alt="logo"/>';
					}
                   $Showmsg .=  '</a>
                            </td>
                            <td width="50%" align="right" valign="middle">
                            	<table border="0" cellpadding="1" cellspacing="0">
                                	<tr>
                                    	<td>';
                                            if($twlink){
													$Showmsg .= '<a href="http://www.twitter.com/'.$twlink.'">
														<img src="panel/templates/images/twitter-icon.png" alt=""/>
													</a>';
												}
                                		$Showmsg .= '</td>
                                        <td>';
                                            if($fblink){
												$Showmsg .= '<a href="http://www.facebook.com/'.$fblink.'">
													<img src="panel/templates/images/fb-icon.png" alt=""/>
												</a>';
											}
                                		$Showmsg .= '</td>
                                        <td>';
                                            if($rsslink){						
											   $Showmsg .= '<a href="'.$rsslink.'">
												<img src="panel/templates/images/rss-icon.png" alt=""/>
											</a>';
											}
                                		$Showmsg .= '</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                   
                    
                    <table border="0" cellpadding="5" cellspacing="0" width="100%" class="detail-table" style="margin-top:15px;">
                    	<tr bgcolor="e74c3c">
                        	<td width="30%" style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;">'.$lang_resource['CONTACTUS_DETAILS'].'</td>
                            <td style="border-bottom:solid 2px #fff;font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:14px;color:#fff;font-weight:bold;"></td>
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTACTUS_NAME'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row['name'].'</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTACTUS_EMAIL'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;"><a style="color:#666666;text-decoration:none;" target="_blank" href="mailto:demomail@gmail.com">'.$row['email'].'</a></td>
                        </tr>
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;"> '.$lang_resource['CONTACTUS_ADDRESS'].' </td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row['address'].'</td>
                        </tr>
                        
                        <tr bgcolor="#f7f7f7">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTACTUS_PHONE'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row['phoneno'].'</td>
                        </tr>
						<tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTACTUS_SUBJECT'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row['subject'].'</td>
                        </tr>
                        <tr bgcolor="#ebebeb">
                        	<td style="border-bottom:solid 2px #fff;padding:8px;">'.$lang_resource['CONTACTUS_COMMENT'].'</td>
                            <td style="border-bottom:solid 2px #fff;padding:8px;">'.$row['comment'].'</td>
                        </tr>
                       
                    </table>
                    
                                 
                    
                   
                  
                  <table border="0" cellpadding="5" cellspacing="0" width="100%" class="footer-table" align="center" bgcolor="#252a30" style="font-family:Open Sans, Arial, Helvetica, sans-serif;font-size:10px;color:#e4e4e5;margin-top:5px;">
                    	<tr>    
                        	<td width="20%" align="right"><a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FOOTER_ABOUT_US'].'</a>&nbsp;&nbsp;|</td>
                            <td width="5%" align="center"><a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FRONT_MAIN_CONTACT_US'].'</a>&nbsp;&nbsp;|</td>
                            <td width="20%" align="left"><a style="color:#fff;"  href="http://'.$_SERVER['HTTP_HOST'].'">'.$lang_resource['FRONT_MAIN_BLOG'].'</a></td>
                        </tr>
                        <tr>
                        	<td style="text-align:center;padding-top:0;" colspan="3">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</td>
                        </tr>
                    </table>
                    
                    
                </td>
            </tr>
        
        
        </table>
        
    </div>


</body>
</html>

';






?>
