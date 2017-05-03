<?php
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);

switch ($_POST['f']){
	case 'CopyBusiness':
		CopyBusiness($_POST['id']);
	break;
	case 'DeleteBusinessById':
		DeleteBusinessById($_POST['id']);
	break;

	default:
        die();
    break;
}
function DeleteBusinessById($id){
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);	
	
	RemoveDir($CFG->dirimages . 'business/' . $id . '/');
	if(IS_REVIEW_ENABLED == 1)
		RemoveDir($_SERVER['DOCUMENT_ROOT']."/pages/business/". $id . '/');

		pg_prepare($link,'sql','DELETE FROM w_business WHERE id=$1');
		pg_execute($link,'sql',array($id));

		pg_prepare($link,'sqllangdele','DELETE FROM w_business_lang WHERE business_id=$1');
		pg_execute($link,'sqllangdele',array($id));

		pg_prepare($link,'sqlcatlang','DELETE FROM w_categories_lang WHERE business_id=$1');
		pg_execute($link,'sqlcatlang',array($id));

		pg_prepare($link,'sqlcat','DELETE FROM w_categories WHERE business=$1');
		pg_execute($link,'sqlcat',array($id));


		//we also have to remove all the dishes extras and menus that belong to the business
		pg_prepare($link,'sqlmenuslang','DELETE FROM w_menus_lang WHERE menus_id in(SELECT id FROM w_menus WHERE business=$1)');
		pg_execute($link,'sqlmenuslang',array($id));

		pg_prepare($link,'sql3','DELETE FROM w_menus WHERE business=$1');
		pg_execute($link,'sql3',array($id));
		
		
		
		pg_prepare($link,'sqldisheslang','DELETE FROM w_dishes_lang WHERE dishes_id in(SELECT id FROM w_dishes WHERE business=$1)');
		pg_execute($link,'sqldisheslang',array($id));

		pg_prepare($link,'sql4','SELECT id FROM w_dishes WHERE business=$1');
		$result = pg_execute($link,'sql4',array($id));
			while($row = pg_fetch_array($result))
				{
				RemoveDir($CFG->dirimages . 'dishes/' . $row['id'] . '/');
				pg_prepare($link,'sql5'.$row['id'],'DELETE FROM w_dishes WHERE id=$1');
				pg_execute($link,'sql5'.$row['id'],array($row['id']));
				}

		pg_prepare($link,'sql6','SELECT id FROM w_extras WHERE business=$1');
		$result = pg_execute($link,'sql6',array($id));
			while($row = pg_fetch_array($result)){
				RemoveDir($CFG->dirimages . 'extras/' . $row['id'] . '/');
				pg_prepare($link,'sql7','DELETE FROM w_extras WHERE id=$1');
				pg_execute($link,'sql7',array($row['id']));

				pg_prepare($link,'sql_extras_lang','DELETE FROM w_extras_lang WHERE extras_id=$1');
				pg_execute($link,'sql_extras_lang',array($row['id']));

				pg_prepare($link,'sql_extras_option','SELECT * FROM w_extras_options WHERE set_id=$1');
				$extarsop = pg_execute($link,'sql_extras_option',array($row['id']));
				while($extarsoprow = pg_fetch_array($extarsop)){
					pg_prepare($link,'sql_extras_lang','DELETE FROM w_extras_options WHERE id=$1');
					pg_execute($link,'sql_extras_lang',array($extarsoprow['id']));

					pg_prepare($link,'sql_extras_lang_lang','DELETE FROM w_extras_options_lang WHERE extras_id=$1');
					pg_execute($link,'sql_extras_lang_lang',array($extarsoprow['id']));
				}

			}

				pg_prepare($link,'sqldeliveryzonelang','DELETE FROM w_deliveryzone_lang WHERE deliveryzone_id in(SELECT id FROM w_deliveryzone WHERE businessid=$1)');
				pg_execute($link,'sqldeliveryzonelang',array($id));

				pg_prepare($link,'sqld8','DELETE FROM w_deliveryzone WHERE businessid=$1');
				pg_execute($link,'sqld8',array($id));

				pg_prepare($link,'sqldeliverykmlang','DELETE FROM w_deliverykm_lang WHERE deliverykm_id in(SELECT id FROM w_deliverykm WHERE businessid=$1)');
				pg_execute($link,'sqldeliverykmlang',array($id));
				
				pg_prepare($link,'sqld9','DELETE FROM w_deliverykm WHERE businessid=$1');
				pg_execute($link,'sqld9',array($id));
				
				pg_prepare($link,'sqld10','DELETE FROM w_zipcode WHERE businessid=$1');
				pg_execute($link,'sqld10',array($id));


				pg_prepare($link,'sqldeliverykmlang','DELETE FROM w_gallery_lang WHERE gallery_id in(SELECT id FROM w_gallery WHERE business=$1)');
				pg_execute($link,'sqldeliverykmlang',array($id));
				
				pg_prepare($link,'sqld11','DELETE FROM w_gallery WHERE business=$1');
				pg_execute($link,'sqld11',array($id));
				
				
				
				
				
				
				
				
				
				
		
	pg_close($link);

}

