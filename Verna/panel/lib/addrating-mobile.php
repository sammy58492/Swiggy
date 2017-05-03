<?php
ob_start();
require $_SERVER['DOCUMENT_ROOT']."/panel/config.php";
require $_SERVER['DOCUMENT_ROOT']."/panel/lib/panel-review.php";

$valores_neto = stripslashes($_GET['rating']);


$valores_bruto_js = json_decode($valores_neto);


$valores_bruto->id_w_business=$valores_bruto_js[0];;
$valores_bruto->id_order = $valores_bruto_js[1];
$valores_bruto->quality =$valores_bruto_js[2];
$valores_bruto->delivery=$valores_bruto_js[3];
$valores_bruto->dealer=$valores_bruto_js[4];
$valores_bruto->package =$valores_bruto_js[5];
$valores_bruto->date =$valores_bruto_js[6];
session_start();
if(isset($_SESSION['user']->id)) { 
$valores_bruto->usr = $_SESSION['user']->id;
}

$tabla = "w_review";

$link = ConnectDB();
    
if($link)
{	

 print_r($valores_bruto); 
 
  $result = InsertQuery($tabla,$valores_bruto,$CFG = 'empty');
  $_GET['reload'] = 2;  
}

/*if($link){
$result = InsertQuery($tabla,$valores_bruto,$CFG = 'empty');
 $_GET['reload'] = 2;
}*/
else
echo '<script languaje="javascript">
        alert("Expired link");
         var url_part=document.location.href.split("/");
          var url_complete = "http://"+url_part[2];
            location.href = url_complete;
        </script>';




?>
