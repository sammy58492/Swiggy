<?php
session_start();
//include $_SERVER['DOCUMENT_ROOT'].'/languages/lang.en.php';
include $_SERVER['DOCUMENT_ROOT'].'/panel/config.php';
include $_SERVER['DOCUMENT_ROOT'].'/panel/lib/class.phpmailer.php';
require_once($_SERVER['DOCUMENT_ROOT'].'/panel/lib/front-main.php');

$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
$link = pg_connect($string);

function GetLangFileStatic2($link){	


	//$link = pg_connect($string);
	if(!isset($_SESSION['l']) || $_SESSION['l'] ==''){
		pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
		$result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
		$row1 = pg_fetch_array($result1);
		$_SESSION['l'] = $row1['id'];
	}
	pg_prepare($link,'sqlfetchlsangfront'.time(),'SELECT * from w_lang_static');
	$result = pg_execute($link,'sqlfetchlsangfront'.time(),array());
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
	//$mail->FromName = "test";
    $mail->Subject =   $lang_resource['CONTACTUS_NEW_CONTACTEMAIL']  ;
   // foreach ($addresses as $address)
    	//$mail->AddAddress($fbemail_from);
		
		$mail->AddAddress($lang_resource['CONTACTUS_RECEIVER_EMAIL']);
		//$mail->AddAddress("avijit.acuity@gmail.com");	
	
	$mail->MsgHTML($Showmsg);
	$mail->IsHTML(true);
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
  // echo $Showmsg;
	//echo $lang_resource['CONTACTUS_RECEIVER_EMAIL'];
	
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
	  // header("location:contact");
		}	
	}
	
	
		}
		?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ordering Online System</title>

<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link type='text/css' rel='stylesheet' href="css/main_front.css"/>
<link rel="stylesheet" type="text/css" href="css/dishscrollbar.css">

<link rel="stylesheet" type="text/css" href="font/fontcss.css">
<link type='text/css' rel='stylesheet' href="panel/front-reservation/css/reservation.css"/>
<link type='text/css' rel='stylesheet' href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800'/>
<link rel="stylesheet" type="text/css" href="font/stylesheet.css">


<link rel="stylesheet" type="text/css" href="css/contactstyle.css">
<link href="./css/style.css" rel="stylesheet">
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="panel/js/jCarouselLite.js"></script>
<script type="text/javascript" src="panel/js/front-bulk.php?v=1.2.2&l=<?= isset($_SESSION['l']) ? $_SESSION['l'] : 'en' ?>"></script>

<script type="application/javascript">
function refreshCaptcha(){
	var img = document.images['captchaimg'];
	img.src = img.src.substring(0,img.src.lastIndexOf("?"))+"?rand="+Math.random()*1000;
}

function checkEmail(captcha_code) 
{
	
	
	var flg = true;
	
    var email = document.getElementById('email');
	var captcha_input = document.getElementById('captcha_input').value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
    if (!filter.test(email.value)) {
		
    alert("<?=$lang_resource['CONTACTUS_EMAIL_ALART']?>");
    email.focus();
    if(flg == true){
	flg=false;	
	}
		
	}
	
	if(flg == true){
		
		return true;	
		//
		
	}
	else
	{
		//fnsubmit();
		return false;	
	//document.contact.submit();	
	}
}

</script>
</head>

<body >

    
        <div class="conmain">
            <div class="Request_Collection">
           		<h4><?=$lang_resource['CONTACTUS_TITLE']?></h4>
               <div id="message" style="width:100%;text-align:center;margin:10px 0;color:#FF0000"> <?php echo $msg ?> </div>
                    <div class="Req_Col_in">
                      <form name="contact" action="" method="post" runat="server" onSubmit="" >   
                        
                        <!--Req_Col_left-->
                        <div class="Req_Col_left">
                         
                            <div class="Req_Col_left_hd"><?=$lang_resource['CONTACTUS_TITLE']?></div>   
                                               
                                <div class="Req_Col_row"><label><?=$lang_resource['CONTACTUS_NAME']?> <span> <span>*</span></label><input type="text" name="name" id="name" value="<?=$_POST["name"]?>"  required="required"></div> 
                                <div class="Req_Col_row"><label><?=$lang_resource['CONTACTUS_ADDRESS']?> <span>*</span></label><textarea rows="4" cols="50" name="address" id="address"  required><?=$_POST["address"]?></textarea></div> 
                                <div class="Req_Col_row"><label><?=$lang_resource['CONTACTUS_PHONE']?> <span>*</span></label><input type="text" name="phoneno" id="phoneno"  value="<?=$_POST["phoneno"]?>"></div> 
                                <div class="Req_Col_row"><label><?=$lang_resource['CONTACTUS_EMAIL']?> <span>*</span></label><input type="text" name="email" id="email" value="<?=$_POST["email"]?>" required ></div> 
                                <div class="Req_Col_row"><label><?=$lang_resource['CONTACTUS_SUBJECT']?> <span>*</span></label><input type="text" name="subject" id="subject" value="<?=$_POST["subject"]?>" required></div> 
                                <div class="Req_Col_row"><label><?=$lang_resource['CONTACTUS_COMMENT']?> <span>*</span></label><textarea rows="4" cols="50" name="comment" id="comment"  required><?=$_POST["comment"]?></textarea></div> 
                            
                      	  </div>
                        <!--Req_Col_left end-->
                        
                        
                   <div class="Req_Col_row">  
                    
                    <?=$lang_resource['CONTACTUS_VALIDATION_CODE']?>
                    <img src="captcha.php?rand=<?php echo rand();?>" id='captchaimg'><?php echo $msg1;?>
                    <label for='message'><?= $lang_resource['CONTACTUS_ENTER_CODE']?></label>
                    <br>
                    <input id="captcha_code" name="captcha_code" type="text" <?php if($msg1!=""){?>autofocus="autofocus"<?php }?>>
                    <br>
                    <?= $lang_resource['CONTACTUS_REQUEST_CAN_NOT_READ']?> <a href='javascript: refreshCaptcha();'><?= $lang_resource['CONTACTUS_HERE']?></a> <?= $lang_resource['CONTACTUS_REFRESH']?> </td>
                   
                   
					</div>

                      <?php $cpt = $_SESSION['captcha_code']; ?>  
                      
                        <div class="btn_Col_row"><input type="submit" name="contact_us_submit" id="contact_us_submit" value="<?=$lang_resource['CONTACTUS_REQUEST']?>" class="Request_btn" onClick="return checkEmail('<?=$cpt?>');" ></div>
                        
                        </form>
                        
                    </div>
        		</div>
            </div>
        </div>
     <?php //include "footer_cms.php";?><strong></strong>
    
</body>
</html>

<?php

if(!$msg){
		?>
		 <script>
            document.getElementById("message").style.display = 'none';
          </script>	
      <?php
	}
?>