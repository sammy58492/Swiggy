<?php
require_once("../panel/lib/front-main.php");
//require('../panel/config.php');
//include("../panel/js/front-bulk.php");
require("../languages/lang.en.php");

$ste_url=$_SERVER['HTTP_HOST'];
$data=json_decode(stripslashes($_REQUEST["data"]),true);
$buttoncolor='#f2f2f2';
if($data["business_id"]!=''){
	$busineesid=$data["business_id"];
}



require('../panel/config.php');
  $link = ConnectDB($CFG);
    pg_prepare($link,'sql44','SELECT * from w_business where id=$1 ');
       $result = pg_execute($link,'sql44',array($busineesid));

       //$settings = array();
		$business=array();
       while($row = pg_fetch_array($result))
               {
				  
				   $business[$row["id"]]=$row["name"];
				   $business_customslug=$row["customslug"];

			   }

				   

if($data["buttoncolor"]!=''){
	$buttoncolor=$data["buttoncolor"];
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

if($data["textcolor"]!=''){
	$textcolor=$data['textcolor'];
}

if($data["textsize"]!='')
{
	$textsize=$data['textsize'];
}

if($data["buttonsize"]!='')
{
	$buttonsize=$data['buttonsize'];
}

if($data['textfont']!='')
{
	$textfont=$data['textfont'];
}

if($data['lookoption']!='')
{
	$lookoption=$data['lookoption'];
}



require('../panel/config.php');
  $link = ConnectDB($CFG);
  pg_prepare($link,'sql400','SELECT * from w_business where id=$1 ');
       $result = pg_execute($link,'sql400',array($busineesid));

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
<html>
<head>
	
  <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/custom.css">
    <link rel="stylesheet" type="text/css" href="css/widget-responsive-style.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>

 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="panel/js/front-bulk2.php"></script>

<style type="text/css">

	.simplePopup {
  display: none;
  position: fixed;
  //border: 4px solid #ffffff;
  background: #ffffff;
  z-index: 3;
  color:#fff;
  padding: 12px;
  width: 100%;
  min-width: 100%;
}

.simplePopupBackground {
  display: none;
  background: #000;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.simplePopupClose {
  float: right;
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 10px;
}

	.button {
    display: block;

    <?php if($buttonsize=="small") {?>
    padding:5px 15px;
    <?php } ?>

    <?php if($buttonsize=="medium") {?>
    padding:10px 20px;
    <?php } ?>

    <?php if($buttonsize=="large") {?>
    padding:15px 25px;
    <?php } ?>

    <?php if($buttonsize=="extra large") {?>
    padding:20px 30px;
    <?php } ?>
   	<?php if($textfont=="aerial") {?> 
    font-family:Arial, Helvetica, sans-serif
     <?php } ?>

     <?php if($textfont=="Times New Roman") {?> 
    font-family:"Times New Roman", Times, serif
     <?php } ?>


    width: 100%;
    font-size: <?php echo $textsize?>;
    background: <?php echo $buttoncolor;?>;
   	color:<?php echo $textcolor;?>;
    border:none; 
    <?php if($lookoption=="squared") {?>
    	border-radius:0px;
    <?php } ?>

    <?php if($lookoption=="rounded") {?>
    	border-radius:5px;
    <?php } ?>

    
}
</style>

<link rel="stylesheet" href="lightbox.css">
<link rel="stylesheet" href="stylesheet.css">


</head>
<body>
	<?php
		$ste_url=$_SERVER['HTTP_HOST'];
	?>
	<input type="hidden" id="main_site_url" value="<?='http://'.$ste_url?>"/>
	<input type="hidden" id="businessid" value="<?php echo $busineesid;?>">
	<input type="hidden"  value="Order Now" onclick="window.parent.MyFunction();">
	
	<a href="http://beta.orderingonlinesystem.com/<?php echo $business_customslug ?>"
    onclick="return !window.open(this.href, 'Order Now', 'width=800,height=600')"
    target="_blank" class="button">Order Now</a>

    <div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
	<a href="#"  class="button show1" >Click here</a>

	
	<div id="pop1" class="simplePopup">
	
	<div>



		<div class="rest_menu_banner_dv">
        	<div class="top-panel">
            	<div class="item_dv">
                	<h3>You have <span id="total" class="outputText">0</span> items</h3>
                    <span><button type="button" class="show2"><img src="images/cart-icon.png"></button></span>
                </div><!--item_dv-->
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
                	<ul class="manu_tabs">
                		<li><a href="javascript:void(0)" id="tabMenu1" class="active-tab" onclick="Shopping.Menuskiptab(1)">Menu</a></li>
                    	<li><a href="javascript:void(0)"  onclick="Shopping.Menuskiptab(2)">Info</a></li>
                        <li><a href="javascript:void(0)"  onclick="Shopping.Menuskiptab(3)">Reviews</a></li>
                        <li><a href="javascript:void(0)"  onclick="Shopping.Menuskiptab(4)">Offers</a></li>
                        <li><a href="javascript:void(0)"  onclick="Shopping.Menuskiptab(5)">Reservation</a></li>
                        
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
            <div id="wrapper">
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

            <h3 class="category_heading"><?php echo $menucatname?></h3>
            <div class="row">
            	<div class="col-md-6">
                	<div class="product_dv">
                    	<div class="row">
                        	<div class="col-md-8">
                            	<div class="prodict_img">
                                	<img src="../panel/images/dishes/<?php echo $menuid."/".$menuimage1?>/panel.jpg">
                                </div><!--prodict_img-->
                                <div class="product_dsp">
                                	<h3 id="menuname_<?php echo $menuid?>"><?php echo $menuname?></h3>
                                    <p><?php echo $menudesc?></p>
                                </div><!--product_dsp-->
                            </div><!--col-md-8-->
                            <div class="col-md-4">
                            	<div class="product_price_dv">
                                	<h3>$<?php echo $menuprice ?></h3>
                                    <button type="button" class="adtocart" id="dish_<?php echo $menuid ?>_imglink" onclick="AddtoCart(<?php echo $menuid.",".$menuprice.",'".$menuname."'"?>)">+</button>
                                </div><!--product_price_dv-->
                            </div><!--col-md-4-->
                        </div><!--row-->
                    </div><!--product_dv-->
                </div><!--col-md-6-->
               
            </div><!--row-->
            </div>
            <?php } ?>

