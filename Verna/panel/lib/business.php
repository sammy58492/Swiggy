<?php 
session_start();
require('panel-main.php');
require_once('../login/common.php');
require_authentication();

define("IS_REVIEW_ENABLED", 1);
	
switch ($_POST['f'])
	{
	case 'FetchAllBusinessData':
		FetchAllBusinessData($_POST['filters']);
	break;
	case 'DeleteBusiness':
		DeleteBusiness($_POST['data']);
	break;
	case 'SaveBusiness':
		SaveBusiness($_POST['data']);
	break;
	case 'SaveDish':
		SaveDish($_POST['data']);
	break;
	case 'DeleteDish':
		DeleteDish($_POST['data']);
	break;
	case 'getTotalPriceDish':
		getTotalPriceDish($_POST['data']);
	break;
	case 'checkslug':
		checkslug($_POST['data']);
	break;
	case 'FetchDishesDataByIds':
		GetDishesDataByIds($_POST['ids']);
	break;
	case 'FetchDishesDataByBusiness':
		GetDishesDataByBusiness($_POST['id']);
	break;
	case 'GetDishData':
		GetDishData($_POST['id']);
	break;

	case 'SaveExtra':
		SaveExtra($_POST['data']);
	break;
	case 'DeleteExtra':
		DeleteExtra($_POST['data']);
	break;
	case 'FetchExtrasDataByBusiness':
		GetExtrasDataByBusiness($_POST['id']);
	break;
	case 'FetchExtrasDataByIds':
		GetExtrasDataByIds($_POST['ids']);
	break;
	case 'GetExtraData':
		GetExtraData($_POST['id']);
	break;
	case 'SaveMenu':
		SaveMenu($_POST['data']);
	break;
	case 'DeleteMenu':
		DeleteMenu($_POST['data']);
	break;
	case 'FetchMenusDataByBusiness':
		GetMenusDataByBusiness($_POST['id']);
	break;
	case 'FetchMenusDataByIds':
		GetMenusDataByIds($_POST['ids']);
	break;
		case 'GetMenuData':
		GetMenuData($_POST['id']);
	break;
	case 'SetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'business');
	break;
	case 'MenuSetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'menus');
	break;
	case 'DishSetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'dishes');
	break;
	case 'ExtraSetEnabled':
		SetEnabled($_POST['id'],$_POST['enabled'],'extras');
	break;
	
	case 'SaveExtraChoice':
        SaveExtraChoice($_POST['data']);
        break;
    case 'GetChoice':
        GetChoice();
        break;
    case 'GetExtrasDetails':
        GetExtrasDetails($_POST['data']);
      break;
    case 'SaveExtraOptions':
        SaveExtraOptions($_POST['data']);
        break;
    case 'GetOptions':
        GetOptions($_POST['data'],$_POST['option']);
        break;
    case 'GetOptionChoices':
        GetOptionChoices($_POST['data']);
        break;
    case 'GetExtrasOptions':
        GetExtrasOptions($_POST['data']);
       break;
    case 'GetExtrasOptionsTOCopy':
        GetExtrasOptionsTOCopy($_POST['data']);
        break;
    case 'GetAllOptions':
        GetAllOptions($_POST['data']);
        break;
     case 'EditExtraOptions':
           EditExtraOptions($_POST['data']);
        break;
    case 'get_max_rank':
        get_max_rank($_POST['data']);
        break;
    case 'get_max_selection':
        get_max_selection($_POST['data']);
       break;
    case 'DeleteOptions':
        DeleteOptions($_POST['data']);
		  break;
	case 'DeleteExtraOptionsDp':
        DeleteExtraOptionsDp($_POST['id']);	
		  break;
	case 'SaveReserve':
		SaveReserve($_POST['data']);
	break;
	case 'FetchReserveDataByIds':
		GetReserveDataByIds($_POST['ids']);
	break;
	case 'FetchReserveDataByBusiness':
		GetReserveDataByBusiness($_POST['id']);
	break;
	case 'GetReserveData':
		GetReserveData($_POST['id']);
	break;	
	case 'DeleteReserve':
		DeleteReserve($_POST['data']);
	break;
	case 'FetchAllPriceData':
		FetchAllPriceData($_POST['id']);
	break;

        case 'businessCopy':
		businessCopy($_POST['id']);		
	break;


	case 'FetchCatagoriesById':
		FetchCatagoriesById($_POST['id']);
	break;
	case 'ChangeRankCat':
		ChangeRankCat($_POST['rank'],$_POST['cid'],$_POST['bid']);
	break;
	
    default:
        die();
        break;
	
	}


/********************************************GET ALL Business DATA***********************************************************************/
	
function FetchAllBusinessData($filters)
	{
	ProvidersOnly();
	switch($_SESSION['user']->level)
		{
		case '1':
			if (empty($filters))
				$filters = array();
			array_push($filters,json_decode('{"modifier":"franchise","operator":"=","name":"admin","value":'. $_SESSION['user']->id .'}'));
			array_push($filters,json_decode('{"conditional":"OR","modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
		break;
		case '2':
			if (empty($filters))
				$filters = array();
			array_push($filters,json_decode('{"modifier":"busines","operator":"=","name":"provider","value":'. $_SESSION['user']->id .'}'));
		break;
		}
	echo json_encode(GetAllBusinessData($filters));
	}

function GetAllBusinessData($filters)
	{
	$link = ConnectDB();	
	$conditionalsvalues = array();
	$query = 'SELECT w_business.id,w_business.name,w_business.enabled,w_business.twiliophone,w_business.twilioenabled,w_business.businesspagecustomtext,w_business.city as cityid, w_franchises.city as cityname,w_business.provider,w_business.reorder,w_business.feature,w_users.name as providername,w_users.lastname as providerlastname,w_users.lastname2 as providerlastname2 FROM w_business LEFT JOIN w_franchises ON w_business.city = w_franchises.id INNER JOIN w_users ON w_business.provider = w_users.id';

	if (!empty($filters))	
		{
		$conditionals = ' WHERE ';
		$count = 0;
		foreach($filters as $filter)
			{
			$conditional = '';
			if (!empty($filter->conditional))
				$conditional = ' ' . $filter->conditional . ' ';
			$modifier = 'w_' . $filter->modifier . 's.';
			$conditionals .= $conditional . $modifier . $filter->name . ' ' . $filter->operator . ' $' . ($count+1);
			array_push($conditionalsvalues,$filter->value);
			$count++;
			}
		$query .= $conditionals;
		}

	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',$conditionalsvalues);
	
	$allbusiness = array();
	while($row = pg_fetch_array($result))
		{
		unset($business);
		unset($provider);
		unset($city);
		$business->id = $row['id'];
		$business->name = $row['name'];
		$business->enabled = $row['enabled'];
		
		$business->twiliophone = $row['twiliophone'];
		$business->twilioenabled = $row['twilioenabled'];
		$business->reorder = $row['reorder'];
		$business->feature = $row['feature'];
		$business->businesspagecustomtext = $row['businesspagecustomtext'];
		if ($row['cityid']!=null)
			{
			$city->id = $row['cityid'];
			$city->name = $row['cityname'];
			}
			else
			{
			$city->id = '';
			$city->name = '';
			}
	
		$business->city = $city;

		if ($row['provider']!=null)
			{
			$provider->id = $row['provider'];
			$provider->name = $row['providername'];
			$provider->lastname = $row['providerlastname'];
			$provider->lastname2 = $row['providerlastname2'];
			}
			else
			{
			$provider->id = '';
			$provider->name = '';
			$provider->lastname = '';
			$provider->lastname2 = '';
			}

		$business->provider = $provider;
		
		array_push($allbusiness,$business);
		}

	pg_close($link);
	return $allbusiness;
	}

/********************************************DELETE Business****************************************************************/

function DeleteBusiness($data)
	{
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'business/' . $id . '/');
		if(IS_REVIEW_ENABLED == 1)
			RemoveDir($_SERVER['DOCUMENT_ROOT']."/pages/business/". $id . '/');

		pg_prepare($link,'sql','DELETE FROM w_business WHERE id=$1');
		pg_execute($link,'sql',array($id));

		//we also have to remove all the dishes extras and menus that belong to the business
		pg_prepare($link,'sql3','DELETE FROM w_menus WHERE business=$1');
		pg_execute($link,'sql3',array($id));


		pg_prepare($link,'sql4','SELECT id FROM w_dishes WHERE business=$1');
		$result = pg_execute($link,'sql4',array($id));
			while($row = pg_fetch_array($result))
				{
				RemoveDir($CFG->dirimages . 'dishes/' . $row['id'] . '/');
				pg_prepare($link,'sql5','DELETE FROM w_dishes WHERE id=$1');
				pg_execute($link,'sql5',array($row['id']));
				}

		pg_prepare($link,'sql6','SELECT id FROM w_extras WHERE business=$1');
		$result = pg_execute($link,'sql6',array($id));
			while($row = pg_fetch_array($result))
				{
				RemoveDir($CFG->dirimages . 'extras/' . $row['id'] . '/');
				pg_prepare($link,'sql7','DELETE FROM w_extras WHERE id=$1');
				pg_execute($link,'sql7',array($row['id']));
				}

		}
	pg_close($link);
	}

