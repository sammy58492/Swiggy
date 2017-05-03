<?php 
	   
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();
switch ($_POST['f']){
	/*New Code For Settings Page*/
	case 'FetchConfigAll':
		FetchConfigAll();
	break;
	case 'SaveConfigs':
		SaveConfigs($_POST['data']);
	break;

	case 'SaveConfigsApps':
		SaveConfigsApps($_POST['data']);
	break;
	
	case 'FetchCountryCity':
		FetchCountryCity($_POST['data']);
	break;
	
	case 'GetSeriveceSettings':
		GetSeriveceSettings($_POST['data']);
	break;
	
	case 'SaveConfigs_sound':
		SaveConfigs_sound($_POST['data']);
	break;
	case 'FetchSiteSchedule':
		FetchSiteSchedule();
	break;
	
	case 'SaveSiteSchedule':
		SaveSiteSchedule($_POST['data']);
	break;

	case 'GetBusinessPageSettings':
		GetBusinessPageSettings();
	break;
	case 'SaveConfigspanelsetting':
		SaveConfigspanelsetting($_POST['data']);
	break;

	case 'GetCheckoutField':
		GetCheckoutField();
	break;
	
	case 'UpdateGlobalItemPointSetting':
		UpdateGlobalItemPointSetting($_POST['data']);
	break;
	
	case 'GetEmailNotificationField':
	GetEmailNotificationField();	
	break;

	//request collection start
	case 'FetchRequestcollectionSchedule':
		FetchRequestcollectionSchedule();
	break;
	case 'GetrequestCollectionSetting':
		GetrequestCollectionSetting();
	break;
	case 'SaveSettingsConfig1':
		SaveSettingsConfig1($_POST['name'],$_POST['value']);
	break;
	case 'GetrequestCollectionDeliveryFee':
		GetrequestCollectionDeliveryFee();
	break;
	case 'SavesaverequestdeliveryfeeConfig':
		SavesaverequestdeliveryfeeConfig($_POST['value']);
	break;
	case 'SaveRequestCollectionSchedule':
		SaveRequestCollectionSchedule($_POST['data']);
	break;
	case 'SaveBringgCompanyAndUser':
		SaveBringgCompanyAndUser($_POST['data']);
	break;

	//request collection end

	/*New Code For Settings Page*/
		
		
	case 'SaveConfig':
		SaveConfig($_POST['name'],$_POST['value']);
	break;
	case 'GetConfig':
		GetConfig($_POST['name']);
	break;
	case 'GetsettingsConfig':
		GetsettingsConfig();
	break;
	case 'SaveSettingsConfig':
		SaveSettingsConfig($_POST['name'],$_POST['value']);
	break;
	
	case 'SaveLanguage':
	    SaveLanguage($_POST['data']);
	break;	
	
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled']);
	break;
	
	case 'SetEnabledEmail':
	SetEnabledEmail($_POST['id'],$_POST['enabled']);
	break;

	case 'DeleteLangsetting':
		DeleteLangsetting($_POST['data']);
	break;
	case 'SetDefault':
		SetDefault($_POST['id']);
	break;
	
	
	case 'SaveManagelang':
	    SaveManagelang($_POST['data']);
	break;
	
	case 'SaveAdminManagelang':
		SaveAdminManagelang($_POST['data']);
		break;

	case 'SaveManagelang1':
	    SaveManagelang1($_POST['data']);
	break;
	//tabsetting start
	
	case 'GetTabSettings':
		GetTabSettings();
	break;
	case 'GetFrontSettings':
		GetFrontSettings();
	break;
	//tabsetting end 
	
	case 'GetSoundSettings':
		GetSoundSettings();
	break;
	case 'GetLangConfig':
		GetLangConfig();
	break;
	
	case 'GetManagelangConfig':
		GetManagelangConfig();
	break;

	case 'GetManagelangConfigAdmin':
		GetManagelangConfigAdmin();
	break;
	
	case 'FetchLanguagesettingsData':
		FetchLanguagesettingsData($_POST['id']);
		break;
	case 'FetchLanguagemanageData':
		FetchLanguagemanageData($_POST['id']);
		break;
	case 'FetchLanguagemanageDataAdmin':
		FetchLanguagemanageDataAdmin($_POST['id']);
		break;

	case 'CheckLanguagedata':
		CheckLanguagedata($_POST['lang_key'],$_POST['langid']);
		break;
	case 'GetPrinterPathConfig':
		GetPrinterPathConfig();
	break;
	//Settings to zipcode validation 
	case 'Getzipcodevalidation':
		Getzipcodevalidation();
	break;
		case 'Getzipcodevalidationall':
		Getzipcodevalidationall($_POST['value']);
	break;
	break;
		case 'SaveSettingszipcodevalidationLength':
		SaveSettingszipcodevalidationLength($_POST['value']);
	break;
	case 'SaveSettingsConfigzipcodevalidation':
	      SaveSettingsConfigzipcodevalidation($_POST['name'],$_POST['value'],$_POST['name1'],$_POST['value1']);
	break;	
	
	case 'SaveManageLanguageAvailabilityCheck':
		SaveManageLanguageAvailabilityCheck($_POST['data']);
	break;
	
	case 'SaveManageLanguageAdminAvailabilityCheck':
		SaveManageLanguageAdminAvailabilityCheck($_POST['data']);
	break;
	
	case 'SaveBusiness':
		SaveBusiness($_POST['data']);
	break;
	
	case 'langchangeadmin':
		langchangeadmin($_POST['id']);
	break;  
	case 'SaveBringgPermissionForEach':
		SaveBringgPermissionForEach($_POST['id']);
	break;  

	case 'FetchItemPointPermission':
		FetchItemPointPermission();
	break;
	  
	  case 'FetchGlobalItemPointSetting':
		FetchGlobalItemPointSetting();
	break;

	 case 'UpdateItemPointSettings':
		UpdateItemPointSettings($_POST['data']);
	break;

	default:
		die();
	break;
	}
/*New Code For Settings Page*/	
function FetchConfigAll(){
	//SuperAdminsOnly();
	$link = ConnectDB();			
	pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name!=$1 order by id');
	$result = pg_execute($link,'sql',array('siteschedule'));

	if(pg_num_rows($result)>0){		
		$sett =array();
		while($row=pg_fetch_array($result)){			
			$fields = array();
			$fields['id'] = $row['id'];
			$fields['name'] = $row['name']; 
			$fields['value'] = $row['value'];
			$fields['ivalue'] = $row['value'];
			$sett[$row['name']]=$fields;
		}	
	}
	$settings = array();
	$settings['settings'] = $sett;
	echo json_encode($settings);	
	pg_close($link);
}


function langchangeadmin($id){
    session_start();
	$_SESSION['admin_lang']= $id;
}

//request collection start

