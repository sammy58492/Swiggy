<?php
ob_start();
require('front-main.php');
$url = urldecode($_GET['url']);
$id = $_GET['id'];


//save hit on database
$link = ConnectDB();	
pg_prepare($link,'sql','SELECT hits FROM w_ads WHERE id=$1');
$result = pg_execute($link,'sql',array($id));
if (pg_num_rows($result)==1)  
	while($row = pg_fetch_array($result))
		$hits = $row['hits'];

$hits = intval($hits)+1;
pg_prepare($link,'sql2','UPDATE w_ads SET hits=$2 WHERE id=$1');
$result = pg_execute($link,'sql2',array($id,$hits));
pg_close($link);
header('Location: '.$url);
ob_end_flush();
?>
