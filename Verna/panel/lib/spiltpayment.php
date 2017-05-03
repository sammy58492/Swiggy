<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';
	
	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f'])
	{
	
	case 'FetchPaymentData':
		FetchPaymentData($_POST['id']);
	break;
	case 'FetchInvoiceData':
		FetchInvoiceData($_POST['id']);
	break;
	case 'FetchInvoiceDataAll':
		FetchInvoiceDataAll($_POST['id']);
	break;
	case 'SaveMakePayment':
		SaveMakePayment($_POST['data']);
	break;
	case 'FetchAllOrdersDataE':
		FetchAllOrdersDataE($_POST['filters'],$_POST['business']);
	break;
	case 'SavePay':
		SavePay($_POST['data']);
	break;
	default:
		die();
	break;
	}

function FetchAllPaymentData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	$orders = array();
	pg_prepare($link,'sql','SELECT * from w_makepayment');
	$result = pg_execute($link,'sql',array());
	if (pg_num_rows($result)==1) {
		while($row = pg_fetch_array($result)){
			$makepayment->id = $row['id'];
			$makepayment->date = $row['date'];
			$makepayment->bus_id = $row['bus_id'];
			$makepayment->invoiceid = $row['invoice_id'];
			$makepayment->totalinvoice = $row['total_invoice'];
			$makepayment->totalorder = $row['total_invoiceitem'];
			$makepayment->payment = $row['payment'];
			$makepayment->due = $row['pdue'];
		}
	}
		
array_push($orders1,$makepayment);
echo json_encode($orders1);
}
/*.........................................................  Fetch Payment Data For Populata table for particular Id  .....................................*/
function FetchPaymentData($id)
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	$orders = array();
	pg_prepare($link,'sql','SELECT * from w_splitpaymain where bus_id=$1');
	$result = pg_execute($link,'sql',array($id));

  $spiltform = array();
if(pg_num_rows($result) > 0)
{
		while($row = pg_fetch_array($result)){
			unset($makepayment);
			$makepayment->id = $row['id'];
			$makepayment->splitcase = $row['splitcase'];
			$makepayment->com_per = $row['com_per'];
			$makepayment->com_rate = $row['com_rate'];
			$makepayment->tax = $row['tax'];
			$makepayment->applytax = $row['applytax'];
			$makepayment->citytax = $row['citytax'];
			$makepayment->custom = $row['custom'];
			$makepayment->paymail = $row['paymail'];
			$makepayment->payadaptivemail = $row['payadaptivemail'];
			
			array_push($spiltform,$makepayment);
		}


echo json_encode($spiltform);

}
else
{
	echo 0;
}

}

function GetAllRestData()
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sql31','SELECT * from w_business WHERE enabled=$1	');
	$result = pg_execute($link,'sql31',array('TRUE'));

	$returants = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($returant);
		$returant->id = $row['id'];
		$returant->caption = $row['name'];
		array_push($returants,$returant);
		}
		
		

	return $returants;
}
/*.........................................................  Fetch Invoice Data For Select Dropdown ...................................................*/
function FetchInvoiceData($id)
{
	//SuperAdminsOnly();
	$link = ConnectDB();
	
	pg_prepare($link,'sql31','SELECT * from w_invoice WHERE businessi=$1	');
	$result = pg_execute($link,'sql31',array($id));

	$maininvoices = array();
	
	while($row = pg_fetch_array($result))
		{
		unset($invoice);
		$invoice->id = $row['id'];
		$invoice->caption = $row['id'];
		
		array_push($maininvoices,$invoice);
		}
		
		

	echo  json_encode($maininvoices);
}
/*..............................................................Fetch Invoice Data All.........................................................*/
function FetchInvoiceDataAll($id){
		
	//SuperAdminsOnly();
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	pg_prepare($link,'sql','SELECT * FROM w_invoice WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  {
		$row = pg_fetch_array($result);
		unset($ad);
		$ad->invoice_id = $row['id'];
		$ad->invoicepay = $row['invoicepay'];
		$ad->businessi = $row['businessi'];
			
		
	
		echo json_encode($ad);
	}
}



/*..............................................................Save Make Payment.........................................................*/

