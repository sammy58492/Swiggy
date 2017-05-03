<?php
////////////////////////////////////////////////////////////////////////////////
//
// COMMON PAGE
//
//   Defines require_authentication() function:
//     If the user is not authenticated, forward to the login page
//     
////////////////////////////////////////////////////////////////////////////////
function is_authenticated()
{
session_start();
session_write_close();
if ($_SESSION['auth'] == 'yes')
	return true;
	else
	return false;
}


function require_authentication()
	{
	if (is_authenticated() == false) 
		die('');
	}
?>
