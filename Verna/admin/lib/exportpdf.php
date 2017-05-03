<?php
error_reporting(0);
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

header("Content-type: application/x-msdownload");
header("Content-Disposition: attachment; filename=".$_POST['name'].".xls");
header("Pragma: no-cache");
header("Expires: 0");

switch ($_POST['f'])
	{
	case 'ExportOrder':
		ExportOrder($_POST['data']);
	break;
	case 'ExportUser':
		ExportUser($_POST['data']);
	break;
	case 'ExportInvoice':
		ExportInvoice($_POST['data']);
	break;
	case 'Exportstatistic':
		Exportstatistic($_POST['data']);
	break;

	default:
		die();
	break;
	}
 
 function Exportstatistic($data)
	{
	$data=parse($data);
	//print_r($data);
	require('../languages/lang.en.php');	
	//SuperAdminsOnly();
	$link = ConnectDB();	
	
	  $msg  = '<meta http-equiv="Content-Type" content="text; charset=utf-8"/>';
      $msg = '<table cellpadding="0" border="1" cellspacing="0" style="border:0px;" align="center" width="800"><tbody>';
	   $msg .= '<tr><td align="center" colspan="8"><span style="font-size:16px;font-weight:bold;"></span></td></tr>';
	   
	  if($data=='All'){
	 $msg .= '<tr><td align="center" colspan="8"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_DAILY'].'</span></td></tr>';
	}else if($data=='Daily'){
	$msg .= '<tr><td align="center" colspan="8"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_DAILY'].'</span></td></tr>';
	}else if($data=='Weekly'){
	$msg .= '<tr><td align="center" colspan="8"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_WEEKLY'].'</span></td></tr>';
	}else if($data=='Monthly'){
	$msg .= '<tr><td align="center" colspan="8"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_MONTHLY'].'</span></td>';
	}else if($data=='Yearly'){
	$msg .= '<tr><td align="center" colspan="8"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_YEARLY'].'</span></td></tr>';
	}
	   
	  
	  
	  
	//  $msg .= '<tr><td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTIC'].'</span></td></tr>';
	  
      $msg .= '<tr><td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_COUNTRY'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_CITY'].'</span></td>';
     // $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_POSTCODE'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_ADDRESS'].' / '.$lang_resource['SEARCH_STATISTICS_POSTCODE'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_REGTURANT'].'</span></td>';
 	  $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_CATEGORY'].'</span></td>';
	  $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_HITS'].'</span></td>';
	  $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_CONVERSION'].'</span></td>';
	  $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['SEARCH_STATISTICS_RESULT'].'</span></td></tr>';

	$conditionalsvalues = array();
	$date = date("Y-m-d");
	
	if($data=='All'){
	$query = 'SELECT * FROM w_search_statistic WHERE DATE(date) = DATE(NOW()) ORDER BY date desc ';
	}else if($data=='Daily'){
	$query = 'SELECT * FROM w_search_statistic WHERE DATE(date) = DATE(NOW()) ORDER BY date desc ';	
	}else if($data=='Weekly'){
	 $query = "SELECT * FROM w_search_statistic WHERE date > CURRENT_DATE-6 AND DATE(date) <= CURRENT_DATE ORDER BY date desc";
	}else if($data=='Monthly'){
	$query = "SELECT * FROM w_search_statistic WHERE date > CURRENT_DATE-30 AND DATE(date) <= CURRENT_DATE ORDER BY date desc";
	}else if($data=='Yearly'){
	 $query = "SELECT * FROM w_search_statistic WHERE date > CURRENT_DATE-365 AND DATE(date) <= CURRENT_DATE ORDER BY date desc";
	}
	
	
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array());
	//pg_close($link);
	
	$ads = array();
	$arr_resturant = array();	
	$arr_categories = array();
	pg_prepare($link,'sqlcn125',"SELECT * FROM w_franchises where id=$1");
	while($row = pg_fetch_array($result))
		{
		
		
		unset($ad);
		unset($city);
		
		$adw->cat = array();
		$ad->id = " ";		
	
		/******************************** fetch city name **********************************/
		
		$res9 = pg_execute($link,'sqlcn125',array($row['city']));
		$rowcity = pg_fetch_array($res9);
		$ad->city = $rowcity['city'];
		/*******************************end******************/
		/******************************** fetch resturant name **********************************/
		$resturant = json_decode($row['resturant']);
		$resturant[0];
		if($resturant[0]=='-1'){
		
	 		$ad->resturant = strtoupper("All resturant");
		}else{
		
		foreach ($resturant as $key=>$value) {
			
			pg_prepare($link,'sqlresturant'.$key.$row['id'],"SELECT * FROM w_business where id=$1");
			$res9 = pg_execute($link,'sqlresturant'.$key.$row['id'],array($value));	
			$rows = pg_fetch_array($res9);	
			
			array_push($arr_resturant,$rows['name']);
			
		}
		
			$ad->resturant = strtoupper(implode(",",$arr_resturant));
	 	    $arr_resturant = array();
		}
		
		/*******************************end******************/
		/******************************** fetch category name **********************************/
		$categories = json_decode($row['categories']);
		if($categories[0]=='-1'){
			$ad->categories = strtoupper("All Categories");
		
		}else{
		foreach ($categories as $key=>$value) {
			pg_prepare($link,'sqlcategories'.$key.$row['id'],"SELECT * FROM w_categories where id=$1");
			$res9 = pg_execute($link,'sqlcategories'.$key.$row['id'],array($value));	
			$rowcity = pg_fetch_array($res9);	
			
			array_push($arr_categories,$rowcity['name']);
		}
		$ad->categories = strtoupper(implode(",",$arr_categories));
		$arr_categories = array();
		}
		/*******************************end******************/
		
			
		$ad->confirm_order = $row['confirm_order'];
		$ad->country = $row['country'];
		$ad->address = strtoupper($row['address']);
		

		$ad->date = $row['date'];
		$ad->total = $row['hit'];
		$ad->search_type = 'All';
		$ad->result = $row['result'];
		if($ad->result!='NO'){
			$ad->result = 'YES';
		}
		 $ad->conversion = (($ad->confirm_order)*100)/$ad->total;
		$ad->conversion = round($ad->conversion,$_SESSION['decimal_value']);
	
	
	

		 $ad->confirm_order = strtoupper($row['confirm_order']);
		 
		 $msg .= '<tr><td>'.$ad->country.'</td>';
		 
		 $msg .= '<td>'.$ad->city.'</td>';
		// $msg .= '<td>'.$ad->zipcode.'</td>';
		 $msg .= '<td>'.$ad->address.'</td>';
		 //$msg .= '<td>'.strtoupper($row['resturant']).'</td>';
		 $msg .= '<td>'.$ad->resturant.'</td>';
			 $msg .= '<td>'.$ad->categories.'</td>';
		
		
		  $msg .= '<td>'.$ad->total.'</td>';
		 $msg .= '<td>'.$ad->conversion.'%</td>';
		 $msg .= '<td>'.$ad->result.'</td></tr>';
		

		
		}
	echo $msg;	

		
	}
  function ExportOrder($data)
	{
require('../../languages/lang.en.php');
	ProvidersOnly();
	$link = ConnectDB();

  if ($_SESSION['user']->level=='2')//get all business that the providers owns
		{
		$businesss = array();
		pg_prepare($link,'sql','SELECT id,city FROM w_business WHERE provider=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result))
			{
			array_push($businesss,$row);
			}
		}
    $data = parse($data);
  	$type = $data->type;

  	$values = array();
  	$query = 'SELECT id,data,date FROM w_orders WHERE ';
  	$count = 0;

    foreach ($data->ids as $id)
  	{
        if ($count==0)
			     $query .= 'id=$'. ($count+1);
		    else
			     $query .= ' OR id=$' . ($count+1);

    array_push($values,$id);
		$count++;

   }//End of ForEach

  pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$values);
	$orders = array();
  while($row = pg_fetch_array($result))
		{
		$data = parse($row['data']);

		if ($_SESSION['user']->level=='2')
			{
			foreach ($data->business as $databusiness)
				{
				$founded = false;
				foreach ($businesss as $business)
					{
					if ($business==$databusiness->id)
						$founded = true;
					}
				if ($founded==false)
					unset($databusiness->id);
				}
			}

		$data->id = $row['id'];
    $data->date = $row['date'];
		array_push($orders,$data);
		}
		
       $msg  = '<meta http-equiv="Content-Type" content="text; charset=utf-8"/>';
    	$msg = '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;" align="center" width="800"><tbody>';
      $msg .= '<tr><td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_ORDER_NUMBER'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_NAME'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_EMAIL'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_DATE'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_TELEPHONE'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_PAYMENT_METHOD'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_ITEM'].'</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_ORDER_TOTAL'].'</span></td></tr>';


    
    for ($i=0;$i<count($orders);$i++)
		{
        
		
    $order = $orders[$i];
    $cuenta = count($orders);
    
		if ($type==0)//orders infor
			{  
        foreach ($order->business as $business)
				{
        
				if (!empty($business->id))
					{
					//update the buys count on the business
					pg_prepare($link,'sql4','SELECT buys from w_business WHERE id=$1');
          $result2 = pg_execute($link,'sql4',array($business->id));
          pg_query($link, 'deallocate '  . 'sql4');
					if (pg_num_rows($result2)==1)  
						while($row2 = pg_fetch_array($result2))
							{
							pg_prepare($link,'sqls','UPDATE w_business SET buys=$2 WHERE id=$1');
							pg_execute($link,'sqls',array($business->id,intval($row2['buys'])+1));
              pg_query($link, 'deallocate '  . 'sqls');
							}
          $total = 0;
          
          
          $paymethod = '';
          
          if ($business->paymethod->cash==true)
						$paymethod = $lang_resource['EXPORT_CASH'];

					if ($business->paymethod->card==true)
						if ($paymethod=='')
							$paymethod = $lang_resource['EXPORT_CARD'];
						else
							$paymethod .= ', '.$lang_resource['EXPORT_CARD'];
              
            
            $msg .= '<tr><td>'.$order->id.'</td>';
            $msg .= '<td>'. $business->name.'</td>';
            $msg .= '<td>'. $business->email.'</td>';
            $msg .= '<td>'. $order->date.'</td>';
            $msg .= '<td>'. $business->tel.'</td>';
            $msg .= '<td>'. $paymethod.'</td>';
            
            $msg .= '<td align="center">';
          	foreach ($business->dishes as $dish)
						{  
                           
					
             $msg.= $dish->name." ," ; 
            //ingredientes
						$con = array();
						$sin = array();
            foreach ($dish->ingredients as $ingredient)
							if ($ingredient->enabled)
								array_push($con,$ingredient->caption);
								//else
								//array_push($sin,$ingredient->caption);

						//$msg .= '<td align="center">';
						$count = 0;
						foreach ($con as $c)
							{
							if ($count==0)
								$msg .= $c;
								else
								$msg .= ',' . $c;
							$count++;
							}
					//	$msg .= '</td>';
            
						$con = array();
						foreach ($dish->extras as $extra)
							if ($extra->enabled)
								array_push($con,$extra->name);
								else
								array_push($sin,$extra->name);

					//	$msg .= '<td align="center">';
						$count = 0;
						foreach ($con as $c)
							{
							if ($count==0)
								$msg .= $c;
								else
								$msg .= ',' . $c;
							$count++;
							}
						//$msg .= '</td>';
            //$msg .= '<td align="center">' . ucfirst(strtolower($dish->comments)) . '</td>';
						//$msg .= '<td align="center">$' . $dish->total . '</td></tr>';
						$total = $total + $dish->total;
            //$msg .= '<tr><td>'. $order->id.'</td>';
            //$msg .= '<td colspan="9"></td>';
            /*$msg .= '<td></td>';
            $msg .= '<td></td>';
            $msg .= '<td></td>';
            $msg .= '<td></td>';
            $msg .= '<td></td>';
            $msg .= '<td></td>';
            $msg .= '<td></td>';
            $msg .= '<td></td>';*/
            }
          $msg .= '</td>';
          $total = $total + $business->shipping;
					$total = GetDecimalPoint($order->total);
					//business shipping and comment info
					if ($business->shipping=='0.00')
						$shippingcaption = $lang_resource['EXPORT_FREE_DELIVERY'];
					else
						$shippingcaption = $lang_resource['EXPORT_DELIVERY_COST'];  
            
            //$msg .= '<td>'.$shippingcaption.'</td><td colspan="2"></td><td>'. ucfirst(strtolower($business->comments)) .'</td><td>'. $business->shipping .'</td><td>'."$".$total.'</td></tr>';
            $msg .=  '<td>'."$".$total.'</td></tr>';
            //$msg .= '<tr><td colspan="10"></tr>';   
              
       $flag = false;
       if ($i == 0){
          $bussinesArray[$i] = $business->name;
          $bussinesTotalArray[$i] =  $total;
        }
      else{
        for($countFor=0;$countFor <= $i;$countFor++){
            
                if($bussinesArray[$countFor] == $business->name){
                    $bussinesTotalArray[$countFor] =  $bussinesTotalArray[$countFor] + $total;
                    $flag = true;
                }
                else if($countFor==$i and $flag == false){
                    $bussinesArray[sizeof($bussinesArray)] = $business->name;
                    $bussinesTotalArray[sizeof($bussinesTotalArray)] =  $total;  
                        
                } 
                
              }
              
          
              
                  
        } 
      }
        
      
      
    
      
     
  
    	if($i == count($orders)-1){
      $msg .= '</tbody></table>';
      
      $msg .= '<br/><center><table cellpadding="0" cellspacing="0" border="0" style="border:0px;border-spacing:0;border-collapse:collapse;" align="center" width="800"><tbody><tr><td>';
			$msg .= '<table cellpadding="0" border="0" cellspacing="0" align="center" width="800"><tbody>';
      $msg .= '<tr style="border:1px solid black;">';
      $msg .= '<tr style="border:1px solid black;">';
      $msg .= '<td align="center"; colspan="2"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_SUMMARY'].'</span></td></tr>';
      $msg .= '<tr>';
      $msg .= '<td align="center">'.$lang_resource['EXPORT_BUSINESS_NAME'].':</td>';
			$msg .= '<td align="center">'.$lang_resource['EXPORT_TOTAL'].'</td>';
			$msg .= '</tr>';
      for($j=0;$j<sizeof($bussinesArray);$j++){
        $msg .= '<tr style="border:1px solid black;">';
        $msg .= '<td>'.$bussinesArray[$j].'</td>';
        $msg .= '<td>'.$bussinesTotalArray[$j].'</td>';
        $msg .= '</tr>';
      }
    }
  }
} 
  else//buyer info
			{
			$msg .= '<br/><center><table cellpadding="0" cellspacing="0" border="0" style="border:0px;border-spacing:0;border-collapse:collapse;" align="center" width="800"><tbody><tr><td>';
			$msg .= '<table cellpadding="0" border="0" cellspacing="0" align="center" width="800"><tbody>';
			$msg .= '<tr style="border:1px solid black;">';
			$msg .= '<td align="center">'.$lang_resource['EXPORT_NAME'].'</td>';
			$msg .= '<td align="center">'.$lang_resource['EXPORT_EMAIL'].'</td>';
			$msg .= '<td align="center">'.$lang_resource['EXPORT_TELEPHONE'].'</td>';
			$msg .= '<td align="center">'.$lang_resource['EXPORT_ADRESS'].'</td>';
			$msg .= '<td align="center">'.$lang_resource['EXPORT_CITY'].'</td>';
			$msg .= '</tr>';

			$msg .= '<tr style="border:1px solid black;">';
			$msg .= '<td>'. ($order->buyer->name) . '</td>';
			$msg .= '<td>'. ($order->buyer->email) . '</td>';
			$msg .= '<td>'. ($order->buyer->tel) . '</td>';
			$msg .= '<td>'. ($order->buyer->address) . '</td>';
			$msg .= '<td>'. ($order->buyer->cityname) . '</td>';
			$msg .= '</tr>';

			$msg .= '</tbody></table></td></tr></tbody></table></center><br/>';
			}
}
  
  echo $msg;
	pg_close($link);
  }
  
  
  

