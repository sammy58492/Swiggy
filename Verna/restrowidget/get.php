<?php
require_once("../panel/lib/front-main.php");
require("../languages/lang.en.php");
require('../panel/config.php');
  $link = ConnectDB($CFG);


if(isset($_POST['fname'])){echo $fname=$_POST['fname'];}
if(isset($_POST['lname'])){echo $lname=$_POST['lname'];}


  pg_prepare($link,'sql44','insert into w_test(fname,lname)values($1,$2)');
   $result = pg_execute($link,'sql44',array($fname,$lname));

?>