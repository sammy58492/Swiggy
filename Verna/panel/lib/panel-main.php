<?php
session_start();
require_once('../login/common.php');
require_authentication();
//bringg
$ConfigData = FetchConfigData();
define("BRINGG_COMPANY_ID", $ConfigData['BRINGG_COMPANY_ID']);
define("BRINGG_ACCESS_TOKEN", $ConfigData['BRINGG_ACCESS_TOKEN']);
define("BRINGG_SECRET_KEY", $ConfigData['BRINGG_SECRET_KEY']);
//
/***********************************************************DB CONNECT**************************************************************/
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

function GetDecimalPoint($a){	
	
	$nuber_decimal_point = number_format($a,$_SESSION['decimal_value']);
	return $nuber_decimal_point;
	
}
/********************************************************ALLOW ONLY ADMINS FUNC********************************************************************/

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
function FetchConfigData($CFG = 'empty')
{
	$link = ConnectDB($CFG);
	 pg_prepare($link,'sqlc3','SELECT * from w_configs ');
       $result = pg_execute($link,'sqlc3',array());

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
function SuperAdminsOnly()
	{
	if ($_SESSION['user']->level>0)
		die();
	}

/***************************************************GET USER LEVEL TEXT BY LEVEL*************************/

function GetLevelText($level)
	{
	include_once "../../languages/lang.en.php";
	

	switch($level)
			{
			case 0:
				$levelname= $lang_resource['CONTROL_PANEL_USER_SUPER_ADMIN'];
			break;
			case 1:
				$levelname=  $lang_resource['CONTROL_PANEL_USER_ADMIN'];
			break;
			case 2:
				$levelname=  $lang_resource['CONTROL_PANEL_USER_RESTAURATEUR'];
			break;
			case 3:
				$levelname=$lang_resource['CONTROL_PANEL_USER_CUSTOMER'];
			break;
			case 4:
				$levelname=  $lang_resource['CONTROL_PANEL_USER_DRIVER'];
			break;
			case 5:
				$levelname=  $lang_resource['CONTROL_PANEL_USER_DRIVERMANAGER'];
			break;
			}
			
	return $levelname;
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
	require "class.phpmailer.php";
	$mail = new PHPMailer();
    $mail->PluginDir = "";
    $mail->Host = "localhost";
	//$mail->From = "orders@oos.localhost";
	$row = FetchAllsettingsCustomMailchmp1();
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
        require('../config.php');
       $link = ConnectDB($CFG);
       pg_prepare($link,'sql3','SELECT * from w_configs');
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

?>