/*******************************************SAVE Business*********************************************************************/

function SaveBusiness($data)
	{
	ProvidersOnly();
	require('../config.php');

	$form = parse($data);
	$businessid = $form->id;
	$form->fields->customslug->value = str_replace("","-",$form->fields->customslug->value);	
	if ($form->type=='create')
		{
		     
		
		$businessid = InsertQuery('w_business',$form->fields,$CFG);	
		if (!is_dir("../../orders/".$businessid)) {
			mkdir("../../orders/".$businessid); 
			$link1 = ConnectDB($CFG);
			
		pg_prepare($link1,'sql6','SELECT value FROM w_configs WHERE name=$1');
		$result3 = pg_execute($link1,'sql6',array("siteurl"));
		$configRec  = pg_fetch_array($result3);
		$url=$configRec['value']."/orders/".$businessid.".txt";
		$url2=$configRec['value']."/confirm.php";	
		
			pg_prepare($link1,'sql1','UPDATE w_business SET pfp=$1,cfp=$2 WHERE id=$3');
			pg_execute($link1,'sql1',array($url,$url2,$businessid));
		}
    if ($form->dishes)
			{
			$link = ConnectDB($CFG);
			$ids = explode(',',$form->dishes);
			foreach($ids as $id)
				{
				pg_prepare($link,'sql','UPDATE w_dishes SET business=$1 WHERE id=$2');
				$result = pg_execute($link,'sql',array($businessid,$id));
				}
			pg_close($link);
			}	
		if ($form->extras)
			{
			$link = ConnectDB($CFG);
			$ids = explode(',',$form->extras);
			foreach($ids as $id)
				{
				pg_prepare($link,'sql','UPDATE w_extras SET business=$1 WHERE id=$2');
				$result = pg_execute($link,'sql',array($businessid,$id));
				}
			pg_close($link);
			}
		if ($form->menus)
			{
			$link = ConnectDB($CFG);
			$ids = explode(',',$form->menus);
			foreach($ids as $id)
				{
				pg_prepare($link,'sql','UPDATE w_menus SET business=$1 WHERE id=$2');
				$result = pg_execute($link,'sql',array($businessid,$id));
				}
			pg_close($link);
			}
		}
		else
		UpdateQuery('w_business',$form->fields,$form->id,$CFG);
   	 if (!is_dir("../../orders/".$businessid)) {
			mkdir("../../orders/".$businessid); 
			$link1 = ConnectDB($CFG);
			
		pg_prepare($link1,'sql6','SELECT value FROM w_configs WHERE name=$1');
		$result3 = pg_execute($link1,'sql6',array("siteurl"));
		$configRec  = pg_fetch_array($result3);
		$url=$configRec['value']."/orders/".$businessid.".txt";
		$url2=$configRec['value']."/confirm.php";	
		
			pg_prepare($link1,'sql1','UPDATE w_business SET pfp=$1,cfp=$2 WHERE id=$3');
			pg_execute($link1,'sql1',array($url,$url2,$businessid));
		}
	//check if image is sended, create destiny dir if doesnt exist
	if ($form->image)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image;
		MoveBusinessImages($CFG->dirimages . 'business/',$oldname,$businessid);
		
			$link = ConnectDB();		
			pg_prepare($link,'sql','UPDATE w_business SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql',array(1,$businessid));
			pg_close($link);
		
	    }
	    else if ($form->type=='create')
	    	{
	    	
			$link = ConnectDB();		
			pg_prepare($link,'sql','UPDATE w_business SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql',array(0,$businessid));
			pg_close($link);
		
        }
	}


/************************************************************DISH**********************************************************/

function GetDishesDataByIds($ids)
	{
	$link = ConnectDB();	

	$ids = explode(',',$ids);
	$dishes = array();

	foreach($ids as $id)
		{
		$query = 'SELECT w_dishes.name,w_dishes.enabled,w_dishes.price,w_categories.name as category FROM w_dishes LEFT JOIN w_categories ON w_dishes.category = w_categories.id  WHERE w_dishes.id=$1';
		pg_prepare($link,'sql' . $id,$query);
		$result = pg_execute($link,'sql' . $id,array($id));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				unset($dish);
				$dish->id = $id;
				$dish->name= $row['name'];
				$dish->category = $row['category'];
				$dish->price = $row['price'];
				$dish->enabled = $row['enabled'];
				array_push($dishes,$dish);
				}
		}

	echo json_encode($dishes);
	pg_close($link);
	}


function GetDishesDataByBusiness($id)
	{
	$link = ConnectDB();	
	$query = 'SELECT w_dishes.id,w_dishes.name,w_dishes.enabled,w_dishes.price,w_categories.name as category FROM w_dishes LEFT JOIN w_categories ON w_dishes.category = w_categories.id  WHERE w_dishes.business=$1';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id));
	$dishes = array();
	while($row = pg_fetch_array($result))
		{
		unset($dish);
		$dish->id = $row['id'];
		$dish->name= $row['name'];
		$dish->category = $row['category'];
		$dish->price = $row['price'];
		$dish->enabled = $row['enabled'];
		array_push($dishes,$dish);
		}
	echo json_encode($dishes);
	pg_close($link);
	}




function GetDishData($id)
	{
	ProvidersOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT * FROM w_dishes WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($dish);
			$dish->id = $id;
			$dish->name = $row['name'];
			$dish->description = $row['description'];
			$dish->ingredients = $row['ingredients'];
			$dish->extras = $row['extras'];
			$dish->price = $row['price'];
			$dish->category = $row['category'];
			$dish->isimg = $row['isimg'];
			$dish->isimg2 = $row['isimg2'];
			$dish->isimg3 = $row['isimg3'];
			$dish->feature = $row['feature'];
			}

	echo json_encode($dish);
	pg_close($link);
	}


function SaveDish($data)
	{
	ProvidersOnly();
	require('../config.php');
	$form = parse($data);
	$dishid = $form->id;
	$form->fields->extras->value = str_replace('@@@', '&',$form->fields->extras->value);
$form->fields->name->value = str_replace('@@@', '&',$form->fields->name->value);
$form->fields->name->ivalue = str_replace('@@@', '&',$form->fields->name->ivalue);
$form->fields->description->value = str_replace('@@@', '&',$form->fields->description->value);
$form->fields->description->ivalue = str_replace('@@@', '&',$form->fields->description->ivalue);
$form->fields->ingredients->value = str_replace('@@@', '&',$form->fields->ingredients->value);
$form->fields->ingredients->ivalue = str_replace('@@@', '&',$form->fields->ingredients->ivalue);
	if ($form->type=='create')
		{
		$dishid = InsertQuery('w_dishes',$form->fields,$CFG);	
		echo $dishid;
		}
		else
		UpdateQuery('w_dishes',$form->fields,$form->id,$CFG);

	//check if image is sended, create destiny dir if doesnt exist
	if ($form->image1)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image1;
		MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,false,'/1');
		//NASIM Mo.+919475635421
			$link = ConnectDB();		
			pg_prepare($link,'sql1','UPDATE w_dishes SET isimg=$1 WHERE id=$2');
			pg_execute($link,'sql1',array(1,$dishid));
			pg_close($link);
		//NASIM Mo.+919475635421	
	    }
	    else//if we didnt received image, check if its new dish, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	//$oldname = $CFG->dirimages.'dishes/dummy.jpg';
			//MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,true,'/1');
			
			//NASIM Mo.+919475635421
				pg_prepare($link,'sql1','UPDATE w_dishes SET isimg=$1 WHERE id=$2');
				pg_execute($link,'sql1',array(0,$dishid));
				pg_close($link);
			//NASIM Mo.+919475635421
	    	}

	if ($form->image2)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image2;
		MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,false,'/2');
		//NASIM +919475635421
			$link = ConnectDB();		
			pg_prepare($link,'sql2','UPDATE w_dishes SET isimg2=$1 WHERE id=$2');
			pg_execute($link,'sql2',array(1,$dishid));
			pg_close($link);
		//NASIM +919475635421
	    }
	    else//if we didnt received image, check if its new dish, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	//$oldname = $CFG->dirimages.'dishes/dummy.jpg';
			//MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,true,'/2');
		//NASIM +919475635421
			$link = ConnectDB();		
			pg_prepare($link,'sql2','UPDATE w_dishes SET isimg2=$1 WHERE id=$2');
			pg_execute($link,'sql2',array(0,$dishid));
			pg_close($link);
		//NASIM +919475635421
	    	}

	if ($form->image3)
		{
		$oldname = $CFG->dirimages.'temp/'.$form->image3;
		MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,false,'/3');
		//NASIM +919475635421
			$link = ConnectDB();		
			pg_prepare($link,'sql3','UPDATE w_dishes SET isimg3=$1 WHERE id=$2');
			pg_execute($link,'sql3',array(1,$dishid));
			pg_close($link);
		//NASIM +919475635421
	    }
	    else//if we didnt received image, check if its new dish, if so, copy the dummy image to his profile
	    if ($form->type=='create')
	    	{
	    	//$oldname = $CFG->dirimages.'dishes/dummy.jpg';
			//MoveImages($CFG->dirimages . 'dishes/',$oldname,$dishid,true,'/3');
			//NASIM +919475635421
				$link = ConnectDB();			
				pg_prepare($link,'sql3','UPDATE w_dishes SET isimg3=$1 WHERE id=$2');
				pg_execute($link,'sql3',array(0,$dishid));
				pg_close($link);
			//NASIM +919475635421
	    	}
	}