function SaveBringgCompanyAndUser($value){
	
	$link = ConnectDB();
	$form = parse($value);

	pg_prepare($link,'sqlbrp','SELECT value FROM w_configs WHERE name=$1');
	$resultpremission = pg_execute($link,'sqlbrp',array("BRING_PERMISSION_TYPE"));
	$configbrpe  = pg_fetch_array($resultpremission);


   if($configbrpe['BRING_PERMISSION_TYPE'] == 'true'){
   	$test = "true";
	pg_prepare($link,'sqlbr','SELECT value FROM w_configs WHERE name=$1');
	$resultbr = pg_execute($link,'sqlbr',array("BRIMG_ACCESS_TOKEN_LIVE"));
	$configbr  = pg_fetch_array($resultbr);
	
	pg_prepare($link,'sqlbr2','SELECT value FROM w_configs WHERE name=$1');
	$resultbr2 = pg_execute($link,'sqlbr2',array("BRIMG_SECRET_KEY_LIVE"));
	$configbr2  = pg_fetch_array($resultbr2);



   } else {
	$test = "false";
	pg_prepare($link,'sqlbr','SELECT value FROM w_configs WHERE name=$1');
	$resultbr = pg_execute($link,'sqlbr',array("BRIMG_ACCESS_TOKEN_TEST"));
	$configbr  = pg_fetch_array($resultbr);
	
	pg_prepare($link,'sqlbr2','SELECT value FROM w_configs WHERE name=$1');
	$resultbr2 = pg_execute($link,'sqlbr2',array("BRIMG_SECRET_KEY_TEST"));
	$configbr2  = pg_fetch_array($resultbr2);

   }
	

	

		
	//////////////bring////////////////////
			$url = 'http://api.bringg.com/partner_api/companies';
						$data_string = array(
						'name' => $form->fields->BRINGG_USER_NAME->value,
						'test' => $test,
						'address' => $form->fields->BRINGG_ADDRESS->value,
						'phone' => $form->fields->BRINGG_PHONE->value,
						'access_token' => $configbr['value'],
						'timestamp' => date('Y-m-d H:i:s')
						);
						$secret_key = $configbr2['value'];
						
					
						$signature = hash_hmac("sha1", http_build_query($data_string), $secret_key);
						
					    $data_string["signature"] = $signature;
				
						$content = json_encode($data_string);
						
						
					
						$ch=curl_init($url);
						curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
						curl_setopt($ch, CURLOPT_POST, true);
						curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
						curl_setopt($ch, CURLOPT_HEADER, false);
						curl_setopt($ch, CURLOPT_HTTPHEADER,
						array('Content-Type:application/json',
						'Content-Length: ' . strlen($content))
						);
						curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
						$json_response = curl_exec($ch);
						$status = curl_getinfo($ch);
						curl_close($ch);
						$return_data = json_decode($json_response);
						
						
					//	print_r($return_data);
						
						


						
			if($return_data->error) {
			echo $return_data->error;
			} else if($return_data->message->phone) {
								
			echo $return_data->message->phone[0];
							
			} else  {
				
			if($return_data->company->id) {
				
				
				$urluser = 'http://api.bringg.com/partner_api/users';
				
				$data_string_user = array(
				'company_id' => $return_data->company->id,
				'name' => $form->fields->BRINGG_USER_NAME->value,
				'email' => $form->fields->BRINGG_EMAIL->value,
				'password' => $form->fields->BRINGG_PASSWORD->value,
				'admin' => "true",
				//'access_token' => "pyZgq26MSTrjBJys5zxe",
				'access_token' => $configbr['value'],
				'timestamp' => date('Y-m-d H:i:s')
				);
				$secret_key = $configbr2['value'];
				
				// OpenSSL::HMAC.hexdigest("sha1", @partner.hmac_secret, to_query(canonical_params))
				$signature = hash_hmac("sha1", http_build_query($data_string_user), $secret_key);
				
				//print("The signature: " + $signature);
				
				$data_string_user["signature"] = $signature;
				
				//print("this is the data string: ");
				//print_r($data_string);
				
				$contents = json_encode($data_string_user);
				
				//print("The content: " + $content);
				// $data_string = json_encode($data);
				$ch=curl_init($urluser);
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $contents);
				curl_setopt($ch, CURLOPT_HEADER, false);
				curl_setopt($ch, CURLOPT_HTTPHEADER,
				array('Content-Type:application/json',
				'Content-Length: ' . strlen($contents))
				);
				curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
				//curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
				
				$json_responses = curl_exec($ch);
				
				$status = curl_getinfo($ch);
				
				curl_close($ch);
				
				$return_data_user = json_decode($json_responses);
				
		
			pg_prepare($link,'sqlbrg1','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrg1',array($return_data->company->id,'BRINGG_COMPANY_ID'));
			
			pg_prepare($link,'sqlbrg11','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrg11',array($return_data_user->id,'BRINGG_USER_ID'));
			
			pg_prepare($link,'sqlbrg12','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrg12',array($form->fields->BRINGG_USER_NAME->value,'BRINGG_USER_NAME'));
			
			pg_prepare($link,'sqlbrg13','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrg13',array($form->fields->BRINGG_PASSWORD->value,'BRINGG_PASSWORD'));
			
			pg_prepare($link,'sqlbrgp15','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrgp15',array($form->fields->BRINGG_PHONE->value,'BRINGG_PHONE'));
			
			pg_prepare($link,'sqlbrg14','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrg14',array($form->fields->BRINGG_ADDRESS->value,'BRINGG_ADDRESS'));
			
			pg_prepare($link,'sqlbrg15','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrg15',array($form->fields->BRINGG_EMAIL->value,'BRINGG_EMAIL'));
			
			
			
			echo "success";
			}
			else {
			echo "Sorry! Bringg Apps not created successfully ";	
				
				}
			} 

	
}
function SavesaverequestdeliveryfeeConfig($value){
		$link = ConnectDB();
		
		  $form = parse($value);
		 
		   $fields= get_object_vars($form);
		 
		 pg_prepare($link,'sql4554','DELETE FROM w_requestcollectiondeliveryfee');
					pg_execute($link,'sql4554',array());
		   	 
			   for($i=1;$i<=$fields["tot_time"];$i++){
				   if(isset($fields["distancefrom".$i])){
					   
					   $distancefrom=$fields["distancefrom".$i]->value;
					   $distanceto=$fields["distanceto".$i]->value;
					   $price=$fields["price".$i]->value;
					   pg_prepare($link,'sqli'.$i,"SELECT nextval('w_requestcollectiondeliveryfee_id_seq') as key");
						$result = pg_execute($link,'sqli'.$i,array());

								if (pg_num_rows($result)==1)
									while($row = pg_fetch_array($result))
										$id_unchanged = $row['key'];	
			
						pg_prepare($link,'sqlq'.$i,'INSERT INTO w_requestcollectiondeliveryfee (distancefrom,distanceto,price,id) VALUES ($1,$2,$3,$4)');
						pg_execute($link,'sqlq'.$i,array($distancefrom,$distanceto,$price,$id_unchanged));
					   
				   }
				   
			   }
		 
	}
function GetrequestCollectionSetting(){
	$link = ConnectDB();	
	$requestCollectionSetting = new stdClass();
	//unset($requestCollectionSetting);
	pg_prepare($link,'sqlrequestCollectionSetting','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlrequestCollectionSetting',array());
	while($row = pg_fetch_array($result)){
		
		if($row['name'] == 'requestCollectionSettingcity'){
			$requestCollectionSetting->requestCollectionSettingcity = $row['value'];
		}
		if($row['name'] == 'requestCollectionSettingenabled'){
			$requestCollectionSetting->requestCollectionSettingenabled = $row['value'];
		}
		
		if($row['name'] == 'requestCollectionSettinglocation'){
			$requestCollectionSetting->requestCollectionSettinglocation = parse($row['value']);
		}
		if($row['name'] == 'requestCollectionSettingPaypal'){
			$requestCollectionSetting->requestCollectionSettingPaypal = $row['value'];
		}
		if($row['name'] == 'requestCollectionSettingPaypalType'){
			$requestCollectionSetting->requestCollectionSettingPaypalType = $row['value'];
		}
		
	}
	pg_prepare($link,'sqlrequestCollectionSettingcity','SELECT * FROM w_franchises');
	$result1 = pg_execute($link,'sqlrequestCollectionSettingcity',array());
	$cityarray=array();

	while($row1 = pg_fetch_array($result1)){
		//	unset($cityobj);
		$cityobj = new stdClass();
		$cityobj->id=$row1["id"];
		$cityobj->city=$row1["city"];
		$cityobj->email=$row1["email"];
		$cityobj->timezone=$row1["timezone"];
		$cityobj->currency=$row1["currency"];
		array_push($cityarray,$cityobj);
		
	}
	$requestCollectionSetting->cityarray = $cityarray;
	echo json_encode($requestCollectionSetting);
	pg_close($link);	
}
function SaveSettingsConfig1($name,$value)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	
	
	pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));
	$id = -1;
	$value=json_decode($value);

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$id = $row['id'];
			$oldvalue = $row['value'];
		}

	if ($id==-1)//no ga config.. create it
		{
		
		pg_prepare($link,'sql2','INSERT INTO w_configs (name,value) VALUES ($1,$2)');
		if (pg_execute($link,'sql2',array($name,$value)))
			echo 'ok';
		}
		else//ga config exists, update it
		{
			//echo $oldvalue."-".$value;
			if($oldvalue != $value)
					{
						if($value != "null") {
						
		pg_prepare($link,'sql2','UPDATE w_configs SET value=$2 WHERE id=$1');
		if (pg_execute($link,'sql2',array($id,$value)))
			echo 'ok';
				}
		}
				else
			{
				echo 'ok';
			}
			}
			
	pg_close($link);
	}
