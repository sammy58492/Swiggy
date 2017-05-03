<?php
require_once('settings.php');
require_once('multilanguage.php');
require_once('payment-main.php');
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

$extras_id = $obj->{'extras_id'};
$dish_id = $obj->{'dish_id'};
/*$extras_id = array(20);
$dish_id = 45;
*/

$link = ConnectDB();

pg_prepare($link,'sql','SELECT * FROM w_extras WHERE id=$1 and enabled=$2');
pg_prepare($link,'sql1','SELECT distinct option_id,option_name,rank,max_sel,min_sel,conditional,with_respect_to,ingredients FROM w_extras_options WHERE set_id=$1 order by rank');
pg_prepare($link,'sql2','SELECT * FROM w_extras_options WHERE option_id=$1');
pg_prepare($link,'sql3','SELECT * FROM w_dishes WHERE id=$1 and enabled=$2');

$mainarray = array();
$i = 0;
foreach($extras_id as $extra_id){	
	$results = pg_execute($link,'sql',array($extra_id,'TRUE'));	
	while($row = pg_fetch_array($results)){
		$mainarray[$i]['id'] = $row['id'];
		$mainarray[$i]['name'] = $row['set'];

		$results1 = pg_execute($link,'sql1',array($row['id']));
		$options = array();
		$j = 0;
		while($row1 = pg_fetch_array($results1)){		
			$options[$j]['id'] = $row1['option_id'];
			$options[$j]['name'] = $row1['option_name'];
			$options[$j]['maxsel'] = $row1['max_sel'];
			$options[$j]['minsel'] = $row1['min_sel'];
			$options[$j]['rank'] = $row1['rank'];
			$options[$j]['conditional'] = $row1['conditional'];
			if($row1['conditional']=='yes'){
				$options[$j]['with_respect_to'] = $row1['with_respect_to'];
			}
			$options[$j]['ingredients'] = $row1['ingredients'];
			/*if($row1['ingredients']==true){

			}*/

			$results2 = pg_execute($link,'sql2',array($row1['option_id']));
			$choices = array();
			$k = 0;
			while($row2 = pg_fetch_array($results2)){
				$choices[$k]['id']= $row2['choice_id'];
				$choices[$k]['name']= $row2['choice_name'];
				$choices[$k]['price']= $row2['price'];
				
				$k++;	
			}
			$options[$j]['choices'] = $choices;
			$j++;
		}	
		$mainarray[$i]['options'] = $options;
		$i++;
	}
}

/*first part end*/
$choicerecord = array();
$c=0;
foreach($mainarray as $minarr){	
	foreach($minarr['options'] as $minar){
		if($minar['conditional'] == 'yes'){
			$chr = explode(",",$minar['with_respect_to']);
			$choicerecord[$chr[1]][$c] = $minar['id'];
			$c++;			
		}		
	}	
}

$newarray = array();
foreach($mainarray as $key1=>$minarr){
	foreach($minarr['options'] as $key2=>$minar){
		foreach($minar['choices'] as $key3=>$miar){			
			if (array_key_exists($miar['id'], $choicerecord)) {	
				$mainarray[$key1]['options'][$key2]['choices'][$key3]['conditionoptionid'] = $choicerecord[$miar['id']];
			}				
		}
	}
}


$results3 = pg_execute($link,'sql3',array($dish_id,'TRUE'));
$row3=pg_fetch_array($results3);


if($mainarray){
	$response['status'] = true;
	$response['ingredients']= $row3['ingredients'];
	$response['options']= $mainarray;
}else{
	$response['status'] = false;
	$response['ingredients']= $row3['ingredients'];
	$response['options']= $mainarray;
}

pg_close($link);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); 

echo json_encode($response);


?>