function DeleteDish($data)
	{
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);	
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'dishes/' . $id . '/');
		pg_prepare($link,'sql' . $id,'DELETE FROM w_dishes WHERE id=$1');
		$result = pg_execute($link,'sql' . $id,array($id));
		}
	pg_close($link);
	}

/******************************************************************/


function DeleteExtra($data)
	{
	ProvidersOnly();
	require('../config.php');
	$link = ConnectDB($CFG);		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		RemoveDir($CFG->dirimages . 'extras/' . $id . '/');
		pg_prepare($link,'sql','DELETE FROM w_extras WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));	
		}
	pg_close($link);
	}




/************************************************************/

function GetMenusDataByIds($ids)
	{
	$link = ConnectDB();	

	$ids = explode(',',$ids);
	$menus = array();

	foreach($ids as $id)
		{
		$query = 'SELECT name,days,dishes,comments,enabled FROM w_menus WHERE id=$1';
		pg_prepare($link,'sql',$query);
		$result = pg_execute($link,'sql',array($id));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				unset($menu);
				$menu->id = $id;
				$menu->name = $row['name'];
				$menu->days = $row['days'];
				$menu->dishes= $row['dishes'];
				$menu->comments = $row['comments'];
				$menu->enabled = $row['enabled'];
				array_push($menus,$menu);
				}
		}

	echo json_encode($menus);
	pg_close($link);
	}


function GetMenusDataByBusiness($id)
	{
	$link = ConnectDB();	
	$query = 'SELECT id,name,days,dishes,comments,enabled FROM w_menus WHERE business=$1';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id));
	$menus = array();
	while($row = pg_fetch_array($result))
		{
		unset($menu);
		$menu->id = $row['id'];
		$menu->name = $row['name'];
		$menu->days = $row['days'];
		$menu->dishes= $row['dishes'];
		$menu->comments = $row['comments'];
		$menu->enabled = $row['enabled'];
		array_push($menus,$menu);
		}
	echo json_encode($menus);
	pg_close($link);
	}


function GetMenuData($id)
	{
	if(IS_REVIEW_ENABLED == 1)
		ProvidersOnly();
	else
		ProvidersOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT name,days,dishes,comments,schedule,pickup,delivery FROM w_menus WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($menu);
			$menu->id = $id;
			$menu->name = $row['name'];
			$menu->days = $row['days'];
			$menu->dishes= $row['dishes'];
			$menu->comments = $row['comments'];
			$menu->schedule = $row['schedule'];
			$menu->pickup = $row['pickup'];
			$menu->delivery = $row['delivery'];
			}

	echo json_encode($menu);
	pg_close($link);
	}


function SaveMenu($data)
	{
	ProvidersOnly();

	$form = parse($data);
	$menuid = $form->id;
	
	if ($form->type=='create')
		{
		$menuid = InsertQuery('w_menus',$form->fields);	
		echo $menuid;
		}
		else
		UpdateQuery('w_menus',$form->fields,$form->id);
	}


function DeleteMenu($data)
	{
	ProvidersOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
		pg_prepare($link,'sql','DELETE FROM w_menus WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
		}
	pg_close($link);
	}


/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveBusinessImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
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
		else
		{
		copy($oldname,$finalname);
		if ($dummy!=true)
			unlink($oldname);
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
	}


/***************************************CREATE FOLDER AND IMAGES IF NEEDED***************************/

function MoveImages($root,$oldname,$usrid,$dummy=false,$innerfolder='')
	{
	$folder = $root .$usrid.$innerfolder.'/';
	$finalname = $folder.'original.jpg';
	
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);

	$ext_arr = split("\.",$form->image);
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


function CreatePage($usrid,$form)
{

 
	$folder = $_SERVER['DOCUMENT_ROOT']."/pages/business/".$usrid;
	$finalname = $folder.'/index.php';
  
  
	if(preg_match('/[.]/', $folder)) die();

	if(!file_exists($folder)) 
		mkdir($folder, 0777,true);   
  
  
 
  $addfile = $_SERVER['DOCUMENT_ROOT']."/panel/lib/panel-review.php";
  $template = $_SERVER['DOCUMENT_ROOT']."pages/business/Template.php"; 
	$file = fopen($finalname, "w+");
	$phpfile = file_get_contents("../../pages/business/Template.php");
  $archivo  = "<?php \n";
  $archivo .= 'require ("'.$addfile.'");'."\n";
  $archivo .= '$orden = $_GET["order"];'."\n".'$orden_array = GetReviewData($orden);';
  $archivo .= "\n".'if($orden_array->count==1) {
				?>
					<script>
					alert("The order does not exist !");
					var url_part=document.location.href.split("/");
					var url_complete = "http://"+url_part[2];
					location.href = url_complete;
					</script>
				<?php
				}
	';
  $archivo .= '$business ='.$usrid.';'."\n";
  $archivo .= '$city = GetBusinessCity('.$form->city->value.');'."\n";
  $archivo .= '$average_array = GetReviewDataAvg('.$usrid.');'."\n";
  $archivo .= '$paymentDetails = GetPaymentDetails('.$usrid.');'."\n";
  $archivo .= '$average = round($average_array->total);'."\n";
  $archivo .= 'for($i=0;$i<5;$i++){'."\n";
  $archivo .= 'if ($average>=1){'."\n";
  $archivo .= '$stars[$i] = "star2";'."\n";
  $archivo .= '$average = $average - 1;';
  $archivo .= ' }'."\n".'else';
  $archivo .= '$stars[$i] = "star1";'."\n".'}'."\n";
  $archivo .= '$business_addres ="'.$form->street->value.' '.$form->colony->value.'";'."\n";
  $archivo .= '$business_name = "'.$form->name->value.'";';
  $archivo .= 'if($orden_array->count > 0)'."\n".'{'."\n".'error();}';
  $archivo .= 'function error(){'."\n";
  $archivo .= 'echo "<script languaje=\"javascript\">'."\n";
  $archivo .= ' alert(\"Expired link!\");'."\n";
  $archivo .= 'var url_part=document.location.href.split(\"/\");'."\n";
  $archivo .= 'var url_complete = \"http://\"+url_part[2];'."\n";
  $archivo .= 'location.href = url_complete;'."\n";
  $archivo .= '</script>";'."\n";
  $archivo .= '}?>';
  $archivo .= '<html><head>'."\n";
  $archivo .= '<title><?echo $business_name;?></title>';
	$archivo .= '<link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,700,800"/>'."\n";
	$archivo .= '<link href="http://'.$_SERVER["HTTP_HOST"]."/panel/js/rating.css".'" rel="stylesheet" type="text/css"/>'."\n";
	$archivo .= '<link type="text/css" rel="stylesheet" href="http://'.$_SERVER["HTTP_HOST"]."/panel/theme/front.php?v=1.3.2".'"/>'."\n";
	$archivo .= '<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>'."\n";
	$archivo .= '<script type="text/javascript" src="http://'.$_SERVER["HTTP_HOST"]."/panel/js/review.js".'"></script>'."\n";
	$archivo .= '<script type="text/javascript" src="http://'.$_SERVER["HTTP_HOST"]."/panel/js/jquery.js".'"></script>'."\n";
  $archivo .= '<Meta Name="Keywords" Content="'.$form->mkeywords->value.'">';
  $archivo .= '<META NAME="description" CONTENT="'.$form->mdescription->value.'"> ';
  $archivo .= '<meta name="title" content="'.$form->name->value.'">';
	
	fwrite($file,$archivo);  
  fwrite($file,$phpfile);
  fclose($file);  
  
}
        
    
function SetEnabled($id,$enabled,$type)
	{
	ProvidersOnly();
	
	$link = ConnectDB();		
	$data = parse($data);
	pg_prepare($link,'sql','UPDATE w_'.$type.' SET enabled=$1 WHERE id=$2');
	if (pg_execute($link,'sql',array($enabled,$id)))
		echo 'ok';
	pg_close($link);
	}
function getTotalPriceDish($data){
	require('../config.php');
	$link = ConnectDB();	
	$form = parse($data);
	$dishid = $form->id;
	$dish_extras=$form->fields->dish_extras->value;
	$dish_price=$form->fields->dish_price->value;
	$dish_extarseArr=json_decode($dish_extras,true);
	$total=0;
	if(!empty($dish_extarseArr)){
	foreach($dish_extarseArr as $key1=>$val1){
		$query = 'SELECT * FROM w_extras_options WHERE set_id=$1';
		pg_prepare($link,'sqlexop'.$key1,$query);
		$result_fetchs = pg_execute($link,'sqlexop'.$key1,array($val1));
		while($r_fetchs = pg_fetch_array($result_fetchs)){
		
			$total+=$r_fetchs["price"];
		}
		
	}
	}
		$total+=$dish_price;
	
	echo $total;
}

