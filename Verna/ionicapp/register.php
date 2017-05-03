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
$level = $obj->{'level'};

/*$name = 'aaa';
$lastname = 'bb';
$lastname2 = 'cc';
$email = 'zz1@gmail.com';
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


$response = array();

$link = ConnectDB();

pg_prepare($link,'sqlsql',"SELECT nextval('w_users_id_seq') as key");
$result = pg_execute($link,'sqlsql',array());
if (pg_num_rows($result)==1)
{

	 $row = pg_fetch_array($result);
	 $rowid = $row['key'];
	
}else{
	
	$rowid = 1;
}

pg_prepare($link,'sqlsaveuser','INSERT INTO w_users(id,name,lastname,lastname2,email,pwd,street,colony,country,city,cp,tel,cel,api,level) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)');
pg_execute($link,'sqlsaveuser',array($rowid,$name,$lastname,$lastname2,$email,$password,$address,$colony,$country,$city,$zip,$tel,$cel,$api,$level));


pg_prepare($link,'sqlsqllang',"SELECT nextval('w_users_lang_id_seq') as key");
$result1 = pg_execute($link,'sqlsql',array());
if (pg_num_rows($result1)==1)
{

     $row1 = pg_fetch_array($result1);
     $rowidlang = $row1['key'];
    
}else{
    
    $rowidlang = 1;
}
pg_prepare($link,'sqlsaveuserlang','INSERT INTO w_users_lang(id,users_id,lang_id,name_lang,lastname_lang,lastname2_lang,street_lang,colony_lang,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)');
pg_execute($link,'sqlsaveuserlang',array($rowidlang,$rowid,1,$name,$lastname,$lastname2,$address,$colony,'TRUE'));
 
if($imgpath !=''){
	
$CFG->dirimages = str_replace("/ionicapp/","/panel/",$CFG->dirimages);	
$oldname = $imgpath;
MoveImages($CFG->dirimages . 'users/',$oldname,$rowid);

pg_prepare($link,'sql','UPDATE w_users SET isimg=$1 WHERE id=$2');
pg_execute($link,'sql',array(1,$rowid));

}

$response['status'] = true;
$response['id'] = $rowid;

pg_close($link);
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); 

echo json_encode($response);

?>