/*/////////////order page//////////////*/


            <div id="pop2" class="simplePopup">


            		<div class="cart_header">
  	<div class="container"> 
    	<div class="cart_header_text">   	
            <span><img src="images/cart-icon-black.png"></span>
            <h2>You have <span id="quant"></span> items</h2>
        </div><!--cart_header_text-->            
    </div><!--container-->
  </div><!--cart_header-->
  
    <div class="container">
    <table class="table table-striped cart-table" id="orderedProductsTbl">
    	<tbody id="orderedProductsTblBody">
        
        </tbody>
        <tr>
          <td colspan="2">Delivery Fee</td>
          <td colspan="2">$ 0.00</td>
        </tr>
        <tr class="srv-tax">
          <td colspan="2">Service Fee (0.25%)</td>
          <td colspan="2">$ 0.50</td>
        </tr>
         <tr class="srv-tax">
          <td colspan="2">Tax(10%)</td>
          <td colspan="2">$ 1.25</td>
        </tr>
         </tr>
         <tr class="total_row">
          <td colspan="2">Total</td>
          <td colspan="2" id="totalValue"></td>
        </tr>
      
    </table>
    <div class="row">
    	<div class="col-md-8">
        	<p class="delivery-time">Preorder delivery time  <span>2015-07-26  09:15 AM</span></p>
            <button type="button" class="change-time-btn">Change Time ?</button>
        </div><!--col-md-8-->
        <div class="col-md-4">
        	<button type="button" class=" cart_order_now_btn">Order Now</button>
            <button type="button" class="cart_back_btn">Back</button>
        </div><!--col-md-4-->
    </div><!--row-->
    </div><!--container-->


           	</div>
            
            
            
           <div id='right'>

			</div>
            
            
            
       
            
            
            
        </div><!--container-->
      </div>

       <div class="footer" id="footer">
        	
        </div><!--footer-->
        <div class="footer2">
        	<div class="main">
            	
        </div><!--footer-->




      </div>
	</div>

