<?php
require_once("../panel/lib/front-main.php");
require("../languages/lang.en.php");

$ste_url=$_SERVER['HTTP_HOST'];
$data=json_decode(stripslashes($_REQUEST["data"]),true);
$background_color='#f2f2f2';
if($data["bgcolor"]!=''){
	$background_color=$data["bgcolor"];
}
$DeviceType="desktop";
if($data["devicetype"]!=''){
	$DeviceType=$data["devicetype"];
}
$businesspagprograssbarsetting='f';
$businesspageheadersetting='f';
$businesspagefootersetting='f';
if($data["footerhide"]!=''){
	$businesspagefootersetting=$data["footerhide"];
}

if($data["headerhide"]!=''){
	$businesspageheadersetting=$data["headerhide"];
}

if($data["progressbarhide"]!=''){
	$businesspagprograssbarsetting=$data["progressbarhide"];
}

if($data["business_id"]!=''){
	$busineesid=$data["business_id"];
}

require('../panel/config.php');
  $link = ConnectDB($CFG);
  pg_prepare($link,'sql44','SELECT * from w_business where id=$1 ');
       $result = pg_execute($link,'sql44',array($busineesid));

       //$settings = array();
		$business=array();
       $row = pg_fetch_array($result);
               
				  	$business_id=$row["id"];
				    $business[$row["id"]]=$row["name"];

				    $business_customslug=$row["customslug"];
				    $business_strt=$row["street"];
					$business_colony=$row["colony"];
					$business_city=$row["city"];

				    //$business_schedule=json_decode(parse($row["schedule"]));

				    $phpArray = json_decode($row["schedule"], true);
					// print_r($phpArray);
					//  echo "<pre>";
			   		$openh= $phpArray[sdays][1][opens][hour];
			   		if(strlen($openh)<2)
			   		{
			   			 $openh="0".$openh;
			   		}
			   		
			   		$openm= $phpArray[sdays][1][opens][minute];
			   		if(strlen($openm)<2)
			   		{
			   			 $openm="0".$openm;
			   		}
			   		$closesh= $phpArray[sdays][1][closes][hour];

			   		if(strlen($closesh)<2)
			   		{
			   			 $closesh="0".$closesh;
			   		}
			   		 $closesm =$phpArray[sdays][1][closes][minute];
			   		if(strlen($closesm)<2)
			   		{
			   			 $closesm="0".$closesm;
			   		}
			   		//echo implode($phpArray);

			   		
			   		
			   		
			   	
	 pg_prepare($link,'sql45','SELECT city from w_franchises where id=$1 ');
     $result2 = pg_execute($link,'sql45',array($business_city));
     $row2=pg_fetch_array($result2);
     $city=$row2['city'];
     

     

	pg_prepare($link,'sql01','SELECT * FROM w_review where id_w_business=$1');
	$result3 = pg_execute($link,'sql01',array($busineesid));
	$row3=pg_fetch_array($result3);
		

			$reviewid = $row3['id'];
		    $review_id_w_business = $row3['id_w_business'];
			$review_quality = $row3['quality'];
			$review_delivery = $row3['delivery'];
			$review_dealer = $row3['dealer'];
			$review_packagec = $row3['package'];
			$total=$review_quality+$review_delivery+$review_dealer+$review_packagec;
			$avg=$total/4;
			$review_ratings=$avg;
			
			
			
			



?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
	

	<link href="<?='http://'.$ste_url?>/restrowidget/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?='http://'.$ste_url?>/restrowidget/css/custom.css">
    <link rel="stylesheet" type="text/css" href="<?='http://'.$ste_url?>/restrowidget/css/widget-responsive-style.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>




	

	

  


<style type="text/css">
#link                {
        height: 92px;
        width: 350px;
        display: block;
}

/*#nav {
    float: left;
    width: 280px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    border-left: 1px solid #999;
}
#nav li a {
    display: block;
    padding: 10px 15px;
    background: #ccc;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #999;
    text-decoration: none;
    color: #000;
}
#nav li a:hover, #nav li a.active {
    background: #999;
    color: #fff;
}
#nav li ul {
    display: none; // used to hide sub-menus
}
#nav li ul li a {
    padding: 10px 25px;
    background: #ececec;
    border-bottom: 1px dotted #ccc;
}*/

</style>

</head>

<body   style="background:<?= $background_color?>!important; " >