function checkslug($data)
	{
		$data = parse($data);
		/*
		echo $data->fields->customslug->value;
		echo $data->id;
		exit();*/
		
	//ProvidersOnly();
	
	$link = ConnectDB();	
	$lang = $data->fields->customslug->value;
	pg_prepare($link,'sql','SELECT * FROM w_business WHERE customslug=$1');
	$final = pg_execute($link,'sql',array($lang));
	
	$rec = pg_num_rows($final);
	if($data->fields->customslug->value == $data->fields->customslug->ivalue)
	{
		$rec = $rec-1;
	}
	
	
     if($rec > 0)
		{
			echo "cancel";
		}
	 else {
		 
		   echo "okay";
		}	
		
	
	}	

/********************************************product option***********************************************************************/

function SaveExtraChoice($data){
    ProvidersOnly();
    require('../config.php');
    session_start();
    $link = ConnectDB($CFG);
    /*pg_prepare($link,'sql1',"SELECT nextval('w_extras_id_seq') as key");
  $result = pg_execute($link,'sql1',array());*/
    $form = parse($data);
    $i=0;
    $temp=null;

    $set_id=$_SESSION['set_id'];
    $ch=0;
    if($form->rank==1)
    {

    foreach ($form->fields as $t) {
        if($t->value != "null"){

                if($i==0)
                    $temp->name->value=$t->value;
                if($i==1)
                {
                    $temp->price->value=$t->value;
                    $temp->option_id->value=$form->option_id;
                    $temp->set_id->value=$form->set_id;
                    $extradetailsid = InsertQuery('w_choices',$temp,$CFG);
                    $temp=null;
                    $i=-1;
                    }
                $i++;
            }
        }
    }

   else if($form->rank>=2)
            {
                $temp_array=null;
                  $i=0;
              foreach ($form->fields as $t) {
              if($t->value!="null")
                 $temp_array[]=$t->value;

              }

    for($j=0;$j<count($temp_array);$j++){
        $name=$temp_array[$j];
    for($ch=0;$ch<count($form->chooice_array);$ch++)
    {
        $temp->name->value=$name;
        $temp->option_id->value=$form->option_id;
        $temp->set_id->value=$form->set_id;
        $temp->with_respect_to->value=$form->chooice_array[$ch];
        $temp->price->value=$temp_array[++$j];
        $extradetailsid = InsertQuery('w_choices',$temp,$CFG);
        /*if($j==0)*/

        /* if($j==1)*/
        //   $temp->price->value=$t->value;
      //  $temp->option_id->value=$form->option_id;
        $temp=null;


    }

    }
 }


    /*   if($i==1)
        $temp->option_text_to_end_user->value=$t->value;
    if($i==2)
        $temp->num_choice->value=$t->value;
    if($i==3){
        $temp->rank->value=$t->value;

        $i=-1;
        $temp->set_id->value=$set_id;
        $extradetailsid = InsertQuery('w_extras_details',$temp,$CFG);
        $temp=null;
    }
    $i++;*/



}
function GetChoice(){
    ProvidersOnly();
    require('../config.php');
    session_start();
    $id=$_SESSION['set_id'];

    $link = ConnectDB();
    $query = 'SELECT option_name,num_choice,set_id,rank,id FROM w_extras_details WHERE set_id=$1 ORDER BY rank ASC';
    pg_prepare($link,'sql5',$query);
    $result = pg_execute($link,'sql5',array($id));
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
            unset($menu);
            $menu->option_name = $row['option_name'];
            $menu->num_choice = $row['num_choice'];
            $menu->set_id = $row['set_id'];
            $menu->rank = $row['rank'];
            $menu->option_id=$row['id'];
            array_push($menus,$menu);
        }

    echo json_encode($menus);
    pg_close($link);

}
function GetExtrasDetails($set_id)
{

    require('../config.php');
    session_start();

    $link = ConnectDB();
    $query = 'SELECT set_id,id,option_name,option_text_to_end_user FROM w_extras_details WHERE set_id=$1';
    pg_prepare($link,'sql',$query);
    $result = pg_execute($link,'sql',array($set_id));
    $extras = array();
    while($row = pg_fetch_array($result))
    {
        unset($extra);
        $extra->id = $row['id'];
        $extra->option_name= $row['option_name'];
        $extra->set_id = $row['set_id'];
        array_push($extras,$extra);
    }
        echo json_encode($extras);
        pg_close($link);

}
function SaveExtraOptions($data)
{
    ProvidersOnly();
    require('../config.php');
    session_start();
    $temp_array=null;
    $form = parse($data);
	
    $seting_id = $form->set_id;
	
	//print_r($form->fields);
	
    $num_choices=$form->num_choices;
    $temp_array=null;
    $option_id=get_max_option_id($form->set_id);
    $choice_id=get_max_choice_id();

    if($option_id == null)
        $option_id=1;
    else
        $option_id++;
    if($choice_id == null)
        $choice_id=1;
    else
        $choice_id++;

    for($j=0;$j<count($form->choice_array);$j++){
        $temp=null;
        $with_respect=null;
		
        if($form->choice_array[$j] != -1)
        {

            foreach ($form->fields as $t=>$val) {

             if($t=="extra_option_name")
             {

               echo $temp->option_name->value=$val->value;

             }
            else if($t=="extra_choice_name".$j){
             echo   $temp->choice_name->value=$val->value;}
            else if($t=="extra_price".$j)
                $temp->price->value=$val->value;
            else if($t=="extra_rank")
                $temp->rank->value=$val->value;
            else if($t=="extra_option_text_to_end_user")
                $temp->option_text_to_end_user->value=$val->value;
            else if($t=="extra_conditional")
            {
                if($val->value==0)
                $temp->conditional->value="no";
                else
                $temp->conditional->value="yes";
            }
            else if($t=="extra_with_respect_to_option")
            {
                $with_respect .=$val->value.',';

            }
          else if($t=="extra_with_respect_to_choice")
           {
               $with_respect .=$val->value;
               $temp->with_respect_to->value=$with_respect;
           }
             else if($t=="extra_max_sel"){
                 $temp->max_sel->value=$val->value;
             }
             else if($t=="extra_min_sel"){
                 $temp->min_sel->value=$val->value;
             }
             else if($t=="extra_ingredients"){
                 $temp->ingredients->value=$val->value;
             }

        }
        $temp->set_id->value=$form->set_id;
        $temp->option_id->value=$option_id;
        $temp->choice_id->value=$choice_id;
        $choice_id++;


        $extradetailsid = InsertQuery('w_extras_options',$temp,$CFG);
      }
    }
    echo $seting_id;
	exit();
}
function GetOptions($set_id,$option_id)
{
	
    ProvidersOnly();
    require('../config.php');
   
    $link = ConnectDB();
	
    $query = 'SELECT DISTINCT option_id FROM w_extras_options where set_id=$1 ORDER BY option_id ASC';
	$queryeach = 'SELECT * FROM w_extras_options where option_id=$1';
	
	//,option_name,choice_name,choice_id,set_id,rank
    pg_prepare($link,'sql7',$query);
	pg_prepare($link,'sql77',$queryeach);
    $result = pg_execute($link,'sql7',array($set_id));
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
            unset($menu);
			if($row['option_id'] != $option_id) {
			$results = pg_execute($link,'sql77',array($row['option_id']));
			$final = pg_fetch_array($results);
            $menu->option_name = $final['option_name'];
            $menu->option_id = $final['option_id'];
			$menu->choice_name = $final['choice_name'];
            $menu->choice_id = $final['choice_id'];
            $menu->set_id = $final['set_id'];
            $menu->rank = $final['rank'];
            $menu->id=$final['id'];
			/*$with_respect  = $row['with_respect_to'];
			$with_respect1 = explode(" ", $with_respect);
			$menu->with_respect_to =$with_respect1[0];
			$menu->with_respect_to1= $with_respect1[1];*/
			
            array_push($menus,$menu);
			}
        }

    echo json_encode($menus);
    pg_close($link);
}

function GetOptionChoices($option_id)
{
    ProvidersOnly();

    require('../config.php');
    session_start();
    $link = ConnectDB();
    $query = 'SELECT  choice_name,choice_id FROM w_extras_options  WHERE option_id=$1 ORDER BY choice_id ASC';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array($option_id));
    $menus = array();
    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {
            unset($menu);
            $menu->choice_name = $row['choice_name'];
            $menu->choice_id = $row['choice_id'];

            array_push($menus,$menu);
        }

    echo json_encode($menus);
    pg_close($link);
}


function GetExtrasOptions($set_id){
    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT option_id,set_id,id,option_name FROM w_extras_options WHERE set_id=$1 ORDER BY id';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($set_id));
    $options = array();
    $option=null;
    while($row = pg_fetch_array($result))
    {
        unset($option);

        $option->name=$row['option_name'];
        $option->option_id=$row['option_id'];
        $option->set_id=$set_id;

        array_push($options,$option);
    }
    $new_arr=array();
    $new_arr = array_unique($options, SORT_REGULAR);


   echo json_encode($new_arr);

    pg_close($link);
}

