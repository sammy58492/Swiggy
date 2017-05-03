<?php 
session_start();

function sociallogin($data)
	{
	$_SESSION['whereami'] = '';
	require("../lib/front-main.php");
	require("../config.php");
	require_once("../../languages/lang.en.php");

	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	
	if(!$link)
		die($lang_resource['AUTHENTICATE_ERROR_PLEASE_TRY_AGAIN']);

	$data = json_decode(stripslashes($data));
	switch ($data->type)
		{
		case 'fb':
			$type = 'fb';
		break;
		case 'tw':
			$type = 'tw';
		break;
		default:
			die();
		break;
		}

	//check if the social id exists in our database..
	pg_prepare($link,'sql1','SELECT * FROM w_users WHERE '.$type.'id=$1');
	$result = pg_execute($link,'sql1',array($data->id));
	$rcount = pg_num_rows($result);
	if ($rcount==0)//if we dont have the user on our database with the social id, check if we have him with by the email he uses on social...
		{
		//echo 'we dont have the social id in our db';
		//search for the social email on our db
		if ($type=='tw')//twitter doesnt gives us access to the email
			{
			$user = createsocialuser($link,$data,$type,$CFG);
			}
			else
			{
			pg_prepare($link,'sql2','SELECT * FROM w_users WHERE email=$1');
			$result2 = pg_execute($link,'sql2',array($data->email));
			$rcount2 = pg_num_rows($result2);
			if ($rcount2==0)
				{
				//echo 'we dont have the social email on our db';
				//if we dont have any info about the user... create it...
				$user = createsocialuser($link,$data,$type,$CFG);
				}
				else
				if ($rcount2==1)
					{
					//echo 'we have the social email on our db';
					$user = catchuserinfo($result2);				
					}
			}
		}
		else
		{
		//echo 'we have the fb id in our db';
		$user = catchuserinfo($result);
		}

	if ($user!=null)
		{
		if ($user->enabled=='f')
			die('suspended');
		$_SESSION['auth'] = "yes";
		$_SESSION['user'] = $user;
		echo json_encode($user);
		}
		else
		die($lang_resource['AUTHENTICATE_ERROR_PLEASE_TRY_AGAIN']);

	pg_close($link);
	}


/*function validate($challenge, $response, $password)
	{
	return md5($challenge . $password) == $response;
	} */

function validate($challenge, $response, $password,$level,$scriptid,$script_id)
	{
		if($level == 0){
			
			return md5($challenge . $password) == $response;
		}else{
			if($script_id==$scriptid){
			return md5($challenge . $password) == $response;	
			}
			
		}
	}

function login($email,$response)
	{
	$_SESSION['whereami'] = '';
	require_once("../lib/front-main.php");
	require_once("../config.php"); 
	require_once("../../languages/lang.en.php");
	$email=strtolower($email);
	if (isset($_SESSION['challenge']) && $email!='' && $response!='')
		{
		$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
		$link = pg_connect($string);
		
		require_once("../../switching_configs.php");
		if($switch_setting['script_id'] == 1) {
			$switch_setting['script_id'] =0;
		} else {
			$switch_setting['script_id']=$switch_setting['script_id'];
		}	
	
	
		if(!$link)
			die($lang_resource['AUTHENTICATE_ERROR_PLEASE_TRY_AGAIN']);
			
		pg_prepare($link,'sql1','SELECT id,pwd,enabled,level,scriptid FROM w_users WHERE email=$1');
		$result = pg_execute($link,'sql1',array($email));

		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				$userid = $row['id'];
				$password = $row['pwd'];
				$enabled = $row['enabled'];
				$level = $row['level'];
				$scriptid = $row['scriptid'];
				}

		if ($enabled=='f')
			die('Account suspended.');	
		
		if (validate($_SESSION['challenge'], $response, $password, $level,$scriptid,$switch_setting['script_id']))
		
			$_SESSION['auth'] = "yes";
			else
			die($lang_resource['AUTHENTICATE_INCORRECT_DATA_PLEASE_TRY_AGAIN']);

		}
		else
		die($lang_resource['AUTHENTICATE_ERROR_PLEASE_TRY_AGAIN']);
		
	pg_prepare($link,'2','SELECT * FROM w_users WHERE id=$1');
	$result = pg_execute($link,'2',array($userid));
	pg_close($link);

	if (pg_num_rows($result)==1)  
		$user = catchuserinfo($result);

	$_SESSION['user'] = $user;
	echo 'LoggedIn';
	}
?>
