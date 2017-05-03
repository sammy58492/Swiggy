<?php
if($_FILES['uploadImage']){
  $files= $_FILES['uploadImage'];
  $target_dir = "temp/";
  
  $ext = explode(".",basename($files['name']));
  $rand = mt_rand ();
  $target_file = $target_dir .$rand."_".$ext[0].".".$ext[1];
  echo $image_fle = $rand."_".$ext[0].".".$ext[1];
  $uploaded = move_uploaded_file($files['tmp_name'],$target_file);
}
if($_FILES['uploadImage1']){
  $files= $_FILES['uploadImage1'];
  $target_dir = "temp/";
  
  $ext = explode(".",basename($files['name']));
  $rand = mt_rand ();
  $target_file = $target_dir .$rand."_".$ext[0].".".$ext[1];
  echo $image_fle = $rand."_".$ext[0].".".$ext[1];
  $uploaded = move_uploaded_file($files['tmp_name'],$target_file);
}
if($_FILES['uploadImage2']){
  $files= $_FILES['uploadImage2'];
  $target_dir = "temp/";
  
  $ext = explode(".",basename($files['name']));
  $rand = mt_rand ();
  $target_file = $target_dir .$rand."_".$ext[0].".".$ext[1];
  echo $image_fle = $rand."_".$ext[0].".".$ext[1];
  $uploaded = move_uploaded_file($files['tmp_name'],$target_file);
}

if($_FILES['uploadImage3']){
  $files= $_FILES['uploadImage3'];
  $target_dir = "temp/";
  
  $ext = explode(".",basename($files['name']));
  $rand = mt_rand ();
  $target_file = $target_dir .$rand."_".$ext[0].".".$ext[1];
  echo $image_fle = $rand."_".$ext[0].".".$ext[1];
  $uploaded = move_uploaded_file($files['tmp_name'],$target_file);
}
?>