</body>
</html>


 <script type="text/javascript">
        $(document).ready(function() {
            $("#category").change(function(event) {
                var id = $(event.target).val();
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

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="js/jquery.simplePopup.js" type="text/javascript"></script>
<script type="text/javascript">

$(document).ready(function(){

    $('.show1').click(function(){
	$('#pop1').simplePopup();
    });
    
});

$(document).ready(function(){
	
	
	    $('.show2').click(function(){
	    	var q=$(".outputText").text();
	    	
			//alert(q);
	    	if(q>0)
			{
				$('#pop2').simplePopup();
				//document.getElementById("productname").innerHTML=q;

			}
			else
			{
				alert("Please add an item into the cart");
			}
	    });
	
	
    
});

</script>	

<script>

var shoppingCart = [];

    //this function manipulates DOM and displays content of our shopping cart
    function displayShoppingCart(){
        
    	var orderedProductsTblBody=document.getElementById("orderedProductsTblBody");

        //variable to hold total price of shopping cart
        var cart_total_price=0;
        var quantity=0;
        var lastid=0;
        //iterate over array of objects
        for(var product in shoppingCart){
            //add new row   
            
            
            quantity+=1;
        }
        alert(quantity);
        var row=orderedProductsTblBody.insertRow();   
            //var row=document.getElementById("orderedProductsTblBody");
            
            //create three cells for product properties 
            var cellQuantity = row.insertCell(0);
            var cellProductName = row.insertCell(1);

           var cellAddDelete=row.insertCell(2);
           var cellPrice = row.insertCell(3);
           
            //fill cells with values from current product object of our array
            cellProductName.innerHTML = shoppingCart[product].Name;

            cellAddDelete.innerHTML='<button class="item-add-btn" onclick="addPro('+shoppingCart[product].ID+','+shoppingCart[product].Price+')"><i class="glyphicon glyphicon glyphicon-plus-sign"></i></button>   <button class="item-delete-btn" onclick="delPro('+shoppingCart[product].ID+','+shoppingCart[product].Price+')"><i class="glyphicon glyphicon-minus-sign"></i></button>'
            
			

            cellQuantity.innerHTML = quantity;
            cellQuantity.innerHTML='<label id="Q_'+shoppingCart[product].ID+'">'+quantity+'</label> <input type="hidden" id="b_'+shoppingCart[product].ID+'" value="'+quantity+'">';
            cellPrice.innerHTML='<label id="P_'+shoppingCart[product].ID+'">'+shoppingCart[product].Price+'</label> <input type="hidden" id="price_'+shoppingCart[product].ID+'" value="'+shoppingCart[product].Price+'">'
            
            //cellPrice.innerHTML = shoppingCart[product].Price;
            name=shoppingCart[product].Name;
            id=shoppingCart[product].ID;

            var totalval =document.getElementById("totalValue").innerHTML;
            totalval=parseInt(totalval);
            alert(totalval);
            if(isNaN(totalval)==false)
            {
            	
            	alert(shoppingCart[product].Price)
            	alert(cart_total_price);
            	cart_total_price=cart_total_price+shoppingCart[product].Price;
            }
            else
            {
            	cart_total_price+=shoppingCart[product].Price;
            }
            
        //fill total cost of our shopping cart 
        document.getElementById("total").innerHTML=quantity;
        document.getElementById("quant").innerHTML=quantity;
        document.getElementById("totalValue").innerHTML=cart_total_price;
        
    }

function AddtoCart(id,price,name){
       //Below we create JavaScript Object that will hold three properties you have mentioned:    Name,Description and Price
       var singleProduct = {};
       //Fill the product object with data
       singleProduct.ID=id;
       singleProduct.Name=name;
       singleProduct.Price=price;
       //Add newly created product to our shopping cart 
       shoppingCart.push(singleProduct);
       //call display function to show on screen
       displayShoppingCart();

    }  

</script>	



<script>
function myFunction() {
    //parent.document.body.style.backgroundColor = "red";
    window.parent.location.href = "newPage.html";
}
</script>

<script>
var Cart = [];
function Add2Cart()
{
	//shoppingCart[product].Price
for(var Product in Cart){

	
	 var id="b_"+Cart[Product].ID;
	
	 var quantity=document.getElementById(id);
	 quantity=parseInt(quantity.value);
	 var cart_total_price=0;
	 cart_total_price=document.getElementById("totalValue").innerHTML;
	 //alert(cart_total_price);
	 cart_total_price=parseInt(cart_total_price);


	 //alert(quantity);
	 
   	 var pid="price_"+Cart[Product].ID;
   	 //alert(pid)
   	 var price=document.getElementById(pid);
   	 price =parseInt(price.value);
   	 //alert(price);
   	 
   	 
   }
   quantity=quantity+1;
   cart_total_price+=Cart[Product].price;
   price+=Cart[Product].price;
   
   //alert(quantity);
   var q="Q_"+Cart[Product].ID;
   	 document.getElementById(q).innerHTML=quantity;
   	 var dfd="b_"+Cart[Product].ID;
   	
   	 document.getElementById(dfd).value=quantity;
   	 var p="P_"+Cart[Product].ID;
   	 document.getElementById(p).innerHTML=price;
   	 document.getElementById(pid).value=price;
   	 document.getElementById("totalValue").innerHTML=cart_total_price;
}

function addPro(id,price)
{
	//alert(id);
	var Product = {};
	Product.ID=id;
	Product.Name=name;
	Product.price=price;
	Cart.push(Product);
	Add2Cart();

}




</script>


<script>
var Cart = [];
function Del4Cart()
{
	//shoppingCart[product].Price
for(var Product in Cart){

	
	 var id="b_"+Cart[Product].ID;
	
	 var quantity=document.getElementById(id);
	 quantity=parseInt(quantity.value);
	 var cart_total_price=0;
	 cart_total_price=document.getElementById("totalValue").innerHTML;
	 //alert(cart_total_price);
	 cart_total_price=parseInt(cart_total_price);


	 //alert(quantity);
	 
   	 var pid="price_"+Cart[Product].ID;
   	 //alert(pid)
   	 var price=document.getElementById(pid);
   	 price =parseInt(price.value);
   	 //alert(price);
   	 
   	 
   }
   quantity=quantity-1;
   cart_total_price-=Cart[Product].price;
   price-=Cart[Product].price;
   
   //alert(quantity);
   var q="Q_"+Cart[Product].ID;
   	 document.getElementById(q).innerHTML=quantity;
   	 var dfd="b_"+Cart[Product].ID;
   	
   	 document.getElementById(dfd).value=quantity;
   	 var p="P_"+Cart[Product].ID;
   	 document.getElementById(p).innerHTML=price;
   	 document.getElementById(pid).value=price;
   	 document.getElementById("totalValue").innerHTML=cart_total_price;
}

function delPro(id,price)
{
	//alert(id);
	var Product = {};
	Product.ID=id;
	Product.Name=name;
	Product.price=price;
	Cart.push(Product);
	Del4Cart();

}




</script>

<a href="http://beta.orderingonlinesystem.com/<?php echo $business_customslug ?>"
    onclick="return !window.open(this.href, 'OrderNow', 'width=500,height=500')"
    target="_blank" class="button">Order Now</a>