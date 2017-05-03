<?php
/*///////////////////////////////////////////////////////////////////////
Part of the code from the book
Building Findable Websites: Web Standards, SEO, and Beyond
by Aarron Walter (aarron@buildingfindablewebsites.com)
http://buildingfindablewebsites.com

Distrbuted under Creative Commons license
http://creativecommons.org/licenses/by-sa/3.0/us/
///////////////////////////////////////////////////////////////////////*/


//function storeAddress(){

	// Validation
	if(!$_GET['email']){ return "No email address provided"; }

	if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*$/i", $_GET['email'])) {
		return "Email address is invalid";
	}

	require_once('MCAPI.class.php');
	// grab an API Key from http://admin.mailchimp.com/account/api/
	$api = new MCAPI('3ebed2451928049f3caa114b1caa323c-us9');

	// grab your List's Unique Id by going to http://admin.mailchimp.com/lists/
	// Click the "settings" link for the list - the Unique Id is at the bottom of that page.
	$list_id = "9a5a3fd77d";

	// Merge variables are the names of all of the fields your mailing list accepts
	// Ex: first name is by default FNAME
	// You can define the names of each merge variable in Lists > click the desired list > list settings > Merge tags for personalization
	// Pass merge values to the API in an array as follows
	$mergeVars = array('FNAME'=>$_GET['name']);

	if($api->listSubscribe($list_id, $_GET['email'], $mergeVars) === true) {
		// It worked!
		return 'Success! Check your email to confirm sign up.';
	}else{
		// An error ocurred, return error message
		return 'Error: ' . $api->errorMessage;
	}

//}

// If being called via ajax, autorun the function
//if($_GET['ajax']){ echo storeAddress(); }
?>
