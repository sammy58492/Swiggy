<?php
session_start();
error_reporting(0);
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

header("Content-type: application/x-msdownload;charset=utf-8");
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

	default:
		die();
	break;
	}
 





  function ExportOrder($data)
	{
$lang_resource = GetLangFile();
	ProvidersOnly();
	$link = ConnectDB();

  if ($_SESSION['user']->level=='2' || $_SESSION['user']->level=='0')//get all business that the providers owns
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
			$data = new stdClass();
		$data = json_decode($row['data']);
		
		if ($_SESSION['user']->level=='2' || $_SESSION['user']->level=='0'){
			if($data->business !=""){
				foreach ($data->business as $databusiness){				
					$founded = false;
					foreach ($businesss as $business){
						if ($business==$databusiness->id)
							$founded = true;
					}
					//if ($founded==false)
						//unset($databusiness->id);
				}
			}
		}
		
		$data->id = $row['id'];
    $data->date = $row['date'];
		array_push($orders,$data);
		//print_r($orders);
		//exit();
		}
		
       $msg  = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    	$msg .= '<table cellpadding="0" border="0" cellspacing="0" style="border:0px;font-family: "DejaVu Sans";" align="center" width="800"><tbody>';

      $msg .= '<tr><td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_ORDER_NUMBER'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_NAME'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_EMAIL'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_DATE'].'</span></td>';
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_TELEPHONE'].'</span></td>';
     if ($type==0){
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_PAYMENT_METHOD'].'</span></td>';
      
      $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_ITEM'].'</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_ORDER_TOTAL'].'</span></td>';
   }
   $msg .='</tr>';

    
    for ($i=0;$i<count($orders);$i++)
		{
        
		
    $order = $orders[$i];
    $cuenta = count($orders);
    
		if ($type==0){//orders infor
		if($order->business !=""){	

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
						/*if($dish->ingredients !=""){*/
         /*   foreach ($dish->ingredients as $ingredient)
							if ($ingredient->enabled)
								array_push($con,$ingredient->caption);
						}*/
								//else

								//array_push($sin,$ingredient->caption);

						//$msg .= '<td align="center">';
						$count = 0;
						/*foreach ($con as $c)
							{
							if ($count==0)
								$msg .= $c;
								else
								$msg .= ',' . $c;
							$count++;
							}*/
					//	$msg .= '</td>';
            
						/*$con = array();
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
							}*/
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
            $msg .=  '<td>'.$lang_resource['SITE_CURRENCY'].''.$total.'</td></tr>';
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
      
      $msg .= '<br/><center><table cellpadding="0" cellspacing="0" border="0" style="border:0px;border-spacing:0;border-collapse:collapse;font-family: "DejaVu Sans";" align="center" width="800"><tbody><tr><td>';
			$msg .= '<table cellpadding="0" border="0" cellspacing="0" align="center" width="800" style="font-family: "DejaVu Sans";"><tbody>';
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
} 
  else//buyer info
			{
			$msg .= '<br/><center><table cellpadding="0" cellspacing="0" border="0" style="border:0px;border-spacing:0;border-collapse:collapse;font-family: "DejaVu Sans";" align="center" width="800"><tbody><tr><td>';
			$msg .= '<table cellpadding="0" border="0" cellspacing="0" align="center" width="800" style="font-family: "DejaVu Sans";"><tbody>';
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
	$lang_resource = GetLangFile();
	ProvidersOnly();
	$link = ConnectDB();
	$data = parse($data);
	$msg='';

	$values = array($_SESSION['user']->level);
	$query = 'SELECT w_users.name,w_users.lastname,w_users.lastname2,w_users.email,w_users.tel,w_franchises.city FROM w_users LEFT JOIN w_franchises ON w_users.city=w_franchises.id WHERE w_users.level>$1 AND ';
	$count = 1;
	$msg .= '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	$msg .= '<br/><center><table cellpadding="0" cellspacing="0" border="0" style="border:0px;border-spacing:0;border-collapse:collapse; font-family: "DejaVu Sans";" align="center" width="800"><tbody><tr><td>';
	$msg .= '<table cellpadding="0" border="0" cellspacing="0" align="center" width="800" style="font-family: "DejaVu Sans";"><tbody>';
	$msg .= '<tr style="border:1px solid black;">';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_NAME'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_LAST_NAME'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_LAST_NAME_2'].'</td>';
	$msg .= '<td align="center">'.$lang_resource['EXPORT_EMAIL'].'</td>';
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
$lang_resource = GetLangFile();
	ProvidersOnly();
	$link = ConnectDB();

    $data = parse($data);
  	$type = $data->type;

		
       $msg  = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
       $msg = '<table cellpadding="0" border="0" cellspacing="0" style="border:0px; font-family: "DejaVu Sans";" align="center" width="800"><tbody>';
       $msg .= '<tr><td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['INVOICE_EXPORT_INVOICE_NUMBER'].'</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_DATE'].'</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_CITY'].'</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_RESTURANT'].'</span></td>';

       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_BILLING_OPTION'].'</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_SETUP_RATE'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_FIXED_RATE'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_PER_ORDER_COMMISSION'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_PER_ORDER_FIXED_RATE'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_OTHER_RATE'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_FROM_DATE'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_TO_DATE'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_STATUS'].'</span></td>';
	   $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_TOTAL_INVOICE'].'</span></td>';
       $msg .= '<td align="center"><span style="font-size:16px;font-weight:bold;">'.$lang_resource['EXPORT_TOTAL_ORDER'].'</span></td></tr>';
	   
	   
		
	   foreach ($data->ids as $id){
			$sql="sql{$id}";
			$sqlf="sqlf{$id}";
			pg_prepare($link,'$sql'.$id,'Select * FROM w_invoice WHERE id=$1');
			$result = pg_execute($link,'$sql'.$id,array($id));
			$row = pg_fetch_array($result);
			
			
		   $msg .= '<tr><td>'.$row['id'].'</td>';
		   $msg .= '<td>'.$row['date'].'</td>';
		   
		   pg_prepare($link,'$sqlf'.$id,'SELECT * from w_franchises WHERE id=$1');
		   $resultcity = pg_execute($link,'$sqlf'.$id,array($row['city']));
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
					$status = $lang_resource['ORDER_PENDING'];
				break;
				case '1':
					$status = $lang_resource['ORDER_COMPLETED'];
				break;
				case '2':
					$status = $lang_resource['ORDER_CANCELLED'];
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
