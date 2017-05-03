var Facebook = {

    //490170467766254

    AppId: "<?=$records['facebookappid'] ?>",
    Loaded: false,
    Load: function (a) {
        
        $.getScript("//connect.facebook.net/en_US/all.js", function (b, d, c) {
            FB.init({
                appId: Facebook.AppId,
                cookie: true,
                status     : true,
                xfbml      : true,
                version    : 'v2.3' // or v2.0, v2.1, v2.0
            });
            Facebook.Loaded = true;
            a()
        })
    },
    IsConnected: function (a) {
        
        FB.init({
            appId: Facebook.AppId,
            cookie: true,
        });
        FB.getLoginStatus(function (b) {
            if (b.status === "connected") {
                FB.api("/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified", function (c) {
                    if (Facebook.User) {
                        if (a) {
                            a(true)
                        }
                    } else {
                        FB.api("/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified", function (d) {
                            Facebook.User = d;
                            if (a) {
                                a(true)
                            }
                        })
                    }
                })
            } else {
                if (b.status === "not_authorized") {
                    Facebook.NoConnection();
                    if (a) {
                        a(false)
                    }
                } else {
                    Facebook.NoConnection();
                    if (a) {
                        a(false)
                    }
                }
            }
        })
    },
    NoConnection: function () {
        Facebook.User = null
    },
    Login: function () {
       
       if (!Facebook.Loaded) {
            return
        }
        if(viewDevice == "Desktop") {
            if(navigator.userAgent.match('CriOS')){
                var redirectPage = document.location.origin;
                var permissions = "email,publish_actions"
                FB.getLoginStatus(function(response) {
                  if (response.status === 'connected') {
                    FB.api('/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified', function(response) {
                     // alert('Successful login for: ' + response.name);
                     
                      Facebook.User = response;
                      Main.FacebookLoggedIn();                     
                      
                    });

                    /*FB.api("/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified", function (c) {                    
                        if (Facebook.User) {
                            if (a) {
                                a(true)
                            }
                        }else{
                            FB.api("/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified", function (d) {
                                Facebook.User = d;
                               
                                if (Facebook.ClearableOnLogin) {                       
                                    Facebook.ClearableOnLogin();
                                    Facebook.ClearableOnLogin = null
                                } else {
                                    if (Facebook.OnLogin) {                            

                                        Facebook.OnLogin()
                                    }
                                }
                            })
                        }
                    }) */
                  }else{
                     window.location = "https://m.facebook.com/dialog/oauth?client_id=" + Facebook.AppId + "&response_type=code&redirect_uri=" + redirectPage + "&scope=" + permissions;
                  }
                });
            }else{
              FB.login(function (a) {
              
                    if (a.authResponse) {      
                        
                        FB.api("/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified", function (b) {
                           // alert(JSON.stringify(b))
                            // alert(b)
                           
                            Facebook.User = b;
                            if (Facebook.ClearableOnLogin) {                       
                                Facebook.ClearableOnLogin();
                                Facebook.ClearableOnLogin = null
                            } else {
                                if (Facebook.OnLogin) {                            
                                   
                                    Facebook.OnLogin()
                                }
                            }
                        })
                    } else {
                        Facebook.NoConnection()
                    }
                }, {
                    scope: "email,publish_actions"
                })  
            }

            
       }else{

        var redirectPage = document.location.origin+'/mobile.php';

        var permissions = "email,publish_actions"
        FB.getLoginStatus(function(response) {
           
            if (response.status === 'connected') {                
                FB.api("/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified", function (c) {
                    
                    if (Facebook.User) {
                        if (a) {
                            a(true)
                        }
                    } else {
                        FB.api("/me/?fields=id,name,email,first_name,last_name,gender,link,locale,timezone,updated_time,verified", function (d) {
                            Facebook.User = d;
                           
                            if (Facebook.ClearableOnLogin) {                       
                                Facebook.ClearableOnLogin();
                                Facebook.ClearableOnLogin = null
                            } else {
                                if (Facebook.OnLogin) {                            

                                    Facebook.OnLogin()
                                }
                            }
                        })
                    }
                })               
               
                  
            } else {
                window.location = "https://m.facebook.com/dialog/oauth?client_id=" + Facebook.AppId + "&response_type=code&redirect_uri=" + redirectPage + "&scope=" + permissions;
           
            }
        });
            
      

       }
    },
    Feed: function () {
        
        FB.ui({
            method: "feed",
            link: "<?=$configRec['siteurl']?>",
            picture: "<?=$configRec['siteurl']?>/images/logo-medium.png",
            caption: "I just ordered from the best site",
            description: ""
        }, function (a) {
            if (a && a.post_id) {
                alert("Great, shared...");
                Main.Ga("/share/facebook", true);
                Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/receipt")
            } else {
                alert("Sorry, we couldn't share")
            }
        })
    },
    Action: function (a) {
        
        FB.api("/me/demoorderingonlinesy:order?meal=<?=$configRec['siteurl']?>/fborder.htm?locale=en_US", "post", function (b) {
            if (!b || b.error) {
                if (a) {
                    alert("Sorry, we couldn't share." + JSON.stringify(b.error))
                }
            } else {
                if (a) {
                    alert("Great! Order shared...");
                    Main.Ga("/share/facebook", true);
                    Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/receipt")
                }
            }
        })
    },
    Share: function (a) {

        Facebook.ClearableOnLogin = function () {
            Facebook.Action(a)
        };
        Facebook.Login()
    },
};
var Twitter = {
    Loaded: false,
    Load: function (a) {/*
        $.getScript("http://platform.twitter.com/anywhere.js?id=aAmtjsvx5DVEidD6Zwx7Mg&v=1", function (b, d, c) {
            twttr.anywhere(function (e) {
                e.bind("authComplete", function (g, f) {
                    Twitter.User = e.currentUser;
                    if (Twitter.ClearableOnLogin) {
                        Twitter.ClearableOnLogin();
                        Twitter.ClearableOnLogin = null
                    } else {
                        if (Twitter.OnLogin) {
                            Twitter.OnLogin()
                        }
                    }
                })
            });
            Twitter.Loaded = true;
            a()
        })
    */},
    Login: function () {
        if (!Twitter.Loaded) {
            return
        }
        twttr.anywhere(function (a) {
            a.signIn()
        })
    },
    LogOut: function () {
        twttr.anywhere(function (a) {
            twttr.anywhere.signOut();
            Twitter.User = null
        })
    },
    GetUserData: function () {
        if (Twitter.User) {
            alert(JSON.stringify(Twitter.User))
        }
    },
    Tweet: function (b, a) {
        twttr.anywhere(function (c) {
            c.Status.update(b, {
                success: function () {
                    if (a) {
                        alert("Great Tweet!");
                        Main.Ga("/share/twitter", true);
                        Main.Ga("/" + Main.WhereAmIData.cityname + "/cart/receipt")
                    }
                },
                error: function () {
                    if (a) {
                        alert("Sorry, we couldn't tweet your order.")
                    }
                }
            })
        })
    },
    TweetBox: function () {
        var a = '<div class="titlebox nonselectable">';
        a += '<span class="title">&gt;&gt; SHARE ON TWITTER</span>';
        a += '<div id="popuploadingbox"><div id="popupprogressbox" class="progressbox"><div id="popupprogressbar" class="bar"></div></div></div>';
        a += "</div>";
        a += '<div class="editform">';
        a += '<div id="twitspace" style="float:left;">';
        a += "</div>";
        a += "</div>";
        Popup.Show(618, 275, a, null, function () {
            if(document.getElementById("popupmainbuttonok")){   
            document.getElementById("popupmainbuttonok").style.display = "block"
            }
        }, function () {
            if(document.getElementById("popupmainbuttonok")){   
            document.getElementById("popupmainbuttonok").style.display = "none";
            }
            twttr.anywhere(function (b) {
                b("#twitspace").tweetBox({
                    defaultContent: "I just ordered great products  ",
                    label: "",
                    onTweet: function () {
                        Popup.Close();
                        if(document.getElementById("popupmainbuttonok")){   
                        document.getElementById("popupmainbuttonok").style.display = "block";
                        }
                        alert("Great!, Order shared...");
                        Main.Ga("/share/twitter", true);
                        Main.Ga(Main.ActiveView)
                    }
                })
            })
        })
    },
    Share: function (a) {
    console.log("__________________Twitter calling__________________");
    var left = (screen.width/2)-(400/2);
    var top = (screen.height/2)-(300/2);

    window.open('https://twitter.com/?status=I just ordered great products  ', '_blank', 'width=400,height=300, top='+top+', left='+left);
        Twitter.ClearableOnLogin = function () {
            Twitter.Tweet("I just ordered great products  ", a)
        };
        Twitter.Login()
    }
};
