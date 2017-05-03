<?php
/*
'**********************************************************************
' D I S C L A I M E R
' WARNING: ANY USE BY YOU OF THE SAMPLE CODE PROVIDED IS AT YOUR OWN RISK.
' Transactium © provides this code "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and/or fitness for a particular purpose.
' DO NOT MODIFY ANYTHING WITHIN THIS FILE
'**********************************************************************
*/
?>

<?php
	class CTransactiumHPP
	{
		var $soap;
		function CTransactiumHPP($username,$password)
		{
			$ns='http://transactium.com/HPP/';
			$this->soap=new SoapClient(HPSURL ,array('trace' => 1));
			//$this->soap=new SoapClient(HPSURL);
			$this->soap->__setSoapHeaders(new SOAPHeader($ns,'HPSAuthHeader',array('Username'=>$username,'Password'=>$password)));
		}

		function GetHostedPayment($HPSID)
		{
			return $this->soap->GetHostedPayment(array("HPSID"=>$HPSID));
		}

		function CreateHostedPayment($paramarr)
		{
			$ns='http://transactium.com/HPP/';
			return $this->soap->CreateHostedPayment(array('Request'=>new SoapVar($paramarr,SOAP_ENC_OBJECT,'HPPCreateRequest',$ns)));
		}
	}
  
	/// <summary>
	/// The TransactionData class is an object representing a payment record in the Merchant Database.
	/// Apart from representing a payment record, it also has specialised helper functions to manage locking, creation, querying and updating of transactions.
	///
	/// A method TransactionProcess is also implemented, meant to be extended by the Merchant to handle the final transaction states appropriately
	///
	/// Whilst the below works, it is not meant to be used on production as it is not scalable to support multiple web-servers and/or multiple instances of the site.
	/// Also the below does not stare anything into database, making all TransactionData lost on each web application recycle / restart
	/// </summary>
	class TransactionData
	{
		public static function now()
		{
			return new DateTime("now",new DateTimeZone('Europe/Malta'));
		}
	}
?>
