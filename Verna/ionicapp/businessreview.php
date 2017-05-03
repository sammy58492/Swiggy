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

global $lang_resource;
pg_prepare($link,'sqlfetchlangfront'.time(),'SELECT * from w_lang_static');
	$result = pg_execute($link,'sqlfetchlangfront'.time(),array());
	while($row = pg_fetch_array($result)){
		$lang= 1;
		$lang_resource[$row['lang_key']] = $row['langtext_'.$lang];    
	}



		$allReviewData = array();
			pg_prepare($link,'sqlR1','SELECT * FROM w_review WHERE id_w_business=$1 AND status = $2 ORDER BY id DESC');
			$result = pg_execute($link,'sqlR1',array($id,'TRUE'));
			pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');
			
			pg_prepare($link,'sqlR3','SELECT city FROM w_franchises WHERE id=$1');

			while($rs = pg_fetch_array($result)) {
				//unset($ReviewData);
				$ReviewData = new stdClass();
				$ReviewData->orderid = $rs['id_order'];
				$ReviewData->quality = $rs['quality'];
				$ReviewData->delivery = $rs['delivery'];
				$ReviewData->dealer = $rs['dealer'];
				$ReviewData->package = $rs['package'];
				$ReviewData->pdate = date('d-m-Y',strtotime($rs['date']));
				$ReviewData->email = $rs['email'];
				$ReviewData->comment = $rs['comment'];
				//$rs['city']
				$results_c = pg_execute($link,'sqlR3',array($rs['city']));
				$rec_c = pg_fetch_array($results_c);
				$ReviewData->city = $rec_c['city'];
				$ReviewData->average = ceil(($rs['quality'] + $rs['delivery'] + $rs['dealer'] + $rs['package'])/5);
				if($rs['usr'] == "-1") {
				$ReviewData->user = $lang_resource['FRONT_MAIN_GUEST_USER'];
				}
				else {
				$results = pg_execute($link,'sqlR2',array($rs['usr']));
				$rec = pg_fetch_array($results);
				$ReviewData->user = $rec['name']." ".$rec['lastname']." ".$rec['lastname2'];
				$ReviewData->user_id = $rec['id'];
				$ReviewData->isimg = $rec['isimg'];
				}

				array_push($allReviewData,$ReviewData);


				}
		
		$busiinfo['allreview'] = $allReviewData;



if($busiinfo['allreview']!=null){
	$response['status'] = true;
	$response['BusinessReview']=$busiinfo['allreview'];
}else{
	$response['status'] = false;
	
	
}

pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);

?>