<input type="hidden" name="DeviceType" id="DeviceType" value="<?php echo $DeviceType; ?>">
<input type="hidden" name="businesspagefootersetting" id="businesspagefootersetting" value="<?php echo $businesspagefootersetting; ?>">
<input type="hidden" name="businesspageheadersetting" id="businesspageheadersetting" value="<?php echo $businesspageheadersetting; ?>">

<input type="hidden" name="businesspagprograssbarsetting" id="businesspagprograssbarsetting" value="<?php echo $businesspagprograssbarsetting; ?>">




 <div class="rest_menu_banner_dv">
        	<div class="top-panel">
            	<!-- <div class="item_dv">
                	<h3>You have 5 items</h3>
                    <span><button type="button"><img src="images/cart-icon.png"></button></span>
                </div><!--item_dv--> -->
            </div><!--top-panel-->
        </div><!--rest_menu_banner_dv-->
        <div class="rest-bottom-panel">
            	<div class="container">
                	<div class="row">
                    	<div class="col-md-1">
                          <div class="menu_rest_logo">
                            <a href="#"><img src="../panel/images/business/<?php echo $business_id;?>/panel.jpg?c=1444895980978"></a>
                          </div><!--menu_rest_logo-->
                        </div><!--col-md-1-->
                        <div class="col-md-3">
                        	<div class="menu_rest_dsp">
                        	<h3><?php echo $business[$row["id"]];?></h3>
                            <p><?php echo $business_strt .','.$city?></p>
                        </div>
                        </div><!--col-md-2-->
                        <div class="col-md-3">
                        	<div class="reating_dv_menu">
                                <ul class="pull-left">

							 <?php
								echo'<li><a href="#">';
								for($k=1;$k<6;$k++){
								if($avg+1>$k)
									$src="images/star-yellow.png";
								else 
									$src="images/star-grey.png";
								echo '<img src="'.$src.'">';
							}
				            echo '</a></li>';
					
        					?>

                                  
                                </ul>
                                <div class="reating_text_menu">( <?php echo $avg?> Ratings)</div>
                                <div class="menu_payment_logos">
                                	<span>We Accept:</span>
                                    <ul>
                                    	<li><a href="#"><img src="images/visa.png"></a></li>
                                        <li><a href="#"><img src="images/mestro.png"></a></li>
                                        <li><a href="#"><img src="images/paypal.png"></a></li>
                                    </ul>
                                </div><!--menu_payment_logos-->
                            </div><!--reating_dv_menu-->
                        </div><!--col-md-4-->
                        <div class="col-md-4">
							<div class="menu_other_dsp">
                        	<ul class="payment-time">
                                <li>
                                    <span class="icon">
                                    <img src="images/time-icon-white.png">
                                    </span> Opening Time : <?php echo $openh;?>:<?php echo $openm?> AM - <?php echo $closesh?>:<?php echo $closesm?> PM
                                </li>
                                <li>
                                    <a href="#">
                                    <span class="icon"><img src="images/favourite-icon-white.png"></span>
                                     Add to Favourite
                                    </a>
                                </li>
                            </ul>
                            </div><!--menu_other_dsp-->
                        </div><!--col-md-4-->
                    </div><!--row-->
                </div><!--container-->
        </div><!--bottom-panel-->
        <div class="container">
        	<div class="row">
            	<div class="col-md-12">
                	<ul class="manu_tabs" id="nav">
                    	<li><a href="#" class="active">Menu</a></li>

                        <li><a href="#">Info</a></li>
                        <li><a href="#">Reviews</a></li>
                        <li><a href="#">Offers</a></li>
                        <li><a href="#">Reservation</a></li>
                    </ul>
                </div><!--col-md-12-->
            </div><!--row--><div class="menu_search_section">
            <div class="row">
            	
            	<div class="col-md-6">
            		 <?php
			            pg_prepare($link,'sql12','SELECT * from w_categories where business=$1 and enabled=$2');
			       		$result = pg_execute($link,'sql12',array($busineesid,"TRUE"));
						

					?>


                	<select class="form-control select_category" id="category" >
                    	<option value="0">Select categories</option>
                    	<?php 
                    	while($rowcat = pg_fetch_array($result))
						{
						$catid=$rowcat['id'];
						$catname=$rowcat['name'];
						?>
                        <option value="<?php echo $catid ?>"><?php echo $catname?></option>
                        <?php } ?>
                	
                    </select>
                </div><!--col-md-6-->
                <div class="col-md-6">
                <form id="live-search" action="" class="styled" method="post">
                <fieldset>
                	<input type="text" id="filter" class="form-control search_icon" placeholder="Search here">
                </fieldset>
                </div><!--col-md-6-->
             
            </div><!--row-->
            </div><!--menu_search_section-->

             <?php
            pg_prepare($link,'sql11','SELECT w_dishes.*,w_categories.id as cat_id, w_categories.name as cat_name from w_dishes INNER JOIN w_categories on w_dishes.category=w_categories.id where w_dishes.business=$1 and w_dishes.enabled=$2');
       $result = pg_execute($link,'sql11',array($busineesid,"TRUE"));

       //$settings = array();
		$menu=array();
       while($rowmenu = pg_fetch_array($result))
               {
				  
				   //$menubusiness=rowmenu["business"];
				   $menuname=$rowmenu["name"];
				   $menuprice=$rowmenu["price"];
				   $menudesc=$rowmenu["description"];
				   $menuimage1=$rowmenu["isimg"];
				   $menuid=$rowmenu["id"];
				   $menucatid=$rowmenu["cat_id"];
				   $menucatname=$rowmenu["cat_name"];
			   	   
			   ?>
			<div id="<?php echo $menucatid?>" class="toggleable">
            <h3 class="category_heading"><?php echo $menucatname ?></h3>
            <div class="row">
            	<div class="col-md-6">
                	<div class="product_dv">
                    	<div class="row">
                        	<div class="col-md-8">
                            	<div class="prodict_img">
                                	<img src="../panel/images/dishes/<?php echo $menuid."/".$menuimage1?>/panel.jpg">
                                </div><!--prodict_img-->
                                <div class="product_dsp">
                                	<h3><?php echo $menuname?></h3>
                                    <p><?php echo $menudesc?></p>
                                </div><!--product_dsp-->
                            </div><!--col-md-8-->
                            <div class="col-md-4">
                            	<div class="product_price_dv">
                                	<h3><?php $menuprice ?></h3>
                                    <button type="button" class="adtocart">+</button>
                                </div><!--product_price_dv-->
                            </div><!--col-md-4-->
                        </div><!--row-->
                    </div><!--product_dv-->
                </div><!--col-md-6-->
               
            </div><!--row-->
            </div>
            <?php } ?>
            <!-- <form name="form"> 
			  First name: <input type="text" name="fname"><br>
			  Last name: <input type="text" name="lname"><br>
			  <input type="submit" value="Submit">
			</form> -->
            
            <!-- ////////////////fdsfdsfdf////////////// -->
            
           
          
            
            
            
       
            
          <!-- ///////////////////////////////////////////// -->  
            
        </div><!--container-->









