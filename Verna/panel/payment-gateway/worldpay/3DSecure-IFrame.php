<?php session_start(); ?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<?php
//Initial 3DS - Post customer to ACSURL
if (!isset($_POST['PaRes']) && isset($_SESSION['CardSave_Direct_ACSURL'])) {
?>

<form id="cardsave-direct-3d-secure" action="<?php echo $_SESSION['CardSave_Direct_ACSURL']; ?>" method="POST" >
	<input type="hidden" name="PaReq" value="<?php echo $_SESSION['CardSave_Direct_PaREQ']; ?>"/>
	<input type="hidden" name="MD" value="<?php echo $_SESSION['CardSave_Direct_MD']; ?>"/>
	<input type="hidden" name="TermUrl" value="<?php echo $_SESSION['CardSave_Direct_TermURL']; ?>"/>
	<noscript>
		<center><p>Please click button below to Authenticate your card</p><input type="submit" value="Go"/></p></center>
	</noscript>
</form>

<script type="text/javascript">
document.getElementById('cardsave-direct-3d-secure').submit();
</script>

<?php
//Return from ACSURL - Post PaRES & MD to 3DS Processing page
} else if (isset($_POST['PaRes'])){
?>

<form id="cardsave-direct-3d-secure" action="<?php echo $_SESSION['CardSave_Direct_Process3DSURL']; ?>" method="POST" target="_parent">
	<input type="hidden" name="PaRes" value="<?php echo str_replace(' ', '+', htmlspecialchars($_POST['PaRes'])); ?>" />
	<input type="hidden" name="MD" value="<?php echo str_replace(' ', '+', htmlspecialchars($_POST['MD'])); ?>" />
	<noscript>
		<center><p>Please click button below to Authenticate your card</p><input type="submit" value="Go"/></p></center>
	</noscript>
</form>

<script type="text/javascript">
document.getElementById('cardsave-direct-3d-secure').submit();
</script>

<?php } ?>
</body>
</html>