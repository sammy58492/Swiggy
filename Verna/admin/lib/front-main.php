<?php
session_start();

define("IS_PAYPAL_ENABLED", 1);
function GetLangFile($lang)
{
	$lang_file = 'lang.'.$lang.'.php';

	return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
}

switch ($_POST['f'])
	{
	case 'SaveUser':
		SaveUser($_POST['data']);
	break;
	case 'SaveWhereAmI':
		SaveWhereAmI($_POST['data']);
	break;
	case 'GetEmailAvailability':
		GetEmailAvailability($_POST['email'],$_POST['id']);
	break;
	case 'PlaceOrder':
		if(IS_PAYPAL_ENABLED == 1)
			PlaceOrder($_POST['data'],$_POST['paypalid']);
		else
			PlaceOrder($_POST['data']);
	break;

	case 'PlaceOrderbrainTree':

			PlaceOrderbefore($_POST['data'],$_POST['paypalid']);

	break;
	case 'PlaceorderreserveBefore':
			PlaceorderreserveBefore($_POST['data'],$_POST['paypalid']);
	break;

	case 'PlaceOrdermobile':
		if(IS_PAYPAL_ENABLED == 1)
			PlaceOrdermobile($_POST['data'],$_POST['paypalid']);
		else
			PlaceOrdermobile($_POST['data']);
	break;
	case 'PlaceOrderbefore':
			PlaceOrderbefore($_POST['data'],$_POST['paypalid']);
	break;
	case 'FetchAllBusinessDeliveryLocation':
			FetchAllBusinessDeliveryLocation($_POST['data'],$_POST['alldata'],$_POST['bid']);
	break;
	case 'RecoverPassword':
		RecoverPassword($_POST['email']);
	break;
	case 'FetchTimeByZone':
		FetchTimeByZone($_POST['zone'],$_POST['format']);
	break;
	case 'allreviewDate':
		allreviewDate($_POST['id']);
	break;
	case 'allMenu':
		allMenu($_POST['id']);
	break;
	case 'FetchAllGalleryImg':
			FetchAllGalleryImg($_POST['bid']);
	break;
	case 'FetchAllGalleryVideo':
			FetchAllGalleryVideo($_POST['bid']);
	break;
	case 'getPostcode':
		getPostcode($_POST['data']);
	break;
	case 'FetchDiscountOffer':
			FetchDiscountOffer($_POST['bid']);
	break;

	case 'FetchAllsettingsCustomFacebook':
			FetchAllsettingsCustomFacebook();
	break;
	case 'SubscribeEmail':
	SubscribeEmail($_POST['email']);
	break;
	case 'SaveWhereAmIResturant':
	SaveWhereAmIResturant($_POST['data']);
	break;


	case 'FetchOrder':
			FetchOrder($_POST['id']);
	break;

     case 'AddToFav';
	AddToFav($_POST['bid'],$_POST['bname']);
	break;
	case 'FetchFav';
	FetchFav($_POST['search_txt']);
	break;
	case 'DelFav';
	DelFav($_POST['checkarr']);
	break;
	case 'Getfavorite';
	Getfavorite($_POST['bid']);
	break;


	case 'FetchAllRestDataFront':
			FetchAllRestDataFront();
		break;
	case 'FetchAllCuisineDataFront':
			FetchAllCuisineDataFront();
		break;

		case 'FetchCountry':
			FetchCountry($_POST['city']);
		break;


		case 'CmsContent':
			CmsContent($_POST['id']);
		break;
		case 'ReorderSend':
			ReorderSend($_POST['id']);
		break;
        case 'langhistory':
			langhistory($_POST['id']);
		break;
		case 'langchangehistory':
			langchangehistory($_POST['id']);
		break;
		case 'UpdateResultData':
		UpdateResultData($_POST['data']);
		break;


		case 'FetchTimeByZoneSiteSettings':
       		FetchTimeByZoneSiteSettings($_POST['zone'],$_POST['format']);
    	break;


	}







function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}
function langhistory($id)
{
	 require('../config.php');
       $link = ConnectDB($CFG);
	   
	   session_start();
	  $_SESSION['lang']= $id;
	

}
function langchangehistory($id){
    session_start();
	$_SESSION['l']= $id;
}


	
	
	//Reset counter start
function FetchAllsettingsCustomUnchanged()
       {
       require('panel/config.php');
       $link = ConnectDB($CFG);
       pg_prepare($link,'sql44','SELECT * from w_config_unchanged ');
       $result = pg_execute($link,'sql44',array());

       //$settings = array();

       while($row = pg_fetch_array($result))
               {

               $id = $row['id'];
               $name =  $row['name'];
               $setting[$name] = $row['value'];
               //array_push($settings,$setting);
               }

       return $setting;
 }
 	//Reset counter end
function FetchCountry($city){

	require('../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');



		pg_prepare($link,'sql3','SELECT * FROM w_franchises WHERE id = $1');
    $result = pg_execute($link,'sql3',array($city));

    $row = pg_fetch_array($result);

  	$country->country = $row['country'];

    echo json_encode($country);
}

function FetchAllsettingsCustomFacebook()
       {
    //   require('panel/config.php');
      $link = ConnectDB();
       pg_prepare($link,'sql3','SELECT * FROM w_configs WHERE name = $1');
       $result = pg_execute($link,'sql3',array('facebookfan'));



       $row = pg_fetch_array($result);
      	$facebook->id = $row['id'];
        $facebook->name =  $row['name'];
        $facebook->value = $row['value'];

       echo json_encode($facebook);
       }
function FetchAllGalleryImg($id)
{
	//echo "ok";
	//echo $id;exit;
	//SuperAdminsOnly();
	echo json_encode(GetAllGalleryImg($id));
}

function GetAllGalleryImg($id)
{
	$link = ConnectDB();
		$allimg = array();
			pg_prepare($link,'sqlR1','SELECT * FROM w_gallery WHERE type=0 AND business=$1 AND enabled=$2');
			$result = pg_execute($link,'sqlR1',array($id,"TRUE"));
			//pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');
			//echo $rs = pg_num_rows($result);exit;
			while($rs = pg_fetch_array($result)) {
				unset($img);
				//$schedule = parse($rs['schedule']);
				$img->id = $rs['id'];
				$img->name = $rs['name'];
				$img->link = $rs['link'];
				$img->type = $rs['type'];


				array_push($allimg,$img);


				}
		return $allimg;
}

function FetchAllGalleryVideo($id)
{
	//echo "ok";
	//echo $id;exit;
	//SuperAdminsOnly();
	echo json_encode(GetAllGalleryVideo($id));
}

function GetAllGalleryVideo($id)
{
	$link = ConnectDB();
		$allimg = array();
			pg_prepare($link,'sqlR1','SELECT * FROM w_gallery WHERE type=1 AND business=$1 AND enabled=$2');
			$result = pg_execute($link,'sqlR1',array($id,"TRUE"));
			//pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');
			//echo $rs = pg_num_rows($result);exit;
			while($rs = pg_fetch_array($result)) {
				unset($img);
				//$schedule = parse($rs['schedule']);
				$img->id = $rs['id'];
				$img->name = $rs['name'];
				$img->link = $rs['link'];
				$img->type = $rs['type'];


				array_push($allimg,$img);


				}
		return $allimg;
}
function createsocialuser($link,$data,$type,$CFG = 'empty')
	{
	$user = new stdClass();
	$id = -1;
	pg_prepare($link,'sqli',"SELECT nextval('w_users_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return $user;

	//insert it
	pg_prepare($link,'sqli2','INSERT INTO w_users (id,name,lastname,'.$type.'id,email,level,lastname2,config) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');
	$result2 = pg_execute($link,'sqli2',array($id,$data->name,$data->lastname,$data->id,$data->email,3,'','{}'));

	//now return the data...
	pg_prepare($link,'sqli3','SELECT * FROM w_users WHERE id=$1');
	$result3 = pg_execute($link,'sqli3',array($id));

	$user = catchuserinfo($result3);

	$oldname = $CFG->dirimages.'users/dummy.jpg';
	MoveImages($CFG->dirimages . 'users/',$oldname,$user->id,true);

	return $user;
	}


function catchuserinfo($result)
	{
	$user = new stdClass();
	while($row = pg_fetch_array($result))
		{
		$user->id = $row['id'];
		$user->name = $row['name'];
		$user->lastname = $row['lastname'];
		$user->lastname2 = $row['lastname2'];
		$user->email = $row['email'];
		$user->street = $row['street'];
		$user->colony = $row['colony'];
		$user->cp = $row['cp'];
		$user->city = $row['city'];
		$user->country = $row['country'];
		$user->tel = $row['tel'];
		$user->cel = $row['cel'];
		$user->job = $row['job'];
		$user->enabled = $row['enabled'];
		$user->location = $row['location'];
		$user->level = $row['level'];
		$user->levelname = GetLevelText($user->level);
		}
	return $user;
	}

function GetLevelText($level)
	{
	include_once "../../languages/lang.en.php";	
	switch($level)
			{
			case 0:
				return $lang_resource['CONTROL_PANEL_USER_SUPER_ADMIN'];
			break;
			case 1:
				return $lang_resource['CONTROL_PANEL_USER_ADMIN'];
			break;
			case 2:
				return $lang_resource['CONTROL_PANEL_USER_RESTAURATEUR'];
			break;
			case 3:
				return $lang_resource['CONTROL_PANEL_USER_CUSTOMER'];
			break;
			case 4:
				return $lang_resource['CONTROL_PANEL_USER_DRIVER'];
			break;
			case 5:
				return $lang_resource['CONTROL_PANEL_USER_DRIVERMANAGER'];
			break;
			}

	return '';
	}


function SaveUser($data)
	{
	require('../config.php');
	$record = FetchAllsettingsCustomMailchmp();
	//print_r($record);
	  /* echo $record['mailchamp_api'];
	   echo $record['mailchamp_listid'];
	   echo "okay";
	   exit();*/
	$form = parse($data);


	 // Validation
	 if ($form->type=='create') {
       if(!$form->fields->email->value){ echo "No email address provided"; exit(); }

      /* if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)@[a-z0-9-]+(\.[a-z0-9-]+)$/i", $form->fields->email->value)) {
               return "Email address is invalid";
       }*/


       require_once('mcapi/MCAPI.class.php');
       // grab an API Key from http://admin.mailchimp.com/account/api/
       $api = new MCAPI($record['mailchamp_api']);

       // grab your List's Unique Id by going to http://admin.mailchimp.com/lists/
       // Click the "settings" link for the list - the Unique Id is at the bottom of that page.
       $list_id = $record['mailchamp_listid'];

       // Merge variables are the names of all of the fields your mailing list accepts
       // Ex: first name is by default FNAME
       // You can define the names of each merge variable in Lists > click the desired list > list settings > Merge tags for personalization
       // Pass merge values to the API in an array as follows
       $mergeVars = array('FNAME'=>$form->fields->name->value);



       if($api->listSubscribe($list_id, $form->fields->email->value, $mergeVars) === true) {
              echo "Please check your mail,One mail has been send from Mailchamp";
       } //else{
               // An error ocurred, return error message
               //return 'Error: ' . $api->errorMessage;
       //}

//}

	}

	

	if ($form->type=='create'){
		$form->fields->level->value = '3'; //block the level field so we dont get hacked
		$usrid = InsertQuery('w_users',$form->fields,$CFG);
	}else
		{
		session_start();
		session_write_close();
		$usrid = $_SESSION['user']->id;//set the user id to the user session id.. so we dont get hacked
		$form->id = $usrid;//same here
		UpdateQuery('w_users',$form->fields,$usrid,$CFG);
		}

	//check if image is sended, create destiny dir if doesnt exist (images path/users/idusuario)
	if ($form->image)
		{

		$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveImages($CFG->dirimages . 'users/',$oldname,$usrid);
		$link = ConnectDB();
		pg_prepare($link,'sql','UPDATE w_users SET isimg=$1 WHERE id=$2');
		pg_execute($link,'sql',array(1,$usrid));
		pg_close($link);
	    }
	    else//if we didnt received image, check if its new user, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	$oldname = $CFG->dirimages.'users/dummy.jpg';
			MoveImages($CFG->dirimages . 'users/',$oldname,$usrid,true);
	    	}
	}

function PlaceOrdermobile($data,$pid) {
	$link = ConnectDB();
	$id = -1;
	$order = parse($data);

	if (!empty($pid))
		{
		$order->paypalid = $pid;
		}
   foreach ($order->business as $businessx) {
                $businessx->name = str_replace('@@@', '&',$businessx->name);
                foreach ($businessx->dishes as $dishx) {
                $dishx->name = str_replace('@@@', '&',$dishx->name);
               
				}
		}
	pg_prepare($link,'sqli2',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli2',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

	$values = array($id,stringify($order),'now()');
	$recent = new stdClass();
	$recent->user = new stdClass();

	$name = explode(' ',$order->buyer->name);
	$lastname = substr($name[1], 0, 1);
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
		else
		$recent->user->name = $name[0];
    $recent->business = new stdClass();

	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));

	//session_start();
	//session_write_close();

	if (!empty($_SESSION['user']->id))
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr,paypalinfo) VALUES ($1,$2,$3,$4,$5,$6)';
		array_push($values,$_SESSION['user']->id);
		array_push($values,$pid);


		pg_prepare($link,'sqlur2','UPDATE w_users SET street=$1,colony=$2,tel=$3,findfrom=$4 WHERE id=$5');
		pg_execute($link,'sqlur2',array($order->buyer->address,$order->buyer->colony,$order->buyer->tel,$order->buyer->reference,$_SESSION['user']->id));

		}
		else
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,paypalinfo) VALUES ($1,$2,$3,$4,$5)';
		array_push($values,$pid);
		}
	pg_prepare($link,'sql2',$query);
	if (pg_execute($link,'sql2',$values))
		{
		pg_prepare($link,'sql3','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql3',array($order->buyer->city));
		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result))
				{
				$emails = array($order->buyer->email,$emails,$row['email']);
				//start order email

			//	if (SendMail($msg,'Order ' . $id,$emails))
					//{
					if ($order->buyer->tel)
						{
						//$msg = 'Gracias por realizar tu pedido en , tu no. de pedido es: '. $id;
						//require_once('sms.php');
						//sendSMS($msg,$order->buyer->tel,'52');
						//echo "Enviando a cel...";
						}
		//	$link = pg_connect($string);

			pg_prepare($link,'sqlsc12','SELECT * FROM w_paypal_payments ORDER BY id DESC;');
			$resultp = pg_execute($link,'sqlsc12',array());
			$res = pg_fetch_array($resultp);
			$record = $res['id']+1;

			$valuesp = array($record,$pid,'now()',$id);

			pg_prepare($link,'sql9','INSERT INTO w_paypal_payments (id,itemid,date,orderid) VALUES ($1,$2,$3,$4);');
			pg_execute($link,'sql9',$valuesp);


					echo $id;
					//}
				}


		}

		//echo $id;

      // Send to business

}

