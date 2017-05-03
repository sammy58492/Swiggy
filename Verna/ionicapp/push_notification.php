<?php
function push_notification($id,$link){
	//$link = ConnectDB(); 
	$json = 'ORDER ID #'.$id. 'HAS CHANGED SUCCESSFULLY';
	$message = array("price" => $json);
	pg_prepare($link,'sql'.$id,'SELECT * FROM w_gcm WHERE login_status=1');
	$result = pg_execute($link,'sql'.$id,array());
	$registatoin_ids = array();
	while($row=pg_fetch_array($result)){
		array_push($registatoin_ids, $row['gcm_id']);
	}

	send_notification($registatoin_ids, $message);
		
}

function send_notification($registatoin_ids, $message) {
	$url = 'https://android.googleapis.com/gcm/send';

	$fields = array(
		'registration_ids' => $registatoin_ids,
		'data' => $message,
	);

	$headers = array(
		'Authorization: key=AIzaSyDIFd-F6txsLzKrBGdbBvx1VqCSVS7ys5k',
		'Content-Type: application/json'
	);
	// Open connection
	$ch = curl_init();

	// Set the url, number of POST vars, POST data
	curl_setopt($ch, CURLOPT_URL, $url);

	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// Disabling SSL Certificate support temporarly
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

	// Execute post
	$result = curl_exec($ch);
	if ($result === FALSE) {
		die('Curl failed: ' . curl_error($ch));
	}

	// Close connection
	curl_close($ch);
	// echo $result;
}
?>