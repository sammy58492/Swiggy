<? session_start();
 require('panel/config.php');
	$link = ConnectDB($CFG); 
	
	pg_prepare($link,'sqlc3',"SELECT * FROM w_lang_setting");
    $city_result = pg_execute($link,'sqlc3',array());
    $city_fetch  = pg_num_rows($city_result);
	
		
	
	?>

    
<div class="lang_combo_dv">
                  	<select class="field_lang" onchange="langidChange(this.value)">
                    <? while($row = pg_fetch_array($city_result))
	                      {
		unset($ad);
			$ad->id = $row['id'];
			$ad->lang_text = $row['lang_text'];
			$ad->opdefault = $row['opdefault'];
			
			$ad->enabled = $row['enabled'];
			$ad->ang_short_code = $row['lang_short_code'];
		    $ad->isimg = $row['isimg'];
			
			?>
            <? echo $ad->id;?>
                    	<option value="<?=$ad->id?>"  <? if($row['id'] == $_SESSION['lang']) { ?> selected="selected" <? } else if($row['opdefault'] == "1")  { ?>  selected="selected" <? } ?> ><?php echo $ad->lang_text; ?></option>
                        <?
 }
 ?> 
                    </select>
                  </div>
 
 <script>
  function langidChange(a)
 {
	 
	 
	
	 $.post("panel/lib/front-main.php", "f=langhistory&id="+a, function (f) {
	    
		
		top.location = "/"
	
					//Main.cuisines = JSON.parse(f);
				//MultipleInput.Init("cuisines",Main.cuisines, true);
			})
 }
 
 </script>
 
 
                  
                 