function GetEmailAvailability($email,$id)
	{
	$link = ConnectDB();

	if ($id)
		{
		pg_prepare($link,'sql','SELECT id from w_users WHERE email=$1 and id!=$2');
		$result = pg_execute($link,'sql',array($email,$id));
		}
		else
		{
		pg_prepare($link,'sql','SELECT id from w_users WHERE email=$1');
		$result = pg_execute($link,'sql',array($email));
		}

	if (pg_num_rows($result)==0)
		echo 'ok';

	pg_close($link);
	}


function RecoverPassword($email)
	{
	$link = ConnectDB();

			if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');

				include_once $lang_file;

	pg_prepare($link,'sqli',"SELECT pwd FROM w_users WHERE email=$1");
	$result = pg_execute($link,'sqli',array($email));
	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
				//start password email
			 include_once "../templates/recover-password.php";
			//end password email
			if (SendMail($msg,$lang_resource['FRONTMOBILE_PASSWORD_REQUESTED1'],array($email)))
				echo 'ok';
			}

	pg_close($link);
	}


function ReserveSection($order){

	$link = ConnectDB();

	$date_array = explode("/",$order->reserve->rdate);
	$date1 = $date_array[2]."-".$date_array[0]."-".$date_array[1];

	$time = $order->reserve->rhour .':'.$order->reserve->rmin;


	if($order->reserveQty->Free){
		$cnt = 1;
		foreach ($order->reserveQty->Free as $value) {

		   $ar = explode("_",$value);
		   $rid = $ar[0];
		   pg_prepare($link,'sqlrefree'.$cnt,'INSERT INTO w_reserve_book (business,rtype,booked,rid,date,time) values ($1,$2,$3,$4,$5,$6)');
		   pg_execute($link,'sqlrefree'.$cnt,array($order->business[0]->id,3,$value,$rid,$date1,$time));
		   $cnt++;
		}//End foreach loop
	}//End if loop
	if($order->reserveQty->Room){
		$cnt = 1;
		foreach ($order->reserveQty->Room as $value) {

		   $ar = explode("_",$value);
		   $rid = $ar[0];
		   pg_prepare($link,'sqlreroom'.$cnt,'INSERT INTO w_reserve_book (business,rtype,booked,rid,date,time) values ($1,$2,$3,$4,$5,$6)');
		   pg_execute($link,'sqlreroom'.$cnt,array($order->business[0]->id,2,$value,$rid,$date1,$time));
		   $cnt++;
		}//End foreach loop
	}//End if loop

	if($order->reserveQty->Table){
		$cnt = 1;
		foreach ($order->reserveQty->Table as $value) {

		   $ar = explode("_",$value);
		   $rid = $ar[0];
		   pg_prepare($link,'sqlretable'.$cnt,'INSERT INTO w_reserve_book (business,rtype,booked,rid,date,time) values ($1,$2,$3,$4,$5,$6)');
		   pg_execute($link,'sqlretable'.$cnt,array($order->business[0]->id,1,$value,$rid,$date1,$time));
		   $cnt++;
		}//End foreach loop
	}//End if loop

}//function end


function PlaceOrder($data,$pid,$reorder = false)
	{
	$link = ConnectDB();
	$id = -1;
	if (!empty($reorder) && $reorder == true) {
	
		$order = json_decode($data);
		
		}
		else {
	$order = parse($data);
		}
		
	$date="Now()";
	$s = session_id();



	  $categories = $order->searchinfo->cuisines;
	$categories = strtolower(str_replace('[','',$categories));
	$categories = strtolower(str_replace(']','',$categories));
	$categories = strtolower(str_replace('"','',$categories));
	


	/******************************** fetch category name **********************************/
		pg_prepare($link,'sqlcnc1',"SELECT * FROM w_categories where id=$1");
	if($categories == '-1'){
		$categories = "All Categories";
	}elseif($categories == ''){
		$categories = "All Categories";
	}else{
		
		$cat = parse($categories);
	
		foreach($cat as $catval){
		$ad->catid = $catval;
		
		
		$cat = pg_execute($link,'sqlcnc1',array($ad->catid));
		$catr = pg_fetch_array($cat);		
		$categorie = $catr['name'];
		}
		/*pg_prepare($link,'sqlcnc',"SELECT * FROM w_categories where id=$1");
		$cat = pg_execute($link,'sqlcnc',array($categories));
		$catr = pg_fetch_array($cat);
		$categories = $catr['name'];*/
	}	
	
	
	
/*	if($categories == '-1'){
	 $categories = "All Categories";
	}else{
		pg_prepare($link,'sqlcnc',"SELECT * FROM w_categories where id=$1");
		$cat = pg_execute($link,'sqlcnc',array($categories));
		$catr = pg_fetch_array($cat);
		  $categories = $catr['name'];
	}*/	
		/*if($categories == '-1'){
	$categories = "All Categories";
	}elseif($categories == ''){
	$categories ="All Categories";
	}
	
	else{
		pg_prepare($link,'sqlcnc',"SELECT * FROM w_categories where id=$1");
		$cat = pg_execute($link,'sqlcnc',array($categories));
		$catr = pg_fetch_array($cat);
		 $categories = $catr['name'];
	}	
	*/

		 $resturant = $order->business[0]->name;
		 $address = $order->searchinfo->address;
		 $address = strtolower(str_replace(" ","",$address));
	 
	 

			/******************************** fetch statistic data**********************************/
	
	/************************************end*****************************/

	
	
	$point="0";
	$date="Now()";
	//unset();
	$s = session_id();
	$confirm_order=0;
	$status=1;

    
			/******************************** fetch session id**********************************/

	pg_prepare($link,'sqls2',"SELECT * FROM w_search_statistic where address=$1 AND categories=$2");
	$res1 = pg_execute($link,'sqls2',array($address,$categories));
	if(pg_num_rows($res1) == 0) { 
	
			
				  
				  } else { 
				 $h = pg_fetch_array($res1);
				
					 $confirm_order=$h['confirm_order']+1;
							
				
			$result = 'NULL';
			
			// pg_prepare($link,'sqliam22wb','UPDATE w_search_statistic SET confirm_order=$1,result=$2,resturant=$3 where address=$4 AND categories=$5');
			//pg_execute($link,'sqliam22wb',array($confirm_order,$result,$resturant,$address,$categories));
	
	 pg_prepare($link,'sqliam22wb','UPDATE w_search_statistic SET confirm_order=$1,result=$2 where address=$3 AND categories=$4');
			pg_execute($link,'sqliam22wb',array($confirm_order,$result,$address,$categories));
	
					   				 
				  }
				 

	/*******************************end******************/
		
		
		
	
	
	if($order->buyer) 
	{ 
	$order->buyer->cityname=$order->buyer->cityname;
	}
	
	if (!empty($pid))
		{
		$order->paypalid = $pid;
		}
	if ($reorder == false) {	
		   foreach ($order->business as $businessx) {
                $businessx->name = str_replace('@@@', '&',$businessx->name);
                foreach ($businessx->dishes as $dishx) {
                $dishx->name = str_replace('@@@', '&',$dishx->name);
               
				 
				}
		   }
		}	
	
require('../../languages/lang.en.php');
	session_start();
	session_write_close();


	pg_prepare($link,'sqli',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

	pg_prepare($link,'sqldf33','SELECT * from w_franchises WHERE id=$1');

		$result_time_zone = pg_execute($link,'sqldf33',array($order->buyer->city));

		$result_rec = pg_fetch_array($result_time_zone);

	

	date_default_timezone_set($result_rec['timezone']);

	

	   $date = date("Y-m-d H:i:s");
	   
	   
	   

	$values = array($id,stringify($order),$date);
	//print($values);
	//print(urlRawDecode($order->buyer->cityname));exit;
	$recent = new stdClass();
	$recent->user = new stdClass();

	$name = explode(' ',$order->buyer->name);
	$lastname = substr($name[1], 0, 1);
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
		else
		$recent->user->name = $name[0];

	$recent->business= new stdClass();
	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));



	if (!empty($_SESSION['user']->id))
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr) VALUES ($1,$2,$3,$4,$5)';
		array_push($values,$_SESSION['user']->id);
		//echo $_SESSION['whereami'];
		$session_record= new stdClass();
		$session_record = json_decode($_SESSION['whereami']);
		$session_record->address = $order->buyer->address;
		$_SESSION['whereami'] = json_encode($session_record);


		pg_prepare($link,'sqlur1','UPDATE w_users SET street=$1,tel=$2,findfrom=$3 WHERE id=$4');
		pg_execute($link,'sqlur1',array($order->buyer->address,$order->buyer->tel,$order->buyer->reference,$_SESSION['user']->id));
		}
		else
		$query = 'INSERT INTO w_orders (id,data,date,recentdata) VALUES ($1,$2,$3,$4)';



