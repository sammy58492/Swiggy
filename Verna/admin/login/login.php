<?php
require("authenticate.php");
if ($_POST['type']=='normal'){

	login($_POST['username'],$_POST['response']);
	}
	else
	sociallogin($_POST['data']);
?>