function GetrequestCollectionDeliveryFee(){
	$link = ConnectDB();	
	//unset($requestCollectionSetting);
	$requestCollectionSetting = new stdClass();
	pg_prepare($link,'sqlrequestCollectionSettingDeliveryFee','SELECT * FROM w_requestcollectiondeliveryfee');
	$result1 = pg_execute($link,'sqlrequestCollectionSettingDeliveryFee',array());
	$deliveryfeearray=array();

	while($row1 = pg_fetch_array($result1)){
		
		//	unset($deliveryfeeobj);
		$deliveryfeeobj = new stdClass();
		$deliveryfeeobj->id=$row1["id"];
		$deliveryfeeobj->distanceto=$row1["distanceto"];
		$deliveryfeeobj->distancefrom=$row1["distancefrom"];
		$deliveryfeeobj->price=$row1["price"];
		array_push($deliveryfeearray,$deliveryfeeobj);
		
	}
	$requestCollectionSetting->deliveryfeearray = $deliveryfeearray;
	echo json_encode($requestCollectionSetting);
	pg_close($link);	
}	
//request collection end
function SaveConfigs_sound($data){

	//SuperAdminsOnly();
	
		
	$link = ConnectDB();
	$data = parse($data);
	//print_r($data);
	
	pg_prepare($link,'sql','UPDATE w_configs set value=$1 where id=$2');	
	foreach($data as $setting){
		if($setting->ivalue != $setting->value){
			pg_execute($link,'sql',array($setting->value,$setting->id));			
		}
	}
	
	unset($panelsettings);
	pg_prepare($link,'sqlpanel','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlpanel',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'panelsetting'){
			$panelsettings = new stdClass();
			$panelsettings->panelsetting = $row['value'];
		}
		
	}
	echo json_encode($panelsettings);
	
	
}
function SaveConfigspanelsetting($data) {
	$link = ConnectDB();
	$data = parse($data);
	
	pg_prepare($link,'sqlpl','UPDATE w_configs set value=$1 where name=$2');
	pg_execute($link,'sqlpl',array($data->value,$data->name));	
	
	pg_prepare($link,'sqlpanel','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlpanel',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'panelsetting'){
			$panelsettings = new stdClass();
			$panelsettings->panelsetting = $row['value'];
		}
		
	}
	echo json_encode($panelsettings);
	
	}

	function SaveConfigsApps ($data){

	$link = ConnectDB();
	$data = parse($data);
	$newarray = array();
	
	foreach($data as $set){		

		$set->value = str_replace("###","+",$set->value);
		$set->ivalue = str_replace("###","+",$set->ivalue);

		$set->value = base64_decode($set->value);
		$set->ivalue = base64_decode($set->ivalue);		

		$set->value = str_replace("@@@","+",$set->value);
		$set->ivalue = str_replace("@@@","+",$set->ivalue);

		////// + sign  fetch and insert into db //////////////
		
		array_push($newarray, $set);
	}
		
	pg_prepare($link,'sql','UPDATE w_configs set value=$1 where id=$2');	
	
	foreach($newarray as $setting){
		
		if($setting->ivalue != $setting->value){
			pg_execute($link,'sql',array($setting->value,$setting->id));			
		}
	}

	unset($panelsettings);
	pg_prepare($link,'sqlpanel','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlpanel',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'panelsetting'){
			$panelsettings->panelsetting = $row['value'];
		}
		
	}
	echo json_encode($panelsettings);
	
	
}


function SaveConfigs($data){

	$link = ConnectDB();
	$data = parse($data);
	$newarray = array();
	
	foreach($data as $set){
		
		$set->value = str_replace("###","+",$set->value);
		$set->ivalue = str_replace("###","+",$set->ivalue);
		
		$set->value = base64_decode($set->value);
		$set->ivalue = base64_decode($set->ivalue);		

		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->value)); 
		$set->value = html_entity_decode($varr,null,'UTF-8');

		$varr1 = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set->ivalue)); 
		$set->ivalue = html_entity_decode($varr1,null,'UTF-8');*/
		
		////// + sign  fetch and insert into db //////////////
		
		////// end//////////////

		array_push($newarray, $set);
	}
		
	
	pg_prepare($link,'sql','UPDATE w_configs set value=$1 where id=$2');	
	
	foreach($newarray as $setting){
		
		if($setting->ivalue != $setting->value){
			pg_execute($link,'sql',array($setting->value,$setting->id));			
		}
	}
	/*print_r($newarray);
	echo "end";
	exit;*/
	//unset($panelsettings);
	$panelsettings = new stdClass();
	pg_prepare($link,'sqlpanel','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlpanel',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'panelsetting'){
			$panelsettings->panelsetting = $row['value'];
		}
		
	}
	echo json_encode($panelsettings);
	
	
}

function SaveBusiness($data){
	
	$link = ConnectDB();

	$data = parse($data);

	$newarray = array();
	/*echo"<pre>";
	print_r($data);*/
		
   $id  = $data->id;
   $a = $data->fields->BRINGG_COMPANY_ID->value;
   $b = $data->fields->BRING_PERMISSION->value;
	
	
	
	pg_prepare($link,'sql',"UPDATE w_business set bringgcompanyid=$1, bringpermission=$2 WHERE id=$3");	
	pg_execute($link,'sql',array($a,$b,$id));


	unset($panelsettings);
	pg_prepare($link,'sqlpanel','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlpanel',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'panelsetting'){
			$panelsettings->panelsetting = $row['value'];
		}
		
	}
	echo json_encode($panelsettings);
	
	
}	
/*New Code For Settings Page*/	
/*******************************************GET ORDERS DATA**********************************************/
	//tabsetting start
function GetTabSettings()
{
	
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_tabsettings WHERE scriptid =$1');
	$result = pg_execute($link,'sql',array($_SESSION['scriptid']));

	$settings = array();
		while($row = pg_fetch_array($result)) {
		//	unset($setting);
			$setting = new stdClass();
			$setting->id = $row['id'];
			$setting->country= $row['country'];
			$setting->city = $row['city'];
			$setting->tab_delivery = $row['tab_delivery'];
			$setting->tab_delivery_country = $row['tab_delivery_country'];
			$setting->tab_delivery_city = $row['tab_delivery_city'];
			$setting->tab_delivery_address = $row['tab_delivery_address'];
			$setting->tab_delivery_neighborhood = $row['tab_delivery_neighborhood'];			
			$setting->tab_delivery_option = $row['tab_delivery_option'];
			$setting->tab_pickup = $row['tab_pickup'];
			$setting->tab_pickup_country = $row['tab_pickup_country'];
			$setting->tab_pickup_city = $row['tab_pickup_city'];
			$setting->tab_pickup_option = $row['tab_pickup_option'];
			$setting->tab_reservation = $row['tab_reservation'];
			$setting->tab_reservation_country = $row['tab_reservation_country'];
			$setting->tab_reservation_city = $row['tab_reservation_city'];
			$setting->tab_reservation_option = $row['tab_reservation_option'];
			$setting->list_step = $row['list_step'];
			$setting->search_city = $row['search_city'];
			$setting->autocomplete = $row['autocomplete'];
			$setting->gibberish = $row['gibberish'];

			$setting->tab_food = $row['tab_food'];
			$setting->tab_alcohol = $row['tab_alcohol'];
			$setting->tab_groceries = $row['tab_groceries'];
			$setting->tab_laundry = $row['tab_laundry'];

			array_push($settings,$setting);
		}
		echo json_encode($settings);

	pg_close($link);
	
	
}