//echo "*************** .hello";
	pg_prepare($link,'sql2',$query);
	if (pg_execute($link,'sql2',$values))
		{
			/***********************reserve*************************/

			if($order->reservestatus){
				ReserveSection($order);
			}
			/***********************reserve*************************/

		pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql33',array($order->buyer->city));
		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result))
				{
				$emails = array($emails,$row['email']);
				if($order->business[0]->dishes){
				array_push($emails,$order->buyer->email);
				}
				if($order->reserve){
				array_push($emails,$order->reserve->email);
				}



      //fetch neighborhood from id
	   if($order->buyer->colony)
	   {
	   pg_prepare($link,'sqlNNN','SELECT * from w_neighborhood WHERE id=$1');

		$result_NN = pg_execute($link,'sqlNNN',array((int)$order->buyer->colony));

         if(pg_num_rows($result_NN) > 0)
		 {
		 $result_rec_NN = pg_fetch_array($result_NN);
		 $order->buyer->colony = $result_rec_NN['name'];
		 }
		 else
		 {
			$order->buyer->colony = ""; 
		 }
	   }
         


     //check if printer selected for the business
     pg_prepare($link,'psel','SELECT printer_model FROM w_business WHERE id=$1');
	 $psel = pg_execute($link,'psel',array($order->business[0]->id));
	 $psel_arr = pg_fetch_array($psel);
	 
	 $printer_model = $psel_arr[0];
	 
	 if($printer_model == 1)
         {
			  //GOODCOM printer
				//code for printer

		$folder_file_name=$order->business[0]->id;
		$string_val="#".$order->business[0]->id."*"; //RESTURENT ID
		
		if($order->buyer->deliveryType=="delivery"){  //ORDER TYPE
		$string_val.="1*".$id."*";	
		}
		else if($order->buyer->deliveryType=="pickup"){
		$string_val.="2*".$id."*";	
		}
		else{
		$string_val.="0*".$id."*";
		}
		
		#01*1*
		// Quantity Update in Dish Table
		
		
		$proNO = "";
		$count_dish = 1;
		
		foreach($order->business[0]->dishes as $val){  //PRODUCTS VALUE
		
		if(isset($val->optionsOnlytext))
		$proNO = $val->name.$val->optionsOnlytext;
		else
		$proNO = $val->name.",";
		
		$proPrice = $val->quantity*$val->price;
		
		
		$string_val.=$val->quantity.",".$proNO.$proPrice.";";
		
		#01*1*10005*1;Chiken;3.00;

	
	  $count_dish++;
			
			
		}
		
		//#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;
		
		
		
		$prev_order = $id - 1;
		
		if(isset($order->buyer->deliveryhours))
		{
			$dd = date("h:i d-m-Y",strtotime($order->buyer->deliveryhours));
			$delivery_hrs = $dd.";";
		}
		else
		{
			$delivery_hrs = date('h:i d-m-Y', time()).";";
		}
		
		//Check if customer verified
		pg_prepare($link,'sql_verified','SELECT * from w_users WHERE email=$1');
		$result_verified = pg_execute($link,'sql_verified',array($order->buyer->email));
		if (pg_num_rows($result_verified)==1)
		{
			$ver_status = ";4;";
		}
		else
		{
			$ver_status = ";5;";
		}
		//End customer verified
		
		
		$string_val.="*".$order->business[0]->shipping.";".$order->tax.";".$order->total.$ver_status.$order->buyer->name.";".$order->buyer->address." ".$order->buyer->colony.";".$delivery_hrs.$prev_order.";";
		
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;
		
		if($order->business[0]->paymethod->cash==true){
			$string_val.="7;cod:;";
		
		}
		else if($order->business[0]->paymethod->card==true){
			$string_val.="7;Card;";
		
		}
		else if($order->business[0]->paypaladaptive==true){
			$string_val.="7;Paypaladaptive;";
		
		}
		else if($order->business[0]->mercadopago==true){
			$string_val.="6;Mercadopago;";
		
		}
		else if($order->business[0]->paymethod->paypal==true){
			$string_val.="7;Paypal;";
		
		}
		else if($order->business[0]->authorize==true){
			$string_val.="6;Authorize;";
		
		}
	    else if($order->business[0]->braintree==true){
			$string_val.="6;Braintree;";
		
		}
		else if($order->business[0]->mercury==true){
			$string_val.="6;Mercury;";
		
		}
		
	
	#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;
		
		if(isset($order->buyer->comments))
		{
		$string_val.=$order->buyer->tel.";*".$order->buyer->comments."#";
		}
		else
		{
			$string_val.=$order->buyer->tel.";*No Comments#";
		}
		
		#01*1*10005*1;Chiken;3.00;2;Beef;6.00;3;rice;2.50;*1.0*0;12.50;4;Tom;Address;15:47 03-08-10;113;7;cod:;008612345678;*Comment#
		
		$content = $string_val;
//echo $content;exit;

         

	if (!is_dir("../../orders/".$folder_file_name)) {
			mkdir("../../orders/".$folder_file_name); 
			$fp = fopen("../../orders/".$folder_file_name."/".$folder_file_name.".txt","wb"); 
			
			
			
			fwrite($fp,$content);
		    fclose($fp);       
		}
		else{
			
			
			if (file_exists("../../orders/".$folder_file_name."/".$folder_file_name.".txt") && (filesize("../../orders/".$folder_file_name."/".$folder_file_name.".txt")!=0)) {
				
				//create a new file and copy file of existing content
				$fp = fopen("../../orders/".$folder_file_name."/".$folder_file_name."_".$id.".txt", "w");
				
				
				
			}
			else if(file_exists("../../orders/".$folder_file_name."/".$folder_file_name.".txt") && (filesize("../../orders/".$folder_file_name."/".$folder_file_name.".txt")==0))
			{
				unlink("../../orders/".$folder_file_name."/".$folder_file_name.".txt");
				$fp = fopen("../../orders/".$folder_file_name."/".$folder_file_name.".txt", "w");
				
			}
			else
			{
				$fp = fopen("../../orders/".$folder_file_name."/".$folder_file_name.".txt", "w");
				
				
			}
			
			fwrite($fp,$content);
		    fclose($fp);
		}
		
		
		
		
		


		//code for printer end

		 }
		 else if($printer_model == 2)
		 {
			 //Code for old-type
			 
			 //code for printer

		$folder_file_name=$order->business[0]->id;
		$string_val="#".$order->business[0]->id."*"; //RESTURENT ID
		
		if($order->buyer->deliveryType=="delivery"){  //ORDER TYPE
		$string_val.="1*".$id."*";	
		}
		else if($order->buyer->deliveryType=="pickup"){
		$string_val.="2*".$id."*";	
		}
		else{
		$string_val.="0*".$id."*";
		}
		// Quantity Update in Dish Table
		
		
		$proNO = "";
		$count_dish = 1;
		
		foreach($order->business[0]->dishes as $val){  //PRODUCTS VALUE
		
		if(isset($val->options))
		$proNO = $val->name.$val->options;
		else
		$proNO = $val->name;
		
		$proPrice = $val->quantity*$val->price;
		
		
		$append_str = "";
		if(count($order->business[0]->dishes) == $count_dish)
		$append_str = "";
		else
		$append_str = ";";
		
		$string_val.=$val->quantity.",".$proNO.",".$proPrice.$append_str;
		
	//	print_r($val->extras);
	
	$count_dish++;
			
			if(isset($val->extras))
		{
		   foreach($val->extras as $ext1)	
		   { 
		  
		        if($ext1->enabled)
			   $string_val.=$ext1->name.";;;"; 
		   }
			
		}
			
		
		if(isset($val->ingredients))
		{
		   /*foreach($val->ingredients as $ing1)	
		   {
			    if($ing1->enabled) 
			  $string_val.=$ing1->name.";;;"; 
		   }*/
			
		}	
			
			
			
			
		}
		
		
		//TIPS ADDED HERE//
		
		//$string_val=substr($string_val, 0, -1); //$string_val;
		/*$string_val.="*".$order->business[0]->shipping."*".$order->tax.";".$order->total.";4;".$order->buyer->name.";".$order->buyer->address.";".$order->buyer->deliveryhours."0000-00-00;0;";*/
		
		$prev_order = $id - 1;
		
		if(isset($order->buyer->deliveryhours))
		{
			$delivery_hrs = $order->buyer->deliveryhours.";";
		}
		else
		{
			$delivery_hrs = date('h:i d-m-Y', time()).";";
		}
		
		//Check if customer verified
		pg_prepare($link,'sql_verified','SELECT * from w_users WHERE email=$1');
		$result_verified = pg_execute($link,'sql_verified',array($order->buyer->email));
		if (pg_num_rows($result_verified)==1)
		{
			$ver_status = ";4;";
		}
		else
		{
			$ver_status = ";5;";
		}
		//End customer verified
		
		
		$string_val.="*".$order->business[0]->shipping.";".$order->tax.";".$order->total.$ver_status.$order->buyer->name.";".$order->buyer->address." ".$order->buyer->colony.";".$delivery_hrs.$total_orders.";";
		
		if($order->business[0]->paymethod->cash==true){
			$string_val.="7;Cash;";
		//	$string_val.="XXXXXX;";
		}
		else if($order->business[0]->paymethod->card==true){
			$string_val.="7;Card;";
		//	$string_val.="XXXXXX;";
		}
		else if($order->business[0]->mercadopago==true){
			$string_val.="6;Mercadopago;";
		//	$string_val.="XXXXXX;";
		}
		else if($order->business[0]->paymethod->paypal==true){
			$string_val.="6;Paypal;";
		//	$string_val.="XXXXXX;";
		}
		else {
		//	$string_val.="UNDEFINED;";
		//	$string_val.="UNDEFINED;";
		}
		/*if($order->buyer->tips>0)
		$string_val.=$order->buyer->tel.";*Tips ".$order->buyer->tips."#";
		else
		$string_val.=$order->buyer->tel.";*No Comments#";*/
		
		if(isset($order->buyer->comments))
		{
		$string_val.=$order->buyer->tel."*".$order->buyer->comments."#";
		}
		else
		{
			$string_val.=$order->buyer->tel."*No Comments#";
		}
		
		$content = $string_val;
//echo $content;exit;

         

		if (!is_dir("../../orders/".$folder_file_name)) {
			mkdir("../../orders/".$folder_file_name); 
			$fp = fopen("../../orders/".$folder_file_name."/".$folder_file_name.".txt","wb"); 
			
			
			
			fwrite($fp,$content);
		    fclose($fp);       
		}
		else{
			
			
			if (file_exists("../../orders/".$folder_file_name."/".$folder_file_name.".txt")) {
				
				//create a new file and copy file of existing content
				$fp = fopen("../../orders/".$folder_file_name."/".$folder_file_name."_".$id.".txt", "w");
				
				
				
			}
			else
			{
				$fp = fopen("../../orders/".$folder_file_name."/".$folder_file_name.".txt", "w");
				
				
			}
			
			fwrite($fp,$content);
		    fclose($fp);
		}
		
		
		


		//code for printer end
			 
			 
		 }


				//ORDER MAIL TEMPLATE INCLUDE START
				include_once "../templates/order-email-template.php";

				//ORDER MAIL TEMPLATE INCLUDE END


				if (SendMailOrder($msg,$msg_pdf,$lang_resource['ORDER_MAIL_SUBJECT'] . $id,$emails,$id))
					{
					if ($order->buyer->tel)
						{
						//$msg = 'Gracias por realizar tu pedido en OrderingOnlineSystem, tu no. de pedido es: '. $id;
						//require_once('sms.php');
						//sendSMS($msg,$order->buyer->tel,'52');
						//echo "Enviando a cel...";
						}

					echo $id;

						if($order->reservestatus == "true" && !empty($order->business[0]->dishes)){
							echo ",RN";
						}
						else if(!empty($order->business[0]->dishes)){
							echo ",N";
						}else if($order->reservestatus){
							echo ",R";
						}
					}
				}

  		// Get language from get or put default as en
			$lang_file;
			if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');

				include_once $lang_file;
			//Bringg Start
			
			 include_once "../templates/bringg-task-template.php";
			//Bringg End
			
			include_once "../templates/place-order-sms.php";

			if ($twilio_enabled && $order->buyer->tel) {
				require_once('sms.php');
				// Send sms to buyer if it was enabled when ordering
				  $twilioenabledclient=0;
                 $twilioenabledclient=(string)$order->twilioenabledclient;
                if(($twilioenabledclient==1)) {

					$msg = $sms_resource['SMS_ORDER_SENT_CLIENT']. $id;
          try {
            sendSMS($msg,'+'.$twilio_phone,'+'.$order->buyer->tel);
          } catch (Exception $e) {
            if ($e->getMessage() == 'error_sms_panel_config') {
              echo ',error_sms_panel_config';
            }
			
            echo ',error_sms_to_user';
          }
				}

				// Send to business
				$msg = $sms_resource['SMS_ORDER_SENT_BUSINESS']. $id;
				try {
          sendSMS($msg,'+'.$twilio_phone,'+'.$order->business[0]->tel);
        } catch (Exception $e) {
          if ($e->getMessage() == 'error_sms_panel_config') {
            echo ',error_sms_panel_config';
          }
		
          echo ',error_sms_to_business';
        }
			}
		}
	}




function InsertQuery($table,$fields,$CFG)
	{
	//get the id last secuence, with this we will get the next id seq and take it (id_sec will incriment with this query)
	$link = ConnectDB($CFG);
	$id = -1;

	pg_prepare($link,'sql',"SELECT nextval('".$table."_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		die();

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);

	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			$query .=  ','. key($fields);
			array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}

	$query .= ') VALUES ($1';

	for ($i=0;$i<$count;$i++)
		$query .= ',$' . ($i+2);

	$query .= ')';
	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$values);
	pg_close($link);
	return $id;
	}


function UpdateQuery($table,$fields,$id,$CFG)
	{
	$query = 'UPDATE ' . $table . ' SET ';
	$count = 0;
	$values = array();

	while ($field = current($fields))
		{
		//if data incoming is not null, means we need to save the field
		if ($field->value!='null')
			{
			if ($count>0)
				$query .=  ','. key($fields) . '=$' . ($count+1);
				else
				$query .=  key($fields) . '=$' . ($count+1);
			array_push($values,$field->value);
			$count++;
			}

    	next($fields);
		}

	array_push($values,$id);

	$link = ConnectDB($CFG);
	pg_prepare($link,'sql',$query . ' WHERE id=$' . ($count+1));
	$result = pg_execute($link,'sql',$values);
	pg_close($link);
	}



/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'normal.jpg';

	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder))
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
	$ext = strtolower($ext_arr[count($ext_arr)-1]); //Get the last extension

	require('../lib/resize.php');
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
		$image->resize(264,264);

		$image2 = new SimpleImage();
		$image2->load($finalname);
		$image2->resize(22,22);

		$image3 = new SimpleImage();
		$image3->load($finalname);
		$image3->resize(224,224);

		$image->save($folder.'medium.jpg');
		$image2->save($folder.'mini.jpg');
		$image3->save($folder.'small.jpg');
		}
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
		//create thumbnail and regular size
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(264,264);

		$image2 = new SimpleImage();
		$image2->load($finalname);
		$image2->resize(22,22);

		$image3 = new SimpleImage();
		$image3->load($finalname);
		$image3->resize(224,224);

		$image->save($folder.'medium.jpg');
		$image2->save($folder.'mini.jpg');
		$image3->save($folder.'small.jpg');
		}
	}


function SaveWhereAmI($data)
	{
		
		
	session_start();
	$_SESSION['whereami'] = stripslashes($data);
	//once we save the where ami means the user has selected a city.. we also get the city timezone and stored so that we can use it later...
	$link = ConnectDB();
		$order1 = parse($data);

	$country_id = $order1->country;
	
	
	
	
	$categories = $order1->cuisines;
	
	
	//print_r($categories_list);

	$categories = strtolower(str_replace('[','',$categories));
	$categories = strtolower(str_replace(']','',$categories));
	$categories = strtolower(str_replace('"','',$categories));
//echo $categories;

	/******************************** fetch category name **********************************/
	pg_prepare($link,'sqlcnc',"SELECT * FROM w_categories where id=$1");
	if($categories == '-1'){
		$categories = "All Categories";
	}elseif($categories == ''){
		$categories = "All Categories";
	}else{
		
		$cat = parse($categories);
	
		foreach($cat as $catval){
		$ad->catid = $catval;
		
		
		$cat = pg_execute($link,'sqlcnc',array($ad->catid));
		$catr = pg_fetch_array($cat);		
		$categorie = $catr['name'];
		
		
		
	}
		/*pg_prepare($link,'sqlcnc',"SELECT * FROM w_categories where id=$1");
		$cat = pg_execute($link,'sqlcnc',array($categories));
		$catr = pg_fetch_array($cat);
		$categories = $catr['name'];*/
	}	
	
	/*******************************end******************/
	
	/******************************** fetch country name **********************************/
	pg_prepare($link,'sqlcn12',"SELECT * FROM w_countries where id=$1");
	$res = pg_execute($link,'sqlcn12',array($country_id));
	$row = pg_fetch_array($res);
  	 $country = $row['name'];
	/*******************************end******************/
	/******************************** insert where am i dada **********************************/
	
	pg_prepare($link,'sqli213',"SELECT * FROM w_search_statistic ORDER BY id DESC");	
	$res = pg_execute($link,'sqli213',array());
	
				if(pg_num_rows($res) == 0) { 
				  $id = 1;
				  } else { 
				   $all_rec= pg_fetch_array($res);
				  $id= $all_rec['id'];
				  $id = $id + 1;
				  }
	
 		 $city = $order1->city;
		 $zipcode = $order->searchinfo->zipcode;
 		 $zipcode = strtolower(str_replace(" ","",$zipcode));

	 	 $address = $order1->address;
	 	 $address = strtolower(str_replace(" ","",$address));
		 
			/******************************** fetch statistic data**********************************/
	
	/************************************end*****************************/

	
	
	$point="0";
	$date="now()";
	//unset();
	$s = session_id();
	$confirm_order=0;
	$status=1;
    
			/******************************** fetch session id**********************************/

	pg_prepare($link,'sqls',"SELECT * FROM w_search_statistic where address=$1 AND categories=$2");
	$res1 = pg_execute($link,'sqls',array($address,$categories));  
	if(pg_num_rows($res1) == 0) { 
				  $s = session_id();
				 $hit=1; 
				
			 pg_prepare($link,'sqliam22wa','INSERT INTO w_search_statistic(id,city,country,zipcode,address,hit,point,date,session_id,confirm_order,status,categories) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)');
			pg_execute($link,'sqliam22wa',array($id,$city,$country,$zipcode,$address,$hit,$point,$date,$s,$confirm_order,$status,$categories));

				  
				  } else { 
				 $h = pg_fetch_array($res1);
				  
					 $hit=$h['hit']+1;
					 $point = 2;					
				
			
			
			 pg_prepare($link,'sqliam22wb','UPDATE w_search_statistic SET hit=$1 where address=$2 AND categories=$3');
			pg_execute($link,'sqliam22wb',array($hit,$address,$categories));
	
					   				 
				  }
	
	/*******************************end******************/
	
	pg_prepare($link,'sql1','SELECT timezone FROM w_franchises WHERE id=$1');
	$result = pg_execute($link,'sql1',array(parse($data)->city));
	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$_SESSION['timezone'] = $row['timezone'];
	session_write_close();
	pg_close($link);
	}

function SaveWhereAmIResturant($data){ 
	session_start();

	
	$_SESSION['whereami'] = stripslashes($data);
	//once we save the where ami means the user has selected a city.. we also get the city timezone and stored so that we can use it later...
	$link = ConnectDB();
	
	pg_prepare($link,'sql111','SELECT city FROM w_business WHERE id=$1');
	$result1 = pg_execute($link,'sql111',array(parse($data)->business));
	$row1 = pg_fetch_array($result1);

	pg_prepare($link,'sql1','SELECT timezone FROM w_franchises WHERE id=$1');
	$result = pg_execute($link,'sql1',array($row1['city']));
	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$_SESSION['timezone'] = $row['timezone'];
	session_write_close();
	pg_close($link);
}

