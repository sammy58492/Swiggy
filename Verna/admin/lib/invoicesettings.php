<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
	
switch ($_POST['f']){

	case 'FetchBusinessInvoiceDataByID':
			FetchBusinessInvoiceDataByID($_POST['id']);
	break;
	case 'statusAddress':
		statusAddress($_POST['id'],$_POST['status']);
	break;	
	case 'FetchPayByForm':
		FetchPayByForm($_POST['id']);
	break;
	case 'SaveInvoice':
		Save($_POST['data']);
	break;

	
	

	default:
		die();
	break;
}
function FetchBusinessInvoiceDataByID($id){
	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->vatregistration = $row['vatregistration'];
	$business->sameadd = $row['sameadd'];
	$business->invoiceaddress = $row['invoiceaddress'];
	$business->vatemail = $row['vatemail'];
	$business->payby = $row['payby'];

	$business->billingfxprice = $row['billingfxprice'];
	$business->billingperorder = $row['billingperorder'];
	$business->billingperorderfixrate = $row['billingperorderfixrate'];
	$business->autoinvoiceday = $row['autoinvoiceday'];
	$business->promotion = $row['promotion'];
	$business->fixedrate = $row['fixedrate'];
	$business->otherrate = $row['otherrate'];
	$business->vat = $row['vat'];

	echo json_encode($business);	
}
function statusAddress($id,$status){

	$link = ConnectDB();
	
	$sql = 'UPDATE w_business SET sameadd=$1 where id=$2';	

	pg_prepare($link,'sql',$sql);
	$result = pg_execute($link,'sql',array($status,$id));
	if($result){
		pg_prepare($link,'sql1','SELECT * FROM w_business WHERE id=$1');
		$result1 = pg_execute($link,'sql1',array($id));
		$row=pg_fetch_array($result1);
		if($row['sameadd'] =='t')
			$business->address = $row['street'].' , '.$row['colony'];
		else
			$business->address = $row['invoiceaddress'];


		echo json_encode($business);		

	}
	
}

function FetchPayByForm($id){

	$link = ConnectDB();

	pg_prepare($link,'sql','SELECT * FROM w_business WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));
	$row = pg_fetch_array($result);
	$business = new stdClass();
	$business->id = $row['id'];
	$business->bankname = $row['bankname'];
	$business->bankac = $row['bankac'];
	$business->routineno = $row['routineno'];
	$business->swiftcode = $row['swiftcode'];

	$business->vatpaypalemail = $row['vatpaypalemail'];

	echo json_encode($business);	
}

function Save($data){

	$form = parse($data);
	$id = $form->id;
	
	if ($form->type=='create')
		{
		$id = InsertQuery('w_business',$form->fields);	
		echo $id;
		}
		else
		UpdateQuery('w_business',$form->fields,$form->id);

}
?>
