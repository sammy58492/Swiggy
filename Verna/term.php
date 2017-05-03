<?php
require_once("panel/lib/front-main.php");
$landings=FetchLandingPageData($_SESSION['l']);
$landingSetData=FetchLandingSettingData();
include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);

$dcm = "decimal_point";
pg_prepare($link,'sqldcpfetch1','SELECT * FROM w_configs WHERE name=$1');
$resultdcm = pg_execute($link,'sqldcpfetch1',array($dcm));
$rowdcm = pg_fetch_array($resultdcm);

$_SESSION['decimal_value']=$rowdcm['value'];


$dcm = "facebookappid";
pg_prepare($link,'sqldcpfetch2','SELECT * FROM w_configs WHERE name=$1');
$resultdcm = pg_execute($link,'sqldcpfetch2',array($dcm));
$rowdcm = pg_fetch_array($resultdcm);

$_SESSION['facebookappid']=$rowdcm['value'];
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title><?php echo  $landings->pagetitle ?></title>

<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    
    <link rel="shortcut icon" type="image/png" href="http://happyclothes.co.uk/images/logo_cloths_fb.png"/>
    <!-- Bootstrap -->
    <link href="css/bootstrap_1.min.css" rel="stylesheet">
    <!-- My Css -->
    <link rel="stylesheet" type="text/css" href="css/main_front.css">
    <link rel="stylesheet" type="text/css" href="css/stylesheet.css">
	<link rel="stylesheet" type="text/css" href="css/responsive_1.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>

</head>

<body>

<header>
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="happylogo">
            <a href="#">
              <img src="images/logo_cloths.png" id="happyclotheslogo" class="img-responsive" alt="Responsive image">
            </a>
          
    </div>  
  </div><!-- /.container -->
</header>

<div class="openingad">
<div class="container">
    <div class="row">
    <?php echo $landingSetData->page_content?>
        <!-- <div class="col-md-7">     
       		<h1>Happy Clothes</h1>
            <p>A happy appproach to laundry , dry cleaning & more (London Opening Oct 2015).</p>
       </div> <!-- /.col-md-7 -->    
          
         <!--  <div class="col-md-5">     
       		<h2>#HAPPYYEAR</h2>
       </div> <!-- /.col-md-5 -->  
          
    </div> <!-- /.row --> 
  </div><!-- /.container -->
 </div><!-- /.openingad -->


<div class="container">
    <div class="row">
       <div class="col-md-12 terms-conditions">     
       		<h4>Terms & Conditions</h4>
       </div> <!-- /.col-md-12 --> 
       
    </div> <!-- /.row --> 
  </div><!-- /.container -->