function GetFrontSettings()
{
	
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_frontsettings');
	$result = pg_execute($link,'sql',array());
	
	$settings = array();
		while($row = pg_fetch_array($result)) {
		//	unset($setting);
		$setting = new stdClass();
			$setting->id = $row['id'];
			
			
			$countrytags=array();
				$row['countrytag']= parse($row['countrytag']);
				foreach($row['countrytag'] as $val){
			if( $val!='-1'){
			
				//print_r($row['countrytag']);
				 pg_query($link, "DEALLOCATE ALL");
				pg_prepare($link,'sql3','SELECT * FROM w_countries WHERE id=$1');
				$result1 = pg_execute($link,'sql3',array($val));
				while($row1 = pg_fetch_array($result1)) {
						//unset($countrytag);
						
						$countrytag->id=$val;
						$countrytag->name=$row1['name'];
					
						array_push($countrytags,$countrytag);
				}
				
			}else{
				$countrytag = new stdClass();
				$countrytag->id=$val;
				$countrytag->name="All";
					array_push($countrytags,$countrytag);
			}
			
				}
			$setting->countrytag= $countrytags;
			
			$citytags=array();
				$row['citytag']= parse($row['citytag']);
				foreach($row['citytag'] as $val){
			if( $val!='-1'){
			
				//print_r($row['countrytag']);
				 pg_query($link, "DEALLOCATE ALL");
				pg_prepare($link,'sql44','SELECT * FROM w_franchises WHERE id=$1');
				$result1 = pg_execute($link,'sql44',array($val));
				while($row1 = pg_fetch_array($result1)) {
						//unset($citytag);
						$citytag = new stdClass();
						$citytag->id=$val;
						$citytag->name=$row1['city'];
						$citytag->country=$row1['country'];
					
						array_push($citytags,$citytag);
				}
				
			}else{
				$citytag = new stdClass();
				$citytag->id=$val;
				$citytag->name="All";
				$citytag->country=$val;
					array_push($citytags,$citytag);
			}
			
				}
			
			
			$setting->citytag = $citytags;
			
			
			$restaurants=array();
				$row['restaurant']= parse($row['restaurant']);
				foreach($row['restaurant'] as $val){
			if( $val!='-1'){
			
				//print_r($row['countrytag']);
				 pg_query($link, "DEALLOCATE ALL");
				pg_prepare($link,'sql45','SELECT * FROM w_business WHERE id=$1');
				$result1 = pg_execute($link,'sql45',array($val));
				while($row1 = pg_fetch_array($result1)) {
						unset($restaurant);
						$restaurant->id=$val;
						$restaurant->name=$row1['name'];
						$restaurant->city=$row1['city'];
						$restaurant->country=$row1['country'];
					
						array_push($restaurants,$restaurant);
				}
				
			}else{
				$restaurant = new stdClass();
				$restaurant->id=$val;
				$restaurant->name="All";
					array_push($restaurants,$restaurant);
			}
			
				}
			
			
			$setting->citytag = $citytags;
			$setting->restaurant = $restaurants;
			$setting->browse_per_city = $row['browse_per_city'];
			$setting->popular_restaurant = $row['popular_restaurant'];
			$setting->popular_cuisine = $row['popular_cuisine'];
			$setting->map_posititon = $row['map_posititon'];
			$setting->business_owner_register = $row['business_owner_register'];
			$setting->product_image = $row['product_image'];
			$setting->slider_duration = $row['slider_duration'];
			$setting->sildersetiings = $row['sildersetiings'];
			$setting->reviewsetting = $row['reviewsetting'];
			$setting->cityhomepage = $row['cityhomepage'];
			$setting->homedefaultcity = $row['homedefaultcity'];
			$setting->how_it_works = $row['how_it_works'];
			$setting->foodof_the_week = $row['foodof_the_week'];
			$setting->recent_orders = $row['recent_orders'];
			$setting->lets_be_friends = $row['lets_be_friends'];
			$setting->amazing_apps = $row['amazing_apps'];
			
			
			array_push($settings,$setting);
		}
		
		echo json_encode($settings);

	pg_close($link);
	
}

//tabsetting end 


function SaveConfig($name,$value)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));
	$id = -1;

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$id = $row['id'];
			$oldvalue = $row['value'];
		}

	if ($id==-1)//no ga config.. create it
		{
		pg_prepare($link,'sql2','INSERT INTO w_configs (name,value) VALUES ($1,$2)');
		if (pg_execute($link,'sql2',array($name,$value)))
			echo 'ok';
		}
		else//ga config exists, update it
		{
			if($oldvalue != $value)
					{
		pg_prepare($link,'sql2','UPDATE w_configs SET value=$2 WHERE id=$1');
		if (pg_execute($link,'sql2',array($id,$value)))
			echo 'ok';
				}
				else
			{
				echo 'ok';
			}
			}
	pg_close($link);
	}
	function SaveSettingsConfig($name,$value)
	{
	//SuperAdminsOnly();
	$link = ConnectDB();	
	//Reset counter start
	$w_config_unchangedArr=array("updateBackupinsec","isupdateBackupinsec");
	if(!in_array($name,$w_config_unchangedArr)){		
	//Reset counter end
	pg_prepare($link,'sql'.$name,'SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql'.$name,array($name));
	$id = -1;

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$id = $row['id'];
			$oldvalue = $row['value'];
		}

	if ($id==-1)//no ga config.. create it
		{
		pg_prepare($link,'sql2','INSERT INTO w_configs (name,value) VALUES ($1,$2)');
		if (pg_execute($link,'sql2',array($name,$value)))
			echo 'ok';
		}
		else//ga config exists, update it
		{
			//echo $oldvalue."-".$value;
			if($oldvalue != $value)
					{
						if($value != "null") {
		pg_prepare($link,'sql2','UPDATE w_configs SET value=$2 WHERE id=$1');
		if (pg_execute($link,'sql2',array($id,$value)))
			echo 'ok';
				}
		}
				else
			{
				echo 'ok';
			}
			}
			//Reset counter start
	}else{
		
		
		pg_prepare($link,'sql','SELECT * FROM w_config_unchanged WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));
	$id = -1;

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$id = $row['id'];
			$oldvalue = $row['value'];
		}

	if ($id==-1)//no ga config.. create it
		{
			$id_unchanged = 1;
	pg_prepare($link,'sqli1',"SELECT nextval('w_config_unchanged_id_seq') as key");
	$result = pg_execute($link,'sqli1',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id_unchanged = $row['key'];	
			
		pg_prepare($link,'sql2','INSERT INTO w_config_unchanged (name,value,id) VALUES ($1,$2,$3)');
		if (pg_execute($link,'sql2',array($name,$value,$id_unchanged)))
			echo 'ok';
		}
		else//ga config exists, update it
		{
			//echo $oldvalue."-".$value;
			if($oldvalue != $value)
					{
						if($value != "null") {
		pg_prepare($link,'sql2','UPDATE w_config_unchanged SET value=$2 WHERE id=$1');
		if (pg_execute($link,'sql2',array($id,$value)))
			echo 'ok';
				}
		}
				else
			{
				echo 'ok';
			}
			}
			
	}		
	//Reset counter end
	pg_close($link);
	}
	


function GetConfig($name)
	{
	SuperAdminsOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT value FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array($name));

	if (pg_num_rows($result)==1)  {
		while($row = pg_fetch_array($result))
			echo $row['value'];
			//Reset counter start
	}else{
		
		pg_prepare($link,'sql22','SELECT value FROM w_config_unchanged WHERE name=$1');
		$result = pg_execute($link,'sql22',array($name));
	
		if (pg_num_rows($result)==1) { 
			while($row = pg_fetch_array($result))
				echo $row['value'];
		}
	}
	//Reset counter end
	pg_close($link);
	}
	
function GetsettingsConfig()
{
SuperAdminsOnly();
$link = ConnectDB();
pg_prepare($link,'sql','SELECT * FROM w_configs ORDER BY id ASC');
$result = pg_execute($link,'sql',array());

while($row = pg_fetch_array($result)) {

$keyName=$row['name'];
$setting[$keyName]=$row['value'];
}
//Reset counter start
pg_prepare($link,'sql1','SELECT * FROM w_config_unchanged ORDER BY id ASC');
	$result = pg_execute($link,'sql1',array());

		while($row = pg_fetch_array($result)) {
			
			
			$keyName=$row['name'];
			$setting[$keyName]=$row['value'];
		}
//Reset counter end
echo json_encode($setting);
pg_close($link);
}


function GetSoundSettings(){
	$link = ConnectDB();	
	
	unset($soundsettings);
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		if($row['name'] == 'superadminsoundstatus'){
			$soundsettings->superadminsoundstatus = $row['value'];
		}
		if($row['name'] == 'superadminsoundduration'){
			$soundsettings->superadminsoundduration = $row['value'];
		}
		if($row['name'] == 'businesssoundstatus'){
			$soundsettings->businesssoundstatus = $row['value'];
		}
		if($row['name'] == 'businesssoundduration'){
			$soundsettings->businesssoundduration = $row['value'];
		}
	}
	echo json_encode($soundsettings);
	pg_close($link);	
}
/****************************************************INSERT LANGUAGE SETTINGS DATA *********************************************************** */

