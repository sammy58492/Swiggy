<?php 
switch ($_POST['f'])
	{
	case 'FindDiscountcode':
		FindDiscountcode($_POST['code'],$_POST['bid'],$_POST['total']);
		break;
	default:
		die();
	break;
	}

/*******************************************GET FRANCHISES DATA**********************************************/


function FindDiscountcode($code,$bid,$total)
{
	
	require('../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;

	$link = pg_connect($string);
	
	pg_prepare($link,'sql3','SELECT hits FROM w_discount WHERE code=$1');
	$result = pg_execute($link,'sql3',array($code));
    $rechit = pg_fetch_array($result);
	
	$expdate = date("Y-m-d");
	pg_prepare($link,'sql4','SELECT * FROM w_discount WHERE code=$1 AND expirydate>=$2 AND maxallow > $3 AND enabled =$4 ');
	$results = pg_execute($link,'sql4',array($code,$expdate,$rechit['hits'],"TRUE"));
    $rec = pg_num_rows($results);
	$recData = pg_fetch_array($results);
	//unset($msg);
	$msg = new stdClass();
	if($total < $recData['minshop'] )
	{
		
		$msg->text = false;
		$msg->notallow = true;
		
	}
	else if($rec == 1)
	{	
	
	     $businessData = json_decode($recData['business']);
			 if(in_array("-1",$businessData))
			 {
			  $recordold = 0;
			$msg->text=true;
			$msg->discountcode = $recData['code'];
			$msg->discounttype = $recData['payby'];
			$msg->discountminshop = $recData['minshop'];
			$msg->discountrate = GetDecimalPoint($recData['commonrate']);
			$recordold = $recData['hits'];
			$dhits = $recordold+1;
			
			pg_prepare($link,'sql5','UPDATE w_discount SET hits=$1  WHERE id=$2');
			pg_execute($link,'sql5',array($dhits,$recData['id']));
			  }
		else if(in_array($bid,$businessData))
		{
			$recordold = 0;
			$msg->text=true;
			$msg->discountcode = $recData['code'];
			$msg->discounttype = $recData['payby'];
			$msg->discountminshop = $recData['minshop'];
			$msg->discountrate = GetDecimalPoint($recData['commonrate']);
			$recordold = $recData['hits'];
			$dhits = $recordold+1;
			
			pg_prepare($link,'sql5','UPDATE w_discount SET hits=$1  WHERE id=$2');
			pg_execute($link,'sql5',array($dhits,$recData['id']));
		}
		else
		{
			$msg->text = false; // business not permittion
			$msg->notallow = false;
		}
	}
		
		else
		{
			$msg->text = false; //code not match
			$msg->notallow = false;
		}
	
	echo json_encode($msg);
}
function GetDecimalPoint($a){	
	
	$nuber_decimal_point = number_format($a,$_SESSION['decimal_value']);
	return $nuber_decimal_point;
	
}
?>
