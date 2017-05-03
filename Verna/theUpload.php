<?php session_start();
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
	function getExtension($str) {
         $i = strrpos($str,".");
         if (!$i) { return ""; }
         $l = strlen($str) - $i;
         $ext = substr($str,$i+1,$l);
         return $ext;
 }
	
$link = ConnectDB();	
$name=$_POST['photoname'];
$email=$_POST['photoemail'];
$type=0;
$business=$_POST['business'];
$enabled='FALSE';



pg_prepare($link,'sqld48','SELECT * FROM w_gallery ORDER BY id DESC');
pg_prepare($link,'sqld2','INSERT INTO w_gallery (id,name,enabled,type,business) VALUES ($1,$2,$3,$4,$5)');


pg_prepare($link,'sqld48lang','SELECT * FROM w_gallery_lang ORDER BY id DESC');
pg_prepare($link,'sqld2lang','INSERT INTO w_gallery_lang (id,gallery_id,lang_id,name_lang) VALUES ($1,$2,$3,$4)');		


for ($i = 0; $i < count($_FILES['files']['name']); $i++) { 
		
		$fetch_langrecord = pg_execute($link,'sqld48lang',array());		
		 if(pg_num_rows($fetch_langrecord) == 0) { 
			$glangid = 1;
		} else { 
			$rec= pg_fetch_array($fetch_langrecord);
			$incheckprelang= $rec['id'];
			$glangid = $incheckprelang + 1;
		}
		
		
		$fetch_record = pg_execute($link,'sqld48',array());		
		 if(pg_num_rows($fetch_record) == 0) { 
			$incheck = 1;
		} else { 
			$all_rec= pg_fetch_array($fetch_record);
			$incheckpre= $all_rec['id'];
			$incheck = $incheckpre + 1;
		}
		$usid[] = $incheck;
		$root = "panel/images/gallery/";		
		$folder = $root.$incheck.'/';		
		if(!file_exists($folder)) 
		mkdir($folder);
		
		
		pg_execute($link,'sqld2',array($incheck,$name,$enabled,$type,$business));
		pg_execute($link,'sqld2lang',array($glangid,$incheck,$_SESSION['l'],$name));
		//move_uploaded_file($_FILES['files']['tmp_name'][$i], $folder.$_FILES['files']['name'][$i]);
		 
$filename = stripslashes($_FILES['files']['name'][$i]);
 	
$extension = getExtension($filename);
$extension = strtolower($extension);

if($extension=="jpg" || $extension=="jpeg" )
{
$uploadedfile = $_FILES['files']['tmp_name'][$i];
$src = imagecreatefromjpeg($uploadedfile);

}
else if($extension=="png")
{
$uploadedfile = $_FILES['files']['tmp_name'][$i];
//$src = imagecreatefrompng($uploadedfile);
$src = imagecreatefrompng($uploadedfile);

}
else 
{
$src = imagecreatefromgif($uploadedfile); // test code 
	//$src = imagecreatefromgif($uploadedfile);
}

echo $scr;
list($width,$height)=getimagesize($uploadedfile);
$newwidth=$width;
$newheight=$height;
$tmp=imagecreatetruecolor($newwidth,$newheight);


$newwidth1=205;
$newheight1=214;
$tmp1=imagecreatetruecolor($newwidth1,$newheight1);

$newwidth2=125;
$newheight2=92;
$tmp2=imagecreatetruecolor($newwidth2,$newheight2);

imagecopyresampled($tmp,$src,0,0,0,0,$newwidth,$newheight,$width,$height);

imagecopyresampled($tmp1,$src,0,0,0,0,$newwidth1,$newheight1,$width,$height);

imagecopyresampled($tmp2,$src,0,0,0,0,$newwidth2,$newheight2,$width,$height);
if($extension=="jpg" || $extension=="jpeg" )
{
$filename = $folder.'/normal.jpg';
$filename1 = $folder.'/full.jpg';
$filename2 = $folder.'/gallery.jpg';
}else if($extension=="png")
{
/*$filename = $folder.'/normal.png';
$filename1 = $folder.'/full.png';
$filename2 = $folder.'/gallery.png';*/
// change png to jpg
$filename = $folder.'/normal.jpg';
$filename1 = $folder.'/full.jpg';
$filename2 = $folder.'/gallery.jpg'; 
}
imagejpeg($tmp,$filename,100);
imagejpeg($tmp1,$filename1,100);
imagejpeg($tmp2,$filename2,100);

imagedestroy($src);
imagedestroy($tmp);
imagedestroy($tmp1);
imagedestroy($tmp2);
}

$ids=json_encode($usid);

pg_prepare($link,'sqld48pho','SELECT * FROM w_business_photos ORDER BY id DESC');
$fetch_recordp = pg_execute($link,'sqld48pho',array());		
		 if(pg_num_rows($fetch_recordp) == 0) { 
			$inc = 1;
		} else { 
			$all_recp= pg_fetch_array($fetch_recordp);
			$incpre= $all_recp['id'];
			$inc = $incpre + 1;
		}

pg_prepare($link,'sqld2photo','INSERT INTO w_business_photos (id,name,email,business_id,photos) VALUES ($1,$2,$3,$4,$5)');
pg_execute($link,'sqld2photo',array($inc,$name,$email,$business,$ids));


?>
