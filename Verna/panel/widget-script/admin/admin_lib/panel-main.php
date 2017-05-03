<?php
session_start();
require_once('../../../../admin/login/common.php');
require_authentication();
/***********************************************************DB CONNECT**************************************************************/
function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('../../../config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
	}

/********************************************************ALLOW ONLY ADMINS FUNC********************************************************************/
 global $lang_resource;
 
 function GetDecimalPoint($a){	
	
	$nuber_decimal_point = number_format($a,$_SESSION['decimal_value']);
	return $nuber_decimal_point;
	
}
 
function GetLangFile()
{
	
	//$lang_file = 'lang.'.$lang.'.php';
	//return $_SERVER['DOCUMENT_ROOT'].'/languages/'.$lang_file;
	$link = ConnectDB();
	if(!isset($_SESSION['admin_lang']) || $_SESSION['admin_lang'] ==''){
    pg_prepare($link,'sqllangfetch','SELECT * FROM w_lang_setting WHERE enabled=$1 and opdefault=1');
    $result1 = pg_execute($link,'sqllangfetch',array('TRUE'));
    $row1 = pg_fetch_array($result1);
    $_SESSION['admin_lang'] = $row1['id'];
	}


	pg_prepare($link,'sqlfetchlang','SELECT * from w_lang_admin');
    $result = pg_execute($link,'sqlfetchlang',array());
 
	  while($row = pg_fetch_array($result)){
		 
		$lang_resource[$row['lang_key']] = $row['langtext_'.$_SESSION['admin_lang']];    
	  }
	  return $lang_resource;
	  pg_close($link);
}

function ProvidersOnly()
	{
	if ($_SESSION['user']->level>2)
		die();
	}


function AdminsOnly()
	{
	if ($_SESSION['user']->level>1)
		die();
	}

function SuperAdminsOnly()
	{
	if ($_SESSION['user']->level>0)
		die();
	}

/***************************************************GET USER LEVEL TEXT BY LEVEL*************************/

function GetLevelText($level)
	{
	switch($level)
			{
			case 0:
				return 'Super admin';
			break;
			case 1:
				return 'Administrator';
			break;
			case 2:
				return 'Business owner';
			break;
			case 3:
				return 'Client';
			break;
			}

	return '';
	}


function GetAdTypeText($level)
	{
	switch($level)
			{
			case 0:
				return 'Double';
			break;
			case 1:
				return 'Unique';
			break;
			}

	return '';
	}

function RemoveDir($dir)
	{
    foreach(glob($dir . '/*') as $file)
    	{
        if(is_dir($file))
            RemoveDir($file);
        	else
        	unlink($file);
    	}
    rmdir($dir);
	}

function InsertQuery($table,$fields,$CFG = 'empty')
	{
	//get the id last secuence, with this we will get the next id seq and take it (id_sec will incriment with this query)
	$link = ConnectDB($CFG);
	$id = -1;
	
	$script_column = columnExistpanel($link,$table,'scriptid');
	
	
	
	if($script_column['column_name'] != '' ) {
		
			//$fields->fields->scriptid = object();
			$fields->scriptid->value= $_SESSION['scriptid'];
			}

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

	$query .= ') values ($1';

	for ($i=0;$i<$count;$i++)
		$query .= ',$' . ($i+2);

	 $query .= ')';
	 
	

	

	pg_prepare($link,'sql2',$query);
	$result = pg_execute($link,'sql2',$values);
	pg_close($link);
	return $id;
	}


function UpdateQuery($table,$fields,$id,$CFG = 'empty')
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

			if ($field->value=='realnull')//if this means we need to really save it as null
				array_push($values,null);
				else
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


function SendMail($msg,$subject,$addresses)
	{
	
	$CFG = 'empty';	
	$link = ConnectDB($CFG);
	////////////////// FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	pg_prepare($link,'sqlmand1','SELECT * from w_configs WHERE name=$1');
	$resp1 = pg_execute($link,'sqlmand1',array('mandrillsettings'));
	$rowsp1 = pg_fetch_array($resp1);
	
	pg_prepare($link,'sqlmand2','SELECT * from w_configs WHERE name=$1');
	$resp2 = pg_execute($link,'sqlmand2',array('mandrillhost'));
	$rowsp2 = pg_fetch_array($resp2);
	
	pg_prepare($link,'sqlmand3','SELECT * from w_configs WHERE name=$1');
	$resp3 = pg_execute($link,'sqlmand3',array('mandrill_port'));
	$rowsp3 = pg_fetch_array($resp3);
	
	pg_prepare($link,'sqlmand4','SELECT * from w_configs WHERE name=$1');
	$resp4 = pg_execute($link,'sqlmand4',array('mandrillsmtp'));
	$rowsp4 = pg_fetch_array($resp4);
	
	pg_prepare($link,'sqlmand5','SELECT * from w_configs WHERE name=$1');
	$resp5 = pg_execute($link,'sqlmand5',array('mandrillmtp'));
	$rowsp5 = pg_fetch_array($resp5);

//////////////////END FETCH mandrillsettings, mandrillhost, mandrill_port, mandrill_smtp_username, , mandrill_smtp_password////////////////////////
	
	if($rowsp1['value']=="1")   // if mandrillsettings is select  "YES" on backend
	{
		include_once "lib/swift_required.php";
				
				foreach ($addresses as $address) {
				$mailer[$address]=$address;
				}

				$subject = $subject;
				$from = array($row['email_from'] =>$row['sitename']);
				$to = $mailer;
				
				$text = "Order placed on Ordering Online System";
				$html = $msg;
				
				$transport = Swift_SmtpTransport::newInstance($rowsp2['value'], $rowsp3['value']);
				$transport->setUsername($rowsp4['value']);
				$transport->setPassword($rowsp5['value']);
				$swift = Swift_Mailer::newInstance($transport);
				
				$message = new Swift_Message($subject);
			
				$message->setFrom($from);
				$message->setBody($html, 'text/html');
				$message->setTo($to);
				$message->addPart($text, 'text/plain');
				
				if ($recipients = $swift->send($message, $failures))
				{
				 //echo 'Message successfully sent!';
				 $success = 1;
				} else {
				 //echo "There was an error:\n";
				 //print_r($failures);
				 $success = 1;
				}
	}
	else{	
	require "class.phpmailer.php";
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
    $mail->AltBody ="Order placed on Ordering Online System";
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
	}
	pg_close($link);
   	if(!$success)
		return false;
		else
		return true;
	
	}


function stringify($obj)
	{
	return json_encode($obj);
	}


function parse($str)
	{
	//return json_decode($str);//php 5.1
	return json_decode(stripslashes($str));//php 5.2 and forward
	}

function FetchAllsettingsCustomMailchmp1()
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
	   
function columnExistpanel($link,$tablename,$columnname) {
pg_prepare($link,'sqlADDCOLs'.$tablename.$columnname,"SELECT column_name  FROM information_schema.columns WHERE table_name=$1 and column_name=$2");
    $chk_record = pg_execute($link,'sqlADDCOLs'.$tablename.$columnname,array($tablename,$columnname));
	$fetch_record =  pg_fetch_array($chk_record);
	return $fetch_record;
	}		   
?>
