<?php
function fetch_user_lang($id,$link){
	pg_prepare($link,'sqluserlang'.$id,'SELECT * from w_users_lang WHERE users_id=$1 and lang_id=$2');
	$result12 = pg_execute($link,'sqluserlang'.$id,array($id,1));
	$w_users_lang_row = pg_fetch_array($result12);
	return $w_users_lang_row;
}

function fetch_city_lang($id,$link){
	pg_prepare($link,'sqlcitylang'.$id,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result16 = pg_execute($link,'sqlcitylang'.$id,array($id,1));
	$w_city_row = pg_fetch_array($result16);
	return $w_city_row['city_lang'];
}

function fetch_country_lang($id,$link){
	pg_prepare($link,'sqlcountrylang'.$id,'SELECT * from w_countries_lang WHERE country_id=$1 and lang_id=$2');
	$resultcountry = pg_execute($link,'sqlcountrylang'.$id,array($id,1));
	$w_country_row = pg_fetch_array($resultcountry);
	return $w_country_row['name_lang'];
}

function fetch_all_city_lang($id,$link){
	pg_prepare($link,'sqlallcitylang'.$id,'SELECT * from w_franchises_lang WHERE city_id=$1 and lang_id=$2');
	$result125 = pg_execute($link,'sqlallcitylang'.$id,array($id,1));
	$w_allcity_lang_row = pg_fetch_array($result125);
	return $w_allcity_lang_row;
}

function fetch_all_neighborhood_lang($id,$link){
	pg_prepare($link,'sqlallneighborhoodlang'.$id,'SELECT * from w_neighborhood_lang WHERE neighborhood_id=$1 and lang_id=$2');
	$resultnei = pg_execute($link,'sqlallneighborhoodlang'.$id,array($id,1));
	$w_neigh_lang_row = pg_fetch_array($resultnei);
	return $w_neigh_lang_row;
}
function businessnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantlang'.$id,'SELECT * FROM w_business_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlresturantlang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function businessusersstreetbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlabusinessstreetlang'.$id,'SELECT * FROM w_business_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlabusinessstreetlang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['street_lang'];
	pg_close($link);
}

function checkcategoriesexistbylang($categories,$id){
	$link = ConnectDB();
	$cat = array();
	$categories = json_decode($categories);
	//print_r($categories);
	foreach($categories as $value){
		pg_prepare($link,'sqlbusinesscatlang'.$id.$value,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3 AND business_id=$4');
		$result = pg_execute($link,'sqlbusinesscatlang'.$id.$value,array(1,'TRUE',$value,$id));
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


function businesspromotion($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlapromotionlang'.$id,'SELECT * FROM w_business_meta_seo_lang WHERE lang_id=$1 AND status=$2 AND business_id=$3');
	$result1 = pg_execute($link,'sqlapromotionlang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['promotion_lang'];
	pg_close($link);
}

function businesscuisinenamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantcategorylang'.$id,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlresturantcategorylang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function businesscustomcatenamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantcustomcategorylang'.$id,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlresturantcustomcategorylang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function FetchSubCategoryLangDefault($cid){
	$link = ConnectDB();
	pg_prepare($link,'sqldefalutlang'.$cid,'SELECT * from w_subcategories_lang WHERE subcategories_id=$1 and lang_id=$2');
	$result1 = pg_execute($link,'sqldefalutlang'.$cid,array($cid,1));
	$rows = pg_fetch_array($result1);
	return $rows['name_lang'];
}
function citynamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlcitylang'.$id,'SELECT * FROM w_franchises_lang WHERE lang_id=$1 AND status=$2 AND city_id=$3');
	$result1 = pg_execute($link,'sqlcitylang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['city_lang'];
	pg_close($link);
}
function dishidnamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantdisheslang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantdisheslang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function businessmenuprecategorynamebylang($id,$c){
	$link = ConnectDB();
	pg_prepare($link,'sqlprecategorylang'.$id.$c,'SELECT * FROM w_categories_lang WHERE lang_id=$1 AND status=$2 AND categories_id=$3');
	$result1 = pg_execute($link,'sqlprecategorylang'.$id.$c,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}
function dishiddescriptionbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantdishesdeslang'.$id,'SELECT * FROM w_dishes_lang WHERE lang_id=$1 AND status=$2 AND dishes_id=$3');
	$result1 = pg_execute($link,'sqlresturantdishesdeslang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['description_lang'];
	pg_close($link);
}

function businessreservationbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantreservelang'.$id,'SELECT * FROM w_reserve_lang WHERE lang_id=$1 AND status=$2 AND reserve_id=$3');
	$result1 = pg_execute($link,'sqlresturantreservelang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}

function businessmenunamebylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqlresturantmenulang'.$id,'SELECT * FROM w_menus_lang WHERE lang_id=$1 AND status=$2 AND menus_id=$3');
	$result1 = pg_execute($link,'sqlresturantmenulang'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['name_lang'];
	pg_close($link);
}


function discountofferlangbylang($id){
	$link = ConnectDB();
	pg_prepare($link,'sqldiscountoffers'.$id,'SELECT * FROM w_discountoffer_lang WHERE lang_id=$1 AND status=$2 AND disoffer_id=$3');
	$result1 = pg_execute($link,'sqldiscountoffers'.$id,array(1,'TRUE',$id));
	$row1 = pg_fetch_array($result1);
	return $row1['discounttext_lang'];
	pg_close($link);
}

?>