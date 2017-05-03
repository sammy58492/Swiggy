<?php	
require_once('Services/Twilio.php');

function sendSMS($message, $from, $to,$link)
{
	$configs = GetConfigFromPanel(array('sid','token'),$link);
  $configs_array = json_decode($configs);
  
  foreach($configs_array as $config) {
    if($config->name == 'sid') {
      $sid = $config->value;
    }
    if($config->name == 'token') {
      $token = $config->value;
    }
  }

  
  if(empty($sid) || empty($token)) {
    throw new Exception("error_sms_panel_config");
  }
  
  
	$client = new Services_Twilio($sid, $token);
	
	$chunks = str_split($message, 155);
	$total = count($chunks);
	
	if($total > 1)
	{
		for($i = 0; $i < $total; $i++)
		{
			$j = $i + 1;
			$m = "($j/$total) ".$chunks[$i]."\n";
			
			error_log($from . ": " . $m, 3, "messages2.log");
			
			$twilio_message = $client->account->sms_messages->create($from, $to, $m, array());
		
			
			//echo $twilio_message->sid;
		}
	}
	else
	{
		$m = $chunks[0]."\n";
	
		error_log($from . ": " . $m, 3, "messages2.log");
		
		$twilio_message = $client->account->sms_messages->create($from, $to, $m, array());
		
		//echo $twilio_message->sid;
	}
	
}
