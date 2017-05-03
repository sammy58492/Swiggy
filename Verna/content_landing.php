<div class="openingad">
<div class="container">
    <div class="row">
      <?php echo $landingSetData->page_content?>
       <!--  <div class="col-md-7">     
          <h1>What is Happy Clothes?</h1>
            <p>A happy appproach to laundry , dry cleaning & more (London Opening Oct 2015).</p>
       </div> <!-- /.col-md-7 -->    
          
          <!-- <div class="col-md-5">     
          <h2>#HAPPYYEAR</h2>
       </div> <!-- /.col-md-5 -->   
          
    </div> <!-- /.row --> 
  </div><!-- /.container -->
 </div><!-- /.openingad -->

<div class="container laundry_content">
    <div class="row">
       <div class="col-md-7">     
           <div class="laundry_icons">
            <div class="circle_icons">
                  <div class="icon"><img src="images/icon1.png" id="icon1" class="img-responsive" alt="Responsive image"></div> <!-- /.icon -->
                    <div class="icon_content"><h3><?= $lang_resource['LANDING_ENTER_POSTCODE'] ?></h3></div> <!-- /.icon_content -->
                </div> <!-- /.circle_icons -->
                <div class="circle_icons">
                    <div class="icon"><img src="images/icon2.png" id="icon2" class="img-responsive" alt="Responsive image"></div> <!-- /.icon -->
                    <div class="icon_content"><h3><?= $lang_resource['LANDING_PAY_CASH_CARD'] ?></h3></div> <!-- /.icon_content -->
                </div> <!-- /.circle_icons -->
                <div class="circle_icons" style="border:none;">
                    <div class="icon"><img src="images/icon3.png" id="icon3" class="img-responsive" alt="Responsive image"></div> <!-- /.icon -->
                    <div class="icon_content"><h3><?= $lang_resource['LANDING_DELIVERY'] ?></h3></div> <!-- /.icon_content -->
                </div> <!-- /.circle_icons -->
                
          </div> <!-- /.laundry_icons -->
       </div> <!-- /.col-md-7 --> 
       
       <div class="col-md-5">     
          <div class="home_signup">
          <?= $lang_resource['LANDING_OFFER'] ?>
          
          <form class="login_form">
      <?php if($landingSetData->name_enabled=="t")
      {?>
          <div class="form-group">
           <label for="exampleInputName"><?php echo $landings->name ?>*</label>
           <input type="text" class="form-control input-lg" id="exampleInputName">
        </div>
        <?php } ?>
         
         <?php if($landingSetData->postcode_enabled=="t")
      {?>
         <div class="form-group">
       <label for="exampleInputPostcode"><?php echo $landings->postcode ?>*</label>
       <input type="text" class="form-control input-lg" id="exampleInputPostcode">
     </div>
         <?php } ?>

          <?php if($landingSetData->email_enabled=="t")
      {?>
         <div class="form-group">
       <label for="exampleInputEmail1"><?php echo $landings->email ?>*</label>
       <input type="email"  class="form-control input-lg" id="exampleInputEmail1">
     </div>
     <? } ?>
    
      <div class="checkbox">
       <?php if($landingSetData->terms_conditions_enabled=="t")
      {?>
        <input type="checkbox" id="check" class="checkbox_name"> <label><a href="term.php" target="_blank"><?php echo $landings->terms_conditions ?></a></label>
        <? }?>
     </div>
      
    
    
      <div style="display: none;" id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        </div>
       
        <div class="openingad">
          <h3>Thank you, <span id="name"></span>!</h3>
        </div><!-- /.openingad -->
        
        <div class="modal-body modal_body">
          <p>You have successfully pre-registered with Happy Clothes for your 
chance to win <span style="font-weight:700;">1 Year Free</span> Laundry & Dry Cleaning.</p><br/>


          <h4>#HAPPYYEAR</h4>
    
        </div>
        <div class="modal-footer">
            <div class="modal-follow col-md-4 col-xs-offset-3">
            <div class="follow">Follow Happy Clothes</div>
            
            <li>
              <ul class="socila_icons">
                  <li><a href="https://www.facebook.com/happyclothesuk"><img src="images/fb-icon.png" class="img-responsive"></a></li>
                    <li><a href="https://twitter.com/happyclothesuk"><img src="images/tw-icon.png" class="img-responsive"></a></li>
                </ul>
            </li>
          </ul>
          </div><!-- /.follow us --> 
        </div>

      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
    
      
       <div class="form-group submitgroup">
                        <button type="button" class="btn btn-primary btn-login" id="userPassword"  data-toggle="modal"   onclick="Main.SubscribeEmailLanding();"><?= $lang_resource['LANDING_FRONT_SUBMIT'] ?></button>
                    </div>
               
        </form>
         
         
         
          </div> <!-- /.home_signup --> 
       </div> <!-- /.col-md-5 --> 
    </div> <!-- /.row --> 
  </div><!-- /.container -->
<!-- <div class="fb-follow" data-href="https://www.facebook.com/oosmain" data-layout="standard" data-show-faces="true"></div> -->