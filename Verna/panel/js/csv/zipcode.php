	<?php
	require("../lib/front-main.php");
	
function js_redirect($url)
  {
    echo "<script language=\"JavaScript\">\n";
    echo "<!-- hide from old browser\n\n";
    
    echo "window.location = \"" . $url . "\";\n";

    echo "-->\n";
    echo "</script>\n";

    return true;
 }
	
	$link = ConnectDB();
	$i=0;
    if(isset($_FILES["csvfile"])){
	$bid=$_REQUEST["businessid"];
		if($_FILES["csvfile"]["size"] > 0) { 
			$filename=$_FILES["csvfile"]["name"];
			move_uploaded_file($_FILES["csvfile"]["tmp_name"], $filename);
			
			pg_prepare($link,'sqlzip','SELECT * FROM w_zipcode WHERE zipcode=$1;');
			pg_prepare($link,'sqlzipin','INSERT INTO w_zipcode (id,zipcode,cost,businessid) VALUES ($1,$2,$3,$4)');
			pg_prepare($link,'zipfetch',"SELECT nextval('w_zipcode_id_seq') as key");
			
			$handle = fopen($filename,"r"); 
			do{ 
				if(isset($data[0])) { 
					$zipcode=addslashes($data[0]);
					$cost=addslashes($data[1]);
															
					if ($i!=0) 
					 {	
						$search = pg_execute($link,'sqlzip',array($zipcode));
						
						if(!(pg_num_rows($search) >= 1)) {
							$result = pg_execute($link,'zipfetch',array());

							if (pg_num_rows($result)==1)  
								while($row = pg_fetch_array($result))
									$id = $row['key'];
									
							pg_execute($link,'sqlzipin',array($id,$zipcode,$cost,$bid));
						}
					}
					$i++;
				} 
			}while ($data = fgetcsv($handle,0,",","'"));
			fclose($handle);	
			
			unlink($filename);
		}
	}
js_redirect("../");

?>
