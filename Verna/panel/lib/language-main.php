<?php
/*With fetch Different language */
function countrynamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlcountrylang'.$id,'SELECT * FROM w_countries_lang WHERE lang_id=$1 and status=$2 AND country_id=$3');
	$result1 = pg_execute($link,'sqlcountrylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function areanamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlcountrylang'.$id,'SELECT * FROM w_neighborhood_lang WHERE lang_id=$1 and status=$2 AND neighborhood_id=$3');
	$result1 = pg_execute($link,'sqlcountrylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function citynamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlcitylang'.$id,'SELECT * FROM w_franchises_lang WHERE lang_id=$1 AND status=$2 AND city_id=$3');
	$result1 = pg_execute($link,'sqlcitylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['city_lang'];
	pg_close($link);
}
function businesscuisinenamebylangdp($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantcategorylangdp'.$id,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlresturantcategorylangdp'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function resturantnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantlang'.$id,'SELECT * FROM w_business_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlresturantlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function cuisinenamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantlang'.$id,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlresturantlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function cuisinepopularnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantpopularlang'.$id,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlresturantpopularlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function footerpagenamebylang($id,$link){
	//$link = ConnectDB();
	pg_prepare($link,'sqlresturantfooterlang'.$id,'SELECT * FROM w_footer_lang WHERE lang_id=$1 AND status=$2 AND footer_id=$3');
	$result1 = pg_execute($link,'sqlresturantfooterlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['pagename_lang'];
	//pg_close($link);
}

function footerCMSpagenamebylang($id,$link){
	//$link = ConnectDB();
	pg_prepare($link,'sqlfootercmslang'.$id,'SELECT * FROM w_footercms_lang WHERE lang_id=$1 AND status=$2 AND footercms_id=$3');
	$result1 = pg_execute($link,'sqlfootercmslang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['pagetitle_lang'];
	//pg_close($link);
}

function footerCMSurlpagenamebylang($id,$link){
	//$link = ConnectDB();
	pg_prepare($link,'sqlfootercmsurllang'.$id,'SELECT * FROM w_footercms_lang WHERE lang_id=$1 AND status=$2 AND footercms_id=$3');
	$result1 = pg_execute($link,'sqlfootercmsurllang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['customurl_lang'];
	//pg_close($link);
}
function footerCMSheadingpagenamebylang($id,$link){
	//$link = ConnectDB();
	pg_prepare($link,'sqlfootercmsheadlang'.$id,'SELECT * FROM w_footercms_lang WHERE lang_id=$1 AND status=$2 AND footercms_id=$3');
	$result1 = pg_execute($link,'sqlfootercmsheadlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['pageheading_lang'];
	//pg_close($link);
}





function businessnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantlang'.$id,'SELECT * FROM w_business_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlresturantlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}


function dishidnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantdisheslang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantdisheslang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function predishidnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantpredisheslang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantpredisheslang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function dishiddescriptionbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantdishesdeslang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantdishesdeslang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['description_lang'];
	pg_close($link);
}
function dishidsellerwinelibarybylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantdishessellerwinelibarylang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantdishessellerwinelibarylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['seller_winelibary_lang'];
	pg_close($link);
}

function dishidoriginrwinelibarybylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantdishesoriginwinelibarylang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantdishesoriginwinelibarylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['origin_winelibary_lang'];
	pg_close($link);
}
function FetchSubCategoryLangDefault($cid){
	$link = ConnectDB();
	$rand = rand();
	pg_prepare($link,'sqldefalutlang'.$rand.$cid,'SELECT * from w_subcategories_lang WHERE subcategories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$rand.$cid,array($cid,$_SESSION['l']));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
function dishipredescriptionbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantpredishesdeslang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantpredishesdeslang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['description_lang'];
	pg_close($link);
}


function businesscuisinenamebylang($id){
	$link = ConnectDB();
	
	$queryname = "sqlresturantcategorylang".$id.rand();
	pg_prepare($link,$queryname,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,$queryname,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function businesscustomcatenamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantcustomcategorylang'.$id,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlresturantcustomcategorylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function businessmenucategorynamebylang($id,$c){
	$link = ConnectDB();
	pg_prepare($link,'sqlcategorylang'.$id.$c,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlcategorylang'.$id.$c,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function businessmenuprecategorynamebylang($id,$c){
	$link = ConnectDB();
	pg_prepare($link,'sqlprecategorylang'.$id.$c,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlprecategorylang'.$id.$c,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}




function businessmenunamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantmenulang'.$id,'SELECT * FROM w_menus_lang WHERE lang_id=$1 AND status=$2 AND menus_id=$3');
	$result1 = pg_execute($link,'sqlresturantmenulang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function businessreservationbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantreservelang'.$id,'SELECT * FROM w_reserve_lang WHERE lang_id=$1 AND status=$2 AND reserve_id=$3');
	$result1 = pg_execute($link,'sqlresturantreservelang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}


function businesschoicename($id,$b){
	$link = ConnectDB();
	pg_prepare($link,'sqlchoicenamelang'.$id.$b,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3 AND extras_choice_id=$4');
	$result1 = pg_execute($link,'sqlchoicenamelang'.$id.$b,array($_SESSION['l'],'TRUE',$id,$b));
	$row1 = pg_fetch_array($result1);
	return $row1['choice_name_lang'];
	pg_close($link);
}

function businesschoicename2($id,$b){
	$link = ConnectDB();
	pg_prepare($link,'sqlchoicenamelang457'.$id.$b,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3 AND extras_choice_id=$4');
	$result1 = pg_execute($link,'sqlchoicenamelang457'.$id.$b,array($_SESSION['l'],'TRUE',$id,$b));
	$row1 = pg_fetch_array($result1);
	return $row1['choice_name_lang'];
	pg_close($link);
}

function businesstexttoenduser($id,$b,$c){
	$link = ConnectDB();
	pg_prepare($link,'sqltextuserlang'.$id.$b.$c,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3');
	$result1 = pg_execute($link,'sqltextuserlang'.$id.$b.$c,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['option_text_to_end_user_lang'];
	pg_close($link);
}

function businesstexttoenduser2($id,$chid){
	$link = ConnectDB();
	pg_prepare($link,'sqltextuser2lang'.$id.$chid,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3');
	$result1 = pg_execute($link,'sqltextuser2lang'.$id.$chid,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['option_text_to_end_user_lang'];
	pg_close($link);
}

function businesstexttoenduser3($id){
	$link = ConnectDB();
	pg_prepare($link,'sqltextuser3lang'.$id,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3');
	$result1 = pg_execute($link,'sqltextuser3lang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['option_text_to_end_user_lang'];
	pg_close($link);
}

function businesstexttoenduser3_n($id,$count){
	$link = ConnectDB();
	pg_prepare($link,'sqltextuser3lang'.$id.$count,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3');
	$result1 = pg_execute($link,'sqltextuser3lang'.$id.$count,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['option_text_to_end_user_lang'];
	pg_close($link);
	}
function businessabusiness($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlabusinesslang'.$id,'SELECT * FROM w_business_meta_seo_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlabusinesslang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['abusiness_lang'];
	pg_close($link);
}

function businesspromotion($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlapromotionlang'.$id,'SELECT * FROM w_business_meta_seo_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlapromotionlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['promotion_lang'];
	pg_close($link);
}

function usersnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlausernamelang'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result1 = pg_execute($link,'sqlausernamelang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	
	pg_prepare($link,'sqlausernamelangeng'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result2 = pg_execute($link,'sqlausernamelangeng'.$id,array(1,'TRUE',$id));

	$row2 = pg_fetch_array($result2);
	if($row1['name_lang'] != null){
	return $row1['name_lang'];
	}else{
	return $row2['name_lang'];	
	}
	pg_close($link);
}

function userslastnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlauserlastnamelang'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result1 = pg_execute($link,'sqlauserlastnamelang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	
	pg_prepare($link,'sqlauserlastnamelangeng'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result2 = pg_execute($link,'sqlauserlastnamelangeng'.$id,array(1,'TRUE',$id));

	$row2 = pg_fetch_array($result2);
	if($row1['lastname_lang'] != null){
	return $row1['lastname_lang'];
	}else{
	return $row2['lastname_lang'];	
	}

	pg_close($link);
}

function userslast2namebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlauserlast2namelang'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result1 = pg_execute($link,'sqlauserlast2namelang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	
	pg_prepare($link,'sqlauserlast2namelangeng'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result2 = pg_execute($link,'sqlauserlast2namelangeng'.$id,array(1,'TRUE',$id));

	$row2 = pg_fetch_array($result2);
	if($row1['lastname2_lang'] != null){
	return $row1['lastname2_lang'];
	}else{
	return $row2['lastname2_lang'];	
	}

	pg_close($link);
}

function usersstreetbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlauserstreetlang'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result1 = pg_execute($link,'sqlauserstreetlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	
	pg_prepare($link,'sqlauserstreetlangeng'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result2 = pg_execute($link,'sqlauserstreetlangeng'.$id,array(1,'TRUE',$id));

	$row2 = pg_fetch_array($result2);
	if($row1['street_lang'] != null){
	return $row1['street_lang'];
	}else{
	return $row2['street_lang'];	
	}

	pg_close($link);
}

function businessusersstreetbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlabusinessstreetlang'.$id,'SELECT * FROM w_business_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlabusinessstreetlang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['street_lang'];
	pg_close($link);
}



function userscolonybylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlausercolonylang'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result1 = pg_execute($link,'sqlausercolonylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['colony_lang'];
	pg_close($link);
}

function usersjobbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlauserjoblang'.$id,'SELECT * FROM w_users_lang WHERE lang_id=$1 AND status=$2 AND users_id=$3');
	$result1 = pg_execute($link,'sqlauserjoblang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['job_lang'];
	pg_close($link);
}


function userscountrybylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlusercountrylang'.$id,'SELECT * FROM w_countries_lang WHERE lang_id=$1 and status=$2 AND country_id=$3');
	$result1 = pg_execute($link,'sqlusercountrylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function userscitybylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlusercitylang'.$id,'SELECT * FROM w_franchises_lang WHERE lang_id=$1 AND status=$2 AND city_id=$3');
	$result1 = pg_execute($link,'sqlusercitylang'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['city_lang'];
	pg_close($link);
}

function usersOrdercitybylang($id,$cid){
	$link = ConnectDB();
	pg_prepare($link,'sqlusercitylang555'.$id.$cid,'SELECT * FROM w_franchises_lang WHERE lang_id=$1 AND status=$2 AND city_id=$3');
	$result1 = pg_execute($link,'sqlusercitylang555'.$id.$cid,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['city_lang'];
	pg_close($link);
}


/*With fetch Different language */

function checkcategoriesexistbylang($categories,$id){
	$link = ConnectDB();
	$cat = array();
	$categories = json_decode($categories);
	//print_r($categories);
	foreach($categories as $value){
		pg_prepare($link,'sqlbusinesscatlang'.$id.$value,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3 AND business_id=$4');
		$result = pg_execute($link,'sqlbusinesscatlang'.$id.$value,array($_SESSION['l'],'TRUE',$value,$id));
		if(pg_num_rows($result)>0){
			array_push($cat, $value);
		}
	}
	if(!empty($cat)){
		return json_encode($cat);
	}else{
		$ct = '';
		return $ct;
	}

	
}

function discountofferlangbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqldiscountoffers'.$id,'SELECT * FROM w_discountoffer_lang WHERE lang_id=$1 AND status=$2 AND disoffer_id=$3');
	$result1 = pg_execute($link,'sqldiscountoffers'.$id,array($_SESSION['l'],'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['discounttext_lang'];
	pg_close($link);
}



function businesschoicenameforcheckout($id,$b,$c){
	$link = ConnectDB();
	pg_prepare($link,'sqlchoicenamelangcheck'.$id.$b.$c,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3 AND extras_id=$4');
	$result1 = pg_execute($link,'sqlchoicenamelangcheck'.$id.$b.$c,array($_SESSION['l'],'TRUE',$id,$b));
	$row1 = pg_fetch_array($result1);
	return $row1['choice_name_lang'];
	pg_close($link);
}

function businesstextuserforcheckout($id,$b){
	$link = ConnectDB();
	pg_prepare($link,'sqlchoicenamelangtestuser'.$id.$b,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3 AND extras_id=$4');
	$result1 = pg_execute($link,'sqlchoicenamelangtestuser'.$id.$b,array($_SESSION['l'],'TRUE',$id,$b));
	$row1 = pg_fetch_array($result1);
	return $row1['option_text_to_end_user_lang'];
	pg_close($link);
}

function businessoptionnameforcheckout($id,$b,$c){
	$link = ConnectDB();
	pg_prepare($link,'sqlchoicenamelangoptionname'.$id.$b.$c,'SELECT * FROM w_extras_options_lang WHERE lang_id=$1 AND status=$2 AND extras_options_id=$3 AND extras_id=$4');
	$result1 = pg_execute($link,'sqlchoicenamelangoptionname'.$id.$b.$c,array($_SESSION['l'],'TRUE',$id,$b));
	$row1 = pg_fetch_array($result1);
	return $row1['option_name_lang'];
	pg_close($link);
}




?>