function SaveLanguage($data){
		
	SuperAdminsOnly();
	require('../config.php');	
	$form = parse($data);
	$language_id = $form->id;
	if ($form->type=='create'){		

		$link = ConnectDB();
		pg_prepare($link,'sqlfetchitem','SELECT * FROM w_lang_setting');
		$result1 = pg_execute($link,'sqlfetchitem',array());
		if(pg_num_rows($result1)==0){
			$form->fields->opdefault = new stdClass();
			$form->fields->opdefault->ivalue = '';
			$form->fields->opdefault->value = 1;	
		}else{
			$form->fields->opdefault = new stdClass();
			$form->fields->opdefault->ivalue = '';
			$form->fields->opdefault->value = 0;
		}	
		pg_close($link);	

		$language_id = InsertQuery('w_lang_setting',$form->fields,$CFG);			
		$d = "langtext"."_".$language_id;
		echo $d;
		$link = ConnectDB();
		pg_prepare($link,'sqlalt','ALTER TABLE w_lang_static ADD "'.$d.'" text');
		pg_execute($link,'sqlalt',array());
		
		pg_prepare($link,'sqlaltadmin','ALTER TABLE w_lang_admin ADD "'.$d.'" text');
		pg_execute($link,'sqlaltadmin',array());
		
		pg_close($link);	
	}else{
	   UpdateQuery('w_lang_setting',$form->fields,$language_id,$CFG);	
	}

	if ($form->image){			 
		$oldname = $CFG->dir.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'lang/',$oldname,$language_id,false,'/1');
		$link = ConnectDB();		
		pg_prepare($link,'sql1','UPDATE w_lang_setting SET isimg=$1 WHERE id=$2');
		pg_execute($link,'sql1',array(1,$language_id));
		pg_close($link);
	}else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	if ($form->type=='create'){			
		$link = ConnectDB();		
		pg_prepare($link,'sql1','UPDATE w_lang_setting SET isimg=$1 WHERE id=$2');
		pg_execute($link,'sql1',array(0,$language_id));
		pg_close($link);
	}
}

/******************************************* FETCH LANGUAGE SETTINGS DATA **************************************/
function GetLangConfig()
{
	
	SuperAdminsOnly();
   $link = ConnectDB();			
	pg_prepare($link,'sqllang','SELECT * FROM w_lang_setting ORDER BY id');
	$result = pg_execute($link,'sqllang',array());

	$languages = array();
		while($row = pg_fetch_array($result)) {
			//unset($language);
			$language = new stdClass();
			$language->id = $row['id'];
			$language->lang_text= $row['lang_text'];
			$language->opdefault= $row['opdefault'];
			$language->enabled = $row['enabled'];
			$language->lang_short_code = $row['lang_short_code'];
			
			array_push($languages,$language);
		}
		echo json_encode($languages);

	pg_close($link);
	
	
}


/****************************************************ENABLED OR DISABLED LANGUAGE SETTINGS DATA *********************************************************** */

function SetEnabled($id,$enabled)
	{
	SuperAdminsOnly();
	//ProvidersOnly();
	$link = ConnectDB();		
	$data = parse($data);
	
	pg_prepare($link,'sqlu151','SELECT * FROM w_lang_setting WHERE id=$1');
	$result=pg_execute($link,'sqlu151',array($id));
	
	$row = pg_fetch_array($result);
	if($row['opdefault']==1){
		echo $row['opdefault'];
	}else{
	
	pg_prepare($link,'sql','UPDATE w_lang_setting SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
		
	}
	pg_close($link);
	}

/****************************************************FETCH PARTICULAR LANGUAGE SETTINGS DATA *********************************************************** */

	function FetchLanguagesettingsData($id)
	{
	SuperAdminsOnly();
	
	require('../config.php');
	$link1 = ConnectDB($CFG);	
	
	pg_prepare($link1,'sqllang1','SELECT * FROM w_lang_setting WHERE id=$1');
	$result = pg_execute($link1,'sqllang1',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			//unset($ad);
			$ad = new stdClass();
			$ad->id = $row['id'];
			$ad->lang_text = $row['lang_text'];
			$ad->opdefault = $row['opdefault'];
			
			$ad->enabled = $row['enabled'];
			$ad->lang_short_code = $row['lang_short_code'];
			
			
			}
	
	echo json_encode($ad);
	}



function SetEnabledEmail($id,$enabled){
$link = ConnectDB();
pg_prepare($link,'sqli','UPDATE w_configs_email SET status=$1 WHERE id=$2');
if (pg_execute($link,'sqli',array($enabled,$id)))
echo 'ok';
pg_close($link);
}

/*******************************************DELETE  LANGUAGE SETTINGS DATA ************************************************ */

function DeleteLangsetting($data)
	{
	//SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'lang/' . $id . '/');
		$dd = "langtext"."_".$id;

		
		pg_prepare($link,'sqlaltd'.$id,'ALTER TABLE w_lang_static DROP "'.$dd.'"');
		pg_execute($link,'sqlaltd'.$id,array());

		pg_prepare($link,'sqlaltdadmin'.$id,'ALTER TABLE w_lang_admin DROP "'.$dd.'"');
		pg_execute($link,'sqlaltdadmin'.$id,array());
		
		pg_prepare($link,'sql'.$id,'DELETE FROM w_lang_setting WHERE id=$1');
		$result = pg_execute($link,'sql'.$id,array($id));	
		}
	pg_close($link);
	}

/****************************************************DEFAULT VALUE OF  LANGUAGE SETTINGS DATA *********************************************************** */

function SetDefault($id)
	{
	SuperAdminsOnly();
	//ProvidersOnly();
	$link = ConnectDB();		
	//$data = parse($data);
	
/*	pg_prepare($link,'sqldefault','SELECT * FROM w_lang_setting WHERE default=$1');
	$result = pg_execute($link,'sqldefault',array(1));
	if (pg_num_rows($result) >0)
	{
	 while($row = pg_fetch_array($result))
	  {
		 unset($ad);
		 $adid = $row['id']; 
		  
	  }
	}
	*/
	session_start();
	
	pg_prepare($link,'sqlu15','SELECT * FROM w_lang_setting WHERE id=$1');
	$result=pg_execute($link,'sqlu15',array($id));
	
	$row = pg_fetch_array($result);
	if($row['enabled']!='t'){
		echo $row['enabled'];
	}else{


	pg_prepare($link,'sqlu1','UPDATE w_lang_setting SET opdefault=$1  WHERE id=$2');
	$result=pg_execute($link,'sqlu1',array(1,$id));
		
		
	pg_prepare($link,'sqlu2','UPDATE w_lang_setting SET opdefault=$1 WHERE id<>$2');
	$result1=pg_execute($link,'sqlu2',array(0,$id));
		
	}
	pg_close($link);
	}


function SaveManageLanguageAvailabilityCheck($data){
		 require('../config.php');	
		 $link = ConnectDB();
		 $form = parse($data);

		 $langval = $form->fields->lang_key->value;
		 $formid = $form->id; 
		 if ($form->type=='create'){
			pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_static where lang_key=$1'); 	
			$result1 = pg_execute($link,'sqllangfetch',array($langval));	
			//while($row1=pg_fetch_array($result1)){
				$row1=pg_num_rows($result1);
				//echo $row1;
				if($row1>0)	{
					echo "ok";
				}
			//}
			 
		 }else{			 
			pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_static where lang_key=$1 and id!=$2'); 	
			$result1 = pg_execute($link,'sqllangfetch',array($langval,$formid));	
			$row1=pg_num_rows($result1);
				if($row1>0)	{
					echo "ok";
				}
			//}
			 
		}
}

function SaveManageLanguageAdminAvailabilityCheck($data){		 
		 
		 require('../config.php');	
		 $link = ConnectDB();
		 $form = parse($data);

		 $langval = $form->fields->lang_key->value;
		 $formid = $form->id; 
		 if ($form->type=='create'){
			pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_admin where lang_key=$1'); 	
			$result1 = pg_execute($link,'sqllangfetch',array($langval));	
			//while($row1=pg_fetch_array($result1)){
				$row1=pg_num_rows($result1);
				//echo $row1;
				if($row1>0)	{
					echo "ok";
				}
			//}
			 
		 }else{			 
			pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_admin where lang_key=$1 and id!=$2'); 	
			$result1 = pg_execute($link,'sqllangfetch',array($langval,$formid));	
			$row1=pg_num_rows($result1);
				if($row1>0)	{
					echo "ok";
				}
			//}
			 
		}
}


/****************************************************INSERT LANGUAGE  DATA *********************************************************** */

