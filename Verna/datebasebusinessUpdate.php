<?php
function ConnectDB($CFG = 'empty')
	{
	if ($CFG=='empty')
		require('panel/config.php');
	$string="host=" . $CFG->dbhost . " dbname=" . $CFG->dbname . " user=" . $CFG->dbuser . " password=" . $CFG->dbpass;
	$link = pg_connect($string);
	if(!$link)
		die('');
		else
		return $link;
}
function parse($str)
	{
	return json_decode($str);//php 5.1
	//return json_decode(stripslashes($str));
	}	
	

function TableExist($link,$tablename) {
	
	pg_prepare($link,'sqlTable'.$tablename,"select count(*) from pg_class where relname=$1 and relkind=$2");
    $exist_tbl = pg_execute($link,'sqlTable'.$tablename,array($tablename,'r'));
	$exist_tbl =  pg_fetch_array($exist_tbl);
	return $exist_tbl;
	}	
	
	
function columnExist($link,$tablename) {
		
	pg_prepare($link,'sqlADDCOLs'.$tablename,"SELECT column_name  FROM information_schema.columns WHERE table_name=$1");
	
    $chk_record = pg_execute($link,'sqlADDCOLs'.$tablename,array($tablename));
	
	
	
	return $chk_record;
	
	}	
		
function ColumnAddText($link,$tablename,$columnname) {
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname text");
    $result = pg_execute($link,'sqlADDCOL'.$tablename.$columnname,array());
	
	}	
	
