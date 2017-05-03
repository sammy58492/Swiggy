var ShoppingCustom = {
	ShoppingTest: function (){
    },
	AscendingByName : function () {
		alert("aa")
		 	var dishasc= new Object();
			
			var dishasc_new= new Array();
			var E = "name";
			
			
			 for (var x in Shopping.MenuSubLists) {
				var cname =  Shopping.MenuSubLists[x].name;
					dishasc[cname] = new Array();
			
				 }
             
				for (var v in Shopping.Menu2.dishes) {
					
					var ctname = Shopping.Menu2.dishes[v].catname;
					if(dishasc[ctname])
					dishasc[ctname].push(Shopping.Menu2.dishes[v]);
					
					}
					
				for (var xx in Shopping.MenuSubLists) {
					var cnames =  Shopping.MenuSubLists[xx].name;
					
					dishasc[cnames].sort(Main.SortByProperty(E));
					
					dishasc_new = dishasc_new.concat(dishasc[cnames]);
					
			
				 }	
				
		return dishasc_new;
		}, 
	 
	 catalogMenu: function (f)
	{
		  //Time selection settings. 
	time_format="<?=$lang_resource['TIME_FORMAT']?>";
		var catl = JSON.parse(f);
			catl.sort(Main.SortByProperty("openclosetime"));
		var n = '';
		
		
		
		for (x in catl)
            {
			   var p = JSON.parse(catl[x].days); 
			   for(dd in p) {
				  
					n +='<tr>'
					n +='<td>'+ catl[x].name+'</td>'
					n +='<td>'+weekendName(p[dd])+'</td>'
					  //Time selection settings. 
					   if(time_format=="12"){
							closetime1='';
							opentime1='';
							opentime=new Array();
							closetime=new Array();
							openclosetime=new Array();
							openclosetime1='';
							openclosetime=catl[x].openclosetime.split("-");
							opentime=openclosetime[0].split(":");
							closetime=openclosetime[1].split(":");
							opentime1= Main.convertTimeFormat(opentime[0],opentime[1]);
							
							closetime1= Main.convertTimeFormat(closetime[0],closetime[1]);
							
							
							openclosetime1=opentime1+'-'+closetime1;
				   }else{
					   closetime1='';
							opentime1='';
							opentime=new Array();
							closetime=new Array();
							openclosetime=new Array();
							openclosetime1='';
							openclosetime=catl[x].openclosetime.split("-");
							closetime=openclosetime[1].split(":");
					if(closetime[0] >= 24){
							opentime1=openclosetime[0];
							closetime1= Main.convertTimeFormatTOAM(closetime[0],closetime[1]);
							openclosetime1=opentime1+'-'+closetime1;
				
					}else{
					   openclosetime1=catl[x].openclosetime;
					}
				   }
					n +='<td>'+openclosetime1+'</td>'
					n +='</tr>'
		   }
				 
				
			}
		
		document.getElementById("catlogview").innerHTML = n;
	},
	 
	 
	 Photogallery : function(f) {
		 f = JSON.parse(f);
		var k = "";
		var cnt =1;
		for (x in f)
            {
			if(cnt %3 == 1)	{
			k +='<ul class="info_photo_gallery">'
			}
			k +='<li><a href="javascript:void(0)"><img src="panel/images/gallery/'+f[x].id+'/gallery.jpg"></a></li>'
			
			if(cnt %3 == 0)	{
			k +='</ul>'
			}
			cnt ++;
			}
		if(viewDevice == "Desktop") {
		if(k=="")	
		$("#photo_div").css("display","none");
		else
		document.getElementById("infophotpdiv").innerHTML  = k;
		}else{
		if(k==""){
		$("#photo_div").css("display","none");
		$("#photo_div_text").css("display","none");
		}
		else
		document.getElementById("infophotpdiv").innerHTML  = k;
		}
		
	},
	
	videogallery : function (f) {
		 f = JSON.parse(f);
		var k = "";
		for (x in f)
            {
		k +='<li>'+f[x].link+'</li>';
		//k +='<a href="#" style="float:left;">'+f[x].link+'</a>'
				}
				
		if(viewDevice == "Desktop") {
		if(k=="")	
		$("#video_div").css("display","none");
		else	
		document.getElementById("infovideodiv").innerHTML  = k;
		}else{
			if(k==""){	
			$("#video_div").css("display","none");
			$("#video_div_text").css("display","none");
			}
			else	
			document.getElementById("infovideodiv").innerHTML  = k;
		}
		$("iframe").css({"width": "100%"});
		},
		
		FuncOffer : function (f) {
		 f = JSON.parse(f);
		var n = "";

	    if(f.length == 0) {
		n +='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="offer_tbl"><tr><td colspan="4" align="center"><?= $lang_resource['NOOFFER_V21'] ?></td>';
		n +='</tr></table>';
		} else {
		n ='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="offer_tbl"><thead>';
		n +='<tr >';
		n +='<th align="left" width="35%" style="padding-bottom: 5px" ><?= $lang_resource['OFFERN_V21'] ?></th>';
		n +='<th align="left" width="25%" style="padding-bottom: 5px" ><?= $lang_resource['OFFERP_V21'] ?></th>';
		n +='<th align="left" width="20%" style="padding-bottom: 5px" ><?= $lang_resource['STARTD_V21'] ?></th>';
		n +='<th align="left" width="20%" style="padding-bottom: 5px" ><?= $lang_resource['ENDD_V21'] ?></th>';
		n +='</tr>';
		n +='</thead>';
		var count = 0; 
		for (var x in f) {
		count = count + 1;
		n +='<tr>';
		n +='<td>'+f[x].discounttext+'</td>';
		n +='<td>'+f[x].rate+'</td>';
		n +='<td>'+f[x].startdate+'</td>';
		n +='<td>'+f[x].enddate+'</td>';
		n +='</tr>';
		
		}
		n +='</table>';
		}

		document.getElementById("dicountContent").innerHTML  = n;
		
		
		if(count){
		document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['OFFERS_V21']?> ("+count+")";
		}
		else{
			count = 0;
			document.getElementById("offerCountText").innerHTML = "<?=$lang_resource['OFFERS_V21']?> ("+count+")";
		}
		},
	 
};