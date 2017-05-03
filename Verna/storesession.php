<?php
session_start();
$_SESSION['scriptid'] = $_POST['txt'];
echo $_SESSION['scriptid'] ;
echo 'subha';

?>