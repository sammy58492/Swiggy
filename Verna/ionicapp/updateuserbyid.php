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

$id = $obj->{'id'};
$name = $obj->{'name'};
$lastname = $obj->{'lastname'};
$lastname2 = $obj->{'lastname2'};
$email = $obj->{'email'};
$password = $obj->{'password'};
$address = $obj->{'address'};
$colony = $obj->{'colony'};
$zip = $obj->{'zip'};
$country = $obj->{'country'};
$city = $obj->{'city'};
$tel = $obj->{'tel'};
$cel = $obj->{'cel'};
$api = $obj->{'api'};
$imgpath=$obj->{'imgpath'};


/*$id = 5030;
$name = 'aaa';
$lastname = 'bb';
$lastname2 = 'cc';
$email = 'cbcb58@gmail.com';
$password = '12345';
$address = 'kolkata';
$colony = 'sss';
$zip = '452';
$city = '1';
$country = '1';
$tel = '545415';
$cel = '545415';
$api = '54';
$imgpath='';*/


$link = ConnectDB();

pg_prepare($link,'sql','UPDATE w_users SET name = $1, lastname = $2, lastname2 = $3, email = $4, pwd = $5, street = $6,  colony = $7, cp = $8, country = $9, city = $10, tel = $11, cel = $12, api = $13 WHERE id = $14 AND scriptid = $15');
$result = pg_execute($link,'sql',array($name,$lastname,$lastname2,$email,$password,$address,$colony,$zip,$country,$city,$tel,$cel,$api,$id,'0'));


pg_prepare($link,'sqlsaveuserlang','UPDATE w_users_lang SET name_lang=$1,lastname_lang=$2,lastname2_lang=$3,street_lang=$4,colony_lang=$5 WHERE users_id=$6 and lang_id=$7');
pg_execute($link,'sqlsaveuserlang',array($name,$lastname,$lastname2,$address,$colony,$id,'1'));


if($imgpath !=''){
	
$CFG->dirimages = str_replace("/ionicapp/","/panel/",$CFG->dirimages);	
$oldname = $imgpath;
MoveImages($CFG->dirimages . 'users/',$oldname,$id);

pg_prepare($link,'sql','UPDATE w_users SET isimg=$1 WHERE id=$2');
pg_execute($link,'sql',array(1,$id));

}

if($result)
{
	$response['status'] = true;
}
else
{
	$response['status'] = false;
}
pg_close($link);
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); 

echo json_encode($response);
?>