<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/bootstrap.min.css" rel="stylesheet">
<link type='text/css' rel='stylesheet' href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/bootstrap.min.css?rand=<?=rand()?>"/>


<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/custom.css">
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/widget-responsive-style.css">
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/popup.css">
 <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>

<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/css/iscroll.css">
<link rel="stylesheet" type="text/css" href="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/fonts/licidastyles.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/bootstrap.min.js?rand=<?=rand()?>"/></script>
<script type="text/javascript" src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/js/iscroll.js"/></script>


<?php 
  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  $link = pg_connect($string);
  pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1'); 
  $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));

?>

<!---Reset counter start-->
<div id="live_counter" <?php if($configRecUnchanged["isupdateBackupinsec"]==0){?>  style=" display:none;"<?php }?> >

<div class="live_counter">
    	<div class="container">
        	<div class="pull_right counterMainBx" ><span  class="pull_left counterSubbx"  ><?=$lang_resource['MAIN_HEADER_PART_COUNT_DOWN']?></span>  <span id="retroclockbox1" class="pull_left"></span></div>
        </div><!--main-->
    </div><!--live_counter-->

</div>
<!---Reset counter  end-->	


<div id="headerpart">


  <div class="header" id="header" style="display:none">


    <div class="container">
    <div class="row">
      <div class="col-md-9"></div>
      <div class="col-md-3">
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
      </div>
    </div>
    	<div class="row">
            <div class="col-md-3">
                <div class="logo" ><a href="<?=$configRec['siteurl']?>"><img src="<?=$configRec['siteurl']?>/panel/images/logo/1/<?=$_SESSION['scriptid']?>/normal.jpg"></a></div>
            </div>
            <div class="col-md-9">  	
                <div class="header_right">
                    <ul>
                        <li><a href="javascript:void(0)" id="tr"><?= $lang_resource['INDEX_TRACK_ORDER'] ?></a>
                        <div class="popdiv" style="display:none;">
                          <div class="pops_divs">
                          <div class="pop_top"></div>
                          <div class="pop_mid">
                          <p><?=$lang_resource['INDEX_TRACK_ORDER_1']?></p>
                          <div class="sprt_line"></div>
                          <span style=""><?=$lang_resource['INDEX_ENTER_YOUR_ORDER_ID']?></span><br clear="all" />
                          <input type="text" class="pop_text" name="trckid" id="consultorder" onKeyUp="Main.CheckOrderEnter(event);" style=""/>
                          <div class="sprt_line"></div>
                          <br clear="all" />
                          <input type="button" class="trcknw" value="<?= $lang_resource['TRACKNOW_V21'] ?>" onClick="Main.CheckOrder(event);"/>
                          <div class="showOrdhide" style="display:none;">
                          <span style="padding-left:11px;"><span style="float:left"><?=$lang_resource['INDEX_YOUR_ORDER_STATUS']?></span> <div class="odrstus" style="color:#F00; float:left; margin: 10px 0px 0px 10px;"></div></span>
                          <div class="showOrd" onClick="Main.ShowOrderPop();" ><?=$lang_resource['INDEX_SHOW_ORDER']?></div>
                          </div>
                          </div>
                          <div class="pop_btm"></div>
                          </div>
                          </div>
                        
                        </li>
                        <li><a href="javascript:void(0)" id="lo" class="lognhead" onClick="opnlogin();">Login</a>
                         <div id="hedlogbox"></div>
                        
                        
                        </li>
                        <li><a href="javascript:void(0)" class="join_btn" onclick="Main.EditAccount(true)">Sign up</a></li>
                        <li><a href="javascript:RestMenuList.OpenCartCheck()" id="checkout_cart"><img src="panel/<?=$moduleName?>/<?=$DeviceType?>/theme/<?=$fetch_switching_theme['name']?>/assets/images/cart.png" alt=""><div class="cartno">0</div></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

   	  <!--header-->
    
</div>    
    
<script>
 function langChange(a){

  $.post("panel/lib/front-main.php", "f=langchangehistory&id="+a, function (f) {    
    top.location = "/"
  })
}
</script>
