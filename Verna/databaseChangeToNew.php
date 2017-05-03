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
function parse($str)
	{
	return json_decode($str);//php 5.1
	//return json_decode(stripslashes($str));
	}	
	

function TableExist($link,$tablename) {
	
	pg_prepare($link,'sqlTable'.$tablename,"select count(*) from pg_class where relname=$1 and relkind=$2");
    $exist_tbl = pg_execute($link,'sqlTable'.$tablename,array($tablename,'r'));
	$exist_tbl =  pg_fetch_array($exist_tbl);
	return $exist_tbl;
	}	
	
	
function columnExist($link,$tablename,$columnname) {
		
	
pg_prepare($link,'sqlADDCOLs'.$tablename.$columnname,"SELECT column_name  FROM information_schema.columns WHERE table_name=$1 and column_name=$2");
	
    $chk_record = pg_execute($link,'sqlADDCOLs'.$tablename.$columnname,array($tablename,$columnname));
	
	$fetch_record =  pg_fetch_array($chk_record);
	
	return $fetch_record;
	
	}	
		
function ColumnAddText($link,$tablename,$columnname) {
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname text");
    $result = pg_execute($link,'sqlADDCOL'.$tablename.$columnname,array());
	
	}	
	
function ColumnAddInteger($link,$tablename,$columnname) {
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname integer");
    $result = pg_execute($link,'sqlADDCOL'.$tablename.$columnname,array());
	
	}	