function SaveManagelang($data){
	
	SuperAdminsOnly();
	require('../config.php');	
	$link = ConnectDB();	
	$data = parse($data);
	
	foreach($data->fields->langtext as $name=>$set){
		$set = str_replace("@@","+",$set);
		$data->fields->langtext->$name =  base64_decode($set);
		$data->fields->langtext->$name = str_replace("@@","+",$data->fields->langtext->$name);
		/*$varr = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($set)); 
		$data->fields->langtext->$name = html_entity_decode($varr,null,'UTF-8');*/
		$data->fields->langtext->$name = addslashes($data->fields->langtext->$name); 
	}

	$form = $data;
	print_r($form);
	
	$langtext= $form->fields->langtext;
	$langtext = (array) $langtext;
	$formid = $form->id; 
	$lang_key= $form->fields->lang_key->value;
	$form->fields->lang_key->value=str_replace(" ","_",strtoupper($lang_key));
	
	if ($form->type=='create'){
		pg_prepare($link,'sqldz1','SELECT * FROM w_lang_static ORDER BY id DESC');
		$fetch_record = pg_execute($link,'sqldz1',array());
		
		$sql = 'INSERT INTO w_lang_static (id,lang_key,';
		$length = sizeof($langtext);
		$val = 'values($1,$2,';
		for($j=1;$j<=$length;$j++){
			$s = $j + 2;
			$val .='$'.$s;
			if($j !=$length){
				$val .=',';
			}else{
				$val .=')';
			}
		}
		if(pg_num_rows($fetch_record) == 0) {
			$id=1;
		}else{
			$res= pg_fetch_array($fetch_record);
			$tid= $res['id'];
			$id = $tid + 1;
		}
		$i=1;
		$conditionals = array($id,$lang_key);	
		foreach($langtext as $key=>$value){
		 $sql .=$key;
		 array_push($conditionals,$value);
		 if($i<$length){
		 	$sql .=",";
		 }
		 $i++;			
		}			
		$sql.=') '.$val;
		pg_prepare($link,'sqldd',$sql);
		pg_execute($link,'sqldd',$conditionals);
	
	}else{
		
	$sql = 'UPDATE w_lang_static SET ';
	$length = sizeof($langtext);

	$j=0;
	$i=1;
	$conditionals = array();	
	foreach($langtext as $key=>$value){
	
	$s = $j + 1;
	$val ='$'.$s;
	 $sql .=$key."=".$val;
	 array_push($conditionals,$value);
	 if($i<$length){
	 	$sql .=",";
	 }
	 $i++;	
	 $j++;		
	}
	$v = $val+1;			
	$sql.=' WHERE id='.$formid.'';
	//echo $sql;
	//print_r($conditionals);
	pg_prepare($link,'sqlupdate',$sql);
	pg_execute($link,'sqlupdate',$conditionals);
		
		
	}
//pg_close($link);
}
function SaveAdminManagelang($data)
	{
		
		SuperAdminsOnly();
		require('../config.php');	
		 $link = ConnectDB();	
		$data = parse($data);
		
	foreach($data->fields->langtext as $name=>$set){
		$set = str_replace("@@","+",$set);
		$data->fields->langtext->$name =  base64_decode($set);
		$data->fields->langtext->$name = str_replace("@@","+",$data->fields->langtext->$name);
		$data->fields->langtext->$name = addslashes($data->fields->langtext->$name);
	}
		$form = $data;

		$langtext= $form->fields->langtext;
		$langtext = (array) $langtext;
		$formid = $form->id; 
		$lang_key= $form->fields->lang_key->value;
		$form->fields->lang_key->value=str_replace(" ","_",strtoupper($lang_key));
		
		if ($form->type=='create')
		{
		pg_prepare($link,'sqladminlanguage','SELECT * FROM w_lang_admin ORDER BY id DESC');
		$fetch_record = pg_execute($link,'sqladminlanguage',array());
		
		$sql = 'INSERT INTO w_lang_admin (id,lang_key,';
		$length = sizeof($langtext);
		$val = 'values($1,$2,';
		for($j=1;$j<=$length;$j++){
			$s = $j + 2;
			$val .='$'.$s;
			if($j !=$length){
				$val .=',';
			}else{
				$val .=')';
			}
		}
		if(pg_num_rows($fetch_record) == 0) {
			$id=1;
		}else{
			$res= pg_fetch_array($fetch_record);
			$tid= $res['id'];
			$id = $tid + 1;
		}
		$i=1;
		$conditionals = array($id,$lang_key);	
		foreach($langtext as $key=>$value){
		 $sql .=$key;
		 array_push($conditionals,$value);
		 if($i<$length){
		 	$sql .=",";
		 }
		 $i++;			
		}			
		$sql.=') '.$val;
		pg_prepare($link,'sqldd',$sql);
		pg_execute($link,'sqldd',$conditionals);
		
		}else{
			
		$sql = 'UPDATE w_lang_admin SET ';
		$length = sizeof($langtext);

		$j=0;
		$i=1;
		$conditionals = array();	
		foreach($langtext as $key=>$value){
		
		$s = $j + 1;
		$val ='$'.$s;
		 $sql .=$key."=".$val;

		 array_push($conditionals,$value);
		 if($i<$length){
		 	$sql .=",";
		 }
		 $i++;	
		 $j++;		
		}
		$v = $val+1;			
		$sql.=' WHERE id='.$formid.'';
		//echo $sql;
		//print_r($conditionals);
		pg_prepare($link,'sqlupdateadmin',$sql);
		pg_execute($link,'sqlupdateadmin',$conditionals);
			
			
		}
	
	
	//pg_close($link);
	}


/****************************************************INSERT LANGUAGE  DATA *********************************************************** */

function SaveManagelang1($data)
	{
		
		SuperAdminsOnly();
		require('../config.php');	
		 $link = ConnectDB();	
		$form = parse($data);
	    $formid = $form->id; 
		//$lang_key= $form->fields->lang_key->value;

		if ($form->type=='create')
		{
	    
		    $language_id = InsertQuery('w_lang_static',$form->fields,$CFG);
			print_r($language_id);
		
		}
		else
		{
			
		UpdateQuery('w_lang_static',$form->fields,$formid,$CFG);		
			
		}
		
	//pg_close($link);
	}



/******************************************* FETCH LANGUAGE  DATA **************************************/
function GetManagelangConfig(){
	
	SuperAdminsOnly();
   	$link = ConnectDB();	
	$languages = array();
	$languages2 = array();
	$languages3 = array();

	pg_prepare($link,'sqllangdd'. $row['id'],'SELECT * FROM w_lang_setting WHERE enabled=$1');
	$result1 = pg_execute($link,'sqllangdd'. $row['id'],array('TRUE'));
	$languages1 = array();
	while($row1 = pg_fetch_array($result1)) {
	//	unset($language1);
		$language1 = new stdClass();
		if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
		if($row1['opdefault']  == 1) {
			$default_lang_id =  $row1['id'];
		}
		}else{
			$default_lang_id =  $_SESSION['admin_lang'];
		}
		$language1->id = $row1['id'];
		$language1->lang_text= $row1['lang_text'];
		$language1->opdefault= $row1['opdefault'];
		$language1->enabled = $row1['enabled'];
		$language1->lang_short_code = $row1['lang_short_code'];
		array_push($languages1,$language1);
	}
	$language = new stdClass();
	$language->default_lang_id = $default_lang_id;

	pg_prepare($link,'sqllang','SELECT * FROM w_lang_static');
	$result = pg_execute($link,'sqllang',array());
	while($row = pg_fetch_array($result)) {	
		//unset($language2);
		$language2 = new stdClass();			
		$language2->id = $row['id'];
		$language2->lang_key= $row['lang_key'];	
		
		$language2->lang_default = $row['langtext_'.$default_lang_id];			
		$language2->enabled = $row['enabled'];
		if($language2->lang_key != null)
		array_push($languages2,$language2);
	}

	pg_prepare($link,'sqllangadmin','SELECT * FROM w_lang_admin');
	$result = pg_execute($link,'sqllangadmin',array());
	while($row = pg_fetch_array($result)) {	
		//unset($language3);
		$language3 = new stdClass();			
		$language3->id = $row['id'];
		$language3->lang_key= $row['lang_key'];	
		
		$language3->lang_default = $row['langtext_'.$default_lang_id];			
		$language3->enabled = $row['enabled'];
		if($language3->lang_key != null)
		array_push($languages3,$language3);
	}

	$language->langdata = $languages2;
	$language->langdataadmin = $languages3;
	$language->flaginfo = $languages1;
	array_push($languages,$language);
	echo json_encode($languages);
	pg_close($link);
}

/****************************************************FETCH PARTICULAR LANGUAGE SETTINGS DATA *********************************************************** */

