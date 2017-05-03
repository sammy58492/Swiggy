function ufcValidate(){
	var card = 	document.getElementById("cardnr").value;
	var cardname = document.getElementById("cardname").value;
	var cvc = document.getElementById("cvc2").value;
	
	var cardpatt =/^[0-9]{13,19}$/i;
	var cardnamepatt =/^[A-Z '`.-]{2,70}$/i;
	var cvcpatt =/^[0-9]{3}$/i;
	
	if(!cardpatt.test(card) && !cvcpatt.test(cvc)){
	    document.getElementById("cardnr").className += " validation_error";
		document.getElementById("cvc2").className += " validation_error";
		alert(cardMessage);
		return false;
	} else if(!cardnamepatt.test(cardname)){
		alert(cardnameMessage);
		return false;
	} else if(!cvcpatt.test(cvc)){
		document.getElementById("cvc2").className += " validation_error";
		alert(cvcMessage);
		return false;
	}
	
	return true;
}
