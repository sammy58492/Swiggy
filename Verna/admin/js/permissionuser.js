var Permissionuser = {
	sttingForm: function () {
		
		
		var admin=SiteSection.Settings.adminpermission['value'];
		//alert(JSON.stringify(admin))
		var c = "";
        Forms.Clean("permissionsettings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
		c +='<p>'
		//if(SiteSection.Settings.adminpermission['value'] == 'true'){
		if((SiteSection.Settings.adminpermission['value'] == 'true')||(SiteSection.Settings.adminpermission['value'] == '1')){	
		ap = 'checked'
		}else{
		ap = ''
		}
		c +='<input type="checkbox" id="adminpermission" '+ap+' class="switch checkbox_2 hand"/>'
		c +='<label for="adminpermission"><?=$lang_resource['ADMIN_SITESETTING_PERMISSION_ADMIN']?></label>'
		c +='</p>'
		c +='</div></div>'
		<!--col-md-6-->
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<p>'
		if((SiteSection.Settings.businesspermission['value'] == 'true')||(SiteSection.Settings.businesspermission['value'] == '1')){
		bp = 'checked'
		}else{
		bp = ''
		}
		c +='<input type="checkbox" id="businesspermission" '+bp+' class="switch checkbox_2 hand"/>'
c +='<label for="businesspermission"><?=$lang_resource['ADMIN_SITESETTING_PERMISSION_BUSINESS']?></label>'
		c +='</p>'
		c +='</div></div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
		c +='</div>'<!--config-box-->
        c +='</div>'<!--col-md-9-->
        c +='</div>'<!--row-->
		c +='</div>'
		$("#sitesetting").empty().append(c);
		
		$('#adminpermission').click(function() {
			SiteSection.UserPermission(this);
		});
		$('#businesspermission').click(function() {
			SiteSection.UserPermission(this);
		});
		
		
	},
	
	
};