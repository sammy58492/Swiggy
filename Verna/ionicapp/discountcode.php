<?php
require_once('settings.php');
require_once('multilanguage.php');
session_start();

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

$bid = $obj->{'businessid'};
$code = $obj->{'code'};
$total = $obj->{'total'};


$link = ConnectDB();
global $lang_resource;



	pg_prepare($link,'sql3','SELECT hits FROM w_discount WHERE code=$1');
	$result = pg_execute($link,'sql3',array($code));
    $rechit = pg_fetch_array($result);
	
	$expdate = date("Y-m-d");
	pg_prepare($link,'sql4','SELECT * FROM w_discount WHERE code=$1 AND expirydate>=$2 AND maxallow > $3 AND enabled =$4 ');
	$results = pg_execute($link,'sql4',array($code,$expdate,$rechit['hits'],"TRUE"));
    $rec = pg_num_rows($results);
	$recData = pg_fetch_array($results);
	if($total < $recData['minshop'] )
	{
		$response['status'] = false;
		
	}
	else if($rec == 1)
	{	
	
	     $businessData = json_decode($recData['business']);
			 if(in_array("-1",$businessData))
			 {
				$response['status'] = true;
			  $recordold = 0;
			$response['text']=true;
			$response['discountcode'] = $recData['code'];
			$response['discounttype'] = $recData['payby'];
			$response['discountminshop'] = $recData['minshop'];
			$response['discountrate'] = GetDecimalPoint($recData['commonrate']);
			$recordold = $recData['hits'];
			$dhits = $recordold+1;
			
			pg_prepare($link,'sql5','UPDATE w_discount SET hits=$1  WHERE id=$2');
			pg_execute($link,'sql5',array($dhits,$recData['id']));
			  }
		else if(in_array($bid,$businessData))
		{
			$response['status'] = true;
			$recordold = 0;
			$response['text']=true;
			$response['discountcode'] = $recData['code'];
			$response['discounttype'] = $recData['payby'];
			$response['discountminshop'] = $recData['minshop'];
			$response['discountrate'] = GetDecimalPoint($recData['commonrate']);
			$recordold = $recData['hits'];
			$dhits = $recordold+1;
			
			pg_prepare($link,'sql5','UPDATE w_discount SET hits=$1  WHERE id=$2');
			pg_execute($link,'sql5',array($dhits,$recData['id']));
		}
		else
		{
			$response['status'] = false;
		}
	}
		
		else
		{
			$response['status'] = false;
		}
		
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);		

function GetDecimalPoint($a){	
	
	$nuber_decimal_point = number_format($a,$_SESSION['decimal_value']);
	return $nuber_decimal_point;
	
}

?>