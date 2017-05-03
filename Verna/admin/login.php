<script type="text/javascript">
/***********************************************		Login  section *************************************************************/
function adminlogin() {
	
		Loginvalidation()
		var a=$("#email").val();
        var b=$("#password").val();
		
		
		if(a=="")
		{
		  return false;
		}
		else if(!isEmails(a))
		{
			 return false;
		}
		if(b=="")
		{
		   return false;
		}
		$("#loading1").show();

		$.post("../admin/login/challenge.php", "", function (e){
		$.post("../admin/login/login.php", "type=normal&username=" + a + "&response=" + hex_md5(e + b), function (f){
			
			if(f=='LoggedIn'){
				//var c=false;
			//setCookie("remember", c);
			if(document.getElementById("remember")){
			//if (document.getElementById("remember").checked == true){
			if ($('#remember').is(":checked")){
				
				//c=true;
				setCookie("emailID", a,30);
				setCookie("passVAL", b,30);
				//setCookie("remember", c);
				
			}else{
				
							unsetCookie("emailID",30);
							unsetCookie("passVAL",30);
							//unsetCookie("remember", c);
					}
			
			}
			$("#loading1").hide();
					window.location='http://<?=$_SERVER['SERVER_NAME']?>/admin/';
			}else{
				$("#incorrectdata").show();
				$("#loading1").hide();

			}

			});
		});
	}

/***********************************************		Login section *************************************************************/
function getCookie(name)
	{
			var re = new RegExp(name + "=([^;]+)");
			var value = re.exec(document.cookie);
			return (value != null) ? unescape(value[1]) : null;
	}
	
	function unsetCookie(cname,exdays) {

		var d = new Date();

		d.setTime(d.getTime() + (exdays*24*60*60*1000));

		var expires = "expires="+d.toGMTString();
		
		document.cookie = cname + "=; " + expires;

	}	

function setCookie(cname, cvalue, exdays) {
		
		
		var d = new Date();

		d.setTime(d.getTime() + (exdays*24*60*60*1000));

		var expires = "expires="+d.toGMTString();
	
		document.cookie = cname + "=" + cvalue + "; " + expires;
		
		
	}
/***********************************************		recover passord section *************************************************************/
	function recoveremailf(){
		Forgotvalidation();
		 var email=$("#recoveremail").val();

	        if(!isEmails(email))
			{
				//alert("Please enter valid email address!");
				return false;
				}
			else
			{
				$.post("../admin/lib/front-main.php", "f=RecoverPassword&email=" + email, function (c)
                {

					 if (c == "ok")
                    {

						$("#fgsuccess").show();
						$("#loading1").hide();
						return false
                    }
                    else
                    {

						$("#incorrectemail").show();
						$("#loading1").hide();
						return false
                    }


				});


			}
	}
/***********************************************		recover passord section *************************************************************/

$( document ).ready(function() {


	$( "#forgotId" ).click(function() {
		$("#forgotbox").delay(300).slideDown(800);
		$("#loginbox").slideUp( 300 ).delay( 800 );

	});
	$( "#loginId" ).click(function() {
		$("#forgotbox").slideUp( 300 ).delay( 800 );
		$("#loginbox").delay(300).slideDown(800);

	});
});