function GetExtrasOptionsTOCopy($data){
    ProvidersOnly();
    require('../config.php');
    $copy=null;
    $copy=parse($data);
    $copy=$copy[0];

    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($copy->set_id,$copy->id));

    $option=null;
    $temp=null;
    $copy_option_id=get_max_option_id($copy->set_id);
    $copy_choice_id=get_max_choice_id();
    $copy_option_id++;

    while($row = pg_fetch_array($result))
    {
        $copy_choice_id++;
        unset($option);
        $temp->set_id->value=$row['set_id'];
        $temp->option_id->value=$copy_option_id;
        $temp->option_name->value=$row['option_name'].'_'.$copy_option_id;
        $temp->choice_id->value=$copy_choice_id;
        $temp->choice_name->value=$row['choice_name'];
        $temp->with_respect_to->value=$row['with_respect_to'];
        $temp->conditional->value=$row['conditional'];
        $temp->copy->value=1;
        $temp->price->value=$row['price'];
        $temp->rank->value=$row['rank'];
        $temp->max_sel->value=$row['max_sel'];
        $temp->min_sel->value=$row['min_sel'];
        $temp->option_text_to_end_user->value=$row['option_text_to_end_user'];
        $extradetailsid = InsertQuery('w_extras_options',$temp,$CFG);
        $temp=null;

    }

}


function GetAllOptions($data){
    ProvidersOnly();
    require('../config.php');
    $copy=null;
    $copy=parse($data);
    $copy=$copy[0];

    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($copy->set_id,$copy->id));
    $options=Array();
    while($row = pg_fetch_array($result))
    {
        unset($option);
        $option->option_name=$row['option_name'];
        $option->option_id=$row['option_id'];
        $option->id=$row['id'];
        $option->set_id=$copy->set_id;
        $option->choice_name=$row['choice_name'];
        $option->choice_id=$row['choice_id'];
        $option->with_respect_to=$row['with_respect_to'];
        $option->conditional=$row['conditional'];
        $option->copy=$row['copy'];
        $option->price=$row['price'];
        $option->rank=$row['rank'];
        $option->option_text_to_end_user=$row['option_text_to_end_user'];
        $option->ingredients=$row['ingredients'];
        $option->min_sel=$row['min_sel'];
        $option->max_sel=$row['max_sel'];
        array_push($options,$option);
    }
    echo json_encode($options);

    pg_close($link);

}

function EditExtraOptions($data){
    ProvidersOnly();
    require('../config.php');
	$link = ConnectDB();
    session_start();
    $temp_array=null;
    $form = parse($data);
    $num_choices=$form->num_choices;
    $temp_array=null;
    $flag=0;
	$query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2';
	pg_prepare($link,'sqlp11',$query);
	$result_fetchs = pg_execute($link,'sqlp11',array($form->set_id,$form->option_id));
	$r_fetchs = pg_fetch_array($result_fetchs);
	$old_respect_options = explode(",",$r_fetchs['with_respect_to']);
	//print_r($old_respect_options);
	
    for($j=0;$j<$num_choices;$j++){
        $temp=null;
        $temp_save=null;
        $ids=$form->choice_array[$j];
        $flag=0;
        $with_respect=null;
        if($form->choice_array[$j] != -1)
        {

        foreach ($form->fields as $t=>$val) {
            if($t=="option_name")
            {
                $temp->option_name->value=$val->value;
            }
            else if($t=="choice_update_name".$ids)
                $temp->choice_name->value=$val->value;
            else if($t=="choice_save_name".$ids){
                $flag=1;
                $temp_save->choice_name->value=$val->value;
            }
            else if($t=="price_update".$ids)
                $temp->price->value=$val->value;
            else if($t=="price_save".$ids){
                  $flag=1;
                $temp_save->price->value=$val->value;
            }
            else if($t=="rank")
                $temp->rank->value=$val->value;
            else if($t=="option_text_to_end_user")
                $temp->option_text_to_end_user->value=$val->value;
            else if($t=="conditional")
            {
                if($val->value==0)
                    $temp->conditional->value="no";
                else
                    $temp->conditional->value="yes";
            }
            else if($t=="with_respect_to_option")
            {
				if($val->value ==""){
					
						$with_respect .= $old_respect_options[0].',';
					}
				else {
					$with_respect .=$val->value.',';
					}	
                
				

            }
            else if($t=="with_respect_to_choice")
            {
				if($val->value ==""){
					
						$with_respect .=$old_respect_options[1];
						$temp->with_respect_to->value=$with_respect;
					}
				
				else {
					$with_respect .=$val->value;
					$temp->with_respect_to->value=$with_respect;
					}	
               
            }
            else if($t=="min_sel")
            {
                $temp->min_sel->value=$val->value;

            }
            else if($t=="max_sel")
            {
                $temp->max_sel->value=$val->value;
            }
            else if($t=="ingredients")
            {
                $temp->ingredients->value=$val->value;
            }
        }
        $temp->set_id->value=$form->set_id;
        $temp->option_id->value=$form->option_id;
        $temp_save->set_id->value=$form->set_id;
        $temp_save->option_id->value=$form->option_id;
			
        $extradetailsid = UpdateQuery('w_extras_options',$temp,$ids,$CFG);
		
       if($flag==1)
        SaveEditExtraOptions($temp_save,$ids);

        }
		
        foreach ($form->choice_delete_array as $id) {
			
          //  DeleteExtraOptionsDp($id);
        }

   }

    echo json_encode($form->set_id);
}
function get_max_rank($set_id)
{
    require('../config.php');
   unset($unique_option);
    $option_id=null;
    $link = ConnectDB();
    $query = 'SELECT * FROM w_extras_options where set_id=$1';
    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array($set_id));
    $menus = array();
    if (pg_num_rows($result)>0) 
        while($row = pg_fetch_array($result))
        {
			$unique_option[] = $row["option_id"];
			$arr_option = array_unique($unique_option, SORT_REGULAR);
            $option_id=count($arr_option);
        }


    pg_close($link);
    echo json_encode($option_id);
}

function get_max_selection($data)
{
    require('../config.php');

    $ids=parse($data);

    $ids=$ids[0];
    $count=0;
    $link = ConnectDB();
    $query = 'SELECT count(choice_name)  FROM w_extras_options where set_id=$1 AND option_id=$2';

    pg_prepare($link,'sql8',$query);
    $result = pg_execute($link,'sql8',array($ids->set_id,$ids->option_id));

    if (pg_num_rows($result)>0)
        while($row = pg_fetch_array($result))
        {

            $count=$row['count'];
        }


    pg_close($link);
    echo json_encode($count);
}

function get_max_option_id($set_id)
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
function DeleteOptions($ids){
    ProvidersOnly();
    require('../config.php');
    session_start();
    $temp_array=null;
    $form = parse($ids);
    $link = ConnectDB($CFG);

    if(!empty($form[0]->id))
    {

        pg_prepare($link,'sql1','DELETE FROM w_extras_options WHERE option_id=$1 AND set_id=$2');
        $result = pg_execute($link,'sql1',array($form[0]->id,$form[0]->set_id));

    }
    pg_close($link);

}

