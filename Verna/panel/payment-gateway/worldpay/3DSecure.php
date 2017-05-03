<?php
session_start();
/*GET POST VARIABLES AND SET SESSION VARIABLES*/
$_SESSION['CardSave_Direct_ACSURL'] = $_POST['ACSURL'];
$_SESSION['CardSave_Direct_PaREQ'] = $_POST['PaReq'];
$_SESSION['CardSave_Direct_MD'] = $_POST['MD'];
$_SESSION['CardSave_Direct_TermURL'] = $_POST['TermUrl'];
$_SESSION['CardSave_Direct_Process3DSURL'] = $_POST['Process3DSURL'];

?>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>3D-Secure</title>
</head>
<body>
<iframe frameborder="0" src="<?php echo $_SESSION['CardSave_Direct_TermURL']; ?>" id="cardsave-direct-3ds-iframe" width="390" height="500"></iframe>
</body></html>