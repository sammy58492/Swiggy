<? if($business->pagetype == 'restaurant' && $configRec["sitepagesettings"] == 2 && $isbusinesspagefootersetting == 1)
        { ?>
        <footer id="footer">
      	<div class="container">
        	<div class="row">
		
        </div><!--row-->
        </div><!--container-->
      </footer>
		
		<? } else { ?>
            <footer id="footer">
            <div class="container">
            <div class="row">
            	 <!--FOR CMS FOOTER -->

               <div class="col-md-3 col-sm-6">
                <ul class="ft_nav">
	                <li><?=$lang_resource['FOOTER_SITE_MAP'];?></li>
                    	<? $datapanel1 = FetchAllpanelCustomCMS("Panel1");
					 foreach($datapanel1 as $data1) { 
					 
					
					 ?>
                     
					<li><a href="<?php echo base64_encode('CMS')."_".base64_encode($data1->id)."_".$data1->pageurl;?>" target="_self"><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                    <? $datapanel1 = FetchAllpanelCustom("Panel1");
					 foreach($datapanel1 as $data1) { ?>
					<li><a href="<?php echo $data1->pageurl;?>" target="_self"><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                   </ul>
                </div>
                
               <div class="col-md-3 col-sm-6">
                <ul class="ft_nav">
	                <li><?=$lang_resource['FOOTER_BUSINESS_OWNERS'];?></li>
                    	<? $datapanel2 = FetchAllpanelCustomCMS("Panel2");
					 foreach($datapanel2 as $data2) { ?>
					<li><a target="_self" href="<?php echo base64_encode('CMS')."_".base64_encode($data2->id)."_".$data2->pageurl;?>" ><?php echo $data2->pagename;?></a></li>
                    <? } ?>
                    <? $datapanel1 = FetchAllpanelCustom("Panel2");
					 foreach($datapanel1 as $data1) { ?>
					<li><a target="_self" href="<?php echo $data1->pageurl;?>"><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                    </ul>
                </div>
                
                
                <div class="col-md-3 col-sm-6">
                <ul class="ft_nav">
	                <li><?=$lang_resource['FOOTER_SUPPORT_INFORMATION'];?></li>

                    	<? $datapanel3 = FetchAllpanelCustomCMS("Panel3");
					 foreach($datapanel3 as $data3) { ?>
					<li><a target="_self" href="<?php echo base64_encode('CMS')."_".base64_encode($data3->id)."_".$data3->pageurl;?>" ><?php echo $data3->pagename;?></a></li>
                    <? } ?>
                    <? $datapanel1 = FetchAllpanelCustom("Panel3");
					 foreach($datapanel1 as $data1) { ?>
					<li><a target="_self" href="<?php echo $data1->pageurl;?>"><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                    </ul>
                </div>
                
                
                <div class="col-md-3 col-sm-6">
                <ul class="ft_nav">
	                <li><?= $lang_resource['FOOTER_WE_ACCEPT'] ?></li>
                    <li>
                      <span><a href="javascript:void(0)" target="_self"><img src="images/homeimage/paypal.png" alt="paypal"></a></span>
                        <span><a href="javascript:void(0)" target="_self"><img src="images/homeimage/pay-logo-1.png" alt="pay-logo-1"></a></span>
                        <span><a href="javascript:void(0)" target="_self"><img src="images/homeimage/pay-logo-2.png" alt="pay-logo-2"></a></span>
                        </li>


                </ul>
                </div>

                
                
            </div><!--row-->
        </div><!--container-->
      </footer>
        
      <?php if($configRec['gpluslink'] !="" || $configRec['twitterlink'] !="" || $configRec['facebooklink'] !="" || $configRec['linkendinlink'] !="") { ?>  
       <div class="small_footer">
      	<div class="container">
        	<div class="row">
            	<div class="col-md-12">
                	<ul>
                  <?php if($configRec['gpluslink']) { ?>
                        <li><a target="_self" href="<?=$configRec['gpluslink']?>"><img src="panel/<?=$moduleName?>/images/social-1.png" alt="social-1"></a></li>
                  <?php } if($configRec['twitterlink']) { ?>
                        <li><a target="_self" href="http://www.twitter.com/<?=$configRec['twitterlink']?>"><img src="panel/<?=$moduleName?>/images/social-2.png" alt="social-2"></a></li>
                  <?php } if($configRec['facebooklink']) { ?>
                        <li><a target="_self" href="http://www.facebook.com/<?=$configRec['facebooklink']?>"><img src="panel/<?=$moduleName?>/images/social-3.png" alt="social-3"></a></li>
                  <?php } if($configRec['linkendinlink']) { ?>
                        <li><a target="_self" href="<?=$configRec['linkendinlink']?>"><img src="panel/<?=$moduleName?>/images/social-4.png" alt="social-4"></a></li>
                  <?php } ?>
                    </ul>
                </div><!--col-md-12-->
            </div><!--row-->
        </div><!--container-->
      </div> 
       <?php } ?>  
  
<?  }  ?>

<?php
$cur_page = basename($_SERVER['PHP_SELF']); /* Returns The Current PHP File Name */
?>