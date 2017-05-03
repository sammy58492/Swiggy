<!--<a href="" id="back-to-down"><img src="images/homeimage/bottom.png"></a>-->
<!--<a href="" id="back-to-middle-down"><img src="images/homeimage/bottom.png"></a>
<a href="" id="back-to-middle-top"><img src="images/homeimage/top.png"></a>
<a href="" id="back-to-top"><img src="images/homeimage/top.png"></a>-->

<div id="socialbtns"></div>
<div id="frontvisual"></div>
<div id="main">
    
    <div id="top"></div>
    <div id="left"></div>
    <div id="right" style="float:left; height:0;"></div>
    <div id="custom">
        <div id="custominfo"></div>
        <div  id="citychoose"  style="float:left;display:none"></div>
    </div>
    <div id="footerinfo" class="box"></div>
</div>
                    
<?php
    if($configRec["sitepagesettings"] == 2){ ?>
        <div class="subscribe_panel">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-md-offset-1">
                        <h3><?= $lang_resource['INDEX_SUBSCRIBE_TO_NEWSLETTER'] ?>:</h3>
                    </div><!--col-md-4-->
                    <div class="col-md-5">
                        <input type="text" class="subscribe_field" placeholder="<?= $lang_resource['INDEX_SUBSCRIBE_TO_NEWSLETTER_PLACEHOLDER'] ?>" id="sub_email">
                    </div><!--col-md-5-->
                    <div class="col-md-2">
                        <button type="button" class="subscribe_btn" onClick="Main.SubscribeEmail();"><?= $lang_resource['INDEX_SUBSCRIBE'] ?></button>
                    </div><!--col-md-5-->
                </div><!--row-->
            </div><!--container-->
        </div>
<?php } ?>
    <div id="loadingbox" style="display:none">
       <!--  <div id="progressbox">
            <div id="progressbar"> -->
                <div id="fountainG">
                    <div id="fountainG_1" class="fountainG"></div>
                    <div id="fountainG_2" class="fountainG"></div>
                    <div id="fountainG_3" class="fountainG"></div>

                    <p style="color:#fff;
                    text-align: center; margin-top:25px;
                    float:left; width:100%; font-family:Verdana, Geneva, sans-serif;">Loading</p>
                </div>
           <!--  </div>
        </div> -->
    </div>
    <div id="popupcontainer"></div>
    <div id="popupcontainerrs"></div>
    <div id="dishadded"></div>
    <div id="contextmenucontainer"></div>
    <div id="fb-root"></div>
    <div class="spiders"></div>