function CopyBusiness($oid){
	include '../config.php';
	//Business Info 
	$link = ConnectDB();
	pg_prepare($link,'sqlbusiness','SELECT * FROM w_business WHERE id = $1');
	$resultbusiness = pg_execute($link,'sqlbusiness',array($oid));
	$recordbuiness = pg_fetch_object($resultbusiness);
	pg_close($link);

	$newbid = businessInsertBody($recordbuiness,'w_business'); //Insert New Business

	//Business info lang
	$link = ConnectDB();	
	pg_prepare($link,'sqlbusiness_lang','SELECT * FROM w_business_lang WHERE business_id = $1');
	$resultbusiness_lang = pg_execute($link,'sqlbusiness_lang',array($oid));
	pg_close($link);

	$business_lang_counter = 0;
	while($recordbusiness_lang = pg_fetch_object($resultbusiness_lang)){		
		BElementInsertBody($recordbusiness_lang,'w_business_lang',$newbid,'business_id',$business_lang_counter);
		$business_lang_counter++;
	}

	//Business Meta info lang
	$link = ConnectDB();		
	pg_prepare($link,'sqlbusiness_meta_lang','SELECT * FROM w_business_meta_seo_lang WHERE business_id = $1');
	$resultbusiness_meta_lang = pg_execute($link,'sqlbusiness_meta_lang',array($oid));
	pg_close($link);

	$business_meta_lang_counter = 0;
	while($recordbusiness_meta_lang = pg_fetch_object($resultbusiness_meta_lang)){		
		$dishnwid = BElementInsertBody($recordbusiness_meta_lang,'w_business_meta_seo_lang',$newbid,'business_id',$business_meta_lang_counter);
		$business_meta_lang_counter++;
	}


	//Copy Images Old to New Business 
	$pathMain = $CFG->dirimages."business/". $newbid."/"; //new
	$path =    $CFG->dirimages."business/".$oid."/"; //old
	$oldname =  $path."original.jpg";
	if(file_exists($oldname) == 1){
		MoveBusinessImages_backup($pathMain,$oldname);
	}

	$pathMainBanner = $CFG->dirimages."banner/". $newbid."/"; //new
	$pathBanner =    $CFG->dirimages."banner/".$oid."/"; //old
	$oldnameBanner =  $pathBanner."original.jpg";
	if(file_exists($oldnameBanner) == 1){
		MoveBusinessImages_backup_admin($pathMainBanner,$oldnameBanner);
	}

	//Business Info 

	//Delivery Zone
	$link = ConnectDB();	
	
	$querydeliveryzone = 'SELECT * FROM w_deliveryzone WHERE businessid = $1 order by id ASC';
	pg_prepare($link,'sqlInDe1',$querydeliveryzone);
	$deliveryIn = pg_execute($link,'sqlInDe1',array($oid));

	$Indish = 0;
	while($record_delivery = pg_fetch_object($deliveryIn)) {
	
			$newdeliveryid = BElementInsertBodySearch($record_delivery,'w_deliveryzone',$newbid,'businessid',$Indish,$link,'');	
			
			$link1 = ConnectDB();	
			$querydeliveryzonelang = 'SELECT * FROM w_deliveryzone_lang WHERE deliveryzone_id= $1';
			pg_prepare($link1,'sqldeliveryzlang'.$record_delivery->id,$querydeliveryzonelang);
			$resultdeliveryzlang = pg_execute($link1,'sqldeliveryzlang'.$record_delivery->id,array($record_delivery->id));
			
			
			$deliverylang=0;
			while($recorddeliveryzlang = pg_fetch_object($resultdeliveryzlang)){	
			
				unset($dzlang);
				$dzlang = $deliverylang.$Indish;	
				$deliveryznwid = BElementInsertBody($recorddeliveryzlang,'w_deliveryzone_lang',$newdeliveryid,'deliveryzone_id',$dzlang,$link1);
				$deliverylang++;
			}

		 $Indish++;
	}
	//Delivery Zone

	//Delivery KM
		$link = ConnectDB();	
	
	$querydeliverykm= 'SELECT * FROM w_deliverykm WHERE businessid = $1 order by id ASC';
	pg_prepare($link,'sqlInKm1',$querydeliverykm);
	$deliveryKmIn = pg_execute($link,'sqlInKm1',array($oid));
	

	$Indish = 0;
	while($record_delivery_km = pg_fetch_object($deliveryKmIn)) {
		 
		  $newdeliverykmid = BElementInsertBodyCustom($record_delivery_km,'w_deliverykm',$newbid,'businessid',$Indish,$link,'');
		 
		 
		$link1 = ConnectDB();	
		$querydeliverykmlang = 'SELECT * FROM w_deliverykm_lang WHERE deliverykm_id= $1';
		pg_prepare($link1,'sqldeliverykmlang'.$record_delivery_km->id,$querydeliverykmlang);
		$resultdeliverykmlang = pg_execute($link1,'sqldeliverykmlang'.$record_delivery_km->id,array($record_delivery_km->id));
		pg_close($link1);

		$deliverkmlang=0;
		while($recorddeliverykmlang = pg_fetch_object($resultdeliverykmlang)){	
			$link1 = ConnectDB();	
			unset($dkmlang);
			$dkmlang = $deliverkmlang.$Indish;	
			$deliverykmnwid = BElementInsertBody($recorddeliverykmlang,'w_deliverykm_lang',$newdeliverykmid,'deliverykm_id',$dkmlang,$link1);
			$deliverkmlang++;
		}


		 $Indish++;
		}
	//Delivery KM	


	//Delivery Zip
	$link = ConnectDB();
	$queryzipcode= 'SELECT * FROM w_zipcode WHERE businessid = $1 order by id ASC';
	pg_prepare($link,'sqlInZip1',$queryzipcode);
	$deliveryZipIn = pg_execute($link,'sqlInZip1',array($oid));
	$Indish = 0;
	while($record_delivery_Zip = pg_fetch_object($deliveryZipIn)) {		
		BElementInsertBodyCustom($record_delivery_Zip,'w_zipcode',$newbid,'businessid',$Indish,$link,'');
		$Indish++;
	}	
	pg_close($link);
	//Delivery Zip

	//Delivery City	
	$link = ConnectDB();
	$querydelcity= 'SELECT * FROM w_deliverycity WHERE businessid = $1 order by id ASC';
	pg_prepare($link,'sqlInDelCity',$querydelcity);
	$deliveryCity = pg_execute($link,'sqlInDelCity',array($oid));
	$Indish = 0;
	while($record_delivery_city = pg_fetch_object($deliveryCity)) {		
		BElementInsertBodyCustom($record_delivery_city,'w_deliverycity',$newbid,'businessid',$Indish,$link,'');
		$Indish++;
	}
	pg_close($link);
	
	//Delivery City


	//Product

	$link = ConnectDB();	
	$queryD = 'SELECT * FROM w_dishes WHERE business = $1';
	pg_prepare($link,'sqlproduct',$queryD);
	$resultD = pg_execute($link,'sqlproduct',array($oid));
	pg_close($link);

	$rdish = 0;
	while($record_dish = pg_fetch_object($resultD)) {
		$dishnwid = BElementInsertBody($record_dish,'w_dishes',$newbid,'business',$rdish,$link); 

		$dishnarrayback[$record_dish->id] = $dishnwid; //This is For Store New Product id Respect Old Product Id	
		$arrd[]  = $dishnwid;  // This is for store new Product Id

		//Copy Images Old to New Product
		$path =    $CFG->dirimages."dishes/".$record_dish->id."/1/"; //old
		$oldname =  $path."original.jpg";
		if(file_exists($oldname)){
			$pathMain = $CFG->dirimages."dishes/". $dishnwid."/1/"; //new
			MoveBusinessImages_backup($pathMain,$oldname);
		}
		$path =    $CFG->dirimages."dishes/".$record_dish->id."/2/"; //old
		$oldname =  $path."original.jpg";
		if(file_exists($oldname)){
			$pathMain = $CFG->dirimages."dishes/". $dishnwid."/2/"; //new
			MoveBusinessImages_backup($pathMain,$oldname);
		}
		$path =    $CFG->dirimages."dishes/".$record_dish->id."/3/"; //old
		$oldname =  $path."original.jpg";
		if(file_exists($oldname)){
			$pathMain = $CFG->dirimages."dishes/". $dishnwid."/3/"; //new
			MoveBusinessImages_backup($pathMain,$oldname);
		}

		/*$link = ConnectDB();	
		$querydishlang = 'SELECT * FROM w_dishes_lang WHERE dishes_id= $1';
		pg_prepare($link,'sqldishlang'.$record_dish->id,$querydishlang);
		$resultdishlang = pg_execute($link,'sqldishlang'.$record_dish->id,array($record_dish->id));
		pg_close($link);

		$disheslang=0;
		while($recorddishlang = pg_fetch_object($resultdishlang)){	
			unset($dilang);
			$dilang = $disheslang.$rdish;	
			$dishnwid = BElementInsertBody($recorddishlang,'w_dishes_lang',$dishnwid,'dishes_id',$dilang,$link1);
			$disheslang++;
		}	
		$rdish++;*/
		$link = ConnectDB();	
		$querydishlang = 'SELECT * FROM w_dishes_lang WHERE dishes_id= $1';
		pg_prepare($link,'sqldishlang'.$record_dish->id,$querydishlang);
		$resultdishlang = pg_execute($link,'sqldishlang'.$record_dish->id,array($record_dish->id));
		pg_close($link);

		$disheslang=0;
		while($recorddishlang = pg_fetch_object($resultdishlang)){	
			print_r($recorddishlang);
			unset($dilang);				
			unset($keyid);

			$dilang = $disheslang.$rdish;
			$keyid = -1;
			$link1 = ConnectDB();
			pg_prepare($link1,'sqlid'.$dilang,"SELECT nextval('w_dishes_lang_id_seq') as key");
			$result = pg_execute($link1,'sqlid'.$dilang,array());
			if (pg_num_rows($result)==1)
				while($row = pg_fetch_array($result))
					$keyid = $row['key'];

			if ($keyid==-1)
				die();

			pg_prepare($link1,'sqldishlang'.$dilang,'INSERT INTO w_dishes_lang (id,dishes_id,lang_id,name_lang,description_lang,status) VALUES ($1,$2,$3,$4,$5,$6)');	
			pg_execute($link1,'sqldishlang'.$dilang,array($keyid,$dishnwid,$recorddishlang->lang_id,$recorddishlang->name_lang,$recorddishlang->description_lang,$recorddishlang->status));
			$disheslang++;
		}	
		$rdish++;
	}

	//Product

	//Menu

	$link = ConnectDB();	
	$queryM = 'SELECT * FROM w_menus WHERE business = $1';
	pg_prepare($link,'sqlMi1',$queryM);
	$resultM = pg_execute($link,'sqlMi1',array($oid));
	pg_close($link);

	$Mdish = 0;
	while($record_menus = pg_fetch_object($resultM)) {	
		unset($disheslist);	
		$disheslist = json_decode($record_menus->dishes);	
		$disheslistnew = array();
		foreach($disheslist as $valued){	
			array_push($disheslistnew,$dishnarrayback[$valued]);
		}
		$disheslistnew = json_encode($disheslistnew);	
		$record_menus->dishes = $disheslistnew;
		$newmenuid = BElementInsertBody($record_menus,'w_menus',$newbid,'business',$Mdish,$link);
		$arrM[] = $newmenuid;

		$link = ConnectDB();	
		$querymenulang = 'SELECT * FROM w_menus_lang WHERE menus_id= $1';
		pg_prepare($link,'sqlmenulang'.$record_menus->id,$querymenulang);
		$resultmenulang = pg_execute($link,'sqlmenulang'.$record_menus->id,array($record_menus->id));
		pg_close($link);

		$menuslang=0;
		while($recordmenulang = pg_fetch_object($resultmenulang)){		
			unset($melang);
			$melang = $menuslang.$Mdish;	
			$menunwid = BElementInsertBody($recordmenulang,'w_menus_lang',$newmenuid,'menus_id',$melang);
			$menuslang++;
		}
		$Mdish++;
	}
	//Menu

	//Categories Section
	$link = ConnectDB();
	pg_prepare($link,'sqlcategories','SELECT * FROM w_categories WHERE business = $1');
	$resultcategories = pg_execute($link,'sqlcategories',array($oid));
	pg_close($link);

	$categories_counter = 0;
	$catenew = array();
	while($recordcategories = pg_fetch_object($resultcategories)) {
		$catnewid = BElementInsertBody($recordcategories,'w_categories',$newbid,'business',$categories_counter);

		$catenew[$recordcategories->id] = $catnewid; //This is For Store New Category id Respect Old Category Id
		$arrCatNew[]  = $catnewid; // This is for store new Category Id

		//Copy Images Old to New Categories 
		$path =  $CFG->dirimages."categories/".$recordcategories->id."/1/"; //old
		$oldname =  $path."original.jpg";
		if(file_exists($oldname)) {
			$pathMain = $CFG->dirimages."categories/". $catnewid."/1/"; //new
			MoveBusinessImages_backup($pathMain,$oldname);
		}

		//Categories lang
		$link = ConnectDB();	
		$querycategorieslang = 'SELECT * FROM w_categories_lang WHERE categories_id= $1';
		pg_prepare($link,'sqlcategorylang'.$recordcategories->id,$querycategorieslang);
		$resultcategorylang = pg_execute($link,'sqlcategorylang'.$recordcategories->id,array($recordcategories->id));
		pg_close($link);

		$categorylang=0;
		while($recordcategorylang = pg_fetch_object($resultcategorylang)){				
			unset($catlang);
			$catlang = $categorylang.$categories_counter;	
			$deliverykmnwid = BElementInsertBodyCustomCat($recordcategorylang,'w_categories_lang',$catnewid,'categories_id',$newbid,'business_id',$catlang);
			$categorylang++;
		}
		$categories_counter++;
	}


	$link = ConnectDB();
	$querycategoriesupdate = 'UPDATE w_business SET categories = $1 WHERE id=$2 ';
	pg_prepare($link,'sqlcategorylang_catupdate'.$record_catnew->id,$querycategoriesupdate);
	pg_execute($link,'sqlcategorylang_catupdate'.$record_catnew->id,array(json_encode($arrCatNew),$newbid));
	
	$querycategoriesupdate1 = 'UPDATE w_dishes SET category = $1 WHERE id=$2';
	pg_prepare($link,'sqldish_update1'.$record_catnew->id,$querycategoriesupdate1);
	
	pg_prepare($link,'sqldish_category','SELECT category FROM w_dishes WHERE id=$1');
	foreach($arrd as $k=>$values){	
		$resultcat = pg_execute($link,'sqldish_category',array($values));
		$rowcat = pg_fetch_array($resultcat);
		unset($catkey);
		$catkey = $rowcat['category'];			
		pg_execute($link,'sqldish_update1'.$record_catnew->id,array($catenew[$catkey],$values));
	}	
	pg_close($link);

	//Categories Section


	//Sub-Category

	if($_SESSION['scriptid'] == '4'){	
		$link = ConnectDB();	
		
		$querySubCatNew = 'SELECT * FROM w_subcategories WHERE business = $1';
		pg_prepare($link,'sqlSubCatN1',$querySubCatNew);
		$resultSubCatNew = pg_execute($link,'sqlSubCatN1',array($oid));
		pg_close($link);
		
		$Indish = 0;
		$arrsubcat = array();
		while($record_subcatnew = pg_fetch_object($resultSubCatNew)) {
			$subcatnewid = BElementInsertBodyCustomCat($record_subcatnew,'w_subcategories',$newbid,'business',$arr6[$record_subcatnew->category],'category',$Indish);
			
			$arrsubcat[$record_subcatnew->id] = $subcatnewid; //This is For Store New Sub Category id Respect Old Sub Category Id
			$arrSubCatNew[]  = $subcatnewid;  // This is for store new Sub Category Id

			$link = ConnectDB();	
			$querysubcategorieslang = 'SELECT * FROM w_subcategories_lang WHERE subcategories_id= $1';
			pg_prepare($link,'sqlsubcategorylang'.$record_subcatnew->id,$querysubcategorieslang);
			$resultsubcategorylang = pg_execute($link,'sqlsubcategorylang'.$record_subcatnew->id,array($record_subcatnew->id));
			pg_close($link);

			$subcategorylang=0;
			while($recordsubcategorylang = pg_fetch_object($resultsubcategorylang)){					
				unset($catlang);
				$subcatlang = $subcategorylang.$Indish;	
				$deliverykmnwid = BElementInsertBodyCustomCat($recordsubcategorylang,'w_subcategories_lang',$subcatnewid,'subcategories_id',$newbid,'business_id',$subcatlang);
				$subcategorylang++;
			}
				 
			 $Indish++;
		}

		$link = ConnectDB();	
		$querysubcategoriesupdate1 = 'UPDATE w_dishes SET subcategory = $1 WHERE id=$2';
		pg_prepare($link,'sqldish_update1sub'.$record_subcatnew->id,$querysubcategoriesupdate1);	
		pg_prepare($link,'sqldish_subcategory','SELECT subcategory FROM w_dishes WHERE id=$1');
		foreach($arrd as $k=>$values){	
			$resultcat = pg_execute($link,'sqldish_subcategory',array($values));
			$rowcat = pg_fetch_array($resultcat);
			unset($catkey);
			$catkey = $rowcat['subcategory'];			
			pg_execute($link,'sqldish_update1sub'.$record_subcatnew->id,array($arrsubcat[$catkey],$values));
		}
		pg_close($link);
	}
	//Sub-Category



	//Product OPtion

		$link = ConnectDB();	
	
	$queryEx = 'SELECT * FROM w_extras WHERE business = $1';
	pg_prepare($link,'sqlEx1',$queryEx);
	$resultEx = pg_execute($link,'sqlEx1',array($oid));
	
	$exs = 0;
	while($record_extras = pg_fetch_object($resultEx)) {
		$old_extra_id = $record_extras->id;
		$newExtraId = BElementInsertBody($record_extras,'w_extras',$newbid,'business',$exs,$link);
		$oldextra[$old_extra_id] = $newExtraId;
		
		$link1 = ConnectDB();	
		$queryextraslang = 'SELECT * FROM w_extras_lang WHERE extras_id= $1';
		pg_prepare($link1,'sqlextraslang'.$record_extras->id,$queryextraslang);
		$resultextraslang = pg_execute($link1,'sqlextraslang'.$record_extras->id,array($record_extras->id));
		pg_close($link1);
		
		$extraslang=0;
		while($recordextraslang = pg_fetch_object($resultextraslang)){	
		$link1 = ConnectDB();	
		unset($exlang);
		$exlang = $extraslang.$exs;	
		$extrasnwid = BElementInsertBody($recordextraslang,'w_extras_lang',$newExtraId,'extras_id',$exlang,$link1);
		$extraslang++;
		}
		
		
		$exs++;
	}
		
	
	foreach($arrd as $dishextrachk) {
	
	$link = ConnectDB();
	
	$queryDishChk = 'SELECT * FROM w_dishes WHERE id = $1';
	pg_prepare($link,'DishChk'.$dishextrachk,$queryDishChk);	
	$extra_dish_chk = pg_execute($link,'DishChk'.$dishextrachk,array($dishextrachk));
	$extra_dish_fetch = pg_fetch_array($extra_dish_chk);
	if($extra_dish_fetch['extras']!="" && $extra_dish_fetch['extras']!="null") {
	
		$extras_array = json_decode($extra_dish_fetch['extras']);
		
		foreach($extras_array as $exs) {
			if( $oldextra[$exs] !="") 
			$extras_stores[$dishextrachk][] = $oldextra[$exs];
		
		}
		if(count($extras_stores[$dishextrachk])>0) {
		
			$queryDishExtraupdate = 'UPDATE w_dishes SET extras = $1 WHERE id=$2';
			pg_prepare($link,'sqldish_exupdate2'.$dishextrachk.$exs,$queryDishExtraupdate); 
			pg_execute($link,'sqldish_exupdate2'.$dishextrachk.$exs,array(json_encode($extras_stores[$dishextrachk]),$dishextrachk));
			}
		
		}
	
	}
		 
		
	if($oldextra !=""){
		$optionid_array = array();
		$choiceid_array = array();
		$newexid = array();
		$exs =0;
	foreach($oldextra as $key =>  $val )	
	{	
		

		$link = ConnectDB();	
		
		$queryExo = 'SELECT * FROM w_extras_options WHERE set_id = $1 ORDER BY option_id';
		pg_prepare($link,'sqlExo'.$key,$queryExo);	
		$extra_option_val = pg_execute($link,'sqlExo'.$key,array($key));
		
			
		while($record_extras_options = pg_fetch_array($extra_option_val)) {
			if(!array_key_exists($record_extras_options['option_id'],$optionid_array)){
				$option_id=get_max_option_id();		
				if($option_id == null)
				$option_id=1;
				else
				$option_id++;
			}
			


			$choice_id=get_max_choice_id();
			if($choice_id == null)
			$choice_id=1;
			else
			$choice_id++;

			$link = ConnectDB();
			$queryExo22 = 'SELECT max(id) as id FROM w_extras_options';
			pg_prepare($link,'sqlExo'.$exs,$queryExo22);	
			$extra_option_val22 = pg_execute($link,'sqlExo'.$exs,array());
				if(pg_num_rows($extra_option_val22) == 0) { 
					$incheck = 1;
				} else { 
					$all_rec= pg_fetch_array($extra_option_val22);
					$incheckpre= $all_rec['id'];
					$incheck = $incheckpre + 1;				  
				
				}
			
			array_push($newexid, $incheck);
			
			$setid = $val;
			$option_id=$option_id;
			$optionid_array[$record_extras_options['option_id']] = $option_id;
			$option_name = $record_extras_options['option_name'];
			$choice_name = $record_extras_options['choice_name'];
			$choice_id = $choice_id;
			$choiceid_array[$record_extras_options['choice_id']] = $choice_id;
			$with_respect_to = $record_extras_options['with_respect_to'];
			$conditional = $record_extras_options['conditional'];
			$copy = $record_extras_options['copy'];
			$price = $record_extras_options['price'];
			$rank = $record_extras_options['rank'];
			$option_text_to_end_user = $record_extras_options['option_text_to_end_user'];
			$max_sel = $record_extras_options['max_sel'];
			$min_sel = $record_extras_options['min_sel'];
			$ingredients = $record_extras_options['ingredients'];
			//$scriptid = $record_extras_options['scriptid'];
			

			
			$link = ConnectDB();
			pg_prepare($link,'sqlextoption'.$exs,'INSERT INTO w_extras_options (id,set_id,option_id,option_name,choice_name,choice_id,with_respect_to,conditional,copy,price,rank,option_text_to_end_user,max_sel,min_sel,ingredients) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)');	
			$newExtraId = pg_execute($link,'sqlextoption'.$exs,array($incheck,$setid,$option_id,$option_name,$choice_name,$choice_id,$with_respect_to,$conditional,$copy,$price,$rank,$option_text_to_end_user,$max_sel,$min_sel,$ingredients));
			
			$link1 = ConnectDB();	
			$queryextrasoplang = 'SELECT * FROM w_extras_options_lang WHERE extras_options_id= $1 AND extras_id=$2';
			pg_prepare($link1,'sqlextrasoplang'.$exs,$queryextrasoplang);
			$resultextrasoplang = pg_execute($link1,'sqlextrasoplang'.$exs,array($record_extras_options['option_id'],$record_extras_options['id']));
			pg_close($link1);
			
			$extrasoplang=0;
			while($recordextrasoplang = pg_fetch_array($resultextrasoplang)){				
			
				$link = ConnectDB();	
				$incheckla = -1;
				pg_prepare($link,'sqlExoplang'.$exs.$extrasoplang,"SELECT nextval('w_extras_options_lang_id_seq') as key");
				$resultopl = pg_execute($link,'sqlExoplang'.$exs.$extrasoplang,array());
			
				if (pg_num_rows($resultopl)==1)
					while($rowopl = pg_fetch_array($resultopl))
						$incheckla = $rowopl['key'];
							
				
				unset($exoplang);
				$exoplang = $extrasoplang.$exs;	
				$lang_id = $recordextrasoplang['lang_id'];
				$option_name_lang = $recordextrasoplang['option_name_lang'];
				$option_text_to_end_user_lang = $recordextrasoplang['option_text_to_end_user_lang'];
				$choice_name_lang = $recordextrasoplang['choice_name_lang'];
				
				pg_prepare($link,'sqlextoptionlang'.$extrasoplang.$exs,'INSERT INTO w_extras_options_lang (id,extras_options_id,lang_id,option_name_lang,option_text_to_end_user_lang,choice_name_lang,extras_choice_id,extras_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)');	
				$newExtraId = pg_execute($link,'sqlextoptionlang'.$extrasoplang.$exs,array($incheckla,$option_id,$lang_id,$option_name_lang,$option_text_to_end_user_lang,$choice_name_lang,$choice_id,$incheck));
				
				$extrasoplang++;
			}
			
			$choice_id++;
			
			$exs++;
		}
	
	
	
	}	
		pg_close($link);

		foreach($newexid as $key=>$val){
			$link = ConnectDB();		
			$queryExo = 'SELECT with_respect_to,conditional FROM w_extras_options WHERE id = $1';
			pg_prepare($link,'sqlexowr'.$key,$queryExo);	
			$extra_option_val = pg_execute($link,'sqlexowr'.$key,array($val));
			$rowextra_option_val = pg_fetch_array($extra_option_val);

			$conditional = $rowextra_option_val['conditional'];
			if($conditional == 'yes'){
				$with_respect_to = $rowextra_option_val['with_respect_to'];
				$with_respect_to_new = array();
				array_push($with_respect_to_new, $optionid_array[$with_respect_to[0]]);
				array_push($with_respect_to_new, $choiceid_array[$with_respect_to[1]]);
			}
			pg_prepare($link,'sqlwithre'.$key,'UPDATE w_extras_options SET with_respect_to=$1 WHERE id=$2');
			$result = pg_execute($link,'sqlwithre'.$key,array($with_respect_to_new,$val));
		}
	}


	//Reserve
	$link = ConnectDB();
	$queryR = 'SELECT * FROM w_reserve WHERE business = $1';
	pg_prepare($link,'sqlRi1',$queryR);
	$resultR = pg_execute($link,'sqlRi1',array($oid));
	
	$Rdish = 0;
	while($record_reserve = pg_fetch_object($resultR)) {
		$reservenewid = BElementInsertBody($record_reserve,'w_reserve',$newbid,'business',$Rdish,$link);
		$arrRsv[] = $reservenewid;
		$link = ConnectDB();	
		$queryreservelang = 'SELECT * FROM w_reserve_lang WHERE reserve_id= $1';
		pg_prepare($link,'sqlreservelang'.$record_reserve->id,$queryreservelang);
		$resultreservelang = pg_execute($link,'sqlreservelang'.$record_reserve->id,array($record_reserve->id));
		pg_close($link);

		$reservelang=0;
		while($recordreservelang = pg_fetch_object($resultreservelang)){		
			unset($relang);
			$relang = $reservelang.$Rdish;	
			$reservenwid = BElementInsertBody($recordreservelang,'w_reserve_lang',$newmenuid,'reserve_id',$relang);
			$reservelang++;
		}
		$Rdish++;
	}
	//Reserve

	//Reserve Chart
	$link = ConnectDB();
	$queryRC = 'SELECT * FROM w_reserve_chart WHERE business = $1';
	pg_prepare($link,'sqlRi1c',$queryRC);
	$resultRC = pg_execute($link,'sqlRi1c',array($oid));
	
	$Rdish = 0;
	while($record_reserve_chart = pg_fetch_object($resultRC)) {
		$reservechartnewid = BElementInsertBody($record_reserve_chart,'w_reserve_chart',$newbid,'business',$Rdish,$link);
		$arrRsvC[] = $reservechartnewid;
		$Rdish++;
	}
	//Reserve Chart

	//Gallery
	$link = ConnectDB();	

	$querygal = 'SELECT * FROM w_gallery WHERE business = $1';
	pg_prepare($link,'sqlIng',$querygal);
	$resultgallery = pg_execute($link,'sqlIng',array($oid));
	pg_close($link);

	$Indish = 0;
	while($record_gallery = pg_fetch_object($resultgallery)) {
		$gallerid = BElementInsertBodyCustom($record_gallery,'w_gallery',$newbid,'business',$Indish,$link,'');
		$gallerids[]  = $gallerid;
		$path =    $CFG->dirimages."gallery/".$record_gallery->id."/"; //old
		$oldname =  $path."normal.jpg";
		if(file_exists($oldname)) {
			$pathMain = $CFG->dirimages."gallery/". $gallerid."/"; //new
			MoveBusinessImages_gallery_backup($pathMain,$oldname);
		}

		$link = ConnectDB();	
		$querygallerylang = 'SELECT * FROM w_gallery_lang WHERE gallery_id= $1';
		pg_prepare($link,'sqlgallerylang'.$record_gallery->id,$querygallerylang);
		$resultgallerylang = pg_execute($link,'sqlgallerylang'.$record_gallery->id,array($record_gallery->id));
		pg_close($link);

		$gallerylang=0;
		while($recordgallerylang = pg_fetch_object($resultgallerylang)){			
			unset($gallang);
			$gallang = $gallerylang.$Indish;	
			$deliverykmnwid = BElementInsertBody($recordgallerylang,'w_gallery_lang',$gallerid,'gallery_id',$gallang);
			$gallerylang++;
		}
		$Indish++;
	}
	//Gallery

	//OFFER
	$link = ConnectDB();
	$queryOffer= 'SELECT * FROM w_discountoffer WHERE business = $1';
	pg_prepare($link,'sqlOffer',$queryOffer);
	$resultOffer = pg_execute($link,'sqlOffer',array($oid));
	$Indish = 0;
	while($record_offer = pg_fetch_object($resultOffer)) {
		$offer = BElementInsertBodyCustom($record_offer,'w_discountoffer',$newbid,'business',$Indish,$link,'');
		$Indish++;
	}
	//OFFER


	//Invoice
	$link = ConnectDB();
	$queryIn = 'SELECT * FROM w_invoice WHERE businessi = $1';
	pg_prepare($link,'sqlIn1',$queryIn);
	$resultIn = pg_execute($link,'sqlIn1',array($oid));
	pg_close($link);
	$Indish = 0;
	while($record_invoice = pg_fetch_object($resultIn)) {
		$arrInv[] = BElementInsertBody($record_invoice,'w_invoice',$newbid,'businessi',$Indish);
		$Indish++;
	}
	//Invoice
}

