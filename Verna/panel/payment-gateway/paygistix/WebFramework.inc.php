<?php
/* --------------------------------------------------------------
' WEB FRAMEWORK
' Encapsulating the logic to make GET, POST and SOAP calls to
' PaygistiX web services
' REQUIRES: SimpleXML and cURL
' -------------------------------------------------------------- */
define ( 'MethodType', 'SOAP' );

function curlRequest ( $url, $data, $action = null ) {
	// Create the parameter string (for GET/POST only)
	if ( MethodType != 'SOAP' ) {
		foreach ( $data as $Key => $Value ) {
			$params .= $Key . '=' . urlencode ( $Value ) . '&';
		}
	}

	$ch = curl_init();
	
	curl_setopt ( $ch, CURLOPT_TIMEOUT, 180 );
	curl_setopt ( $ch, CURLOPT_HEADER, 0 );
	curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt ( $ch, CURLOPT_SSL_VERIFYPEER, false); //THIS LINE IS KEY
	
	switch ( MethodType ) {
		case 'SOAP':
			// Send XML SOAP Envelope
			curl_setopt ( $ch, CURLOPT_HTTPHEADER, array ( 'Content-type: application/soap+xml;charset=UTF-8;action="' . $action . '"' ) );
			curl_setopt ( $ch, CURLOPT_POST, 1 );
			curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );
			break;
		case 'POST':
			// Send params via POST
			curl_setopt ( $ch, CURLOPT_POST, 1 );
			curl_setopt ( $ch, CURLOPT_POSTFIELDS, $params );
			break;
		default:
			// Send params via GET
			$url .= '?' . $params;
	}
	
	curl_setopt ( $ch, CURLOPT_URL, $url );
	
	$data = curl_exec ( $ch );
	curl_close ( $ch );
	
	return $data;
}

/* ------------------------------------------------------------------------------------------
' CallWebService
' Calls the webservice at the given URI and returns the results.
' Namespace is needed where we are using SOAP
' ------------------------------------------------------------------------------------------ */
function CallWebService ( $URI, $NameSpace, $WebServiceFunctionName, $Data ) {
	switch ( MethodType ) {
		case 'SOAP':
			return CallWebServiceSOAP ( $URI, $NameSpace, $WebServiceFunctionName, $Data );
			break;
		default:
			return CallWebServiceHTTP ( $URI, $WebServiceFunctionName, $Data );
	}
}

/* ------------------------------------------------------------------------------------------
' CallWebServiceHTTP
' Used to call the PaygistiX web service using standard HTTP parameters
' ------------------------------------------------------------------------------------------ */
function CallWebServiceHTTP ( $URI, $WebServiceFunctionName, $Data ) {
	$xml = curlRequest ( $URI . '/' . $WebServiceFunctionName, $Data );
	$xmlHttp = new SimpleXMLElement ( $xml );
	return $xmlHttp;
}

/* ------------------------------------------------------------------------------------------
' CallWebServiceSOAP
' Used to call the PaygistiX web service using SOAP
' ------------------------------------------------------------------------------------------ */
function CallWebServiceSOAP ( $URI, $NameSpace, $WebServiceFunctionName, $Data ) {
	// Create the SOAP envelope
    $sEnvelope = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tns="' . $NameSpace . '">
		    <soap:Header />
		    <soap:Body>
			    <tns:' . $WebServiceFunctionName . '>
				    {PARAMETERS}
			    </tns:' . $WebServiceFunctionName . '>
		    </soap:Body>
	    </soap:Envelope>';
    foreach ( $Data as $Key => $Value ) {
       $sParams .= '<tns:' . $Key . '>' . $Value . '</tns:' . $Key . '>';
    }
    
    // Swap out the parameters
    $sEnvelope = str_replace ( '{PARAMETERS}', $sParams, $sEnvelope );

    $NameSpace = rtrim ( $NameSpace, '/' );
	
	// Collect response SOAP envelope
	$xml = curlRequest ( $URI, $sEnvelope, $NameSpace . '/' . $WebServiceFunctionName );
	$xml = html_entity_decode($xml);
	
	// Parse response XML into SimpleXML object
	$xmlHttp = new SimpleXMLElement ( $xml );
    
    // Go into the SOAP envelope to retrieve the message body
    $soapEnv = $xmlHttp->children ( 'soap', true );
    $soapXml = $soapEnv->children();
    
    return $soapXml;
}
?>