
<!--<link href="css/bootstrap.min.css" rel="stylesheet">-->
<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/css/main_front.css"/>
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/css/dishscrollbar.css">

<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/font/fontcss.css">
<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/css/reservation.css"/>
<link type='text/css' rel='stylesheet' href='panel/<?=$moduleName?>/font/css.css'/>
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/font/stylesheet.css">
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/css/popup.css" />



<link  href="panel/<?=$moduleName?>/css/style.css" rel="stylesheet">
<!-- site Schedule popup -->
<link href="panel/<?=$moduleName?>/css/sorry-popup.css" rel="stylesheet" type="text/css">

<!--  site Schedule popup  -->
<!-- Date Picker -->
<link href="panel/<?=$moduleName?>/resources/datepicker/jquery.datepick.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="panel/<?=$moduleName?>/resources/datepicker/jquery.datepick.js"></script>
<!--Reset counter start-->
<script type="text/javascript" src="panel/<?=$moduleName?>/counter_plugin/jquery.flipcountdown.js"></script>
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/counter_plugin/jquery.flipcountdown.css" />
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/datetimepicker-master/jquery.datetimepicker.css"/>


<?php 
  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  $link = pg_connect($string);
  pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1'); 
  $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));

?>

<!---Reset counter start-->
<div id="live_counter" <?php if($configRecUnchanged["isupdateBackupinsec"]==0){?>  style=" display:none;"<?php }?> >

<div class="live_counter">
    	<div class="main">
        	<div class="pull_right counterMainBx" ><span  class="pull_left counterSubbx"  ><?=$lang_resource['MAIN_HEADER_PART_COUNT_DOWN']?></span>  <span id="retroclockbox1" class="pull_left"></span></div>
        </div><!--main-->
    </div><!--live_counter-->

</div>
<!---Reset counter  end-->	