function SaveMakePayment($data){
	//SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB();
	$form = parse($data);
	//print_r($form);
	$invid = $form->fields->invoice_id->value;
	$payment = $form->fields->payment->value;
	$payment =round($payment, $_SESSION['decimal_value']); 

	
	pg_prepare($link,'sql','SELECT * FROM w_makepayment WHERE invoice_id=$1');
	$result = pg_execute($link,'sql',array($invid));
	$rows=pg_fetch_array($result);
	$businessir=$rows['bus_id'];
	if (pg_num_rows($result)== 1)  {
		$due=$rows['pdue'];
			if($due<$payment){
				echo "cancel";	
				exit;
			}
		
		$pdue=$due - $payment;
		$pdue =round($pdue, $_SESSION['decimal_value']); 
		$cureentdate= date('Y-m-d H:i:s');
		pg_prepare($link,'sqlline','SELECT * FROM w_makepayment ORDER BY id DESC');
		$fetch_line = pg_execute($link,'sqlline',array());
		 if(pg_num_rows($fetch_line) == 0) { 
		  $incheck = 1;
		 } else { 
		  $all_rec= pg_fetch_array($fetch_line);
		  $incheckpre= $all_rec['id'];
		  $incheck = $incheckpre + 1;
		}
		pg_prepare($link,'sql1','SELECT * FROM w_invoice WHERE id=$1');
		$result1 = pg_execute($link,'sql1',array($invid));
		$row=pg_fetch_array($result1);
		$invoicepay=$row['invoicepay'];
		$businessi=$row['businessi'];
		$businessir=$row['businessi'];
		$totalorder=$row['totalorder'];
		/*$pay=$payment ;*/
/*		pg_prepare($link,'sql2','update w_makepayment set pdue=$2,date=$3,payment=$4 where invoice_id=$1');
		$fetch_insert = pg_execute($link,'sql2',array($invid,$pdue,$cureentdate,$pay));	*/
		pg_prepare($link,'sql2','INSERT INTO w_makepayment(id,bus_id,invoice_id,invoicepay,total_invoiceitem,payment,pdue,date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');
		 $fetch_insert = pg_execute($link,'sql2',array($incheck,$businessi,$invid,$invoicepay,$totalorder,$payment,$pdue,$cureentdate));
		
		pg_prepare($link,'sqlf','select invoicepay,payment from w_makepayment where invoice_id=$1');
		$resultf = pg_execute($link,'sqlf',array($invid));	
		$rowf=pg_fetch_array($resultf);
		if($rowf['invoicepay'] == $rowf['payment'] ){
			pg_prepare($link,'sqlu','update w_invoice set status=1 where id=$1');
			$fetch_insertu = pg_execute($link,'sqlu',array($invid));		
		} 
		
		
	}else{
		pg_prepare($link,'sqlline','SELECT * FROM w_makepayment ORDER BY id DESC');
		$fetch_line = pg_execute($link,'sqlline',array());
		 if(pg_num_rows($fetch_line) == 0) { 
		  $incheck = 1;
		 } else { 
		  $all_rec= pg_fetch_array($fetch_line);
		  $incheckpre= $all_rec['id'];
		  $incheck = $incheckpre + 1;
		}
		
		
		pg_prepare($link,'sql1','SELECT * FROM w_invoice WHERE id=$1');
		$result1 = pg_execute($link,'sql1',array($invid));
		$row=pg_fetch_array($result1);
		$invoicepay=$row['invoicepay'];
		$businessi=$row['businessi'];
		$businessir=$row['businessi'];
		$totalorder=$row['totalorder'];
		if($invoicepay<$payment){
				echo "cancel";	
				exit;
			}
		$pdue = $invoicepay - $payment;
		$pdue =round($pdue, $_SESSION['decimal_value']); 
		 $cureentdate= date('Y-m-d H:i:s');
		 pg_prepare($link,'sql2','INSERT INTO w_makepayment(id,bus_id,invoice_id,invoicepay,total_invoiceitem,payment,pdue,date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');
		 $fetch_insert = pg_execute($link,'sql2',array($incheck,$businessi,$invid,$invoicepay,$totalorder,$payment,$pdue,$cureentdate));
						
		pg_prepare($link,'sqlf','select invoicepay,payment from w_makepayment where invoice_id=$1');
		$resultf = pg_execute($link,'sqlf',array($invid));	
		$rowf=pg_fetch_array($resultf);
		if($rowf['invoicepay'] == $rowf['payment'] ){
			pg_prepare($link,'sqlu','update w_invoice set status=1 where id=$1');
			$fetch_insertu = pg_execute($link,'sqlu',array($invid));		
		} 
		
	}
	echo $businessir;
	
}
function FetchAllOrdersDataE($filters,$withbusiness)
	{
	//ProvidersOnly();
	$link = ConnectDB();		
	$conditionalsvalues = array(500);
	$query = 'SELECT w_invoice.id,w_invoice.date,w_invoice.city,w_invoice.invoicepay,w_invoice.businessi,w_invoice.resturant,w_invoice.status,w_invoice.total_invoice,w_invoice.dfrm,w_invoice.tfrm FROM w_invoice ORDER BY id DESC limit $1';

	if (!empty($filters))	
		{
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}

	if ($_SESSION['user']->level=='1')//get all franchises from which the admin is admin
		{
		$citys = array();
		pg_prepare($link,'sql','SELECT id FROM w_franchises WHERE admin=$1');
		$result = pg_execute($link,'sql',array($_SESSION['user']->id));
		while($row = pg_fetch_array($result))
			{
			array_push($citys,$row['id']);
			}
		}
		else
		if ($_SESSION['user']->level=='2')//get all business that the providers owns
			{
			$businesss = array();
			pg_prepare($link,'sql','SELECT id FROM w_business WHERE provider=$1');
			$result = pg_execute($link,'sql',array($_SESSION['user']->id));
			while($row = pg_fetch_array($result))
				{
				array_push($businesss,$row['id']);
				}
			}


	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',$conditionalsvalues);
	$orders = array();
     pg_prepare($link,'sql45','SELECT * from w_franchises WHERE id=$1');
	while($row = pg_fetch_array($result))
		{
		
		$data = parse($row['data']);

		$continue = false;
		//if ($_SESSION['user']->level=='0')
			$continue = true;
			/*else
			{
			if ($_SESSION['user']->level=='1')
				{
				foreach ($citys as $city)
					if ($city==$data->buyer->city)
						{
						$continue = true;
						break;
						}
				}
				else
				if ($_SESSION['user']->level=='2')
					{
					foreach ($businesss as $business)
						foreach ($data->business as $databusiness)
							if ($databusiness->id==$business)
								$continue = true;
					}
				

			}
*/
		if ($continue==true)
			{
			unset($order);
	        $resultcity = pg_execute($link,'sql45',array($row['city']));
			$cityData = pg_fetch_array($resultcity);
	
			$order->id = $row['id'];
			//$date = explode(':',$row['date']);
			//$order->date = $date[0] . ':' . $date[1];
			$order->date = $row['date'];
			unset($city);
			$city->id =$row['city'];
			$city->name = $cityData['city'];
			$order->city = $city;
		   
			$order->resturant = $row['resturant'];
			$order->tinvoice = $row['total_invoice'];
			$order->invoicepay = $row['invoicepay'];
			$order->businessi = $row['businessi'];
			$order->datefrom = $row['dfrm'];
			$order->dateto = $row['tfrm'];
			$order->period = $order->datefrom . ':' . $order->dateto;
			
			if (!empty($withbusiness))
				{
				$businesss = array();
				foreach ($data->business as $business)
					{
					unset($bdata);
					$bdata->id = $business->id;
					$bdata->name = $business->name;
					array_push($businesss,$bdata);
					}
				$order->business = $businesss;
				}
			$order->status = $row['status'];
			switch ($order->status)
			{
				case '0':
					$order->statustext  = $lang_resource['INVOICE_PENDING_PAYMENT_TO_OOS'];
					
				break;
				case '1':
					$order->statustext = $lang_resource['INVOICE_PENDING_PAYMENT_TO']." $resturant";
					
				break;
				case '2':
					$order->statustext = $lang_resource['INVOICE_PAID_TO_OOS'];
					
				break;
				case '3':
					$order->statustext = $lang_resource['INVOICE_PAID_TO']." $resturant";
					
				break;
				case '4':
					$order->statustext = $lang_resource['INVOICE_CANCELED'];
					
				break;
		
			}
			
			array_push($orders,$order);
			}
		}

	echo json_encode($orders);
	pg_close($link);
	}




function SavePay($data)
	{
	require('../config.php');
	$form = parse($data);
	$bus_id = $form->bus_id;
	$form->fields->bus_id->value = $bus_id;
	
	$form->fields->usr->value = $_SESSION['user']->id;

	//echo $bus_id ;exit;
	
	if ($form->type=='create')
	{
		
		InsertQuery('w_splitpaymain',$form->fields,$CFG);	
		
	}
		else
		{
		$query = 'UPDATE w_splitpaymain SET ';
	$count = 0;
	$values = array();
	$fields = $form->fields;
	
	
	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		echo $field->id;
		if ($field->value!='null')
			{
			if ($count>0)
				$query .=  ','. key($fields) . '=$' . ($count+1);
				else
				$query .=  key($fields) . '=$' . ($count+1);

			if ($field->value=='realnull')//if this means we need to really save it as null
				array_push($values,null);
				else
				array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}	

	//array_push($values,$bus_id);
	
	
	$link = ConnectDB($CFG);
	
	/*echo $query . ' WHERE bus_id='.$bus_id;
	print_r($values); */
	
	pg_prepare($link,'sql',$query . ' WHERE bus_id='.$bus_id);
	$result = pg_execute($link,'sql',$values);
	pg_close($link);
		}


	}
?>