function PointInArea($PointLatitud,$PointLongitud,$AreaPoints)
		{
		$j = 0;
      	$InArea = false;
	  	$x = floatval($PointLongitud);
	  	$y = floatval($PointLatitud);
	  	$pcount = count($AreaPoints);
	  	for ($i=0;$i<$pcount;$i++)
			{
	       	$j++;
	        if ($j==$pcount)
				$j = 0;

	  		if (((floatval($AreaPoints[$i]->latitud) < $y) && (floatval($AreaPoints[$j]->latitud) >= $y)) || ((floatval($AreaPoints[$j]->latitud) < $y) && (floatval($AreaPoints[$i]->latitud) >= $y)))
				{
	        	if (floatval($AreaPoints[$i]->longitud) + ($y - floatval($AreaPoints[$i]->latitud))/(floatval($AreaPoints[$j]->latitud)-floatval($AreaPoints[$i]->latitud))*(floatval($AreaPoints[$j]->longitud) - floatval($AreaPoints[$i]->longitud))<$x)
					{
	              	$InArea = !$InArea;
	            	}
	          	}
	        }
		return $InArea;
	    }


function ArrayUnique($input,$returnkeys = false)
	{
	$array = array();
	$withkeys = array_flip(array_flip(array_reverse($input,true)));
	if ($returnkeys == true)
		return $withkeys;

	foreach($withkeys as $a)
		array_push($array,$a);

	return $array;
	}


function SendMail($msg,$subject,$addresses)
	{
	require "class.phpmailer.php";
	//Fetch from email here
	foreach($addresses as $key=>$val){
			 $email = test_input($val);
			if((trim($email)=='') || (!filter_var($email, FILTER_VALIDATE_EMAIL))){
				unset($addresses[$key]);
			}
		}
		$addresses=array_unique($addresses);
	$row = FetchAllsettingsCustomMailchmp();
	//end fetch
	$mail = new PHPMailer();
    $mail->PluginDir = "";
    $mail->Host = "localhost";
	$mail->From = $row['email_from'];
	$mail->FromName = $row['sitename'];
    $mail->Subject =  $subject;
    foreach ($addresses as $address)
    	$mail->AddAddress($address);
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
    $success = $mail->Send();
 	$try = 1;

   	while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
   		{
	   	sleep(5);
     	$success = $mail->Send();
     	$try++;
   		}

   	$mail->ClearAddresses();
   	if(!$success)
		return false;
		else
		return true;
	}

function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
///new pdf mail///
function SendMailOrder($msg,$msg_pdf,$subject,$addresses,$id)
	{
		foreach($addresses as $key=>$val){
			 $email = test_input($val);
			if((trim($email)=='') || (!filter_var($email, FILTER_VALIDATE_EMAIL))){
				unset($addresses[$key]);
			}
		}
		$addresses=array_unique($addresses);
	require "class.phpmailer.php";
	//Fetch from email here
	$row = FetchAllsettingsCustomMailchmp();
	//end fetch
	$mail = new PHPMailer();

	//pdf attachment start
	include("../payment-gateway/pdf/dompdf_config.inc.php");


			$dompdf = new DOMPDF();

			/*echo "******pdf-html********";
			echo $msg_pdf;
			echo "******pdf-html********";*/

			$dompdf->load_html($msg_pdf);

			//echo "test";

			$dompdf->render();
			$dompdf->set_paper("A4","portrait");

			$date=date("Y-m-d H:i:s");
			$file_name=$fetch->invo;
			$pdf = $dompdf->output();

			//print_r($pdf);

			file_put_contents("../order_pdf/order.pdf", $pdf);

	//pdf attachment ends




    $mail->PluginDir = "";
    $mail->Host = "localhost";
	//$mail->From = "orders@oos.localhost";
	$mail->From = $row['email_from'];
	$mail->FromName = $row['sitename'];
    $mail->Subject =  $subject;
    foreach ($addresses as $address)
    	$mail->AddAddress($address);
	$mail->MsgHTML($msg);
	$mail->IsHTML(true);
	$mail->AddAttachment("../order_pdf/order.pdf",$id."_order.pdf");
    $mail->AltBody ="Order";
   	$mail->CharSet = 'UTF-8';
    $success = $mail->Send();

	/*echo "*****success*****";
	echo $success;
	echo "*****end success*****";*/

 	$try = 1;

   	while((!$success)&&($try<1)&&($mail->ErrorInfo!="SMTP Error: Data not accepted"))
   		{
	   	sleep(5);
     	$success = $mail->Send();
     	$try++;
   		}

   	$mail->ClearAddresses();
   	if(!$success)
		return true;
		else
		return true;
	}


//end new pdf mail////



function GetConfig($configs)
	{
	require('panel/config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;

	$link = pg_connect($string);

	if(!$link)
		{
		echo '[]';
		return;
		}

	$conditional = ' WHERE ';
	$count = 0;
	foreach($configs as $config)
		{
		if ($count==0)
			$conditional .= 'name=$' . ($count+1);
			else
			$conditional .= ' OR name=$' . ($count+1);
		$count++;
		}

	pg_prepare($link,'sql','SELECT value,name FROM w_configs' . $conditional);
	$result = pg_execute($link,'sql',$configs);
	$configs = array();
	while($row = pg_fetch_array($result))
		{
		unset($config);
		$config->name = $row['name'];
		$config->value = $row['value'];
		array_push($configs,$config);
		}

	pg_close($link);
	echo json_encode($configs);
	}

  function GetConfigFromPanel($configs) {
	  require('./../config.php');
	  $string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
  	$link = pg_connect($string);

	  if(!$link){
		  return '[]';
    }
	  $conditional = ' WHERE ';
	  $count = 0;
	  foreach($configs as $config) {
		  if ($count==0) {
			  $conditional .= 'name=$' . ($count+1);
      }
			else {
			  $conditional .= ' OR name=$' . ($count+1);
      }
		  $count++;
		}
		 pg_query($link, "DEALLOCATE ALL");
	  pg_prepare($link,'sql','SELECT value,name FROM w_configs' . $conditional);
	  $result = pg_execute($link,'sql',$configs);
	  $configs = array();
	  while($row = pg_fetch_array($result)) {
		  unset($config);
		  $config->name = $row['name'];
		  $config->value = $row['value'];
		  array_push($configs,$config);
		}
	  pg_close($link);
	  return json_encode($configs);
  }

function FetchTimeByZone($zone,$format = 'empty')
	{
	echo GetTimeByZone($zone,$format);
	}

function GetTimeByZone($zone,$format = 'empty')
	{
	$now = time();
	date_default_timezone_set($zone);
	if ($format=='24')
		return date('h:i A',$now);
		else
		return date('G:i',$now);
	}

function FetchTimeByZoneSiteSettings($zone,$format = 'empty'){
    $now = time();
    date_default_timezone_set($zone);
    echo date('G:i',$now);
}


function ProtectEmail($e)
		{
		$n = '';
		$e = explode('@',$e);
		$s = $e[0];

		for ($j=0;$j<strlen($s);$j++)
		    if ($j>0 && $j<strlen($s)-1)
		        $n .= '*';
		        else
		        $n .= $s[$j];


		$n .= '@';
		$s = $e[1];

		$flag = false;
		for ($j=0;$j<strlen($s);$j++)
		    {
		    if ($j>0 && $j<strlen($s)-1 && !$flag && $s[$j]!='.')
		        $n .= '*';
		        else
		        $n .= $s[$j];
		    if ($s[$j]=='.')
		        $flag = true;
		    }
		return $n;
		}

function countrieslist()
{
	require('panel/config.php');
	$link = ConnectDB($CFG);
	pg_prepare($link,'sql0','SELECT * FROM w_countries where enabled=$1');
	$result = pg_execute($link,'sql0',array('TRUE'));

	$countries = array();
	while($row = pg_fetch_array($result))
		{
		unset($country);
		$country->id = $row['id'];
		$country->name = $row['name'];
		array_push($countries,$country);
		}

	return $countries;

}

function franchiesData($cid)
{
	require('panel/config.php');
	$link = ConnectDB($CFG);
	pg_prepare($link,'sqls'.$cid,'SELECT * FROM w_franchises WHERE country=$1 ORDER BY id DESC');
	$result = pg_execute($link,'sqls'.$cid,array($cid));

	$citys = array();
	while($row = pg_fetch_array($result))
		{
		unset($city);
		$city->id = $row['id'];
		$city->name = $row['city'];
		array_push($citys,$city);
		}

	return $citys;

}

function CheckForBusinessDirectLink($alias)
	{
	require('languages/lang.en.php');


		/******************************FOR BACK BUTTON***************************************************************/
	$alias_sp = explode("_",$alias);
	require('panel/config.php');
	$link = ConnectDB($CFG);
	if(reset(explode('_', $alias)) == $lang_resource['BACK_BUTTON_SEARCHBY'] ) {

		$rlink = new stdClass();
		$rlink->id = "static";
		$rlink->address = $alias_sp[1];

		  $city_rec = str_replace("-"," ",$alias_sp[2]);
		  pg_prepare($link,'sqlc3',"SELECT id FROM w_franchises WHERE lower(city)=$1 ");
		 $city_result = pg_execute($link,'sqlc3',array(strtolower($city_rec)));
		 $city_fetch  = pg_fetch_array($city_result);

		$rlink->city = $city_fetch['id'];
		$rlink->cityname = $alias_sp[2];

		 $con_rec = str_replace("-"," ",$alias_sp[3]);
		  pg_prepare($link,'sqlcn3',"SELECT id FROM w_countries WHERE lower(name)=$1 ");
		 $contry_result = pg_execute($link,'sqlcn3',array(strtolower($con_rec)));
		 $contry_fetch  = pg_fetch_array($contry_result);

		 $rlink->country = $contry_fetch['id'];
		$rlink->deliveryType = $alias_sp[4];

		$rlink->latitud = $alias_sp[5];
		$rlink->longitud = $alias_sp[6];
		$rlink->zipcode = $alias_sp[7];
		$rlink->zoom = $alias_sp[8];
		$rlink->nighbourid = $alias_sp[9];
		$rlink->resturantsid = $alias_sp[10];
		$rlink->cuisinesid = $alias_sp[11];
	    $rlink->pagetype = 'searchBy';

		return $rlink;

		}
	else if(reset(explode('_', $alias)) == $lang_resource['BACK_BUTTON_RESTAURENT'] ) {

	//	echo $alias_sp[1];
		 $whatIWant = substr($alias, strpos($alias, "_") + 1);

		pg_prepare($link,'sqlRs',"SELECT customslug FROM w_business where lower(replace(name,' ','')) = $1");
		$fechrec = pg_execute($link,'sqlRs',array(strtolower($whatIWant)));
		//echo pg_num_rows($fechrec);
		if(pg_num_rows($fechrec)>0)
		 $rec = pg_fetch_array($fechrec);

		 $alias = $rec['customslug'];
		 $alias = strtolower($alias);


	}
	else {


		$alias = strtolower($alias);
	}

		/******************************FOR BACK BUTTON***************************************************************/




	/********************************ALL CMS FETCH***************************/
	$cms=false;
	$allfcms = array();
	pg_prepare($link,'sqlfcms',"SELECT * FROM w_footercms where lower(customurl) = $1");
	$allfootercms = pg_execute($link,'sqlfcms',array(strtolower($alias)));
	if(pg_num_rows($allfootercms)==1){
		$cms = true;


	}
	/********************************ALL CMS FETCH***************************/
	if($allfcms[0] == $alias){}
	$cusion_als=explode("_",$alias);
	$cusion=0;
	/********************************ALL CUISINE FETCH***************************/
	if($cusion_als[0]=="cuisine"){
		$cusion_als[1]=str_replace("@-@"," ",$cusion_als[1]);
		pg_prepare($link,'sql25',"SELECT * FROM w_categories WHERE LOWER(name)=$1 ");
		$allBusiness = pg_execute($link,'sql25',array(strtolower($cusion_als[1])));
		$cusion=1;
	}
	/********************************ALL CUISINE FETCH***************************/


	if (($cusion==1) &&(pg_num_rows($allBusiness)> 0))  {
		/********************************ALL CUISINE CHECK***************************/
		while($rowCat = pg_fetch_array($allBusiness))
			{
					unset($category);
			$category->id = $rowCat['id'];
			$category->category = $rowCat['name'];
			$category->pagetype = 'category';
			}
			return $category;
		/********************************ALL CUISINE CHECK***************************/
	}
	else if($cms == true){
		/********************************ALL CMS CHECK***************************/
		$row =pg_fetch_array($allfootercms);
		unset($cmsf);
		$cmsf->id = $row['id'];
		$cmsf->pagetitle = $row['pagetitle'];
		$cmsf->pageheading = $row['pageheading'];
		$cmsf->customurl = $row['customurl'];
		$cmsf->metakeyword = $row['metakeyword'];
		$cmsf->metacontent = $row['metacontent'];
	    $cmsf->pagetype = 'cms';

			/********************************ALL CMS CHECK***************************/

		return $cmsf;
	}
	else{
			/********************************ALL CUSTOMSLUG CHECK***************************/
	pg_prepare($link,'sql22',"SELECT * FROM w_business");
	$allBusiness = pg_execute($link,'sql22',array());
	if(pg_num_rows($allBusiness) != 0){
	while($busins = pg_fetch_array($allBusiness))
			{

				if($busins['customslug']!="") {
				$slug=strtolower($busins['customslug']);
				$bstore[$slug] = strtolower($busins['name']);
			    $cstore[] = strtolower($busins['customslug']);
				$businessid[$slug] = $busins['id'];

				}


			}
/********************************ALL CUSTOMSLUG CHECK***************************/
	}else{
		 $cstore = array();
	}

	//check if franchise exists....

	$fid = -1;
	if(in_array(strtolower($alias),$cstore) == true ) {

	   $bsid = $businessid[$alias];
		pg_prepare($link,'sqli',"SELECT city FROM w_business WHERE id=$1 ");
		$resQ = pg_execute($link,'sqli',array($bsid));
		$res = pg_fetch_array($resQ);



		  pg_prepare($link,'sqli3',"SELECT id,country,city,currency FROM w_franchises WHERE id=$1 ");
		$result = pg_execute($link,'sqli3',array($res['city']));
	if (pg_num_rows($result)> 0)
		while($row = pg_fetch_array($result))
			{
				$cityName = strtolower(str_replace(" ","",$row['city']));

				$fid = $row['id'];
				$country = $row['country'];
				$city= $row['city'];
				$currency = $row['currency'];

			}
		}
	else {

		pg_prepare($link,'sqli',"SELECT id,country,city,currency FROM w_franchises ");
		$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)> 0)
		while($row = pg_fetch_array($result))
			{
				$cityName = strtolower(str_replace(" ","",$row['city']));
				if($cityName == strtolower($alias)) {
				$fid = $row['id'];
				$country = $row['country'];
				$city= $row['city'];
				$currency = $row['currency'];
				}
			}
	}

	if ($fid==-1)
		return '';

		if(in_array(strtolower($alias),$cstore) == true ) {

		$rname = '';
		$rname = $businessid[$alias];

	pg_prepare($link,'sql2',"SELECT w_business.id,w_business.street,w_business.colony,w_business.location,w_business.mkeywords,w_business.mdescription,w_business.name,w_business.twiliophone,w_business.twilioenabled,w_business.enabled,w_franchises.ga,w_franchises.city FROM w_business INNER JOIN w_franchises ON w_franchises.id = $1 AND w_business.id = $2 ");
	$result = pg_execute($link,'sql2',array($fid,$rname));

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			{
			session_start();
			if ($row['ga']=='')
				$ga = 'null';
				else
				$ga = '"' . $row['ga'] . '"';
			if(IS_PAYPAL_ENABLED == 1)
				$_SESSION['whereami'] = '{"country":"'.$country.'","currency":"'.$currency.'","city":"'.$fid.'","ga":'.$ga.',"cityname":"'.$row['city'].'","address":"'.$row['street'].' '.$row['colony'].'","location":'.json_encode($row['location']).',"approved":true}';
			else
				$_SESSION['whereami'] = '{"country":"'.$country.'","city":"'.$fid.'","ga":'.$ga.',"cityname":"'.$row['city'].'","address":"'.$row['street'].' '.$row['colony'].'","location":'.json_encode($row['location']).',"approved":true}';
			session_write_close();
			unset($business);
			$business->id = $row['id'];
			$business->name = $row['name'];
			$business->cityname = $row['city'];
			$business->address = $row['street'].",".$row['colony'];
			$business->mkeywords = $row['mkeywords'];
			$business->mdescription = $row['mdescription'];
			$business->twiliophone = $row['twiliophone'];
			$business->enabled = $row['enabled'];
			$business->pagetype = 'restaurant';
			$business->twilioenabled = true;//$row['twilioenabled'];
			return $business;
			}
		}
		else {

	        unset($business);
		    $business->id = $fid;
			$business->name = $country ;
			$business->city = $city;
			$business->pagetype = 'city';
			return $business;
	  }
  // if(count($alias)>1) {
	//no that we have the city id... we search for the business matching the given name...


  }

	return;
	}


