<?php
error_reporting(0);
function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}
function InsertQuery($table,$fields,$CFG)
	{
	//get the id last secuence, with this we will get the next id seq and take it (id_sec will incriment with this query)
	$link = ConnectDB();
	$id = -1;

	pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);

	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			$query .=  ','. key($fields);
			array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}

	$query .= ') VALUES ($1';

	for ($i=0;$i<$count;$i++)
		$query .= ',$' . ($i+2);

	$query .= ')';
	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$values);
	pg_close($link);
	return $id;
	}

	

function js_redirect($url,$business)
  {
    echo "<script language=\"JavaScript\">\n";
    echo "<!-- hide from old browser\n\n";
	echo "alert('Product insert successfully!');";
	
    echo "window.location = \"" . $url."index.php?bidr=".$business."\";\n";

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
			
			pg_prepare($link,'sqlpro','SELECT * FROM w_dishes WHERE name=$1 and business=$2;');
			
			pg_prepare($link,'profetch',"SELECT nextval('w_dishes_id_seq') as key");
			
			
			
			$handle = fopen($filename,"r"); 
			do{
				
				if(isset($data[0])) { 
				    $datacm = explode(",",$data[0]);
					$description=addslashes($datacm[0]);
					if($datacm[1]!="") {
				    $ingredients= json_encode(explode("@",$datacm[1]));
					}
					 else {
						$ingredients = "";
						
						}
					$price=addslashes($datacm[2]);
					$business=$_REQUEST['businessid'];
					 $category=addslashes($datacm[3]);
					 $name= utf8_encode($datacm[4]);
					
															
					if ($i!=0) 
					 {	
						$search = pg_execute($link,'sqlpro',array($name,$business));
						
						if(!(pg_num_rows($search) >= 1)) {
						
					
						
						unset($formuser);
						$formuser->fields->description=new stdClass();
						$formuser->fields->description->value = $description;
						$formuser->fields->ingredients=new stdClass();
						$formuser->fields->ingredients->value = $ingredients;
						$formuser->fields->ingredients=new stdClass();
						$formuser->fields->ingredients->value = $ingredients;
						$formuser->fields->price=new stdClass();
						$formuser->fields->price->value = $price;
						$formuser->fields->business=new stdClass();
						$formuser->fields->business->value = $business;
						$formuser->fields->category=new stdClass();
						$formuser->fields->category->value = $category;
						$formuser->fields->name=new stdClass();
						$formuser->fields->name->value = $name;


						$usrid = InsertQuery('w_dishes',$formuser->fields,$CFG);
						
						}
					}
					$i++;
				} 
			}while ($data = fgetcsv($handle,1000, ";"));
			fclose($handle);	
			
			unlink($filename);
		}
	}
js_redirect("../",$business);

?>
