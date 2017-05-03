<?
$url = 'http://api.bringg.com/partner_api/companies';

//name = business name;
// address = business address;
//lat = fetch form business lat;
// lang = fetch from business lang
// phone = business tel
// access key = panel setting of super admin
// secret key = panel setting of super admin 

$data_string = array(
'name' => "universe",
'address' => "416 Water St. New York, NY 10002",
'lat' => "45.5",
'lng' => "12.5",
'phone' => "9903232664",
'access_token' => "7Tmdza94Zc7mJo4vwxbq",
'timestamp' => date('Y-m-d H:i:s')
);
$secret_key = "z5qW6Zy1X5rRnLwGz-Jx";

// OpenSSL::HMAC.hexdigest("sha1", @partner.hmac_secret, to_query(canonical_params))
$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);

//print("The signature: " + $signature);

$data_string["signature"] = $signature;

//print("this is the data string: ");
//print_r($data_string);

$content = json_encode($data_string);

//print("The content: " + $content);
// $data_string = json_encode($data);
$ch=curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type:application/json',
'Content-Length: ' . strlen($content))
);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

$json_response = curl_exec($ch);

$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ( $status != 201 ) {
/*die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));*/
}

curl_close($ch);

$response = json_decode($json_response, true);

//echo "<pre>";
//print_r($response);

?>