function stringify($obj)
	{
	return json_encode($obj);
	}


function parse($str)
	{
	//return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));
	}

function PlaceorderreserveBefore($data,$pid){

	$link = ConnectDB();
	$id = -1;
	$order = parse($data);

	$order->buyer->cityname=$order->buyer->cityname;

	if (!empty($pid))
		{
		$order->paypalid = $pid;
		}
		   foreach ($order->business as $businessx) {
                $businessx->name = str_replace('@@@', '&',$businessx->name);
                foreach ($businessx->dishes as $dishx) {
                $dishx->name = str_replace('@@@', '&',$dishx->name);
                $dishx->options = str_replace("\\", '',$dishx->options);
				}
		}
require('../../languages/lang.en.php');
	session_start();
	session_write_close();


	pg_prepare($link,'sqli',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

	$values = array($id,stringify($order),'now()');
	//print($values);
	//print(urlRawDecode($order->buyer->cityname));exit;
	$recent = new stdClass();
	$recent->user = new stdClass();

	$name = explode(' ',$order->buyer->name);
	$lastname = substr($name[1], 0, 1);
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
		else
		$recent->user->name = $name[0];

	$recent->business= new stdClass();
	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));



	if (!empty($_SESSION['user']->id))
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr) VALUES ($1,$2,$3,$4,$5)';
		array_push($values,$_SESSION['user']->id);
		//echo $_SESSION['whereami'];
		$session_record= new stdClass();
		$session_record = json_decode($_SESSION['whereami']);
		$session_record->address = $order->buyer->address;
		$_SESSION['whereami'] = json_encode($session_record);


		pg_prepare($link,'sqlur1','UPDATE w_users SET street=$1,colony=$2,tel=$3,findfrom=$4 WHERE id=$5');
		pg_execute($link,'sqlur1',array($order->buyer->address,$order->buyer->colony,$order->buyer->tel,$order->buyer->reference,$_SESSION['user']->id));
		}
		else
		$query = 'INSERT INTO w_orders (id,data,date,recentdata) VALUES ($1,$2,$3,$4)';



//echo "*************** .hello";
	pg_prepare($link,'sql2',$query);
	if (pg_execute($link,'sql2',$values))
		{
			/***********************reserve*************************/

			if($order->reservestatus){
				ReserveSection($order);
			}
			/***********************reserve*************************/

		pg_prepare($link,'sql33','SELECT email from w_franchises WHERE id=$1');
		$result = pg_execute($link,'sql33',array($order->buyer->city));
		if (pg_num_rows($result)==1)
			while($row = pg_fetch_array($result))
				{
				$emails = array($emails,$row['email']);
					if($order->business[0]->dishes){
					array_push($emails,$order->buyer->email);
					}
					if($order->reserve){
					array_push($emails,$order->reserve->email);
					}
				}
		}

		echo $id;
}

function PlaceOrderbefore($data,$pid) {

	$link = ConnectDB();
	$id = -1;
	$order = parse($data);

	if (!empty($pid))
		{
		$order->paypalid = $pid;
		}
	  
		 foreach ($order->business as $businessx) {
                $businessx->name = str_replace('@@@', '&',$businessx->name);
                foreach ($businessx->dishes as $dishx) {
                $dishx->name = str_replace('@@@', '&',$dishx->name);
              
				 
				}
		   }
	
	pg_prepare($link,'sqli',"SELECT nextval('w_orders_id_seq') as key");
	$result = pg_execute($link,'sqli',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id = $row['key'];

	if ($id==-1)
		return;

	$values = array($id,stringify($order),'now()');
	unset($recent);
	unset($recent->user);
	$name = explode(' ',$order->buyer->name);
	$lastname = substr($name[1], 0, 1);
	if ($lastname!='')
		$recent->user->name = $name[0] . ' ' . $lastname . '.';
		else
		$recent->user->name = $name[0];

	unset($recent->business);
	$recent->business->id = $order->business[0]->id;
	$recent->business->name = $order->business[0]->name;
	array_push($values,json_encode($recent));

	session_start();
	session_write_close();

	if (!empty($_SESSION['user']->id))
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata,usr) VALUES ($1,$2,$3,$4,$5)';
		array_push($values,$_SESSION['user']->id);
		pg_prepare($link,'sqlur3','UPDATE w_users SET street=$1,colony=$2,tel=$3 WHERE id=$4');
		pg_execute($link,'sqlur3',array($order->buyer->address,$order->buyer->colony,$order->buyer->tel,$_SESSION['user']->id));
		}
		else
		{
		$query = 'INSERT INTO w_orders (id,data,date,recentdata) VALUES ($1,$2,$3,$4)';

		}
		 pg_prepare($link,'sql2',$query);
	   	 pg_execute($link,'sql2',$values);
		 
		
		 
		
		 echo $id;
		// header("location: http://www.sofamad.dk/panel/danish_ipncustom.php?id=$id");
	}
	function FetchAllBusinessDeliveryLocation($locations,$alldata,$bid) {
		
		
		
	         $link = ConnectDB();
			 
			 $location=parse($locations);
			 $alldata=parse($alldata);
			
			
			
			
			// $location= json_decode($loc_array);

			 $conditionalsvalues = array();
	         $query = 'SELECT * from w_business WHERE id=$1';

			 pg_prepare($link,'sqlf2',$query);
	         $result = pg_execute($link,'sqlf2',array($bid));
			
			 $zipquery = 'SELECT * from w_zipcode WHERE  businessid=$1 AND enabled=$2';
	         pg_prepare($link,'sqlz3',$zipquery);
			 //Settings to select miles or km 	
			$sqldformat = "SELECT * from w_configs WHERE  name='distanceformat'";
			pg_prepare($link,'sqldformat',$sqldformat);
			$resultdformat = pg_execute($link,'sqldformat',array());
			$rowdformat = pg_fetch_array($resultdformat);
			$distanceformat=$rowdformat["value"];
			
			 $allbusiness = array();

			    /*****************************************zone km wise************************************************************/
					 $querys = 'SELECT * from w_deliverykm WHERE enabled=true';
					  pg_prepare($link,'sqldz4',$querys);
					  $kmwiseSql = pg_execute($link,'sqldz4',array());
					  $count = pg_num_rows($kmwiseSql);

					  $AlllocationAreaInKm = array();


					  while($dis = pg_fetch_array($kmwiseSql))
							 {
							 unset($kmArea);
							 $kmArea->business = $dis['business'];
							 $kmArea->servearea = $dis['servearea'];
							 $kmArea->maxallow = $dis['maxallow'];
							 array_push($AlllocationAreaInKm,$kmArea);
							 }

							// print_r($AlllocationAreaInKm);
					/*****************************************zone km wise************************************************************/
	while($row = pg_fetch_array($result))
		{
		unset($business);

	     $ziprecord = pg_execute($link,'sqlz3',array($row['id'],'TRUE'));
		 $business->ziprecord = pg_num_rows($ziprecord);
		 $blocation = parse($row['location']);
		$business->id = $row['id'];
		$business->zones = $row['zones'];
		$business->minimum =$row['minimum'];
	    $business->location = $row['location'];
		 $business->schedule = $row['schedule'];
		 //Settings to select miles or km 
		$business->distanceformat = $distanceformat;
		
		
		$distance = distanceCalculator($location->latitud,$location->longitud,$blocation->latitud,$blocation->longitud, $distanceformat);
		$business->distance = $distance;
		
		

		
		$business->DeliveryStatus = checkDeliveryStatus($row['id'],$link);
		$business->PickupStatus = checkPickupStatus($row['id'],$link);




		array_push($allbusiness,$business);
		}
		
		        pg_prepare($link,'sqlw','SELECT * FROM w_configs where name=$1');
				$result = pg_execute($link,'sqlw',array('panelsetting'));
				$row = pg_fetch_array($result);
			    $panelsetting = $row['value'];
				
				
				include('front_search_panel.php');
				
			  if( isset($alldata->delivery_neighborhoodStaus ) && $alldata->delivery_neighborhoodStaus == 1) {
			
			
			    $newbusiness = frontserachneighborhood($locations,$allbusiness,$link,$alldata);
				
		     	
				
				
					      				if(count($newbusiness) == 0){
												
												unset($business);
							                    $business->shipping = "pending";
												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
										} else {
											
											unset($newbusiness->location);
											}
				
			    echo  json_encode($newbusiness);
				
				exit;
			
						}
				
				
				if( $panelsetting == 2) {
		
					
					$newbusiness = frontserachpanelnew($locations,$allbusiness,$link,$deliveryType="delivery");
					
					      				if(count($newbusiness) == 0){
												
												unset($business);
							                    $business->shipping = "pending";
												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
										}
					
					
					echo json_encode($newbusiness);
					
					
				} else { 
				
					  $newbusiness = array();
		              foreach($allbusiness as $business)
						{
							
						$searchzip = getSearchPostcodemain($location->latitud,$location->longitud);
						$zones = parse($business->zones);
						 $deliveyPrice[$busid] = -1;
						 $businessopen[$busid] = false;
		/*********************************delivery zone wise select search****************************************************/
						if (PointInArea($location->latitud,$location->longitud,$zones->zone1->coordinates))
							{
							//remove unnecesary fields and add him as visible to the user
							 $deliveyPrice[$busid] = $zones->zone1->price;
							$business->shipping = $zones->zone1->price;
							$business->searchtype = "delivery";
							$businessopen[$busid] = true;
							unset($business->zones);
							//unset($business->location);
							unset($business->enabled);
							array_push($newbusiness,$business);
							}
						else if (PointInArea($location->latitud,$location->longitud,$zones->zone2->coordinates))
								{
								//remove unnecesary fields and add him as visible to the user
								 $deliveyPrice[$busid] = $zones->zone2->price;
								$business->shipping = $zones->zone2->price;
								$businessopen[$busid] = true;
								$business->searchtype = "delivery";
								unset($business->zones);
								//unset($business->location);
								unset($business->enabled);
								array_push($newbusiness,$business);
								}
						else if (PointInArea($location->latitud,$location->longitud,$zones->zone3->coordinates))
									{
									//remove unnecesary fields and add him as visible to the user
									 $deliveyPrice[$busid] = $zones->zone3->price;
									$business->shipping = $zones->zone3->price;
									$businessopen[$busid] = true;
									$business->searchtype = "delivery";
									unset($business->zones);
									//unset($business->location);
									unset($business->enabled);
									array_push($newbusiness,$business);
									}
							else if($business->ziprecord>0)
									{
									 $zipfetch = pg_execute($link,'sqlz3',array($business->id,'TRUE'));

										 while($record = pg_fetch_array($zipfetch))
										 {
											if($searchzip == $record['zipcode'] )
											{
												 $deliveyPrice[$busid] = GetDecimalPoint($record['cost']);
												$business->shipping = GetDecimalPoint($record['cost']);
												$business->searchtype = "delivery";
												$businessopen[$busid] = true;
												unset($business->zones);
												//unset($business->location);

												array_push($newbusiness,$business);
												break;
											}
										  }

								   }

								/* **************************new section ************************************  */
							foreach($AlllocationAreaInKm as $kmzone)  {

										if(in_array("-1",parse($kmzone->business)) || in_array($business->id,parse($kmzone->business)) ) {

											//remove unnecesary fields and add him as visible to the user
											$delDetails = approvdeliveryArea_main($kmzone->servearea,$business->distance,$kmzone->maxallow);

										//print_r($delDetails);
											if($delDetails->accept == true) {

											if($deliveyPrice[$busid]<=$delDetails->delprice)
												{
											$deliveyPrice[$busid] = GetDecimalPoint($delDetails->delprice);
											$business->shipping = GetDecimalPoint($delDetails->delprice);
											$business->searchtype = "delivery";
											$businessopen[$busid] = true;
											$business->minimum = $delDetails->maxallow;
											 unset($business->zones);
											//unset($business->location);
											unset($business->enabled);
												}

											if($deliveyPrice[$busid] ==  -1) {
											array_push($newbusiness,$business);
											}
											break;
											   }
											}

							 }
				 /* **************************new section ************************************  */

	if($deliveyPrice[$busid] ==  -1) {
		
		$AlllocationArea = array();
		$querys = 'SELECT * from w_deliveryzone WHERE enabled=true';
		  pg_prepare($link,'sqldzp2',$querys);
		  $results = pg_execute($link,'sqldzp2',array());
		  $count = pg_num_rows($results);
		   $now = strtotime(GetTimeByZone($_SESSION['timezone']));
		   $dayss = json_decode('{"Mon":"1","Tue":"2","Wed":"3","Thu":"4","Fri":"5","Sat":"6","Sun":"7"}');
		   $todayidd = $dayss->{date("D",strtotime(date('d-m-Y')))};
		  while($loc = pg_fetch_array($results))
						 {
						 unset($locationArea);
						 $locationArea->id = $loc['id'];
						 $locationArea->position = $loc['location'];
						 $locationArea->business = $loc['business'];
						 $locationArea->deliveryprice = $loc['deliveryprice'];
						 $locationArea->minpurchase = $loc['minpurchase'];
						 $locationArea->schedule = $loc['schedule'];
						 $locationArea->days = $loc['days'];
						 array_push($AlllocationArea,$locationArea);
			 }
		
					 /* **************************Extra Delivery area************************************  */				 
            foreach($AlllocationArea as $locacus)  {
					
					
		if($locacus->business !="") {
							
		  if(in_array("-1",parse($locacus->business)) || in_array($business->id,parse($locacus->business)) ) {
							   
			  if (PointInArea($location->latitud,$location->longitud,parse($locacus->position)))   {
					
				 	
				$schedules = parse($locacus->schedule);
				$deliverydays = parse($locacus->days);
				$recordHis[$business->id] = 0;
				foreach ($deliverydays as $day)
				{
								
				if ($day==$todayidd || $day=='0')//day 0 its the "all" days flag
				{
							
				$recordHis[$business->id] = 1;				
				$schedules = parse($locacus->schedule);
				
				
									
				if ($now>=strtotime($schedules->opens->hour.':'.$schedules->opens->minute)) 
				{ //menu opened now check if its not closed
					
					if ($now<strtotime($schedules->closes->hour.':'.$schedules->closes->minute))//ok
						{
						    $businessopen[$busid]  =true;
							
							break;
						}
						else{
							$businessopen[$busid]  =false;
							break;
							//false
							}	
				}
				  else {
					$businessopen[$busid]  =false;
					 break;
						//false
					 
					 }
								}
						
					
					}
			if($recordHis[$business->id] == 0) {
				//false
				 $businessopen[$busid]  =false;
					 break;
			
			}	
					 
								
								if($businessopen[$busid] = true ) {
								$deliveyPrice[$busid] =$locacus->deliveryprice;
								$business->shipping = $locacus->deliveryprice;
								$business->minimum = $locacus->minpurchase;
								$business->searchtype = "delivery";
								unset($business->zones);
								//unset($business->location);
								unset($business->enabled);
								array_push($newbusiness,$business);
								break;
								}
							}
						}
				 }	
			}
			/* **************************Extra Delivery area************************************  */		
				if($businessopen[$busid] == false ) {
						                       unset($business->zones);
							                    $business->shipping = "pending";
												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
				}
						        }
					 }
						if(!$newbusiness){
							 unset($business->zones);
							                    $business->shipping = "pending";
												$business->searchtype = "no_delivery";
												array_push($newbusiness,$business);
						}

                     echo json_encode($newbusiness);

				}
		
		}
	 function getPostcode($location) {

		$loc=parse($location);
		$loc = parse($loc);
		$lat = $loc->latitud;
		$lng = $loc->longitud;


  $returnValue = NULL;
  $ch = curl_init();
  $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false";
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $result = curl_exec($ch);
  $json = json_decode($result, TRUE);

  if (isset($json['results'])) {
     foreach    ($json['results'] as $result) {
        foreach ($result['address_components'] as $address_component) {
          $types = $address_component['types'];
          if (in_array('postal_code', $types) && sizeof($types) == 1) {
             $returnValue = $address_component['short_name'];
          }
    }
     }
  }
  echo $returnValue;
}
 function getSearchPostcodemain($lat,$lng) {

		/*$loc=parse($location);
		$loc = parse($loc);
		$lat = $loc->latitud;
		$lng = $loc->longitud;
		*/

  $returnValue = NULL;
  $ch = curl_init();
  $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false";
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $result = curl_exec($ch);
  $json = json_decode($result, TRUE);

  if (isset($json['results'])) {
     foreach    ($json['results'] as $result) {
        foreach ($result['address_components'] as $address_component) {
          $types = $address_component['types'];
          if (in_array('postal_code', $types) && sizeof($types) == 1) {
             $returnValue = $address_component['short_name'];
          }
    }
     }
  }
  return $returnValue;
}
function distanceCalculator($lat1, $lon1, $lat2, $lon2, $unit) {

  $theta = $lon1 - $lon2;
  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
  $dist = acos($dist);
  $dist = rad2deg($dist);
  $miles = $dist * 60 * 1.1515;
  $unit = strtoupper($unit);

  if ($unit == "K") {
    return ($miles * 1.609344);
  } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
        return $miles;
      }
}

