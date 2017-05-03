$(document).ready(function() {

  // Disable button and use AJAX request
  $("#submit").click(function() {
    $("#creditSaleForm").hide();
    $("body").append("<p id=\"ajaxLoading\"><strong>Waiting for response...</strong><br /><img src=\"ajax-loading.gif\" /></p>");
    
    $.post("globalpay.inc.php", $("#creditSaleForm").serialize(), 
      function (data) {
        $("#ajaxLoading").hide();
        $("body").append(data);
      }, "text");
    
    return false;
  });
 
});
