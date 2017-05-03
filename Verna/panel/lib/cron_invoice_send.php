<?
require("front-main.php");
require('../config.php');
require "class.phpmailer.php";
$link = ConnectDB();

/*****  Fetch Enabled Invoice *****/
pg_prepare($link,'sql','SELECT * from w_business WHERE enabled=$1 ORDER BY id DESC');
$result = pg_execute($link,'sql',array('TRUE'));
while($row = pg_fetch_array($result)){
	$bid = $row['id'];
	$autoinvoiceday = $row['autoinvoiceday'];
	$lasteffect = $row['lasteffect'];
	
	/* Check Autoinvoiceday is greater or equal with (current date - lasteffectday) */
	if($autoinvoiceday != ''){
	  
		  $currentdate = date('Y-m-d');
		  $diff = abs(strtotime($currentdate) - strtotime($lasteffect));
		  $days = floor($diff / (60*60*24));
		  
		  if($days >= $autoinvoiceday){
			  
			  
			  /* Fetch Orders */
		 if($lasteffect == null){
			 $currentdate = date('Y-m-d');
	  		 $lasteffect = date('Y-m-d', strtotime('-'.$autoinvoiceday.' days', strtotime($current)));
			
		 }
			  pg_prepare($link,'sql_fetchorder',"SELECT id,date,data FROM w_orders where date between '$lasteffect' and '$currentdate' and invoicestatus=0 and status=1 ORDER BY id DESC");
			  $fetch_order = pg_execute($link,'sql_fetchorder',array());
	
			  
			  $cashcount=0;
			  $cashtotal=0;
			  
			  $cardcount=0;
			  $cardtotal=0;
			  
			  $paypalcount=0;
			  $paypaltotal=0;
			  
			  $totalval=0;
			  $totalorder=0;
			 
			  $order_id = array();
			  
			  pg_prepare($link,'sqlinvoicestatus','update w_orders set invoicestatus=1 WHERE id=$1');
			 
			  while($rs = pg_fetch_array($fetch_order)){
			  		$data = $rs['data'];
					$data = parse($data);
					$businessid = $data->business[0]->id;
					if($data->business[0]->paymethod->cash == 1){
						$cashcount = $cashcount+1;
						$cashtotal += $data->total;
						$cashtotal = round($cashtotal, $_SESSION['decimal_value']); 								
					}
							
					if($data->business[0]->paymethod->card == 1){
						$cardcount = $cardcount+1;
						$cardtotal += $data->total;
						$cardtotal = round($cardtotal, $_SESSION['decimal_value']); 	
					}
					if($data->business[0]->paymethod->paypal == 1){
						$paypalcount = $paypalcount+1;
						$paypaltotal += $data->total;	
						$paypaltotal = round($paypaltotal, $_SESSION['decimal_value']); 
					}
					$totalorder = $totalorder+1;
					array_push($order_id,$rs['id']);
					pg_execute($link,'sqlinvoicestatus',array($rs['id']));
			  }
			  
			  $count = array("cash"=>$cashcount,"card"=>$cardcount,"paypal"=>$paypalcount);
			  $total = array("cash"=>$cashtotal,"card"=>$cardtotal,"paypal"=>$paypaltotal);
			  
			  $totalval = $cashtotal + $cardtotal + $paypaltotal;
			  $totalval = round($totalval, $_SESSION['decimal_value']);
			  
			  pg_prepare($link,'sqlbusiness',"SELECT city,name,billingfxprice,fixedrate,billingperorder,billingperorderfixrate,vat,otherrate FROM w_business where id=$1 ORDER BY id DESC");
			  $fetch_business = pg_execute($link,'sqlbusiness',array($bid));
			  $rowbusiness = pg_fetch_array($fetch_business);
			  $bcity = $rowbusiness['city'];
			  $resturantname = $rowbusiness['name'];
			  $setuprate = $rowbusiness['billingfxprice'];
			  $fixedrate = $rowbusiness['fixedrate'];
			  $perordercommission = $rowbusiness['billingperorder'];
			  $perorderfixedrate = $rowbusiness['billingperorderfixrate'];
			  $vat = $rowbusiness['vat'];
			  $otherrate = $rowbusiness['otherrate'];
			  $billing = 1;
			  
			  $cureentdateupdate = date('Y-m-d H:i:s');
			  $cureentdate = date('Y-m-d');
			  
			  $orderrate =$perorderfixedrate * $totalorder;
			  $orderrate =round($orderrate, $_SESSION['decimal_value']); 
			  
			  $commisioncal = ($perordercommission/100) * $totalval;
			  $commisioncal =round($commisioncal, $_SESSION['decimal_value']); 
			  
			  $tmptotal = $commisioncal + $setuprate + $fixedrate + $orderrate + $otherrate;
			  $tmptotal =round($tmptotal, $_SESSION['decimal_value']); 
			  
			  $vatp = ($vat/100) * $tmptotal; 
			  $vatp =round($vatp, $_SESSION['decimal_value']); 
			  
			  $totalbalance1 = $tmptotal + $vatp;
			  $totalbalance1 =round($totalbalance1, $_SESSION['decimal_value']);  

				/* to get autoincrement id from invoice table */			  
			  pg_prepare($link,'sqld4','SELECT * FROM w_invoice ORDER BY id DESC');
			  $fetch_record = pg_execute($link,'sqld4',array());
			  if(pg_num_rows($fetch_record) == 0) { 
				  $incheck = 1;
			  } else { 
				  $all_rec= pg_fetch_array($fetch_record);
				  $incheckpre= $all_rec['id'];
				  $incheck = $incheckpre + 1;
			 }
			  
			pg_prepare($link,'sqlcreateinvoice','INSERT INTO w_invoice (id,city,businessi,dfrm,tfrm,billing,setuprate,fixedrate,perordercommission,perorderfixedrate,otherrate,total_invoice,resturant,date,totalorder,orderid,count,total,vat,invoicepay) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)');
			$fetch_insert = pg_execute($link,'sqlcreateinvoice',array($incheck,$bcity,$businessid,$lasteffect,$cureentdate,$billing,$setuprate,$fixedrate,$perordercommission,$perorderfixedrate,$otherrate,$totalval,$resturantname,$cureentdateupdate,$totalorder,json_encode($order_id),json_encode($count),json_encode($total),$vat,$totalbalance1));
			
			$curdate = 	date('Y-m-d');		   
			pg_prepare($link,'sqlinvoicestatusupdate','update w_business set lasteffect=$2 WHERE id=$1');	
			pg_execute($link,'sqlinvoicestatusupdate',array($bid,$curdate));		   
			  		  
		   }
		  
	}
	echo '<br>';
}

?>