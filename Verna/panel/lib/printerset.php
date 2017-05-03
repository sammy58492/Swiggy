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
	
	case 'FetchPrinterData':
		FetchPrinterData($_POST['id']);
	break;
	case 'FetchAllPrinterModel':
		FetchAllPrinterModel();
	break;
	case 'SavePrinterData':
		SavePrinterData($_POST['data']);
	break;
	case 'SavePrinterModel':
		SavePrinterModel($_POST['id'],$_POST['printer_model']);
	break;
	default:
		die();
	break;
	}
	
function FetchAllPrinterModel()
{
	$link = ConnectDB();
	pg_prepare($link,'sql3','SELECT * from w_printer_model');
	$result3 = pg_execute($link,'sql3',array());
	
	$allprinter = array();
	
	
	while($row3 = pg_fetch_array($result3))
	{
		unset($printerobj);
		$printerobj->id = $row3['id'];
		$printerobj->model_name = $row3['model_name'];
		array_push($allprinter,$printerobj);
	}


  //return $allprinter;
  echo json_encode($allprinter);	
	
}

function FetchPrinterData($id)
{
	//echo $id;exit;
	$link = ConnectDB();
	$orders = array();
	pg_prepare($link,'sql','SELECT name,value from w_configs');
	$result = pg_execute($link,'sql',array());
	
	pg_prepare($link,'sql2','SELECT * from w_business WHERE id=$1');
	$result2 = pg_execute($link,'sql2',array($id));
	$row2 = pg_fetch_array($result2);
	
	

$spiltform = array();
unset($makept);
while($row = pg_fetch_array($result)){
	if($row["name"]=="apn"){
	$makept->apn = $row['value'];
	}
	if($row["name"]=="sip"){
	$makept->sip = $row['value'];
	}
}
$makept->pfp = $row2['pfp'];
$makept->cfp = $row2['cfp'];
$makept->printer_model = $row2['printer_model'];

array_push($spiltform,$makept);
echo json_encode($spiltform);


}

/*..............................................................Save Make Payment.........................................................*/

function SavePrinterData($data){
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


function SavePrinterModel($id,$model)
{
	
	$link = ConnectDB();
	pg_prepare($link,'sqlyyy','UPDATE w_business SET printer_model = $1 WHERE id = $2');
	
	if(pg_execute($link,'sqlyyy',array($model,$id)))
	{
	   echo "ok";	
	}
	else
	{
	echo "ko";
	}
	
	
}

?>


