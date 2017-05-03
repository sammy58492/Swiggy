<h1>NOTIFICATION FILE</h1>
This file gets same info as cancel.php OR success.php. This file is not required BUT you can set up notifications.

<pre>
<?php
require_once("config.php");

$data	= $_POST["json"];
$mac	= $_POST["mac"];

$new_mac= strtoupper(hash('sha512', $data.$_CONFIG["shop_SECRET_ID"]));

if ($mac == $new_mac) {
	echo "Return data seems good to me!";
} else {
	echo "RETURN DATA FALSIFIED!!!!!";
}

echo "<br>";

print_r(json_decode($data));

?>
</pre>

<?php include("return_data_info.html") ?>
