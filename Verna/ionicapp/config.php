<?php
$CFG = new stdClass();
//Please make sure your working php version is 5.2 ... you can check this with the file www.yoursite.com/version.php
$CFG->dbhost    = 'localhost';
//most times is just localhost, you can leave it as it is
$CFG->dbname= 'eurc1006';
$CFG->dbuser= 'eurc1006';
$CFG->dbpass= 'PhE3hAsUx7th';
//$CFG->wwwroot   = 'http://development2.orderingonlinesystem.com';
//your full root for example http://www.yoursite.com
$CFG->dir  = '/home/ordering/webapps/eurc1006/admin/';
$CFG->dirimages  = '/home/ordering/webapps/eurc1006/panel/images/';
//$CFG->dirimagesbackup  = '/home/tequilanock/webapps/oos_beta/panel/image_backup/';
//if you don't know your relative path please use the file www.yoursite.com/path.php
$CFG->dirimagesxhr  = 'images/';
//most times is just images/ leave it .
?>