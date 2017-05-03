<?php
session_start();
session_destroy();
session_unset();
session_start();
srand();
$challenge = "";
for ($i = 0; $i < 80; $i++)
    $challenge .= dechex(rand(0, 15));
$_SESSION['challenge'] = $challenge;
echo $challenge;
?>