/**************************************************************** New function add(07/05/2014)*********************************************/
function allreviewDate($id)
	{
		$link = ConnectDB();
			if(isset($_GET['l']) && $_GET['l'] != '')
				$lang_file = GetLangFile($_GET['l']);
			else
				$lang_file = GetLangFile('en');

				include_once $lang_file;
		$allReviewData = array();
			pg_prepare($link,'sqlR1','SELECT * FROM w_review WHERE id_w_business=$1 ORDER BY id DESC');
			$result = pg_execute($link,'sqlR1',array($id));
			pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');

			while($rs = pg_fetch_array($result)) {
				unset($ReviewData);
				$ReviewData->orderid = $rs['id_order'];
				$ReviewData->quality = $rs['quality'];
				$ReviewData->delivery = $rs['delivery'];
				$ReviewData->dealer = $rs['dealer'];
				$ReviewData->package = $rs['package'];
				$ReviewData->pdate = date('d-m-Y',strtotime($rs['date']));
				if($rs['usr'] == "-1") {
				$ReviewData->user = $lang_resource['FRONT_MAIN_GUEST_USER'];
				}
				else {

				$results = pg_execute($link,'sqlR2',array($rs['usr']));
				$rec = pg_fetch_array($results);
				$ReviewData->user = $rec['name']." ".$rec['lastname']." ".$rec['lastname2'];

					}

				array_push($allReviewData,$ReviewData);


				}
		echo json_encode($allReviewData);
	}

	function allMenu($id)
	{
		$link = ConnectDB();
		$allMenuData = array();
			pg_prepare($link,'sqlR1','SELECT * FROM w_menus WHERE business=$1 and enabled=$2 ORDER BY id DESC');
			$result = pg_execute($link,'sqlR1',array($id,TRUE));
			//pg_prepare($link,'sqlR2','SELECT * FROM w_users WHERE id=$1');

			while($rs = pg_fetch_array($result)) {
				unset($menu);
				$schedule = parse($rs['schedule']);
				$menu->name = $rs['name'];
				$menu->days = $rs['days'];
				$openhr = ($schedule->opens->hour==0)?"00":$schedule->opens->hour;
				$openmm = ($schedule->opens->minute==0)?"00":$schedule->opens->minute;
				$closehr = ($schedule->closes->hour==0)?"00":$schedule->closes->hour;
				$closemm = ($schedule->closes->minute==0)?"00":$schedule->closes->minute;
				$menu->openclosetime = $openhr.':'.$openmm.'-'.$closehr.':'.$closemm;




				array_push($allMenuData,$menu);


				}
		echo json_encode($allMenuData);
	}
/**************************************************************** New function add(07/05/2014)*********************************************/
function FetchAllpanelCustom($val)
	{
	require('panel/config.php');
	$link = ConnectDB($CFG);
	pg_prepare($link,"ocs".$val,'SELECT * from w_footer WHERE  lower(type)=$1  AND  enabled=$2 ');
	$result = pg_execute($link,"ocs".$val,array(strtolower($val),"TRUE"));

	$categories = array();

	while($row = pg_fetch_array($result))
		{
		unset($category);
		$category->id = $row['id'];
		$category->pagename = $row['pagename'];
		$category->pageurl = $row['pageurl'];
		array_push($categories,$category);
		}
    pg_close($link);
  	return $categories;
	}

function FetchAllpanelCustomCMS($val)
	{
	require('panel/config.php');
	$link = ConnectDB($CFG);
	pg_prepare($link,"sqcus".$val,'SELECT * from w_footercms WHERE  lower(type)=$1  AND  enabled=$2 ');
	$result = pg_execute($link,"sqcus".$val,array(strtolower($val),"TRUE"));

	$categories = array();

	while($row = pg_fetch_array($result))
		{
		unset($category);
		$category->id = $row['id'];
		$category->pagename = $row['pagetitle'];
		$category->pageurl = $row['customurl'];
		array_push($categories,$category);
		}
    pg_close($link);
	return $categories;
	}

function FetchAllsettingsCustom()
       {
       require('panel/config.php');
       $link = ConnectDB($CFG);
       pg_prepare($link,'sql3','SELECT * from w_configs ');
       $result = pg_execute($link,'sql3',array());

       //$settings = array();

       while($row = pg_fetch_array($result))
               {

               $id = $row['id'];
               $name =  $row['name'];
               $setting[$name] = $row['value'];
               //array_push($settings,$setting);
               }

       return $setting;
       }
function FetchAllsettingsCustomMailchmp1()
       {
		   $test = require('panel/config.php');

       $link = ConnectDB($CFG);
	   pg_prepare($link,'sql3','SELECT * from w_configs ');
       $result = pg_execute($link,'sql3',array());

       //$settings = array();

       while($row = pg_fetch_array($result))
               {

               $id = $row['id'];
               $name =  $row['name'];
               $setting[$name] = $row['value'];
               //array_push($settings,$setting);
               }

       return $setting;
       }

 function FetchAllsettingsCustomMailchmp()
       {
		   $test = require('../config.php');

       $link = ConnectDB($CFG);
	   pg_prepare($link,'sql3','SELECT * from w_configs ');
       $result = pg_execute($link,'sql3',array());

       //$settings = array();

       while($row = pg_fetch_array($result))
               {

               $id = $row['id'];
               $name =  $row['name'];
               $setting[$name] = $row['value'];
               //array_push($settings,$setting);
               }

       return $setting;
       }
function FetchDiscountOffer($bid)
{
	
	
	$link = ConnectDB();
	
       pg_prepare($link,'sqltmfr','SELECT * FROM w_configs WHERE name = $1');
       $result1 = pg_execute($link,'sqltmfr',array('currency'));
		 $row1 = pg_fetch_array($result1);
      	$timeformat = $row1['value'];
		
		$discountOfferData = array();
			pg_prepare($link,'sqlR22','SELECT * FROM w_discountoffer WHERE business=$1 AND accept = $2');
			$result = pg_execute($link,'sqlR22',array($bid,TRUE));

			while($rs = pg_fetch_array($result)) {
				unset($menu);
				//$menu->discountype = ($rs['discountype']==1)?'Percentage':'Price';
				
				$menu->rate = ($rs['discountype']==1)?$rs['rate']."%":$timeformat." ".$rs['rate'];
				$menu->minshop = $rs['minshop'];
				$menu->startdate = $rs['startdate'];
				$menu->enddate = $rs['enddate'];
				$menu->validdays = $rs['validdays'];
				$menu->createdate = $rs['createdate'];
				$menu->discounttext = $rs['discounttext'];
				$menu->accept = $rs['accept'];
				$menu->business = $rs['business'];

				array_push($discountOfferData,$menu);
				}
		echo json_encode($discountOfferData);
		//echo $menu->rate;

}

