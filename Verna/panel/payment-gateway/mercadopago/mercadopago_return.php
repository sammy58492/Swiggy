<?
require_once "mercadopago.php";
require("../../lib/front-main-mobile.php"); 
$link = ConnectDB();
//header("Content-type: text/plain");
$mp = new MP("3518378222107317", "NWaNUHshAOaxAQSpQrFazNvnMX5zWgKX");
$mp->sandbox_mode(TRUE);
$paymentInfo = $mp->get_payment_info ($_GET["collection_id"]);

 $xid=explode("-",$paymentInfo['response']['collection']['reason']);
 $id=$xid[1];
 $paymentid = $_GET["collection_id"];
 
pg_prepare($link,'sqlipn1','SELECT * FROM w_orders WHERE id = $1;');
						$search = pg_execute($link,'sqlipn1',array($id));
						$search_row = pg_num_rows($search);
						if($search_row == 1)
						{
 $reQ = pg_fetch_array($search);
							 $order = parse($reQ['data']);
							 $pid = $reQ['paypalinfo'];
							 $id = $reQ['id'];
							 
							
						
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
				
				
				                        }
					/*push notification*/
					pg_prepare($link,'sqlpushnotification','SELECT * from w_configs WHERE name=$1');
					$resultpushnotification = pg_execute($link,'sqlpushnotification',array('pushnotification'));
					$rowpushnotification = pg_fetch_array($resultpushnotification);

					if($rowpushnotification['value'] == 1){
						pg_prepare($link,'sqlpush','SELECT * FROM w_gcm WHERE user_id=(SELECT provider FROM w_business WHERE id=$1)');
						$resultpush = pg_execute($link,'sqlpush',array($order->business[0]->id));
						if(pg_num_rows($resultpush)>0){
							$rowpush = pg_fetch_array($resultpush);				
							require '../../../androidapp/push_notification.php';
							push_notification($id,$rowpush['user_id'],$link);				
						}
					}
					/*push notification*/
			include_once "../../templates/order-email-template.php";
			include_once "../../templates/bringg-task-template.php";

  
						}
				
		function get_lat_long($address){

    $address = str_replace(" ", "+", $address);

    $json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=$region");
    $json = json_decode($json);

    $lat = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
    $long = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
    $record['lat'] = $lat;
	$record['long'] = $long;
	
	
    return $record;
}		
					
				
?>
<style>
.button {
    font-family: Arial;
    background: linear-gradient(to bottom, #FCB97E 0%, #F07605 100%) repeat scroll 0 0 transparent;
    border: 1px solid #F07605;
    border-radius: 0.5em 0.5em 0.5em 0.5em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    outline: medium none;
    padding: 10px 20px !important;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    vertical-align: baseline;
}
</style>
<div style="width:100%; text-align:center;"><a href="<?=$_SERVER['DOCUMENT_ROOT']?>" class="button"><?=$lang_resource['PAYMENT_GATEWAY_ALL_BACK'];?></a></div>
<br/>
