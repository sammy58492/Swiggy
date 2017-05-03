<?php session_start();
require ('../lib/panel-review.php');
global $lang_resource;
function GetLangFileStatic5(){	

	require('../config.php');
	$link1 = ConnectDB($CFG);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
		pg_prepare($link1,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
		$result1 = pg_execute($link1,'sqllangfetch',array('TRUE'));
		$row1 = pg_fetch_array($result1);
		$_SESSION['l'] = $row1['id'];
	}
	pg_prepare($link1,'sqlfetchlang','SELECT * from w_lang_static');
	$result = pg_execute($link1,'sqlfetchlang',array());
	while($row = pg_fetch_array($result)){
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	}
	return $lang_resource;
	pg_close($link1);
}

$lang_resource = GetLangFileStatic5();



$orden = $_GET["order"];
$customslug = $_GET["customslug"];
$orden_order_business = GetExistData($orden,$_REQUEST['busid']);
$orden_array = GetReviewData($orden);
$orden_exist = GetCheckData($orden);

if($orden_array->count==1) {
				?>
					<script>
						msg1=document.getElementById("msg1").value;
  					alert(msg1);

					top.location.href = '/'


					</script>
				<?php
				}
if($orden_exist == 0)	 { ?>
					<script>
					msg2=document.getElementById("msg2").value;
  					alert(msg2);

					top.location.href = '/'

					</script>

	<? }