//DRVIER + RESTURANT COFIRMATION
function driverConfirm($order_id , $confirm , $time , $driver_id ,$rest ,$user_mail ,$driver_mail ,$drivermanager_email ,$bus_mail)
{

			include('panel/config.php');
	        $link = ConnectDB($CFG);

			$rowMail1 = FetchAllsettingsCustomMailchmp1();

			//Fetch super admin mail
			 pg_prepare($link,'sql213','SELECT email from w_users WHERE level=$1');
		     $result213 = pg_execute($link,'sql213',array('0'));
			 $row213 = pg_fetch_array($result213);
			 $super_mail = $row213['email'];


			 //driver Manager mail
			 pg_prepare($link,'sql23','SELECT * from w_driver WHERE id=$1');
		   $result23 = pg_execute($link,'sql23',array($driver_id));
		   $row = pg_fetch_array($result23);

          $driver_grpid = $row['group_id'];

		  pg_prepare($link,'sql232','SELECT dm.email from w_drivermanager dm WHERE dm.id = (SELECT drivermanager_id FROM w_drivergroup WHERE id = $1)');
		 $result232 = pg_execute($link,'sql232',array($driver_grpid));
		 $row = pg_fetch_array($result232);
		 $drivermanager_email = $row['email'];


			$cancel_comments = "Cancel Order";
			$deliver_comments = "Order Delivered";


			//check whether driver or rest has cliked a button already
			 pg_prepare($link,'sql214','SELECT status,comment from w_orders WHERE id=$1');
		     $result214 = pg_execute($link,'sql214',array($order_id));
			 $row214 = pg_fetch_array($result214);


			if($rest!=1){//Driver Mail



			if($confirm == 't')
			{

			if($time == 15)
			$accept_comment = $lang_resource['ORDER_STATUS_DELIVERY_15_MINS'];
			if($time == 30)
			$accept_comment = $lang_resource['ORDER_STATUS_DELIVERY_30_MINS'];
			if($time == 45)
			$accept_comment = $lang_resource['ORDER_STATUS_DELIVERY_45_MINS'];
			if($time == 60)
			$accept_comment = $lang_resource['ORDER_STATUS_DELIVERY_60_MINS'];

			//rest comment
			$rest_comment =  $row214['comment'];

			 if($time!=1)
			 {
				 if(($row214['status']!=4) && ($row214['status']!=1) && ($row214['status']!=6) && ($row214['status']!=5))
			{ //check if no link is clicked

			pg_prepare($link,'sql44','UPDATE w_orders SET status = 4 ,driver_comment = $2 WHERE id = $1');
			$result = pg_execute($link,'sql44',array($order_id,$accept_comment));
			pg_prepare($link,'sql445','UPDATE w_driver SET delivering_orders = delivering_orders + 1 WHERE id = $1');
			$result = pg_execute($link,'sql445',array($driver_id));
			$status_txt = "Order on it’s way";

			}
			else
			{//link clicked

				?>
                <script>window.location.href='<?=$rowMail1['siteurl']?>/order-confirm.php?clickstat=<?=$row214['status']?>'</script>

                <?php
			exit;
			}

			 }
			 elseif($time==1)
			 {
			 if(($row214['status']!=1) && ($row214['status']!=6) && ($row214['status']!=5))
			{ //check if already delivered

		     pg_prepare($link,'sql44','UPDATE w_orders SET status = 1 ,driver_comment = $2 WHERE id = $1');
			 $result = pg_execute($link,'sql44',array($order_id,$deliver_comments));
			 pg_prepare($link,'sql445','UPDATE w_driver SET delivering_orders = delivering_orders - 1 WHERE id = $1');
			 $result = pg_execute($link,'sql445',array($driver_id));
			  $accept_comment = 	$lang_resource['ORDER_DELIVERED'];
			 $status_txt = $lang_resource['ORDER_DELIVERED'];

			}
			else
			{//link clicked

				?>
                <script>window.location.href='<?=$rowMail1['siteurl']?>/order-confirm.php?clickstat=<?=$row214['status']?>'</script>

                <?php
				exit;
			}
			 }

			$mail_body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>*|MC:SUBJECT|*</title>

<style type="text/css">
<!--
body {
	margin:0;
}
.ReadMsgBody { width: 100%;}
.ExternalClass {width: 100%;}
-->
</style>

</head>

<body>
    <table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
	   <tr><td height="10"></td></tr>
       <tr>
       <td height="79">
       <table width="568" border="0" cellspacing="0" cellpadding="0">
       <tr>
       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_top_m.png" border="0" /></td>
       <td height="50%" valign="middle">
       <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
       <tr>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
       </tr>
       </table>
       </td>
       </tr>
       </table>
       </td>
       </tr>
       <tr>
       <td><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>
       </tr>
       </table>

	<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
	<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
		    <tr>
          <td height="15"></td>
        </tr>
        <tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
           '.$lang_resource['FRONT_MAIN_EMAIL_ORDER_NO'].' :'.$order_id.'</span>
          </td>
        </tr>

		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
           '.$lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'].' :'.$status_txt.'</span>
          </td>
        </tr>

		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_DRIVER_MESSAGE'].' :'.$accept_comment.'</span>
          </td>
        </tr>

		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'].' :'.$rest_comment.'</span>
          </td>
        </tr>


		 </table>
    <tr>
    </table>
    </td></tr></table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
<tr>
<td width="110">
       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">'.$lang_resource['ORDERS_FOLLOW_US_ON'].' </span></td>
<td>
<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
  </tr>
</table>
</td>

<td>
<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/apple_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/android_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/mobile_m.png"   border="0" /></a></td>
  </tr>
</table>
 </td>
</tr>

</table>
</td></tr></table>

   <table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
   <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="border-bottom:5px solid #DDDDDD">
      <tr>
         <td width="381">
            <table width="285" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">
               <tr>
                  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_ABOUT_US'].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_CONTACT_US'].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_BLOG'].'</strong></span></td>
               </tr>
            </table>
         </td>
         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_foot_m.png" width="251" height="42" border="0" /></td>
     </tr>
   </table>
   </td></tr></table>


    <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
     <tr><td height="15"></td></tr>

     <tr>
     <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
        <span style="color:#6f6d6b;">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</span><br/>
        <span style="color:#6f6d6b;">'.$lang_resource['ORDERS_DONT_WANT_TO'].' </span>
        <a href="#u" style="text-decoration:underline;color:#6f6d6b;" target="_blank">'.$lang_resource['ORDERS_UNSUBSCRIPT'].'</a>
     </td>
     </tr>
    </table>



</body>
</html>';

//SendMail($mail_user,'Order status '.$order_id,array($user_mail));

require "class.phpmailer.php";
$mail1 = new PHPMailer();

$mail1->PluginDir = "";
			$mail1->Host = "localhost";
			$mail1->From = $row['email_from'];
			$mail1->FromName = $row['sitename'];
			$mail1->Subject =  "Order Status Message";


				$mail1->AddAddress($super_mail);
				$mail1->AddAddress($drivermanager_email);
				$mail1->AddAddress($bus_mail);
				$mail1->AddAddress($user_mail);

			$mail1->MsgHTML($mail_body);
			$mail1->IsHTML(true);
			$mail1->AltBody ="Order";
			$mail1->CharSet = 'UTF-8';
			$mail1->Send();


			}
			elseif($confirm == 'f')
			{

				if(($row214['status']!=4) && ($row214['status']!=1) && ($row214['status']!=6) && ($row214['status']!=5))
			{ //check if no link is clicked
			pg_prepare($link,'sql44','UPDATE w_orders SET status = 6 ,driver_comment = $2 WHERE id = $1');
			$result = pg_execute($link,'sql44',array($order_id,$cancel_comments));
			$status_txt = "Cancelled by Driver";

			$mail_body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>*|MC:SUBJECT|*</title>

<style type="text/css">
<!--
body {
	margin:0;
}
.ReadMsgBody { width: 100%;}
.ExternalClass {width: 100%;}
-->
</style>

</head>

<body>
    <table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
	   <tr><td height="10"></td></tr>
       <tr>
       <td height="79">
       <table width="568" border="0" cellspacing="0" cellpadding="0">
       <tr>
       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_top_m.png" border="0" /></td>
       <td height="50%" valign="middle">
       <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
       <tr>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
       </tr>
       </table>
       </td>
       </tr>
       </table>
       </td>
       </tr>
       <tr>
       <td><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>
       </tr>
       </table>

	<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
	<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
		    <tr>
          <td height="15"></td>
        </tr>
        <tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
           '.$lang_resource['FRONT_MAIN_EMAIL_ORDER_NO'].' :'.$order_id.'</span>
          </td>
        </tr>

		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'].' :'.$status_txt.'</span>
          </td>
        </tr>

		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_DRIVER_MESSAGE'].' :'.$accept_comment.'</span>
          </td>
        </tr>


		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'].' :'.$rest_comment.'</span>
          </td>
        </tr>

		 </table>
    <tr>
    </table>
    </td></tr></table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
<tr>
<td width="110">
       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">'.$lang_resource['ORDERS_FOLLOW_US_ON'].' </span></td>
<td>
<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
  </tr>
</table>
</td>

<td>
<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/apple_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/android_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/mobile_m.png"   border="0" /></a></td>
  </tr>
</table>
 </td>
</tr>

</table>
</td></tr></table>

   <table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
   <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="border-bottom:5px solid #DDDDDD">
      <tr>
         <td width="381">
            <table width="285" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">
               <tr>
                  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FOOTER_ABOUT_US'].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FOOTER_CONTACT_US'].'</strong></span></td>

               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['FOOTER_BLOG'].'</strong></span></td>
               </tr>
            </table>
         </td>
         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_foot_m.png" width="251" height="42" border="0" /></td>
     </tr>
   </table>
   </td></tr></table>


    <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
     <tr><td height="15"></td></tr>

     <tr>
     <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
        <span style="color:#6f6d6b;">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</span><br/>
        <span style="color:#6f6d6b;">'.$lang_resource['ORDERS_DONT_WANT_TO'].' </span>
        <a href="#u" style="text-decoration:underline;color:#6f6d6b;" target="_blank">'.$lang_resource['ORDERS_UNSUBSCRIPT'].'</a>
     </td>
     </tr>
    </table>



</body>
</html>';

//SendMail($mail_user,'Order status '.$order_id,array($user_mail));

require "class.phpmailer.php";
$mail1 = new PHPMailer();

$mail1->PluginDir = "";
			$mail1->Host = "localhost";
			$mail1->From = $row['email_from'];
			$mail1->FromName = $row['sitename'];
			$mail1->Subject =  "Order Status Message";


				$mail1->AddAddress($super_mail);
				$mail1->AddAddress($drivermanager_email);
				$mail1->AddAddress($bus_mail);
				$mail1->AddAddress($user_mail);

			$mail1->MsgHTML($mail_body);
			$mail1->IsHTML(true);
			$mail1->AltBody ="Order";
			$mail1->CharSet = 'UTF-8';
			$mail1->Send();



			}
			else
			{
				//cancel link clicked

				?>
                <script>window.location.href='<?=$rowEmail1['siteurl'];?>order-confirm.php?clickstat=<?=$row214['status']?>'</script>

                <?php

			}

			}




			}
			elseif($rest==1)
			{//Restaurant Mail

				if($confirm == 't')
			{

			if($time == 15)
			$accept_comment = $lang_resource['ORDER_STATUS_ESTIMATE_15_MINS'];
			if($time == 30)
			$accept_comment = $lang_resource['ORDER_STATUS_ESTIMATE_30_MINS'];
			if($time == 45)
			$accept_comment = $lang_resource['ORDER_STATUS_ESTIMATE_45_MINS'];
			if($time == 60)
			$accept_comment = $lang_resource['ORDER_STATUS_ESTIMATE_60_MINS'];


			pg_prepare($link,'sql44','UPDATE w_orders SET status = 3 ,comment = $2 WHERE id = $1');
			$result = pg_execute($link,'sql44',array($order_id,$accept_comment));


			$mail_driver = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>*|MC:SUBJECT|*</title>

<style type="text/css">
<!--
body {
	margin:0;
}
.ReadMsgBody { width: 100%;}
.ExternalClass {width: 100%;}
-->
</style>

</head>

<body>
    <table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
	   <tr><td height="10"></td></tr>
       <tr>
       <td height="79">
       <table width="568" border="0" cellspacing="0" cellpadding="0">
       <tr>
       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_top_m.png" border="0" /></td>
       <td height="50%" valign="middle">
       <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
       <tr>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
       </tr>
       </table>
       </td>
       </tr>
       </table>
       </td>
       </tr>
       <tr>
       <td><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>
       </tr>
       </table>

	<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
	<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
		    <tr>
          <td height="15"></td>
        </tr>
        <tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_ORDER'].' '.$order_id.'</span>
          </td>
        </tr>

		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'].' :'.$accept_comment.'</span>
          </td>
        </tr>

		 </table>
    <tr>
    </table>
    </td></tr></table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
<tr>
<td width="110">
       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">'.$lang_resource['ORDERS_FOLLOW_US_ON'].' </span></td>
<td>
<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
  </tr>
</table>
</td>

<td>
<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/apple_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/android_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/mobile_m.png"   border="0" /></a></td>
  </tr>
</table>
 </td>
</tr>
<tr>
    <td colspan="4" height="1" bgcolor="#C0C5C6"></td>
</tr>
<tr>
    <td colspan="4" height="1" bgcolor="#fffff"></td>
</tr>
</table>
</td></tr></table>

   <table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
   <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="border-bottom:5px solid #DDDDDD">
      <tr>
         <td width="381">
            <table width="285" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">
               <tr>
                  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_ABOUT_US'].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_CONTACT_US'].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_BLOG'].'</strong></span></td>
               </tr>
            </table>
         </td>
         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_foot_m.png" width="251" height="42" border="0" /></td>
     </tr>
   </table>
   </td></tr></table>


    <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
     <tr><td height="15"></td></tr>

     <tr>
     <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
        <span style="color:#6f6d6b;">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</span><br/>
        <span style="color:#6f6d6b;">'.$lang_resource['ORDERS_DONT_WANT_TO'].' </span>
        <a href="#u" style="text-decoration:underline;color:#6f6d6b;" target="_blank">'.$lang_resource['ORDERS_UNSUBSCRIPT'].'</a>
     </td>
     </tr>
    </table>



</body>
</html>';

		require "class.phpmailer.php";
$mail1 = new PHPMailer();

$mail1->PluginDir = "";
			$mail1->Host = "localhost";
			$mail1->From = $row['email_from'];
			$mail1->FromName = $row['sitename'];
			$mail1->Subject =  "Order Status Message";


				$mail1->AddAddress($super_mail);
				$mail1->AddAddress($drivermanager_email);
				$mail1->AddAddress($driver_mail);
				$mail1->AddAddress($user_mail);

			$mail1->MsgHTML($mail_driver);
			$mail1->IsHTML(true);
			$mail1->AltBody ="Order";
			$mail1->CharSet = 'UTF-8';
			$mail1->Send();



			}
			elseif($confirm == 'f')
			{

		    if(($row214['status']!=5) && ($row214['status']!=1))
			{//check if order is already cancelled or delivered

			pg_prepare($link,'sql44','UPDATE w_orders SET status = 5 WHERE id = $1');
			$result = pg_execute($link,'sql44',array($order_id));
			$accept_comment = "Cancelled by retaurant";

			$mail_driver = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>*|MC:SUBJECT|*</title>

<style type="text/css">
<!--
body {
	margin:0;
}
.ReadMsgBody { width: 100%;}
.ExternalClass {width: 100%;}
-->
</style>

</head>

<body>
    <table width="568" border="0" align="center" cellpadding="0" cellspacing="0">
	   <tr><td height="10"></td></tr>
       <tr>
       <td height="79">
       <table width="568" border="0" cellspacing="0" cellpadding="0">
       <tr>
       <td width="50%"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_top_m.png" border="0" /></td>
       <td height="50%" valign="middle">
       <table width="130" border="0" align="right" cellpadding="5" cellspacing="0">
       <tr>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
       <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
       </tr>
       </table>
       </td>
       </tr>
       </table>
       </td>
       </tr>
       <tr>
       <td><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/top_m.png" width="570px" style="display:block;" align="center" border="0" /></td>
       </tr>
       </table>

	<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
	<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#F7F7F7">
		    <tr>
          <td height="15"></td>
        </tr>
        <tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_ORDER'].' '.$order_id.'</span>
          </td>
        </tr>

		<tr>
          <td align="center" style="padding:8px 50px;">
          <span style="font-family:Arial,Georgia,sans-serif;font-size:18px;color:#df2226;line-height:22px;">
          '.$lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'].' :'.$accept_comment.'</span>
          </td>
        </tr>

		 </table>
    <tr>
    </table>
    </td></tr></table>

<table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
<table height="50" width="570" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#E4E9EA">
<tr>
<td width="110">
       <span style="font-family:georgia,verdana,serif;font-style:italic;font-size:16px;color:#df2226; padding-left: 4px;">'.$lang_resource['ORDERS_FOLLOW_US_ON'].' </span></td>
<td>
<table width="130" border="0" align="left" cellpadding="5" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/fb_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/twitter_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/rss_m.png"  border="0" /></a></td>
  </tr>
</table>
</td>

<td>
<table width="130" border="0" align="right" cellpadding="8" cellspacing="0">
  <tr>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/apple_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/android_m.png"  border="0" /></a></td>
    <td><a href="#" target="_blank"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/mobile_m.png"   border="0" /></a></td>
  </tr>
</table>
 </td>
</tr>

</table>
</td></tr></table>

   <table width="570" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#DDDDDD"><tr><td>
   <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff" style="border-bottom:5px solid #DDDDDD">
      <tr>
         <td width="381">
            <table width="285" border="0" align="center" cellpadding="1" cellspacing="0" style="padding-left: 14px;">
               <tr>
                  <td width="110" height="20"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_ABOUT_US'].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_CONTACT_US'].'</strong></span></td>
               </tr>
               <tr>
                  <td height="17"><span style="font-family:arial,verdana,serif;font-size:11px;color:#df2226;"><strong>'.$lang_resource['ORDERS_BLOG'].'</strong></span></td>
               </tr>
            </table>
         </td>
         <td style="padding-right:16px;"><img src="http://'.$_SERVER["HTTP_HOST"].'/panel/theme/logo_foot_m.png" width="251" height="42" border="0" /></td>
     </tr>
   </table>
   </td></tr></table>


    <table width="560" height="100" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#ffffff">
     <tr><td height="15"></td></tr>

     <tr>
     <td height="80" align="center" valign="top" style="font-family:Arial,Georgia,sans-serif;font-size:11px;line-height:22px;">
        <span style="color:#6f6d6b;">'.$lang_resource['FRONT_MAIN_COPYRIGHT'].'</span><br/>
        <span style="color:#6f6d6b;">'.$lang_resource['ORDERS_DONT_WANT_TO'].' </span>
        <a href="#u" style="text-decoration:underline;color:#6f6d6b;" target="_blank">'.$lang_resource['ORDERS_UNSUBSCRIPT'].'</a>
     </td>
     </tr>
    </table>



