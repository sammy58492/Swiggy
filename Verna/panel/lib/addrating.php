<?php
require $_SERVER['DOCUMENT_ROOT']."/panel/config.php";
require $_SERVER['DOCUMENT_ROOT']."/panel/lib/panel-review.php";
$link = ConnectDB();

$valores_neto = stripslashes($_GET['rating']);
$valores_bruto_js = json_decode($valores_neto);
$valores_bruto->id_w_business=$valores_bruto_js[0];;
$valores_bruto->id_order = $valores_bruto_js[1];
if(isset($valores_bruto_js[2]))
$valores_bruto->quality =$valores_bruto_js[2];
else 
$valores_bruto->quality =0;
if(isset($valores_bruto_js[3]))
$valores_bruto->delivery=$valores_bruto_js[3];
else 
$valores_bruto->delivery =0;
if(isset($valores_bruto_js[4]))
$valores_bruto->dealer=$valores_bruto_js[4];
else 
$valores_bruto->dealer =0;
if(isset($valores_bruto_js[5]))
$valores_bruto->package =$valores_bruto_js[5];
else 
$valores_bruto->package =0;
$valores_bruto->date = date("Y-m-d");
session_start();
if(isset($_SESSION['user']->id)) { 
$valores_bruto->usr = $_SESSION['user']->id;
}


$orderid = $valores_bruto->id_order;
pg_prepare($link,'order_sql','SELECT data FROM w_orders WHERE id = $1');
$order_result = pg_execute($link,'order_sql',array($orderid));
$order_row = pg_fetch_array($order_result);
	$data = json_decode($order_row["data"]);
	$valores_bruto->name = $data->buyer->name;
	$valores_bruto->email = $data->buyer->email;
	$valores_bruto->city = $data->buyer->city;


//echo 'name = '.$valores_bruto->name.' email = '.$valores_bruto->email.' city = '.$valores_bruto->city;
$tabla = "w_review";


    
if($link)

{	
  /*$business_id =  GetOrderData($valores_bruto->id_order,1);
  for ($i=0;$i<count($business_id);$i++)
		{
    $order = $business_id[$i];
    $cuenta = count($business_id);
    foreach ($order->business as $business)
				{
     $valores_bruto->id_w_business = $business->id;
    }
  
}   */

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
