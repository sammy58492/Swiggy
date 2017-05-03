<?php
require_once('settings.php');
require_once('multilanguage.php');

if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


$json = file_get_contents('php://input');
$obj = json_decode( $json );

$id = $obj->{'businessid'};

$link = ConnectDB();

pg_prepare($link,'sqltmfr','SELECT * FROM w_configs WHERE name = $1');
       $result1 = pg_execute($link,'sqltmfr',array('currency'));
		 $row1 = pg_fetch_array($result1);
      	$timeformat = $row1['value'];
		
		$discountOfferData = array();
			pg_prepare($link,'sqlR22','SELECT * FROM w_discountoffer WHERE business=$1 AND accept =$2 and scriptid=0');
			$result = pg_execute($link,'sqlR22',array($id,TRUE));			
			while($rs = pg_fetch_array($result)) {
				//unset($menu);
				$menu = new stdClass();
				$menu->rate = ($rs['discountype']==1)?$rs['rate']."%":$timeformat." ".$rs['rate'];
				$menu->minshop = $rs['minshop'];
				$menu->startdate = $rs['startdate'];
				$menu->enddate = $rs['enddate'];
				$menu->validdays = $rs['validdays'];
				$menu->createdate = $rs['createdate'];
				$menu->discounttext = discountofferlangbylang($rs['id']);
				$menu->accept = $rs['accept'];
				$menu->business = $rs['business'];
				
				if($menu->discounttext !=null)
					array_push($discountOfferData,$menu);
			}

			$busiinfo['businessoff'] = $discountOfferData;

if($busiinfo['businessoff']!=null){
	$response['status'] = true;
	$response['BusinessOffer']=$busiinfo['businessoff'];
}else{
	$response['status'] = false;	
}

pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
  
echo json_encode($response);

?>
