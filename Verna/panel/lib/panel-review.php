<?php
//require('front-main.php');

/***********************************************************DB CONNECT**************************************************************/
function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
	require  $_SERVER['DOCUMENT_ROOT']."/panel/config.php";
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}

  
function InsertQuery($table,$fields,$CFG = 'empty')
	{
	//get the id last secuence, with this we will get the next id seq and take it (id_sec will incriment with this query)
	$link = ConnectDB($CFG);
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
      array_push($values,$field);
			$count++;
			}

    	next($fields);
		}	

	$query .= ') values ($1';

	for ($i=0;$i<$count;$i++)
		$query .= ',$' . ($i+2);

	$query .= ')';
	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$values);
	pg_close($link);
	return $id;
	}
  
function GetOrderData($id,$valor)
{
      $link = ConnectDB();
      $values = array();
  	  $businesss = array();
			pg_prepare($link,'sql','SELECT id FROM w_business WHERE id<$1');
			$result = pg_execute($link,'sql',array($valor));
			while($row = pg_fetch_array($result))
				{
				array_push($businesss,$row['id']);
				}
	
  $query = 'SELECT id,data,date FROM w_orders WHERE id=$1';
  pg_prepare($link,'sql1',$query);
	$result2 = pg_execute($link,'sql1',array($id));
  $info = array();
  while($row = pg_fetch_array($result2))
		{
			$data = parse($row['data']); 
      $data->id = $row['id'];
      $data->date = $row['date'];
      array_push($info,$data);
      
		/*foreach ($data->business as $databusiness)
				{
				  array_push($info,$databusiness);
				} */
    
		
    //array_push($info,$data);
    }
    
   // array_push($info,$data);
    pg_close($link);
    return $info;
}
function parse($str)
	{
	//return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and forward
	}
  
function GetReviewData($id)
{
      $link = ConnectDB();
      $query = 'SELECT COUNT(*) AS conteo  FROM w_review WHERE id_order=$1 ' ;
      pg_prepare($link,'sql1',$query);
    	$result3 = pg_execute($link,'sql1',array($id));
      $review = array();
      while($row = pg_fetch_array($result3))
		  {
      
			$data->count = $row['conteo'];
      //$data->ids = $row['id'];
                        $data->business = $row['id_w_business'];
      //$data->order = $row['id_order'];
      //array_push($review,$data);
   }
    
    pg_close($link);
    return $data;
}
function GetExistData($id,$bid)
{
      $link = ConnectDB();
       $query = 'SELECT *  FROM w_orders WHERE id=$1 ' ;
       pg_prepare($link,'sqle',$query);
       $result3 = pg_execute($link,'sqle',array($id));
		if(pg_num_rows($result3) > 0){
			$data =  pg_fetch_array($result3);
			$hiss = parse($data['data']);
			$hiss->business[0]->id;
			//echo $hiss->business[0]->id;
			if($bid == $hiss->business[0]->id){
				return 1;	
			}else{return 0;}
			//print_r($hiss);
		}
    pg_close($link);
}

function GetCheckData($id)
{
       $link = ConnectDB();
       $query = 'SELECT *  FROM w_orders WHERE id=$1 ' ;
       pg_prepare($link,'sql1',$query);
       $result3 = pg_execute($link,'sql1',array($id));

    return pg_num_rows($result3);
}
function GetBusinessCity($businessId)
  {
      $link2 = ConnectDB();
      $query = 'SELECT city  FROM w_franchises WHERE id =$1';
      
      pg_prepare($link2,'sql1',$query);
    	$result4 = pg_execute($link2,'sql1',array($businessId));
      $numero = pg_numrows($result4);
      $data = $businessId;
      while($row= pg_fetch_array($result4))
		  {
      
			$data = $row['city'];
      
      }
    
    pg_close($link2);
    return $data;
}
function GetBusinessDetails($businessId)
  {
      $link2 = ConnectDB();
      $query = 'SELECT *  FROM w_business WHERE id =$1';
      
      pg_prepare($link2,'sql3',$query);
    	$result4 = pg_execute($link2,'sql3',array($businessId));
      $numero = pg_num_rows($result4);
      //$data = $businessId;
     $row= pg_fetch_array($result4);
		  
    pg_close($link2);
    return $row;
}
function GetReviewDataAvg($id)
{
     $link = ConnectDB();
     $query = 'SELECT AVG(quality) as quality,AVG(delivery) as delivery,AVG(dealer) as dealer,AVG(package) as package FROM w_review WHERE id_w_business=$1 ' ;
      pg_prepare($link,'sql11',$query);
    	$result6 = pg_execute($link,'sql11',array($id));
      $review = array();
      while($row = pg_fetch_array($result6))
		  {
      
			$data->quality = $row['quality'];
      $data->delivery = $row['delivery'];
      $data->dealer = $row['dealer'];
      $data->package = $row['package'];
      $data->total = ($data->quality + $data->delivery + $data->dealer + $data->package)/4;
      //$data->ids = $row['id'];
      //$data->business = $row['id_w_business'];
      //$data->order = $row['id_order'];
      //array_push($review,$data);
   }
    
   
    return $data;
}

function GetPaymentDetails($id)
{
	$link = ConnectDB();
	$query = 'SELECT acceptcard, paypal FROM w_business WHERE id=$1 ' ;
	pg_prepare($link,'sql12',$query);
    	$result6 = pg_execute($link,'sql12',array($id));
      $review = array();
      while($row = pg_fetch_array($result6))
		  {
      
			$data->acceptcard = $row['acceptcard'];
      $data->paypal = $row['paypal'];
   } 
    return $data;
}


//Fetch review count
switch ($_POST['f'])
	{
		case 'CountReview':
		CountReview($_POST['id']);
	     break;
	}
	
	function CountReview($id)
	 {
		 
		  $link = ConnectDB();
		  unset($record);
		  $query_present = 'SELECT * FROM w_orders WHERE id=$1';
		  pg_prepare($link,'sql2',$query_present);
		  $result4 = pg_execute($link,'sql2',array($id));
		  $recordNo = pg_num_rows($result4);
		  
		  if($recordNo > 0) { 
		  
		  $query = 'SELECT *  FROM w_review WHERE id_order=$1 ' ;
		  pg_prepare($link,'sql1',$query);
		  $result3 = pg_execute($link,'sql1',array($id));
		  $row = pg_num_rows($result3);
		     if($row > 0 ) {
				
				$record->orderExist= true;
				$record->orderDublicate= false;
				$data = json_encode($record);
				echo $data;
				 }
			else {
				$record->orderExist= true;
				$record->orderDublicate= true;
				$data = json_encode($record);
				echo  $data;
				
				
				}	 
				 
		  }
		  else {
			  $record->orderExist= false;
			  $record->orderDublicate= false;
			  $data = json_encode($record); 
			  echo $data;
			  
			  
			  }
    
   
		 
	 }
?>