function MakeCopy($result)
{
    $temp=null;

    $set_id=$_SESSION['set_id'];
    while($row = pg_fetch_array($result))
    {


      /*  unset($option);

        $option->name=$row['option_name'];
        $option->option_id=$row['option_id'];
        $option->set_id=$set_id;

        array_push($options,$option);*/
        /*
        unset($extra);
        $extra->id = $row['id'];
        $extra->set= $row['set'];
        $extra->name = $row['set'];
        $extra->mrank = $row['mrank'];
        $extra->enabled = $row['enabled'];
        array_push($extras,$extra);*/
    }

    /*foreach ($form->fields as $t) {
        if($i==0)
            $temp->option_name->value=$t->value;
        if($i==1)
            $temp->option_text_to_end_user->value=$t->value;
        if($i==2)
            $temp->num_choice->value=$t->value;
        if($i==3){
            $temp->rank->value=$t->value;

            $i=-1;
            $temp->set_id->value=$set_id;
            $extradetailsid = InsertQuery('w_extras_details',$temp,$CFG);
            $temp=null;
        }
        $i++;
    }*/
}
function GetAllOptionsEdits($set_id,$option_id){
    ProvidersOnly();
    require('../config.php');

    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT * FROM w_extras_options WHERE set_id=$1 AND option_id=$2';
    pg_prepare($link,'sql10',$query);
    $result = pg_execute($link,'sql10',array($set_id,$option_id));
    $options=Array();
    while($row = pg_fetch_array($result))
    {
        unset($option);
        $option->option_name=$row['option_name'];
        $option->option_id=$row['option_id'];
        $option->id=$row['id'];
        $option->set_id=$row['set_id'];
        $option->choice_name=$row['choice_name'];
        $option->choice_id=$row['choice_id'];
        $option->with_respect_to=$row['with_respect_to'];
        $option->conditional=$row['conditional'];
        $option->copy=$row['copy'];
        $option->price=$row['price'];
        $option->rank=$row['rank'];
        $option->option_text_to_end_user=$row['option_text_to_end_user'];
        $option->min_sel=$row['min_sel'];
        $option->max_sel=$row['max_sel'];
        $option->ingredients=$row['ingredients'];
         array_push($options,$option);
    }

      return($options);
    pg_close($link);

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
function SaveEditExtraOptions($temp,$ids)
{
    ProvidersOnly();
    require('../config.php');
    session_start();
    $temp1=null;
    $result=GetAllOptionsEdits($temp->set_id->value,$temp->option_id->value);

    // print_r($result[0]->option_name);

    $temp1->option_name->value=$result[0]->option_name;
    $temp1->option_text_to_end_user->value=$result[0]->option_text_to_end_user;
    $temp1->choice_name->value=$temp->choice_name->value;
    $temp1->price->value=$temp->price->value;
    $temp1->conditional->value=$result[0]->conditional;
    $temp1->copy->value=$result[0]->copy;
    $temp1->with_respect_to->value=$result[0]->with_respect_to;
    $temp1->set_id->value=$temp->set_id->value;
    $temp1->rank->value=$result[0]->rank;
    $temp1->min_sel->value=$result[0]->min_sel;
    $temp1->max_sel->value=$result[0]->max_sel;
    $temp1->ingredients->value=$result[0]->ingredients;
    $choice_id=get_max_choice_id();
    if($choice_id == null)
        $choice_id=1;
    else
        $choice_id++;
    $temp1->option_id->value=$temp->option_id->value;
    $temp1->choice_id->value=$choice_id;
    $extradetailsid = InsertQuery('w_extras_options',$temp1,$CFG);
}
function DeleteExtraOptionsDp($id)
{
   
    require('../config.php');
    $link = ConnectDB($CFG);
   
    if(!empty($id))
    {
    
           pg_prepare($link,'sqlli'.$id,'DELETE FROM w_extras_options WHERE id=$1');
           $result = pg_execute($link,'sqlli'.$id,array($id));
    }
	
   echo $id;
}

function DeleteExtraOptions($set_id)
{
    
    require('../config.php');
    $link = ConnectDB($CFG);
    //$data = parse($data);
    if(!empty($set_id))
    {
      /*  foreach ($data->ids as $id)
        {
      */   //   RemoveDir($CFG->dirimages . 'extras/' . $id . '/');
            pg_prepare($link,'sql1','DELETE FROM w_extras_options WHERE set_id=$1');
            $result = pg_execute($link,'sql1',array($set_id));
//        }
    }
    pg_close($link);
}

/********************************************product option***********************************************************************/
function GetExtraData($id)
{
    ProvidersOnly();
    $link = ConnectDB();
    pg_prepare($link,'sql','SELECT set,text_to_end_user,description,mrank FROM w_extras WHERE id=$1');
    $result = pg_execute($link,'sql',array($id));

    if (pg_num_rows($result)==1)
        while($row = pg_fetch_array($result))
        {
            unset($extra);
            $extra->id = $id;
            $extra->name = $row['name'];
            $extra->set = $row['set'];
            $extra->mrank = $row['mrank'];
            $extra->text_to_end_user = $row['text_to_end_user'];
        }

    echo json_encode($extra);
    pg_close($link);
}

function SaveExtra($data)
{
    ProvidersOnly();
    require('../config.php');
    session_start();
    $form = parse($data);
    $extraid = $form->id;
    if ($form->type=='create')
    {
        $extraid = InsertQuery('w_extras',$form->fields,$CFG);
        echo $extraid;
        $_SESSION['set_id']=$extraid;
    }
    else
        UpdateQuery('w_extras',$form->fields,$form->id,$CFG);

    //check if image is sended, create destiny dir if doesnt exist
    if ($form->image)
    {
        $oldname = $CFG->dirimages.'temp/'.$form->image;
        MoveImages($CFG->dirimages . 'extras/',$oldname,$extraid);
    }
    else//if we didnt received image, check if its new dish, if so, copy the dummy image to his profile
        if ($form->type=='create')
        {
            $oldname = $CFG->dirimages.'extras/dummy.jpg';
            MoveImages($CFG->dirimages . 'extras/',$oldname,$extraid,true);
        }
}
function GetExtrasDataByIds($ids)
{
    $link = ConnectDB();

    $ids = explode(',',$ids);
    $extras = array();

    foreach($ids as $id)
    {
        $query = 'SELECT name,description,price,enabled FROM w_extras WHERE id=$1';
        pg_prepare($link,'sql' . $id,$query);
        $result = pg_execute($link,'sql' . $id,array($id));
        if (pg_num_rows($result)==1)
            while($row = pg_fetch_array($result))
            {
                unset($extra);
                $extra->id = $id;
                $extra->name= $row['name'];
                $extra->description = $row['description'];
                $extra->price = $row['price'];
                $extra->enabled = $row['enabled'];
                array_push($extras,$extra);
            }
    }

    echo json_encode($extras);
    pg_close($link);
}

function GetExtrasDataByBusiness($id)
{
    $link = ConnectDB();
    /*$query = 'SELECT w_extras.set,w_extras.id,w_extras.name,w_extras.mrank,w_extras.price,w_extras.enabled,w_extras_options.option_name FROM w_extras JOIN w_extras_options  ON w_extras.id = w_extras_options.set_id WHERE w_extras.business=$1';*/
    $query = 'SELECT set,id,name,mrank,price,enabled FROM w_extras WHERE business=$1';
    pg_prepare($link,'sql',$query);
    $result = pg_execute($link,'sql',array($id));
    $extras = array();
    while($row = pg_fetch_array($result))
    {

        unset($extra);
        $extra->id = $row['id'];
        $extra->set= $row['set'];
        $extra->name = $row['set'];
        $extra->mrank = $row['mrank'];
        $extra->enabled = $row['enabled'];
       array_push($extras,$extra);
    }
   echo json_encode($extras);
    pg_close($link);
}

/********************************************************************RESERVE************************************************************************/	
function SaveReserve($data){
	ProvidersOnly();
	$form = parse($data);
	$menuid = $form->id;

	if ($form->type=='create')
		{
		$menuid = InsertQuery('w_reserve',$form->fields);	
		echo $menuid;
		}
		else
		UpdateQuery('w_reserve',$form->fields,$form->id);
}

function GetReserveDataByIds($ids)
	{
	$link = ConnectDB();	

	$ids = explode(',',$ids);
	$reserve = array();

	foreach($ids as $id)
		{
		$query = 'SELECT name,days,rtype,guest,enabled FROM w_reserve WHERE id=$1';
		pg_prepare($link,'sql',$query);
		$result = pg_execute($link,'sql',array($id));
		if (pg_num_rows($result)==1)  
			while($row = pg_fetch_array($result))
				{
				unset($rese);
				$rese->id = $id;
				$rese->name = $row['name'];
				$rese->days = $row['days'];
				$rese->rtype= $row['rtype'];
				if($row['rtype'] == 1)
				$rese->rtyped="Table";
				if($row['rtype'] == 2)
				$rese->rtyped="Room";
				if($row['rtype'] == 3)
				$rese->rtyped="Free";				
				$rese->guest = $row['guest'];
				$rese->enabled = $row['enabled'];
				array_push($reserve,$rese);
				}
		}

	echo json_encode($reserve);
	pg_close($link);
	}
	
function GetReserveDataByBusiness($id)
	{
	$link = ConnectDB();	
	$query = 'SELECT id,name,days,rtype,guest,enabled FROM w_reserve WHERE business=$1';
	pg_prepare($link,'sql',$query);
	$result = pg_execute($link,'sql',array($id));
	$reserve = array();
	while($row = pg_fetch_array($result))
		{
		unset($rese);
		$rese->id = $row['id'];
		$rese->name = $row['name'];
		$rese->days = $row['days'];
		$rese->rtype= $row['rtype'];
		$rese->rtyped="Table";
				if($row['rtype'] == 2)
				$rese->rtyped="Room";
				if($row['rtype'] == 3)
				$rese->rtyped="Free";
		$rese->guest = $row['guest'];
		$rese->enabled = $row['enabled'];
		array_push($reserve,$rese);
		}
	echo json_encode($reserve);
	pg_close($link);
	}

function GetReserveData($id)
	{
	if(IS_REVIEW_ENABLED == 1)
		ProvidersOnly();
	else
		ProvidersOnly();
	$link = ConnectDB();		
	pg_prepare($link,'sql','SELECT name,days,schedule,rtype,guest,duration FROM w_reserve WHERE id=$1');
	$result = pg_execute($link,'sql',array($id));

	if (pg_num_rows($result)==1)  
		while($row = pg_fetch_array($result))
			{
			unset($rese);
			$rese->id = $id;
			$rese->name = $row['name'];
			$rese->days = $row['days'];
			$rese->schedule = $row['schedule'];
			$rese->duration = $row['duration'];
			$rese->rtype= $row['rtype'];
			$rese->guest = $row['guest'];
			
			}

	echo json_encode($rese);
	pg_close($link);
	}

	function DeleteReserve($data)
	{
	ProvidersOnly();
	$link = ConnectDB();		
	$data = parse($data);
	foreach ($data->ids as $id)
		{
			if(is_numeric($id)) {
		pg_prepare($link,'sql','DELETE FROM w_reserve WHERE id=$1');
		$result = pg_execute($link,'sql',array($id));
			}
		
		}
	pg_close($link);
	}
function FetchAllPriceData($id)
{
	$link = ConnectDB();	
	$prices = array();
	unset($price);
	$query = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql1',$query);
	$result = pg_execute($link,'sql1',array($id,1));
	$row = pg_fetch_array($result);
	
	$query1 = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql2',$query1);
	$result1 = pg_execute($link,'sql2',array($id,2));
	$row1 = pg_fetch_array($result1);
	
	$query2 = 'SELECT * FROM w_reserve_chart WHERE business=$1 and rtype=$2';
	pg_prepare($link,'sql3',$query2);
	$result2 = pg_execute($link,'sql3',array($id,3));
	$row2 = pg_fetch_array($result2);
	
	$price->tableprice= $row['price'];
	$price->roomprice= $row1['price'];
	$price->freeprice= $row2['price'];

	array_push($prices,$price);
	
	echo json_encode($prices);
	pg_close($link);
}

function MoveBusinessImages_backup($root,$oldname)
	{
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
function businessCopy($oid) {
	$link = ConnectDB();	
	
	/**************************************old dish_record Fetch*******************************************/
	$querMRD = 'SELECT id,dishes FROM w_menus WHERE business = $1';
	pg_prepare($link,'sqls2',$querMRD);
	$resultMRD = pg_execute($link,'sqls2',array($oid));
	while($recordMRD = pg_fetch_array($resultMRD)) {
		
		$id = $recordMRD['id'];
		$recirdOldMenuDish[$id] = $recordMRD['dishes'];
	
	}
	
					 
					
					 
					

	/**************************************old dish_record Fetch*******************************************/
	
	
	    
	
	$query = 'SELECT * FROM w_business WHERE id = $1';
	pg_prepare($link,'sql1',$query);
	$resultBus = pg_execute($link,'sql1',array($oid));
	$record = pg_fetch_object($resultBus);
	/***********************************************BUSINESS*********************************************************/
    $newbid = businessInsertBody($record,'w_business');
			  $pathMain = "/home/tequilanock/webapps/oos_beta/panel/images/business/". $newbid."/"; //new
			  $path =    "/home/tequilanock/webapps/oos_beta/panel/images/business/".$oid."/"; //old
			  $oldname =  $path."original.jpg";
			  MoveBusinessImages_backup($pathMain,$oldname);
	
	
	/***********************************************BUSINESS*********************************************************/
	
	
	/***********************************************Extra*********************************************************/		
		$link = ConnectDB();	
	
	$queryEx = 'SELECT * FROM w_extras WHERE business = $1';
	pg_prepare($link,'sqlEx1',$queryEx);
	
	
	$resultEx = pg_execute($link,'sqlEx1',array($oid));
	
	//echo pg_num_rows($resultD);
	$exs = 0;
	while($record_extras = pg_fetch_object($resultEx)) {
		
		
		 $old_extra_id = $record_extras->id;
		 
		 $newExtraId = BElementInsertBody($record_extras,'w_extras',$newbid,'business',$exs,$link);
		 $oldextra[$old_extra_id] = $newExtraId;
		 
		 $exs++;
		}
	
	
	
	
	
	
	foreach($oldextra as $key =>  $val )	
	{
		$link = ConnectDB();	
		
		$queryExo = 'SELECT * FROM w_extras_options WHERE set_id = $1';
		pg_prepare($link,'sqlExo'.$key,$queryExo);	
		$extra_option_val = pg_execute($link,'sqlExo'.$key,array($key));
		$exs =0;
		
		while($record_extras_options = pg_fetch_object($extra_option_val)) {
		
		
		/* $old_extra_id = $record_extras->id;*/
		 
		 $newExtraId = BElementInsertBody($record_extras_options,'w_extras_options',$val,'set_id',$exs,$link);
		// $oldextras[$old_extra_id] = $newExtraIds;
		 
		 $exs++;
		}
		
		
		
	}
		
		
		
	
	/***********************************************Extra option*********************************************************/	
	
	/***********************************************DISH*********************************************************/
	$link = ConnectDB();	
	
	$queryD = 'SELECT * FROM w_dishes WHERE business = $1';
	pg_prepare($link,'sqldi1',$queryD);
	$resultD = pg_execute($link,'sqldi1',array($oid));
	
	//echo pg_num_rows($resultD);
	$rdish = 0;
	while($record_dish = pg_fetch_object($resultD)) {
					
						unset($ExRec);
						unset($newRec);
					    
						if($record_dish->extras !="") {
						$old_extra_dish_record = json_decode($record_dish->extras);
						if(count($old_extra_dish_record) > 0) {
							
							foreach($old_extra_dish_record as $dishrec2) {
								$newRec[]= $oldextra[$dishrec2];
								
							}
							
							
							}
						$final_dish_extra = json_encode($newRec);
						}
						else {
							
						$final_dish_extra = "";	
							}
						
		
		 	  $dishnwid = BElementInsertBodyDish($record_dish,'w_dishes',$newbid,'business',$rdish,$link,$final_dish_extra);
		 	  $arrd[]  = $dishnwid;
			  
			  /*********************************MENU DISH INTERCHANGE*****************************/
			 foreach($recirdOldMenuDish as $key=>$recval)
						{
			
			
					$Menurcord = json_decode($recval);
					
					
					if(in_array($record_dish->id,$Menurcord)){
						
						$seach_key = array_search($record_dish->id, $Menurcord);
						$Menurcord[$seach_key] = $dishnwid;
						
						
						}
					$recirdOldMenuDish[$key]	= json_encode($Menurcord);
		             }

 			 /*********************************MENU DISH INTERCHANGE*****************************/
			  
			   $path =    "/home/tequilanock/webapps/oos_beta/panel/images/dishes/".$record_dish->id."/1/"; //old
			   $oldname =  $path."original.jpg";
			  if(file_exists($oldname)) 
			  {
			  $pathMain = "/home/tequilanock/webapps/oos_beta/panel/images/dishes/". $dishnwid."/1/"; //new
			  MoveBusinessImages_backup($pathMain,$oldname);
			  }
			  $path =    "/home/tequilanock/webapps/oos_beta/panel/images/dishes/".$record_dish->id."/2/"; //old
			   $oldname =  $path."original.jpg";
			  if(file_exists($oldname)) 
			  {
			  $pathMain = "/home/tequilanock/webapps/oos_beta/panel/images/dishes/". $dishnwid."/2/"; //new
			  MoveBusinessImages_backup($pathMain,$oldname);
			  }
			  $path =    "/home/tequilanock/webapps/oos_beta/panel/images/dishes/".$record_dish->id."/3/"; //old
			   $oldname =  $path."original.jpg";
			  if(file_exists($oldname)) 
			  {
			  $pathMain = "/home/tequilanock/webapps/oos_beta/panel/images/dishes/". $dishnwid."/3/"; //new
			  MoveBusinessImages_backup($pathMain,$oldname);
			  }
			  
		$rdish++;
		}
	/***********************************************DISH*********************************************************/	
	/***********************************************MENU*********************************************************/		
		$link = ConnectDB();	
	
	$queryM = 'SELECT * FROM w_menus WHERE business = $1';
	pg_prepare($link,'sqlMi1',$queryM);
	$resultM = pg_execute($link,'sqlMi1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Mdish = 0;
	while($record_menus = pg_fetch_object($resultM)) {
		
		 $arrM[] = BElementInsertBodyMenu($record_menus,'w_menus',$newbid,'business',$Mdish,$link,$recirdOldMenuDish);
		$Mdish++;
		}
		
		
	
	/***********************************************MENU*********************************************************/	
	/***********************************************RESERVE*********************************************************/		
		$link = ConnectDB();	
	
	$queryR = 'SELECT * FROM w_reserve WHERE business = $1';
	pg_prepare($link,'sqlRi1',$queryR);
	$resultR = pg_execute($link,'sqlRi1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Rdish = 0;
	while($record_reserve = pg_fetch_object($resultR)) {
		
		 $arrRsv[] = BElementInsertBody($record_reserve,'w_reserve',$newbid,'business',$Rdish,$link);
		$Rdish++;
		}
		
		
	
	/***********************************************RESERVE*********************************************************/	
	
	/***********************************************INVOICE*********************************************************/		
		$link = ConnectDB();	
	
	$queryIn = 'SELECT * FROM w_invoice WHERE businessi = $1';
	pg_prepare($link,'sqlIn1',$queryIn);
	$resultIn = pg_execute($link,'sqlIn1',array($oid));
	
	//echo pg_num_rows($resultD);
	$Indish = 0;
	while($record_invoice = pg_fetch_object($resultIn)) {
		
		 $arrInv[] = BElementInsertBody($record_invoice,'w_invoice',$newbid,'businessi',$Indish,$link);
		 $Indish++;
		}
		
		
	
	/***********************************************INVOICE*********************************************************/	
	
	

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
	
function BElementInsertBody($record,$table,$newbid,$mcolm,$ck,$link) {
	
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
function BElementInsertBodyDish($record,$table,$newbid,$mcolm,$ck,$link,$extras) {
	
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
				}
			else if($key == "extras") {
				array_push($values,$extras);
				}	
			else {
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
function BElementInsertBodyMenu($record,$table,$newbid,$mcolm,$ck,$link, $newMenu) {
	
	$link = ConnectDB();	
	$id = -1;
	
	$old_menu_id = $record->id;
	
	

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
			} else if($key == "dishes") {	
			   array_push($values,$newMenu[$old_menu_id]);
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


function DeleteDishImage($dish_id,$imgno)
{
	
	$link = ConnectDB();
	
	if($imgno==1)	
	{
	$query = 'UPDATE w_dishes SET isimg=0 WHERE id=$1';
	$path =    "/home/tequilanock/webapps/oos_beta/panel/images/dishes/".$dish_id."/1/"; 
	@unlink($path."medium.jpg");
	@unlink($path."mini.jpg");
	@unlink($path."minigray.jpg");
	@unlink($path."original.jpg");
	@unlink($path."panel.jpg");
	@unlink($path."small.jpg");
	@unlink($path."smallgray.jpg");
	}
	else if($imgno==2){
	$query = 'UPDATE w_dishes SET isimg2=0 WHERE id=$1';
	$path =    "/home/tequilanock/webapps/oos_beta/panel/images/dishes/".$dish_id."/2/"; 
	@unlink($path."medium.jpg");
	@unlink($path."mini.jpg");
	@unlink($path."minigray.jpg");
	@unlink($path."original.jpg");
	@unlink($path."panel.jpg");
	@unlink($path."small.jpg");
	@unlink($path."smallgray.jpg");
	
	}
	else if($imgno==3) {	
	$query = 'UPDATE w_dishes SET isimg3=0 WHERE id=$1';

	$path =    "/home/tequilanock/webapps/oos_beta/panel/images/dishes/".$dish_id."/3/"; 
	@unlink($path."medium.jpg");
	@unlink($path."mini.jpg");
	@unlink($path."minigray.jpg");
	@unlink($path."original.jpg");
	@unlink($path."panel.jpg");
	@unlink($path."small.jpg");
	@unlink($path."smallgray.jpg");
	
	}
	
	pg_prepare($link,'sqldishimg',$query);
	if(pg_execute($link,'sqldishimg',array($dish_id)))
	{
	  echo "ok";	
	}
	else
	{
	  echo "nk";	
	}
	
}


function FetchCatagoriesById($id){
	$link = ConnectDB();
	$fcats = array();
	$query = 'SELECT DISTINCT category,rank_cat FROM w_dishes WHERE business=$1 order by rank_cat ASC';
	pg_prepare($link,'sql_fc',$query);
	$result = pg_execute($link,'sql_fc',array($id));
	
	while($row = pg_fetch_array($result)){
		unset($fcat);
		$fcat->category = $row['category']; 
		$fcat->category_name = catname($row['category']);
		$fcat->rank_cat = $row['rank_cat']; 
	
		array_push($fcats,$fcat);
	}
	echo json_encode($fcats);
	//pg_close($link);
}

function ChangeRankCat($rank,$cid,$bid){
	$link = ConnectDB();
	
	$fcats = array();
	$query = 'SELECT DISTINCT category,rank_cat FROM w_dishes WHERE business=$1 order by rank_cat ASC';
	pg_prepare($link,'sql_fca',$query);
	$result = pg_execute($link,'sql_fca',array($bid));
	
	$i = 0;
	while($row = pg_fetch_array($result)){
		
		$fcats[$i]['category'] = $row['category']; 
		$fcats[$i]['rank_cat'] = $row['rank_cat']; 
	
		$i++;
	}
	
	$query = 'SELECT rank_cat FROM w_dishes WHERE rank_cat=$1 and business =$2 ';
	pg_prepare($link,'sql_fchek',$query);
	$result = pg_execute($link,'sql_fchek',array($rank,$bid));

	if(pg_num_rows($result)==0){
		$query = 'UPDATE w_dishes SET rank_cat=$1 WHERE category=$2 and business=$3';
		pg_prepare($link,'sql_crcq'.$rank,$query);
		pg_execute($link,'sql_crcq'.$rank,array($rank,$cid,$bid)); 
	}else{
		
		$i = 0;
		foreach($fcats as $fct){			
			if($fct['rank_cat'] == $rank){
				break;
			}else{
				$i++;
			}
		}
		$source_index = $i;		
		foreach($fcats as $fct){			
			if($fct['category'] == $cid){
				$rankvalueprev = $fct['category'];
			}
		}
		if($rankvalueprev == 0){
			foreach ($fcats as $key => $value) {			
				if($key >= $source_index){				
					$fcats[$key]['rank_cat'] = $value['rank_cat'] +1;
				}
			}	

			foreach ($fcats as $key => $value) {
				if($value['category'] == $cid){
					$fcats[$key]['rank_cat'] = $rank;
				}
			}
		}else {
			foreach ($fcats as $key => $value) {
				if($value['rank_cat'] == $rank){
					$dest_index = $key;
				}
				if($value['category'] == $cid){
					$source_index = $key;
				}
			}
			/*echo $source_index;
			echo $dest_index;*/
			
			if($source_index < $dest_index){
				$j= sizeof($fcats) - 1;
				foreach (array_reverse($fcats) as $key => $value) {						
					if($j > $source_index && $j <= $dest_index){				
						$fcats[$j]['rank_cat'] = $value['rank_cat'] - 1;
					}
					$j--;
				}
				$fcats[$source_index]['rank_cat'] = $rank;
			}else if($source_index > $dest_index){	
				$j= sizeof($fcats) - 1;			
				foreach ($fcats as $key => $value) {						
					if($key < $source_index && $key >= $dest_index){				
						$fcats[$key]['rank_cat'] = $value['rank_cat'] + 1;
					}					
				}
				$fcats[$source_index]['rank_cat'] = $rank;
			}
		}
				
		$query = 'UPDATE w_dishes SET rank_cat=$1 WHERE category=$2 and business=$3';
		pg_prepare($link,'sql_crcq',$query);
		foreach($fcats as $fc){
			$rank = $fc['rank_cat'];
			$cid = $fc['category'];						
			pg_execute($link,'sql_crcq',array($rank,$cid,$bid));	
		}

	}
}
function ChangeRankCat1($rank,$cid,$bid){
	$link = ConnectDB();
	
	$fcats = array();
	$query = 'SELECT DISTINCT category,rank_cat FROM w_dishes WHERE business=$1 order by rank_cat ASC';
	pg_prepare($link,'sql_fca',$query);
	$result = pg_execute($link,'sql_fca',array($bid));
	
	$query = 'UPDATE w_dishes SET rank_cat=$1 WHERE category=$2 and business=$3';
	pg_prepare($link,'sql_crcq',$query);
	pg_execute($link,'sql_crcq',array($rank,$cid,$bid));
	
	$query = 'SELECT rank_cat FROM w_dishes WHERE category=$1 and business =$2 ';
	pg_prepare($link,'sql_fchek',$query);
	$result = pg_execute($link,'sql_fchek',array($cid,$bid));
	$rowchk= pg_fetch_array($result);
	$rankvalue = $rowchk['rank_cat'];
		
		
	while($row = pg_fetch_array($result)){
		
		if($cid !=  $row['category']) {
				unset($fcat);
				$fcat->category = $row['category']; 
				$fcat->rank_cat = $row['rank_cat'];
				array_push($fcats,$fcat);
		}
	
		
	}
	
	$query = 'UPDATE w_dishes SET rank_cat=$1 WHERE category=$2 and business=$3';
	pg_prepare($link,'sqlrandom',$query);
	$c=1;
	$k = 0;
	foreach($fcats as $set) {
		/*if($rankvalue > $set->rank_cat || 	$rank < $set->rank_cat) {
				$k=$c;
				pg_execute($link,'sqlrandom',array(($k -1),$set->category,$bid));
				
		} else*/ 
		if($set->rank_cat >= $rank) {
			
			    pg_execute($link,'sqlrandom',array(($k +1),$set->category,$bid));
		
		}
		else {
			
			    pg_execute($link,'sqlrandom',array(($k),$set->category,$bid));
			
			}
		
		$c++;
		}
	
	
}
function catname($id){
	$link = ConnectDB();
	$query = 'SELECT * FROM w_categories WHERE id=$1';
	$sqla = 'sql_fcan'.$id;
	pg_prepare($link,$sqla,$query);
	$result = pg_execute($link,$sqla,array($id));
	$row = pg_fetch_array($result);
	pg_close($link);
	return $row['name'];
	
}
	
?>