function FetchLanguagemanageData($id){
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);	
	pg_prepare($link,'sqlsetting','SELECT * FROM w_lang_setting order by id');
	$fetchdata = pg_execute($link,'sqlsetting',array());
	$c = pg_num_rows($fetchdata);
	
	
	
	if(pg_num_rows($fetchdata)>0){
		$val='SELECT id,lang_key,';
		$val1='enabled FROM w_lang_static WHERE id=$1 order by id';
		while($row = pg_fetch_array($fetchdata)){
			$val .='langtext_'.$row['id'].',';
			$cname[]='langtext_'.$row['id'];
		}
		$val = $val . $val1;
	}

	pg_prepare($link,'sqlmanlang',$val);
	$result = pg_execute($link,'sqlmanlang',array($id));
	if (pg_num_rows($result)==1)  
		$data = pg_fetch_array($result);
					
		$ad = array();
		$ad['id'] = $data['id'];
		$ad['lang_key'] = $data['lang_key'];
		$ad['enabled'] = $data['enabled'];
		foreach($cname as $value){
		$ad['langtext'][$value] = $data[$value];
		}
	echo json_encode($ad);
}

function FetchLanguagemanageDataAdmin($id){
	SuperAdminsOnly();
	require('../config.php');
	$link = ConnectDB($CFG);	
	pg_prepare($link,'sqlsetting','SELECT * FROM w_lang_setting order by id');
	$fetchdata = pg_execute($link,'sqlsetting',array());
	$c = pg_num_rows($fetchdata);
	
	
	
	if(pg_num_rows($fetchdata)>0){
		$val='SELECT id,lang_key,';
		$val1='enabled FROM w_lang_admin WHERE id=$1 order by id';
		while($row = pg_fetch_array($fetchdata)){
			$val .='langtext_'.$row['id'].',';
			$cname[]='langtext_'.$row['id'];
		}
		$val = $val . $val1;
	}

	pg_prepare($link,'sqlmanlang',$val);
	$result = pg_execute($link,'sqlmanlang',array($id));
	if (pg_num_rows($result)==1)  
		$data = pg_fetch_array($result);
					
		$ad = array();
		$ad['id'] = $data['id'];
		$ad['lang_key'] = $data['lang_key'];
		$ad['enabled'] = $data['enabled'];
		foreach($cname as $value){
		$ad['langtext'][$value] = $data[$value];
		}
	echo json_encode($ad);
}

/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	//$ext_arr = split("\.",$form->image);
	$ext_arr = explode(".",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require_once('resize.php');
	if ($ext=='png')//if png convert it to jpg
		{
		$input = imagecreatefrompng($oldname);
		list($width, $height) = getimagesize($oldname);
		$output = imagecreatetruecolor($width, $height);
		$white = imagecolorallocate($output,  255, 255, 255);
		imagefilledrectangle($output, 0, 0, $width, $height, $white);
		imagecopy($output, $input, 0, 0, 0, 0, $width, $height);
		imagejpeg($output,$finalname);
		unlink($oldname);

		//create thumbnail and regular size
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(164,150);
		$image->save($folder.'panel.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.'preview.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(64,64);
		$image->save($folder.'small.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(32,32);
		$image->save($folder.'mini.jpg');


		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(164,150);
		$image->save($folder.'panel.jpg');

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);
		$image->save($folder.'preview.jpg');
		}
	}

/**************************************************************CHECK CHANGE LANGUAGE DATA****************************************************/

function CheckLanguagedata($langkey,$langid)
{
	SuperAdminsOnly();
	
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	
	pg_prepare($link,'sqlmanlang2','SELECT *  FROM w_lang_static WHERE lang_key=$1 AND langid=$2');
	$result = pg_execute($link,'sqlmanlang2',array($langkey,$langid));

	if (pg_num_rows($result)>0)  
		while($row = pg_fetch_array($result))
			{
			unset($ad1);
			$ad1->id = $row['id'];
			$ad1->lang_key = $row['lang_key'];
			$ad1->langtext = $row['langtext'];
			
			$ad1->enabled = $row['enabled'];
			$ad1->langid = $row['langid'];
			$ad1->mode = "1"; // for update
			
			
			}
	else {
		
			unset($ad1);
			$ad1->id = "X";
			$ad1->lang_key = $langkey;
			$ad1->langtext = "";
			$ad1->enabled = "f";
			$ad1->langid = $langid;
			$ad1->mode = "0"; // for insert
			
			//$language_id = InsertQuery('w_lang_static',$form->fields,$ad1->lang_key,$CFG);
		}
	
		
	
	echo json_encode($ad1);
	
	
}

function GetEmailNotificationField(){
	$link = ConnectDB();
	$scriptid = $_SESSION['scriptid'];
	//echo $scriptid;
	pg_prepare($link,'sqlemailnotify','SELECT * FROM w_configs_email WHERE scriptid = $1');
	$result = pg_execute($link,'sqlemailnotify',array($scriptid));
	$emailnotify = array();
	$i = 0;
	while($row = pg_fetch_array($result)){
	$emailnotify[$i]['id'] = $row['id'];
	$emailnotify[$i]['name'] = $row['name'];
	$emailnotify[$i]['status'] = $row['status'];
	$i++;
	}
	echo json_encode($emailnotify);
	pg_close($link);
}

//request coolection start
function FetchRequestcollectionSchedule(){
	
require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array('requestcollectionschedule'));
	$site = new stdClass();
$site->id ='';
$site->siteschedule ='';
		while($row = pg_fetch_array($result))
			{
			
			
			$site->id = $row['id'];
			$site->siteschedule = parse($row['value']);
			
			
			}
	
	echo json_encode($site);
	
}
function SaveRequestCollectionSchedule($data){
	
	$form = json_decode($data);
	
	require('../config.php');
	$link = ConnectDB($CFG);
	
	$schedule = $form->fields->siteschedule->value;
	
	echo $schedule;
	
	pg_prepare($link,'sqls','UPDATE w_configs SET value=$1 WHERE name=$2');
	
	pg_execute($link,'sqls',array($schedule,'requestcollectionschedule'));
	
	 pg_close($link);
	
}
//request collection end
function FetchSiteSchedule(){
	
require('../config.php');
	$link = ConnectDB($CFG);	
	
	pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array('siteschedule'));

		while($row = pg_fetch_array($result))
			{
			$site = new stdClass();
			
			$site->id = $row['id'];
			$site->siteschedule = parse($row['value']);
			
			
			}
	
	echo json_encode($site);
	}
function SaveSiteSchedule($data){

	$form = json_decode($data);
	require('../config.php');
	$link = ConnectDB($CFG);
	
	$schedule = $form->fields->siteschedule->value;
	
	echo $schedule;
	
	pg_prepare($link,'sqls','UPDATE w_configs SET value=$1 WHERE name=$2');
	
	pg_execute($link,'sqls',array($schedule,'siteschedule'));
	
	 pg_close($link);
	
}

function GetBusinessPageSettings(){
	$link = ConnectDB();	
	
	//unset($businesspagesettings);
	$businesspagesettings = new stdClass();
	
	pg_prepare($link,'sqlsound','SELECT * FROM w_configs');
	$result = pg_execute($link,'sqlsound',array());
	while($row = pg_fetch_array($result)){
		
		if($row['name'] == 'businesspagprograssbarsetting'){
			$businesspagesettings->prograssbarsetting = $row['value'];
		}
		if($row['name'] == 'businesspageheadersetting'){
			$businesspagesettings->businesspageheadersetting = $row['value'];
		}
		if($row['name'] == 'businesspagefootersetting'){
			$businesspagesettings->businesspagefootersetting = $row['value'];
		}
		if($row['name'] == 'businesspagimagesetting'){
			$businesspagesettings->businesspagimagesetting = $row['value'];
		}
		
		if($row['name'] == 'businesspagpersonsetting'){
			$businesspagesettings->businesspagpersonsetting = $row['value'];
		}
		if($row['name'] == 'businesspagqtysetting'){
			$businesspagesettings->businesspagqtysetting = $row['value'];
		}
		if($row['name'] == 'businessopeningtime'){
			$businesspagesettings->businessopeningtime = $row['value'];
		}
		if($row['name'] == 'popularsettings'){
			$businesspagesettings->popularsettings = $row['value'];
		}
		if($row['name'] == 'emailsettings'){
			$businesspagesettings->emailsettings = $row['value'];
		}
		
		if($row['name'] == 'deliverycitysetting'){
			$businesspagesettings->deliverycitysetting = $row['value'];
		}
		if($row['name'] == 'zipcodeordersetting'){
			$businesspagesettings->zipcodeordersetting = $row['value'];
		}
		if($row['name'] == 'productordersetting'){
			$businesspagesettings->productordersetting = $row['value'];
		}
		if($row['name'] == 'checkout_popup_settings'){
			$businesspagesettings->checkout_popup_settings = $row['value'];
		}
		if($row['name'] == 'checkout_available_product_settings'){
			$businesspagesettings->checkout_available_product_settings = $row['value'];
		}
		if($row['name'] == 'businesstemplate'){
			$businesspagesettings->businesstemplate = $row['value'];
		}
		
	}	
	echo json_encode($businesspagesettings);
	pg_close($link);	
}

