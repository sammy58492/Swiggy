<?php
session_start();
include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
include $_SERVER['DOCUMENT_ROOT'].'/panel/lib/class.phpmailer.php';
require_once($_SERVER['DOCUMENT_ROOT'].'/panel/lib/front-main.php');

$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);

function GetLangFileStatic2($link){	
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
		pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
		$result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
		$row1 = pg_fetch_array($result1);
		$_SESSION['l'] = $row1['id'];
	}
	pg_prepare($link,'sqlfetchlangfront'.time(),'SELECT * from w_lang_static');
	$result = pg_execute($link,'sqlfetchlangfront'.time(),array());
	while($row = pg_fetch_array($result)){
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['l']];    
	}
	return $lang_resource;
	pg_close($link);
}

$lang_resource = GetLangFileStatic2($link);

if(!empty($_POST['email'])){
	
	$name = $_POST['name'];
	$phoneno = $_POST['phoneno'];
	$address = $_POST['address'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$comment = $_POST['comment'];
	 if(empty($_SESSION['captcha_code'] ) || strcasecmp($_SESSION['captcha_code'], $_POST['captcha_code']) != 0){  
		$msg1="<span style='color:red'>The Validation code does not match!</span>";// Captcha verification is incorrect.		
	}else{// Captcha verification is Correct. Final Code Execute here!		
		pg_prepare($link,'sqli',"SELECT nextval('w_contactus_id_seq') as key");
				$result = pg_execute($link,'sqli',array());
				
				if (pg_num_rows($result)==1)
				while($row = pg_fetch_array($result))
				 $id = $row['key'];
				
				if ($id==-1)
				return;
				

	$query = 'INSERT INTO w_contactus(id,name,address,phoneno,email,subject,comment) VALUES ($1,$2,$3,$4,$5,$6,$7)';
	pg_prepare($link,'sql2',$query);
	pg_execute($link,'sql2',array($id,$name,$address,$phoneno,$email,$subject,$comment));
	
	$val = 'email_from';
	pg_prepare($link,'sql222',"SELECT * from w_configs where name=$1");
	$result2 = pg_execute($link,'sql222',array($val));
	$row7 = pg_fetch_array($result2);
	
	include $_SERVER['DOCUMENT_ROOT'].'/panel/templates/contactus-email-template.php';
	 
				 

	$mail = new PHPMailer();
    $mail->PluginDir = "";
    $mail->Host = "localhost";
	$mail->From = $email;	
    $mail->Subject =   $lang_resource['CONTACTUS_NEW_CONTACTEMAIL']  ;
 	$mail->AddAddress($lang_resource['CONTACTUS_RECEIVER_EMAIL']);
	
	$mail->MsgHTML($Showmsg);
	$mail->IsHTML(true);
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';

	if(!$mail->Send()) {
	   $msg =  "Mailer Error: " . $mail->ErrorInfo;
	} else {
		$msg = $lang_resource['CONTACTUS_SUCCESSMSG'];
		?>
		  <script type="text/javascript">
         	 document.getElementById("message").style.display = 'block';
			// window.open('contact.php', '_self');
				document.getElementById("name").value='';	
				document.getElementById("address").value='';
				document.getElementById("phoneno").value='';	
				document.getElementById("email").value='';	
				document.getElementById("subject").value='';
				document.getElementById("comment").value='';			 
          </script>
      
       <?php 
	 
		}	
	}
	
	
		}
		?>

<meta name="viewport" content="width=device-width, initial-scale=1">

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script type="text/javascript" src="panel/js/front-bulk.php?v=1.2.2&l=<?= isset($_SESSION['l']) ? $_SESSION['l'] : 'en' ?>"></script>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/new-stylesheet.css">
<link rel="stylesheet" type="text/css" href="css/popup_content.css">
<link rel="stylesheet" type="text/css" href="css/popup.css" />
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>    


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

<script type="application/javascript">
function refreshCaptcha(){
	var img = document.images['captchaimg'];
	img.src = img.src.substring(0,img.src.lastIndexOf("?"))+"?rand="+Math.random()*1000;
}

function checkEmail(captcha_code){	
	var flg = true;	
    var email = document.getElementById('email');
	var captcha_input = document.getElementById('captcha_code').value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
    if (!filter.test(email.value)){
        swal("Error","<?= $lang_resource['CONTACTUS_EMAIL_ALART'] ?>","error");	
	    email.focus();
	    if(flg == true){
			flg=false;	
		}		
	}	
	
	if(flg == true){
		return true;	
	}else{		
		return false;			
	}
}

</script>

<div class=" inner_banner_black">
		<div class="container">
        	<div class="restaurant_info">
            	<h3><?=$lang_resource['CONTACTUS_TITLE']?></h3>
	            
            </div><!--restaurant_info-->
        </div><!--container-->
    </div><!--inner_banner_black-->
    
    <div class="container">
    	<div class="row">
        	<div class="col-md-6 col-md-offset-3">            
				<div class="border_box">
					<h3 class="heading_3"  id="message"> <?php echo $msg ?></h3>
                	<h3 class="heading_3"><?=$lang_resource['CONTACTUS_TITLE']?></h3>
                    <div class="narrow_wrapper">
                    <form name="contact" action="" method="post" runat="server" onSubmit="" >
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group">
                            	<label><?=$lang_resource['CONTACTUS_NAME']?></label>
                                <input type="text" class="form-control" name="name" id="name" value="<?=$_POST["name"]?>"  required="required">
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group">
                            	<label><?=$lang_resource['CONTACTUS_ADDRESS']?></label>
                                <input type="text" class="form-control" name="address" id="address" value="<?=$_POST["address"]?>"  required="required">
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group">
                            	<label><?=$lang_resource['CONTACTUS_PHONE']?></label>
                                <input type="text" class="form-control" name="phoneno" id="phoneno" value="<?=$_POST["phoneno"]?>"  required="required">
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group">
                            	<label><?=$lang_resource['CONTACTUS_EMAIL']?> </label>
                                <input type="text" class="form-control" name="email" id="email" value="<?=$_POST["email"]?>" required>
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group">
                            	<label><?=$lang_resource['CONTACTUS_SUBJECT']?></label>
                                <input type="text" class="form-control" name="subject" id="subject" value="<?=$_POST["subject"]?>" required>
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group">
                            	<label><?=$lang_resource['CONTACTUS_COMMENT']?></label>
                            	<textarea class="form-control" name="comment" id="comment"  required><?=$_POST["comment"]?></textarea>
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group">
                                <p class="p_text"><?=$lang_resource['CONTACTUS_VALIDATION_CODE']?> <span><img src="<?php $_SERVER['DOCUMENT_ROOT']?>/captcha.php?rand=<?php echo rand();?>" id='captchaimg'><?php echo $msg1;?></span></p>
                                <label><?= $lang_resource['CONTACTUS_ENTER_CODE']?></label>
                                <input type="text" class="form-control" id="captcha_code" name="captcha_code" <?php if($msg1!=""){?>autofocus="autofocus"<?php }?>>
                                <p class="p_text"><?= $lang_resource['CONTACTUS_REQUEST_CAN_NOT_READ']?> <a href='javascript: refreshCaptcha();'><?= $lang_resource['CONTACTUS_HERE']?></a> <?= $lang_resource['CONTACTUS_REFRESH']?></p>
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                     <?php $cpt = $_SESSION['captcha_code']; ?>  
                    <div class="row">
                    	<div class="col-md-12">
                        	<div class="form-group send-message_dv">
                            	<button type="submit" class=" red_btn_small" id="contact_us_submit" name="contact_us_submit" onClick="return checkEmail('<?=$cpt?>');"><?=$lang_resource['CONTACTUS_REQUEST_1']?></button>
                            </div><!--form-group-->
                        </div><!--col-md-12-->
                    </div><!--row-->
                    </form>
                    </div><!--narrow_wrapper-->
                    
                </div><!--border_box-->
            </div><!--col-md-8-->
            
        </div><!--row-->
        
        
        
    </div><!--container-->

      

<?php

if(!$msg){
		?>
		 <script>
            document.getElementById("message").style.display = 'none';
          </script>	
      <?php
	}
?>