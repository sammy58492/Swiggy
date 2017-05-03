<?php
require_once("../panel/lib/front-main.php");
require("../languages/lang.en.php");

$ste_url=$_SERVER['HTTP_HOST'];
$data=json_decode(stripslashes($_REQUEST["data"]),true);
$buttoncolor='#f2f2f2';
if($data["bgcolor"]!=''){
	$buttoncolor=$data["bgcolor"];
}

$businesspagprograssbarsetting='f';
$businesspageheadersetting='f';
$businesspagefootersetting='f';
if($data["footerhide"]!=''){
	$businesspagefootersetting=$data["footerhide"];
}

if($data["headerhide"]!=''){
	$businesspageheadersetting=$data["headerhide"];
}

if($data["progressbarhide"]!=''){
	$businesspagprograssbarsetting=$data["progressbarhide"];
}

if($data["textcolor"]!=''){
	$textcolor=$data['textcolor'];
}

if($data["textsize"]!='')
{
	$textsize=$data['textsize'];
}

if($data["buttonsize"]!='')
{
	$buttonsize=$data['buttonsize'];
}

if($data['textfont']!='')
{
	$textfont=$data['textfont'];
}

if($data['locations']!='')
{
	$locations=$data['locations'];
}

?>
<html>
<head>
<style type="text/css">
	.float {
    position: fixed;
    <?php if($locations=="Right"){?>
    right: 0;
    <?php }else{?>
    right:;
    <?php } ?>

    <?php if($locations=="Left"){?>
    left: 0;
    <?php }else{?>
    left:;
    <?php } ?>

    top: 50%;
    width: 8em;
    margin: -2.5em 0 0 0;
    z-index: 5;
    background:<?php echo $buttoncolor;?>;
    color: white;
    font-weight: bold;
    font-size: <?php echo $textsize;?>;
    text-align: left;
    border: solid hsla(80, 90%, 40%, 0.5);
    border-right: none;
    padding: 0.5em 0.5em 0.5em 2.5em;
    box-shadow: 0 1px 3px black;
    border-radius: 3em 0.5em 0.5em 3em;


}


</style>
</head>
<body>
<?php echo $locations;?>
	<input type="button" class="float" value="Click" onclick="hello()">
</body>
</html>
<script type="text/javascript">
	function hello () {
		// body...
		alert("heloo");
	}
</script>