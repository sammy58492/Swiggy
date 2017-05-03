
<link href="panel/<?=$moduleName?>/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/css/new-stylesheet.css" />
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/css/popup_content.css" />
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/css/popup.css" />
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/css/responsive.css" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css' />    
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/css/dishscrollbar.css" />
<script type="text/javascript">
$(window).scroll(function() {
    if ($(this).scrollTop() > 1){  
        $('header').addClass("sticky");
		$('.navbar-brand').addClass("sticky_logo");
		$('.navigation').addClass("sticky_navigation");
    }
    else{
        $('header').removeClass("sticky");
		$('.navbar-brand').removeClass("sticky_logo");
		$('.navigation').removeClass("sticky_navigation");
    }
});
</script>
<link href="panel/<?=$moduleName?>/owl-carousel/owl.carousel.css" rel="stylesheet" />
<link href="panel/<?=$moduleName?>/owl-carousel/owl.theme.css" rel="stylesheet" />



<!--Reset counter start-->
<script type="text/javascript" src="panel/<?=$moduleName?>/counter_plugin/jquery.flipcountdown.js"></script>
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/counter_plugin/jquery.flipcountdown.css" />




<?php 
  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  $link = pg_connect($string);
  pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1'); 
  $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
  
  pg_prepare($link,'sqllangfetchpp','SELECT * FROM w_lang_setting WHERE enabled=$1'); 
  $result2 = pg_execute($link,'sqllangfetchpp',array('TRUE'));

?>

<!---Reset counter start-->
<div id="live_counter" <?php if($configRecUnchanged["isupdateBackupinsec"]==0){?>  style=" display:none;"<?php }?> >

<div class="live_counter">
    	<div class="container">
    		<div class="row">
    			<div class="col-md-9 col-sm-9 col-xs-7 col-lg-9"><span class="live_counter_text"><?=$lang_resource['MAIN_HEADER_PART_COUNT_DOWN']?></span></div>
    			<div class="col-md-3 col-sm-3 col-xs-5 col-lg-3"><span id="retroclockbox1" class="pull-right"></span></div>
    		</div>
        </div>
    </div>
</div>
<!---Reset counter  end-->	






<? if($business->pagetype == 'restaurant' && $configRec["sitepagesettings"] == 2 && $isbusinessheaderoff == 1)
        { ?>
        <div id="headerpart">
   	  <header id="header">
      <div id="hedlogbox"></div>
        <div  class="businessloading" ></div>
      </header>  
                </div>

        <? } else {?>
        
        
        <div id="headerpart">
        <header id="header">
       <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="<?=$configRec['siteurl']?>"><img src="<?=$configRec['siteurl']?>/panel/images/logo/1/normal.jpg" alt="logo"></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">              
             <ul class="navigation">
                <li><button onclick="Visuals.Trackorder()"><?= $lang_resource['INDEX_TRACK_ORDER'] ?></button></li>
                <li><button class="lognhead" data-toggle="modal" data-target="#hedlogbox"><?= $lang_resource['INDEX_LOGIN'] ?></button>

                
                </li>
                <li><button class="join_btn" onclick="Main.CommonAccount()"><?= $lang_resource['INDEX_JOIN_OUR_NETWORK'] ?></button></li>
               
                <?php if($counter == 1 ){ ?>       
                   <li>
                  
                      <select class="multi-lang" onchange="langChange(this.value)">
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
                 </li>
                  <?php } ?>

             </ul>
             
              <!--Login-->
              
              <!--Login-->
             
            </div><!--/.navbar-collapse -->
          </div>
        </nav>
        </header>
        
        </div>
        
        <div id="hedlogbox" class="modal fade" tabindex="-1" role="dialog" ></div>
        <? } ?>

    <div class="lang-dv-without-header" id="langdiv">
    	<div class="container">
        	<div class="row">
            	
                	<?php if($counter == 1 ){ ?>       
                  <div class="col-md-12">
                  
                      <select class="multi-lang" onchange="langChange(this.value)">
                      <?php    
                          while($row =pg_fetch_array($result2)){
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
            </div><!--row-->
        </div><!--container-->
    </div>
    
<script>
 function langChange(a){

  $.post("panel/lib/front-main.php", "f=langchangehistory&id="+a, function (f) {    
    location.reload();
  })
}
</script>

<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="panel/<?=$moduleName?>/js/bootstrap.min.js"></script>
<script src="panel/<?=$moduleName?>/owl-carousel/owl.carousel.js"></script>


