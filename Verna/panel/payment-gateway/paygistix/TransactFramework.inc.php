<?php
/* ----------------------------------------------------
' PaygistixTransactClass
' A class to encapsulate all the PaygistiX transaction
' and transactiondetail methods
' ---------------------------------------------------- */
define ( 'RootTransactionURI', 'https://ipn.paygistix.net/SmartPayments/transact.asmx' );
define ( 'RootTransactionNS', 'http://TPISoft.com/SmartPayments/' );

class PaygistixTransactClass {
    /* ----------------------------------------------------
    ' ProcessCreditCard
    ' ---------------------------------------------------- */
	function ProcessCreditCard( $UserName, $Password, $TransType, ProcessCreditCardArgsClass $ArgsObject ) {
		/*
        if ( $ArgsObject is null ) { Err.Raise vbObjectError+1, "ProcessCreditCardSale", "No arguments were specified" }
        if ( $ArgsObject->CardNum="" Then Err.Raise vbObjectError+2, "ProcessCreditCardSale", "Creditcard number must be specificed"
        If ArgsObject.ExpDate="" Then Err.Raise vbObjectError+3, "ProcessCreditCardSale", "Expiration date must be specificed"
        If ArgsObject.Amount=""  Then Err.Raise vbObjectError+4, "ProcessCreditCardSale", "Amount must be specificed"
        */

        /* Parameters need to be passed through to the 'CallWebServiceGet' call as
        ' name value pairs. Building the data as a dictionary allows us to do this
        ' The argument object supplies a ready built dictionary via the 
        ' ToDictionary method. We need to suplement with the UserName and Password 
        ' as additional parameters */
        $DataDictionary = $ArgsObject->ToDictionary();
        $DataDictionary [ 'UserName' ] = $UserName;
        $DataDictionary [ 'Password' ] = $Password;
        $DataDictionary [ 'TransType' ] = $TransType;

        // Call the web server and retrieve the results as a SimpleXML object
        $ResultXML = CallWebService (
        	RootTransactionURI,
			RootTransactionNS,
			'ProcessCreditCard',
			$DataDictionary
		);
        
        // Build the results object
        $ResultObject = new ProcessCreditCardResponseClass();
		switch (MethodType) {
			case 'SOAP': $ResultXML = $ResultXML->ProcessCreditCardResponse->ProcessCreditCardResult; break;
		}
        $ResultObject->XML ( $ResultXML );
        return $ResultObject;
    }
	
	function ProcessCreditCardSale ( $UserName, $Password, $ArgsObject ) {
		/*if ( $ArgsObject is null ) { Err.Raise vbObjectError+1, "ProcessCreditCardSale", "No arguments were specified" };
        if ( $ArgsObject->CardNum="" Then Err.Raise vbObjectError+2, "ProcessCreditCardSale", "Creditcard number must be specified";
        If ArgsObject.ExpDate="" Then Err.Raise vbObjectError+3, "ProcessCreditCardSale", "Expiration date must be specified";
        If ArgsObject.Amount=""  Then Err.Raise vbObjectError+4, "ProcessCreditCardSale", "Amount must be specified";*/
		$PCC = new PaygistixTransactClass();
		return $PCC->ProcessCreditCard( $UserName, $Password, "Sale", $ArgsObject );
	}
	
	function ProcessCreditCardAuth ( $UserName, $Password, $ArgsObject ) {
		/*
		if ( $ArgsObject is null ) { Err.Raise vbObjectError+1, "ProcessCreditCardSale", "No arguments were specified" };
        if ( $ArgsObject->CardNum="" Then Err.Raise vbObjectError+2, "ProcessCreditCardSale", "Creditcard number must be specified";
        If ArgsObject.ExpDate="" Then Err.Raise vbObjectError+3, "ProcessCreditCardSale", "Expiration date must be specified";
        If ArgsObject.Amount=""  Then Err.Raise vbObjectError+4, "ProcessCreditCardSale", "Amount must be specified";
		*/
		
		$PCC = new PaygistixTransactClass();
		return $PCC->ProcessCreditCard( $UserName, $Password, "Auth", $ArgsObject );
	}
	
