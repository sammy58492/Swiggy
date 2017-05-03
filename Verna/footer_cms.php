<div class="footer" id="footer">
        	<div class="main">
            	 <!--FOR CMS FOOTER -->
               <div class="ft_coll">
                	<h4><?=$lang_resource['FOOTER_SITE_MAP'];?></h4>
                     <ul>
                    	<? $datapanel1 = FetchAllpanelCustomCMS("Panel1");
					 foreach($datapanel1 as $data1) { 
					 
					
					 ?>
                     
					<li><a href="<?php echo base64_encode('CMS')."_".base64_encode($data1->id)."_".$data1->pageurl;?>" target=""><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                    <? $datapanel1 = FetchAllpanelCustom("Panel1");
					 foreach($datapanel1 as $data1) { ?>
					<li><a href="<?php echo $data1->pageurl;?>" target="_blank"><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                    </ul>
                </div>
                
                <div class="ft_coll">
                	<h4><?=$lang_resource['FOOTER_BUSINESS_OWNERS'];?></h4>
                    <ul>
                    	<? $datapanel2 = FetchAllpanelCustomCMS("Panel2");
					 foreach($datapanel2 as $data2) { ?>
					<li><a href="<?php echo base64_encode('CMS')."_".base64_encode($data2->id)."_".$data2->pageurl;?>" target=""><?php echo $data2->pagename;?></a></li>
                    <? } ?>
                    <? $datapanel1 = FetchAllpanelCustom("Panel2");
					 foreach($datapanel1 as $data1) { ?>
					<li><a href="<?php echo $data1->pageurl;?>" target="_blank"><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                    </ul>
                </div>
                
                <div class="ft_coll">
                	<h4><?=$lang_resource['FOOTER_SUPPORT_INFORMATION'];?></h4>
                    <ul>
                    	<? $datapanel3 = FetchAllpanelCustomCMS("Panel3");
					 foreach($datapanel3 as $data3) { ?>
					<li><a href="<?php echo base64_encode('CMS')."_".base64_encode($data3->id)."_".$data3->pageurl;?>" target=""><?php echo $data3->pagename;?></a></li>
                    <? } ?>
                    <? $datapanel1 = FetchAllpanelCustom("Panel3");
					 foreach($datapanel1 as $data1) { ?>
					<li><a href="<?php echo $data1->pageurl;?>" target="_blank"><?php echo $data1->pagename;?></a></li>
                    <? } ?>
                    </ul>
                </div>
                
              <div class="ft_coll">
                	<h4><?= $lang_resource['FOOTER_WE_ACCEPT'] ?></h4>
                  <ul>
                   	  <li><a href="#"><img src="images/homeimage/paypal.png"></a></li>
                      <li><a href="#"><img src="images/homeimage/pay-logo-1.png" width="67" height="42"></a>&nbsp;&nbsp;<a href="#"><img src="images/homeimage/pay-logo-2.png" width="68" height="42"></a></li>
                      <li></li>
                  </ul>
                </div><!--ft_coll-->
            </div><!--main-->
        </div><!--footer-->
         <div class="footer2">
        	<div class="main">
            	<div class="ft_logo" id="footer_logo1">
                	<a href="#"><img src="<?=$configRec['siteurl']?>/panel/images/logo/3/normal.jpg" width="192" height="29"></a>
                </div><!--ft_logo-->
                <div class="footertxt" id="footcustomtxt" >
                	
                </div>
            </div><!--main-->
        </div><!--footer-->
        
      





<?php
$cur_page = basename($_SERVER['PHP_SELF']); /* Returns The Current PHP File Name */
?>
<script>
$(".carousel").jCarouselLite({
	btnNext: ".next",
    btnPrev: ".prev",
	visible: 6
});

    $(document).ready(function(){
      $('#hedlogbox').click(function(event){
        console.log('click - form');
        event.stopPropagation();
      });
      $('html').click(function(event){
        console.log('click - body');
        //hide the form if the body is clicked
        $('.popdiv_pop').css('display','none');
      });
      $('#lo').click(function(event){
		 document.getElementById("hedlogbox").style.display = "";
        $('.popdiv').hide();
		$('.popdiv_pop').toggle();
        event.stopPropagation();
      });

    });
	
	 $(document).ready(function(){
      $('.popdiv').click(function(event){
        console.log('click - form');
        event.stopPropagation();
      });
      $('html').click(function(event){
        console.log('click - body');
        //hide the form if the body is clicked
        $('.popdiv').css('display','none');
      });
      $('#tr').click(function(event){
        
		$('.popdiv_pop').hide();
		$('.popdiv').toggle();
        event.stopPropagation();
      });

    });
</script>

</div>
<body>
</html>
