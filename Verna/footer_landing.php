<div class="container">
    <div class="row">
         <div class="col-md-6">
          <div class="follow">
          <?= $lang_resource['LANDING_SHARE'] ?>
              <!-- Share with your network -->
            </div>
            <div id="fb-root"></div>
            <li>
              <ul class="socila_icons">
                  <li><a href="#"><img id="share_button" src="images/fb-icon.png"></a></li>
                    <li><a class="twitter popup" href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fbeta.orderingonlinesystem.com&text=Happy%20Clothes%20Pre-launch%20Campaign "><img src="images/tw-icon.png"></a></li>
                    <li><a href="mailto:WriteYourFriendsEmailhere@please.com?subject=Pre-launch campaign&body=Pre-register with Happy Clothes for your chance to win 1 year free laundry and dry cleaning www.happyclothes.co.uk"><img src="images/email-icon.png"></a></li>
                </ul>
            </li>
          </ul>
         </div><!-- /.col-md-6 --> 
         <div class="col-md-6">
          <div class="followus">
            <div class="follow"><?= $lang_resource['LANDING_FOLLOW'] ?></div>
            
            <li>
              <ul class="socila_icons">
                  <li><a href="https://www.facebook.com/happyclothesuk"><img src="images/fb-icon.png"></a></li>
                    <li><a href="https://twitter.com/happyclothesuk"><img src="images/tw-icon.png"></a></li>
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
  var appid= '<?php echo $_SESSION['fbappid']?>';
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
name: ' Happy Clothes Pre-launch Campaign',
link: ' http://beta.orderingonlinesystem.com',
picture: 'http://beta.orderingonlinesystem.com/images/logo_cloths_fb.png',
caption: 'What is Happy Clothes?',
description: 'A happy appproach to laundry , dry cleaning & more (London Opening Oct 2015).',
message: ''
});
});
});
</script>