function ColumnAddInteger($link,$tablename,$columnname,$default) {
	pg_prepare($link,'sqlADDCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname integer default $default");
    $result = pg_execute($link,'sqlADDCOL'.$tablename.$columnname,array());
	
	}	
function ColumnAddBooleanDefaultFalse($link,$tablename,$columnname) {
	pg_prepare($link,'sqlBOOLCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname boolean default false");
    $result = pg_execute($link,'sqlBOOLCOL'.$tablename.$columnname,array());
	
	}	
function ColumnAddBooleanDefaultTrue($link,$tablename,$columnname) {
	pg_prepare($link,'sqlBOOLCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname boolean default true");
    $result = pg_execute($link,'sqlBOOLCOL'.$tablename.$columnname,array());
	
	}		
function ColumnAddTimeZone($link,$tablename,$columnname) {
	pg_prepare($link,'sqlBOOLCOL'.$tablename.$columnname,"ALTER TABLE $tablename ADD COLUMN $columnname timestamp without time zone");
    $result = pg_execute($link,'sqlBOOLCOL'.$tablename.$columnname,array());
	
	}	
		
		
if(isset($_REQUEST['submit'])) {
		
		$link = ConnectDB();
		$record_business = columnExist($link,'w_business');
		
		while($rst = pg_fetch_array($record_business)) {
		$column_name[] = $rst['column_name'];
		}
		
	
		if(!in_array("acceptemail",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptemail');
			
		}
		if(!in_array("acceptgprs",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptgprs');
			
		}
		if(!in_array("acceptsms",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptsms');
			
		}
		if(!in_array("acceptinvoice",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptinvoice');
			
		}
		if(!in_array("sameadd",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','sameadd');
			
		}
		if(!in_array("acceptpaypaladaptive",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptpaypaladaptive');
			
		}
		if(!in_array("acceptauthorize",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptauthorize');
			
		}
		if(!in_array("acceptbraintree",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptbraintree');
			
		}
		if(!in_array("paypal_type",$column_name)) {
			ColumnAddInteger($link,'w_business','paypal_type',0);
			
		}
		if(!in_array("mercury_id",$column_name)) {
			ColumnAddText($link,'w_business','mercury_id');
			
		}
		if(!in_array("mercury_pass",$column_name)) {
			ColumnAddText($link,'w_business','mercury_pass');
			
		}
		if(!in_array("businesspagecustomtext",$column_name)) {
			ColumnAddText($link,'w_business','businesspagecustomtext');
			
		}
		
		if(!in_array("printer_model",$column_name)) {
			ColumnAddText($link,'w_business','printer_model');
			
		}
		if(!in_array("acceptmercury",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptmercury');
			
		}
		if(!in_array("acceptworldpay",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptworldpay');
			
		}
		if(!in_array("last_update_invoice",$column_name)) {
			ColumnAddTimeZone($link,'w_business','last_update_invoice');
			
		}
		if(!in_array("accepttransactium",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','accepttransactium');
			
		}
		if(!in_array("transactiumusername",$column_name)) {
			ColumnAddText($link,'w_business','transactiumusername');
			
		}
		if(!in_array("transactiumpass",$column_name)) {
			ColumnAddText($link,'w_business','transactiumpass');
			
		}
		if(!in_array("transactiumtag",$column_name)) {
			ColumnAddText($link,'w_business','transactiumtag');
			
		}
		if(!in_array("bringgcompanyid",$column_name)) {
			ColumnAddText($link,'w_business','bringgcompanyid');
			
		}
		if(!in_array("acceptpexpress",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptpexpress');
			
		}
		if(!in_array("pexpressusername",$column_name)) {
			ColumnAddText($link,'w_business','pexpressusername');
			
		}
		if(!in_array("pexpresspass",$column_name)) {
			ColumnAddText($link,'w_business','pexpresspass');
			
		}
		if(!in_array("acceptmaksekeskus",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptmaksekeskus');
			
		}
		if(!in_array("maksekeskus_pay",$column_name)) {
			ColumnAddText($link,'w_business','maksekeskus_pay');
			
		}
		if(!in_array("maksekeskus_shopid",$column_name)) {
			ColumnAddText($link,'w_business','maksekeskus_shopid');
			
		}
		if(!in_array("maksekeskus_secretkey",$column_name)) {
			ColumnAddText($link,'w_business','maksekeskus_secretkey');
			
		}
		if(!in_array("paypalcurrency",$column_name)) {
			ColumnAddText($link,'w_business','paypalcurrency');
			
		}
		if(!in_array("timezone",$column_name)) {
			ColumnAddText($link,'w_business','timezone');
			
		}
		if(!in_array("currency",$column_name)) {
			ColumnAddText($link,'w_business','currency');
			
		}
		if(!in_array("tax",$column_name)) {
			ColumnAddText($link,'w_business','tax');
			
		}
		if(!in_array("taxtype",$column_name)) {
			ColumnAddInteger($link,'w_business','taxtype','1');
			
		}
		if(!in_array("googleanalytic",$column_name)) {
			ColumnAddText($link,'w_business','googleanalytic');
			
		}
		if(!in_array("acceptvoguepay",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptvoguepay');
			
		}
		if(!in_array("vogue_pay",$column_name)) {
			ColumnAddText($link,'w_business','vogue_pay');
			
		}
		if(!in_array("vogue_merchant_id",$column_name)) {
			ColumnAddText($link,'w_business','vogue_merchant_id');
			
		}
		if(!in_array("bringpermission",$column_name)) {
			ColumnAddInteger($link,'w_business','bringpermission',1);
			
		}
		if(!in_array("acceptskrill",$column_name)) {
			ColumnAddBooleanDefaultFalse($link,'w_business','acceptskrill');
			
		}
		if(!in_array("skrillemail",$column_name)) {
			ColumnAddText($link,'w_business','skrillemail');
			
		}
		
		
				pg_prepare($link,'sqlconfigsfetch1','SELECT max(id) FROM w_configs');
				$resultconfigss = pg_execute($link,'sqlconfigsfetch1',array());	
				$fetch_max = pg_fetch_array($resultconfigss);
				$fetch_max_rec = $fetch_max['max']+1;
	
			  pg_prepare($link,'sqlconf1','INSERT INTO w_configs (id,name,value) VALUES ($1,$2,$3)');
			  $config_insert = pg_execute($link,'sqlconf1',array($fetch_max_rec,'BusinessNewData','1'));
	  
	 
	
	/******************************************Table column update	********************************************************/
	
	/******************************************Data update	********************************************************/
	    pg_prepare($link,'sqlfetbusinessCityinfo','select * from w_business');
	    $sql_city_info = pg_execute($link,'sqlfetbusinessCityinfo',array());
		
		pg_prepare($link,'sqlfranchies','SELECT * FROM w_franchises WHERE id = $1');
		
		while($sql_data = pg_fetch_array($sql_city_info)) {
			
			  $sql_franchies = pg_execute($link,'sqlfranchies',array($sql_data['city']));
			  $sql_franchies_data = pg_fetch_array($sql_franchies);
			
			
			pg_prepare($link,'sqlupCity'.$sql_data['id'],'UPDATE w_business SET paypalcurrency=$2,timezone=$3,currency=$4,tax=$5,taxtype=$6 WHERE id=$1');
			pg_execute($link,'sqlupCity'.$sql_data['id'],array($sql_data['id'],'USD',$sql_franchies_data['timezone'],$sql_franchies_data['currency'],$sql_franchies_data['tax'],$sql_franchies_data['taxtype']));
			
			
		}
	
	
	/******************************************Data update	********************************************************/
	
	
	
	
}
		$link = ConnectDB();	
	
		pg_prepare($link,'sqlconfigs','SELECT * FROM w_configs WHERE name=$1');
        $resultconfigs = pg_execute($link,'sqlconfigs',array('BusinessNewData'));
	
	 ?>
		
		
        
        
        <!----------------------------template part------------------------------------------------------------->
        
         <style>
        .buttonc {
			 border:none;
			 background-color:#f00;
			 padding:5px 10px;
			 border-radius:3px;
			 cursor:pointer;
			 color:#FFF;
			 margin-top:140px;
			
			}
		.buttonc:hover {
			 border:none;
			 background-color:#900;
			 padding:5px 10px;
			 border-radius:3px;
			 cursor:pointer;
			 color:#FFF;
			 margin-top:140px;
			
			}	
        .divBox {
			width:70%; 
			height:300px;
		    border:1px solid #ccc;
			}
        </style>
        <center>
        <? if(isset($_REQUEST['submit'])) {
        echo "<h2>New Business data update successfully</h2>";
        } ?>
        <div class="divBox">
        
       <? if(pg_num_rows($resultconfigs) == 0 ) { ?>
        
		<form name="input" action="" method="post">
        <input type="hidden" name="Gocheck" value="1"  />
        <input type="submit" name="submit" value="SUBMIT" class="buttonc" />
        </form>
       <? } ?>
        </div> 
         </center>
        
        
         <!----------------------------template part------------------------------------------------------------->
        
