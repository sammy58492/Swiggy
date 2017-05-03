<?PHP

  function sendMessage(){
    $content = array(
      "en" => 'Order Status is Changed!'
      );
    
    $fields = array(
      'app_id' => "189153bf-6f7b-4e2c-87ce-7fb4a15d475f",
      'isAndroid' => TRUE,
      'include_android_reg_ids' => array('APA91bFgqkhjykqPqL8xSSIKp4zgY2Gc5s5-guBjf2M9nkXUE9cxIap7YIjtgcmwmfMDywGxONdEG186FTe-RAHqknzbIm7mnfpR2Og6XKTIsHO6BoSHn-ww8uHVL9DsQ5_k1DL3_PpE'),
      'data' => array("price" => "36.5", "status" => "Pending", "order_id" => "356"),
      'contents' => $content
    );
    
    $fields = json_encode($fields);
    print("\nJSON sent:\n");
    print($fields);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json',
                           'Authorization: Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);
    
    return $response;
  }
  
  $response = sendMessage();
  $return["allresponses"] = $response;
  $return = json_encode( $return);
  
  print("\n\nJSON received:\n");
  print($return);
  print("\n");
?>