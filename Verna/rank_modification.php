<?php
function ConnectDB($CFG = 'empty')
{
if ($CFG=='empty')
require('panel/config.php');
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);
if(!$link)
die('');
else
return $link;
}

require('panel/config.php');
require "panel/lib/class.phpmailer.php";
$link = ConnectDB();
pg_prepare($link,'sql1','SELECT DISTINCT(business) from  w_categories  ORDER BY business  ');

	$result = pg_execute($link,'sql1',array());

	
	while($row = pg_fetch_array($result))
		{
			 pg_query($link, "DEALLOCATE ALL");
			if(trim($row["business"])!=''){
				
				pg_prepare($link,'sql2','SELECT * from  w_categories   WHERE business=$1 ORDER BY rank,id  ');

				$result1 = pg_execute($link,'sql2',array($row["business"]));
				pg_prepare($link,'sql3','SELECT count(*) as totlcat from  w_categories   WHERE business=$1 ');

				$result2 = pg_execute($link,'sql3',array($row["business"]));
				$row2 = pg_fetch_array($result2);
				
					$catgoryrankarray=array();
					$i=$row2["totlcat"];
					
					$j=0;
				while($row1 = pg_fetch_array($result1))
				{
					$j=$j+1;
					if(trim($row1["rank"])==''){
						
						$row1["rank"]=$j;
							 pg_query($link, "DEALLOCATE ALL");
						 $sql="UPDATE w_categories SET rank='".$j."' WHERE id='".$row1["id"]."' AND  business='".$row1["business"]."' ";
						 pg_prepare($link,'sql66',$sql);
						 pg_execute($link,'sql66',array());
					}else{
						
					if(!empty($catgoryrankarray)){
						
						if($j!=$row1["rank"]){
							$row1["rank"]=$j;
							 pg_query($link, "DEALLOCATE ALL");
									 $sql="UPDATE w_categories SET rank='".$j."' WHERE id='".$row1["id"]."' AND  business='".$row1["business"]."' ";
									 pg_prepare($link,'sql661',$sql);
									 pg_execute($link,'sql661',array());
						}
					}else{
						
						if($row1["rank"]!=1){
							 pg_query($link, "DEALLOCATE ALL");
							 $sql="UPDATE w_categories SET rank='1' WHERE  business='".$row1["business"]."' ";
							 pg_prepare($link,'sql661',$sql);
							 pg_execute($link,'sql661',array());
							 $j=1;
							
						}
					}
						
					}
					array_push($catgoryrankarray,$row1["rank"]);
				
				}
			
				
			}
			
		}


?>
<center><h1>Just refresh this page and solve update category rank  problem in new database </h1></center>