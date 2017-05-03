<?
if (file_exists("uploader/" . $_FILES["upload"]["name"]))
{
 echo $_FILES["upload"]["name"] . " already exists please choose another image. ";
}
else
{
 move_uploaded_file($_FILES["upload"]["tmp_name"],
 "uploader/" . $_FILES["upload"]["name"]);
 echo "Stored in: " . "uploader/" . $_FILES["upload"]["name"];
}

?>