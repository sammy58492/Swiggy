<?php
ob_start();
session_start();
require('front-main.php');
$bulk = json_decode($_POST['data']);
$link = ConnectDB();
define("IS_PAYPAL_ENABLED", 1);
$response = new stdClass();
foreach ($bulk as $data)
	{
	switch ($data->operation)
		{
		
	 case 'GetOptionCount':
            $response->review=GetOptionCount($data->id,$data->position);
            break;
        case 'GetOptions':
            $response->review=GetOptions($data->id);
            break;
        case 'GetPrices':
            $response->review=GetPrices($data->ids);
            break;
        case 'GetTotalPrices':
            $response->review=GetTotalPrices($data->ids);
            break;
        case 'GetSet':
            $response->review=GetSet($data->id);
            break;
        case 'GetAllSets':
             $response->review=GetAllSets($data->id);
            break;
	     case 'GetTotalPricesEdit':
             $response->review=GetTotalPricesEdit($data->ids);
            break;
		
		
	 
		
		}
	}

pg_close($link);
echo json_encode($response);

/******************************************************Product Option********************************************/
	function GetAllSets($id)
{
    $extras=null;
    $extras_details=array();
    $response=null;
    $set_name=null;
    $link = ConnectDB();
	
	//$id1 = 141;
	//$id2 = 142;
	$query_p = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlp',$query_p);
    $result_p = pg_execute($link,'sqlp',array('businesspagpersonsetting'));
    $row_p = pg_fetch_array($result_p);
	$person1 = $row_p["value"];
	
	$query_q = 'SELECT value FROM w_configs WHERE name=$1';
    pg_prepare($link,'sqlq',$query_q);
    $result_q = pg_execute($link,'sqlq',array('businesspagqtysetting'));
    $row_q = pg_fetch_array($result_q);
	$qty1 = $row_q["value"];
	
	
    pg_prepare($link,'sql_sets','SELECT extras FROM w_dishes WHERE id=$1');
    $result2 = pg_execute($link,'sql_sets',array($id));
	
	
    while($row2 = pg_fetch_array($result2))
    {
		
		if($row2['extras'] == "") {
				return 0;
			
			}
       // unset($extra_detail);
        $extra_detail = new stdClass();
        $extras=$row2['extras'];
    }
    $extras=parse($extras);
	$q=1;
	
	
	
	
foreach($extras as $extra)
{
    pg_prepare($link,'sql_sets_name'.$extra,'SELECT * FROM w_extras WHERE id=$1');
    $result2 = pg_execute($link,'sql_sets_name'.$extra,array($extra));
    while($row2 = pg_fetch_array($result2))
    {
		$set_name = new stdClass();
       // unset($set_name);
        $set_name->name=$row2['set'];
        $set_name->set_id=$row2['id'];
		$set_name->qty_count=$row2['qty']; 	
		$set_name->person_count=$row2['person'];
		$set_name->position=$q;
		$totaloption=$totaloption + totaloption($row2['id'],$link);
		
		$set_name->person = $person1;
		$set_name->qty = $qty1;
		
        array_push($extras_details,$set_name);
    }
	$q++;
}
	$response = new stdClass();
    $response->extras_details = $extras_details;
	$response->option_count = $totaloption;
    return $response;
 /*   $response->extras_details = $extras_details;
    return $response;*/

}


function totaloption($sid,$link)
{
 
    
    //$link = ConnectDB();
    
    $rn = rand();
    
    pg_prepare($link,'optiontotal'.$rn,'SELECT option_id FROM w_extras_options WHERE set_id=$1 AND conditional = $2 GROUP BY option_id');
    $resulttotal = pg_execute($link,'optiontotal'.$rn,array($sid,'no'));
    $totalfetch = pg_num_rows($resulttotal);
    
    return $totalfetch;
}