<div class="container laundry_content">
    <div class="row">
       <div class="col-md-12"> 
       		<div class="terms">
            	<p>
                1. To enter this competition you must submit the entry form available at happyclothes.co.uk. Entry to the competition is free.<br><br>
                2.  The competition will run from 1October 2015 22:00 until 26 October 2015 09:00.<br><br>
                3.  The competition is open to individual residents of Greater London aged 18 or over, except employees of HappyClothes.co.uk Ltd (“Happy Clothes”), their associated, affiliated or subsidiary companies, and their families, agents, or anyone connected with the competition.<br><br>
                4.  The winner will be drawn at random on 10 November 2015 from all eligible entries received prior to the close of the competition.  The winner will be notified by email within 28 working days from the draw date.  The winner has 28 working days to confirm acceptance of their prize; otherwise, Happy Clothes reserves the right to redraw the prize.<br><br>
                5.  The prize is: 1 x 1 Year Free Laundry and Dry Cleaning Paycode Voucher spread over 52 weeks and with a maximum Cash Value Limit of £20 per week. The Happy Clothes Paycode Vouchers will be delivered to the winner via Recorded deliveryOR E-mail within 28 working days of receiving the acceptance of the prize and address OR E-Mail details.<br><br>
                6.  Paycode Vouchers must be applied to a registered HAPPY CLOTHES online customer account via Happyclothes.co.uk by no later than the deadline specified on the Paycode Voucher and/or at the time the Paycode Voucher is issued by entering the relevant voucher code ("Paycode Voucher Code"), and will expire if not applied by this date. If the Paycode Voucher is applied before the expiry date, the customer account will be credited by the relevant amount.<br> <br>
                7.  If the order value is less than the Paycode Voucher value that has been credited to the customer account, no change or cash will be given. <br><br>
                8.  If the order value is more than the Paycode Voucher value that has been credited to the customer account, the remaining balance must be paid online using a debit or credit card.<br><br>
                9.  Paycode Vouchers and Paycode Voucher Codes are only valid for one use. Once the Paycode Voucher Code has been used (whether in an authorised or unauthorised manner), the Paycode Voucher Code will be void. Paycode Voucher recipients are responsible for ensuring that their Paycode Voucher Codes are not used by someone else.<br><br>
                10. The winner will be responsible for ensuring they are able to accept the prize as set out, including any expenses and arrangements involved in collecting and using the prize, and in accordance with these terms and conditions.  Prizes are not refundable, exchangeable, replaceable, redeemable, or transferable for cash under any circumstances. Prizes are subject to availability and HAPPY CLOTHES reserves the right to substitute any prize with a prize of equal value.<br><br>
                11. HAPPY CLOTHES reserves the right to reject any entries, including inappropriate entries or entries that do not enter into the spirit of the competition, for any reason at its sole discretion.<br><br>
                12. HAPPY CLOTHES reserves the right to withdraw the competition at any time without prior written notice and/or to alter or amend these terms and conditions at any time.  <br><br>
                13. The promoter of this competition is HappyCLothes.co.uk Limited.  The competition is run by HAPPY CLOTHES and is in no way sponsored, endorsed or administered by Twitter, Facebook or any other social media site.<br><br>
                14. HAPPY CLOTHES decision is final and binding in all matters relating to the competition and no correspondence will be entered into.<br><br>
                15. By submitting an entry, you grant HAPPY CLOTHES a worldwide, non-exclusive, royalty-free licence (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such entry in any and all media or distribution methods whether now known or later developed.<br><br>
                16. The winner agrees to the use of their name and image in any publicity material relating to the competition.  Any personal data that is collected as part of the competition will be processed in accordance with applicable UK data protection legislation.<br><br>
                17. Submitting an entry as described above will be deemed acceptance of these terms and conditions.<br><br>
                18. All standard terms and conditions from time to time for use of HAPPY CLOTHES website and services apply.<br><br>
                19. These terms and conditions and any dispute or claim (including a non-contractual dispute or claim) arising out of or in connection with these terms and conditions shall be governed by the laws of England and subject to the exclusive jurisdiction of the English courts.<br><br>
 
              </p>
            </div><!--terms-->
       </div> <!-- /.col-md-12 --> 
       <center><a href="http://happyclothes.co.uk/"><button type="button" class="go_back_btn">Go Back</button></a></center>
    </div> <!-- /.row --> 
  </div><!-- /.container -->

	<div class="container">
	  <div class="row">
         <div class="col-md-6">
         	<div class="follow">
            	Share with your network
            </div>
            
            <li>
            <div id="fb-root"></div>
            <li>
              <ul class="socila_icons">
                  <li><a href="#"><img id="share_button" src="images/fb-icon.png"></a></li>
                    <li><a class="twitter popup" href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fbeta.orderingonlinesystem.com&text=Happy%20Clothes%20Pre-launch%20Campaign"><img src="images/tw-icon.png"></a></li>
                    <li><a href="mailto:WriteYourFriendsEmailhere@please.com?subject=Pre-launch campaign&body=Pre-register with Happy Clothes for your chance to win 1 year free laundry and dry cleaning www.happyclothes.co.uk"><img src="images/email-icon.png"></a></li>
                </ul>
            </li>
          </ul>
         </div><!-- /.col-md-6 --> 
         <div class="col-md-6">
         	<div class="followus">
            <div class="follow">Follow Happy Clothes</div>
            
            <li>
            	<ul class="socila_icons">
                	<li><a href="https://www.facebook.com/happyclothesuk" target="_blank"><img src="images/fb-icon.png"></a></li>
                    <li><a href="https://twitter.com/happyclothesuk" target="_blank"><img src="images/tw-icon.png"></a></li>
                </ul>
            </li>
          </ul>
        	</div><!-- /.follow us --> 
         </div><!-- /.col-md-4 col-md-offset-4 --> 
                    
      </div><!-- /.row --> 
	</div><!-- /.container -->
   <script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script>
    

window.fbAsyncInit = function() {
  var appid= '<?php echo $_SESSION['facebookappid'];?>';
FB.init({appId: appid, status: true, cookie: true,
xfbml: true});
};
(function() {
var e = document.createElement('script'); e.async = true;
e.src = document.location.protocol +
'//connect.facebook.net/en_US/all.js';
document.getElementById('fb-root').appendChild(e);
}());
</script>

<script type="text/javascript">
$(document).ready(function(){
$('#share_button').click(function(e){
e.preventDefault();
FB.ui(
{
method: 'feed',
name: ' Happy Clothes Pre-launch Campaign ',
link: ' http://beta.orderingonlinesystem.com',
picture: 'http://beta.orderingonlinesystem.com/images/logo_cloths_fb.png',
caption: 'What is Happy Clothes?',
description: 'A happy appproach to laundry , dry cleaning & more (London Opening Oct 2015).',
message: ''
});
});
});
</script>
  </body>
</html>
  


