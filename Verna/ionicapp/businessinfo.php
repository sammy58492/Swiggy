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

//$id =4;

$link = ConnectDB();

		$allMenuData = array();
			pg_prepare($link,'sqlR1','SELECT * FROM w_menus WHERE business=$1 and enabled=$2 and scriptid=$3 ORDER BY id DESC');
			$result = pg_execute($link,'sqlR1',array($id,TRUE,0));
			//pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');

			while($rs = pg_fetch_array($result)) {
				//unset($menu);
				$menu = new stdClass();
				$schedule = parse($rs['schedule']);
				$menu->name = businessmenunamebylang($rs['id']);
				$menu->days = $rs['days'];
				$openhr = ($schedule->opens->hour==0)?"00":$schedule->opens->hour;
				$openmm = ($schedule->opens->minute==0)?"00":$schedule->opens->minute;
				$closehr = ($schedule->closes->hour==0)?"00":$schedule->closes->hour;
				$closemm = ($schedule->closes->minute==0)?"00":$schedule->closes->minute;
				$menu->openclosetime = $openhr.':'.$openmm.'-'.$closehr.':'.$closemm;




				array_push($allMenuData,$menu);


				}
				$busiinfo['menudata'] = $allMenuData;
		//echo json_encode($allMenuData);
/*********Business Info*********/

/*******Business Image Gallery***************/

		$allimg = array();
			pg_prepare($link,'sqlR125','SELECT * FROM w_gallery WHERE type=0 AND business=$1 AND enabled=$2 AND scriptid=$3');
			$result = pg_execute($link,'sqlR125',array($id,"TRUE",0));
			//pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');
			//echo $rs = pg_num_rows($result);exit;
			while($rs = pg_fetch_array($result)) {
				//unset($img);
				//$schedule = parse($rs['schedule']);
				$img = new stdClass();
				$img->id = $rs['id'];
				$img->name = $rs['name'];
				$img->link = $rs['link'];
				$img->type = $rs['type'];
				$img->business = $rs['business'];

				array_push($allimg,$img);


				}
		$busiinfo['allimg'] = $allimg;
/*********Image Gallery************/	
/********Video Gallery*********/

$allvideo = array();
			pg_prepare($link,'sqlR1video','SELECT * FROM w_gallery WHERE type=1 AND business=$1 AND enabled=$2 AND scriptid=$3');
			$result = pg_execute($link,'sqlR1video',array($id,"TRUE",0));
			//pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');
			//echo $rs = pg_num_rows($result);exit;
			while($rs = pg_fetch_array($result)) {
				//unset($video);
				$video = new stdClass();
				//$schedule = parse($rs['schedule']);
				$video->id = $rs['id'];
				$video->name = $rs['name'];
				$video->link = $rs['link'];
				$video->type = $rs['type'];


				array_push($allvideo,$video);


				}
		$busiinfo['allvideo'] = $allvideo;
/*********Video Gallery*************/

/********Deliveryzone*********/

			$deliveryzone = array();
			pg_prepare($link,'sqldeliveryzone','SELECT location,deliveryprice FROM w_deliveryzone WHERE businessid=$1 and scriptid=$2 order by id LIMIT 3');
			$result = pg_execute($link,'sqldeliveryzone',array($id,0));
			
			while($row = pg_fetch_array($result)) {
				$i++;
				
				//unset($delivery);
				$delivery = new stdClass();
				$del = new stdClass();
				//unset($del);
				
				$del = array();
				$del['coordinates'] = parse($row['location']);
				$del['price'] = $row['deliveryprice'];
				
				
				if($i == 1){
					
				$delivery->zone1 = $del;
				$delivery->zone2 = "";
				$delivery->zone3 = "";
				}
				
				if($i == 2){
					$delivery->zone2 = $del;
					$delivery->zone3 = "";
				}
				
				if($i == 3){
					$delivery->zone3 = $del;
				}

				array_push($deliveryzone,$delivery);


				}
		$busiinfo['deliveryzone'] = $deliveryzone;
/*********Deliveryzone*************/


if($busiinfo['menudata']!=null || $busiinfo['allimg']!=null || $busiinfo['allvideo']!=null || $busiinfo['deliveryzone']!=null){
	$response['status'] = true;
	$response['catalogMenu']=$busiinfo['menudata'];
	$response['Photogallery']=$busiinfo['allimg'];
	$response['videogallery']=$busiinfo['allvideo'];
	$response['deliveryzone']=$busiinfo['deliveryzone'];
}else{
	$response['status'] = false;

}

pg_close($link);

//header('Content-Type: application/json');
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
  
echo json_encode($response);

?>