</body>



<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<?='http://'.$ste_url?>/restrowidget/js/bootstrap.min.js"></script>

</html>

<script type="text/javascript">
	function hello () {
		
		
		businesspagefootersetting=document.getElementById("businesspagefootersetting").value;
		DeviceType=document.getElementById("DeviceType").value;
		businesspageheadersetting=document.getElementById("businesspageheadersetting").value;
		businesspagprograssbarsetting=document.getElementById("businesspagprograssbarsetting").value;
		alert(businesspagefootersetting);
		alert(DeviceType);
		alert(businesspageheadersetting);
		alert(businesspagprograssbarsetting);
	}
</script>
<script type="text/javascript">
        $(document).ready(function() {
            $("#category").change(function(event) {
                var id = $(event.target).val();
                //alert(id)
                $(".toggleable").hide();
                var inhalt = $("#" + id);
                inhalt.show();
 		if(id=="0")
		$(".toggleable").show();
            });
        });
    

    $(document).ready(function(){
    $("#filter").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $(".toggleable").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 				
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;

            }
        });
 
        // Update the count
        
    });
});
</script>  

<script>
      $(function () {

        $('form').on('submit', function (e) {

          e.preventDefault();

          $.ajax({
            type: 'post',
            url: 'get.php',
            data: $('form').serialize(),

            success: function (data) {
            	alert(data);
              alert('form was submitted');
            }
          });

        });

      });


//       $(document).ready(function () {

//   $('#nav > li > a').click(function(){
//   	event.preventDefault();
//     if ($(this).attr('class') != 'active'){
//       $('#nav li ul').slideUp();
//       $(this).next().slideToggle();
//       $('#nav li a').removeClass('active');
//       $(this).addClass('active');
//     }
//   });
// });
    </script>