function GetSeriveceSettings(){
	$link = ConnectDB();
		pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array("servicefeesettings"));
	
		
	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$servicefeesettings=$row["value"];
		}
		
		
	echo $servicefeesettings;
	pg_close($link);
}


function GetCheckoutField(){
	$link = ConnectDB();
	pg_prepare($link,'sqlcheckout','SELECT * FROM w_checkout WHERE scriptid =$1 ORDER BY id asc');
	$result = pg_execute($link,'sqlcheckout',array($_SESSION['scriptid']));
	$checkout = array();
	$i = 0;
	while($row = pg_fetch_array($result)){
		$checkout[$i]['id'] = $row['id'];
		$checkout[$i]['field_name'] = $row['field_name'];
		$checkout[$i]['type'] = $row['type'];
		$checkout[$i]['required'] = $row['required'];
		$checkout[$i]['status'] = $row['status'];
		$i++;
	}
	echo json_encode($checkout);
	pg_close($link);
}

function GetPrinterPathConfig()
{
	
	//SuperAdminsOnly();
   $link = ConnectDB();			
	pg_prepare($link,'sqllang','SELECT * FROM w_printerpath ORDER BY id');
	$result = pg_execute($link,'sqllang',array());

	$languages = array();
		while($row = pg_fetch_array($result)) {
			unset($language);
		
			$language->id = $row['id'];
			$language->path = $row['path'];
			$language->printer_restaurant = $row['printer_restaurant'];
			
			array_push($languages,$language);
		}
		echo json_encode($languages);

	pg_close($link);
	
	
}


//Zipcode validation
function SaveSettingszipcodevalidationLength($value){
		$link = ConnectDB();	
		
		$data=json_decode(stripslashes($value),true);
		
		
		pg_prepare($link,'sql','SELECT * FROM w_configs WHERE name=$1');
	$result = pg_execute($link,'sql',array("zipvalmax"));
	$id = -1;
$zipvalmax='';
	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
		{
			$zipvalmax=$row["value"];
		}
		
		for($i=1;$i<=$zipvalmax;$i++){
			 pg_query($link, "DEALLOCATE ALL");
		
				pg_prepare($link,'sql2','UPDATE w_zipcodevalidation SET value=$2 WHERE position	=$1 AND length=$3');
				if (pg_execute($link,'sql2',array($i,$data["element".$i]["value"],$data["length"]["value"]))){
					echo "ok";
				}
		}

	}
	function SaveSettingsConfigzipcodevalidation($name,$value,$name1,$value1){
		$link = ConnectDB();	
		
			
			pg_prepare($link,'sql','SELECT * FROM w_zipcodevalidation ');
			$result = pg_execute($link,'sql',array());
		if (pg_num_rows($result)>0) { 
		while($row = pg_fetch_array($result))
		{
			 pg_query($link, "DEALLOCATE ALL");
			
					 pg_prepare($link,'sqld'.$row["id"],'DELETE FROM w_zipcodevalidation WHERE length=$1');
					pg_execute($link,'sqld'.$row["id"],array($row["length"]));
		
			
			
		}
		}	
		
		for($i=$value1;$i<=$value;$i++){
		
						for($j=1;$j<=$i;$j++){
							 pg_query($link, "DEALLOCATE ALL");
									  pg_prepare($link,'sqli'.$i."l".$j,"SELECT nextval('w_zipcodevalidation_id_seq') as key");
									$result = pg_execute($link,'sqli'.$i."l".$j,array());
									if (pg_num_rows($result)==1)
									while($row = pg_fetch_array($result))
									$id_unchanged = $row['key'];	
								pg_prepare($link,'sqlq'.$i."l".$j,'INSERT INTO w_zipcodevalidation (id,length,position,value) VALUES ($1,$2,$3,$4)');
								pg_execute($link,'sqlq'.$i."l".$j,array($id_unchanged,$i,$j,0));
							
						}
					
				
			}
			
			
		
		 SaveSettingsConfig($name,$value);
		
		  SaveSettingsConfig($name1,$value1);
		
									
									echo 'ok';
	}
function Getzipcodevalidationall($length){
	
			$link = ConnectDB();	
	  pg_query($link, "DEALLOCATE ALL");
	  pg_prepare($link,'sqlzipcodevalidation','SELECT * FROM w_zipcodevalidation where length=$1 ORDER BY position');
	$result1 = pg_execute($link,'sqlzipcodevalidation',array($length));
	$zipcodevalidationarray=array();

	while($row1 = pg_fetch_array($result1)){
		
		
			
			$zipcodevalidationarrayobj = new stdClass();
		
		$zipcodevalidationarrayobj->length=$row1["length"];
		$zipcodevalidationarrayobj->id=$row1["id"];
		$zipcodevalidationarrayobj->position=$row1["position"];
		$zipcodevalidationarrayobj->value=$row1["value"];
		
		array_push($zipcodevalidationarray,$zipcodevalidationarrayobj);
		
	}
	$zipcodevalidationSetting = new stdClass();
	$zipcodevalidationSetting->zipcodevalidation = $zipcodevalidationarray;
	echo json_encode($zipcodevalidationSetting);
	pg_close($link);	
	
	}
	function Getzipcodevalidation(){
			$link = ConnectDB();	
	  pg_query($link, "DEALLOCATE ALL");
	  pg_prepare($link,'sqlzipcodevalidation','SELECT length FROM w_zipcodevalidation group by length ORDER BY length');
	$result1 = pg_execute($link,'sqlzipcodevalidation',array());
	$zipcodevalidationarray=array();

	while($row1 = pg_fetch_array($result1)){
		
		
			$zipcodevalidationarrayobj = new stdClass();
		
		$zipcodevalidationarrayobj->length=$row1["length"];
		
		array_push($zipcodevalidationarray,$zipcodevalidationarrayobj);
		
	}
	$zipcodevalidationSetting = new stdClass();
	$zipcodevalidationSetting->zipcodevalidation = $zipcodevalidationarray;
	echo json_encode($zipcodevalidationSetting);
	pg_close($link);	
	}
	function SaveBringgPermissionForEach($id) {
			$link = ConnectDB();	
			if($id == 0) {
				$ids = 1;
				}
			else {
				$ids = 0;
				}	
			pg_prepare($link,'sqlbrg1','UPDATE w_configs SET value=$1 WHERE name=$2');
			pg_execute($link,'sqlbrg1',array($ids,'BRINGG_PERMISSION_EACH_RESTAURANT'));
		
		}

		function FetchItemPointPermission(){
			$link =ConnectDB();
			$permission = array();
			pg_prepare($link,'sqlfetchitempoint','select value from w_configs where name=$1');
			$result54=pg_execute($link,'sqlfetchitempoint',array('item_point_permission'));
		
			$permissions=array();
			while($row54 = pg_fetch_array($result54)) {
			unset($permission);
			$value=$row54['value'];
			$permission->value = $value;

			array_push($permissions,$permission);
			}
			echo json_encode($permissions);
			pg_close($link);
		}

		function FetchGlobalItemPointSetting(){
			$link =ConnectDB();
			$permission = array();
			pg_prepare($link,'sqlfetchitempoint','select value from w_configs where name=$1');
			$result54=pg_execute($link,'sqlfetchitempoint',array('global_point_settings_for_all_business'));
		
			$permissions=array();
			while($row54 = pg_fetch_array($result54)) {
			//unset($permission);
			$value=$row54['value'];
			$permission = new stdClass();
			$permission->value = $value;

			array_push($permissions,$permission);
			}
			echo json_encode($permissions);
			pg_close($link);
		}

		function UpdateItemPointSettings($id){
			$link =ConnectDB();
			$permission = array();
			pg_prepare($link,'sqlfetchitempoint','update w_configs set value=$1 where name=$2');
			$result54=pg_execute($link,'sqlfetchitempoint',array($id,'item_point_permission'));
			echo 'ok';
			pg_close($link);
		}
		
		

		function UpdateGlobalItemPointSetting($data){
			$link =ConnectDB();
			$permission = array();
			pg_prepare($link,'UpdateGlobalItemPointSetting','update w_configs set value=$1 where name=$2');
			$result5sds=pg_execute($link,'UpdateGlobalItemPointSetting',array($data,'global_point_settings_for_all_business'));
			echo 'ok';
			pg_close($link);
		}
		
		
?>



