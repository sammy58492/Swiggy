<? session_start();
	 global $lang_resource;
function GetLangFile()
{
	
	//$lang_file = 'lang.'.$lang.'.php';
	//return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['l'] = $row1['id'];
	}


	pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_static');
    $result = pg_execute($link,'sqlfetchlang',array());
 
	  while($row = pg_fetch_array($result)){
		 
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	  }
	  return $lang_resource;
	  pg_close($link);
}


require_once "../payment_lib/mercadopago.php";
require("lib/front-main-mobile.php"); 
$link = ConnectDB();
//header("Content-type: text/plain");

$mp = new MP("3518378222107317", "NWaNUHshAOaxAQSpQrFazNvnMX5zWgKX");
$mp->sandbox_mode(TRUE);
$paymentInfo = $mp->get_payment_info ($_GET["id"]);

 $xid=explode("-",$paymentInfo['response']['collection']['reason']);
 $id=$xid[1];
 $paymentid = $_GET["id"];
pg_prepare($link,'sqlipn1','SELECT * FROM w_orders WHERE id = $1;');
						$search = pg_execute($link,'sqlipn1',array($id));
						$search_row = pg_num_rows($search);
						if($search_row == 1)
						{
 $reQ = pg_fetch_array($search);
							 $order = parse($reQ['data']);
							 $pid = $reQ['paypalinfo'];
							 $id = $reQ['id'];
							 
							 $order->mercadopagoid = $paymentid;
							 
							 pg_prepare($link,'sqlip1','UPDATE w_orders SET data=$2 WHERE id=$1');
							pg_execute($link,'sqlip1',array($id,json_encode($order)));
							 
						
							if (!empty($pid))
								{
								$order->paypalid = $pid;
								}
							 
							 
							pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql33',array($order->buyer->city));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$emails = array($order->buyer->email,$emails,$row['email']);
				//start order email
				$msg = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>*|MC:SUBJECT|* Order # '. $id . '</title>

<style type="text/css">
<!--
body {
	margin:0;
}
.ReadMsgBody { width: 100%;}
.ExternalClass {width: 100%;}
-->
</style>

</head>

<body>




				<table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
	   <tr><td height="10"></td></tr>
       <tr>
       <td height="79">
       <table width="568" border="0" cellspacing="0" cellpadding="0">
       <tr>
       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/logo_top_m.png" border="0" /></td>
       <td height="50%" valign="middle">
       <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
       <tr>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td> 
       </tr>
       </table>   
       </td>
       </tr>
       </table>
       </td>
       </tr>
       <tr>
       <td><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>
       </tr>
       </table>

	<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
	<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
		<tr>
          <td height="15"></td>
        </tr>
        <tr>
          <td align="left" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          <em>Hi there,<br>Your order has been placed successfully!</em></span>    
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Georgia,Arial,sans-serif;font-size:23px;color:#df2226;"><em>Order # '. $id . '</em></span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:15px;">
          <a href="http://'.$_SERVER["HTTP_HOST"].'"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/track_btn_m.png" border="0" /></a>    </td>
        </td></tr>
    </table>
    <tr>
    </table>
<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD">
  <tr><td>
<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="4" bgcolor="#F7F7F7">
  <tr><th style="border:0px solid #e2dbdb;" colspan="5"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;"><em>'. $lang_resource['PAYMENT_GATEWAY_ALL_DETAILS_OF_YOUR_ORDER'] . '</em></span></th></tr>
  <tr>
    <th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="160">'. $lang_resource['PAYMENT_GATEWAY_ALL_DESCRIPTION'] . '</th>
    <th style="border:1px solid #e2dbdb; color:#6f6d6b" bgcolor="#e2dbdb" width="400">'. $lang_resource['PAYMENT_GATEWAY_ALL_USER_DETAILS'] . '</th>
  </tr>
  <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] . '</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->buyer->name) . '</td>
  </tr>
  <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['Email_ID_V2'] . '</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. strtolower($order->buyer->email) . '</td>
  </tr>
   <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'] . '</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->buyer->address) . '</td>
  </tr>
   <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['Referenece_V2'] . '</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. ucfirst($order->buyer->colony) . '</td>
  </tr>
   <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_CHECKOUT_PHONE'] . '</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $order->buyer->tel . '</td>
  </tr>
   <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['MOBILE_FRONT_VISUALS_CITY'] . '</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $order->buyer->cityname . '</td>
  </tr>
   <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $lang_resource['Referenece_V2'] . '</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">'. $order->buyer->reference . '</td>
  </tr>
