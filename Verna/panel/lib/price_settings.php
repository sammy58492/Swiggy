<?php
	require("front-main.php");
	
function js_redirect($url)
  {
    echo "<script language=\"JavaScript\">\n";
    echo "<!-- hide from old browser\n\n";
	echo "alert('Price insert successfully!');";
	
    echo "window.location = \"" . $url . "\";\n";

    echo "-->\n";
    echo "</script>\n";

    return true;
 }
	
$link = ConnectDB();
$businessid = $_POST['businessid'];
$room = $_POST['room'];
$table = $_POST['table'];
$free = $_POST['free'];

$query = 'SELECT * FROM w_reserve_chart WHERE business=$1';
pg_prepare($link,'sql',$query);
$result = pg_execute($link,'sql',array($businessid));
if(pg_num_rows($result)==0){
	
		pg_prepare($link,'sqld4','SELECT * FROM w_reserve_chart ORDER BY id DESC');
		$fetch_record = pg_execute($link,'sqld4',array());
		if(pg_num_rows($fetch_record) == 0) { 
			$incheck = 1;
		} else { 
			$all_rec= pg_fetch_array($fetch_record);
			$incheckpre= $all_rec['id'];
			$incheck = $incheckpre + 1;
		}	
	
	pg_prepare($link,'sql1','INSERT INTO w_reserve_chart (id,rtype,business,price) VALUES ($1,$2,$3,$4)');
	$fetch_insert = pg_execute($link,'sql1',array($incheck,1,$businessid,$table));
	
		pg_prepare($link,'sqld5','SELECT * FROM w_reserve_chart ORDER BY id DESC');
		$fetch_record = pg_execute($link,'sqld5',array());
		if(pg_num_rows($fetch_record) == 0) { 
			$incheck = 1;
		} else { 
			$all_rec= pg_fetch_array($fetch_record);
			$incheckpre= $all_rec['id'];
			$incheck = $incheckpre + 1;
		}	
	
	pg_prepare($link,'sql2','INSERT INTO w_reserve_chart (id,rtype,business,price) VALUES ($1,$2,$3,$4)');
	$fetch_insert = pg_execute($link,'sql2',array($incheck,2,$businessid,$room));
	
		pg_prepare($link,'sqld6','SELECT * FROM w_reserve_chart ORDER BY id DESC');
		$fetch_record = pg_execute($link,'sqld6',array());
		if(pg_num_rows($fetch_record) == 0) { 
			$incheck = 1;
		} else { 
			$all_rec= pg_fetch_array($fetch_record);
			$incheckpre= $all_rec['id'];
			$incheck = $incheckpre + 1;
		}	
	
	pg_prepare($link,'sql3','INSERT INTO w_reserve_chart (id,rtype,business,price) VALUES ($1,$2,$3,$4)');
	$fetch_insert = pg_execute($link,'sql3',array($incheck,3,$businessid,$free));
}else{
	pg_prepare($link,'sql1','UPDATE w_reserve_chart set price=$1 where rtype=$2 and business=$3');
	$fetch_insert = pg_execute($link,'sql1',array($table,1,$businessid));
	
	pg_prepare($link,'sql2','UPDATE w_reserve_chart set price=$1 where rtype=$2 and business=$3');
	$fetch_insert = pg_execute($link,'sql2',array($room,2,$businessid));
	
	pg_prepare($link,'sql3','UPDATE w_reserve_chart set price=$1 where rtype=$2 and business=$3');
	$fetch_insert = pg_execute($link,'sql3',array($free,3,$businessid));
}



js_redirect("../");

?>
