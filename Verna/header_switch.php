
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Ordering Pages</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- My Css -->
    <link rel="stylesheet" type="text/css" href="css/main_front.css">
    <link rel="stylesheet" type="text/css" href="css/new-stylesheet.css">
	<link rel="stylesheet" type="text/css" href="css/responsive.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script>
$(window).scroll(function() {
    if ($(this).scrollTop() > 1){  
        $('header').addClass("sticky");
    }
    else{
        $('header').removeClass("sticky");
    }
});
</script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
<header>
   <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only"><?=$lang_resource['TOGGLE_NAVIGATION']?></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><img src="images/ordering-logo.png"></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">              
         <ul class="navigation">
         	<li><a href="#"><?=$lang_resource['PRICING']?></a></li>
            <li><a href="#"><?=$lang_resource['FEATURES']?></a></li>
            <li><a href="#"><?=$lang_resource['FOOTER_ABOUT_CONTACT']?></a></li>
            <li>
            	<ul class="socila_icons">
              <?php if($configRec['facebooklink']) {?>
                	<li><a href="#"><img src="images/nav-fb-icon.png"></a></li>
                   <?php } if($configRec['twitterlink']) { ?>
                    <li><a href="#"><img src="images/nav-tw-icon.png"></a></li>
                    <?php } ?>
                    <?php
           if($configRec['linkendinlink']) {?>
                    <li><a href="#"><img src="images/nav-in-icon.png"></a></li>
                    <?php } ?>
                    <?php
           if($configRec['gpluslink']) {?>
                    <li><a href="#"><img src="images/nav-gplus-icon.png"></a></li>
                    <?php } ?>
                    <?php
           if($configRec['rsslink']) { ?> 
                    <li><a href="#"><img src="images/nav-rss-icon.png"></a></li>
                    <?php } ?>
                </ul>
            </li>
            <li><a href="javascript:void(0);" id="lo" onClick="opnlogin();" class="lognhead"><?=$lang_resource['LOGIN']?></a>
            <div id="hedlogbox"></div>
            
            </li>
         </ul>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>
    </header>

<!--//header-->