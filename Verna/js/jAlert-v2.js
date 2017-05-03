/* 
	jAlert v.2
	Made with love by Versatility Werks (http://flwebsites.biz)
	MIT Licensed
*/
$(function(){

/* Positions an alert based on screen height */
var positionjAlert = function(thisAlertWrap){
	thisAlert = thisAlertWrap.find('.jAlert');
	
	var divHeight = thisAlert.innerHeight(),
		winHeight = $(window).height(),
  		winWidth = $(window).width();
  	
  	/* If div is smaller than height of window, center it  */ 
  	if(divHeight < winHeight){
	  	var margin = winHeight - divHeight;
	  	margin = margin/2;
	/* Otherwise add a static top margin */
  	}else{
	  	if(winWidth < 500){
		  	var margin = 20;
	  	}else{
		  	var margin = 100;
	  	}
  	}
  	
  	/* Take top margin away from window height */
	winHeight = winHeight - margin;
	
  	/* If height of window + margin is shorter than the modal, scroll to top and set position: absolute */
  	if(divHeight > winHeight){
		/* Show the modal absolute */
		thisAlertWrap.css('position', 'absolute');
		thisAlert.css('margin-top', '0px');
		return true;
			
	}else{
		/* Show the modal fixed */
		thisAlertWrap.css('position', 'fixed');
		thisAlert.css('margin-top', margin+'px');
		return false;
	}
}

;(function($){

/* Add the jConfirm background div and holder div (if not exists) */
$('body').append("<div id='jAlertBack'></div>");
/* Cache it */
$jAlertBack = $('#jAlertBack');

$.fn.jAlert = function(options) {

	var alert = this;

    /* Multiple Instances */
    if (alert.length > 1){
        alert.each(function() { $(this).jAlert(options) });
        return this;
    }
    
	/* Default Options */
	var defaultOptions = {
		title: false,
		message: false,
		imgUrl: false,
		ajaxUrl: false,
		iframeUrl: false,
		iframeHeight: false,
		cssClass: '',
		id: false,
		theme: false,
		size: false,
		replace: false,
		clickAnywhere: false,
		hideOnEsc: true,
		closeBtn: true,
		btn: false,
		autofocus: false,
		onClose: false,
		onOpen: false
		}
	
	/* Combine user options with default */
	options = $.extend({}, defaultOptions, options);
	
	/* Convert theme to a class */
	if(options.theme){ 
		if(options.theme == 'dark'){
			options.cssClass += ' jDark';
		}else if(options.theme == 'error'){
			options.cssClass += ' jError';
		}else if(options.theme == 'success'){
			options.cssClass += ' jSuccess';
		}else if(options.theme == 'info'){
			options.cssClass += ' jInfo';
		}
	}
	
	/* Convert size to a class */
	if(options.size){ 
		if(options.size == 'small' || options.size == 'sm'){
			options.cssClass += ' sm';
		}else if(options.size == 'medium' || options.size == 'md'){
			options.cssClass += ' md';
		}else if(options.size == 'large' || options.size == 'lg'){
			options.cssClass += ' lg';
		}else if(options.size == 'full'){
			options.cssClass += ' full';
		}
	}
	
	/* If there are button(s), then you obviously don't want to hide the div when you alert anywhere or they'll be useless SAME with autofocus */
	if(typeof options.btn == 'object' || typeof options.onClose == 'function' || options.autofocus){
		options.clickAnywhere = false;
	}else{
		options.btn = false;
	}

	/* If user wants to autofocus on the first btn */
	if(options.autofocus == 'btn:first'){
		options.autofocus = '.jBtn:first';
	}
	/* If user wants to autofocus on the last btn */
	if(options.autofocus == 'btn:last'){
		options.autofocus = '.jBtn:last';
	}
	
	/* Helper function that determines whether or not to hide the background while closing an alert */
	var anyAlertsVisible = function(){
		var visible = false;
		$('.jAlertWrap').each(function(){
			if($(this).is(":visible")){
				visible = true; return;
			}
		});
		return visible;
	}
	
    
    /* Hides an alert */
    alert.closeAlert = function(remove, onClose){
	var instance = $(this);
	if(instance.length){
	instance.hide('200', function(){
	if(remove){
		instance.remove();
	}
	if(!anyAlertsVisible()){
		$jAlertBack.fadeOut('fast');
	}
	if(typeof options.onClose == 'function'){ options.onClose(instance); }
	if(typeof onClose == 'function'){ onClose(instance); }
	});
	}
	}
	
	/* Shows an alert that already exists */
	alert.showAlert = function(overlap, remove, onOpen){
	if(overlap != false){ overlap = true; }
	if(remove != false){ remove = true; }
	var instance = $(this);
	if(!overlap){
		$('.jAlertWrap:visible').closeAlert(remove);
	}
	$jAlertBack.fadeIn('fast');
	instance.show('fast');
	if(typeof onOpen == 'function'){ onOpen(instance); }
	}

	/* Displays an alert for the first time */
	var showJAlert = function(content){
		/* Show background, if not already visible */
		$jAlertBack.fadeIn('fast');
		/* Start creating the jAlert div */
		var div = "<div class='jAlertWrap'";
		/* Get the highest z-index of all alerts */
		var topMost = $('.jAlertWrap:last')[0];
		if(typeof topMost !== 'undefined'){
		var zIndex = parseInt(topMost.style.zIndex, 10) + 1;
		}else{
			zIndex = 99999;
		}
		/* Set the new div's z-index as 1 higher than the highest */
		div += " style='z-index: "+zIndex+"'><div class='jAlert";
		/* Add any classes */
		div += ' '+options.cssClass;
		/* If no title, add the noTitle class */
		if(!options.title){ div += ' noTitle'; }
		/* Close the class */
		div += "'";
		/* Add ID if chosen */
		if(options.id){ div += " id='"+options.id+"'"; }
		/* Close the wrapper div */
		div += "><div>";
		/* If close button */
  		if(options.closeBtn){ div += "<div class='closeAlert jClose'>X</div>"; }
  		/* Add title if applicable */
  		if(options.title){ div += "<div class='jTitle'><div>"+options.title+"</div></div>"; }
  		/* Add content */
  		div += "<div class='jContent'>"+content;
  		/* Open button wrapper */
  		if(options.btn){ div += "<div style='clear: both;'></div><div class='jBtnWrap'>";
  			$.each(options.btn, function(index, value){
  				var thisBtn = options.btn[index];
  				if(typeof thisBtn['href'] == 'undefined'){ thisBtn['href'] = ''; }
  				if(typeof thisBtn['class'] == 'undefined'){ thisBtn['class'] = ''; }
  				if(typeof thisBtn['label'] == 'undefined'){ thisBtn['label'] = ''; }
  				if(typeof thisBtn['id'] == 'undefined'){ thisBtn['id'] = ''; }
  				if(typeof thisBtn['target'] == 'undefined'){ thisBtn['target'] = 'self'; }
	  			div += "<a href='"+thisBtn['href']+"' id='"+thisBtn['id']+"' target='"+thisBtn['target']+"' class='jBtn "+thisBtn['cssClass']+"'>"+thisBtn['label']+"</a> ";
  			});
  		}
  		/* Close all jAlert/wrapper divs */
  		div += "</div></div></div></div>";
  		/* Turn the HTML into an element */
	  	var div = $(div);
	  	/* If opted to replace other jAlerts, then hide/remove them */
	  	if(options.replace){
		  	$('.jAlertWrap').each(function(){
			  	$(this).closeAlert(true);
		  	});
	  	}
	  	/* Append the new element to the body, show it, and determine absolute/fixed positioning based on height vs window height */
	  	div.appendTo('body').show('fast', function(){
	  		var thisAlert = $(this);
	  		/* If positioning returns true (absolute) scroll to top */
	  		if(positionjAlert(thisAlert)){
		  		/* Scroll to top */
		  		$('html, body').animate({ scrollTop: 0 }, 'fast');
	  		}
			/* Watch for change and position accordingly */
			window.setInterval(function(){ positionjAlert(thisAlert) }, 500);
  		});
	  	/* Add on click handlers for closing, hiding when you click anywhere, the ok button, and the cancel button */
	  	if(options.closeBtn){
		  	div.find('.closeAlert').on('click', function(e){
		  		e.preventDefault();
				div.closeAlert(true);
			});
		}
		if(options.clickAnywhere){
			$(document).on('mouseup', function(e){
				div.closeAlert(true);
			}); 
		}
		if(options.btn){
			$.each(div.find('.jBtn'), function(index, value){
				var thisBtn = options.btn[index];
				var onClick = thisBtn['onClick'];
				var href = thisBtn['href'];
				var closeOnClick = thisBtn['closeOnClick'];
				$(this).on('click', function(e){
				if(typeof href == 'undefined' || href == '' || href == '#'){
					e.preventDefault();
				}
				if(typeof onClick == 'function'){
					onClick(div);
				}
				if(closeOnClick != false){
				div.closeAlert(true);
				}
				});
			});
		}
		/* If hideOnEsc was enabled, make sure the top visible div is the correct one before closing it */
		if(options.hideOnEsc){
			$(document).on('keydown', function(e){
			    if(e.keyCode === 27){
			    	$($('.jAlertWrap').get().reverse()).each(function(i, obj){
			    		var thisAlert = $(this);
				    	if(thisAlert.is(':visible')){
				    		if(thisAlert.index() == div.index()){
					    		div.closeAlert(true);
				    		}
				    	return false;
				    	}
			    	});
			    }
			});
		}
		/* If the function, onOpen exists, run it */
		if(typeof options.onOpen == 'function'){ options.onOpen(div); }
		/* If the alert has an element that should be focused by default */
		div.find(options.autofocus).focus();

		/* Return the alert div */
		return div;
	}
	  
	/* Shows an alert based on content type */  
    alert.initialize = function(){
		if(!options.message && !options.ajaxUrl && !options.iframeUrl && !options.imgUrl){
			return showJAlert('Error! Content not defined.');
		}else if(options.ajaxUrl){
			$.get(options.ajaxUrl, function(content){
				if(options.message){ content += options.message; }
				return showJAlert(content);
			});
		}else if(options.iframeUrl){
			content = "<iframe style='border: 0px; height: "+options.iframeHeight+"; width: 100%;' src='"+options.iframeUrl+"'></iframe>";
			if(options.message){ content += options.message; }
			return showJAlert(content);
		}else if(options.imgUrl){
			content = "<div style='text-align: center;'><img style='border: 0px; max-width: 100%;' src='"+options.imgUrl+"'></div>";
			if(options.message){ content += options.message; }
			return showJAlert(content);
		}else if(options.message){
			return showJAlert(options.message);
		}
    }

    return alert.initialize();
}
})(jQuery);

});

/* Optional: Overwrites javascript's built-in alert function */
function alert(msg){
	$.fn.jAlert({
		'message': msg
	});
}
/* Optional error and success templates */
function successAlert(msg){
	$.fn.jAlert({
		'title': 'Success',
		'message': msg,
		'theme': 'success',
		'clickAnywhere': true
	});	
}
function errorAlert(msg){
	$.fn.jAlert({
		'title': 'Error',
		'message': msg,
		'theme': 'error',
		'clickAnywhere': true
	});
}