<?php
class Mercury_Web_Services_SOAP_Helper
{
	private $wsClient;

	function __construct()
	{
		// Mercury Certification WSDL
		$wsdlURL = "https://w1.mercurydev.net/ws/ws.asmx?WSDL";
		$this->wsClient = new SoapClient($wsdlURL);
	}

	private function array_to_xml(array $arr, SimpleXMLElement &$xml)
	{
		foreach ($arr as $k => $v) 
		{
			is_array($v) ? array_to_xml($v, $xml) : $xml->children()->addChild($k, $v);
		}
	
		return $xml->asXML();
	}
	
	private function array_flat(array $complexArray, array &$flatArray)
	{
		foreach ($complexArray as $key => $value)
		{
			if (is_array($value))
			{
				$flatArray = array_merge($flatArray, $this->array_flat($value, $flatArray));
			}
			else
			{
				$flatArray[$key] = $value;
			}
		}
	
		return $flatArray;
	}
	
	public function credit_transaction(array $requestData, $password)
	{
		$tStream = new SimpleXMLElement('<TStream/>');
		$secondElement = "Transaction";
		
		if (isset($requestData["TranCode"]))
		{
			switch (strtolower($requestData["TranCode"]))
			{
				case "batchsummary":
				case "itemdetail":
				case "batchclear":
				case "batchclose":
				case "serverversion":
				case "keychange":
					$secondElement = "Admin";
					break;
			}
		}
		
		$tStream->addChild($secondElement);
	
		$xmlRequest = $this->array_to_xml($requestData, $tStream);
			
		$clientRequest = array(
				"tran"	=>	$xmlRequest,
				"pw"	=>	$password,
		);
	
		$xmlResponse = $this->wsClient->CreditTransaction($clientRequest)->CreditTransactionResult;
		$complexArray = json_decode(json_encode((array) simplexml_load_string($xmlResponse)),1);
		$flatArray = array();
		$flatArray = $this->array_flat($complexArray, $flatArray);
		return $flatArray;
	}
	
	public function gift_transaction(array $requestData, $password)
	{
		// IpPort required for Gift Transactions
		$requestData["IpPort"] = "9100";
		
		$tStream = new SimpleXMLElement('<TStream/>');
		$tStream->addChild("Transaction");
		
 		$xmlRequest = $this->array_to_xml($requestData, $tStream);
 		
 		$clientRequest = array(
 				"tran"	=>	$xmlRequest,
 				"pw"	=>	$password,
 				); 
		
 		$xmlResponse = $this->wsClient->GiftTransaction($clientRequest)->GiftTransactionResult;
		$complexArray = json_decode(json_encode((array) simplexml_load_string($xmlResponse)),1);
 		$flatArray = array();
 		$flatArray = $this->array_flat($complexArray, $flatArray);
 		return $flatArray;		
	}
}
?>
