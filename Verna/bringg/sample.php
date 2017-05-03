<?
 $url = 'http://api.bringg.com/partner_api/tasks/';
   
	
	$data_string = '{"title": "Pizza Delivery", "address": "416 Water St. New York, NY 10002", "scheduled_at": "2014-11-29T04:16:09.123Z", "company_id": "3208", "team_id": "3208", "lat": "45.5","lng": "12.5","access_token": "pyZgq26MSTrjBJys5zxe","signature": "44f8382c1c180d129ed0c884aec6abe1db13cb2f"}';
    //$data_string = json_encode($data); signature=44f8382c1c180d129ed0c884aec6abe1db13cb2f
    $ch=curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, array($data_string));
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER,
               array('Content-Type:application/json',
                      'Content-Length: ' . strlen($data_string))
               );

    $result = curl_exec($ch);
    curl_close($ch);
	
	print_r($result);

?>