function Loginvalidation(){
var count = 0;

	var a = document.getElementById("email");
    var b = a.value;
   

        if(document.getElementById("email").value == ""){

            $("#email_text").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;

        }else if (isEmails(b)!=true) {
        	$("#email_text").hide();
        	$("#email_text1").show();
            $("#email").addClass("error-text-field");
            $("#email").removeClass("success-text-field");
            count ++;

        }else{
        	$("#email_text").hide();
            $("#email_text1").hide();
            $("#email").addClass("success-text-field");
            $("#email").removeClass("error-text-field");
        }

		if(document.getElementById("password").value == ""){
            $("#password_text").show();
            $("#password").addClass("error-text-field");
            $("#password").removeClass("success-text-field");
            count ++;

        }else{
        	$("#password_text").hide();
            $("#password").addClass("success-text-field");
            $("#password").removeClass("error-text-field");

        }
		if(count == 0)
        	return true
        else
        	return false

}
function Forgotvalidation(){
var count = 0;

	var a = document.getElementById("recoveremail");
    var b = a.value;
        if(document.getElementById("recoveremail").value == ""){

            $("#recoveremail_text").show();
            $("#recoveremail").addClass("error-text-field");
            $("#recoveremail").removeClass("success-text-field");
            count ++;

        }else if (!isEmails(b)) {
        	$("#recoveremail_text").hide();
        	$("#recoveremail_text1").show();
            $("#recoveremail").addClass("error-text-field");
            $("#recoveremail").removeClass("success-text-field");
            count ++;

        }else{
            $("#recoveremail_text1").hide();
            $("#recoveremail").addClass("success-text-field");
            $("#recoveremail").removeClass("error-text-field");
        }


		if(count == 0)
        	return true
        else
        	return false

}
</script>

<?
	unset($chk);
	$chk = '';
	$emailCoo  = $_COOKIE['emailID'];
	$passCoo  = $_COOKIE['passVAL'];

	if($_COOKIE['emailID']!=''){
	$chk = 'checked="checked"';
	}else{
		$chk = '';
	}
	
	/*$rememberCoo  = $_COOKIE['remember'];	
	if($rememberCoo=="true"){	
		$chk = 'checked="checked"';
	}else{
		$chk = '';	
	}*/
	
	
?>

 <!-- Strt Loading  -->
                    <div id="loading1" style="display:none;">

                    </div>
                   
                    <!-- End Loading  -->
<?php
$style="background:url(../panel/".$moduleName."/images/login-bg.jpg) no-repeat center top";

$style_backimg = 'style="'.$style.';background-attachment: fixed;background-size: cover !important;"';
?> 
<body class="login tooltips" <?=$style_backimg;?> >



    <div class="login-header text-center">
        <!-- <img src="images/logo.png" class="logo" alt="Logo"> -->
        <img src="<?php $_SERVER[HTTP_HOST]?>/panel/images/logo/1/normal.jpg" class="logo" alt="Logo">
    </div>

    <div class="login-wrapper" id="loginbox">
    <div class="alert alert-warning alert-bold-border fade in alert-dismissable" id="incorrectdata" style="display:none;">
			  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
			  <strong><?= $lang_resource['WARNING'] ?></strong> <?= $lang_resource['INCORRECTDATA'] ?><a class="alert-link" href="javascript:void(0)"> <?= $lang_resource['TRYAGAIN'] ?></a>.
			</div>

        <form role="form" id="ExampleBootstrapValidationForm" action="javascript:adminlogin()" method="post" style="margin-top:10px;" >
            <div class="form-group has-feedback lg left-feedback no-label" style="margin-bottom:34px;">
                <input value="" type="text" class="form-control no-border input-lg rounded" id="email" placeholder="<?= $lang_resource['ENTEREMAIL'] ?>" name="email" onKeyUp="Loginvalidation()" onBlur="Loginvalidation()" value="<?php echo $emailCoo; ?>" autocomplete="off"  autofocus  data-bv-notempty-message="<?= $lang_resource['EMAILVALIDATION'] ?>">
                <small data-bv-validator="notEmpty" class="help-block" id="email_text" style="color:#F00;display:none;"><?=$lang_resource['EMAILVALIDATION']?></small>
                <small data-bv-validator="notEmpty" class="help-block" id="email_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_INVALID']?></small>
                <span class="fa icon-att form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback lg left-feedback no-label">
                <input value="" type="password" class="form-control no-border input-lg rounded" id="password" placeholder="<?= $lang_resource['ENTERPASS'] ?>" value="<?php echo $passCoo; ?>" onKeyUp="Loginvalidation()" autocomplete="off"  name="firstName"  data-bv-notempty-message="<?= $lang_resource['PASSVALIDATION'] ?>">
                <small data-bv-validator="notEmpty" class="help-block" id="password_text" style="color:#F00;display:none;"><?=$lang_resource['PASSVALIDATION']?></small>

                <span class="fa icon-unlock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-lg-12"><p class="text-center forgot-pass" style=" float:left; width:auto;"><strong><a href="javascript:void(0)" id="forgotId"><?= $lang_resource['FORGOTPASS'] ?></a></strong></p>
                    <div class="form-group" style=" float:right; width:auto; margin-bottom:0px;">
                        <div class="checkbox" style="margin-top:0px;">
                            <input type="checkbox"  id="remember" <?php echo $chk; ?> class="checkbox_2"><label for="remember"><?= $lang_resource['REMEMBERME'] ?></label>
                        </div>
                    </div>
                </div>
            </div>


            <div class="form-group">
                <button type="submit" class="btn btn-sign-in btn-lg  btn-block" style="font-size:26px; padding:4px 16px; font-weight:600;"><?= $lang_resource['SIGNIN'] ?></button>
            </div>
        </form>
                <p><strong><?= $lang_resource['CONTROL_ADMIN_LOGIN_PAGE_TEXT'] ?> </strong>
  <br>
  <?= $lang_resource['CONTROL_ADMIN_LOGIN_PAGE_BIGTEXT'] ?></p>
