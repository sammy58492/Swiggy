<?php
	$token = "APA91bHkHAcCQKhZoYMYRTOpJcT1fkrSgZYJpTisAW4GzmZnCkMGnVlogBNAx8KJslIqMpUxpqnEdY-yFlaVL40LoIU5wbsuqR_4wnnF2YPQQgigqU5kgE-sQp9Ka9gaXqH962Sdoslc";
	$device_tokens = array();
	array_push($device_tokens, $token);
	$data=array('fromUser'=>12);
	$msg = array
	(
		'message' 	=> 'This is test.',
		'title'		=> 'Notification.',
		'data'	=> $data,
		'tickerText'	=> 'Ticker',
		'vibrate'	=> 1,
		'sound'		=> 1,
		'largeIcon'	=> 'large_icon',
		'smallIcon'	=> 'small_icon',
		'notification_type' => 'like_push'
	);

	$apiKey = "AIzaSyCH4hL3Mc7jh8wejEe3MBLDRe68MwoJujc"; // Origin
	
	$fields = array
	(
		'registration_ids' 	=> $device_tokens,
		'data' => $msg
	);
	 
	$headers = array
	(
		'Authorization: key=' . $apiKey,
		'Content-Type: application/json'
	);
	 
	$ch = curl_init();
	curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
	curl_setopt( $ch,CURLOPT_POST, true );
	curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
	curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
	curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
	$result = curl_exec($ch );
	
	curl_close( $ch );

header('Content-type: application/json');
$result4 = array();
$result4["success"] = $result;
$result4["message"] = "Testing...";
echo json_encode($result4);