function businessInsertBody($record,$table) {	
	$link = ConnectDB();	
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
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {
		if($k!=0) {
			$query .=  ','.  $key;
			array_push($values,$val);
		}
		$k++;
	}
	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
			$query .= ',$' . ($i+1);
		}	
		$i++;
	}
	$query .= ')';
	
	pg_prepare($link,'sqli'.$id,$query);
	$result = pg_execute($link,'sqli'.$id,$values);
	pg_close($link);
	return $id;
}

function BElementInsertBody($record,$table,$newbid,$mcolm,$ck) {
	
	$link = ConnectDB();	
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
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
			} else {
				array_push($values,$val);
			}
		}
		$k++;
	}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
			$query .= ',$' . ($i+1);
		}
		$i++;
	}

	$query .= ')';	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;	
}
function BElementInsertBodyCustomCat($record,$table,$newbid,$mcolm,$newbid1,$mcolm1,$ck) {
	
	$link = ConnectDB();	
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
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {
		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
				}else if($key == $mcolm1) {
				array_push($values,$newbid1);
				} else {
			array_push($values,$val);
				}
		}
			$k++;
			
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;
}

function BElementInsertBodyCustom($record,$table,$newbid,$mcolm,$ck,$link,$groupfunctionid) {
	
	$link = ConnectDB();	
	$id = -1;

	pg_prepare($link,'sql',"SELECT id from ".$table." order by id desc");
	$result = pg_execute($link,'sql',array());

	
		$row = pg_fetch_array($result);
			$id = $row['id']+1;

	if ($id==-1)
		die();
		
		if($ck == 0) {
		$groupid = $id;	
		 
		} else {
		$groupid = $groupfunctionid;	
			
			}

	$query = 'INSERT INTO ' . $table . ' (id';
	$count = 0;
	$values = array($id);
	$i=0;
	$k=0;

	foreach($record as $key=>$val) {
		
		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
				}
			else if($key == "businessinsertid") {
				array_push($values,$groupid);
				} else {
			array_push($values,$val);
				}
		}
			$k++;
			
		
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;
}
function BElementInsertBodySearch($record,$table,$newbid,$mcolm,$ck,$link,$groupfunctionid) {
	
	$link = ConnectDB();	
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
	$i=0;
	$k=0;
	if($ck == 0) {
		$groupid = $id;	
		 
		} else {
		$groupid = $groupfunctionid;	
			
			}

	foreach($record as $key=>$val) {
		
		if($k!=0) {
			$query .=  ','.  $key;
			if($key == $mcolm) {
				array_push($values,$newbid);
				}
			else if($key == "businessinsertid") {
				array_push($values,$id);
				} else {
			array_push($values,$val);
				}
		}
			$k++;
			
		}

	$query .= ') VALUES ($1';

	foreach($record as $key=>$val) {
		if($i!=0) {
		$query .= ',$' . ($i+1);
		}
	
	$i++;
	}
	$query .= ')';
	
	
	
	pg_prepare($link,'sqdsi'.$ck,$query);
	$result = pg_execute($link,'sqdsi'.$ck,$values);
	pg_close($link);
	return $id;
}	
	
	


