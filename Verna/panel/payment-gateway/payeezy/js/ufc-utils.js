function checkCurdNumber(){
				var letters = document.getElementById('cardnr').value.length;
				if (letters == 16) {
				  document.getElementById('expmonth').focus();
				}
}

function checkExpMonth(){
				var letters2 = document.getElementById('expmonth').value.length;
				if (letters2 == 2){
					document.getElementById('expyear').focus();
				}
}
function checkExpYear(){
				var letters2 = document.getElementById('expyear').value.length;
				if (letters2 == 2){
					document.getElementById('cvc2').focus();
				}
}
function setOnKeyUpEvent(){
	             document.getElementById('cardnr').setAttribute('onKeyUp','checkCurdNumber()');
		         document.getElementById('expmonth').setAttribute('onKeyUp','checkExpMonth()');
				 document.getElementById('expyear').setAttribute('onKeyUp','checkExpYear()');
}
function setClass(elementId, className){
	             document.getElementById(elementId).className =className; 
}
function enterOnlyNumber(evt) {
		var theEvent = evt || window.event;
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
		var regex = /[0-9]|\./;
		if( !regex.test(key) ) {
		   theEvent.returnValue = false;
		   if(theEvent.preventDefault){
		     theEvent.preventDefault();
			}
		}
}
function validateLength(id,length){
				var letters = document.getElementById(id).value.length;
				if (letters != length) {
				  document.getElementById(id).className += " validation_error";
				}
}
			


function onBodyLoad(){
                 document.getElementById('cardnr').focus();
	             document.getElementById('cardnr').setAttribute('onKeyUp','checkCurdNumber()');
				 document.getElementById('cardnr').setAttribute('onkeypress','enterOnlyNumber(event)');
				 document.getElementById('cardnr').setAttribute('onblur','validateLength(\'cardnr\',16)');
				 document.getElementById('cardnr').setAttribute('onfocus','setClass(\'cardnr\',\'input_cardn\')');
				 
				 setClass('cardnr','input_cardn');
		         document.getElementById('expmonth').setAttribute('onKeyUp','checkExpMonth()');
				 setClass('expmonth','select_m');
				 document.getElementById('expyear').setAttribute('onKeyUp','checkExpYear()');
				 setClass('expyear','select_y');
				 document.getElementById('cvc2').setAttribute('onkeypress','enterOnlyNumber(event)');
				 document.getElementById('cvc2').setAttribute('onblur','validateLength(\'cvc2\',3)');
				 document.getElementById('cvc2').setAttribute('onfocus','setClass(\'cvc2\',\'input_cvc\')');
				 setClass('cvc2','input_cvc');
				 document.getElementById('cvc2').setAttribute('maxlength','3');
				 document.getElementById('cardname').setAttribute('type','hidden');
				 document.getElementById('cardname').setAttribute('value','No Cardholdername');
				 document.getElementById('cardname').setAttribute('hidden','yes');
}