function GetOptions($data)
{

    $id=$data[0]->id;
    $set_id=$data[0]->set_id;
	$choice_name_prn=$data[0]->choice_name;
    $setposition = $data[0]->setposition;
	
	
	
    $extra_detail=null;
    $extras_details=array();
    $response=null;
    $link = ConnectDB();
    pg_prepare($link,'sql_options'.$id,'SELECT DISTINCT(choice_id),* FROM w_extras_options WHERE option_id=$1 AND set_id=$2');
    $result2 = pg_execute($link,'sql_options'.$id,array($id,$set_id));
	
	 pg_prepare($link,'sql_options_yes','SELECT option_id,with_respect_to FROM w_extras_options WHERE set_id=$1 AND conditional=$2 ');
    $results3 = pg_execute($link,'sql_options_yes',array($set_id,"yes"));
	
	while($fetch2 = pg_fetch_array($results3))
	{
		//echo $fetch2['with_respect_to'];
		if($fetch2['with_respect_to'] != "null" && $fetch2['with_respect_to'] != "" ) {
			//echo $fetch2['with_respect_to'];
			$fetch_op = explode(",",$fetch2['with_respect_to']);
			
			$optionselect = $fetch_op[1];
			$show_option[$optionselect]= $fetch2['option_id'];		
			}
	}
/*	print_r($show_option);
	exit();*/
	$c=0;
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra_detail);
		$showoptions = $row2['choice_id'];
		 $extra_detail = new stdClass();
        $extra_detail->id =$row2['id'];
		 $extra_detail->set_id =$row2['set_id'];
        $extra_detail->option_id =$row2['option_id'];
        $extra_detail->option_name = businessoptionnameforcheckout($row2['option_id'],$row2['id'],$c);
        //$extra_detail->choice_name = $row2['choice_name'];
		$extra_detail->choice_name = businesschoicename($row2['option_id'],$row2['choice_id']);
        $extra_detail->choice_id = $row2['choice_id'];
        $extra_detail->with_respect_to = $row2['with_respect_to'];
        $extra_detail->conditional = $row2['conditional'];
        $extra_detail->copy = $row2['copy'];
        $extra_detail->price = $row2['price'];
        $extra_detail->rank = $row2['rank'];
		if($row2['rank'] != "null") {
		$extra_detail->setposition = $setposition*100+$row2['rank'];
		} else {
		$extra_detail->setposition = $setposition*100+1;	
			}
		$extra_detail->text_to_end_user = businesstexttoenduser($row2['option_id'],$row2['id'],$c);
        $extra_detail->min_sel = $row2['min_sel'];
        $extra_detail->max_sel = $row2['max_sel'];
        $extra_detail->ingredients = $row2['ingredients'];
        $extra_detail->set_id= $row2['set_id'];
	    $extra_detail->showoption= $show_option[$showoptions];
		$extra_detail->choice_name_prn=  $choice_name_prn;	
		$c++;
		if($extra_detail->choice_name !=null)	
        array_push($extras_details,$extra_detail);
    }
	$response = new stdClass();
    $response->extras_details = $extras_details;
    return $response;
}
function GetPrices($ids){

    $choice_id=$ids[0]->choice_id;
    $set_id=$ids[0]->set_id;
    $option_id=$ids[0]->option_id;
    $extra_choice_price=null;
    $extra_choice_prices=array();
    $extra_option_price=null;
    $extra_option_prices=array();

    $with_respect_to=$option_id.','.$choice_id;
    $response=null;
    $link = ConnectDB();
    pg_prepare($link,'sql_choice_prices','SELECT choice_id,choice_name,price FROM w_extras_options WHERE set_id=$1 AND with_respect_to=$2');
    $result2 = pg_execute($link,'sql_choice_prices',array($set_id,$with_respect_to));
    while($row2 = pg_fetch_array($result2))
    {  //unset($extra_choice_price);
      $extra_choice_price = new stdClass();
       $extra_choice_price->price=$row2['price'];
       $extra_choice_price->choice_name=$row2['choice_name'];
        $extra_choice_price->choice_id=$row2['choice_id'];
      array_push($extra_choice_prices,$extra_choice_price);
    }

    pg_prepare($link,'sql_options_price','SELECT price,choice_id FROM w_extras_options WHERE choice_id=$1');
    $result2 = pg_execute($link,'sql_options_price',array($choice_id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra_option_price);
        $extra_choice_price = new stdClass();
        $extra_option_price->price=$row2['price'];
        $extra_option_price->choice_id=$row2['choice_id'];
        array_push($extra_option_prices,$extra_option_price);
    }
    $response->choice_prices = $extra_choice_prices;
    $response->option_prices = $extra_option_prices;
    return $response;
}
function GetTotalPrices($data)
{
	
    $link = ConnectDB();
    $price=0;
	$prices=0;
    $set_id=null;
    $choice_array=array();
	$choice_id_array_check=array();
	
    $option_id=0;
    $choice_id_array=array();
    $user_choice_array=array();
    $ingredients=array();
	$user_choice_allid = array();
	if($data->comments)
	$commentCart = $data->comments;

		if($data->setid !="") {
   foreach($data->setid as $setsAll) {
    $set_ids[]=$setsAll->set_id;
	}
	
	 $set_id = implode(",",$set_ids);
		}

if($data->fields != null)
  $data_temp=get_object_vars($data->fields);
else
	$data_temp= "";	


	
  $with_respect_to=array();
   $i=0;
    $j=0;
    $ingredient=array();
	if($data_temp !="") {
      foreach($data_temp as $key=>$value)
      {
        if((strpos($value->value,'Left')!==false) || (strpos($value->value,'Right')!==false) || (strpos($value->value,'Whole')!==false) )
          {
            $ingredient[]=$value->value;
          }
          if(strpos($key,'drop')!=false)
          {
			  
              $with_respect_to[$i]=substr($key,strpos($key,'drop-')+5,strlen($key)-1).','.$value->value;
              $choice_id_array[$i]=$value->value; /*substr($key,strpos($key,'drop-')+5,strlen($key)-1);*/
			  $choice_id_array_check[$i]=$value->save; 
			  $choice_id_array_ivalue[$i]=$value->ivalue;
			 
              $i++;
          }
          else{

              if($value->value=="true"){
                   //$user_choice_array[$j]=$key;
				  
				   $skey = explode("-@",$key);
				   $user_choice_array[$j]=$skey[0] ;
                   $choice_array[$j]=$key;
              }
			  $j++;
          }
		  if($value->value == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->value == "false") {
		  //array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->save == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
		 /* else if($value->value == $value->ivalue) {
		  array_push($user_choice_allid,$value->id);  
		  }*/
		  
      }
	}
   /* print_r($with_respect_to);
    print_r($choice_array);
   // print_r($choice_id_array);
	print_r($user_choice_allid);
   
    print_r($user_choice_array);*/
	/*print_r($user_choice_allid);
	exit();*/
	//print_r($chid);
	//print_r($choice_id_array_ivalue);
    $cky =0;
    foreach ($choice_id_array as $chid) {
       if($choice_id_array_check[$cky] == "true")  {
		 
		  
    pg_prepare($link,'sql_extra_options_prices'.$chid,'SELECT  choice_name,choice_id,set_id,option_id,price,rank FROM w_extras_options WHERE choice_id=$1 AND set_id in ('.$set_id.')');
    $result2 = pg_execute($link,'sql_extra_options_prices'.$chid,array($chid));
    $i=0;
    while($row2 = pg_fetch_array($result2))
    {
        $price +=$row2['price'];
		
		
          array_push($user_choice_array,$row2['choice_name']);
		
		 
	   }
    }
	$cky++;
   }

    foreach ($with_respect_to as $wrt) {
        pg_prepare($link,'sql_extra_choices_prices'.$wrt,'SELECT choice_name,choice_id,price,option_text_to_end_user FROM w_extras_options WHERE with_respect_to=$1 AND set_id in ('.$set_id.')');
    $result2 = pg_execute($link,'sql_extra_choices_prices'.$wrt,array($wrt));
   if(!empty($result2)){
    $data1=get_object_vars($data->fields);
       $i=0;
   while($row2 = pg_fetch_array($result2))
    {
     $choice_name=$row2['choice_name'];

      if(in_array($choice_name,$choice_array))
        {
      $price+=$row2['price'];
            $key=$key = array_search($choice_name, $choice_array);

           // unset($choice_array[$key]);
            $choice_array[$key] = new stdClass();

        }
    }
   }
  }
    $count=0;
	$product_option_element = array();
	$rowrecord =  array();
	
    foreach ($user_choice_allid as $allids) {
	//	echo $user_choice_allid[$allids];
        $count++;
        pg_prepare($link,'sql_extra_choices_prices'.$count,'SELECT option_id,choice_name,choice_id,price,option_text_to_end_user FROM w_extras_options WHERE choice_id=$1 AND set_id in ('.$set_id.')');
        $result2 = pg_execute($link,'sql_extra_choices_prices'.$count,array($allids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {
                     $prices+=$row2['price'];
					
					// unset($obj);
					if(!in_array($row2['choice_id'],$rowrecord)) {
					$rowrecord[]=$row2['choice_id'];
					$obj = new stdClass();
					$obj->option_id = $row2['option_id'];
					$obj->option_text_to_end_user =  businesstexttoenduser2($row2['option_id'],$row2['choice_id']);
					$obj->text =  businesschoicename2($row2['option_id'],$row2['choice_id']);
					$obj->choice_id = $row2['choice_id'];
					$obj->extraprice =  $row2['price'];
					array_push($product_option_element,$obj);
					}

            }
        }
    }

    $ingredients_choices=array();
    foreach($ingredient as $ing){
        $temp=array();
        $temp=explode('_',$ing);

        $op_ids=$temp[1];

        pg_prepare($link,'sql_extra_choices'.$op_ids,'SELECT choice_name FROM w_extras_options WHERE option_id=$1');
        $result2 = pg_execute($link,'sql_extra_choices'.$op_ids,array($op_ids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {

                $ingredients_choices[$row2['choice_name']]='('.$temp[0].')';
            }
        }
    }

    foreach($ingredients_choices as $key=>$value){
    if(in_array($key,$user_choice_array))
    {
      $pos=array_search($key,$user_choice_array);
       $user_choice_array[$pos]= $user_choice_array[$pos].$value;
     }
    }
	$response = new stdClass();
    $response->price = $prices;
    $response->choice_array=$user_choice_array;
	$response->product_option_element=$product_option_element;
    $response->choice_allid=implode(",",$user_choice_allid);
    $response->choice_ids=$choice_id_array;
    $response->set_id=$set_id;
	if(isset($commentCart))
	 $response->comments=$commentCart;
    return $response;
}


function GetTotalPricesEdit($data)
{
	
    $link = ConnectDB();
    $price=0;
	$prices=0;
    $set_id=null;
    $choice_array=array();
	$choice_id_array_check=array();
	
    $option_id=0;
    $choice_id_array=array();
    $user_choice_array=array();
    $ingredients=array();
	$user_choice_allid = array();
	if($data->comments)
	$commentCart = $data->comments;


  $data_temp=get_object_vars($data->fields);


	
  $with_respect_to=array();
   $i=0;
    $j=0;
    $ingredient=array();
	if($data_temp!="") {
      foreach($data_temp as $key=>$value)
      {
        if((strpos($value->value,'Left')!==false) || (strpos($value->value,'Right')!==false) || (strpos($value->value,'Whole')!==false) )
          {
            $ingredient[]=$value->value;
          }
          if(strpos($key,'drop')!=false)
          {
			  
              $with_respect_to[$i]=substr($key,strpos($key,'drop-')+5,strlen($key)-1).','.$value->value;
              $choice_id_array[$i]=$value->value; /*substr($key,strpos($key,'drop-')+5,strlen($key)-1);*/
			  $choice_id_array_check[$i]=$value->save; 
			  $choice_id_array_ivalue[$i]=$value->ivalue;
			 
              $i++;
          }
          else{

              if($value->value=="true"){
				  
				  	$skey = explode("-@",$key);
				    $user_choice_array[$j]=$skey[0] ;
                  // $user_choice_array[$j]=$key;
                   $choice_array[$j]=$key;
              }
			  $j++;
          }
		 
		 
		 if($value->value == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->value == "false") {
		  //array_push($user_choice_allid,$value->id);  
		  }
		  else if($value->save == "true") {
		  array_push($user_choice_allid,$value->id);  
		  }
      }
	}
   
    $cky =0;
    foreach ($choice_id_array as $chid) {
       if($choice_id_array_check[$cky] == "true")  {
		 
		  
    pg_prepare($link,'sql_extra_options_prices'.$chid,'SELECT choice_name,choice_id,set_id,option_id,price FROM w_extras_options WHERE choice_id=$1');
    $result2 = pg_execute($link,'sql_extra_options_prices'.$chid,array($chid));
    $i=0;
    while($row2 = pg_fetch_array($result2))
    {
        $price +=$row2['price'];
          array_push($user_choice_array,$row2['choice_name']);
		
		  
		   //$user_choice_allid[$id] =$value->id;
        $set_id=$row2['set_id'];
		
       // $choice_id_array[$i++]=$row2['choice_id'];
	   }
    }
	$cky++;
   }

    foreach ($with_respect_to as $wrt) {
        pg_prepare($link,'sql_extra_choices_prices'.$wrt,'SELECT choice_name,choice_id,price,option_text_to_end_user FROM w_extras_options WHERE with_respect_to=$1');
    $result2 = pg_execute($link,'sql_extra_choices_prices'.$wrt,array($wrt));
   if(!empty($result2)){
    $data1=get_object_vars($data->fields);
       $i=0;
   while($row2 = pg_fetch_array($result2))
    {
     $choice_name=$row2['choice_name'];

      if(in_array($choice_name,$choice_array))
        {
      $price+=$row2['price'];
            $key=$key = array_search($choice_name, $choice_array);

            //unset($choice_array[$key]);
            $choice_array[$key] = new stdClass();

        }
    }
   }
  }
    $count=0;
	$product_option_element = array();
	$rowrecord =  array();
	
    foreach ($user_choice_allid as $allids) {
	//	echo $user_choice_allid[$allids];
        $count++;
        pg_prepare($link,'sql_extra_choices_prices'.$count,'SELECT option_id,choice_name,choice_id,price,option_text_to_end_user FROM w_extras_options WHERE choice_id=$1');
        $result2 = pg_execute($link,'sql_extra_choices_prices'.$count,array($allids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {
                    $prices+=$row2['price'];
					
					$obj = new stdClass(); 
					if(!in_array($row2['choice_id'],$rowrecord)) {
					$rowrecord[]=$row2['choice_id'];
					$obj->option_id = $row2['option_id'];
					$obj->option_text_to_end_user =  businesstexttoenduser3_n($row2['option_id'],$count);
					$obj->text =  $row2['choice_name'];
					$obj->choice_id = $row2['choice_id'];
					$obj->extraprice =  $row2['price'];
					array_push($product_option_element,$obj);
					}

            }
        }
    }

    $ingredients_choices=array();
    foreach($ingredient as $ing){
        $temp=array();
        $temp=explode('_',$ing);

        $op_ids=$temp[1];

        pg_prepare($link,'sql_extra_choices'.$op_ids,'SELECT choice_name FROM w_extras_options WHERE option_id=$1');
        $result2 = pg_execute($link,'sql_extra_choices'.$op_ids,array($op_ids));
        if(!empty($result2)){
            while($row2 = pg_fetch_array($result2))
            {

                $ingredients_choices[$row2['choice_name']]='('.$temp[0].')';
            }
        }
    }

    foreach($ingredients_choices as $key=>$value){
    if(in_array($key,$user_choice_array))
    {
      $pos=array_search($key,$user_choice_array);
       $user_choice_array[$pos]= $user_choice_array[$pos].$value;
     }
    }
$response = new stdClass(); 
    $response->price = $prices;
	$response->product_option_element=$product_option_element;
    $response->choice_array=$user_choice_array;
    $response->choice_allid=implode(",",$user_choice_allid);
    $response->choice_ids=$choice_id_array;
    $response->set_id=$set_id;
	if(isset($commentCart))
	 $response->comments=$commentCart;
    return $response;
}

function GetSet($id){

    $link = ConnectDB();
    pg_prepare($link,'sql3','SELECT set_id from w_user_extras WHERE user_id=$1');
    $result = pg_execute($link,'sql3',array($id));
    $i=0;
    $set_id=array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result)){
            $set_id[$i++]=$row['set_id'];
        }

    $set_name=array();
    $i=0;
    foreach ($set_id as $s_id) {

        pg_prepare($link,'sql1'.$s_id,'SELECT set from w_extras WHERE id=$1');
        $result = pg_execute($link,'sql1'.$s_id,array($s_id));
        if (pg_num_rows($result)>0){

            while($row = pg_fetch_array($result)){

                $set_name[$i++]=$row['set'];
            }
        }

    }
    pg_close($link);
    $response=null;
    $response->set_name=$set_name;
    return $response;
}


function GetOptionCount($set_id,$position="")
{
	
    $link = ConnectDB();

    /*option_name,choice_name,with_respect_to,conditional,copy,price,rank,option_text_to_end_user,max_sel,min_sel,ingredients,*//*AND copy <>$2*/
    pg_prepare($link,'sql_extra_options'.$set_id,'SELECT option_id,COUNT(option_id),rank FROM w_extras_options WHERE set_id=$1 AND conditional=$2   GROUP BY option_id,rank ORDER BY rank ASC');
    $result2 = pg_execute($link,'sql_extra_options'.$set_id,array($set_id,"no"));
	 pg_prepare($link,'sql_conditional'.$set_id,'SELECT conditional FROM w_extras_options WHERE option_id=$1  ');
  
    $option_counts=array();
    $response=null;
    $option_count=null;
    $extra=null;
    $extras=array();
    while($row2 = pg_fetch_array($result2))
    {
       // unset($option_count);
		
		 //$results22 = pg_execute($link,'sql_conditional'.$set_id,array($row2['option_id']));
	     //$catch = pg_fetch_array($results22);
		 
		$option_count = new stdClass(); 
        $option_count->option_id = $row2['option_id'];
        $option_count->rank = $row2['rank'];
		$option_count->setposition = $position;
		
		$option_count->conditional = "no";
        $option_count->count = $row2['count'];
        array_push($option_counts,$option_count);
    }

    pg_prepare($link,'sql_extra'.$set_id,'SELECT id,set,text_to_end_user FROM w_extras WHERE id=$1 and enabled=true');
    $result2 = pg_execute($link,'sql_extra'.$set_id,array($set_id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra);
		$extra = new stdClass();
        $extra->name = $row2['set'];
        $extra->text_to_end_user = $row2['text_to_end_user'];
        $extra->id = $row2['id'];
        array_push($extras,$extra);
    }
	$response = new stdClass();
    $response->extras = $extras;
    $response->option_counts = $option_counts;
    return $response;
}

function GetGroupAndChoices($id)
{
    $extra=null;
    $extras=array();
    $response=null;
    $link = ConnectDB();
    pg_prepare($link,'sql_extra'.$id,'SELECT set,text_to_end_user FROM w_extras WHERE id=$1 and enabled=true');
    $result2 = pg_execute($link,'sql_extra'.$id,array($id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra);
         $extra = new stdClass();
        $extra->id = $id;
        $extra->name = $row2['set'];
        $extra->price = $row2['price'];
        array_push($extras,$extra);
    }


    $extra_detail=null;
    $extras_details=array();

    $response=null;
    pg_prepare($link,'sql_extra_details'.$id,'SELECT * FROM w_extras_options WHERE set_id=$1 ORDER BY rank ASC');
    $result2 = pg_execute($link,'sql_extra_details'.$id,array($id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($extra_detail);
        $extra_detail = new stdClass();
        $extra_detail->id =$row2['id'];
        $extra_detail->option_id =$row2['option_id'];
        $extra_detail->option_name = $row2['option_name'];
        $extra_detail->choice_name = $row2['choice_name'];
        $extra_detail->choice_id = $row2['choice_id'];
        $extra_detail->with_respect_to = $row2['with_respect_to'];
        $extra_detail->conditional = $row2['conditional'];
        $extra_detail->copy = $row2['copy'];
        $extra_detail->price = $row2['price'];
        $extra_detail->rank = $row2['rank'];
        $extra_detail->text_to_end_user = $row2['rank'];
        $extra_detail->min_sel = $row2['min_sel'];
        $extra_detail->max_sel = $row2['max_sel'];
        $extra_detail->ingredients = $row2['ingredients'];
       array_push( $extras_details,$extra_detail);
    }


/*print_r(parse($extras_details)->review);*/
    $choices=null;
    $extras_choices=array();
    $response=null;
    pg_prepare($link,'sql_extra_choices'.$id,'SELECT w_choices.option_id,w_choices.price,w_choices.name FROM w_choices JOIN w_extras_details ON  w_choices.set_id=$1 and w_choices.option_id IN (w_extras_details.id) ORDER BY w_extras_details.rank ASC');
    $result2 = pg_execute($link,'sql_extra_choices'.$id,array($id));
    while($row2 = pg_fetch_array($result2))
    {
        //unset($choices);
        $choices = new stdClass();
       $choices->option_id = $row2['option_id'];
        $choices->name = $row2['name'];
        $choices->price = $row2['price'];
        /*print_r($choices)*/
       array_push($extras_choices,$choices);
    }



$response->extras = $extras;
$response->extras_details = $extras_details;
$response->extras_choices = $extras_choices;
    return $response;
}
	/******************************************************Product Option********************************************/
?>