function MoveBusinessImages_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'original.jpg';

	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);
	
	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);
		
		
	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');
	
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');

	$image->gray();		
	$image->save($folder.'smallgray.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');

	$image->gray();		
	$image->save($folder.'minigray.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(110,110);
	$image->save($folder.'medium.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(399,307);
	$image->save($folder.'panel.jpg');
}
	
function MoveBusinessImages_backup_admin($root,$oldname){
	$folder = $root;
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
	copy($oldname,$finalname);
		
		
	//create thumbnail and regular size
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');
	
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(64,64);
	$image->save($folder.'small.jpg');

	$image->gray();		
	$image->save($folder.'smallgray.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(32,32);
	$image->save($folder.'mini.jpg');

	$image->gray();		
	$image->save($folder.'minigray.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(110,110);
	$image->save($folder.'medium.jpg');
	
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(475,85);
	$image->save($folder.'admin.jpg');
	
	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(1349,292);
	$image->save($folder.'banner.jpg');

	$image = new SimpleImage();
	$image->load($finalname);
	$image->resize(399,307);
	$image->save($folder.'panel.jpg');
}
function MoveBusinessImages_gallery_backup($root,$oldname){
	$folder = $root;
	$finalname = $folder.'normal.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);


	
	$ext = "jpg"; //Get the last extension

	require_once('resize.php');
		copy($oldname,$finalname);
		
		
	//create thumbnail and regular size
		

		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(205,214);
		$image->save($folder.'full.jpg');
				
		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(1349,292);
		$image->save($folder.'gallery.jpg');



		$image = new SimpleImage();
		$image->load($finalname);
		$image->resize(399,307);
		$image->save($folder.'panel.jpg');
}


function get_max_option_id()
{
    require('../config.php');

    $option_id=null;
     $link = ConnectDB();
    $query = 'SELECT MAX(option_id)  FROM w_extras_options';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array());
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
          $option_id=$row['max'];
        }


    pg_close($link);
    return $option_id;
}

function get_max_choice_id()
{
    require('../config.php');

    $link = ConnectDB();
    $choice_id=null;
    $query = 'SELECT MAX(choice_id)  FROM w_extras_options';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array());

    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
           $choice_id=$row['max'];
        }
    pg_close($link);
   return $choice_id;

}