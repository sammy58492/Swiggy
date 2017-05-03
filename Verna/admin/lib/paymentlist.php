<?php 
function PaymentFetch($id,$link){
	/*$id = 11;
	$link = ConnectDB();*/

	pg_prepare($link,'sqlpaymentconfig'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpaymentconfig'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];

	pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_business where id=$1');
	$result = pg_execute($link,'sqlpayment'.$id,array($id));
	$businesspaymentdetails = array();	
	$row = pg_fetch_array($result);
	
	if($panelsetting == 1){
		$paymentdetails = array();		
		if($row['acceptcash'] == 't'){
			$paymentdetails['cash'] = 't';		
		}else{
			$paymentdetails['cash'] = 'f';
		}
		if($row['acceptcard'] == 't'){
			$paymentdetails['card'] = 't';
		}else{
			$paymentdetails['card'] = 'f';
		}
		if($row['paypal'] != ""){
			$paymentdetails['paypal'] = 't';
		}else{
			$paymentdetails['paypal'] = 'f';
		}
		
		$paypaladaptive = 'SELECT * from w_splitpaymain WHERE  bus_id=$1';
		pg_prepare($link,'sqlpa1'.$id,$paypaladaptive);
		$parecord = pg_execute($link,'sqlpa1'.$id,array($id));		
		$rowpa = pg_fetch_array($parecord);
		if($rowpa['splitcase'] == 1 || $rowpa['splitcase'] == 2){
			$paymentdetails['paypaladaptive'] = 't';
		}else{
			$paymentdetails['paypaladaptive'] = 'f';
		}

		if($row['apiloginid'] != "" || $row['transactionkey'] != ""){
			$paymentdetails['authorize'] = 't';
		}else{
			$paymentdetails['authorize'] = 'f';
		}
		if($row['merchant_id'] != "" || $row['public_key'] != "" || $row['private_key'] != ""){
			$paymentdetails['braintree'] = 't';
		}else{
			$paymentdetails['braintree'] = 'f';
		}
		if($row['mercury_id'] != "" || $row['mercury_pass'] != ""){
			$paymentdetails['mercury'] = 't';
		}else{
			$paymentdetails['mercury'] = 'f';
		}
		if($row['cardsaveid'] != "" || $row['cardsavepass'] != ""){
			$paymentdetails['worldpay'] = 't';
		}else{
			$paymentdetails['worldpay'] = 'f';
		}

		if($row['clientkey'] != "" || $row['secretkey'] != ""){
			$paymentdetails['mercadopago'] = 't';
		}else{
			$paymentdetails['mercadopago'] = 'f';
		}
		
		if($row['transactiumusername'] != "" || $row['transactiumpass'] != "" || $row['transactiumtag'] != ""){
			$paymentdetails['transactium'] = 't';
		}else{
			$paymentdetails['transactium'] = 'f';
		}
		
		if($row['pexpressusername'] != "" || $row['pexpresspass'] != ""){
			$paymentdetails['pexpress'] = 't';
		}else{
			$paymentdetails['pexpress'] = 'f';
		}
		
		if($row['maksekeskus_pay'] != "" || $row['maksekeskus_shopid'] != "" || $row['maksekeskus_secretkey'] != ""){
			$paymentdetails['maksekeskus'] = 't';
		}else{
			$paymentdetails['maksekeskus'] = 'f';
		}
		
		if($row['vogue_pay'] != "" || $row['vogue_merchant_id'] != ""){
			$paymentdetails['voguepay'] = 't';
		}else{
			$paymentdetails['voguepay'] = 'f';
		}
		
		if($row['skrillemail'] != ""){
			$paymentdetails['skrill'] = 't';
		}else{
			$paymentdetails['skrill'] = 'f';
		}
		
	}else{

		$businesspaymentdetails['cash'] = $row['acceptcash'];				
		$businesspaymentdetails['card'] = $row['acceptcard'];	
		$businesspaymentdetails['paypal'] = $row['acceptpaypal'];	
		$businesspaymentdetails['paypaladaptive'] = $row['acceptpaypaladaptive'];	
		$businesspaymentdetails['authorize'] = $row['acceptauthorize'];
		$businesspaymentdetails['braintree'] = $row['acceptbraintree'];
		$businesspaymentdetails['mercury'] = $row['acceptmercury'];
		$businesspaymentdetails['worldpay'] = $row['acceptworldpay'];
		$businesspaymentdetails['mercadopago'] = $row['acceptmarco'];
		$businesspaymentdetails['transactium'] = $row['accepttransactium'];
		$businesspaymentdetails['pexpress'] = $row['acceptpexpress'];
		$businesspaymentdetails['maksekeskus'] = $row['acceptmaksekeskus'];	
		$businesspaymentdetails['voguepay'] = $row['acceptvoguepay'];
		$businesspaymentdetails['skrill'] = $row['acceptskrill'];
		$businesspaymentdetails['payeezy'] = $row['acceptpayeezy'];			
		
		/*Fetch all Value by All*/
		$all = array();
		$allbid="-1";
		pg_prepare($link,'sqla'.$id,'SELECT DISTINCT * FROM w_paymentgateway_details where business_id=$1 order by paymentgateway_id asc');
		$result = pg_execute($link,'sqla'.$id,array($allbid));		
		while($row = pg_fetch_array($result)){
			if($row['enabled'] == 1){
				$all[$row['paymentgateway_id']]['id']=$row['paymentgateway_id'];
				$all[$row['paymentgateway_id']]['enabled']=$row['enabled'];
				$all[$row['paymentgateway_id']]['credential']=$row['credential'];				
			}
		}

		/*echo "<pre>";
		print_r($all);*/
		
		/*Fetch all Value by business id*/
		$payment=array();
		pg_prepare($link,'sqlpayment2a'.$id,'SELECT DISTINCT * FROM w_paymentgateway_details where business_id=$1 order by paymentgateway_id asc');
		$result1 = pg_execute($link,'sqlpayment2a'.$id,array($id));
		
		while($row1 = pg_fetch_array($result1)){			
			if($row1['enabled'] == 1){
				$payment[$row1['paymentgateway_id']]['id']=$row1['paymentgateway_id'];
				$payment[$row1['paymentgateway_id']]['enabled']=$row1['enabled'];
				$payment[$row1['paymentgateway_id']]['credential']=$row1['credential'];				
			}
		}

		/*echo "<pre>";
		print_r($payment);*/
		
			
			
		$superadminpaymentdetails = array();
		
		if($all==NULL){
			$paymentdatalist=$payment;	
		}elseif($payment==NULL){
			$paymentdatalist=$all;		
		}else{
			
			pg_prepare($link,'sqlpaymenttotalp'.$id,'SELECT DISTINCT * FROM w_paymentgateway order by id asc');
			$result2 = pg_execute($link,'sqlpaymenttotalp'.$id,array());
			$row22 = pg_num_rows($result2);
			$paymentcount = $row22;	//Here denotes How many payment gateway available	
			for($i=1;$i<=$paymentcount;$i++){ 
				if($payment[$i] && $all[$i]){
					$paymentdatalist[$i] = $payment[$i];
				}else if($payment[$i]){
					$paymentdatalist[$i] = $payment[$i];
				}else if($all[$i]){
					$paymentdatalist[$i] = $all[$i];
				}
			}			
		}



		/*echo "<pre>";
		print_r($paymentdatalist);
		echo($paymentdatalist[$i]['enabled']);*/


		/*Fetch */
		pg_prepare($link,'sqlpaymentsuper'.$id,'SELECT * FROM w_paymentgateway');
		$result2 = pg_execute($link,'sqlpaymentsuper'.$id,array());
		while($row2 = pg_fetch_array($result2)){			
			switch ($row2['id']){

				case 1:					
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['cash'] = 't';
					else
						$superadminpaymentdetails['cash'] = 'f';
					break;

				case 2:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['card'] = 't';
					else
						$superadminpaymentdetails['card'] = 'f';
					break;
				case 3:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['paypal'] = 't';
					else
						$superadminpaymentdetails['paypal'] = 'f';
					break;
				case 4:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['paypaladaptive'] = 't';
					else
						$superadminpaymentdetails['paypaladaptive'] = 'f';
					break;
				case 5:
					if($paymentdatalist[$row2['id']]['enabled']== 1)
						$superadminpaymentdetails['authorize'] = 't';
					else
						$superadminpaymentdetails['authorize'] = 'f';
					break;
				case 6:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['braintree'] = 't';
					else
						$superadminpaymentdetails['braintree'] = 'f';
					break;
				case 7:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['mercury'] = 't';
					else
						$superadminpaymentdetails['mercury'] = 'f';
					break;
				case 8:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['worldpay'] = 't';
					else
						$superadminpaymentdetails['worldpay'] = 'f';
					break;
				case 9:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['mercadopago'] = 't';
					else
						$superadminpaymentdetails['mercadopago'] = 'f';
					break;	
			case 10:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['transactium'] = 't';
					else
						$superadminpaymentdetails['transactium'] = 'f';
					break;
			case 11:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['pexpress'] = 't';
					else
						$superadminpaymentdetails['pexpress'] = 'f';
					break;	
					
			case 12:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['maksekeskus'] = 't';
					else
						$superadminpaymentdetails['maksekeskus'] = 'f';
					break;	
				
			case 13:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['voguepay'] = 't';
					else
						$superadminpaymentdetails['voguepay'] = 'f';
					break;	
			case 14:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['skrill'] = 't';
					else
						$superadminpaymentdetails['skrill'] = 'f';
					break;	
			case 15:
					if($paymentdatalist[$row2['id']]['enabled'] == 1)
						$superadminpaymentdetails['payeezy'] = 't';
					else
						$superadminpaymentdetails['payeezy'] = 'f';
					break;	

			}			
		}

		/*echo "<pre>";
		print_r($superadminpaymentdetails);		
	*/
		pg_prepare($link,'sqlpayment3a'.$id,'SELECT * FROM w_paymentgateway');
		$result2 = pg_execute($link,'sqlpayment3a'.$id,array());
		$paymentdetails = array();
		while($row2 = pg_fetch_array($result2)){
			switch ($row2['id']) {
				case 1:				
					if($superadminpaymentdetails['cash'] == 't' && $businesspaymentdetails['cash'] == 't'){
						$paymentdetails['cash'] = 't';
					}else{
						$paymentdetails['cash'] = 'f';
					}				
					break;
				case 2:
					if($superadminpaymentdetails['card'] == 't' && $businesspaymentdetails['card'] == 't'){
						$paymentdetails['card'] = 't';
					}else{
						$paymentdetails['card'] = 'f';
					}
					break;
				case 3:
					if($superadminpaymentdetails['paypal'] == 't' && $businesspaymentdetails['paypal'] == 't'  && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['paypal'] = 't';
					}else{
						$paymentdetails['paypal'] = 'f';
					}			
					break;
				case 4:
					if($superadminpaymentdetails['paypaladaptive'] == 't' && $businesspaymentdetails['paypaladaptive'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['paypaladaptive'] = 't';
					}else{
						$paymentdetails['paypaladaptive'] = 'f';
					}
					break;
				case 5:
					if($superadminpaymentdetails['authorize'] == 't' && $businesspaymentdetails['authorize'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['authorize'] = 't';
					}else{
						$paymentdetails['authorize'] = 'f';
					}				
					break;
				case 6:
					if($superadminpaymentdetails['braintree'] == 't' && $businesspaymentdetails['braintree'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['braintree'] = 't';
					}else{
						$paymentdetails['braintree'] = 'f';
					}				
					break;
				case 7:
					if($superadminpaymentdetails['mercury'] == 't' && $businesspaymentdetails['mercury'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['mercury'] = 't';
					}else{
						$paymentdetails['mercury'] = 'f';
					}				
					break;
				case 8:
					if($superadminpaymentdetails['worldpay'] == 't' && $businesspaymentdetails['worldpay'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['worldpay'] = 't';
					}else{
						$paymentdetails['worldpay'] = 'f';
					}				
					break;
				case 9:
					if($superadminpaymentdetails['mercadopago'] == 't' && $businesspaymentdetails['mercadopago'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['mercadopago'] = 't';
					}else{
						$paymentdetails['mercadopago'] = 'f';
					}
					break;
				case 10:
					if($superadminpaymentdetails['transactium'] == 't' && $businesspaymentdetails['transactium'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['transactium'] = 't';
					}else{
						$paymentdetails['transactium'] = 'f';
					}
					break;
					
				case 11:
					if($superadminpaymentdetails['pexpress'] == 't' && $businesspaymentdetails['pexpress'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['pexpress'] = 't';
					}else{
						$paymentdetails['pexpress'] = 'f';
					}
					break;
					
				case 12:
					if($superadminpaymentdetails['maksekeskus'] == 't' && $businesspaymentdetails['maksekeskus'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['maksekeskus'] = 't';
					}else{
						$paymentdetails['maksekeskus'] = 'f';
					}
					break;
					
				case 13:
					if($superadminpaymentdetails['voguepay'] == 't' && $businesspaymentdetails['voguepay'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['voguepay'] = 't';
					}else{
						$paymentdetails['voguepay'] = 'f';
					}
					break;
					
				case 14:
					if($superadminpaymentdetails['skrill'] == 't' && $businesspaymentdetails['skrill'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['skrill'] = 't';
					}else{
						$paymentdetails['skrill'] = 'f';
					}
					break;

				case 15:
					if($superadminpaymentdetails['payeezy'] == 't' && $businesspaymentdetails['payeezy'] == 't' && FetchAllPaymentData($id,$row2['id'],$link)== true){
						$paymentdetails['payeezy'] = 't';
					}else{
						$paymentdetails['payeezy'] = 'f';
					}
					break;
				
				
			}
		}

	}
	//echo json_encode($paymentdetails);
	return json_encode($paymentdetails);
}

/*function ConnectDB($CFG = 'empty')
{
if ($CFG=='empty')
	require('../config.php');
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);
if(!$link)
	die('');
	else
	return $link;
}*/


function FetchAllPaymentData($id,$type,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sql2paya'.$type.$id,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1');
	$result2 = pg_execute($link,'sql2paya'.$type.$id,array($id));
	$paymentsettinglist = array();

	while($row2 = pg_fetch_array($result2)){
		
		switch ($row2['paymentgateway_id']){
			
			case 1:							
				$paymentsettinglist['cash'] = '';				
				break;
			case 2:
				$paymentsettinglist['card'] = '';
				break;
			case 3:
				$paymentsettinglist['paypal'] = $row2['credential'];
				break;
			case 4:
				$paymentsettinglist['paypaladaptive'] = $row2['credential'];
				break;
			case 5:
				$paymentsettinglist['authorize'] = $row2['credential'];
				break;
			case 6:
				$paymentsettinglist['braintree'] = $row2['credential'];
				break;
			case 7:
				$paymentsettinglist['mercury'] = $row2['credential'];
				break;
			case 8:
				$paymentsettinglist['worldpay'] = $row2['credential'];
				break;
			case 9:
				$paymentsettinglist['mercadopago'] = $row2['credential'];
				break;
			case 10:
				$paymentsettinglist['transactium'] = $row2['credential'];
				break;
			case 11:
				$paymentsettinglist['pexpress'] = $row2['credential'];
				break;	
			case 12:
				$paymentsettinglist['maksekeskus'] = $row2['credential'];
				break;	
				
			case 13:
				$paymentsettinglist['voguepay'] = $row2['credential'];
				break;
				
			case 14:
				$paymentsettinglist['skrill'] = $row2['credential'];
				break;	
			case 15:
				$paymentsettinglist['payeezy'] = $row2['credential'];
				break;		
		}
	}

	/*print_r($paymentsettinglist);
	echo $type;
	exit;*/
	

	$pay = new stdClass();
	switch($type){
		case 3:
			$pay->response = paypalcredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 4:
			$pay->response = paypaladaptivecredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 5:
			$pay->response = authorizecredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 6:
			$pay->response = braintreecredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 7:
			$pay->response = mercurycredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 8:
			$pay->response = worldpaycredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 9:
			$pay->response = mercadopagocredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 10:
			$pay->response = transactiumcredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 11:
			$pay->response = pexpresscredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 12:
			$pay->response = makeskeskuscredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 13:
			$pay->response = voguepaycredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 14:
			$pay->response = skrillpaycredentialchecking($paymentsettinglist,$id,$link);
		break;
		case 15:
			$pay->response = payeezypaycredentialchecking($paymentsettinglist,$id,$link);
		break;
		
		
		default:
			die();
		break;		
	}
	//echo json_encode($pay->response) . '<br>';
	return $pay->response;
	
}
function checkvalueempty($payentlist){	
	$payentlist = json_decode($payentlist);
	$lengtharray = sizeof($payentlist);
	/*echo "<pre>";
	print_r($payentlist);*/
	$counter = 0;
	if($payentlist !=""){
		foreach($payentlist as $pay){
			//echo $pay->paymentfield . '/';
			//echo $pay->value .'/';
			if($pay->value !=""){
				if($pay->paymentfield =='splitcase'){
					if($pay->value ==1 || $pay->value ==2){
						$counter++;
					}
				}else{
					$counter++;
				}				
			}
		}
	}
	//echo $lengtharray.'/';	
	//echo $counter;
	if($lengtharray == $counter){
		//echo 'true/';
		return true;
	}else{
		//echo 'false/';
		return false;
	}
}
function paypalcredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlpaypal'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlpaypal'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['paypal']);
	if($row['paypal'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}		
	}else{			
		return true;
	}
} 



function paypaladaptivecredentialchecking($paymentsettinglist,$id,$link){
	
	pg_prepare($link,'sqlpaypaladaptive'.$id,'SELECT * FROM w_splitpaymain WHERE bus_id=$1');
	$result2 = pg_execute($link,'sqlpaypaladaptive'.$id,array($id));
	$row = pg_fetch_array($result2);	
	unset($response);
	$response = checkvalueempty($paymentsettinglist['paypaladaptive']);	
	if($row['splitcase'] ==0 || $row['splitcase'] ==""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function authorizecredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlauthorize'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlauthorize'.$id,array($id));
	$row = pg_fetch_array($result2);
	
	unset($response);
	$response = checkvalueempty($paymentsettinglist['authorize']);
	
	if($row['aplid'] == "" && $row['tkey'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{	
		return true;
	}
}

function braintreecredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlbraintree'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlbraintree'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['braintree']);
	if($row['merchant_id'] == "" && $row['public_key'] == "" && $row['private_key'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function mercurycredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlmercury'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlmercury'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['mercury']);
	if($row['mercury_id'] == "" && $row['mercury_pass'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function worldpaycredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlworldpay'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlworldpay'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['worldpay']);
	if($row['cardsavepass'] == "" && $row['cardsaveid'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function mercadopagocredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlmercadopago'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlmercadopago'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['mercadopago']);
	if($row['clientkey'] == "" && $row['secretkey'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function transactiumcredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqltransactium'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqltransactium'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['transactium']);
	if($row['transactiumusername'] == "" && $row['transactiumpass'] == "" && $row['transactiumtag'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}


function pexpresscredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlpexpress'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlpexpress'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['pexpress']);
	if($row['pexpressusername'] == "" && $row['pexpresspass'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function makeskeskuscredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlmakeskeskus'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlmakeskeskus'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['maksekeskus']);
	if($row['maksekeskus_pay'] == "" && $row['maksekeskus_shopid'] == "" && $row['maksekeskus_secretkey'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function voguepaycredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlvoguepay'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlvoguepay'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['voguepay']);
	if($row['vogue_pay'] == "" && $row['vogue_merchant_id'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function skrillpaycredentialchecking($paymentsettinglist,$id,$link){
	
	//$link = ConnectDB();
	pg_prepare($link,'sqlskrill'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlskrill'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['skrill']);
	if($row['skrillemail'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}
}

function payeezypaycredentialchecking($paymentsettinglist,$id,$link){
	pg_prepare($link,'sqlpayeezy'.$id,'SELECT * FROM w_business WHERE id=$1');
	$result2 = pg_execute($link,'sqlpayeezy'.$id,array($id));
	$row = pg_fetch_array($result2);
	unset($response);
	$response = checkvalueempty($paymentsettinglist['payeezy']);
	if($row['payeezyapikey'] == "" && $row['payeezyapisecret'] == "" && $row['payeezyjssecurity'] == "" && $row['payeezymerchant'] == ""){
		if($response == false){			
			return false;
		}else{			
			return true;
		}
	}else{
		return true;
	}	
}





?>
