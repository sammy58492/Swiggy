var Superadminsettings = {
	sttingForm: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
		c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_SITE_NAME']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "sitename",SiteSection.Settings.sitename['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
		c +='</div></div>'
		<!--col-md-6-->
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_SITE_URL']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "siteurl",SiteSection.Settings.siteurl['value'], true, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div></div>'
        <!--col-md-6-->
        c +='</div>'
		<!--row-->
                               
        c +='<div class="row">'
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_HELP_PAGE_LINK']?> </label>'
        c +=Forms.CreateInputPropertySettings("settings", "helppagelink",SiteSection.Settings.helppagelink['value'], false, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div></div>'
        
		<!--col-md-6-->
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_META_KEYWORDS']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "analyticscode",SiteSection.Settings.analyticscode['value'], false, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div></div>'
       	<!--col-md-6-->
        c +='</div>'
		<!--row--> 
		var a11 = new Array({
            id: "Kwajalein",
            caption: "International Date Line West (GMT-12:00)"
        },{
                id: "America/Anchorage",
                caption: "Alaska (GMT-9)"
        },{
            id: "Pacific/Honolulu",
            caption: "Hawaii (GMT-10:00)"
        }, {
            id: "America/Los_Angeles",
            caption: "Pacific Time (US &amp; Canada) (GMT-08:00)"
        }, {
            id: "America/Tijuana",
            caption: "Tijuana, Baja California (GMT-08:00)"
        }, {
            id: "America/Denver",
            caption: "Mountain Time (US &amp; Canada) (GMT-07:00)"
        }, {
            id: "America/Chihuahua",
            caption: "Chihuahua (GMT-07:00)"
        }, {
        	id:"Europe/Netherlands",
        	caption:"Netherlands (GMT+01:00)"
        }, {
            id: "America/Mazatlan",
            caption: "Mazatlan (GMT-07:00)"
        }, {
            id: "America/Phoenix",
            caption: "Arizona (GMT-07:00)"
        }, {
            id: "Europe/London",
            caption: "London (GMT+00:00)"
        }, {
            id: "America/Tegucigalpa",
            caption: "Central America (GMT-06:00)"
        }, {
            id: "America/Chicago",
            caption: "Central Time (US &amp; Canada) (GMT-06:00)"
        }, {
            id: "America/Mexico_City",
            caption: "Mexico City (GMT-06:00)"
        }, {
            id: "America/Monterrey",
            caption: "Monterrey (GMT-06:00)"
        }, {
            id: "America/New_York",
            caption: "Eastern Time (US &amp; Canada) (GMT-05:00)"
        }, {
            id: "America/Bogota",
            caption: "Bogota (GMT-05:00)"
        }, {
            id: "America/Lima",
            caption: "Lima (GMT-05:00)"
        }, {
            id: "America/Rio_Branco",
            caption: "Rio Branco (GMT-05:00)"
        }, {
            id: "America/Indiana/Indianapolis",
            caption: "Indiana (East) (GMT-05:00)"
        }, {
            id: "America/Caracas",
            caption: "Caracas (GMT-04:30)"
        }, {
            id: "America/Halifax",
            caption: "Atlantic Time (Canada) (GMT-04:00)"
        }, {
            id: "America/Manaus",
            caption: "Manaus (GMT-04:00)"
        }, {
            id: "America/Santiago",
            caption: "Santiago (GMT-04:00)"
        }, {
            id: "America/La_Paz",
            caption: "La Paz (GMT-04:00)"
        }, {
            id: "America/St_Johns",
            caption: "Newfoundland (GMT-03:30)"
        }, {
            id: "America/Argentina/Buenos_Aires",
            caption: "Buenos Aires (GMT-03:00)"
        }, {
            id: "America/Sao_Paulo",
            caption: "Brasilia (GMT-03:00)"
        }, {
            id: "America/Godthab",
            caption: "Greenland (GMT-03:00)"
        }, {
            id: "America/Montevideo",
            caption: "Montevideo (GMT-03:00)"
        }, {
            id: "Europe/Madrid",
            caption: "Madrid (GMT+01:00)"
        }, {
            id: "Europe/Paris",
            caption: "Paris (GMT+01:00)"
        },  {
            id: "Asia/Kolkata",
            caption: "India (GMT+05:30)"
        },  {
            id: "Pacific/Fiji",
            caption: "Fiji (GMT+12:00)"
        }, {
            id: "Etc/GMT-11",
            caption: "GMT -11 (GMT-11:00)"
        }, {
            id: "Etc/GMT-9",
            caption: "GMT -9 (GMT-09:00)"
        }, {
            id: "Etc/GMT-2",
            caption: "GMT -2 (GMT-02:00)"
        }, {
            id: "Etc/GMT-1",
            caption: "GMT -1 (GMT-01:00)"
        }, {
                id: "Africa/Windhoek",
                caption: "GMT +2 (GMT+02:00)"
            }, {
                id: "Asia/Riyadh",
                caption: "GMT +3 (GMT+03:00)"
            }, {
                id: "Asia/Yerevan",
                caption: "GMT +4 (GMT+04:00)"
            }, {
                id: "Asia/Karachi",
                caption: "GMT +5 (GMT+05:00)"
            }, {
                id: "Asia/Dhaka",
                caption: "GMT +6 (GMT+06:00)"
            }, {
                id: "Asia/Jakarta",
                caption: "GMT +7 (GMT+07:00)"
            }, {
                id: "Asia/Singapore",
                caption: "GMT +8 (GMT+08:00)"
            }, {
                id: "Asia/Seoul",
                caption: "GMT +9 (GMT+09:00)"
            }, {
                id: "Australia/Melbourne",
                caption: "GMT +10 (GMT+10:00)"
            }, {
                id: "Asia/Magadan",
                caption: "GMT +11 (GMT+11:00)"
            });


		          var b = [{id:'',caption:'Please select'},
{id:'ALL',caption:'Albania Lek (Lek)'},
{id:'AFN',caption:'Afghanistan Afghani (؋)'},
{id:'ARS',caption:'Argentina Peso ($)'},
{id:'AWG',caption:'Aruba Guilder (ƒ)'},
{id:'AUD',caption:'Australia Dollar ($)'},
{id:'AZN',caption:'Azerbaijan New Manat (ман)'},
{id:'BSD',caption:'Bahamas Dollar ($)'},
{id:'BBD',caption:'Barbados Dollar ($)'},
{id:'BYR',caption:'Belarus Ruble (p.)'},
{id:'BZD',caption:'Belize Dollar (BZ$)'},
{id:'BMD',caption:'Bermuda Dollar ($)'},
{id:'BOB',caption:'Bolivia Boliviano ($b)'},
{id:'BAM',caption:'Bosnia and Herzegovina Convertible Marka (KM)'},
{id:'BWP',caption:'Botswana Pula (P)'},
{id:'BGN',caption:'Bulgaria Lev (лв)'},
{id:'BRL',caption:'Brazil Real (R$)'},
{id:'BND',caption:'Brunei Darussalam Dollar ($)'},
{id:'KHR',caption:'Cambodia Riel (៛)'},
{id:'CAD',caption:'Canada Dollar ($)'},
{id:'KYD',caption:'Cayman Islands Dollar ($)'},
{id:'CLP',caption:'Chile Peso ($)'},
{id:'CNY',caption:'China Yuan Renminbi (¥)'},
{id:'COP',caption:'Colombia Peso ($)'},
{id:'CRC',caption:'Costa Rica Colon (₡)'},
{id:'HRK',caption:'Croatia Kuna (kn)'},
{id:'CUP',caption:'Cuba Peso (₱)'},
{id:'CZK',caption:'Czech Republic Koruna (Kč)'},
{id:'DKK',caption:'Denmark Krone (kr)'},
{id:'DOP',caption:'Dominican Republic Peso (RD$)'},
{id:'XCD',caption:'East Caribbean Dollar ($)'},
{id:'EGP',caption:'Egypt Pound (Egp)'},
{id:'SVC',caption:'El Salvador Colon ($)'},
{id:'EEK',caption:'Estonia Kroon (kr)'},
{id:'EUR',caption:'Euro Member Countries (€)'},
{id:'FKP',caption:'Falkland Islands (Malvinas) Pound (£)'},
{id:'FJD',caption:'Fiji Dollar ($)'},
{id:'FCFA',caption:'Franc (CFA)'},
{id:'GHC',caption:'Ghana Cedi (¢)'},
{id:'GIP',caption:'Gibraltar Pound (£)'},
{id:'GTQ',caption:'Guatemala Quetzal (Q)'},
{id:'GGP',caption:'Guernsey Pound (£)'},
{id:'GYD',caption:'Guyana Dollar ($)'},
{id:'HNL',caption:'Honduras Lempira (L)'},
{id:'HKD',caption:'Hong Kong Dollar ($)'},
{id:'HUF',caption:'Hungary Forint (Ft)'},
{id:'ISK',caption:'Iceland Krona (kr)'},
{id:'INR',caption:'India Rupee (रु)'},
{id:'IDR',caption:'Indonesia Rupiah (Rp)'},
{id:'IQD',caption:'Iraqi Dinar (د.ع)'},
{id:'IRR',caption:'Iran Rial (﷼)'},
{id:'IMP',caption:'Isle of Man Pound (£)'},
{id:'ILS',caption:'Israel Shekel (₪)'},
{id:'JMD',caption:'Jamaica Dollar (J$)'},
{id:'JPY',caption:'Japan Yen (¥)'},
{id:'JEP',caption:'Jersey Pound (£)'},
{id:'JOD',caption:'Jordanian Dinar (JOD)'},
{id:'KZT',caption:'Kazakhstan Tenge (лв)'},
{id:'KPW',caption:'Korea (North) Won (₩)'},
{id:'KRW',caption:'Korea (South) Won (₩)'},
{id:'KGS',caption:'Kyrgyzstan Som (лв)'},
{id:'LAK',caption:'Laos Kip (₭)'},
{id:'LVL',caption:'Latvia Lat (Ls)'},
{id:'LBP',caption:'Lebanon Pound (£)'},
{id:'LRD',caption:'Liberia Dollar ($)'},
{id:'LYD',caption:'Libyan Dinar (LYD)'},
{id:'LTL',caption:'Lithuania Litas (Lt)'},
{id:'MKD',caption:'Macedonia Denar (ден)'},
{id:'MLD',caption:'Moldovan Leu(MLD)'},
{id:'MYR',caption:'Malaysia Ringgit (RM)'},
{id:'MUR',caption:'Mauritius Rupee (₨)'},
{id:'MXN',caption:'Mexico Peso ($)'},
{id:'MNT',caption:'Mongolia Tughrik (₮)'},
{id:'MZN',caption:'Mozambique Metical(MT)'},
{id:'NAD',caption:'Namibia Dollar ($)'},
{id:'NPR',caption:'Nepal Rupee (₨)'},
{id:'ANG',caption:'Netherlands Antilles Guilder (ƒ)'},
{id:'NZD',caption:'New Zealand Dollar ($)'},
{id:'NIO',caption:'Nicaragua Cordoba (C$)'},
{id:'NGN',caption:'Nigeria Naira (₦)'},
{id:'NOK',caption:'Norway Krone (kr)'},
{id:'OMR',caption:'Oman Rial (﷼)'},
{id:'PKR',caption:'Pakistan Rupee (₨)'},
{id:'PAB',caption:'Panama Balboa (B/.)'},
{id:'PYG',caption:'Paraguay Guarani (Gs)'},
{id:'PEN',caption:'Peru Nuevo Sol (S/.)'},
{id:'PHP',caption:'Philippines Peso (₱)'},
{id:'PLN',caption:'Polish Zloty (zł)'},
{id:'QAR',caption:'Qatar Riyal (﷼)'},
{id:'RON',caption:'Romania New Leu (lei)'},
{id:'RUB',caption:'Russia Ruble (руб)'},
{id:'SHP',caption:'Saint Helena Pound (£)'},
{id:'SAR',caption:'Saudi Arabia Riyal (﷼)'},
{id:'RSD',caption:'Serbia Dinar (Дин.)'},
{id:'SCR',caption:'Seychelles Rupee (₨)'},
{id:'SGD',caption:'Singapore Dollar ($)'},
{id:'SBD',caption:'Solomon Islands Dollar ($)'},
{id:'SOS',caption:'Somalia Shilling(S)'},
{id:'ZAR',caption:'South African Currency(R)'},
{id:'LKR',caption:'Sri Lanka Rupee (₨)'},
{id:'SEK',caption:'Sweden Krona (kr)'},
{id:'CHF',caption:'Switzerland Franc (CHF)'},
{id:'SRD',caption:'Suriname Dollar ($)'},
{id:'SYP',caption:'Syria Pound (£)'},
{id:'TWD',caption:'Taiwan New Dollar (NT$)'},
{id:'THB',caption:'Thailand Baht (฿)'},
{id:'TTD',caption:'Trinidad and Tobago Dollar (TT$)'},
{id:'TRY',caption:'Turkey Lira (₤)'},
{id:'TVD',caption:'Tuvalu Dollar ($)'},
{id:'UAH',caption:'Ukraine Hryvnia (₴)'},
{id:'GBP',caption:'United Kingdom Pound (£)'},
{id:'USD',caption:'United States Dollar ($)'},
{id:'AED',caption:'United Arab Emirates (AED)'},
{id:'UYU',caption:'Uruguay Peso ($U)'},
{id:'UZS',caption:'Uzbekistan Som (cym)'},
{id:'VEF',caption:'Venezuela Bolivar (Bs)'},
{id:'VND',caption:'Viet Nam Dong (₫)'},
{id:'YER',caption:'Yemen Rial (﷼)'},
{id:'ZWD',caption:'Zimbabwe Dollar (Z$)'}];
		c +='<div class="row">'
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_CURRENCY']?></label>'
      //  c +=Forms.CreateInputPropertySettings("settings", "currency",SiteSection.Settings.currency['value'], false, "SiteSection.ValueChangedWithType(this)", false, false)
	  	c +=Forms.CreateSelectPropertyPopup("settings", "currency", b, Main.NullToEmpty(SiteSection.Settings.currency['value']), true,"SiteSection.ValueChangedWithType(this)")
        c +='</div></div>'
        <!--col-md-6-->
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_DEFAULT_ZONE']?></label>'
		c +=Forms.CreateSelectPropertySettings("settings", "defaulttimezone", a11,SiteSection.Settings.defaulttimezone['value'], true, "SiteSection.TimeZoneSelected(this);")
		c +='<span id="timespan" style="float: right; margin: 3px 0 0 0;"></span>'
        c +='</div></div>'
		<!--col-md-6-->
        c +='</div>'
		<!--row--> 
		//Settings to select miles or km 
        var d2 = new Array();
        d2.push(JSON.parse('{"id":"K","caption":"KM"}'));
        d2.push(JSON.parse('{"id":"N","caption":" Miles"}'));			
		//Time selection settings.
        var d1 = new Array();
        d1.push(JSON.parse('{"id":"12","caption":"12 Hours"}'));
        d1.push(JSON.parse('{"id":"24","caption":" 24 Hours"}'));
		c +='<div class="row">'
	
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_DISTANCE']?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "distanceformat", d2,SiteSection.Settings.distanceformat['value'], false,"SiteSection.ValueChangedWithType(this)", false,false)
        c +='</div></div>'
		<!--col-md-6-->
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_TIME_FORMAT']?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "timeformat", d1,SiteSection.Settings.timeformat['value'], false,"SiteSection.ValueChangedWithType(this)")
        c +='</div></div>'		
		<!--col-md-6-->        
		c +='</div>'
		
		
		c +='<div class="row">'
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_EMAIL_FROM']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "email_from",SiteSection.Settings.email_from['value'], false, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div></div>'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_META_DESCRIPTION']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "googleanalyticscode",SiteSection.Settings.googleanalyticscode['value'], false, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div></div>'		
		<!--col-md-6-->
		c +='</div>'
		
		

		
		 var d5 = new Array();
         for(i=0;i<=100;i++){
           d5.push({"id":i,"caption":i});
         }
		
		
		c +='<div class="row">'
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_ZIPCODE_MINIMUM']?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "zipvalmin", d5,SiteSection.Settings.zipvalmin['value'], false,"SiteSection.ValueChangedWithType(this)")
        c +='</div></div>'
        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_ZIPCODE_MAXIMUM']?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "zipvalmax", d5,SiteSection.Settings.zipvalmax['value'], false,"SiteSection.ValueChangedWithType(this)")
        c +='</div></div>'		
		<!--col-md-6-->
		c +='</div>'
		
		
		
		<!--row--> 
		c +='<div class="row">'
		c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        c +='<label><?=$lang_resource['ADMIN_SITESETTING_SERVICE_FEE']?></label>'
        c +=Forms.CreateInputPropertySettings("settings", "servicefee",SiteSection.Settings.servicefee['value'], false, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div></div>'
        
        c +='</div>'<!--row-->
		c +='</div>'<!--config-box-->
        c +='</div>'<!--col-md-9-->
        c +='</div>'<!--row-->
		
		c +='</div>'
	

		$("#sitesetting").empty().append(c);	
		SiteSection.TimeZoneSelectedByDefault(SiteSection.Settings.defaulttimezone['value'])
		

        $("#ga").focus()
    },


    SiteSpeedSettings: function () {
        var c = "";
        Forms.Clean("settings", "mainbuttonok");
        c +='<div class="col-md-9">'
        c +='<div class="config-box ">'
        c +='<div class="row">'

        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        var d = new Array();
        d.push(JSON.parse('{"id":"-1","caption":"<?=$lang_resource['BRING_SELECT']?>"}')); 
        d.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['BRING_YES']?>"}'));
        d.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['BRING_NO']?>"}'));
        c +='<label><?=$lang_resource['BRING_SUPER_PERMISSION'] ?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "BRING_PERMISSION", d, SiteSection.Settings.BRING_PERMISSION['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div>'
        c +='</div>'

        c +='<div class="col-md-6">'
        c +='<div class="form-group">'
        var d = new Array();        
        d.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['BRING_YES']?>"}'));
        d.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['BRING_NO']?>"}'));
        c +='<label><?=$lang_resource['PDF_ATTACHMENT_PERMISSION'] ?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "PDF_ATTACHMENT_PERMISSION", d, SiteSection.Settings.PDF_ATTACHMENT_PERMISSION['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div>'
        c +='</div>'

        c +='</div>'<!--config-box-->

        c +='<div class="row">'



        c +='<div class="col-md-12">'
        c +='<div class="form-group">'
        var d = new Array();        
        d.push(JSON.parse('{"id":"1","caption":"<?=$lang_resource['BRING_YES']?>"}'));
        d.push(JSON.parse('{"id":"0","caption":"<?=$lang_resource['BRING_NO']?>"}'));
        c +='<label><?=$lang_resource['PUSH_NOTIFICATION_PERMISSION'] ?></label>'
        c +=Forms.CreateSelectPropertySettings("settings", "pushnotification", d, SiteSection.Settings.pushnotification['value'],true, "SiteSection.ValueChangedWithType(this)", false, false)
        c +='</div>'
        c +='</div>'

        c +='</div>'<!--row-->


        c +='</div>'<!--col-md-9-->
        c +='</div>'<!--row-->
   

        $("#sitesetting").empty().append(c);        

        $("#ga").focus()
    },

	
};
