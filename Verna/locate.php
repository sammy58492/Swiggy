<?php

if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
{
  $ip=$_SERVER['HTTP_CLIENT_IP'];
}
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
{
  $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
}
else
{
  $ip=$_SERVER['REMOTE_ADDR'];
}

ip2long($ip)== -1 || ip2long($ip) === false ? trigger_error("Invalid IP", E_USER_ERROR) : "";
$ipDetail=array(); //initialize a blank array

$xml = file_get_contents("http://api.ipinfodb.com/v3/ip-city/?key=b5f12c41087336b2428b4518c687043b3aeb13b14fb6a18c2f5e2b9020164c9a&ip=".$ip);//187.163.2.55");//".$ip);

//get the city name inside the node <gml:name> and </gml:name>

$extract_ip = $pieces = explode(";", $xml);

$ipDetail[] = $extract_ip['6']; 


//get the country name inside the node <countryName> and </countryName>
//preg_match("@<countryName>(.*?)</countryName>@si",$xml,$matches);

//assign the country name to the $ipDetail array
$ipDetail[]=$extract_ip[4];

//get the country name inside the node <countryName> and </countryName>
//preg_match("@<countryAbbrev>(.*?)</countryAbbrev>@si",$xml,$cc_match);
$ipDetail[]=$extract_ip[3]; 

$ipDetail[]=$extract_ip[8]; 

$ipDetail[]=$extract_ip[9]; 

//assing the country code to array

//return the array containing city, country and country code
$ipDetail = json_encode($ipDetail);

echo $ipDetail;