function ColumnAddBoolean($link,$tablename,$columnname) {
	pg_prepare($link,'sqlBOOLCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname boolean default false");
    $result = pg_execute($link,'sqlBOOLCOL'.$tablename.$columnname,array());
	
	}		
		
		
if(isset($_REQUEST['submit'])) {
		
		$link = ConnectDB();
		
		
		
$record_deliveryzone_businessid =columnExist($link,'w_deliveryzone','businessid');
$record_deliveryzone_businessinsertid =columnExist($link,'w_deliveryzone','businessinsertid');

	
	if($record_deliveryzone_businessid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_deliveryzone','businessid');
	 }
	 if($record_deliveryzone_businessinsertid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_deliveryzone','businessinsertid');
	 }
	 
	 
	 
$record_deliverykm_businessid =columnExist($link,'w_deliverykm','businessid');
$record_deliverykm_businessinsertid =columnExist($link,'w_deliverykm','businessinsertid');

	
	if($record_deliverykm_businessid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_deliverykm','businessid');
	 }
	 if($record_deliverykm_businessinsertid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_deliverykm','businessinsertid');
	 }
	 
	 
	 
$record_zipcode_businessid =columnExist($link,'w_zipcode','businessid');
$record_zipcode_businessinsertid =columnExist($link,'w_zipcode','businessinsertid');

	
	if($record_zipcode_businessid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_zipcode','businessid');
	 }
	 if($record_zipcode_businessinsertid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_zipcode','businessinsertid');
	 }	 


pg_prepare($link,'sqlCONSTRAINT',"ALTER TABLE w_categories DROP CONSTRAINT  w_categories_name_key");
pg_execute($link,'sqlCONSTRAINT',array());


$record_categories_businessid =columnExist($link,'w_categories','business');
$record_categories_businessinsertid =columnExist($link,'w_categories','rank');
$record_tabsettings_delivery_neighborhood=columnExist($link,'w_tabsettings','tab_delivery_neighborhood');

	
	if($record_categories_businessid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_categories','business');
	 }
	 if($record_categories_businessinsertid['column_name'] == '' ) {
	ColumnAddInteger($link,'w_categories','rank');
	 }	 	 
	 if($record_tabsettings_delivery_neighborhood['column_name'] == '' ) {
	ColumnAddBoolean($link,'w_tabsettings','tab_delivery_neighborhood');
	 }	 
	

	
	$neighborhood_table_exist =TableExist($link,'w_neighborhood') ;
	
	if($neighborhood_table_exist['count'] == 0) {
	
	pg_prepare($link,'sqlTableNeighbour',"CREATE TABLE w_neighborhood ( id INT PRIMARY KEY NOT NULL, country  INT, city INT,name text,enabled boolean default true)");
    $result = pg_execute($link,'sqlTableNeighbour',array());
	
	
	
	
	}

	/******************************************Table column update	********************************************************/
	
		/****************************************** column Data update	********************************************************/
	$link = ConnectDB();	
		pg_prepare($link,'sql3','SELECT * FROM w_business');
    $result = pg_execute($link,'sql3',array());

    while($row = pg_fetch_array($result)) {
		$buid = $row['id'];
		
		
		if($row['zones'] != "") {
			
				$zones = parse($row['zones']);
			     $zone1 = $zones->zone1->coordinates;	
				 $zone2 = $zones->zone2->coordinates;	
				 $zone3 = $zones->zone3->coordinates;	
						
		if(!empty($zone1)){
		
			
			      pg_prepare($link,'sqldInv1'.$buid,'SELECT * FROM w_deliveryzone ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqldInv1'.$buid,array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
			
			  pg_prepare($link,'sqldzo1'.$buid,'INSERT INTO w_deliveryzone (id,zonename,location,deliveryprice,business,address,minpurchase,schedule,days,businessid,businessinsertid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)');
			$scedule= '{"opens":{"hour":"0","minute":"0"},"closes":{"hour":"23","minute":"59"}}';
			$days ='[0]';
			if($zones->zone1->price) {
				
				$zone1price = $zones->zone1->price;
				
				}
			else {
				$zone1price =0;
				}
				unset($businessCus1);	
				$businessCus1[] = $row['id'];
		   $fetch_insert = pg_execute($link,'sqldzo1'.$buid,array($incheck,$row['name'],json_encode($zone1),$zone1price,json_encode($businessCus1),$row['street'],$row['minimum'],$scedule,$days,$row['id'],$incheck));
		   
				}
		if(!empty($zone2)){
		
			
			      pg_prepare($link,'sqldInv2'.$buid,'SELECT * FROM w_deliveryzone ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqldInv2'.$buid,array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
			
			  pg_prepare($link,'sqldzo2'.$buid,'INSERT INTO w_deliveryzone (id,zonename,location,deliveryprice,business,address,minpurchase,schedule,days,businessid,businessinsertid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)');
			$scedule= '{"opens":{"hour":"0","minute":"0"},"closes":{"hour":"23","minute":"59"}}';
			$days ='[0]';
			if($zones->zone2->price) {
				
				$zone2price = $zones->zone2->price;
				
				}
			else {
				$zone2price =0;
				}
				unset($businessCus2);	
				$businessCus2[] = $row['id'];
		   $fetch_insert = pg_execute($link,'sqldzo2'.$buid,array($incheck,$row['name'],json_encode($zone2),$zone2price,json_encode($businessCus2),$row['street'],$row['minimum'],$scedule,$days,$row['id'],$incheck));
		   
				}	
			if(!empty($zone3)){
		
			
			      pg_prepare($link,'sqldInv3'.$buid,'SELECT * FROM w_deliveryzone ORDER BY id DESC');
				  $fetch_record = pg_execute($link,'sqldInv3'.$buid,array());
				 
				  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
				  } else { 
				   $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
				  }
			
			  pg_prepare($link,'sqldzo3'.$buid,'INSERT INTO w_deliveryzone (id,zonename,location,deliveryprice,business,address,minpurchase,schedule,days,businessid,businessinsertid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)');
			$scedule= '{"opens":{"hour":"0","minute":"0"},"closes":{"hour":"23","minute":"59"}}';
			$days ='[0]';
			if($zones->zone3->price) {
				
				$zone3price = $zones->zone3->price;
				
				}
			else {
				$zone3price =0;
				}
			unset($businessCus3);	
			$businessCus3[] = $row['id'];	
		   $fetch_insert = pg_execute($link,'sqldzo3'.$buid,array($incheck,$row['name'],json_encode($zone3),$zone3price,json_encode($businessCus3),$row['street'],$row['minimum'],$scedule,$days,$row['id'],$incheck));
		   
				}		
					
		
		}
		
		$buid = $row['id'];
		$categories = parse($row['categories']);
		$exs =0;
		unset($storecategory);
		unset($storesingleCatid);
		foreach($categories as $cat) {
			
			pg_prepare($link,'sqluc3'.$buid.$cat.$exs,'SELECT * FROM w_categories WHERE id = $1');
		    $cat_results = pg_execute($link,'sqluc3'.$buid.$cat.$exs,array($cat));
		    $cat_fetch = pg_fetch_array($cat_results);
			
			
		  
		

			pg_prepare($link,'sqls'.$buid.$exs,"SELECT nextval('w_categories_id_seq') as key");
			$resultw = pg_execute($link,'sqls'.$buid.$exs,array());

	      
		    while($rows = pg_fetch_array($resultw))
		     $id = $rows['key'];
			 
			 
			 $storecategory[] = $id;
			
			 $storesingleCatid[$buid][$cat_fetch['id']] = $id;
			 
			 
			 
			 
			 
			   pg_prepare($link,'sqldcato1'.$buid.$exs,'INSERT INTO w_categories (id,name,isimg,business,rank,enabled) VALUES ($1,$2,$3,$4,$5,$6)');
			    $fetch_insert = pg_execute($link,'sqldcato1'.$buid.$exs,array($id,$cat_fetch['name'],$cat_fetch['isimg'],$buid,'1',$cat_fetch['enabled']));
		  
		
		 $exs ++;
		}
		
		
		pg_prepare($link,'sqlfetdish'.$buid,'select * from w_dishes WHERE business=$1');
	    $sql_dish_rec = pg_execute($link,'sqlfetdish'.$buid,array($buid));
		
		while($sql_data = pg_fetch_array($sql_dish_rec)) {
			
			/*echo $storesingleCatid[$sql_data['business']][$sql_data['category']];*/
		
		pg_prepare($link,'sqlupdish'.$buid.$sql_data['id'],'UPDATE w_dishes SET category=$2 WHERE id=$1');
		pg_execute($link,'sqlupdish'.$buid.$sql_data['id'],array($sql_data['id'],$storesingleCatid[$sql_data['business']][$sql_data['category']]));
			
			}
	
	
		$newseriscat = json_encode($storecategory);
		pg_prepare($link,'sqlupcat'.$buid,'UPDATE w_business SET categories=$2 WHERE id=$1');
		pg_execute($link,'sqlupcat'.$buid,array($buid,$newseriscat));
		
		
		
		
	}
	
        pg_prepare($link,'sqlconfigsfetch1','SELECT max(id) FROM w_configs');
    $resultconfigss = pg_execute($link,'sqlconfigsfetch1',array());	
	$fetch_max = pg_fetch_array($resultconfigss);
    $fetch_max_rec = $fetch_max['max']+1;
	
	  pg_prepare($link,'sqlconf1','INSERT INTO w_configs (id,name,value) VALUES ($1,$2,$3)');
	  $config_insert = pg_execute($link,'sqlconf1',array($fetch_max_rec,'ConfigNewData','1'));
	  
	  pg_prepare($link,'sqlcs','SELECT * FROM w_configs  WHERE name = $1 ');
	 $rs = pg_execute($link,'sqlcs',array("panelsetting"));
	 $rec = pg_num_rows($rs);
	     if($rec >0 ) {
		     	pg_prepare($link,'sqlc','UPDATE w_configs SET value=$1 WHERE name=$2');
				pg_execute($link,'sqlc',array('2',"panelsetting"));
		 } else {
			    $last_configs = $fetch_max['max'] +2;
			    pg_prepare($link,'sqlin','INSERT INTO w_configs (id,name,value) VALUES ($1,$2,$3)');
				pg_execute($link,'sqlin',array($last_configs,"panelsetting",'2'));
			 
			 }
		
		
		
	/****************************************** column Data update	********************************************************/	
	
	
		
		
		
		
	
}
		$link = ConnectDB();	
	
		pg_prepare($link,'sqlconfigs','SELECT * FROM w_configs WHERE name=$1');
       $resultconfigs = pg_execute($link,'sqlconfigs',array('ConfigNewData'));
	
	 ?>
		
		
        
        
        <!----------------------------template part------------------------------------------------------------->
        
         <style>
        .buttonc {
			 border:none;
			 background-color:#f00;
			 padding:5px 10px;
			 border-radius:3px;
			 cursor:pointer;
			 color:#FFF;
			 margin-top:140px;
			
			}
		.buttonc:hover {
			 border:none;
			 background-color:#900;
			 padding:5px 10px;
			 border-radius:3px;
			 cursor:pointer;
			 color:#FFF;
			 margin-top:140px;
			
			}	
        .divBox {
			width:70%; 
			height:300px;
		    border:1px solid #ccc;
			}
        </style>
        <center>
        <? if(isset($_REQUEST['submit'])) {
        echo "<h2>Data update successfully</h2>";
        } ?>
        <div class="divBox">
        
       <? if(pg_num_rows($resultconfigs) == 0 ) { ?>
        
		<form name="input" action="" method="post">
        <input type="hidden" name="Gocheck" value="1"  />
        <input type="submit" name="submit" value="SUBMIT" class="buttonc" />
        </form>
       <? } ?>
        </div> 
         </center>
        
        
         <!----------------------------template part------------------------------------------------------------->
        