</table>
</td></tr></table>';
				
					
				$twilio_phone;
				$twilio_enabled;
				$twilio_order = "";
				foreach ($order->business as $business)
					{
					$twilio_phone = $business->twiliophone;
					$twilio_enabled = $business->twilioenabled;
					//update the buys count on the business
					pg_prepare($link,'sql4','SELECT buys from w_business WHERE id=$1');
					$result2 = pg_execute($link,'sql4',array($business->id));
					if (pg_num_rows($result2)==1)  
						while($row2 = pg_fetch_array($result2))
							{
							pg_prepare($link,'sqls','UPDATE w_business SET buys=$2 WHERE id=$1');
							pg_execute($link,'sqls',array($business->id,intval($row2['buys'])+1));
							}

					if (!empty($business->email) && $business->email!='null')
						array_push($emails,$business->email);

					$total = 0;

					$msg .= '
<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
  <tr><th style="border:1px solid #e2dbdb;" colspan="5" textcolor="#df2226"><span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;">' . $business->name . '- Tele: ' . $business->tel . ' </span></th></tr>
					  </table></table>';
					$paymethod = '';

					$paymethod = 'PAID , in Mercadopago payment Method, payment id : '.$paymentid;

$msg .= '<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table width="560" style="border:0px solid #e2dbdb;" align="center" cellspacing="0" cellpadding="10" bgcolor="#F7F7F7">
<tr>
    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="160">'. $lang_resource['FRONT_MAIN_EMAIL_ITEMS'] . '</th>
    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'. $lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_INGREDIENTS'] . '</th>
    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'. $lang_resource['Extra_V2'] . '</th>
    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'. $lang_resource['ORDER_COMMENTS'] . '</th>
    <th style="border:1px solid #e2dbdb color:#6f6d6b;" bgcolor="#e2dbdb" width="100">'. $lang_resource['FRONT_MAIN_EMAIL_RATE'] . '</th>
  </tr>';

					foreach ($business->dishes as $dish)
						{
						$msg .= '<tr>';
						$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $dish->name . '</td>';

						//ingredientes
						$con = array();
						$sin = array();
						foreach ($dish->ingredients as $ingredient)
							if ($ingredient->enabled)
								array_push($con,$ingredient->caption);

						$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">';
						$count = 0;
						foreach ($con as $c)
							{
							if ($count==0)
								$msg .= $c;
								else
								$msg .= ', ' . $c;
							$count++;
							}
						$msg .= '</td>';
						$con = array();
						foreach ($dish->extras as $extra)
							if ($extra->enabled)
								array_push($con,$extra->name);
								else
								array_push($sin,$extra->name);

						$msg .= '<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">';
						$count = 0;
						foreach ($con as $c)
							{
							if ($count==0)
								$msg .= $c;
								else
								$msg .= ', ' . $c;
							$count++;
							}
						$msg .= '</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . ucfirst(strtolower($dish->comments)) . '</td>
						<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $dish->total . '</td>
						</tr>';
						$total = $total + $dish->total;
						}
						if($order->buyer->taxtype == 1)
						{
					$total = $total + $business->shipping + $order->tax;
					$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'];
						} 
						else
						{
					$total = $total + $business->shipping;
					$taxstring = $lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'];
						}
						
						
						
					$taxpercentage = GetDecimalPoint($order->buyer->tax);
					$tipsprice = GetDecimalPoint($order->buyer->tips);
					
					if ($order->buyer->tips > 0)
					{
					$total = $total	+ $order->buyer->tips;
					}
					
					$total = GetDecimalPoint($total);
						
						
				
					//business shipping and comment info
					if ($business->shipping=='0.00')
						$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY_COST'];
						else
						$shippingcaption = $lang_resource['FRONT_MAIN_HOME_DELIVERY'];

					$msg .=  '<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $shippingcaption . '</td>
					<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right">'. ucfirst(strtolower($business->comments)) . '</td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $business->shipping . '</td></tr>
					<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">Tax ('. $taxpercentage .'%)<br/> <span style="font-size:11px;font-weight:bold">'. ucfirst(strtolower($taxstring)) . '</span></td>
					<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $order->tax . '</td></tr>';
					
				if ($order->buyer->tips > 0)
				{
					$msg .='<tr><td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' .$lang_resource['SHOPPING_FOURTH_TIP'] . '</td>
					<td colspan="2" style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right"></td>
					<td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">' . $tipsprice . '</td></tr>';
				}	
					
					

	$msg .= '<tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;">&nbsp;</td>
  </tr>

     <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" align="right" colspan="4"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px; padding-left: 74px;">Total</td>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;"><span style="font-family:Arial,Georgia,sans-serif;font-size:22px;color:#df2226;">' .$total. '</span></td>
  </tr>
    <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>' . $lang_resource['PAYMENT_METHOD_V2'] . ' ' . $paymethod . '</td>
  </tr>
  <tr>
    <td style="border-left:1px solid #e2dbdb; border-bottom:1px solid #e2dbdb;" colspan="5"><em>' . $lang_resource['FRONT_MAIN_ANY_CHANGES_WITH'] . '<span style="font-family:Arial,Georgia,sans-serif;color:#df2226;"> ' . $lang_resource['FRONT_MAIN_CONTACT_RESTAURENT'] . '' . $business->name . '-(Tele: ' . $business->tel . ').</em></span></td>
  </tr>
