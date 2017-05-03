<?php 
session_start();
	 global $lang_resource;
function GetLangFile()
{
	
	//$lang_file = 'lang.'.$lang.'.php';
	//return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
	require('../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['l'] = $row1['id'];
	}


	pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_static');
    $result = pg_execute($link,'sqlfetchlang',array());
 
	  while($row = pg_fetch_array($result)){
		 
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	  }
	  return $lang_resource;
	  pg_close($link);
}

$lang_resource = GetLangFile();
require('../../config.php');
	$id=$_REQUEST['id'];
	$siteFrom=$_REQUEST['siteFrom'];
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);

	pg_prepare($link,'sqlipn0','SELECT * FROM w_orders WHERE id = $1;');
	$search = pg_execute($link,'sqlipn0',array($id));
	$fetchData = pg_fetch_array($search);

	 $data=json_decode($fetchData['data']);
	 
	 $bid=$data->business[0]->id;
	 $buyeremail= $data->buyer->email;
	$buyerfname = $data->buyer->firstname;
	$buyerlname = $data->buyer->lastname;
	$cardno = $data->buyer->cardno;
	$exdmm = $data->buyer->expmm;
	$exdyy = $data->buyer->expyy;
	$cvv2 = $data->buyer->cvv2;
	$exp = $exdmm.$exdyy;
	$address = $data->buyer->street;
	$zip = $data->buyer->zip;
	$state = $data->buyer->state;
	$countryname = $data->buyer->countryname;
	$cityname = $data->buyer->cityname;
	//$total=round($data->Total);
	
	 if($data->total)
	 $total=$data->total;
	 if($data->Total)
	 $total=$data->Total;
	 
	 $WebAddress="http://".$_SERVER['HTTP_HOST'];
	 
	 /**************/
	 pg_prepare($link,'sqlpayment'.$id,'SELECT * FROM w_configs where name=$1');
	$result2 = pg_execute($link,'sqlpayment'.$id,array('panelsetting'));
	$row2 = pg_fetch_array($result2);
	$panelsetting = $row2['value'];
	 
	  pg_prepare($link,'sqlipn1','SELECT * FROM w_business WHERE id = $1;');
	  $search1 = pg_execute($link,'sqlipn1',array($bid));
	  $fetchData1 = pg_fetch_array($search1);
	
	if($panelsetting == 1){	 
	$payment_type = $fetchData1['payment_type'];
	$tkey = $fetchData1['tkey'];
	$aplid = $fetchData1['aplid'];
	}else{	
	if($fetchData1['payment_type'] =="" || $fetchData1['tkey'] =="" || $fetchData1['aplid'] ==""){
			$all = "-1";
			pg_prepare($link,'sql2payall','SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			
			pg_prepare($link,'sql2pay'.$bid,'SELECT * FROM w_paymentgateway_details WHERE business_id=$1 and paymentgateway_id=$2');
			$result2 = pg_execute($link,'sql2pay'.$bid,array($bid,5));
			if(pg_num_rows($result2)>0){
			
			$row = pg_fetch_array($result2);		
			$credential = json_decode($row['credential']);
			$flag=true;
			foreach($credential as $cre){
				if($cre->paymentfield =='payment_type'){
					$payment_type = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='transactionkey'){
					$tkey = $cre->value;
					$flag=false;
				}
				if($cre->paymentfield =='apiloginid'){
					$aplid = $cre->value;
					$flag=false;
				}				
			}
			
			if($flag==true){
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,5));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='payment_type'){
					$payment_type = $creall->value;
				}
				if($creall->paymentfield =='transactionkey'){
					$tkey = $creall->value;
				}
				if($creall->paymentfield =='apiloginid'){
					$aplid = $creall->value;
				}
							
				
			}
			}
		
			}else{
				//all
				$result3 = pg_execute($link,'sql2payall',array($all,5));
				$row2 = pg_fetch_array($result3);			
				$credentialall = json_decode($row2['credential']);
				foreach($credentialall as $creall){
				if($creall->paymentfield =='payment_type'){
					$payment_type = $creall->value;
				}
				if($creall->paymentfield =='transactionkey'){
					$tkey = $creall->value;
				}
				if($creall->paymentfield =='apiloginid'){
					$aplid = $creall->value;
				}
							
				
			}
				
		}
		
		
		
		
		}else{
			$payment_type = $fetchData1['payment_type'];
			$tkey = $fetchData1['tkey'];
			$aplid = $fetchData1['aplid'];
		}
	}

 //echo "Payment Processing................................";


?>
<!--
This sample code is designed to connect to Authorize.net using the AIM method.
For API documentation or additional sample code, please visit:
http://developer.authorize.net
-->

<html>
    <head>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>

<script type="text/javascript">
jQuery(document).ready(function($) {
// site preloader -- also uncomment the div in the header and the css style for #preloader
$(window).load(function(){
$('#preloader').fadeOut('slow',function(){$(this).remove();});
});

});
</script>



<style>
#preloader {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	overflow: visible;
	background: rgba(255,255,255,0.7) url(../../../images/loadingpaypal.gif) no-repeat center center;
}
h3{
	position:absolute;
	bottom:100px;
	width:100%;
	text-align:center;
	color:red;
	z-index: 999;
	font-family: 'Open Sans', sans-serif;
}

</style>
  
    </head>
   
   <body >
  	 <div id="preloader"></div>

	<h3><?=$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT']?></h3>




