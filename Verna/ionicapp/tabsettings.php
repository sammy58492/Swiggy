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
$link = ConnectDB();
$response = array();

pg_prepare($link,'tabsettings','SELECT * FROM w_tabsettings WHERE scriptid = 0');
$tabsettings_res = pg_execute($link,'tabsettings',array());
$tabsettings_row = pg_fetch_array($tabsettings_res);

//print_r($tabsettings_row);
$id = $tabsettings_row["id"];
$country = $tabsettings_row["country"];
$city = $tabsettings_row["city"];
$tab_delivery = $tabsettings_row["tab_delivery"];
$tab_delivery_country = $tabsettings_row["tab_delivery_country"];
$tab_delivery_city = $tabsettings_row["tab_delivery_city"];
$tab_delivery_address = $tabsettings_row["tab_delivery_address"];
$tab_delivery_option = $tabsettings_row["tab_delivery_option"];
$tab_pickup = $tabsettings_row["tab_pickup"];
$tab_pickup_country = $tabsettings_row["tab_pickup_country"];
$tab_pickup_city = $tabsettings_row["tab_pickup_city"];
$tab_pickup_option = $tabsettings_row["tab_pickup_option"];
$tab_reservation = $tabsettings_row["tab_reservation"];
$tab_reservation_country = $tabsettings_row["tab_reservation_country"];
$tab_reservation_city = $tabsettings_row["tab_reservation_city"];
$tab_reservation_option = $tabsettings_row["tab_reservation_option"];
$list_step = $tabsettings_row["list_step"];
$tab_delivery_neighborhood = $tabsettings_row["tab_delivery_neighborhood"];
$autocomplete = $tabsettings_row["autocomplete"];
$scriptid = $tabsettings_row["scriptid"];

$tab_settings = array(
				'tab_delivery' => $tab_delivery,
				'tab_pickup' => $tab_pickup,
				'tab_reservation' => $tab_reservation
				);
//print_r($settings_tab);	

$delevery_settings = array(
					'tab_delivery_country' => $tab_delivery_country,
					'tab_delivery_city' => $tab_delivery_city,
					'tab_delivery_address' => $tab_delivery_address,
					'tab_delivery_neighborhood' => $tab_delivery_neighborhood,
					'tab_delivery_option' => $tab_delivery_option
					);		

//print_r($delevery_settings);

$pickup_settings = array(
					'tab_pickup_country' => $tab_pickup_country,
					'tab_pickup_city' => $tab_pickup_city,
					'tab_pickup_option' => $tab_pickup_option					
					);
//print_r($pickup_settings);

$reservation_settings = array(
						'tab_reservation_country' => $tab_reservation_country,
						'tab_reservation_city' => $tab_reservation_city,
						'tab_reservation_option' => $tab_reservation_option
						);
						




$response['settings']= array(
				'status' => 'true',
				'tab_settings' => $tab_settings,
				'delevery_settings' => $delevery_settings,
				'pickup_settings' => $pickup_settings,
				'reservation_settings' => $reservation_settings
				);

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); 

echo '<pre>'.json_encode($response).'</pre>';

?>