</table>
</td></tr></table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
<tr>
<td width="110">
       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">' . $lang_resource['ORDERS_FOLLOW_US_ON'] . ' </span></td>
<td>
<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
  </tr>
</table>
</td>

<td>
<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/apple_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/android_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/mobile_m.png"   border="0" /></a></td>
  </tr>
</table>
 </td>
</tr>
<tr>
    <td colspan="4" height="1" bgcolor="#C0C5C6"></td>
</tr>
<tr>
    <td colspan="4" height="1" bgcolor="#fffff"></td>
</tr>
</table>
</td></tr></table>

   <table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
   <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="border-bottom:5px solid #DDDDDD">
      <tr>        
         <td width="381">
            <table width="285" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">
               <tr>
                  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$_SERVER["ORDERS_ABOUT_US"].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$_SERVER["ORDERS_CONTACT_US"].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$_SERVER["ORDERS_BLOG"].'</strong></span></td>
               </tr>
            </table>        
         </td>
         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/images/logo_foot_m.png" width="251" height="42" border="0" /></td>
     </tr>
   </table>
   </td></tr></table>


    
    <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
     <tr><td height="15"></td></tr>

     <tr>
     <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
        <span style="color:#6f6d6b;">'.$_SERVER["FRONT_MAIN_COPYRIGHT"].'</span><br/>  
     </td>
     </tr>
    </table>';
					}
				
				$msg .= '</td></tr></tbody></table></td></tr></tbody></table></center>





</body>
</html>';
//end order email
				if (SendMail($msg,'Order ' . $id,$emails))
					{
					if ($order->buyer->tel)
						{
						}

					}
				}
				
			

    // Get language from get or put default as en
    /*$lang_file;
    if(isset($_GET['l']) && $_GET['l'] != '')
      $lang_file = GetLangFile($_GET['l']);
    else
      $lang_file = GetLangFile('en');*/
				
    // Include the selected language file
   //include_once $lang_file;
   $lang_resource = GetLangFile();

    if ($twilio_enabled && $order->buyer->tel) {
      require_once('lib/sms.php');
      // Send sms to buyer if it was enabled when ordering
      if($order->twilioenabledclient) {
        $msg = $lang_resource['SMS_ORDER_SENT_CLIENT']. $id;
        try {
          sendSMS($msg,'+'.$twilio_phone,'+'.$order->buyer->tel);
        } catch (Exception $e) {
          if ($e->getMessage() == 'error_sms_panel_config') {
            echo ',error_sms_panel_config';          
          }
          echo ',error_sms_to_user';
        }
      }
      // Send to business
      $msg = $lang_resource['SMS_ORDER_SENT_BUSINESS']. $id;
      try {
        sendSMS($msg,'+'.$twilio_phone,'+'.$order->business[0]->tel);
      } catch (Exception $e) {
        if ($e->getMessage() == 'error_sms_panel_config') {
          echo ',error_sms_panel_config';          
        }
        echo ',error_sms_to_business';
      }
    }
  
						}
				
?>
