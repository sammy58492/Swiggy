<html>
<head>
<title>HTML5 geolocation example</title>

<style type="text/css">
#sphone {
       margin-left:auto;
       margin-right:auto;
       margin-top:25px;  
       height: 426px;
       width: 219px;
       padding-top:102px;
       padding-left:16px;   
       background-image:url(https://www.ibm.com/developerworks/mydeveloperworks/blogs/bobleah/resource/iphone.jpg);
       background-repeat: no-repeat;
}  
</style>

<script>
function googleMapIt(p)
{ 
  var detail ='<p><strong>Latitude: </strong> ' + p.coords.latitude + ' <strong> Longitude: </strong> ' + p.coords.longitude; + '</p>'
  document.getElementById("addAfterLoad").innerHTML = detail;
  var map='https://maps.google.com/maps?&z=15&output=embed&ll='+p.coords.latitude+','+p.coords.longitude;        
  document.getElementById("geoMap").src=map;
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(googleMapIt);
}
else {
  var detail ='<p><strong>Your browser does not support geolocation!</strong></p>';
  document.getElementById("addAfterLoad").innerHTML = detail;
}
</script>
</head>

<body>
<div id="sphone"><iframe id="geoMap" width="187" height="260" frameborder="0" scrolling="no" src=""></iframe></div>
<div id="addAfterLoad"></div>
</body>
</html> 