</body>
</html>
<?PHP

// By default, this sample code is designed to post to our test server for
// developer accounts: https://test.authorize.net/gateway/transact.dll
// for real accounts (even in test mode), please make sure that you are
// posting to: https://secure.authorize.net/gateway/transact.dll
//$post_url = "https://test.authorize.net/gateway/transact.dll";

if($payment_type == 1){
$post_url = "https://secure.authorize.net/gateway/transact.dll";
}
if($payment_type == 0){
$post_url = "https://test.authorize.net/gateway/transact.dll";
}

//echo $total;



$post_values = array(
	
	// the API Login ID and Transaction Key must be replaced with valid values
	/*"x_login"			=> "8MpSq558",
	"x_tran_key"		=> "7m36F49fck27MTES",*/
	"x_login"			=> $aplid,
	"x_tran_key"		=> $tkey,

	"x_version"			=> "3.1",
	"x_delim_data"		=> "TRUE",
	"x_delim_char"		=> "|",
	"x_relay_response"	=> "FALSE",

	"x_type"			=> "AUTH_CAPTURE",
	"x_method"			=> "CC",
	//"x_card_num"		=> "4111111111111111",
	//"x_exp_date"		=> "0115",
	
	"x_card_num"		=> $cardno,
	"x_exp_date"		=>  $exp,
	"x_card_code"		=>  $cvv2,

	//"x_amount"			=> "10.99",
	//"x_description"		=> "Sample Transaction",
	
	"x_amount"			=> $total,
	"x_totalGrand"			=> $total,
	
	//"x_description"		=> "Sample Transaction",

	/*"x_first_name"		=> "Cris",
	"x_last_name"		=> "Smith",
	"x_address"			=> "1234 Street",
	"x_state"			=> "WA",
	"x_zip"				=> "98004"*/
	
	/*"x_first_name"		=> $buyername,
	"x_last_name"		=> "",
	"x_address"			=> $address,
	"x_state"			=> $state,
	"x_zip"				=> $postcode*/
	"x_first_name"		=> $buyerfname,
	"x_last_name"		=> $buyerlname,
	"x_address"			=> $address,
	"x_city"			=> $cityname,
	"x_state"			=> $state,
	"x_country"			=> $countryname,
	"x_zip"				=> $zip,
	"x_email"			=> $buyeremail


	// Additional fields can be added here as outlined in the AIM integration
	// guide at: http://developer.authorize.net
);
//print_r($post_values);

/*exit;*/

// This section takes the input fields and converts them to the proper format
// for an http post.  For example: "x_login=username&x_tran_key=a1B2c3D4"
$post_string = "";
foreach( $post_values as $key => $value )
	{ $post_string .= "$key=" . urlencode( $value ) . "&"; }
$post_string = rtrim( $post_string, "& " );

// The following section provides an example of how to add line item details to
// the post string.  Because line items may consist of multiple values with the
// same key/name, they cannot be simply added into the above array.
//
// This section is commented out by default.
/*
$line_items = array(
	"item1<|>golf balls<|><|>2<|>18.95<|>Y",
	"item2<|>golf bag<|>Wilson golf carry bag, red<|>1<|>39.99<|>Y",
	"item3<|>book<|>Golf for Dummies<|>1<|>21.99<|>Y");
	
foreach( $line_items as $value )
	{ $post_string .= "&x_line_item=" . urlencode( $value ); }
*/

// This sample code uses the CURL library for php to establish a connection,
// submit the post, and record the response.
// If you receive an error, you may want to ensure that you have the curl
// library enabled in your php configuration
$request = curl_init($post_url); // initiate curl object
	curl_setopt($request, CURLOPT_HEADER, 0); // set to 0 to eliminate header info from response
	curl_setopt($request, CURLOPT_RETURNTRANSFER, 1); // Returns response data instead of TRUE(1)
	curl_setopt($request, CURLOPT_POSTFIELDS, $post_string); // use HTTP POST to send form data
	curl_setopt($request, CURLOPT_SSL_VERIFYPEER, FALSE); // uncomment this line if you get no gateway response.
	$post_response = curl_exec($request); // execute curl post and store results in $post_response
	// additional options may be required depending upon your server configuration
	// you can find documentation on curl options at http://www.php.net/curl_setopt
curl_close ($request); // close curl object

// This line takes the response and breaks it into an array using the specified delimiting character
$response_array = explode($post_values["x_delim_char"],$post_response);

// The results are output to the screen in the form of an html numbered list.
/*print_r($response_array);*/




$txtcode = $response_array[4];
$txtstate = $response_array[3];
$cardN = $response_array[50];

if($response_array[2]!=1){
	echo '<script>alert("Transaction Failed ('.$response_array[3].') ")</script>';
	echo "<script>window.location='".$WebAddress."'</script>";
}else{

pg_prepare($link,'sqlu','UPDATE w_orders SET a_trnx_code=$1, a_trnx_statement=$2 WHERE id=$3');
pg_execute($link,'sqlu',array($txtcode,$txtstate,$id));
echo "<script>window.location='".$WebAddress."/panel/payment-gateway/authorizenet/authorizenet_return.php?id=$id&cardN=$cardN'</script>";
}



// individual elements of the array could be accessed to read certain response
// fields.  For example, response_array[0] would return the Response Code,
// response_array[2] would return the Response Reason Code.
// for a list of response fields, please review the AIM Implementation Guide
?>