	function ProcessCreditCardVoid ( $UserName, $Password, ProcessCreditCardArgsClass $ArgsObject ) {
		/*if ( $ArgsObject is null ) { Err.Raise vbObjectError+1, "ProcessCreditCardSale", "No arguments were specified" };
        If ArgsObject.PNRef=""  Then Err.Raise vbObjectError+5, "ProcessCreditCardSale", "Amount must be specified";*/
		$PCC = new PaygistixTransactClass();
		return $PCC->ProcessCreditCard( $UserName, $Password, "Void", $ArgsObject );
	}
	
	function ProcessCreditCardForce ( $UserName, $Password, ProcessCreditCardArgsClass $ArgsObject ) {
		/*if ( $ArgsObject is null ) { Err.Raise vbObjectError+1, "ProcessCreditCardSale", "No arguments were specified" };
        If ArgsObject.Amount=""  Then Err.Raise vbObjectError+4, "ProcessCreditCardSale", "Amount must be specified";
		If ArgsObject.PNRef=""  Then Err.Raise vbObjectError+5, "ProcessCreditCardSale", "Amount must be specified";*/
		$PCC = new PaygistixTransactClass();
		return $PCC->ProcessCreditCard( $UserName, $Password, "Force", $ArgsObject );
	}
	
	function ProcessCreditCardReturn ( $UserName, $Password, ProcessCreditCardArgsClass $ArgsObject ) {
		/*if ( $ArgsObject is null ) { Err.Raise vbObjectError+1, "ProcessCreditCardSale", "No arguments were specified" };
        If ArgsObject.Amount=""  Then Err.Raise vbObjectError+4, "ProcessCreditCardSale", "Amount must be specified";
		If ArgsObject.PNRef=""  Then Err.Raise vbObjectError+5, "ProcessCreditCardSale", "Amount must be specified";*/
		$PCC = new PaygistixTransactClass();
		return $PCC->ProcessCreditCard( $UserName, $Password, "Return", $ArgsObject );
	}
}

/* ************************************************************
' ProcessCreditCardArgsClass
' ************************************************************ */
class ProcessCreditCardArgsClass {
    public $CardNum;
    public $ExpDate;
    public $NameOnCard;
    public $Amount;
    public $Zip;
    public $Street;
    public $CVNum;
    public $MagData;
    public $PNRef;
    public $ExtData;
    public $InvNum;
    
    public function ToDictionary() {
        $DataDictionary = array (
        	'CardNum'		=> $this->CardNum,
            'ExpDate'		=> $this->ExpDate,
            'NameOnCard'	=> $this->NameOnCard,
            'Amount'		=> $this->Amount,
            'Zip'			=> $this->Zip,
            'Street'		=> $this->Street,
            'CVNum'			=> $this->CVNum,
            'MagData'		=> $this->MagData,
            'PNRef'			=> $this->PNRef,
            'ExtData'		=> $this->ExtData,
            'InvNum'		=> $this->InvNum
        );
        
        return $DataDictionary;
    }
}

/* ----------------------------------------------------
' ProcessCreditCardResponseClass
' A class that is used to hold the results of the call
' to ProcessCreditCard.
' ---------------------------------------------------- */
class ProcessCreditCardResponseClass {
    public $Result;
    public $ResponseMessage;
    public $Message;
    public $AuthCode; 
    public $PNRef;
    public $HostCode;
    public $GetCommercialCard;
    public $ExtData;
    
    /* Populate each property of the result set by extracting data from the XML
    ' GetXMLElement will retrieve the text of the specificed element name from the 
    ' returned XML document */
    public function XML ( SimpleXMLElement $XMLObj ) {
        $this->Result             = $XMLObj->Result;
        $this->ResponseMessage    = $XMLObj->RespMSG;
        $this->Message            = $XMLObj->Message;
        $this->AuthCode           = $XMLObj->AuthCode;
        $this->PNRef              = $XMLObj->PNRef;
        $this->HostCode           = $XMLObj->HostCode;
        $this->GetCommercialCard  = $XMLObj->GetCommercalCard;
        $this->ExtData            = $XMLObj->ExtData;
    }
}
?>