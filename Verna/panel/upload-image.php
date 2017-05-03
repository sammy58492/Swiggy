<?php
if($_FILES['uploadImage']){
  $files= $_FILES['uploadImage'];
  $target_dir = "images/temp/";
  
  $ext = explode(".",basename($files['name']));
  $rand = mt_rand ();
  $target_file = $target_dir .$rand."_".$ext[0].".".$ext[1];
  echo $image_fle = $rand."_".$ext[0].".".$ext[1];
  $uploaded = move_uploaded_file($files['tmp_name'],$target_file);
}
?>