<p>  <?= $lang_resource['CONTROL_ADMIN_LOGIN_PAGE_TEXT_TRYDEMO'] ?></p>
<p> <a href="<?=$lang_resource['CONTROL_PANEL_APP_STORE_URL']?>"><img src="https://www.orderingonlinesystem.com/wp-content/uploads/2014/09/App-Store-Icon-height50.png" width="144" height="50" alt=""/></a><a href="<?=$lang_resource['CONTROL_PANEL_GOOGLE_PLAY_URL']?>"><img src="https://www.orderingonlinesystem.com/wp-content/uploads/2014/09/icon-google-play-height50.png" width="143" height="50" alt=""/></a></p>
    </div>


    <div class="login-wrapper" style="display:none" id="forgotbox">
    <div class="alert alert-warning alert-bold-border fade in alert-dismissable" id="incorrectemail" style="display:none;">
			  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
			  <strong><?= $lang_resource['WARNING'] ?></strong> <?= $lang_resource['INCORRECTEMAIL'] ?><a class="alert-link" href="javascript:void(0)"> <?= $lang_resource['TRYAGAIN'] ?></a>.
			</div>
            <div class="alert alert-warning alert-bold-border fade in alert-dismissable" id="fgsuccess" style="display:none;">
			  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
			  <strong><?= $lang_resource['SUCCESS'] ?></strong> <?= $lang_resource['PASSWORDSENT'] ?><a class="success-link" href="#fakelink"> <?= $lang_resource['CHECKEMAIL'] ?></a>.
			</div>
        <form role="form" id="FormExample2" action="javascript:recoveremailf()"  method="post" style="margin-top:10px;" >
            <div class="form-group has-feedback lg left-feedback no-label" style="margin-bottom:34px;">
                <input class="form-control no-border input-lg rounded" id="recoveremail" placeholder="<?= $lang_resource['ENTEREMAIL'] ?>" name="email" type="email" autocomplete="off" onKeyUp="Forgotvalidation()" data-bv-emailaddress-message="<?= $lang_resource['EMAILVALIDATION'] ?>"  autofocus>
                <small data-bv-validator="notEmpty" class="help-block" id="recoveremail_text" style="color:#F00;display:none;"><?=$lang_resource['EMAILVALIDATION']?></small>
                <small data-bv-validator="notEmpty" class="help-block" id="recoveremail_text1" style="color:#F00;display:none;"><?=$lang_resource['VALIDATION_EMAIL_INVALID']?></small>
                <span class="fa icon-att form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-lg-12"><p class="text-center forgot-pass" style=" float:left; width:auto;"><strong><a href="javascript:void(0)" id="loginId"> <?= $lang_resource['RETURNLOGIN'] ?></a></strong></p>

                </div>
            </div>


            <div class="form-group">
                <button type="submit" class="btn btn-sign-in btn-lg  btn-block" style="font-size:26px; padding:4px 16px; font-weight:600;"><?= $lang_resource['SUBMIT'] ?></button>
            </div>
        </form>
    </div>
</body>