</body>
</html>';

		require "class.phpmailer.php";
$mail1 = new PHPMailer();

$mail1->PluginDir = "";
			$mail1->Host = "localhost";
			$mail1->From = $row['email_from'];
			$mail1->FromName = $row['sitename'];
			$mail1->Subject =  "Order Status Message";


				$mail1->AddAddress($super_mail);
				$mail1->AddAddress($drivermanager_email);
				$mail1->AddAddress($driver_mail);
				$mail1->AddAddress($user_mail);

			$mail1->MsgHTML($mail_driver);
			$mail1->IsHTML(true);
			$mail1->AltBody ="Order";
			$mail1->CharSet = 'UTF-8';
			$mail1->Send();
			}
			else
			{

				?>
                <script>window.location.href='<?=$rowMail1['siteurl']?>/order-confirm.php?clickstat=<?=$row214['status']?>'</script>


                <?php
			}



			}

			}


			$base_url = $rowMail1['siteurl'];

			if($result)
			{
			?>
            <script>window.location.href=<?=$base_url?></script>
            <?php

            }

}



/* ORDER FETCH */
function FetchOrder($id){
	$link = ConnectDB();
	$orderData = array();

	pg_prepare($link,'sqlo','SELECT * FROM w_orders WHERE id=$1');
	$result = pg_execute($link,'sqlo',array($id));

	$row = pg_fetch_array($result);

	unset($orderc);

	$data=$row['data'];
	$data=json_decode($data);

	$orderc->id = $data->business[0]->id;
	$orderc->name = $data->business[0]->name;
	$orderc->tel = $data->business[0]->tel;

	//array_push($orderData,$orderc);

	echo json_encode($orderc);
}


//Favorite added on 10.10.14
function AddToFav($bid,$bname)
{
	 $link = ConnectDB();

	//echo $_SESSION['user']->id."-".$country."-".$city."-".$cityname."-".$address;exit;
	pg_prepare($link,'sql3',"SELECT * FROM w_favbus WHERE bid = $1 AND usr=$2");
	$result3 = pg_execute($link,'sql3',array($bid,$_SESSION['user']->id));

	if(pg_num_rows($result3) == 0)
	{


	pg_prepare($link,'sql2',"SELECT street FROM w_business WHERE id = $1");
	$result2 = pg_execute($link,'sql2',array($bid));
	$row2 = pg_fetch_array($result2);

	$badd = $row2['street'];

	pg_prepare($link,'sql',"SELECT nextval('w_favbus_id_seq') as key");
	$result = pg_execute($link,'sql',array());

	if (pg_num_rows($result)==1)
		while($row = pg_fetch_array($result))
			$id2 = $row['key'];
	pg_prepare($link,'sqlur22','INSERT INTO w_favbus(id,bid,badd,usr,bname) VALUES ($1,$2,$3,$4,$5)');

	if(pg_execute($link,'sqlur22',array($id2,$bid,$badd,$_SESSION['user']->id,$bname)))
	echo "Added successfully";
	else
	echo "Failed to add";

	}
	else
	{
		echo "Already added";
	}



}

function Getfavorite($bid)
{
	 $link = ConnectDB();
	 $bid = array();

	pg_prepare($link,'sql99',"SELECT bid FROM w_favbus WHERE usr=$1");
	$result3 = pg_execute($link,'sql99',array($_SESSION['user']->id));



	while($rs = pg_fetch_array($result3))
	{

		 $bid[] = $rs['bid'];


	}


	echo json_encode($bid);

}


function FetchFav($search_txt)
{

	$link = ConnectDB();
		$allMenuData = array();
		//echo $search_txt;exit;

		if(isset($search_txt))
		{
		// echo  $search_txt;exit;
	   $search_txt = strtolower($search_txt);


		$search_txt = "'%".$search_txt."%'";
		//echo 'SELECT * FROM w_favbus WHERE usr=$1 AND bname like '.$search_txt;exit;
	   	pg_prepare($link,'sqlR1','SELECT * FROM w_favbus WHERE usr=$1 AND lower(bname) like '.$search_txt);


		}
		else
		pg_prepare($link,'sqlR1','SELECT * FROM w_favbus WHERE usr=$1');

			$result = pg_execute($link,'sqlR1',array($_SESSION['user']->id));

           pg_prepare($link,'sqlFCS','SELECT * FROM w_business WHERE id=$1');

			while($rs = pg_fetch_array($result)) {
				unset($menu);

			    $menu->id = $rs['id'];
				$menu->bname = $rs['bname'];
				$menu->badd = $rs['badd'];

				$result2 = pg_execute($link,'sqlFCS',array($rs['bid']));
				$rs2 = pg_fetch_array($result2);
				$menu->bcslug = $rs2['customslug'];

				array_push($allMenuData,$menu);


				}
		echo json_encode($allMenuData);

}




function DelFav($data)
{
	$link = ConnectDB();
	$data = parse($data);

	for($i=0;$i<count($data);$i++) {
	$idw = trim($data[$i]);
	pg_prepare($link,'sql'.$idw,'DELETE FROM w_favbus WHERE id=$1');
	pg_execute($link,'sql'.$idw,array($idw));
		/*foreach ($data as $id)
		{
			echo $id;
		//
		}*/
	}
//pg_close($link);



}
//Favorite end


/*******************************************************************Reservation **************************************************************************/

function GetAllRestDataFront()
{
	$link = ConnectDB();

	pg_prepare($link,'sql31','SELECT * from w_business');
	$result = pg_execute($link,'sql31',array());

	$returants = array();
	    $returant->id = "-1";
		$returant->name = "All";
		array_push($returants,$returant);

	pg_prepare($link,'sqlSettingsFront','SELECT * FROM w_frontsettings');
	$result1 = pg_execute($link,'sqlSettingsFront',array());
	$row1 = pg_fetch_array($result1);
	$resturant_name = $row1['restaurant'];
	$resturant_name =json_decode($resturant_name);

	while($row = pg_fetch_array($result))
		{
		if (in_array(-1, $resturant_name) || in_array($row['id'],$resturant_name)){
		unset($returant);
		$returant->id = $row['id'];
		$returant->name = $row['name'];
		array_push($returants,$returant);
		}
		}

	return $returants;
}

function FetchAllRestDataFront()
{
	echo json_encode(GetAllRestDataFront());
}
function GetAllCuisineDataFront()
{
	$link = ConnectDB();

	pg_prepare($link,'sql31','SELECT * from w_categories');
	$result = pg_execute($link,'sql31',array());

	$cuisines = array();
	    $cuisine->id = "-1";
		$cuisine->name = "All";
		array_push($cuisines,$cuisine);

	while($row = pg_fetch_array($result))
		{
		unset($cuisine);
		$cuisine->id = $row['id'];
		$cuisine->name = $row['name'];
		array_push($cuisines,$cuisine);
		}

	return $cuisines;
}

function FetchAllCuisineDataFront()
{
	echo json_encode(GetAllCuisineDataFront());
}

function SubscribeEmail($email)
{

require('../config.php');
require('../../languages/lang.en.php');
$record = FetchAllsettingsCustomMailchmp();


require_once('mcapi/MCAPI.class.php');
// grab an API Key from http://admin.mailchimp.com/account/api/
$api = new MCAPI($record['mailchamp_api']);

// grab your List's Unique Id by going to http://admin.mailchimp.com/lists/
// Click the "settings" link for the list - the Unique Id is at the bottom of that page.
$list_id = $record['mailchamp_listid'];

// Merge variables are the names of all of the fields your mailing list accepts
// Ex: first name is by default FNAME
// You can define the names of each merge variable in Lists > click the desired list > list settings > Merge tags for personalization
// Pass merge values to the API in an array as follows
$mergeVars = array('FNAME'=>'test');

if($api->listSubscribe($list_id, $email, $mergeVars) === true) {
// It worked!
//return 'Success! Check your email to confirm sign up.';
//echo 'Success! Check your email to confirm sign up.';
echo $lang_resource['FRONT_MAIN_EMAIL_SIGNUP_CONFIRM_MESSAGE'];
} //else{
// An error ocurred, return error message
//return 'Error: ' . $api->errorMessage;
//}
else
{
//echo 'Error: ' . $api->errorMessage;
echo $lang_resource['FRONT_MAIN_EMAIL_MAIL_ALREADY_REGISTERED'];

}
}

/*******************************************************************Reservation **************************************************************************/



/************************************************ CMS FETCH *****************************************************/


function CmsContent($id){

	require('../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');



	pg_prepare($link,'sql3','SELECT * FROM w_footercms WHERE id = $1');
    $result = pg_execute($link,'sql3',array($id));

    $row = pg_fetch_array($result);

	$cms->pageheading = $row['pageheading'];
	$cms->pagecontent = $row['pagecontent'];

    echo json_encode($cms);
}

 function approvdeliveryArea_main($servicearea,$distance,$maxallow ) {

	//echo $servicearea;
	$i=0;
	$servicearea = json_decode($servicearea);
	//print_r($servicearea);
	foreach($servicearea as $service) {
        unset($area);
		unset($final);
		$area = parse($service->area);
		//print_r($area);
		$f = $area->from;
		$t = $area->to;
		//echo $distance = floatval($distance);
		$p = $area->price;
		if($i == 0) {
		if($distance>=$f && $distance<=$t)
				{

					$final->accept = true;
					$final->delprice = $p;
					$final->maxallow = $maxallow;
					return $final;

				}
		}
		else {
				if($distance>=$f && $distance<=$t)
				{


					$final->accept = true;
					$final->delprice = $p;
					$final->maxallow = $maxallow;
					return $final;

				}


			}

		$i++;
   }
}
  function ReorderSend($id) {
	  $link = ConnectDB();

	     pg_prepare($link,'sqlR1','SELECT data from w_orders WHERE id=$1');
		$result = pg_execute($link,'sqlR1',array($id));
		if (pg_num_rows($result)==1)
		{
			$fetch_data= pg_fetch_array($result);
			$data= $fetch_data['data'];
		}

	  if($data != " ")
	  {
		 
		   PlaceOrder($data,"",true);
		  
		}
	

	  }
	  function get_lat_long($address){

    $address = str_replace(" ", "+", $address);

    $json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=$region");
    $json = json_decode($json);

    $lat = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
    $long = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
    $record['lat'] = $lat;
	$record['long'] = $long;
	
	
    return $record;
}
function CountReviewmain($id)
	 {
		 require('panel/config.php');
	     $link = ConnectDB($CFG);
		 
		
		  $record = new stdClass();
		  $query_present = 'SELECT * FROM w_orders WHERE id=$1';
		  pg_prepare($link,'sqlOD2',$query_present);
		  $result4 = pg_execute($link,'sqlOD2',array($id));
		  $recordNo = pg_num_rows($result4);
		  
		  if($recordNo > 0) { 
		  
		  $query = 'SELECT *  FROM w_review WHERE id_order=$1';
		  pg_prepare($link,'sqlOD1',$query);
		  $result3 = pg_execute($link,'sqlOD1',array($id));
		  $row = pg_num_rows($result3);
		     if($row > 0 ) {
				
				$record->orderExist= "true";
				$record->orderDublicate= "false";
				
				pg_close($link);
				return $record;
				 }
			else {
				$record->orderExist= "true";
				$record->orderDublicate= "true";
				
				pg_close($link);
				return  $record;
				
				
				}	 
				 
		  }
		  else {
			  $record->orderExist= "false";
			  $record->orderDublicate= "false";
			 
			  pg_close($link);
			  return $record;
			  
			  
			  }
    
   
		 
	 }
	 	function checkDeliveryStatus($bid,$link) {
		
		 		$bquery ="SELECT * FROM w_menus WHERE business=$1 and enabled=$2"; 
                pg_prepare($link,'sqlb111'.$bid,$bquery);
                $results = pg_execute($link,'sqlb111'.$bid,array($bid,'TRUE'));
				$status->delivery = "false";
				while($rs = pg_fetch_array($results)) {
					if($rs['delivery'] == "t") {
					return $status->delivery = "true";
					exit;
					}
					
					
				}
				return $status->delivery;
				
	}
	function checkPickupStatus($bid,$link) {
		
		 		$bquery ="SELECT * FROM w_menus WHERE business=$1 and enabled=$2"; 
                pg_prepare($link,'sqlb2'.$bid,$bquery);
                $results = pg_execute($link,'sqlb2'.$bid,array($bid,'TRUE'));
				$status->pickup = "false";
				while($rs = pg_fetch_array($results)) {
					if($rs['pickup'] == "t") {
					return $status->pickup = "true";
					exit;
					}
					
					
				}
				return $status->pickup;
		
	}
	function FindOpenDay($schedule,$did,$hour,$min) {
	
	include_once "../../languages/lang.en.php";
	
	$ndays = array('',$lang_resource['DAY1'],$lang_resource['DAY2'],$lang_resource['DAY3'],$lang_resource['DAY4'],$lang_resource['DAY5'],$lang_resource['DAY6'],$lang_resource['DAY7']);
	
	$link = ConnectDB();
	
	$strtotime = strtotime($hour. ':' . $min);
	//Time selection settings. 
	$link = ConnectDB();
	 pg_query($link, "DEALLOCATE ALL");
	pg_prepare($link,'sqltmfrm',"SELECT * from w_configs WHERE name='timeformat' ");
	$resulttimeformat = pg_execute($link,'sqltmfrm',array());
	$rowtimeformat = pg_fetch_array($resulttimeformat);
	$time_format=$rowtimeformat['value'];
	if($time_format==12){
			$dt1=date('h:i a',$strtotime);
		}else{
			$dt1=date('H:i ',$strtotime);
		}
	
	return $lang_resource['FRONT_BULK_UNTIL']." ".$ndays[$did]." ".$dt1;
	}
	
	function UpdateResultData($filters)
	{
		$link = ConnectDB();	
		$order1 = parse($filters);
	    $address = $order1->address;
		
		$address = strtolower(str_replace(" ","",$address));
		$res='NO';
			 pg_prepare($link,'sqlup','UPDATE w_search_statistic SET result=$1 where address=$2');
			pg_execute($link,'sqlup',array($res,$address));
		
	}
?>