<div class="maincontainer">

 <? if($business->pagetype == 'restaurant' && $configRec["sitepagesettings"] == 2)
        {  ?>
    <div class="main cmain" id="headerpart">
   	<div class="header"  id="header">
     <div id="hedlogbox"></div>
      </div><!--header-->
    </div>
    <? } else { ?>
<div class="main cmain" id="headerpart">
   	  <div class="header"  id="header">
      
        	<div class="logo" id="logo"><a href="<?=$configRec['siteurl']?>"><img src="<?=$configRec['siteurl']?>/panel/images/logo/1/normal.jpg" style="height:80px;" alt="logo"></a></div><!--logo-->
            
            <div class="header_right">
            	<div class="h_right_up">
                <div class="help_dv">
                
                	<div class="mobile"><a href="mobile.php"><span class="pull_left"><img src="images/homeimage/mob-icon.png"></span> <span class="text"><?= $lang_resource['INDEX_MOBILE'] ?> |</span></a></div><!--mobile-->
                    <div class="mobile"><a href="<?=$configRec['helppagelink']?>"><span class="pull_left"><img src="images/homeimage/icon-help.png"></span> <span class="text"><?= $lang_resource['INDEX_NEED_HELP'] ?></span></a></div><!--mobile-->
                    
                </div><!--help_dv-->
                  <div class="h_social_dv">
                   
                    
                    <?php  if($configRec['twitterlink']) {?>
                    	<a href="http://www.twitter.com/<?=$configRec['twitterlink']?>"  target="new" style="display: block;float: left;margin: 0 2px;">
                       <img src="images/homeimage/Twitter.png" alt=""/>
                       </a>
                     <?php }?>
                      
                     <?php
					 if($configRec['facebooklink']) {?>
                     <a href="http://www.facebook.com/<?=$configRec['facebooklink']?>" target="new" style="display: block;float: left;margin: 0 2px;">
                  	 <img src="images/homeimage/Facebook.png" alt=""/>
                     </a>
                    <?php } ?>
                    <?php
					 if($configRec['gpluslink']) {?>
                      <a href="<?=$configRec['gpluslink']?>" target="new" style="display: block;float: left;margin: 0 2px;">
                   	 <img src="images/homeimage/Google.png" alt=""/>
                     </a>
                    <?php } ?>
                    <?php
					 if($configRec['linkendinlink']) {?>
                      <a href="<?=$configRec['linkendinlink']?>" style="display: block;float: left;margin: 0 2px;">
                  	 <img src="images/homeimage/LinkedIn.png" alt=""/>
                     </a>
                    <?php } ?>
                    <?php
					 if($configRec['rsslink']) {?>
                      <a href="<?=$configRec['rsslink']?>" style="display: block;float: left;margin: 0 2px;">
                    <img src="images/homeimage/Feed.png" alt=""/>
                    </a>
                    <?php } ?>

					<?php
                    if($configRec['instagramlink']) {?>
                    <a href="<?=$configRec['instagramlink']?>" style="display: block;float: left;margin: 0 2px;">
                    <img src="images/homeimage/instagram.png" alt=""/>
                    </a>
                    <?php } ?>
                      

                    
                  </div><!--h_social_dv-->
   <?php if($counter == 1 ){ ?>       
  <div class="lang_combo_dv">
  
      <select class="field_lang" onchange="langChange(this.value)">
      <?php    
          while($row =pg_fetch_array($result1)){
              echo $row['id'];
              if($row['id'] == $_SESSION['l']){  
                $selectdvar = 'selected';
              }else{
                $selectdvar = ''; 
              } 
      ?>
      <option value="<?php echo $row['id']; ?>" <?php echo $selectdvar ?> ><?php echo $row['lang_text']; ?></option>
      <?php  } ?>            
      </select>
  </div>
  <?php } ?>
  <!--lang_combo_dv-->


                  </div><!--h_right_up-->
                <div class="h_right_bottom">
                    <div class="btn_top">
                        <button type="button" class="join_btn"   onclick="Main.CommonAccount()" ><?= $lang_resource['INDEX_JOIN_OUR_NETWORK'] ?></button>
                    </div>
                    <div class="btn_top">
                        <button type="button" class="login lognhead" id="lo" onClick="opnlogin();" ><?= $lang_resource['INDEX_LOGIN'] ?></button>
                        <div id="hedlogbox"></div>
                    </div>
                    <div class="btn_top">
                        <button type="button" class="track_order_btn"  id="tr"><?= $lang_resource['INDEX_TRACK_ORDER'] ?></button>
                        <div class="popdiv" style="display:none;">
                          <div class="pops_divs">
                          <div class="pop_top"></div>
                          <div class="pop_mid">
                          <p><?=$lang_resource['INDEX_TRACK_ORDER_1']?></p>
                          <div class="sprt_line"></div>
                          <span><?=$lang_resource['INDEX_ENTER_YOUR_ORDER_ID']?></span><br clear="all" />
                          <input type="text" class="pop_text" name="trckid" id="consultorder" onKeyUp="Main.CheckOrderEnter(event);"/>
                          <div class="sprt_line"></div>
                          <br clear="all" />
                          <input type="button" class="trcknw" value="<?= $lang_resource['TRACKNOW_V21'] ?>" onClick="Main.CheckOrder(event);"/>
                          <div class="showOrdhide" style="display:none;">
                          <span style="padding-left:11px;"><span style="float:left"><?=$lang_resource['INDEX_YOUR_ORDER_STATUS']?></span> <div class="odrstus" style="color:#F00; float:left; margin: 10px 0px 0px 10px;"></div></span>
                          <div class="showOrd" onClick="Visuals.OpenEachOrder(document.getElementById('consultorder').value);" ><?=$lang_resource['INDEX_SHOW_ORDER']?></div>
                          </div>
                          </div>
                          <div class="pop_btm"></div>
                          </div>
                          </div>
                    </div>   
                </div><!--h_right_bottom-->
            </div><!--header_right-->
        </div><!--header-->
    </div>
    <? }?>
    
<script>
 function langChange(a){

  $.post("panel/lib/front-main.php", "f=langchangehistory&id="+a, function (f) {    
    location.reload();
  })
}
</script>