function ExportUser($data)
	{
		require('../../languages/lang.en.php');
	ProvidersOnly();
	$link = ConnectDB();
	$data = parse($data);
	$msg='';

	$values = array($_SESSION['user']->level);
	$query = 'SELECT w_users.name,w_users.lastname,w_users.lastname2,w_users.email,w_users.tel,w_franchises.city FROM w_users LEFT JOIN w_franchises ON w_users.city=w_franchises.id WHERE w_users.level>$1 AND ';
	$count = 1;
	$msg .= '<meta http-equiv="Content-Type" content="text; charset=utf-8"/>';
	$msg .= '<br/><center><table cellpadding="0" cellspacing="0" border="0" style="border:0px;border-spacing:0;border-collapse:collapse;" align="center" width="800"><tbody><tr><td>';
	$msg .= '<table cellpadding="0" border="0" cellspacing="0" align="center" width="800"><tbody>';
	$msg .= '<tr style="border:1px solid black;">';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_NAME'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_EMAIL'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_LAST_NAME'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_LAST_NAME_2'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_TELEPHONE'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_CITY'].'</td>';
	$msg .= '</tr>';
	foreach ($data->ids as $id)
		{
		if ($count==1)
			$query .= 'w_users.id=$'. ($count+1);
			else
			$query .= ' OR w_users.id=$' . ($count+1);
		array_push($values,$id);
		$count++;
		}
	
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$values);
	

	while($row = pg_fetch_array($result))
		{
		$msg .= '<tr style="border:1px solid black;">';
		$msg .= '<td>'. ($row['name']) . '</td>';
		$msg .= '<td>'. ($row['lastname']) . '</td>';
		$msg .= '<td>'. ($row['lastname2']) . '</td>';
		$msg .= '<td>'. ($row['email']) . '</td>';
		$msg .= '<td>'. ($row['tel']) . '</td>';
		$msg .= '<td>'. ($row['city']) . '</td>';
		$msg .= '</tr>';
		}

	$msg .= '</tbody></table></td></tr></tbody></table></center><br/>';
	echo $msg;
	pg_close($link);
	}
	
	
	
	/* ................................................................Export Invoice......................................................................*/

  function ExportInvoice($data)
	{
require('../../languages/lang.en.php');
	ProvidersOnly();
	$link = ConnectDB();

    $data = parse($data);
  	$type = $data->type;

		
       $msg  = '<meta http-equiv="Content-Type" content="text; charset=utf-8"/>';
       $msg = '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;" align="center" width="800"><tbody>';
       $msg .= '<tr><td align="center"><span style="font-size:16px;font-weight:bold;">Invoice Number</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Date</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">City</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Resturant</span></td>';

       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Billing Option</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Setup Rate</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Fixed Rate</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Per Order Commission</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Per Order Fixed rate</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Other Rate</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">From Date</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">To Date</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Status</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Total Invoice</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">Total Order</span></td></tr>';
	   
	   
		
	   foreach ($data->ids as $id){
			$sql="sql{$id}";
			$sqlf="sqlf{$id}";
			pg_prepare($link,'$sql','Select * FROM w_invoice WHERE id=$1');
			$result = pg_execute($link,'$sql',array($id));
			$row = pg_fetch_array($result);
			
			
		   $msg .= '<tr><td>'.$row['id'].'</td>';
		   $msg .= '<td>'.$row['date'].'</td>';
		   
		   pg_prepare($link,'$sqlf','SELECT * from w_franchises WHERE id=$1');
		   $resultcity = pg_execute($link,'$sqlf',array($row['city']));
		   $cityData = pg_fetch_array($resultcity);

		   $msg .= '<td>'. $cityData['city'].'</td>';
		   $msg .= '<td>'.$row['resturant'].'</td>';
		   switch ($row['billing'])
		   {

				case '1':
					$billing = 'Billing Tab';
				break;
				case '2':
					$billing = 'Manually';
				break;
		   }
		   $msg .= '<td>'.$billing.'</td>';
		   $msg .= '<td>'.$row['setuprate'].'</td>';
		   $msg .= '<td>'.$row['fixedrate'].'</td>';
		   $msg .= '<td>'.$row['perordercommission'].'</td>';
		   $msg .= '<td>'.$row['perorderfixedrate'].'</td>';
		   $msg .= '<td>'.$row['otherrate'].'</td>';
		   $msg .= '<td>'.$row['dfrm'].'</td>';
		   $msg .= '<td>'.$row['tfrm'].'</td>';
		   switch ($row['status'])
		   {
				case '0':
					$status = 'Pending';
				break;
				case '1':
					$status = 'Completed';
				break;
				case '2':
					$status = 'Cancelled';
				break;
		   }
		   $msg .= '<td>'.$status.'</td>';
		   $msg .= '<td>'.$row['total_invoice'].'</td>';
		   $msg .= '<td>'.$row['totalorder'].'</td>';
	
		   $msg .= '</tr>';
		}
	 $msg .= '</table>';
 	 echo $msg;
	 pg_close($link);
  }


?>
