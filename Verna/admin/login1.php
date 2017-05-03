<script type="text/javascript">
/***********************************************		Login  section *************************************************************/
function adminlogin() {
		
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
			
			if ($('#remember').is(":checked")){
				setCookie("emailID", a,30);
				setCookie("passVAL", b,30);

			}

			$("#loading1").hide();
					window.location='http://oosmain/admin/';
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

function setCookie(cname, cvalue, exdays) {

		var d = new Date();

		d.setTime(d.getTime() + (exdays*24*60*60*1000));

		var expires = "expires="+d.toGMTString();

		document.cookie = cname + "=" + cvalue + "; " + expires;

	}
/***********************************************		recover passord section *************************************************************/
	function recoveremailf(){
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
</script>

<?
$chk = '';
	$emailCoo  = $_COOKIE['emailID'];
	$passCoo  = $_COOKIE['passVAL'];
	if(isset($emailCoo) && isset($passCoo)){
	
		$chk = 'checked="checked"';
	}
?>

 <!-- Strt Loading  -->
                    <div id="loading1" style="display:none;">
                    <div id="fountainG">
                    <div id="fountainG_1" class="fountainG">
                    </div>
                    <div id="fountainG_2" class="fountainG">
                    </div>
                    <div id="fountainG_3" class="fountainG">
                    </div>
                    <div id="fountainG_4" class="fountainG">
                    </div>
                    <div id="fountainG_5" class="fountainG">
                    </div>
                    <div id="fountainG_6" class="fountainG">
                    </div>
                    <div id="fountainG_7" class="fountainG">
                    </div>
                    <div id="fountainG_8" class="fountainG">
                    </div>
                    </div>
                    </div>
                    <!-- End Loading  -->
<body class="login tooltips">



    <div class="login-header text-center">
        <img src="assets/img/logo-login.png" class="logo" alt="Logo">
    </div>

    <div class="login-wrapper" id="loginbox"> 
    <div class="alert alert-warning alert-bold-border fade in alert-dismissable" id="incorrectdata" style="display:none;">
			  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
			  <strong><?= $lang_resource['WARNING'] ?></strong> <?= $lang_resource['INCORRECTDATA'] ?><a class="alert-link" href="#fakelink"> <?= $lang_resource['TRYAGAIN'] ?></a>.
			</div>
            
        <form role="form" id="ExampleBootstrapValidationForm" action="javascript:adminlogin()" method="post" style="margin-top:10px;" >
            <div class="form-group has-feedback lg left-feedback no-label" style="margin-bottom:34px;">
                <input type="text" class="form-control no-border input-lg rounded" id="email" placeholder="<?= $lang_resource['ENTEREMAIL'] ?>" name="email" value="<?php echo $emailCoo; ?>"  autofocus required data-bv-notempty-message="<?= $lang_resource['EMAILVALIDATION'] ?>">
                <span class="fa icon-att form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback lg left-feedback no-label">
                <input type="password" class="form-control no-border input-lg rounded" id="password" placeholder="<?= $lang_resource['ENTERPASS'] ?>" value="<?php echo $passCoo; ?>"  name="firstName" required data-bv-notempty-message="<?= $lang_resource['PASSVALIDATION'] ?>">
                <span class="fa icon-unlock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-lg-12"><p class="text-center forgot-pass" style=" float:left; width:auto;"><strong><a href="javascript:void(0)" id="forgotId"><?= $lang_resource['FORGOTPASS'] ?></a></strong></p>
                    <div class="form-group" style=" float:right; width:auto; margin-bottom:0px;">
                        <div class="checkbox" style="margin-top:0px;">
                            <input type="checkbox" id="remember" <?php echo $chk; ?> class="checkbox_2"><label for="remember"><?= $lang_resource['REMEMBERME'] ?></label>
                        </div>
                    </div>
                </div>
            </div>
        
        
            <div class="form-group">
                <button type="submit" class="btn btn-sign-in btn-lg  btn-block" style="font-size:26px; padding:4px 16px; font-weight:600;"><?= $lang_resource['SIGNIN'] ?></button>
            </div>
        </form>	
    </div>
    
    
    <div class="login-wrapper" style="display:none" id="forgotbox"> 
    <div class="alert alert-warning alert-bold-border fade in alert-dismissable" id="incorrectemail" style="display:none;">
			  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
			  <strong><?= $lang_resource['WARNING'] ?></strong> <?= $lang_resource['INCORRECTEMAIL'] ?><a class="alert-link" href="#fakelink"> <?= $lang_resource['TRYAGAIN'] ?></a>.
			</div>
            <div class="alert alert-warning alert-bold-border fade in alert-dismissable" id="fgsuccess" style="display:none;">
			  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
			  <strong><?= $lang_resource['SUCCESS'] ?></strong> <?= $lang_resource['PASSWORDSENT'] ?><a class="success-link" href="#fakelink"> <?= $lang_resource['CHECKEMAIL'] ?></a>.
			</div>
        <form role="form" id="FormExample1" action="javascript:recoveremailf()"  method="post" style="margin-top:10px;" >
            <div class="form-group has-feedback lg left-feedback no-label" style="margin-bottom:34px;">
                <input class="form-control no-border input-lg rounded" id="recoveremail" placeholder="<?= $lang_resource['ENTEREMAIL'] ?>" name="email" type="email" required data-bv-emailaddress-message="<?= $lang_resource['EMAILVALIDATION'] ?>"  autofocus>
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