if($orden_order_business == 0)	 { ?>
					<script>
					msg3=document.getElementById("msg3").value;
  					alert(msg3);
  					
					top.location.href = '/'

					</script>

<? }
$business = $_REQUEST['busid'];
$main_data1 = GetBusinessDetails($business);
$city = GetBusinessCity(trim($main_data1['city']));
$average_array = GetReviewDataAvg($business);
$paymentDetails = GetPaymentDetails($business);
$average = round($average_array->total);
for($i=0;$i<5;$i++){
if ($average>=1){
$stars[$i] = "star2";
$average = $average - 1; }
else$stars[$i] = "star1";
}
$business_addres ="colony1 test colony2 test";
$business_name = "DemoDev now";if($orden_array->count > 0)
{
error();}function error(){
echo "<script languaje=\"javascript\">
 alert(\"Expired link!\");
top.location.href = '/'
var url_part=document.location.href.split(\"/\");
var url_complete = \"http://\"+url_part[2];
location.href = url_complete;
</script>";
}?><html><head>
<title><?echo $business_name;?></title><link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,700,800"/>

<link href="<?=$configRec['siteurl']?>/panel/js/rating.css" rel="stylesheet" type="text/css"/>
<link type="text/css" rel="stylesheet" href="<?=$configRec['siteurl']?>/panel/theme/front.php?v=1.3.2"/>
<link rel="stylesheet" type="text/css" href="<?=$configRec['siteurl']?>/font/stylesheet.css">
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="<?=$configRec['siteurl']?>/panel/js/review.js"></script>
<script type="text/javascript" src="<?=$configRec['siteurl']?>/panel/js/jquery.js"></script>
<Meta Name="Keywords" Content=""><META NAME="description" CONTENT=""> <meta name="title" content="DemoDev now"><meta property="fb:app_id" content="490170467766254"/>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<style>
.order_now_btn{
	padding:16px 15px 16px 15px;
	color:#fff;
	font-size:14px;
    font-family: 'interstateregular';
	text-transform:uppercase;
	background:#e74c3c;
	border: none;
	border-radius: 4px;
	cursor:pointer;
		float:left;

}
.order_now_btn:hover{
	
	background:#9f1304;
	
}
</style>
</head>
<body>
<div id="review" style="display:none; float:left;">
	  <table cellpadding=0 cellspacing=0 border=0 >
		  <tr>
		    <td>
		    </td>
		    <td>

		      </td>
		    <td></td>
		  </tr>
		  <tr>
		    <td></td>
		    <td></td>
		    <td></td>
		  </tr>
		  <tr >

		  <td>
		  </td>
		  <td>
		  <br/> <br/>
		  </td>
		  <td>
		      <br/><?= $lang_resource['TEMPLATE_QUALITY_OF_FOOD'] ?> <br/>

		  </td>
		  <td><br/>
		      <div id="rate2" class="rating">
		      <div id="star1" class="star"><a id="1" class="star1">1</a></div>
		      <div id="star2" class="star"><a id="2" class="star2">2</a></div>
		      <div id="star3" class="star"><a id="3" class="star3">3</a></div>
		      <div id="star4" class="star"><a id="4" class="star4">4</a></div>
		      <div id="star5" class="star"><a id="5" class="star5">5</a></div>
		      <input type=hidden id="rating"><span id="rateit"></span>
		      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		      </div>
		  </td>

		</tr>
		<tr>
		<td>

		</td>
		<td>
		</td>
		  <td>
		       <br/><?= $lang_resource['TEMPLATE_PUNCTUALITY'] ?> <br/>
		    </td>
		    <td>  <br/>
		     <div id="rate2" class="rating">
		      <div id="star6" class="star"><a id="6" class="star6">1</a></div>
		      <div id="star7" class="star"><a id="7" class="star7">2</a></div>
		      <div id="star8" class="star"><a id="8" class="star8">3</a></div>
		      <div id="star9" class="star"><a id="9" class="star9">4</a></div>
		      <div id="star10" class="star"><a id="10" class="star10">5</a></div>
		      <input type=hidden id="rating"><span id="rateit"></span>
		      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		      </div>
		    </td>

		</tr>
	      <tr>
		    <td>
		    </td>
		    <td>
		    </td>
		  <td>
		       <br/><?= $lang_resource['TEMPLATE_SERVICE'] ?>  <br/>

		    </td>
		    <td> <br/>
		    <div id="rate2" class="rating">
		      <div id="star11" class="star"><a id="11" class="star11">1</a></div>
		      <div id="star12" class="star"><a id="12" class="star12">2</a></div>
		      <div id="star13" class="star"><a id="13" class="star13">3</a></div>
		      <div id="star14" class="star"><a id="14" class="star14">4</a></div>
		      <div id="star15" class="star"><a id="15" class="star15">5</a></div>
		      <input type=hidden id="rating"><span id="rateit"></span>
		      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		      </div>
		    </td>

		</tr>
		<tr>
		    <td>
		    </td>
		    <td>
		    </td>
		    <td>
		        <br/><?= $lang_resource['TEMPLATE_FOOD_PACKAGING'] ?> <br/>

		    </td>
		    <td><br/>
		    <div id="rate2" class="rating">
		         <div id="star16" class="star"><a id="16" class="star16">1</a></div>
		      <div id="star17" class="star"><a id="17" class="star17">2</a></div>
		      <div id="star18" class="star"><a id="18" class="star18">3</a></div>
		      <div id="star19" class="star"><a id="19" class="star19">4</a></div>
		      <div id="star20" class="star"><a id="20" class="star20">5</a></div>
		      <input type=hidden id="rating"><span id="rateit"></span>
		      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		      </div>
		    </td>

		</tr>
		<tr>
		    <td>
		    </td>
		    <td>
		    </td>
		    <td>


		    </td>
		    <td> <br/>

		      <input type=hidden id="order" value="<?=$orden?>" />
		      <input type=hidden id="business" value="<?=$business?>" />
		      <input type=hidden id="reload" value="1" />
               <input type=hidden id="customslug" value="<?=$customslug?>" />
		      <input type=hidden id="city" value="<?echo $city;?>" />
              <input type=hidden id="date" value="<?=date("Y-m-d");?>" />
		    </td>

		</tr>
		 <tr>
		    <td>
		    </td>
		    <td>
		    </td>
		    <td style="text-align: center;" colspan="2">
		        <br/>
		        <!--<div id="aceptr" aling="right"><a id="50" class="aceptr"><img class="imagen" align="right" height="39" src=<?echo "http://".$_SERVER["HTTP_HOST"]."/images/button_spanish.png";?>></a></div>-->
		         <div id="aceptr" aling="right"><a id="50" class="aceptr"><div class="order_now_btn"><?= $lang_resource['TEMPLATE_RATE_NOW'] ?></div></a></div>

		    </td>
		      </div>
		</tr>
	      </table>
          </div>
          <input type="hidden" id="msg1" value="<?= $lang_resource['REVIEW_ALREADY_REVIEWED'] ?>"/>
           <input type="hidden" id="msg2" value="<?= $lang_resource['REVIEW_MSG2'] ?>"/>
            <input type="hidden" id="msg3" value="<?= $lang_resource['REVIEW_MSG3'] ?>"/>
              <input type="hidden" id="msg4" value="<?= $lang_resource['REVIEW_SUCCESS_MESSAGE'] ?>"/>
</body>

 </html>
