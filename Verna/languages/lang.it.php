<?php
/*
English
*/
$lang_resource = array();

//$lang_resource1 = Langsetting();
if(count($lang_resource) == 0) {
$lang_resource =array();
}

  //Time selection settings. 
$lang_resource['TIME_FORMAT'] = $records['timeformat'];
$lang_resource['Panel_Currency'] = $records['currency'];
$lang_resource['SITE_CURRENCY'] = $records['currency'];
$lang_resource['INVOICE_CURRENCY'] = $records['currency'];
$lang_resource['SITE_SCHEDULE_SETTING_TIME_ZONE'] = $records['defaulttimezone'];


//'0'0'0'0
// HOME'0'0'0'0
//'0'0'0'0
$lang_resource['MAIN_PAGE_TITLE'] = $records['sitename'];
$lang_resource['MAIN_PAGE_META_DESCRIPTION'] = $records['googleanalyticscode'];
$lang_resource['MAIN_PAGE_META_KEYWORDS'] =$records['analyticscode'];
$lang_resource['MAIN_PAGE_META_AUTHOR'] = $records['sitename'].' - Order everything online, sell franchises, restaurants mall.';

//'0'0'0'0
// BODY'0'0'0'0
//'0'0'0'0
$lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] = 'Per favore compila tutti i campi';
$lang_resource['MAIN_PAGE_CHECK_ORDER'] = 'Controlla lo Stato dell&apos;ordine:';
$lang_resource['BODY_WHERE_ARE_YOU'] = 'Dove ti Trovi?';
$lang_resource['BODY_FOLLOW_US'] = 'Seguici!';
$lang_resource['BODY_ORDER_FOOD_TITLE'] = 'Ordina Pranzo e Cena dai Migliori Ristoranti della Tua Zona!';
$lang_resource['LOGIN_INPUT_EMAIL'] = 'e-mail';
$lang_resource['LOGIN_INPUT_PASSWORD'] = 'password';
$lang_resource['LOGIN_BUTTON_LOGIN'] = 'LOGIN';
$lang_resource['LOGIN_LINK_CREATE_ACCOUNT'] = 'Registrati';
$lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] = 'Dimenticato la password?';
//'0'0'0'0
// USER LOGGED IN'0'0'0'0
//'0'0'0'0
$lang_resource['LOGIN_WELCOME_TEXT'] = 'Benvenuto';
$lang_resource['LOGIN_LINK_MY_ORDERS'] = 'I miei Ordini';
$lang_resource['LOGIN_LINK_CONTROL_PANEL'] = 'Pannello di Controllo';
$lang_resource['LOGIN_LINK_SESSION_CLOSE'] = 'Esci';
$lang_resource['LOGIN_LINK_EDIT_PROFILE'] = 'Modifica Profilo';
//'0'0'0'0
// LOGIN FORM'0'0'0'0
//'0'0'0'0
$lang_resource['LOGIN_CREATE_TITLE'] = 'CREA  ACCOUNT';
$lang_resource['LOGIN_EDIT_TITLE'] = 'MODIFICA ACCOUNT';
$lang_resource['LOGIN_CREATE_NAME'] = 'Nome:';
$lang_resource['LOGIN_CREATE_LAST_NAME'] = 'Cognome:';
$lang_resource['LOGIN_CREATE_SECOND_LAST_NAME'] = 'Secondo Nome:';
$lang_resource['LOGIN_CREATE_EMAIL'] = 'E-mail:';
$lang_resource['LOGIN_CREATE_PASS'] = 'Password:';
$lang_resource['LOGIN_CREATE_STREET'] = 'Indirizzo:';
$lang_resource['LOGIN_CREATE_SUBURB'] = 'Zona:';
$lang_resource['LOGIN_CREATE_ZIP'] = 'Cap:';
$lang_resource['LOGIN_CREATE_COUNTRY'] = 'Paese:';
$lang_resource['LOGIN_CREATE_CITY'] = 'Città:';
$lang_resource['LOGIN_CREATE_PHONE'] = 'Telefono Fisso';
$lang_resource['LOGIN_CREATE_MOBILE'] = 'Cellulare:';
//'0'0'0'0
// RECOVER PASS FORM'0'0'0'0
//'0'0'0'0
$lang_resource['RECOVER_PASS_TITLE'] = 'PASSWORD DIMENTICATA?';
$lang_resource['RECOVER_PASS_EMAIL'] = 'Email:';
//'0'0'0'0
// ORDERS BOX'0'0'0'0
//'0'0'0'0
$lang_resource['ORDERS_BOX_TITLE'] = 'ORDINI';
$lang_resource['ORDERS_BOX_DATE_HEADER'] = 'Data';
$lang_resource['ORDERS_BOX_CITY_HEADER'] = 'Città';
$lang_resource['ORDERS_BOX_STATUS_HEADER'] = 'Stato';
//'0'0'0'0
// CONTROL PANEL'0'0'0'0
//'0'0'0'0
$lang_resource['CONTROL_PANEL_USER_SUPER_ADMIN'] = 'Super admin2';
$lang_resource['CONTROL_PANEL_USER_ADMIN'] = 'Administrator';
$lang_resource['CONTROL_PANEL_USER_RESTAURATEUR'] = 'Business owner';
$lang_resource['CONTROL_PANEL_USER_CUSTOMER'] = 'Client';
$lang_resource['CONTROL_PANEL_START'] = 'Home';
$lang_resource['CONTROL_PANEL_FRANCHISES'] = 'Cities';
$lang_resource['CONTROL_PANEL_BUSINESS'] = 'Business';
$lang_resource['CONTROL_PANEL_USERS'] = 'Users';
$lang_resource['CONTROL_PANEL_ADS'] = 'Advertisement';
$lang_resource['CONTROL_PANEL_ORDERS'] = 'Orders';
$lang_resource['CONTROL_PANEL_STATISTICS'] = 'Statistics';
$lang_resource['CONTROL_PANEL_BUTTON_FRANCHISES'] = 'CITIES';
$lang_resource['CONTROL_PANEL_BUTTON_SUB_FRANCHISES'] = 'my cities list';
$lang_resource['CONTROL_PANEL_BUTTON_BUSINES'] = 'BUSINESS';
$lang_resource['CONTROL_PANEL_BUTTON_SUB_BUSINES'] = 'business list';
$lang_resource['CONTROL_PANEL_BUTTON_ORDERS'] = 'ORDERS';
$lang_resource['CONTROL_PANEL_BUTTON_SUB_ORDERS'] = 'orders list';
$lang_resource['CONTROL_PANEL_BUTTON_USERS'] = 'USERS';
$lang_resource['CONTROL_PANEL_BUTTON_SUB_USERS'] = 'active users';
$lang_resource['CONTROL_PANEL_BUTTON_STATISTICS'] = 'STATISTICS';
$lang_resource['CONTROL_PANEL_BUTTON_SUB_STATISTICS'] = 'data analysis';
$lang_resource['CONTROL_PANEL_BUTTON_ADS'] = 'ADVERTISEMENT';
$lang_resource['CONTROL_PANEL_BUTTON_SUB_ADS'] = 'ads list';
// SECTION FRANCHISES'0'0'0'0
$lang_resource['CONTROL_PANEL_FRANCHISES_TITLE'] = 'CITIES';
$lang_resource['CONTROL_PANEL_FRANCHISES_CITY_HEADER'] = 'City';
$lang_resource['CONTROL_PANEL_FRANCHISES_ADMIN_HEADER'] = 'Administrator';
$lang_resource['CONTROL_PANEL_FRANCHISES_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_FRANCHISES_CREATE'] = 'Create City';
$lang_resource['CONTROL_PANEL_FRANCHISES_EDIT'] = 'Edit City';
$lang_resource['CONTROL_PANEL_FRANCHISES_DELETE'] = 'Delete City';
$lang_resource['CONTROL_PANEL_FRANCHISES_FORM_TITLE_CREATE'] = 'CREATE CITY';
$lang_resource['CONTROL_PANEL_FRANCHISES_FORM_TITLE_EDIT'] = 'EDIT CITY';
$lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_SAVE'] = 'save';
$lang_resource['CONTROL_PANEL_FRANCHISES_BUTTON_CANCEL'] = 'cancel';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_CITY'] = 'City:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_EMAIL'] = 'Email:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_ADMIN'] = 'Administrator:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_COUNTRY'] = 'Country:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TRACKING'] = 'GA tracking id:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_ZONE'] = 'Zone:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_CURRENCY'] = 'Currency:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TAX_TYPE']= 'Tax type';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TAX']= 'Tax Percentage';
// SECTION BUSINESS'0'0'0'0
$lang_resource['CONTROL_PANEL_BUSINESS_TITLE'] = 'BUSINESS';
$lang_resource['CONTROL_PANEL_BUSINESS_CREATE'] = 'Create business';
$lang_resource['CONTROL_PANEL_BUSINESS_EDIT'] = 'Edit business';
$lang_resource['CONTROL_PANEL_BUSINESS_DELETE'] = 'Delete business';
$lang_resource['CONTROL_PANEL_BUSINESS_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_BUSINESS_CITY_HEADER'] = 'City';
$lang_resource['CONTROL_PANEL_BUSINESS_RESTAURATEUR_HEADER'] = 'Owner';
$lang_resource['CONTROL_PANEL_BUSINESS_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_BUSINESS_CUSTOM_SLUG'] = 'Custom Slug';
$lang_resource['CONTROL_PANEL_BUSINESS_CREATE_TITLE'] = 'CREATE BUSINESS';
$lang_resource['CONTROL_PANEL_BUSINESS_EDIT_TITLE'] = 'EDIT BUSINESS';
$lang_resource['CONTROL_PANEL_BUSINESS_BUTTON_SAVE'] = 'save';
$lang_resource['CONTROL_PANEL_BUSINESS_BUTTON_CANCEL'] = 'cancel';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_GENERAL'] = 'general';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_SCHEDULES'] = 'open-close';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_MENUS'] = 'catalogs';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_DISHES'] = 'products';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_EXTRAS'] = 'options';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_METAS'] = 'metas';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_STREET'] = 'Address:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_COLONY'] = 'Neighborhood:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CP'] = 'Zip code:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_COUNTRY'] = 'Country:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CITY'] = 'City:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_PHONE'] = 'Phone:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_MOBILE'] = 'Mobile:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_MIN_SHOP'] = 'Min. Purchase:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_EMAIL'] = 'E-mail:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_PAYPAL'] = 'Paypal:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_RESTAURATEUR'] = 'Business owner:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_ACCEPT_CARD'] = 'Accept credit cards(on client address):';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_DAYS'] = 'Open Days:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CATEGORIES'] = 'Categories:';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_OPENNING'] = 'Open time:';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_CLOSING'] = 'Close time:';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SUNDAY'] = 'Domenica';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_MONDAY'] = 'Lunedì';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_TUESDAY'] = 'Martedì';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_WEDNESDAY'] = 'Mercoledì';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_THURSDAY'] = 'Giovedì';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_FRIDAY'] = 'Venerdì';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SATURDAY'] = 'Sabato';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_BUTTON_CREATE'] = 'Create catalog';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_BUTTON_EDIT'] = 'Edit catalog';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_BUTTON_DELETE'] = 'Delete catalog';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS__NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_COMMENTS_HEADER'] = 'Comments';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_TITLE'] = 'CREATE CATALOG';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_EDIT_TITLE'] = 'EDIT CATALOG';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_DAYS'] = 'Day(s):';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_START'] = 'Starts:';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_END'] = 'End:';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_DISHES'] = 'Products:';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_CREATE_INPUT_COMMENTS'] = 'Comments:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_CREATE'] = 'Create product';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_EDIT'] = 'Edit product';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_DELETE'] = 'Delete product';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] = 'Category';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'] = 'Price';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_TITLE'] = 'CREATE PRODUCT';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_EDIT_TITLE'] = 'EDIT PRODUCT';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_DESCRIPTION'] = 'Description:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_INGREDIENTS'] = 'Ingredients:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_EXTRAS'] = 'Product options:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_CATEGORY'] = 'Category:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_PRICE'] = 'Price:';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_BUTTON_CREATE'] = 'Create product option';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_BUTTON_EDIT'] = 'Edit product option';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_BUTTON_DELETE'] = 'Delete product option';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_DESCRIPTION_HEADER'] = 'Description';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_PRICE_HEADER'] = 'Price';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_TITLE'] = 'CREATE PRODUCT OPTION';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_EDIT_TITLE'] = 'EDIT PRODUCT OPTION';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_INPUT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_INPUT_DESCRIPTION'] = 'Description:';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_INPUT_PRICE'] = 'Price:';
$lang_resource['CONTROL_PANEL_BUSINESS_METAS_KEYWORDS'] = 'Keywords:';
$lang_resource['CONTROL_PANEL_BUSINESS_METAS_DESCRIPTION'] = 'Description:';
// SECTION USERS'0'0'0'0
$lang_resource['CONTROL_PANEL_USERS_BUTTON_CREATE'] = 'Create User';
$lang_resource['CONTROL_PANEL_USERS_BUTTON_EDIT'] = 'Edit User';
$lang_resource['CONTROL_PANEL_USERS_BUTTON_EXPORT'] = 'Export User';
$lang_resource['CONTROL_PANEL_USERS_BUTTON_DELETE'] = 'Delete User';
$lang_resource['CONTROL_PANEL_USERS_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_USERS_GROUP_HEADER'] = 'Group';
$lang_resource['CONTROL_PANEL_USERS_EMAIL_HEADER'] = 'E-mail';
$lang_resource['CONTROL_PANEL_USERS_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_USERS_CREATE_TITLE'] = 'CREATE USER';
$lang_resource['CONTROL_PANEL_USERS_EDIT_TITLE'] = 'EDIT USER';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_LAST_NAME'] = 'Last Name:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_SECOND_LAST_NAME'] = 'Last Name 2:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_EMAIL'] = 'E-mail:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PASS'] = 'Password:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_STREET'] = 'Address:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_SUBURB'] = 'Neighborhood:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_ZIP'] = 'Zip code:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_COUNTRY'] = 'Country:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_CITY'] = 'City:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_PHONE'] = 'Phone:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_MOBILE'] = 'Mobile:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_JOB'] = 'Ocupation:';
$lang_resource['CONTROL_PANEL_USERS_CREATE_INPUT_GROUP'] = 'Group:';
// SECTION ADS'0'0'0'0
$lang_resource['CONTROL_PANEL_ADS_BUTTON_CREATE'] = 'Create add';
$lang_resource['CONTROL_PANEL_ADS_BUTTON_EDIT'] = 'Edit add';
$lang_resource['CONTROL_PANEL_ADS_BUTTON_DELETE'] = 'Delete add';
$lang_resource['CONTROL_PANEL_ADS_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_ADS_CITY_HEADER'] = 'City';
$lang_resource['CONTROL_PANEL_ADS_CLICKS_HEADER'] = 'Clicks';
$lang_resource['CONTROL_PANEL_ADS_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_ADS_CREATE_TITLE'] = 'CREATE ADD';
$lang_resource['CONTROL_PANEL_ADS_EDIT_TITLE'] = 'EDIT ADD';
$lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_TYPE'] = 'Type:';
$lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_TIME'] = 'Time(seconds):';
$lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_LINK'] = 'Link:';
$lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_CITY'] = 'City:';
// SECTION ORDERS'0'0'0'0
$lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EDIT'] = 'Edit order';
$lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EXPORT'] = 'Export order';
$lang_resource['CONTROL_PANEL_ORDERS_BUTTON_DELETE'] = 'Delete order';
$lang_resource['CONTROL_PANEL_ORDERS_DATE_HEADER'] = 'Date';
$lang_resource['CONTROL_PANEL_ORDERS_CITY_HEADER'] = 'City';
$lang_resource['CONTROL_PANEL_ORDERS_STATUS_HEADER'] = 'Status';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_STATUS'] = 'Status:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_COMMENT'] = 'Comments:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_EMAIL'] = 'Email:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_ADDRESS'] = 'Address:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PHONE'] = 'Phone:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_CITY'] = 'City:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_REFERENCE'] = 'Reference:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_KFC'] = 'KFC';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_TEL'] = 'Phone:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD'] = 'Payment method:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_VALUE'] = 'Will pay with card on delivery';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_ITEM'] = 'Item';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_INGREDIENTS'] = 'Ingredients';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_OPTIONS'] = 'Product options';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_COMMENTS'] = 'Comments';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_PRICE'] = 'Price';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_PAY_METHOD_TABLE_FEE'] = 'Delivery service fee';
// SECTION STATISTICS'0'0'0'0
$lang_resource['CONTROL_PANEL_STATISTICS_TITLE'] = 'STATISTICS';
$lang_resource['CONTROL_PANEL_STATISTICS_SALES_TITLE'] = 'Sales';
$lang_resource['CONTROL_PANEL_STATISTICS_TOP_10'] = 'Top 10';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SUN'] = 'Dom';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MON'] = 'Lun';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_TUE'] = 'Mar';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_WED'] = 'Mer';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_THU'] = 'Gio';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_FRI'] = 'Ven';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SAT'] = 'Sab';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] = 'Domenica';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] = 'Lunedì';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] = 'Martedì';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] = 'Mercoledì';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] = 'Giovedì';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] = 'Venerdì';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] = 'Sabato';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JAN'] = 'Gen';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_FEB'] = 'Feb';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MAR'] = 'Mar';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_APR'] = 'Apr';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MAY'] = 'Mag';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JUN'] = 'Giu';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JUL'] = 'Lug';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_AUG'] = 'Ago';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SEP'] = 'Set';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_OCT'] = 'Ott';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_NOV'] = 'Nov';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_DEC'] = 'Dic';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_JAN'] = 'Gennaio';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_FEB'] = 'Febbraio';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAR'] = 'Marzo';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_APR'] = 'Aprile';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAY'] = 'Maggio';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUN'] = 'Giugno';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUL'] = 'Luglio';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_AUG'] = 'Agosto';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_SEP'] = 'Settembre';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_OCT'] = 'Ottobre';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_NOV'] = 'Novembre';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_DEC'] = 'Dicembre';
$lang_resource['SHOPPING_FIRST_PAGE_WHERE_AM_I'] = 'DOVE SEI?';
$lang_resource['SHOPPING_FIRST_PAGE_DRAG_MAP'] = 'Fare clic con il pulsante destro per selezionare il tuo indirizzo oppure trascinare l&apos;indicatore:';
$lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] = 'CERCA';
$lang_resource['SHOPPING_SECOND_SHOW_HIDE_LABEL'] = 'VISUALIZZA O NASCONDI';
$lang_resource['SHOPPING_SECOND_NAME_HEADER'] = 'Nome';
$lang_resource['SHOPPING_SECOND_CATEGORY_HEADER'] = 'Categoria';
$lang_resource['SHOPPING_SECOND_SEND_HEADER'] = 'Consegna';
$lang_resource['SHOPPING_SECOND_SEND_COST'] = 'Costo di Consegna';
$lang_resource['SHOPPING_SECOND_SEND_NO_COST'] = 'CONSEGNA GRATUITA';
$lang_resource['SHOPPING_SECOND_FREE'] = 'GRATUITA';
$lang_resource['SHOPPING_SECOND_WHERE_ARE_YOU_BUTTON'] = 'Dove Sei?';
$lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] = 'Miei Ordini';
$lang_resource['SHOPPING_SECOND_WHERE_BACK_BUTTON'] = 'Indietro';
$lang_resource['SHOPPING_THIRD_SEE_COMMENTS'] = 'Guarda i Commenti';
$lang_resource['SHOPPING_THIRD_SEE_COMMENTSs'] = 'Guarda le Recensioni';
$lang_resource['SHOPPING_THIRD_ACTIVE_INGREDIENT'] = 'Ingredienti Selezionati';
$lang_resource['SHOPPING_THIRD_EXTRA_ACTIVE_INGREDIENT'] = 'Extra Selezionati';
$lang_resource['SHOPPING_THIRD_EXTRA_INACTIVE_INGREDIENT'] = 'Ingredienti Deselezionati';
$lang_resource['SHOPPING_THIRD_INACTIVE_INGREDIENT'] = 'Extra Deselezionati';
$lang_resource['SHOPPING_FOURTH_MY_SHOPPING_CART'] = 'CARRELLO';
$lang_resource['SHOPPING_FOURTH_ORDER_NOW'] = 'ORDINA ORA';
$lang_resource['SHOPPING_FOURTH_TOTAL_PAY'] = 'TOTALE:';
$lang_resource['SHOPPING_FOURTH_NAME'] = 'Nome:';
$lang_resource['SHOPPING_FOURTH_EMAIL'] = 'E-mail:';
$lang_resource['SHOPPING_FOURTH_ADDRESS'] = 'Indirizzo Completo:';
$lang_resource['SHOPPING_FOURTH_NEIGHBORHOOD'] = 'Zona:';
$lang_resource['SHOPPING_FOURTH_WHERE_DID_YOU_FIND_US'] = 'Dove ci hai conosciuti?';
$lang_resource['SHOPPING_FOURTH_PHONE'] = 'Cellulare:';
$lang_resource['SHOPPING_FOURTH_PAYMENT'] = 'Pagamento:';
$lang_resource['SHOPPING_FOURTH_TIP'] = 'Mancia per il Fattorino';
$lang_resource['SHOPPING_FOURTH_PAYMENT_CASH'] = 'Contanti';
$lang_resource['SHOPPING_FOURTH_PAYMENT_PAYPAL'] = 'Paypal';
$lang_resource['SHOPPING_FOURTH_COMMENTS'] = 'Commenti';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_1'] = 'Spesa minima per';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_2'] = 'è';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_3'] = 'Per favore aggiungi ancora una pietanza. Grazie!';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_4'] = 'Per favore seleziona una referenza';
$lang_resource['SHOPPING_FOURTH_ERROR_NAME'] = 'Per favore inserisci il tuo nome';
$lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] = 'Per favore inserisci una mail valida';
$lang_resource['SHOPPING_FOURTH_ERROR_STREET'] = 'Per favore Insersci un Indirizzo esatto';
$lang_resource['SHOPPING_FOURTH_ERROR_NEIGHBORHOOD'] = 'Per favore Inserisci un zona esatta';
$lang_resource['SHOPPING_FOURTH_ERROR_FIND_US'] = 'Per favore Inserisci come ci hai conosciuto';
$lang_resource['SHOPPING_FOURTH_ERROR_PHONE'] = 'Per favore inserisci un numero di telefono valido';
//'0'0'0'0
// FOOTER'0'0'0'0
//'0'0'0'0
$lang_resource['FOOTER_ABOUT_TITLE'] = 'Our company';
$lang_resource['FOOTER_ABOUT_ABOUT'] = 'Chi siamo';
$lang_resource['FOOTER_ABOUT_BLOG'] = 'Blog';
$lang_resource['FOOTER_ABOUT_CONTACT'] = 'Contattaci';
$lang_resource['FOOTER_OWNER_TITLE'] = 'Ristoratori';
$lang_resource['FOOTER_OWNER_WORKING'] = 'Come Funziona';
$lang_resource['FOOTER_OWNER_USER'] = 'Users benefits';
$lang_resource['FOOTER_OWNER_RESTAURANT'] = 'Business benefits';
$lang_resource['FOOTER_OWNER_ADD'] = 'Aggiungi il tuo Ristorante';
$lang_resource['FOOTER_INFO_TITLE'] = 'Supporto e Informazioni';
$lang_resource['FOOTER_INFO_FAQ'] = 'FAQ';
$lang_resource['FOOTER_INFO_PRIVACITY'] = 'Privacy policy';
$lang_resource['FOOTER_INFO_TOS'] = 'Terms and Conditions';
$lang_resource['FOOTER_INFO_MAP'] = 'Mappa del Sito';
//'0'0'0'0
// MOBILE'0'0'0'0
//'0'0'0'0
$lang_resource['MOBILE_MAIN_PAGE_TITLE'] = 'Pickeat';
$lang_resource['MOBILE_MAIN_PAGE_ORDER_FOOD_ONLINE'] = 'Ordina cibo online';
$lang_resource['MOBILE_MAIN_PAGE_SIGN_OUT'] = 'Esci';
$lang_resource['MOBILE_MAIN_PAGE_CHECK_ORDER_STATUS'] = 'Controlla lo stato dell&apos;ordine';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_ARE_YOU'] = 'DOVE SEI?';
$lang_resource['MOBILE_LET_US_FIND_YOU'] = 'Localizzami';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_LOGIN'] = 'Login';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_LOGIN_EMAIL'] = 'E-mail:';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_LOGIN_PASSWORD'] = 'Password:';
$lang_resource['MOBILE_SECOND_PAGE_BACK'] = 'Indietro';
$lang_resource['MOBILE_SECOND_PAGE_NEXT'] = 'Avanti';
$lang_resource['MOBILE_SECOND_PAGE_COUNTRY'] = 'Paese:';
$lang_resource['MOBILE_SECOND_PAGE_CITY'] = 'Città';
$lang_resource['MOBILE_SECOND_PAGE_ADDRESS'] = 'Indirizzo:';
$lang_resource['MOBILE_SECOND_PAGE_ORDER_NUMBER'] = 'Indirizzo 2:';
$lang_resource['MOBILE_THIRD_PAGE_WHERE_ARE_YOU_EXACTLY'] = 'Dove sei esattamente?';
$lang_resource['MOBILE_THIRD_PAGE_ZOOM_IN'] = 'Zoom in';
$lang_resource['MOBILE_THIRD_PAGE_ZOOM_OUT'] = 'Zoom out';
$lang_resource['MOBILE_FOURTH_PAGE_FILTER'] = 'Filtro';
$lang_resource['MOBILE_FOURTH_PAGE_FREE'] = 'Gratuito';
$lang_resource['MOBILE_FOURTH_PAGE_OK'] = 'OK';
$lang_resource['MOBILE_FIFTH_PAGE_MY_ORDER'] = 'Mio Ordine';
$lang_resource['MOBILE_FIFTH_PAGE_CHECK_STATUS'] = 'Verifica lo stato dell&apos;ordine';
$lang_resource['MOBILE_SIXTH_PAGE_NAME'] = 'Nome:';
$lang_resource['MOBILE_SIXTH_PAGE_EMAIL'] = 'E-mail:';
$lang_resource['MOBILE_SIXTH_PAGE_ADDRESS'] = 'Indirizzo:';
$lang_resource['MOBILE_SIXTH_PAGE_PHONE'] = 'Telefono:';
$lang_resource['MOBILE_SIXTH_PAGE_WHERE_DID_YOU_FIND_US'] = 'Dove ci hai conosciuti?';
$lang_resource['MOBILE_SIXTH_PAGE_PAYPAL'] = 'Paypal';
$lang_resource['MOBILE_SIXTH_PAGE_CASH'] = 'Contanti';
$lang_resource['MOBILE_SIXTH_PAGE_ORDER_NOW'] = 'ORDINA ORA';
$lang_resource['MOBILE_SIXTH_PAGE_ORDER_NOW1'] = 'PAYPAL';
$lang_resource['MOBILE_SIXTH_PAGE_FREE_DELIVERY_SERVICE'] = 'CONSEGNA GRATUITA';
$lang_resource['MOBILE_SIXTH_PAGE_DELIVERY_SERVICE_FEE'] = 'COSTO DI CONSEGNA ';
$lang_resource['MOBILE_SIXTH_PAGE_EMAIL_NOT_VALID'] = 'email non valida, inserisci un indirizzo email valido';
$lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_NAME'] = 'Per favore inserisci il tuo nome';
$lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_ADDRESS'] = 'Per favore inserisci il tuo indirizzo,ne abbiamo bisogno per la consegna';
$lang_resource['MOBILE_SIXTH_PAGE_TELL_US_FIND_US'] = 'Per favore dicci come ci hai conosciuto';
$lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] = 'Commenti';
$lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_YOUR_PHONE'] = 'Per favore inserisci il tuo numero di telefono';
$lang_resource['MOBILE_SIXTH_PAGE_RADIO'] = 'Radio';
$lang_resource['MOBILE_SIXTH_PAGE_FLYER'] = 'Flyer';
$lang_resource['MOBILE_SIXTH_PAGE_GOOGLE'] = 'Google';
// SMS'0'0'0'0
$lang_resource['SMS_ENABLE_CHECKBOX'] = 'Ricevi SMS';
$lang_resource['SMS_BUSSINESS_SAVE_BUTTON'] = 'Salva';
$lang_resource['SMS_BUSSINESS_CANCEL_BUTTON'] = 'Cancella';
$lang_resource['SMS_BUSSINESS_TWILIO_PHONE'] = 'Twilio Phone';
$lang_resource['SMS_BUSSINESS_ENABLE_SMS'] = 'Abilita SMS';
$lang_resource['SMS_BUSSINESS_SID_LABEL'] = 'sid:';
$lang_resource['SMS_BUSSINESS_TOKEN_LABEL'] = 'token:';
$lang_resource['SMS_ORDER_SENT_CLIENT'] = 'Grazie per il tuo ordine, il tuo numero d&apos;ordine è:';
$lang_resource['SMS_ORDER_SENT_BUSINESS'] = 'Ordine Confermato #';
$lang_resource['SMS_ORDER_STATUS_CHANGED'] = 'Stato dell&apos;Ordine #';
$lang_resource['SMS_ORDER_STATUS_CHANGED_2'] = 'è cambiato. ';
$lang_resource['SMS_ORDER_COMMENT_CHANGED'] = 'Commento Ordine #';
$lang_resource['SMS_ORDER_COMMENT_CHANGED_2'] = 'è cambiato: ';
// extra'0'0'0'0
$lang_resource['ORDER_THANKS'] = 'Grazie per il tuo ordine!';
$lang_resource['ORDER_THANKS_PLCED'] = 'Il tuo ordine è stato inserito correttamente.';
$lang_resource['ORDER_PROCESSED'] = 'Il tuo numero d&apos;ordine è:';
$lang_resource['ORDER_IMPORTANT'] = 'Importante';
$lang_resource['ORDER_CHANGES'] = 'Per modifiche o Cancellazioni per favore contatta il locale, ti abbiamo appena mandato una mail. CONDIVIDI IL TUO ORDINE SU FACEBOOK O SU TWITTER!';
$lang_resource['ORDER_SHARE'] = 'Condividi';
$lang_resource['ORDER_COMMENTS'] = 'Commenti';
$lang_resource['SEARCH_NO_RESTAURANTS'] = 'Nessun locale trovato, prova di nuovo o modifica la tua ricerca';
$lang_resource['BUSINESS_CLOSED'] = 'chiuso';
$lang_resource['FRONT_CASH'] = 'Contanti';
$lang_resource['PASSWORD_SENT'] = 'La password è stata inviato al tuo indirizzo email';
$lang_resource['EMAIL_INCORRECT'] = 'Email errata, per favore prova di nuovo';
$lang_resource['MAP_NEXT'] = 'Avanti';
$lang_resource['NO_SERVICE'] = 'Nessun servizio in questo momento';
$lang_resource['ONE_RESTAURANT'] = 'Puoi ordinare solo in un ristorante alla volta';
$lang_resource['CARD_DELIVERY'] = 'Card di credito alla consegna';
$lang_resource['CASH_DELIVERY'] = 'Contanti alla consegna';
$lang_resource['AND_CARD'] = 'e Carta di credito';
$lang_resource['NO_SERVICE'] = 'Nessun servizio in questo momento';
// new v2 and extras'0'0'0'0
$lang_resource['COUNTRY_V2'] = 'Paese';
$lang_resource['CITY_V2'] = 'Città';
$lang_resource['ADDRESS_V2'] = 'Indirizzo o CAP';
$lang_resource['LETS_GO_V2'] = 'CERCA';
$lang_resource['ELSE_V2'] = 'o';
$lang_resource['SHOW_RESTAURANTS_V2'] = 'Mostra locali';
$lang_resource['Lets_be_friends_V2'] = 'Diventiamo amici!';
$lang_resource['CONFUSED_V2'] = 'Ancora confuso, guarda i nostri video su:';
$lang_resource['RECENT_ORDERS_V2'] = 'Ordini recenti';
$lang_resource['HOW_IT_WORKS_V2'] = 'Come funziona?';
$lang_resource['BROWSEPERCITY'] = 'Naviga per città';
$lang_resource['RESTDISABLED'] = 'Ristorante momentaneamente disabilitato, prova più tardi.';
$lang_resource['Mobile_V2a'] = 'Mobile';
$lang_resource['Needhelp_V2a'] = 'Bisogno di Aiuto?';
$lang_resource['JUST_ORDERED_V2'] = 'ordinato da';
$lang_resource['Email_ID_V2'] = 'Email';
$lang_resource['Password_V2'] = 'Password';
$lang_resource['NO_PERMISSION_V2'] = 'Non sei autorizzato a vedere quest&apos;ordine!';
$lang_resource['Refine_your_results_V2'] = 'Elenca';
$lang_resource['Restaurants_Cuisines_Search_V2'] = 'Ristorante, categoria cibo';
$lang_resource['Dish_Search_V2'] = 'Piatto';
$lang_resource['Categories_V2'] = 'Categorie';
$lang_resource['Select_Restaurant_V2'] = 'Seleziona Ristorante';
$lang_resource['SEARCH_V2'] = 'CERCA';
$lang_resource['PAYMENTS_V2'] = 'Accettiamo:';
$lang_resource['PAYMENT_METHOD_V2'] = 'Metodo di Pagamento:';
$lang_resource['DELIVERY_V2'] = 'Costo di Consegna:';
$lang_resource['View_Menu_V2'] = 'Menù';
$lang_resource['SELECT_PRODUCT_V2'] = 'Seleziona Prodotto';
$lang_resource['SELECT_CATEGORY_V2'] = 'Filtra per Categoria';
$lang_resource['THANK_YOU_V2'] = 'Grazie per il Tuo Ordine!';
$lang_resource['ORDER_PLACED_V2'] = 'Ordine numero';
$lang_resource['COME_BACK_V2'] = 'A presto!';
$lang_resource['ORDER_PLACED1_V2'] = 'Il tuo ordine è stato inserito correttamente!';
$lang_resource['ORDER_DETAILS_V2'] = 'Il tuo ordine è stato inserito';
$lang_resource['Your_order_V2'] = 'Il tuo ordine';
$lang_resource['Your_order_summary_V2'] = 'Riepilogo Ordine';
$lang_resource['SMS_ERROR_V2'] = 'Oops, non siamo riusciti ad inviarti l&apos;SMS ma il tuo ordine è stato inserito correttamente!';
$lang_resource['Your_Total_V2'] = 'Totale';
$lang_resource['Cart_Empty_V2'] = 'Ordine senza prodotti, per favore aggiungi qualcosa';
$lang_resource['Order_details_V2'] = 'Dettagli dell&apos;ordine';
$lang_resource['Delivery_details_V2'] = 'Dettagli Consegna';
$lang_resource['Item_Name_V2'] = 'Prodotto';
$lang_resource['Price_V2'] = 'Prezzo';
$lang_resource['Choose_Restaurant_V2'] = 'Scegli un locale';
$lang_resource['Ratings_V2'] = 'Valutazioni';
$lang_resource['Tax_V2'] = 'Iva';
$lang_resource['Tax_not_included_V2'] = 'Iva non inclusa nel prezzo';
$lang_resource['Tax_included_V2'] = 'Iva inclusa nel prezzo';
$lang_resource['Refine_results_V2'] = 'Perfeziona Risultati';
$lang_resource['Account_suspended_V2'] = 'Account Sospeso, per favore contattaci. Grazie!';
$lang_resource['No_restaurant_country_V2'] = 'Nessun Ristorante trovato nel tuo paese';
$lang_resource['No_restaurant_location_V2'] = 'Nessun Ristorante trovato nella tua zona';
$lang_resource['Browser_no_geolocation_V2'] = 'Il tuo browser non permette la geolocalizzazione';
$lang_resource['geolocation_failed_V2'] = 'Geolocalizzazione fallita';
$lang_resource['email_repeated_V2'] = 'Email già in uso, per favore aggiungine un&apos;altra o richiedi una password.';
$lang_resource['valid_email_V2'] = 'Per Favore inserisci una email valida';
$lang_resource['catalog_not_active_V2'] = 'Nessun menù disponibile in questo momento';
$lang_resource['min_V2'] = 'La spesa minima per questo locale';
$lang_resource['min2_V2'] = 'è';
$lang_resource['min3_V2'] = 'per favore aggiungi più prodotti. Grazie.';
$lang_resource['type_name_V2'] = 'Per Favore Inserisci il Tuo Nome';
$lang_resource['review_thanks_V2'] = 'Grazie per aver dato la tua valutazione, questo aiuterà le altre persone.';
$lang_resource['order_remove_V2'] = 'Clicca su Ordina Adesso e Rimuovi';
$lang_resource['zone_V2'] = 'Zona';
$lang_resource['delete_V2'] = 'Cancella';
$lang_resource['clear_zones_V2'] = 'Azzera zone';
$lang_resource['Filter_V2'] = 'Filtri';
$lang_resource['categories_V2'] = 'Categorie';
$lang_resource['create_category_V2'] = 'Crea Categoria';
$lang_resource['edit_category_V2'] = 'Modifica Categoria';
$lang_resource['delete_category_V2'] = 'Cancella Categoria';
$lang_resource['countries_V2'] = 'Paese';
$lang_resource['create_country_V2'] = 'Crea Paese';
$lang_resource['edit_country_V2'] = 'Modifica Paese';
$lang_resource['delete_country_V2'] = 'Cancella Paese';
$lang_resource['my_profile_V2'] = 'Il Mio Profilo';
$lang_resource['advertisement_V2'] = 'Pubblicità';
$lang_resource['save_V2'] = 'Salva';
$lang_resource['cancel_V2'] = 'Cancella';
$lang_resource['pending_V2'] = 'Attendi una Risposta';
$lang_resource['cancelled_V2'] = 'Cancellato';
$lang_resource['completed_V2'] = 'Completato';
$lang_resource['Now_V2'] = 'Adesso';
$lang_resource['in_V2'] = 'in';
$lang_resource['Name_V2'] = 'Nome';
$lang_resource['Order_V2'] = 'Ordine';
$lang_resource['Description_V2'] = 'Descrizione';
$lang_resource['User_details_V2'] = 'Dettagli Cliente';
$lang_resource['Home_address_V2'] = 'Indirizzo';
$lang_resource['Neighbourhood_V2'] = 'Zona';
$lang_resource['Phone_V2'] = 'Telefono';
$lang_resource['City_V2'] = 'Città';
$lang_resource['Referenece_V2'] = 'Reference';
$lang_resource['PAID_with_Paypal_V2'] = 'Paga con Paypal';
$lang_resource['Items_V2'] = 'Prodotti';
$lang_resource['Item_V2'] = 'Prodotto';
$lang_resource['Ingredients_V2'] = 'Ingredienti';
$lang_resource['Comments_V2'] = 'Commenti';
$lang_resource['Product_Options_V2'] = 'Opzioni Prodotti';
$lang_resource['Extra_V2'] = 'Extra';
$lang_resource['Rate1_V2'] = 'Prezzo';
$lang_resource['time_seconds_V2'] = 'Tempo (in secondi)';
$lang_resource['Every_Day_V2'] = 'Tutti i giorni';
$lang_resource['Order_number_V2'] = 'Il tuo Numero d&apos;ordine è:';
$lang_resource['Thank_you_for_ordering_V2'] = 'Grazie per aver ordinato su Pickeat!';
$lang_resource['ADVERTISEMENT_V2'] = 'PUBBLICITA&apos;';
$lang_resource['COUNTRIES_V2'] = 'PAESI';
$lang_resource['USERS_V2'] = 'UTENTI';
$lang_resource['ORDER_V2'] = 'Ordini Recenti';
$lang_resource['FREE_DELIVERY_V2'] = 'Consegna Gratuita';
$lang_resource['Refine_Search_V2'] = 'Perfeziona Ricerca';
$lang_resource['Notes_V2'] = 'Note';
$lang_resource['Tip_Message'] = 'Vuoi aggiungere un suggerimento?';
//EXPORT'0'0'0'0
$lang_resource['EXPORT_ORDER_NUMBER'] = 'Numero d&apos;ordine';
$lang_resource['EXPORT_NAME'] = 'Nome';
$lang_resource['EXPORT_EMAIL'] = 'Email';
$lang_resource['EXPORT_DATE'] = 'Data';
$lang_resource['EXPORT_TELEPHONE'] = 'Telefono';
$lang_resource['EXPORT_PAYMENT_METHOD'] = 'Metodo di Pagamento';
$lang_resource['EXPORT_ITEM'] = 'Elemento';
$lang_resource['EXPORT_ORDER_TOTAL'] = 'Totale Ordine';
$lang_resource['EXPORT_CASH'] = 'Contanti';
$lang_resource['EXPORT_CARD'] = 'Card';
$lang_resource['EXPORT_FREE_DELIVERY'] = 'Consegna Gratuita';
$lang_resource['EXPORT_DELIVERY_COST'] = 'Costo di Consegna';
$lang_resource['EXPORT_SUMMARY'] = 'Riepilogo';
$lang_resource['EXPORT_BUSINESS_NAME'] = 'Nome Attività';
$lang_resource['EXPORT_TOTAL'] = 'Totale';
$lang_resource['EXPORT_ADRESS'] = 'Indirizzo';
$lang_resource['EXPORT_CITY'] = 'Città';
$lang_resource['EXPORT_LAST_NAME'] = 'Cognome';
$lang_resource['EXPORT_LAST_NAME_2'] = 'Secondo nome';
// mercadopago'0'0'0'0
$lang_resource['MERCO_ENABLE_CHECKBOX'] = 'Mercadopago Enable';
$lang_resource['MERCO_CLIENT_KEY'] = 'Mercadopago Client Id';
$lang_resource['MERCO_SECRET_KEY'] = 'Mercadopago Secret Key';
// extra'0'0'0'0
$lang_resource['ORDER_THANKS'] = 'Grazie per il Tuo Ordine!';
$lang_resource['ORDER_THANKS_PLCED'] = 'Il Tuo Ordine è stato inserito correttamente!';
$lang_resource['ORDER_PROCESSED'] = 'Il tuo Numero d&apos;ordine è:';
$lang_resource['ORDER_IMPORTANT'] = 'Importante';
$lang_resource['ORDER_CHANGES'] = 'Per modifiche o Cancellazioni per favore contatta il locale, ti abbiamo appena mandato una mail. CONDIVIDI IL TUO ORDINE SU FACEBBOK O SU TWITTER!';
$lang_resource['ORDER_SHARE'] = 'Condividi';
$lang_resource['ORDER_COMMENTS'] = 'Commenti';
$lang_resource['SEARCH_NO_RESTAURANTS'] = 'Nessun Ristorante Trovato, Per Favore prova di nuovo o modifica la tua ricerca';
$lang_resource['BUSINESS_CLOSED'] = 'chiuso';
$lang_resource['FRONT_CASH'] = 'Contanti';
$lang_resource['PASSWORD_SENT'] = 'La password è stata inviata alla tua mail';
$lang_resource['EMAIL_INCORRECT'] = 'Email errata, per favore prova di nuovo';
$lang_resource['MAP_NEXT'] = 'AVANTI';
$lang_resource['NO_SERVICE'] = 'Nessun servizio in questo momento, riprova più tardi. Grazie!';
$lang_resource['ONE_RESTAURANT'] = 'Puoi ordinare in un ristorante per volta';
$lang_resource['CARD_DELIVERY'] = 'Carta di credito alla consegna';
$lang_resource['CASH_DELIVERY'] = 'Contanti alla consegna';
$lang_resource['AND_CARD'] = 'e Carta di credito';
$lang_resource['NO_SERVICE'] = 'Nessun servizio in questo momento, riprova più tardi. Grazie!';
//EXPORT'0'0'0'0
$lang_resource['EXPORT_ORDER_NUMBER'] = 'Numero d&apos;ordine';
$lang_resource['EXPORT_NAME'] = 'Nome';
$lang_resource['EXPORT_EMAIL'] = 'Email';
$lang_resource['EXPORT_DATE'] = 'Data';
$lang_resource['EXPORT_TELEPHONE'] = 'Telefono';
$lang_resource['EXPORT_PAYMENT_METHOD'] = 'Metodo di Pagamento';
$lang_resource['EXPORT_ITEM'] = 'Elemento';
$lang_resource['EXPORT_ORDER_TOTAL'] = 'Totale Ordine';
$lang_resource['EXPORT_CASH'] = 'Contanti';
$lang_resource['EXPORT_CARD'] = 'Card';
$lang_resource['EXPORT_FREE_DELIVERY'] = 'Consegna Gratuita';
$lang_resource['EXPORT_DELIVERY_COST'] = 'Costo di Consegna';
$lang_resource['EXPORT_SUMMARY'] = 'Riepilogo';
$lang_resource['EXPORT_BUSINESS_NAME'] = 'Nome Attività';
$lang_resource['EXPORT_TOTAL'] = 'Totale';
$lang_resource['EXPORT_ADRESS'] = 'Indirizzo';
$lang_resource['EXPORT_CITY'] = 'Città';
$lang_resource['EXPORT_LAST_NAME'] = 'Cognome';
$lang_resource['EXPORT_LAST_NAME_2'] = 'Secondo nome';
//INDEX'0'0'0'0
$lang_resource['INDEX_MOBILE'] = 'Mobile';
$lang_resource['INDEX_NEED_HELP'] = 'Hai Bisogno di Aiuto?';
$lang_resource['INDEX_TRACK_ORDER_1'] = 'TRACCIA ORDINE';
$lang_resource['INDEX_LOGIN'] = 'LOGIN';
$lang_resource['INDEX_TRACK_ORDER'] = 'Traccia Ordine ';
$lang_resource['INDEX_SHOW_ORDER'] = 'Visualizza Ordine';
$lang_resource['INDEX_ENTER_YOUR_ORDER_ID'] = 'Inserisci il tuo numero d&apos;ordine';
$lang_resource['INDEX_YOUR_ORDER_STATUS'] = 'Stato del tuo ordine';
//FRONT BLUK'0'0'0'0
$lang_resource['INDEX_MOBILE'] = 'Mobile';
$lang_resource['INDEX_MOBILE'] = 'Mobile';
$lang_resource['INDEX_MOBILE'] = 'Mobile';
//TEMPLATE'0'0'0'0
$lang_resource['TEMPLATE_REVIEWS_AND_COMMENTS'] = 'Recensioni e Commenti';
$lang_resource['TEMPLATE_PAYMENTS'] = 'Pagamenti';
$lang_resource['TEMPLATE_SEE_MENU_AND_ORDER'] = 'Guarda il Menù e gli Ordini';
$lang_resource['TEMPLATE_FIND_OTHER_RESTAURANTS'] = 'Trova un&apos;altro Ristorante';
$lang_resource['TEMPLATE_QUALITY_OF_FOOD'] = 'Qualità del cibo';
$lang_resource['TEMPLATE_PUNCTUALITY'] = 'Puntualità';
$lang_resource['TEMPLATE_SERVICE'] = 'Servizio';
$lang_resource['TEMPLATE_FOOD_PACKAGING'] = 'Confezione';
$lang_resource['TEMPLATE_RATE_NOW'] = 'Valuta Ora';
//FOOTER'0'0'0'0
$lang_resource['FOOTER_ABOUT_US'] = 'Chi Siamo';
$lang_resource['FOOTER_CONTACT_US'] = 'Contattaci';
$lang_resource['FOOTER_BLOG'] = 'Blog';
$lang_resource['FOOTER_SITE_MAP'] = 'Mappa del Sito';
$lang_resource['FOOTER_BUSINESS_OWNERS'] = 'Ristoratori';
$lang_resource['FOOTER_HOW_IT_WORKS'] = 'Come Funziona';
$lang_resource['FOOTER_USER_BENEFITS'] = 'Vantaggi per gli Utenti';
$lang_resource['FOOTER_BUSINESS_BENEFITS'] = 'Vantaggi per i Ristoratori';
$lang_resource['FOOTER_ADD_BUSINESS'] = 'Aggiungi il Tuo Ristorante';
$lang_resource['FOOTER_SUPPORT_INFORMATION'] = 'Supporto & Informazioni';
$lang_resource['FOOTER_FAQ'] = 'FAQ';
$lang_resource['FOOTER_PRIVACY_POLICY'] = 'Privacy Policy';
$lang_resource['FOOTER_TERMS_CONDITIONS'] = 'Terms and Conditions';
$lang_resource['FOOTER_WE_ACCEPT'] = 'Accettiamo';
//AUTHENTICATE'0'0'0'0
$lang_resource['AUTHENTICATE_ERROR_PLEASE_TRY_AGAIN'] = 'Errore, prova di nuovo';
$lang_resource['AUTHENTICATE_INCORRECT_DATA_PLEASE_TRY_AGAIN'] = 'Dati errati, prova di nuovo';
//USERS'0'0'0'0
$lang_resource['USERS_EMAIL_ADDRESS_ALREADY_REGISTERED'] = 'Indirizzo email già registrato';
$lang_resource['USERS_VALID_EMAIL_PLEASE'] = 'Inserisci una email valida. Grazie!';
//ADD RATING'0'0'0'0
$lang_resource['ADDRATING_EXPIRED_LINK'] = 'Link Scaduto';
//PAYPAL IPN'0'0'0'0
$lang_resource['PAYPAL_ORDER_NUMBER'] = 'Ordine Numero';
$lang_resource['PAYPAL_NAME'] = 'Nome';
$lang_resource['PAYPAL_EMAIL'] = 'Email';
$lang_resource['PAYPAL_ADDRESS'] = 'Indirizzo';
$lang_resource['PAYPAL_ADDRESS_2'] = 'Indirizzo 2';
$lang_resource['PAYPAL_TELEPHONE'] = 'Telefono';
$lang_resource['PAYPAL_CITY'] = 'Città';
$lang_resource['PAYPAL_REFERENCE'] = 'Riferimento';
$lang_resource['PAYPAL_REFERENCE'] = 'Elemento';
$lang_resource['PAYPAL_EXTRAS'] = 'Extras';
$lang_resource['PAYPAL_COMMENTS'] = 'Commenti';
$lang_resource['PAYPAL_PRICE'] = 'Prezzo';
$lang_resource['PAYPAL_INGREDIENTS'] = 'Ingredienti';
$lang_resource['PAYPAL_FREE_DELIVERY'] = 'Consegna Gratuita';
$lang_resource['PAYPAL_DELIVERY_COST'] = 'Costo di Consegna';
$lang_resource['PAYPAL_YOUR_ORDER_NUMBER_IS'] = 'il tuo numero d&apos;ordine è';
$lang_resource['PAYPAL_TANKYOU_ORDERING_SYSTEM'] = 'Grazie per aver ordinato su Pickeat!';
//REVIEW'0'0'0'0
$lang_resource['REVIEWS_THANKYOU_MESSAGE'] = 'Grazie per aver dato la tua valutazione, questo aiuterà le altre persone.';
//BUSINESS'0'0'0'0
$lang_resource['BUSINESS_ORDER'] = 'l&apos;ordine non esiste';
//FRONR MAIN MOBILE'0'0'0'0
$lang_resource['FRONTMOBILE_SUPER_ADMIN'] = 'Super admin';
$lang_resource['FRONTMOBILE_ADMINISTRATOR'] = 'Amministratore';
$lang_resource['FRONTMOBILE_BUSINESS'] = 'Ristoratore';
$lang_resource['FRONTMOBILE_CLIENT'] = 'Cliente';
$lang_resource['FRONTMOBILE_PASSWORD_REQUESTED'] = 'Password richiesta. La tua password è';
$lang_resource['FRONTMOBILE_REQUEST_PASSWORD'] = 'Richiedi password';
$lang_resource['CONTROL_PANEL_BUSINESS_DUPBLICATE_SLUG'] = 'Spiacente doppio slug inserito';
//ORDER'0'0'0'0
$lang_resource['ORDER_PENDING'] = 'In Attesa';
$lang_resource['ORDER_COMPLETED'] = 'Completato';
$lang_resource['ORDER_CANCELLED'] = 'Cancellato';
$lang_resource['ORDER_THERE'] = 'there';
$lang_resource['ORDER_YOUR_ORDER_STATUS_CHANGED'] = 'Lo stato del tuo ordine è cambiato in';
$lang_resource['ORDER_DID_YOU_ENJOY_YOUR_ORDER'] = 'Ti è piaciuto l&apos;ordine?';
$lang_resource['ORDER_PLEASE_HELP_REVIEWING_THE_RESTAURANT'] = 'Aiuta gli altri utenti inserendo la tua recensione per il locale da cui hai appena ordinato!Grazie!';
$lang_resource['ORDER_COPY_RIGHT'] = 'Pickeat. All Rights Reserved.';
$lang_resource['ORDER_DONT_WANT_TO_RECEIVE_THIS_EMAIL'] = 'Non vuoi più ricevere questa mail?';
$lang_resource['ORDER_UNSUBCRIBE'] = 'Unsubscribe';
//DISCOUNT'0'0'0'0
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT'] = 'CODICE SCONTO';
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_LIST'] = 'lista codici sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_MAINTEXT'] = 'Codici sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_EXPIRY'] = 'Data scaduta';
$lang_resource['CONTROL_PANEL_DISCOUNT_VALID_UPTO'] = 'Valido per (in giorni)';
$lang_resource['CONTROL_PANEL_DISCOUNT_MAXLIMIT'] = 'Limite Massimo';
$lang_resource['CONTROL_PANEL_DISCOUNT_RESTURANT'] = 'Business';
$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE'] = 'Percentuale di sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_BUSINESS_FOR_ALL'] = 'Discount for all';
$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE'] = 'Prezzo di Sconto';
$lang_resource['SHOPPING_DISCOUNT_CUPON'] = 'Codice Sconto ';
$lang_resource['SHOPPING_DISCOUNT_CUPON_ALERT'] = 'Per favore inserisci un codice sconto esatto';
$lang_resource['SHOPPING_DISCOUNT_CUPON_SORRY_MULTI'] = 'Mi dispiace! Puoi solo usare un solo codice sconto.';
$lang_resource['SHOPPING_WRONG_COUPON'] = 'Spiacenti! Hai inserito un codice sconto errato!';
$lang_resource['SHOPPING_DISCOUNT_TEXT'] = 'SCONTO';
$lang_resource['CONTROL_PANEL_DISCOUNT_TYPE'] = 'Tipo di sconto';
// SECTION DISCOUNT'0'0'0'0
$lang_resource['CONTROL_PANEL_DISCOUNT_ADD'] = 'Crea codice sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_EDIT'] = 'Modifica codice sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_DELETE'] = 'Cancella codice sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_TITLE'] = 'Lista generale codici sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN1'] = 'Codice Sconto ';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN2'] = 'Data scaduta';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN3'] = 'Raggiunti';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN4'] = 'Limite';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN5'] = 'Abilita';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN1'] = 'Nome del codice sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN2'] = 'Nome Attività';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN3'] = 'Data di Inizio';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN4'] = 'Data di Fine';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN5'] = 'Accettato';
$lang_resource['CONTROL_PANEL_DISCOUNT_ADD_OFFER'] = 'Crea codice sconto specifico';
$lang_resource['CONTROL_PANEL_DISCOUNT_EDIT_OFFER'] = 'modifica codice sconto specifico';
$lang_resource['CONTROL_PANEL_DISCOUNT_DELETE_OFFER'] = 'Cancella codice sconto specifico';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_TITLE'] = 'Lista specifica codici sconto';
//discount offer'0'0'0'0
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_OFFER'] = 'CODICI SCONTO AUTOMATICI';
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_LIST_OFFER'] = 'Automatic&nbsp;discount&nbsp;list';
$lang_resource['CONTROL_PANEL_DISCOUNT_ALERT_MSG_OFFER'] = 'Per favore seleziona almeno un&apos;attività';
$lang_resource['CONTROL_PANEL_DISCOUNT_CONFIRM_MSG_OFFER'] = 'Aggiungi questa offerta a tutte le attività';
$lang_resource['CONTROL_PANEL_DISCOUNT_DISCOUNT_TEXT'] = 'Testo codice sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_DISCOUNT_TYPE'] = 'Tipo di codice sconto';
$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE'] = 'Percentuale';
$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE'] = 'Prezzo';
$lang_resource['CONTROL_PANEL_DISCOUNT_MIN_PURCHASE'] = 'Acquisto Minimo';
$lang_resource['CONTROL_PANEL_DISCOUNT_FOR_ALL'] = 'Per tutti';
//FRONT-BULK'0'0'0'0
$lang_resource['FRONT_BULK_UNTIL'] = 'fino a';
//Template'0'0'0'0
$lang_resource['TEMPLATE_REVIEWS'] = 'Recensioni e Commenti';
$lang_resource['TEMPLATE_PAYMENTS'] = 'Pagamenti';
$lang_resource['TEMPLATE_SEE_MENU'] = 'Guarda il Menù e gli Ordini';
$lang_resource['TEMPLATE_FIND_OTHER']='Trova un&apos;altro Ristorante';
$lang_resource['TEMPLATE_QUALITY']='Qualità del cibo';
$lang_resource['TEMPLATE_PUNCTUALITY']='Puntualità';
$lang_resource['TEMPLATE_SERVICE']='Servizio';
$lang_resource['TEMPLATE_FOOD_PACKAGING']='Confezione';
$lang_resource['TEMPLATE_RATE_NOW']='Valuta Ora';
$lang_resource['TEMPLATE_COMMENTS']='Commenti:';
//Authenticate'0'0'0'0
$lang_resource['AUTHENTICATE_PLEASE_TRY_AGAIN']='Errore, prova di nuovo';
$lang_resource['AUTHENTICATE_INCORRECT_DATA']='Dati errati, prova di nuovo';
//Confirmation'0'0'0'0
$lang_resource['CONFIRMATION_COMMENTS']='GRAZIE PER IL TUO ORDINE';
$lang_resource['CONFIRMATION_YOUR_ORDER_HAS']='Il tuo Ordine e stato inserito, numero:';
$lang_resource['CONFIRMATION_COME_BACK_SOON']='A presto!';
$lang_resource['CONFIRMATION_SIGN_OUT']='Esci';
$lang_resource['CONFIRMATION_CHECK_ORDER_STATUS']='Controlla lo stato dell&apos;ordine';
$lang_resource['CONFIRMATION_WHERE_ARE_YOU']='Dove sei?';
$lang_resource['CONFIRMATION_LET_US_FIND_YOU']='Localizzami';
$lang_resource['CONFIRMATION_BACK']='Indietro';
//addrating'0'0'0'0
$lang_resource['ADDRATING_EXIRED_LINK']='Link Scaduto';
//business'0'0'0'0
$lang_resource['BUISNESS_ORDER_DOES_NOT_EXSIST']='l&apos;ordine non esiste';
//review'0'0'0'0
$lang_resource['REVIEW_THANK_YOU_VERY']='Grazie per aver dato la tua valutazione, questo aiuterà le altre persone.';
//FRONT_MAIN'0'0'0'0
$lang_resource['FRONT_MAIN_HOME_DELIVERY']='Costi di consegna';
$lang_resource['FRONT_MAIN_PAYMENT_METHOD']='Metodo di pagamento:';
$lang_resource['FRONT_MAIN_ANY_CHANGES_WITH']='Vuoi modificare l&apos;ordine?';
$lang_resource['FRONT_MAIN_CONTACT_RESTAURENT']='Contatta il locale';
$lang_resource['FRONT_MAIN_CONTACT_US']='Contattaci';
$lang_resource['FRONT_MAIN_BLOG']='Blog';
$lang_resource['FRONT_MAIN_COPYRIGHT']='Copyright &copy; Pickeat. All Rights Reserved.';
//orders'0'0'0'0
$lang_resource['ORDERS_YOUR_ORDER_CHANGED']='Lo stato del tuo ordine è cambiato in';
$lang_resource['ORDERS_DID_YOU_ENJOY']='Ti è piaciuto l&apos;ordine?';
$lang_resource['ORDERS_PLEASE_HELP']='Aiuta gli altri utenti inserendo la tua recensione per il locale da cui hai appena ordinato!Grazie!';
$lang_resource['ORDERS_FOLLOW_US_ON']='Seguici su:';
$lang_resource['ORDERS_ABOUT_US']='Chi Siamo';
$lang_resource['ORDERS_CONTACT_US']='Contattaci';
$lang_resource['ORDERS_BLOG']='Blog';
$lang_resource['ORDERS_DONT_WANT_TO']='Non vuoi più riceverne? -';
$lang_resource['ORDERS_UNSUBSCRIPT']='Unsubscribe';
$lang_resource['ORDERS_PANDING']='In Attesa';
$lang_resource['ORDERS_COMPLETED']='Completato';
$lang_resource['ORDERS_CANCLLED']='Cancellato';
// row'0'0'0'0
$lang_resource['SHOPPING_CLOSE_ORDER_ALERTTEXT']='Ristorante chiuso in questo momento, prova con un altro!';
// delivery area'0'0'0'0
$lang_resource['CONTROL_PANEL_BUTTON_DELIVERY_AREA'] = 'ZONE DI CONSEGNA';
$lang_resource['CONTROL_PANEL_BUTTON_DELIVERY_AREA_SMALL'] = 'Lista consegne';
$lang_resource['CONTROL_DELIVERY_ADD'] = 'Aggiungi zona di consegna';
$lang_resource['CONTROL_PANEL_DELIVERY_EDIT'] = 'Modifica zona di consegna';
$lang_resource['CONTROL_PANEL_DELIVERY_DELETE'] = 'Cancella zona di consegna';
$lang_resource['CONTROL_PANEL_DELIVERY_TITLE'] = 'Lista Zone di Consegna';
$lang_resource['CONTROL_PANEL_DELIVERY_COLUMN1'] = 'Nome Zona';
$lang_resource['CONTROL_PANEL_DELIVERY_COLUMN2'] = 'Prezzo';
$lang_resource['CONTROL_PANEL_DELIVERY_COLUMN5'] = 'Attivo';
//csv'0'0'0'0
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_CSVFILE'] = 'CSV upload';
$lang_resource['PANEL_CSV_PERMISSION_BLANK'] = 'Please upload CSV file';
$lang_resource['PANEL_CSV_PERMISSION_EXT'] = 'Please upload solo file CSV';
$lang_resource['PANEL_CSV_ZIP_CODE_TEXT'] = 'UPLOAD FILE ' ;
$lang_resource['PANEL_CSV_ZIP_BUSINESS_ID_TEXT'] = 'Please add business then you can upload product by CSV' ;
//index page'0'0'0'0
$lang_resource['MAIN_WRONG_URL'] = 'Attenzione! Hai inserito una url sbagliata';
$lang_resource['MAIN_SHOPPING_MENU_NO_SERVICE_AVAILABLE'] = 'Attenzione al momento nessun servizio disponibile';
$lang_resource['MAIN_SHOPPING_MENU_CATALOG_NO_AVAILABLE'] = 'Spiacenti! Nessun menù al momento disponibile per questo locale';
$lang_resource['MAIN_SHOPPING_MENU_CATALOG_POPUP'] = 'Orario.';
// Zip code search of business'0'0'0'0
$lang_resource['CONTROLL_PANEL_INVOICETDTL']='dettagli fattura';
$lang_resource['CONTROLL_PANEL_INVOICETEXT']='fattura';
$lang_resource['CONTROLL_PANEL_ZIPTEXT']='AGGIUNGI CAP';
$lang_resource['CONTROLL_PANEL_ZIPBUSINESS']='business wise';
$lang_resource['CONTROL_PANEL_ZIPCODE_ADD']='AGGIUNGI CAP';
$lang_resource['CONTROL_PANEL_ZIPCODE_TITLE']='CERCA CAP DI TUTTI I LOCALI';
$lang_resource['CONTROL_PANEL_ZIPCODELIST_TITLE']='CERCA LISTA CAP';
$lang_resource['CONTROL_PANEL_ZIPCODELIST_ENABLE']='Attivo';
$lang_resource['CONTROL_PANEL_ZIPCODE_ZIP']='Cap';
$lang_resource['CONTROL_PANEL_ZIPCODE_PRICE']='Costo di Consegna';
$lang_resource['CONTROL_PANEL_ZIPCODE_BISINESS']='Nome Attività';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_ADD']='AGGIUNGI CAP';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_EDIT']='Modifica CAP';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_DELETE']='Cancella CAP';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_UPLOAD']='Carica CSV ';
$lang_resource['PANEL_CSV_PERMISSION_BLANK']='Per favore carica solo CSV file ';
$lang_resource['PANEL_CSV_PERMISSION_EXT']='Per favore carica solo CSV file ';
$lang_resource['PANEL_CSV_BUTTON_LEVEL']='Carica CSV ';
$lang_resource['PANEL_CSV_ZIP_CODE_TEXT']='Carica CAP';
$lang_resource['PANEL_CREATE_ZIPCODE']='CREA CAP';
$lang_resource['PANEL_EDIT_ZIPCODE']='Modifica CAP';
$lang_resource['PANEL_FORM_ZIP_DELIVERYTEXT']='Costo di Consegna';
//new'0'0'0'0
$lang_resource['SHOPPING_CLOSE_ORDER_ALERTTEXT']='Ristorante chiuso in questo momento, prova con un altro!';
//Delivery KM wise'0'0'0'0
$lang_resource['CONTROLL_PANEL_IDELIVERYTEXT']='Zona di Consegna';
$lang_resource['CONTROLL_PANEL_IDELIVERY_SHORTTEXT']='Km esatti';
$lang_resource['GALLERY_PANEL']='Galleria';
$lang_resource['GALLERY_PANEL_AREA_SMAL']='Immagini Galleria';
// SECTION GALLERY'0'0'0'0
$lang_resource['CONTROL_PANEL_GALLERY_BUTTON_CREATE'] = 'Crea galleria';
$lang_resource['CONTROL_PANEL_GALLERY_BUTTON_EDIT'] = 'Modifica Galleria';
$lang_resource['CONTROL_PANEL_GALLERY_BUTTON_DELETE'] = 'Cancella Galleria';
$lang_resource['CONTROL_PANEL_GALLERY_TYPE_HEADER'] = 'Tipo';
$lang_resource['CONTROL_PANEL_GALLERY_BUSINESS'] = 'Attività:';
//business'0'0'0'0
$lang_resource['CONTROL_PANEL_BUSINESS_PROMOTIONCODE'] = 'Codice promozionale:';
$lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_ABOUT'] = 'Informazioni Attività';
$lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_DESCRIPTION'] = 'Property Description:';
$lang_resource['CONTROL_PANEL_BUTTON_FOOTER_PAGES'] = 'FOOTER PAGES';
//FOOTER DYNAMIC LINK'0'0'0'0
$lang_resource['CONTROL_PANEL_FOOTER_HEADER1'] = 'Nome Pagina';
$lang_resource['CONTROL_PANEL_FOOTER_HEADER2'] = 'URL';
$lang_resource['CONTROL_PANEL_FOOTER_HEADER3'] = 'Attivato';
$lang_resource['CONTROL_PANEL_FOOTER_HEADER4'] = 'Colonna Footer';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_TITLE'] = 'Lista Pagine';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_CREATE'] = 'Crea footer page';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_EDIT'] = 'Modifica footer page';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_DELETE'] = 'Cancella footer page';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_PANEL'] = 'Colonna Footer';
//image upload'0'0'0'0
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD'] = 'Carica Immagine';
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD_SMALL_TEXT'] = '_';
//other pending july 2014'0'0'0'0
$lang_resource['ELSE_HP'] = 'oppure';
$lang_resource['PICKUP_DELIVERY'] = 'Seleziona';
$lang_resource['DELIVERY'] = 'Consegna';
$lang_resource['PICKUP'] = 'Asporto';
$lang_resource['Show_Restaurants'] = 'Visualizza Ristoranti';
$lang_resource['ALERT_PICKUP_DELIVERY'] = 'Scegli un Servizio, Consegna a Domicilio o Asporto';
$lang_resource['SHOWHIDE'] = 'Visualizza/Nascondi Mappa';
$lang_resource['OPENEDRESTAURANTS'] = 'Ristoranti Aperti';
$lang_resource['CLOSEDRESTAURANTS'] = 'Ristoranti Chiusi';
$lang_resource['DISTANCE'] = 'Distanza:';
$lang_resource['PREORDER'] = 'Preordina:';
$lang_resource['CHOOSEDELTIMEPREORDER'] = 'Scegli l&apos;orario di consegna per il preordine';
$lang_resource['PREORDERDATE'] = 'Seleziona la data di preordine';
$lang_resource['PREORDERTIME'] = 'Seleziona Orario di Consegna';
$lang_resource['Delivery_Option'] = 'Scegli opzioni di consegna';
$lang_resource['Total_Orders'] = 'Totale Ordini';
$lang_resource['Total_Sales'] = 'Totale Vendite';
$lang_resource['Total_Commissions'] = 'Totale Commissioni';
$lang_resource['Total_Turnover'] = 'Total Turnover';
$lang_resource['Week'] = 'Settimana';
$lang_resource['Month'] = 'Mese';
$lang_resource['Year'] = 'Anno';
$lang_resource['Today'] = 'Oggi';
$lang_resource['Panel_Currency'] = '€';
$lang_resource['Orders_Today'] = 'Ordini di Oggi';
$lang_resource['Sales_Today'] = 'Vendite';
$lang_resource['Pending_Orders'] = 'Ordini in Attesa';
$lang_resource['Completed_Orders'] = 'Ordini Completati';
$lang_resource['Cancelled_Orders'] = 'Ordini Cancellati';
$lang_resource['Last7days'] = 'Ultimi 7 gg';
$lang_resource['Last30days'] = 'Ultimi 30 gg';
$lang_resource['INFO_V21'] = 'Info';
$lang_resource['OFFERS_V21'] = 'Offerte';
$lang_resource['MENU_V21'] = 'Menu';
$lang_resource['REVIEWS_V21'] = 'Recensioni';
$lang_resource['CATALOG_V21'] = 'CATALOGO MENU&apos;';
$lang_resource['PHOTOG_V21'] = 'Galleria Foto';
$lang_resource['ABOUTR_V21'] = 'Info Ristorante';
$lang_resource['DELIVERYL_V21'] = 'Zone di Consegna ';
$lang_resource['DELIVERYP_V21'] = 'Costo di Consegna:';
$lang_resource['VIDEOG_V21'] = 'Galleria Video';
$lang_resource['REVIEWSOF_V21'] = 'Recensione di';
$lang_resource['OFFERSSOF_V21'] = 'Offerte di';
$lang_resource['DATE_V21'] = 'Data';
$lang_resource['NAMECITY_V21'] = 'Nome/Città';
$lang_resource['RATING_V21'] = 'Rating';
$lang_resource['NOREVIEW_V21'] = 'Nessuna recensione trovata';
$lang_resource['NOOFFER_V21'] = 'Nessuna offerta disponibile in questo momento';
$lang_resource['OUTOF_V21'] = 'per';
$lang_resource['OFFERN_V21'] = 'Nome Offerta';
$lang_resource['OFFERP_V21'] = 'Prezzo Offerta';
$lang_resource['STARTD_V21'] = 'Data di Inizio';
$lang_resource['ENDD_V21'] = 'Data di Fine';
$lang_resource['GUESTUSER_V21'] = 'Utente Ospite';
$lang_resource['COMMISSION_V21'] = 'Commissione';
$lang_resource['COMMISSIONSET_V21'] = 'Imposta commissione';
$lang_resource['SITESETTINGS_V21'] = 'Impostazioni Sito';
$lang_resource['LOGOSETTINGS_V21'] = 'Impostazini Logo';
$lang_resource['SITENAME_V21'] = 'Nome Sito';
$lang_resource['SITEURL_V21'] = 'Sito Url:';
$lang_resource['FACEBOOKLINK_V21'] = 'Facebook link:';
$lang_resource['TWITTERLINK_V21'] = 'Twitter link:';
$lang_resource['RSSLINK_V21'] = 'RSS link:';
$lang_resource['FACEBOOKFANPAGELINK_V21'] = 'Facebook fanpage link:';
$lang_resource['FACEBOOKAPPID_V21'] = 'Facebook client’s app id';
$lang_resource['HELPPAGELINK_V21'] = 'Help page link:';
$lang_resource['METAKEYWORDS_V21'] = 'Meta keywords:';
$lang_resource['MAILCHIMPAPI_V21'] = 'Mailchimp API:';
$lang_resource['MAILCHIMPLIST_V21'] = 'Mailchimp Listid:';
$lang_resource['MetaDescription_V21'] = 'Meta Description:';
$lang_resource['UPLOADLOGO_V21'] = 'CARICA IMMAGINE LOGO';
$lang_resource['TOPLOGO_V21'] = 'Logo in alto';
$lang_resource['BOTTOMLOGO_V21'] = 'Logo in fondo';
$lang_resource['UPLOADBANNERIMAGE_V21'] = 'CARICA IMMAGINE BANNER';
$lang_resource['BANNER_V21'] = 'Banner';
$lang_resource['SELECT_V21'] = 'Seleziona';
$lang_resource['DELIVERYL_V21'] = 'Zona di Consegna';
$lang_resource['MINP_V21'] = 'Acquisto Minimo';
$lang_resource['ZONEN_V21'] = 'Nome Zona';
$lang_resource['DELIVERYA_V21'] = 'Indirizzo di Consegna';
$lang_resource['CLOSE_V21'] = 'CHIUSO';
$lang_resource['TRACKNOW_V21'] = 'Traccia Subito';
$lang_resource['NORESTAURANTONCOUNTRY_V21'] = 'Nessun Ristorante trovato in questo paese';
$lang_resource['NOVALID_V21'] = 'Attesa';
$lang_resource['CARTEMPTY_V21'] = 'Carrello Vuoto';
$lang_resource['CHOOSERESTAURANT_V21'] = 'Scegli un Ristorante';
$lang_resource['NORESTAURANTAVAILABLE_V21'] = 'Spiacenti! Nessun ristorate nella tua zona';
$lang_resource['ERROR_V21'] = 'Errore';
$lang_resource['URL_CATALOG'] = 'URL REDIRECT (disables ordering)';
// SECTION DRIVER MANAGER'0'0'0'0
$lang_resource['CONTROLL_PANEL_DRIVERTDTL']='_';
$lang_resource['CONTROLL_PANEL_DRIVERTEXT']='Driver Manager';
$lang_resource['CONTROL_PANEL_DRIVER_NAME_HEADER1'] = 'Driver Manager';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_TITLE'] = 'CREATE DRIVER MANAGER';
$lang_resource['CONTROL_PANEL_DRIVER_EDIT_TITLE'] = 'EDIT DRIVER MANAGER';
$lang_resource['CONTROL_PANEL_DRIVER_BUTTON_CREATE'] = 'Add driver manager';
$lang_resource['CONTROL_PANEL_DRIVER_BUTTON_EDIT'] = 'Edit driver manager';
$lang_resource['CONTROL_PANEL_DRIVER_BUTTON_DELETE'] = 'Delete driver manager';
$lang_resource['CONTROL_PANEL_DRIVER_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_DRIVER_GROUP_HEADER'] = 'Group';
$lang_resource['CONTROL_PANEL_DRIVER_EMAIL_HEADER'] = 'E-mail';
$lang_resource['CONTROL_PANEL_DRIVER_ENABLE_HEADER'] = 'Enabled';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_LAST_NAME'] = 'Last Name:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_EMAIL'] = 'E-mail:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_STREET'] = 'Address:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_ZIP'] = 'Zip code:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_COUNTRY'] = 'Country:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_CITY'] = 'City:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_PHONE'] = 'Phone:';
$lang_resource['CONTROL_PANEL_DRIVER_CREATE_INPUT_MOBILE'] = 'Mobile:';
$lang_resource['DRIVER_EMAIL_ADDRESS_ALREADY_REGISTERED'] = 'Email already registered';
$lang_resource['DRIVER_VALID_EMAIL_PLEASE'] = 'Enter Valid Email';
// SECTION DRIVER Group'0'0'0'0
$lang_resource['CONTROLL_PANEL_DRIVERGROUPTDTL']='_';
$lang_resource['CONTROLL_PANEL_DRIVERGROUPTEXT']='Driver Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_NAME_HEADER1'] = 'Driver Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_TITLE'] = 'CREATE DRIVER Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_EDIT_TITLE'] = 'EDIT DRIVER Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_BUTTON_CREATE'] = 'Add driver Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_BUTTON_EDIT'] = 'Edit driver Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_BUTTON_DELETE'] = 'Delete driver Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_GROUP_HEADER'] = 'Group';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_EMAIL_HEADER'] = 'E-mail';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_ENABLE_HEADER'] = 'Enabled';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_LAST_NAME'] = 'Last Name:';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_EMAIL'] = 'E-mail:';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_STREET'] = 'Address:';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_ZIP'] = 'Zip code:';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_COUNTRY'] = 'Country:';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_CITY'] = 'City:';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_PHONE'] = 'Phone:';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_MOBILE'] = 'Mobile:';
$lang_resource['DRIVER_EMAIL_ADDRESS_ALREADY_REGISTERED'] = 'Email already registered';
$lang_resource['DRIVER_VALID_EMAIL_PLEASE'] = 'Enter Valid Email';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_MANAGER'] = 'Select Manager';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_NAME'] = 'Group Name';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_COMMISIONTYPE'] = 'Commision Type';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_COMMISIONRATE'] = 'Commision Rate';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_FIXED'] = 'Fixed Rate Amount';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_PERDAY'] = 'Per Day';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_PERMONTH'] = 'Per Month';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_PERYEAR'] = 'Per Year';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_CREATE_INPUT_RESTURANT'] = 'Resturant Assign';
// SECTION DRIVER1'0'0'0'0
$lang_resource['CONTROLL_PANEL_DRIVER1TDTL']='driver list';
$lang_resource['CONTROLL_PANEL_DRIVER1TEXT']='Driver';
$lang_resource['CONTROL_PANEL_DRIVER1_NAME_HEADER1'] = 'Driver';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_TITLE'] = 'CREATE Driver';
$lang_resource['CONTROL_PANEL_DRIVER1_EDIT_TITLE'] = 'EDIT Driver';
$lang_resource['CONTROL_PANEL_DRIVER1_BUTTON_CREATE'] = 'Add Driver';
$lang_resource['CONTROL_PANEL_DRIVER1_BUTTON_EDIT'] = 'Edit Driver';
$lang_resource['CONTROL_PANEL_DRIVER1_BUTTON_DELETE'] = 'Delete Driver';
$lang_resource['CONTROL_PANEL_DRIVER1_NAME_HEADER'] = 'Name';
$lang_resource['CONTROL_PANEL_DRIVER1_GROUP_HEADER'] = 'Group';
$lang_resource['CONTROL_PANEL_DRIVER1_EMAIL_HEADER'] = 'E-mail';
$lang_resource['CONTROL_PANEL_DRIVER1_ENABLE_HEADER'] = 'Enabled';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_FIRST_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_LAST_NAME'] = 'Last Name:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_EMAIL'] = 'E-mail:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_STREET'] = 'Address:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_ZIP'] = 'Zip code:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_COUNTRY'] = 'Country:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_CITY'] = 'City:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_PHONE'] = 'Phone:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_MOBILE'] = 'Mobile:';
$lang_resource['DRIVER1_EMAIL_ADDRESS_ALREADY_REGISTERED'] = 'Email already registered';
$lang_resource['DRIVER1_VALID_EMAIL_PLEASE'] = 'Enter Valid Email';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_MANAGER'] = 'Select Manager';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_NAME'] = 'Select Group';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_BACK'] = 'background:';
$lang_resource['CONTROL_PANEL_DRIVER1_CREATE_INPUT_GPRS'] = 'Drivers GPS tracking url:';
//new from december 2014'0'0'0'0
$lang_resource['MAIN_HEADER_PART_COUNT_DOWN'] = 'This demo will be reseted in';
$lang_resource['LIVE_COUNTER'] = 'Demo  Reset :';
$lang_resource['LIVE_COUNTER_RENGE'] = 'Demo  Reset  In Minutes:';
// COMMONPART'0'0'0'0
$lang_resource['SITE_URL'] = 'http://development2.orderingonlinesystem.com';
$lang_resource['SITE_CURRENCY'] = '$';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_INVOICEING'] = 'invoicing';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_IMAGE'] = 'Image';
$lang_resource['CONTROL_PANEL_BUSINESS_MENUS_USER_HEADER'] = 'User Comments :';
$lang_resource['CONTROL_PANEL_ADS_CREATE_INPUT_EMBED'] = 'Emdeded Code (405 x 215):';
$lang_resource['RESERVE_THANKS_PLCED'] = 'Your Reserve has been placed successfully.';
$lang_resource['RESERVE_PROCESSED'] = 'Your Reserve number is:';
$lang_resource['ORDER_RESERVE_THANKS_PLCED'] = 'Your order & reserve has been placed successfully.';
$lang_resource['ORDER_RESERVE_PROCESSED'] = 'Your order & reserve number is:';
$lang_resource['CONTROLL_PANEL_CMSFOOTERDTL']='page list';
$lang_resource['CONTROLL_PANEL_CMSFOOTER']='cms module';
//footer cms'0'0'0'0
$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING0'] = 'Custom Url';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING1'] = 'Page Title';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING2'] = 'Page Heading';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING3'] = 'Page Content';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING4'] = 'Meta Keywords';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_HEADING5'] = 'Meta Content';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_CREATE'] = 'Create Page';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_EDIT'] = 'Edit Page';
$lang_resource['CONTROL_PANEL_FOOTER_CMS_DELETE'] = 'Delete Page';
$lang_resource['SHOPPING_PREORDER'] = 'Preorder';
$lang_resource['PREORDER_DELIVERY'] = 'Preorder delivery time';
$lang_resource['GOOGLEPLUS_V21'] = 'g+ link:';
$lang_resource['LINKENDIN_V21'] = 'LINKENDIN link:';
$lang_resource['EmailFrom_V21'] = 'Email From:';
$lang_resource['PANELTOPLOGO_V21'] = 'Panel Logo 205x29 px';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_COMMISION_DOLLAR'] = 'Commision in $ per order';
$lang_resource['CONTROL_PANEL_DRIVERGROUP_COMMISION_PERCENT'] = 'Commision in % per order';
//product options'0'0'0'0
$lang_resource['PRODUCT_POTIONS_SELECT_OPTIONS']='Please select your options';
$lang_resource['PRODUCT_POTIONS_QUANTITY']='Quantity';
$lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION']='Special Instruction';
$lang_resource['PRODUCT_POTIONS_ADD_SPECIAL_INSTRCTION']='Add Special Instruction';
$lang_resource['PRODUCT_POTIONS_PIZZA_INGREDIENT']='Is this Pizza Ingredient ?';
$lang_resource['PRODUCT_POTIONS_SELECT_PIZZA_INGREDIENT']='Please select Pizza ingredient';
$lang_resource['PRODUCT_POTIONS_INGREDIENT']='Ingredient';
$lang_resource['PRODUCT_POTIONS_MINUS']='Minus';
$lang_resource['PRODUCT_POTIONS_SPECIAL_INSTRCTION']='Special Instruction';
$lang_resource['PRODUCT_OPOTIONS_INACTIVE']='Inactive';
$lang_resource['PRODUCT_OPOTIONS_ACTIVE']='Active';
$lang_resource['PRODUCT_OPOTIONS_PRODUCT_OPOTIONS']='Product Options';
$lang_resource['PRODUCT_OPOTIONS_ACTION']='Action';
$lang_resource['PRODUCT_OPOTIONS_YOUR_REST_HAS_BEEN']='Your restaurant has been created but it has to be approved by the administrator of the website, you will get a E-mail notification when this has been done, thank you.';
$lang_resource['PRODUCT_OPOTIONS_SELECT_OPTION']='Select Option';
$lang_resource['PRODUCT_OPOTIONS_NAME_FOR']='Name for product option:';
$lang_resource['PRODUCT_OPOTIONS_TEXT_TO_END']='Text to end user:';
$lang_resource['PRODUCT_OPOTIONS_CHOICE']='Number of choice:';
$lang_resource['PRODUCT_OPOTIONS_RANK_FOR']='Rank for this option';
$lang_resource['PRODUCT_OPOTIONS_MIN_SELE']='Min Selection:';
$lang_resource['PRODUCT_OPOTIONS_MAX_SELE']='Max Selection:';
$lang_resource['PRODUCT_OPOTIONS_CONDITIONAL']='Conditional:';
$lang_resource['PRODUCT_OPOTIONS_PIZZA']='Pizza ingredient:';
$lang_resource['CONTROL_PANEL_BUSINESS_EXTRAS_CREATE_INPUT_SET']='Set Name:';
$lang_resource['PRODUCT_POTIONS_INGREDIENTS_TEXT']='INGREDIENTS ';
//Days'0'0'0'0
$lang_resource['DAY1'] = 'Lunedì';
$lang_resource['DAY2'] = 'Martedì';
$lang_resource['DAY3'] = 'Mercoledì';
$lang_resource['DAY4'] = 'Giovedì';
$lang_resource['DAY5'] = 'Venerdì';
$lang_resource['DAY6'] = 'Sabato';
$lang_resource['DAY7'] = 'Domenica';
//Months'0'0'0'0
$lang_resource['MONTH1'] = 'Gennaio';
$lang_resource['MONTH2'] = 'Febbraio';
$lang_resource['MONTH3'] = 'Marzo';
$lang_resource['MONTH4'] = 'Aprile';
$lang_resource['MONTH5'] = 'Maggio';
$lang_resource['MONTH6'] = 'Giugno';
$lang_resource['MONTH7'] = 'Luglio';
$lang_resource['MONTH8'] = 'Agosto';
$lang_resource['MONTH9'] = 'Settembre';
$lang_resource['MONTH10'] = 'Ottobre';
$lang_resource['MONTH11'] = 'Novembre';
$lang_resource['MONTH12'] = 'Dicembre';
//register'0'0'0'0
$lang_resource['REGISTER_CONFIRM_MAIL'] = 'Grazie per esserti registrato/a!';
$lang_resource['FAVOURITE_RESTAURENT_TEXT'] = 'Ristoranti Favoriti';
$lang_resource['MYACOUNT_ADD_EDIT'] = 'Aggiungi/Modifica indirizzo';
$lang_resource['SHOPPING_ADD_FAVOURITE'] = 'Aggiungi a Favoriti';
//business'0'0'0'0
$lang_resource['BUSINESS_PAGE_TEXT_MAP'] = 'Mappa';
//v3'0'0'0'0
$lang_resource['CONTINUE'] = 'Continua';
$lang_resource['MOBILE_BUSINESS_DROP_LIST_PICKUP'] = 'Asporto';
$lang_resource['MOBILE_BUSINESS_DROP_LIST_DELIVERY'] = 'Consegna';
//Multitag languages'0'0'0'0
$lang_resource['MULTITAG_LANGUAGE_RESTAURANTS'] = 'Ristoranti';
$lang_resource['MULTITAG_LANGUAGE_CUISINES'] = 'Cucina';
//Reservation'0'0'0'0
$lang_resource['RESERVATION_V21'] = 'Reservation';
$lang_resource['MOBILE_BUSINESS_DROP_LIST_RESERVE'] = 'Reservation';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_RESERVE'] = 'Reservation';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_BUTTON_CREATE'] = 'Create reservation';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_BUTTON_EDIT'] = 'Edit reservation';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_BUTTON_DELETE'] = 'Delete reservation';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_NAME_HEADER'] = 'Type';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_SEAT_HEADER'] = 'Seat';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_TITLE'] = 'CREATE RESERVATION';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_EDIT_TITLE'] = 'EDIT RESERVATION';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_INPUT_TYPE'] = 'Type:';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_INPUT_RESERVESION_TYPE'] = 'Reservation Type:';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_CREATE_INPUT_GUEST'] = 'Total No. of Guest';
$lang_resource['CONTROL_PANEL_BUSINESS_RESERVE_DURATION'] = 'Duration';
$lang_resource['SHOPPING_RESERVATION_TABLE_EMPTY'] = 'Please use our search box to see the available results for this business';
$lang_resource['SHOPPING_RESERVATION_FILTER_OPTION'] = 'Optional filters';
//Pickup'0'0'0'0
$lang_resource['SHOPPING_MENU_PICKUP_ALLOW'] = 'Sorry! this menu not allow for pickup';
$lang_resource['SHOPPING_MENU_DELIVERY_ALLOW'] = 'Sorry! this menu not allow for delivery';
$lang_resource['SHOPPING_MENU_PICKUP_DELIVERY_ALLOW'] = 'Sorry! this menu not allow for pickup or delivery';
//front.js'0'0'0'0
$lang_resource['FRONT_RETURNING_CUSTOMER'] = 'Vecchio Cliente';
$lang_resource['FRONT_REMEMBER_ME'] = 'Ricordami';
$lang_resource['FRONT_SIGN_IN_TO_CHECKOUT'] = 'Accedi per andare alla cassa';
$lang_resource['FRONT_NEW_CUSTOMER'] = 'Nuovo Cliente';
$lang_resource['FRONT_SAVE_TIME_NOW'] = 'Risparmia tempo!';
$lang_resource['FRONT_YOU_DONT_HAVE_ACCOUNT'] = 'Non è necessario avere un account per procedere';
$lang_resource['FRONT_CONTINUE_AS_A_GUEST'] = 'Continua come Ospite';
$lang_resource['FRONT_CREATE_ACCOUNT'] = 'Crea Account';
$lang_resource['FRONT_CREATE_ACCOUNT_FOR_FAST_CHECKOUT'] = 'Crea un account per ordinare più velocemente e per aver accesso agli ordini precendenti';
$lang_resource['FRONT_MY_ACCOUNT'] = 'Mio Profilo';
$lang_resource['FRONT_MY_SUBMIT'] = 'Iscriviti';
$lang_resource['FRONT_SELECT_PREORDER_DATE'] = 'Per favore, seleziona la data per il preordine';
$lang_resource['FRONT_SELECT_PREORDER_TIME'] = 'Per favore seleziona l&apos;ora per il preordine';
$lang_resource['FRONT_PREORDER_TIME_IN_MINUTE'] = 'Per favore seleziona i minuti per il preordine';
$lang_resource['FRONT_SELECT_DELIVERY_OPTION'] = 'per favore seleziona un&apos;opzione di consegna';
$lang_resource['FRONT_SORRY_DELIVERY_OPTION'] = 'Spiacenti! Nessuna consegna in questa zona';
$lang_resource['FRONT_LOGIN_ADD_FAVORITE'] = 'Per favore accedi per aggiungere ai favoriti';
$lang_resource['FRONT_NO_RESULT_FOUND'] = 'Nessun risultato trovato';
$lang_resource['FRONT_GEOCODER_FAILED'] = 'Geocoder fallito a causa di:';
$lang_resource['FRONT_TRACK_ORDER'] = 'Inserisci il n° d&apos;ordine';
$lang_resource['FRONT_NO_PERMISSION_TO_SHOW_ORDER'] = 'Non hai i permessi per vedere questo ordine';
$lang_resource['FRONT_DRIVER_COMMENTS'] = 'Commenti per il fattorino:';
$lang_resource['FRONT_DRIVER_TIME'] = 'Tempo :';
$lang_resource['FRONT_RESERVATION_TABLE'] = 'Tavolo';
$lang_resource['FRONT_RESERVATION_ROOM'] = 'Stanza';
$lang_resource['FRONT_RESERVATION_FREE'] = 'Gratuita';
$lang_resource['FRONT_No_TIENES_PERMISO'] = 'Non hai i permessi per vedere questo ordine';
//shopping.js'0'0'0'0
$lang_resource['SHOPPING_REFINE_YOUR'] = 'Perfeziona';
$lang_resource['SHOPPING_REFINE_RESULTS'] = 'risultati';
$lang_resource['SHOPPING_HIDE_MAP'] = 'Nascondi Mappa';
$lang_resource['SHOPPING_SELECT_LOCATION'] = 'Inserisci il tuo indirizzo';
$lang_resource['SHOPPING_PICKUP_RESTAURANT'] = 'Scegli il tuo locale preferito';
$lang_resource['SHOPPING_PLACE_ORDER'] = 'Fai l&apos;ordine';
$lang_resource['SHOPPING_MAKE_PAYMENT'] = 'Paga';
$lang_resource['SHOPPING_GET_DELIVERED'] = 'Attendi la consegna e Buon Appetito!';
$lang_resource['SHOPPING_PLACEHOLDER_RESTAURANT_FOOD_CATEGORY'] = 'Ristoranti, categoria cucina';
$lang_resource['SHOPPING_REFINE'] = 'Perfeziona';
$lang_resource['SHOPPING_LOCATION'] = 'Zona';
$lang_resource['SHOPPING_RESTAURANT'] = 'Ristorante';
$lang_resource['SHOPPING_LOGIN_FIRST'] = 'Per favore prima accedi';
$lang_resource['SHOPPING_RESERVATION_OPTIONS'] = 'Opzioni Prenotazione:';
$lang_resource['SHOPPING_YOU_HAVE'] = 'Hai';
$lang_resource['SHOPPING_ITEMS'] = 'Articolo';
$lang_resource['SHOPPING_DELIVERY_TIME_IN_HOUR'] = 'Per favore seleziona l&apos;ora per consegna';
$lang_resource['SHOPPING_DELIVERY_TIME_IN_MINUTE'] = 'Per favore seleziona i minuti per la consegna';
$lang_resource['SHOPPING_CONFIGURE_YOUR_SMS_PLUG'] = 'Configura SMS plug in.';
$lang_resource['SHOPPING_PROGRESS_ORDER_AND_RESERVE'] = 'Vuoi conoscere lo stato di avanzamento del tuo ordine?';
$lang_resource['SHOPPING_NEED_CHANGE_ORDER_RESERVE'] = 'Vuoi modificare l&apos;ordine?';
$lang_resource['SHOPPING_KNOW_THE_PROGRESS_ORDER'] = 'Vuoi conoscere lo stato di avanzamento del tuo ordine?';
$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_ORDER'] = 'Vuoi modificare l&apos;ordine?';
$lang_resource['SHOPPING_PROGRESS_OF_YOUR_RESERVE'] = 'Do you want know the progress of your Reserve?';
$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_RESERVE'] = 'Need change on your Reserve?';
$lang_resource['SHOPPING_TRACK_NOW'] = 'TRACCIA ORDINE';
$lang_resource['SHOPPING_TRACK_NOW'] = 'Please select Reserve Date Time Guest Field';
//18/11/2014/index.php'0'0'0'0
$lang_resource['INDEX_SUBSCRIBE_TO_NEWSLETTER'] = 'Iscriviti alla newsletter';
$lang_resource['INDEX_SUBSCRIBE'] = 'Iscriviti';
//front-visuals.js'0'0'0'0
$lang_resource['FRONT_VISUALS_DELIVERS_YOUR_NEIGHBORHOOD'] = 'Ordina online a domicilio dai ristoranti della tua zona';
$lang_resource['FRONT_VISUALS_MOST_POPULAR'] = 'I più popolari';
$lang_resource['FRONT_VISUALS_HOW_IT_WORKS'] = 'Come Funziona';
$lang_resource['FRONT_VISUALS_MOST_POPULAR_CUISINE'] = 'Most Popular Cuisine';
$lang_resource['FRONT_VISUALS_FOOD_OF_THE_WEEK'] = 'Cibo della Settimana';
$lang_resource['FRONT_VISUALS_RECENTS_ORDERS'] = 'Ultimi Ordini';
$lang_resource['FRONT_VISUALS_CAPTURE_SHARE_WORLD_MOMENTS'] = 'Ordina anche dal tuo Smartphone o Tablet';
$lang_resource['FRONT_VISUALS_INSTAGRAM'] = 'Grazie a Pickeat potrai ordinare comodamente dal tuo divano e senza muovere un dito, (ehmmm... si il dito lo dovrai muovere) direttamente dal tuo smartphone o tablet! Che aspetti scarica l&apos;app! Te l&apos;abbiamo detto che è gratuito? Muovi il dito!';
$lang_resource['FRONT_VISUALS_HELP'] = 'Aiuto';
$lang_resource['FRONT_VISUALS_MOBILE_PHONE'] = 'Numero Cellulare *';
$lang_resource['FRONT_VISUALS_LAND_PHONE'] = 'Telefono fisso';
$lang_resource['FRONT_VISUALS_POST_CODE'] = 'CAP *';
$lang_resource['FRONT_VISUALS_STREET'] = 'Via *';
$lang_resource['FRONT_VISUALS_PASSWORD_M'] = 'Password *';
$lang_resource['FRONT_VISUALS_PASSWORD'] = 'Password';
$lang_resource['FRONT_VISUALS_NAME'] = 'Nome';
$lang_resource['FRONT_VISUALS_MIDDLE_NAME'] = 'Secondo Nome';
$lang_resource['FRONT_VISUALS_LAST_NAME'] = 'Cognome';
$lang_resource['FRONT_VISUALS_EMAIL'] = 'Email';
$lang_resource['FRONT_VISUALS_COLONY'] = 'Regione';
$lang_resource['FRONT_VISUALS_LETS_GO'] = 'Vai!';
$lang_resource['FRONT_VISUALS_RESTAURANT'] = 'Ristorante';
$lang_resource['FRONT_VISUALS_APPLY'] = 'Applica';
$lang_resource['FRONT_VISUALS_RESTAURANTS'] = 'Ristoranti';
$lang_resource['FRONT_VISUALS_SELECT_TYPE'] = 'Seleziona tipo';
$lang_resource['FRONT_VISUALS_RESTAURANTS_CUISINES'] = 'Ristoranti, cucine';
$lang_resource['FRONT_VISUALS_MMDDYY'] = 'mm-dd-yyyy';
$lang_resource['FRONT_VISUALS_SKIP'] = 'Salta';
$lang_resource['FRONT_VISUALS_SAVE_CONTINUE'] = 'Salva &amp; Continua';
//front-main.php'0'0'0'0
$lang_resource['FRONT_MAIN_EMAIL_OPTIONS'] = 'Opzioni';
$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'] = 'Ciao,';
$lang_resource['FRONT_MAIN_EMAIL_PASSWORD_REQUESTED'] = 'La password richiesta è';
$lang_resource['FRONT_MAIN_EMAIL_YOUR_ORDER_AND_RESERVATION_PLACED_SUCCES'] = 'il tuo ordine &amp; la prenotazione è avvenuta con successo!';
$lang_resource['FRONT_MAIN_EMAIL_RESERVATION_HASE_BEEN_PLASSED_SUCCESS'] = 'Your Reservation has been placed successfully!';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_SUCCESS'] = 'il tuo ordine è avvenuto con successo';
$lang_resource['FRONT_MAIN_EMAIL_ORDER'] = 'ordine';
$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'] = 'Dettagli Utente';
$lang_resource['FRONT_MAIN_EMAIL_PHONE'] = 'Telefono';
$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'] = 'Indirizzo';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_TYPE'] = 'Tipo Di Ordine';
$lang_resource['FRONT_MAIN_EMAIL_PREORDER'] = 'Preordina';
$lang_resource['FRONT_MAIN_EMAIL_PREORDER_DATE_TIME'] = 'Data e ora preordine';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'] = 'Paga In Contanti Al Ricevimento Dell Ordine';
$lang_resource['FRONT_MAIN_EMAIL_AND_CARD'] = 'e Carte';
$lang_resource['FRONT_MAIN_EMAIL_ITEMS'] = 'Articoli';
$lang_resource['FRONT_MAIN_EMAIL_COMMENT'] = 'Commenti';
$lang_resource['FRONT_MAIN_EMAIL_RATE'] = 'Prezzo';
$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'] = 'Tasse Non Incluse Nel Prezzo';
$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'] = 'Tasse Incluse Nel Prezzo';
$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'] = 'Tipo Di Consegna';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_NO'] = 'Ordine Numero';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'] = 'Stato dell&apos;ordine';
$lang_resource['FRONT_MAIN_EMAIL_DRIVER_MESSAGE'] = 'Messaggio Per Il Fattorino';
$lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'] = 'Messaggio Per Il Ristorante';
$lang_resource['FRONT_MAIN_EMAIL_SIGNUP_CONFIRM_MESSAGE'] = 'Ottimo! Controlla la tua email per confermare la registrazione';
$lang_resource['FRONT_MAIN_EMAIL_MAIL_ALREADY_REGISTERED'] = 'La tua email è già registrata';
//orders.js'0'0'0'0
$lang_resource['V3_ORDER_PREPERATION'] = 'Preparazione';
$lang_resource['V3_ORDER_ORDER_ON_ITS_WAY'] = 'l&apos;ordine è in viaggio';
$lang_resource['V3_ORDER_DELIVERED'] = 'Consegnato';
$lang_resource['V3_ORDER_CANCELLED_RESTAURANT'] = 'Cancellato dal ristorante';
$lang_resource['V3_ORDER_CANCELLED_DRIVER'] = 'Cancellato dal fattorino';
$lang_resource['V3_ORDER_RESTAURANT_ACCEPTED'] = 'Il ristorante ha accettato';
$lang_resource['V3_ORDER_SELECT_DRIVER'] = 'Seleziona fattorino';
$lang_resource['V3_ORDER_PAID_WITH_MERCADOPAGO'] = 'PAID with mercadopago';
$lang_resource['V3_ORDER_PAID_PAYPAL_ADAPTIVE'] = 'PAID with PayPal Adaptive';
$lang_resource['V3_ORDER_DELIVERY_DATE'] = 'Data di consegna';
$lang_resource['V3_ORDER_DELIVERY_TIME'] = 'Tempo di consegna';
$lang_resource['V3_ORDER_RESERVATION_DETAILS'] = 'Dettagli della prenotazione';
$lang_resource['V3_ORDER_TIME'] = 'Tempo';
//productoption.js'0'0'0'0
$lang_resource['PRODUCT_POTIONS_ADD_CART'] = 'Aggiungi al carrello';
$lang_resource['PRODUCT_POTIONS_EDIT_YOUR_OPTIONS'] = 'Per favore scrivi le tue opzioni';
//business-list.js'0'0'0'0
$lang_resource['BUSINESS_LIST_OPTIONS_RESTAURANT'] = 'Ristoranti aperti e chiusi';
$lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS'] = 'Express 5 KM';
$lang_resource['BUSINESS_LIST_OPTIONS_FAVORITES'] = 'Preferiti';
$lang_resource['BUSINESS_LIST_OPTIONS_PAYMENT'] = 'Pagamenti';
$lang_resource['BUSINESS_LIST_OPTIONS_KM'] = 'KM';
$lang_resource['BUSINESS_LIST_OPTIONS_PROMOTION'] = 'Promozione';
$lang_resource['BUSINESS_LIST_OPTIONS_PREORDER'] = 'Preordina';
$lang_resource['BUSINESS_LIST_OPTIONS_ORDERANDRESERVE'] = 'ORDINA + PRENOTA';
$lang_resource['BUSINESS_LIST_OPTIONS_RESERVE_NOW'] = 'PRENOTA ORA';
$lang_resource['BUSINESS_LIST_OPTIONS_WE_WILL_OPEN_AT'] = 'Apriremo alle';
//myaccount.js'0'0'0'0
$lang_resource['MYACCOUNT_PLEASE_LOGIN_FIRST'] = 'Per favore prima accedi';
$lang_resource['MYACCOUNT_OR'] = 'O';
$lang_resource['MYACCOUNT_EMAIL_ID'] = 'Email';
$lang_resource['MYACCOUNT_MY_ADDRESS'] = 'Indirizzo';
$lang_resource['MYACCOUNT_BILLING_INFO'] = 'Informazioni di fatturazione';
$lang_resource['MYACCOUNT_COMPANY'] = 'Azienda';
$lang_resource['MYACCOUNT_STATE'] = 'Stato';
$lang_resource['MYACCOUNT_POSTAL_CODE'] = 'CAP';
$lang_resource['MYACCOUNT_SAVE_ADDRESS'] = 'Salva indirizzo';
$lang_resource['MYACCOUNT_EDIT'] = 'Modifica';
$lang_resource['MYACCOUNT_SELECT_MONTH'] = 'Seleziona mese';
$lang_resource['MYACCOUNT_CARD_NO'] = 'Numero carta di credito';
$lang_resource['MYACCOUNT_EXPIRY_MONTH'] = 'Mese di scadenza';
$lang_resource['MYACCOUNT_EXPIRT_YEAR'] = 'Anno di scadenza';
$lang_resource['MYACCOUNT_CVV_NO'] = 'CVV';
$lang_resource['MYACCOUNT_FAVORITE_RESTAURANT'] = 'Ristorante preferito';
$lang_resource['MYACCOUNT_REMOVE'] = 'Rimuovi';
$lang_resource['MYACCOUNT_NO_SEARCH_RESULT_FOUND'] = 'Nessun risultato trovato';
$lang_resource['MYACCOUNT_NO_FAVORITE_RESTAURANT_ADDED'] = 'Nessun ristorante preferito aggiunto';
$lang_resource['MYACCOUNT_MY_ACCOUNT_SETTINGS'] = 'Impostazioni account';
$lang_resource['MYACCOUNT_X'] = 'X';
//front-forms.js'0'0'0'0
$lang_resource['FRONT_FORM_REQUIRED'] = 'Obbligatorio';
//googlemap.js'0'0'0'0
$lang_resource['FRONT_FORM_YOU_ARE_HERE'] = 'Tu sei qui';
$lang_resource['FRONT_FORM_USER'] = 'Utente';
$lang_resource['FRONT_FORM_'] = 'Obbligatorio';
$lang_resource['FRONT_FORM_'] = 'Obbligatorio';
//payment.js'0'0'0'0
$lang_resource['PAYMENT_METHOD'] = 'Metodo di pagamento';
$lang_resource['PAYMENT_MERCADO_PAGO'] = 'Mercado pago';
$lang_resource['PAYMENT_CC_WITH_MOBILE_TERMINA'] = 'CC with Mobile termina';
$lang_resource['PAYMENT_ADAPTIVE_ON_DELIVERY'] = 'Paypal Adaptive on delivery';
$lang_resource['PAYMENT_PAYPAL_CREDIT_CARD'] = 'Paypal &amp; Credit card through Paypal';
$lang_resource['PAYMENT_ORDER_NOW'] = 'Ordina adesso';
$lang_resource['PAYMENT_ORDER_BACK'] = 'Indietro';
$lang_resource['PAYMENT_RESERVE_NOW'] = 'Prenota ORA ';
//checkouts.js'0'0'0'0
$lang_resource['CHECKOUT_FULL_ADDRESS'] = 'Indirizzo completo';
$lang_resource['CHECKOUT_RECEIVE_SMS'] = 'Ricevi SMS';
$lang_resource['CHECKOUT_YES'] = 'Si';
$lang_resource['CHECKOUT_NO'] = 'No';
$lang_resource['CHECKOUT_TIP_FOR_THE_DRIVER'] = 'Mancia per il fattorino';
$lang_resource['CHECKOUT_COUPON_APPLIED'] = 'Coupon Utilizzato';
$lang_resource['CHECKOUT_ASAP'] = 'Appena possibile';
$lang_resource['CHECKOUT_HH'] = 'HH';
$lang_resource['CHECKOUT_MM'] = 'MM';
$lang_resource['CHECKOUT_MIN'] = 'min';
//WhereAmIBox.js'0'0'0'0
$lang_resource['WHEREAMIBOX_CUISINES'] = 'cucina';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_GUEST_FIELD'] = 'Please Choose Guest field';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_DATE'] = 'Per favore seleziona una data';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_HOUR_FIELD'] = 'Per favore seleziona un&apos;ora';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_MINUTE_FIELD'] = 'Per favore seleziona i minuti';
//menu-list.js'0'0'0'0
$lang_resource['MENU_LIST_FREE_SHIPPING'] = 'Consegna Gratuita';
$lang_resource['MENU_LIST_SELECT_CATEGORIES'] = 'Seleziona una categoria';
$lang_resource['MENU_LIST_YOU_HAVE'] = 'Tu hai';
$lang_resource['MENU_LIST_CHANGE_TIME'] = 'Vuoi cambiare l&apos;ora?';
$lang_resource['MENU_LIST_OPENING_TIME'] = 'Orario di Apertura';
$lang_resource['MENU_LIST_SEARCH_SAVE'] = 'Cerca &amp; Salva';
$lang_resource['MENU_LIST_PRICE_DETAILS'] = 'Dettaglio Prezzi';
$lang_resource['MENU_LIST_GRAND_TOTAL'] = 'Totale';
$lang_resource['SHOPPING_CATEGORIES_SHOW_ALL'] = 'Mostra tutto';
//mobile'0'0'0'0
//menu-list.js'0'0'0'0
$lang_resource['WHEREAMIBOX_CUISINES'] = 'cucine';
$lang_resource['WHEREAMIBOX_LETS_GO'] = 'Vai&#39;';
$lang_resource['WHEREAMIBOX_MOBILE_PICKUP'] = 'Asporto';
$lang_resource['WHEREAMIBOX_MOBILE_RESERVATION'] = 'Reservation';
$lang_resource['MOBILE_MENU_NAVIGATION_OFFER'] = 'Offerta';
$lang_resource['MOBILE_MENU_LIST_OFFER_NAME'] = 'Nome Offerta';
$lang_resource['MOBILE_MENU_LIST_OFFER_PRICE'] = 'Prezzo Offerta';
$lang_resource['MOBILE_MENU_LIST_START_DATE'] = 'Data di inizio';
$lang_resource['MOBILE_MENU_LIST_END_DATE'] = 'Data di fine';
$lang_resource['MOBILE_MENU_LIST_REVIEWS_OF'] = 'RECENSIONI';
$lang_resource['MOBILE_MENU_LIST_PREORDER'] = 'Preordina';
$lang_resource['MOBILE_MENU_LIST_MENU_OPEN TIME'] = 'Orari di Consegna';
$lang_resource['MOBILE_RESERVATION_ORDER_NOW'] = 'Ordina adesso';
$lang_resource['MOBILE_RESERVATION_BACK'] = 'Indietro';
$lang_resource['MOBILE_RESERVATION_CANCEL'] = 'Cancella';
//Reservatiom'0'0'0'0
$lang_resource['MOBILE_RESERVATION_ROOM'] = 'Room';
$lang_resource['MOBILE_RESERVATION_TABLE'] = 'Table';
$lang_resource['MOBILE_RESERVATION_FREE'] = 'Free';
$lang_resource['MOBILE_RESERVATION_DATE'] = 'Date';
$lang_resource['MOBILE_RESERVATION_TIME'] = 'Time';
$lang_resource['MOBILE_RESERVATION_BOOKING_AVAILITY'] = 'Booking Availability';
//business-list.js'0'0'0'0
$lang_resource['MOBILE_BUSINESS_LIST_OPENED_CLOSED_RESTAURANT'] = 'Ristoranti Aperti e Chiusi';
$lang_resource['MOBILE_BUSINESS_LIST_EXPRESS_5KM'] = 'Express 5 KM';
$lang_resource['MOBILE_BUSINESS_LIST_BACK'] = 'Indietro';
$lang_resource['MOBILE_BUSINESS_LIST_SELECT_RESTAURANT'] = 'Seleziona Ristorante';
$lang_resource['MOBILE_BUSINESS_LIST_REFINE'] = 'Perfeziona';
$lang_resource['MOBILE_BUSINESS_LIST_LOCATION'] = 'Zona';
$lang_resource['MOBILE_BUSINESS_LIST_RESTAURANT'] = 'Ristorante';
$lang_resource['MOBILE_BUSINESS_LIST_PLACE_ORDER'] = 'Ordina';
$lang_resource['MOBILE_BUSINESS_LIST_MAKE_PAYMENT'] = 'Paga';
$lang_resource['MOBILE_BUSINESS_LIST_GET_DELIVERED'] = 'Aspetta comodamente la consegna';
$lang_resource['MOBILE_BUSINESS_LIST_KM'] = 'KM';
$lang_resource['MOBILE_BUSINESS_LIST_DELIVERY_COST'] = 'Costo di consegna';
$lang_resource['MOBILE_BUSINESS_LIST_PROMOTION'] = 'Promozioni';
$lang_resource['MOBILE_BUSINESS_LIST_SELECT_OPTIONS'] = 'Seleziona Opzione';
$lang_resource['MOBILE_BUSINESS_LIST_OPTIONS_FAVORITES'] = 'Favoriti';
//checkouts.js'0'0'0'0
$lang_resource['MOBILE_CHECKOUT_BUSINESS'] = 'Business modificare';
$lang_resource['MOBILE_CHECKOUT_CANCEL'] = 'Cancella';
$lang_resource['MOBILE_CHECKOUT_ORDER_DETAILS'] = 'Dettaglio Ordine';
$lang_resource['MOBILE_CHECKOUT_DELIVERY_DETAILS'] = 'Dettaglio Consegna';
$lang_resource['MOBILE_CHECKOUT_NAME'] = 'Nome';
$lang_resource['MOBILE_CHECKOUT__EMAIL'] = 'Email';
$lang_resource['MOBILE_CHECKOUT_FULL_ADDRESS'] = 'Indirizzo completo';
$lang_resource['MOBILE_CHECKOUT_NEIGHBOURHOOD'] = 'Zona';
$lang_resource['MOBILE_CHECKOUT_WHERE_DID_YOU_FIND_US'] = 'Dove ci hai conosciuti?';
$lang_resource['MOBILE_CHECKOUT_RADIO'] = 'Radio';
$lang_resource['MOBILE_CHECKOUT_FLYER'] = 'Flyer';
$lang_resource['MOBILE_CHECKOUT_GOOGLE'] = 'Google';
$lang_resource['MOBILE_CHECKOUT_PHONE_NUMBER'] = 'Numero di Telefono';
$lang_resource['MOBILE_CHECKOUT_PHONE'] = 'Telefono';
$lang_resource['MOBILE_CHECKOUT_RECEIVE_SMS'] = 'Ricevi SMS';
$lang_resource['MOBILE_CHECKOUT_YES'] = 'Si';
$lang_resource['MOBILE_CHECKOUT_NO'] = 'No';
$lang_resource['MOBILE_CHECKOUT_TIP_FOR_THE_DRIVER'] = 'Mancia per il fattorino';
$lang_resource['MOBILE_CHECKOUT_DISCOUNT_COUPON'] = 'Codice sconto';
$lang_resource['MOBILE_CHECKOUT_APPLY_COUPON'] = 'Applica Codice Sconto';
$lang_resource['MOBILE_CHECKOUT_COUPON_APPLIED'] = 'Accettato';
$lang_resource['MOBILE_CHECKOUT_DATE'] = 'Data';
$lang_resource['MOBILE_CHECKOUT_ASAP'] = 'Appena possibile';
$lang_resource['MOBILE_CHECKOUT_TIME_IN_HOUR'] = 'Ora';
$lang_resource['MOBILE_CHECKOUT_HH'] = 'HH';
$lang_resource['MOBILE_CHECKOUT_TIME_IN_MINUTE'] = 'Minuti';
$lang_resource['MOBILE_CHECKOUT_MM'] = 'MM';
$lang_resource['MOBILE_CHECKOUT_MIN'] = 'min';
$lang_resource['MOBILE_CHECKOUT_PAYMENT_METHOD'] = 'Metodo di pagamento';
$lang_resource['MOBILE_CHECKOUT_ORDER_NOW'] = 'Ordina';
$lang_resource['MOBILE_CHECKOUT_DELIVERY_FEE'] = 'Costo di consegna';
$lang_resource['MOBILE_CHECKOUT_TOTAL'] = 'Totale';
$lang_resource['MOBILE_CHECKOUT_RESERVATION_OPTIONS'] = 'Reservation Options';
//front-forms.js'0'0'0'0
$lang_resource['MOBILE_FRONT_FORMS_REQUIRED'] = 'Obbligatorio';
//front-visuals.js'0'0'0'0
$lang_resource['MOBILE_FRONT_VISUALS_SKIP'] = 'Salta';
$lang_resource['MOBILE_FRONT_VISUALS_SAVE_CONTINUE'] = 'Salva &amp; Continua';
$lang_resource['MOBILE_FRONT_VISUALS_CUISINES'] = 'cucine';
$lang_resource['MOBILE_FRONT_VISUALS_LETS_GO'] = 'Vai&#39;';
$lang_resource['MOBILE_FRONT_VISUALS_SEARCH'] = 'Cerca';
$lang_resource['MOBILE_FRONT_VISUALS__DELIVERY'] = 'Consegna';
$lang_resource['MOBILE_FRONT_VISUALS_COUNTRY'] = 'Paese';
$lang_resource['MOBILE_FRONT_VISUALS_CITY'] = 'Città';
$lang_resource['MOBILE_FRONT_VISUALS_ADDRESS_OR_ZIPCODE'] = 'Indirizzo o CAP';
$lang_resource['MOBILE_FRONT_VISUALS_FILTER_OPTION'] = 'Filtro';
$lang_resource['MOBILE_FRONT_VISUALS_BROWSE_PER_CITY'] = 'Naviga per Città';
$lang_resource['MOBILE_FRONT_VISUALS_LOGIN_REGISTER'] = 'Accedi / Registrati';
$lang_resource['MOBILE_FRONT_VISUALS_TRACK_ORDER'] = 'Traccia Ordine';
$lang_resource['MOBILE_FRONT_VISUALS_MORE'] = 'Altro';
$lang_resource['MOBILE_FRONT_VISUALS_ENTER_YOUR_ORDER_ID'] = 'Inserisci il tuo numero d&apos;ordine';
$lang_resource['MOBILE_FRONT_VISUALS_TRACK_NOW'] = 'Traccia Ordine';
$lang_resource['MOBILE_FRONT_VISUALS_LOGIN'] = 'Accedi';
$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_YOUR_PASSWORD'] = 'Password Dimenticata?';
$lang_resource['MOBILE_FRONT_VISUALS_REGISTER'] = 'Registrati';
$lang_resource['MOBILE_FRONT_VISUALS_OR'] = 'o';
$lang_resource['MOBILE_FRONT_VISUALS_LOGIN_WITH_FACEBOOK'] = 'Accedi con Facebook';
$lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY'] = 'Scegli un Paese';
$lang_resource['MOBILE_FRONT_VISUALS_REGISTER'] = 'Registrati';
$lang_resource['MOBILE_FRONT_VISUALS_REGISTER1'] = 'Registrati';
$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_PASSWORD'] = 'Password Dimenticata?';
$lang_resource['MOBILE_FRONT_VISUALS_OR_ENTER_EMAIL_ADDRESS'] = 'Inserisci il tuo indirizzo email';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT'] = 'ISCRIVIMI';
$lang_resource['MOBILE_FRONT_VISUALS_BUSINESS'] = 'Business MODIFICARE';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_EMAIL'] = 'E-mail';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_PASSWORD'] = 'Password';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_SIGN_IN_TO_CHECKOUT'] = 'Accedi per andare alla cassa';
$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_YOUR_PASSWORD'] = 'Password Dimenticata?';
$lang_resource['MOBILE_FRONT_VISUALS_NEW_CUSTOMER'] = 'Nuovo Utente';
$lang_resource['MOBILE_FRONT_VISUALS_YOU_DONT_ACCOUNT'] = 'Non hai bisogno di un account per andare alla cassa';
$lang_resource['MOBILE_FRONT_VISUALS_COUNTINUE_AS_GUEST'] = 'Continua';
$lang_resource['MOBILE_FRONT_VISUALS_CREATE_ACCOUNT_FAST'] = 'Crea un account per ordinare più velocemente e per aver accesso agli ordini precendenti';
$lang_resource['MOBILE_FRONT_VISUALS_CREATE_ACCOUNT'] = 'Crea Account';
$lang_resource['MOBILE_FRONT_VISUALS_CONTINUE'] = 'Continua';
$lang_resource['MOBILE_FRONT_VISUALS_NAME'] = 'Nome';
$lang_resource['MOBILE_FRONT_VISUALS_EMAIL'] = 'Email';
$lang_resource['MOBILE_FRONT_VISUALS_ADDRESS'] = 'Indirizzo completo';
$lang_resource['MOBILE_FRONT_VISUALS_TEL'] = 'Tel';
$lang_resource['MOBILE_FRONT_VISUALS_COMMENTS'] = 'Commenti';
$lang_resource['MOBILE_FRONT_VISUALS_DRIVER_COMMENTS'] = 'Commenti per il fattorino';
$lang_resource['MOBILE_FRONT_VISUALS_DATE'] = 'Data';
$lang_resource['MOBILE_FRONT_VISUALS_TIME'] = 'Ora';
$lang_resource['MOBILE_FRONT_VISUALS_CASH'] = 'Contanti';
$lang_resource['MOBILE_FRONT_VISUALS_FREE'] = 'Gratuita';
$lang_resource['MOBILE_FRONT_VISUALS_QUANTITY'] = 'Quantità';
$lang_resource['MOBILE_FRONT_VISUALS_HELP'] = 'Aiuto';
$lang_resource['MOBILE_FRONT_VISUALS_MOBILE'] = 'Mobile';
$lang_resource['MOBILE_FRONT_VISUALS_SELECT_TYPE'] = 'Seleziona Tipo';
$lang_resource['MOBILE_FRONT_VISUALS_DELIVERY'] = 'Consegna a Domicilio';
$lang_resource['MOBILE_FRONT_VISUALS_PICKUP'] = 'Asporto';
$lang_resource['MOBILE_FRONT_VISUALS_RESERVATION'] = 'Reservation';
$lang_resource['MOBILE_FRONT_VISUALS_RESTAURANTS'] = 'Ristoranti';
$lang_resource['MOBILE_FRONT_VISUALS_CUISINES'] = 'Cucine';
$lang_resource['MOBILE_FRONT_VISUALS_MMDDYY'] = 'mm-dd-yyyy';
$lang_resource['MOBILE_FRONT_VISUALS_SEARCH'] = 'Cerca';
//menu-list.js'0'0'0'0
$lang_resource['MOBILE_MENU_LIST_BACK'] = 'Indietro';
$lang_resource['MOBILE_MENU_LIST_SEARCH_DISH'] = 'Cerca Pietanza';
$lang_resource['MOBILE_MENU_LIST_REFINE'] = 'Perfezziona';
$lang_resource['MOBILE_MENU_LIST_ALL'] = 'Tutto';
$lang_resource['MOBILE_BUSSINESS_LIST_ALL'] = 'Tutto';
$lang_resource['MOBILE_MENU_LIST_RATINGS'] = 'ratings';
$lang_resource['MOBILE_MENU_LIST_ADD_TO_FAVORITES'] = 'Aggiungi ai Favoriti';
$lang_resource['MOBILE_MENU_LIST_RESERVATION'] = 'Prenota';
$lang_resource['MOBILE_MENU_LIST_RESERVE_NOW'] = 'Prenota adesso';
$lang_resource['MOBILE_MENU_LIST_RESERVE_ORDER'] = 'Prenota + Ordina';
$lang_resource['MOBILE_MENU_LIST_PREORDER'] = 'Preordina';
$lang_resource['MOBILE_MENU_LIST_PROCEED_CHECKOUT'] = 'Vai alla Cassa';
$lang_resource['MOBILE_MENU_LIST_MENU_OPEN_TIME'] = 'ORARI DI CONSEGNA';
$lang_resource['MOBILE_MENU_LIST_NEXT'] = 'Avanti';
$lang_resource['MOBILE_MENU_LIST_SEARCH_SAVE'] = 'Cerca &amp; Salva';
$lang_resource['MOBILE_MENU_LIST_RESERVATION_DETAILS'] = 'Dettagli Prenotazione';
$lang_resource['MOBILE_MENU_LIST_NAME'] = 'Nome';
$lang_resource['MOBILE_MENU_LIST_EMAIL'] = 'Email';
$lang_resource['MOBILE_MENU_LIST_PHONE'] = 'Telefono';
$lang_resource['MOBILE_MENU_LIST_TEL'] = 'Telefono';
$lang_resource['MOBILE_MENU_LIST_RECEIVE_SMS'] = 'Recevi SMS';
$lang_resource['MOBILE_MENU_LIST_PRICE_DETAILS'] = 'Dettaglio Prezzi';
$lang_resource['MOBILE_MENU_LIST_ROOM'] = 'Stanaza';
$lang_resource['MOBILE_MENU_LIST_TABLE'] = 'tavolo';
$lang_resource['MOBILE_MENU_LIST_FREE'] = 'Gratuito';
$lang_resource['MOBILE_MENU_LIST_TOTAL'] = 'Totale';
$lang_resource['MOBILE_MENU_LIST_PAYMENT_METHOD'] = 'Metodo di pagamento';
$lang_resource['MOBILE_MENU_LIST_HOME'] = 'Home';
$lang_resource['MOBILE_MENU_LIST_DO_YOU_WANT_KNOW_THE_PROGRESS'] = 'Vuoi conoscere lo stato di avanzamento del tuo ordine?';
$lang_resource['MOBILE_MENU_LIST_TRACK_NOW'] = 'TRACCIA ORDINE';
$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER'] = 'Vuoi cambiare qualcosa al tuo ordine?';
$lang_resource['MOBILE_MENU_LIST_TOTAL'] = 'Totale';
$lang_resource['MOBILE_MENU_LIST_GRAND_TOTAL'] = 'Totale';
$lang_resource['MOBILE_MENU_LIST_OPENING_TIME'] = 'Orari di Apertura';
$lang_resource['MOBILE_MENU_LIST_DELIVERY_LOCATION'] = 'Zone di consegna';
$lang_resource['MOBILE_MENU_LIST_ABOUT_RESTAURANT'] = 'Info Ristorante';
$lang_resource['MOBILE_MENU_LIST_PHOTO_GALLERY'] = 'Galleria Foto';
$lang_resource['MOBILE_MENU_LIST_VIDEO_GALLERY'] = 'Galleria Video';
//more.js'0'0'0'0
$lang_resource['MOBILE_MORE_MOST_POPULAR'] = 'I più popolari';
$lang_resource['MOBILE_MORE_MOST_POPULAR_CUISINE'] = 'Le cucine più popolari';
$lang_resource['MOBILE_MORE_HOW_IT_WORKS'] = 'Come Funziona';
$lang_resource['MOBILE_MORE_SELECT_LOCATION'] = 'Seleziona Zona';
$lang_resource['MOBILE_MORE_PICKUP_RESTAURANT'] = 'Ristoranti d&apos;asporto';
$lang_resource['MOBILE_MORE_RECENT_ORDERS'] = 'Ordini Recenti';
$lang_resource['MOBILE_MORE_LETS_BE_FRIENDS'] = 'Diventiamo Amici!';
$lang_resource['MOBILE_MORE_BROWSE_PER_CITY'] = 'Naviga per Città';
//payment.js'0'0'0'0
$lang_resource['MOBILE_PAYMENT_BACK'] = 'Indietro';
$lang_resource['MOBILE_PAYMENT_BUSINESS'] = 'Business ??';
$lang_resource['MOBILE_PAYMENT_PAYMENT_METHOD'] = 'Metodo di pagamento';
$lang_resource['MOBILE_PAYMENT_PAYPLA_CREDIT_CARD_PAYPAL'] = 'Paypal &amp; Carta di credito tramite Paypal';
$lang_resource['MOBILE_PAYMENT_PAYPAL_ADAPTIVE_DELIVERY'] = 'Paypal Adaptive on delivery';
$lang_resource['MOBILE_PAYMENT_MERCADO_PAGO'] = 'Mercado pago';
$lang_resource['MOBILE_PAYMENT_ORDER_NOW'] = 'Ordina adesso';
$lang_resource['MOBILE_PAYMENT_CARD_ON_DELIVERY'] = 'Carta di credito alla consegna';
$lang_resource['MOBILE_PAYMENT_ORDER_NOW'] = 'Ordina adesso';
//myaccount.js'0'0'0'0
$lang_resource['MOBILE_MYACCOUNT_ERROR'] = 'Errore';
$lang_resource['MOBILE_MYACCOUNT_PLEASE_LOGIN_FIRST'] = 'Per favore prima accedi';
$lang_resource['MOBILE_MYACCOUNT_OR'] = 'o';
$lang_resource['MOBILE_MYACCOUNT_EMAIL_ID'] = 'Email';
$lang_resource['MOBILE_MYACCOUNT_PASSWORD'] = 'Password';
$lang_resource['MOBILE_MYACCOUNT_REMEMBER_ME'] = 'Recordami';
$lang_resource['MOBILE_MYACCOUNT_MY_ADDRESS'] = 'Indirizzo';
$lang_resource['MOBILE_MYACCOUNT_BILLING_INFO'] = 'Informazioni di fatturazione';
$lang_resource['MOBILE_MYACCOUNT_EDIT_ADDRESS'] = 'Modifica Indirizzo';
$lang_resource['MOBILE_MYACCOUNT_SELECT_ONE'] = 'Seleziona';
$lang_resource['MOBILE_MYACCOUNT_HOME'] = 'Home';
$lang_resource['MOBILE_MYACCOUNT_OFFICE'] = 'Ufficio';
$lang_resource['MOBILE_MYACCOUNT_PUBLIC_AREA'] = 'Area Pubblica';
$lang_resource['MOBILE_MYACCOUNT_BILLING'] = 'Fatturazione';
$lang_resource['MOBILE_MYACCOUNT_TYPE'] = 'Tipo';
$lang_resource['MOBILE_MYACCOUNT_NAME'] = 'Nome';
$lang_resource['MOBILE_MYACCOUNT_COMPANY'] = 'Compagnia';
$lang_resource['MOBILE_MYACCOUNT_ADDRESS'] = 'Indirizzo';
$lang_resource['MOBILE_MYACCOUNT_CITY'] = 'Città';
$lang_resource['MOBILE_MYACCOUNT_STATE'] = 'Stato';
$lang_resource['MOBILE_MYACCOUNT_POSTAL_CODE'] = 'CAP';
$lang_resource['MOBILE_MYACCOUNT_SAVE_ADDRESS'] = 'Salva Indirizzo';
$lang_resource['MOBILE_MYACCOUNT_CARD_NO'] = 'Numero carta di credito';
$lang_resource['MOBILE_MYACCOUNT_EDIT'] = 'Modifica';
$lang_resource['MOBILE_MYACCOUNT_SELECT_TYPE'] = 'Seleziona Tipo';
$lang_resource['MOBILE_MYACCOUNT_VISA'] = 'Visa';
$lang_resource['MOBILE_MYACCOUNT_MASTER'] = 'Mastercard';
$lang_resource['MOBILE_MYACCOUNT_DISCOVERY'] = 'Discovery';
$lang_resource['MOBILE_MYACCOUNT_SELECT_MONTH'] = 'Seleziona Mese';
$lang_resource['MOBILE_MYACCOUNT_JAN'] = 'Gennaio';
$lang_resource['MOBILE_MYACCOUNT_FEB'] = 'Febbraio';
$lang_resource['MOBILE_MYACCOUNT_MAR'] = 'Marzo';
$lang_resource['MOBILE_MYACCOUNT_APR'] = 'Aprile';
$lang_resource['MOBILE_MYACCOUNT_MAY'] = 'Maggio';
$lang_resource['MOBILE_MYACCOUNT_JUN'] = 'Giugno';
$lang_resource['MOBILE_MYACCOUNT_JUL'] = 'Luglio';
$lang_resource['MOBILE_MYACCOUNT_AUG'] = 'Agosto';
$lang_resource['MOBILE_MYACCOUNT_SEP'] = 'Settembre';
$lang_resource['MOBILE_MYACCOUNT_OCT'] = 'Ottobre';
$lang_resource['MOBILE_MYACCOUNT_NOV'] = 'Novembre';
$lang_resource['MOBILE_MYACCOUNT_DEC'] = 'Dicembre';
$lang_resource['MOBILE_MYACCOUNT_EXPIRY_MONTH'] = 'Scadenza Mese';
$lang_resource['MOBILE_MYACCOUNT_EXPIRY_YEAR'] = 'Scadenza Anniìo';
$lang_resource['MOBILE_MYACCOUNT_CVV_NO'] = 'CVV';
$lang_resource['MOBILE_MYACCOUNT_SAVE'] = 'Salva';
$lang_resource['MOBILE_MYACCOUNT_CANCEL'] = 'Cancella';
$lang_resource['MOBILE_MYACCOUNT_FAVORITE_RESTAURANT'] = 'Ristoranti Favoriti';
$lang_resource['MOBILE_MYACCOUNT_SEARCH'] = 'Cerca';
$lang_resource['MOBILE_MYACCOUNT_REMOVE'] = 'Rimuovi';
$lang_resource['MOBILE_MYACCOUNT_NO_SEARCH_RESULT_FOUND'] = 'Nessun risultato trovato';
$lang_resource['MOBILE_MYACCOUNT_NO_FAVORITE_RESTAURANT_ADDED'] = 'Nessun locale favorito aggiunto';
$lang_resource['MOBILE_MYACCOUNT_MY_ACCOUNT_SETTINGS'] = 'Impostazioni account';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Altro';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Altro';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Altro';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Altro';
//Braintree Transparent payment getway'0'0'0'0
$lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO'] = 'Braintree payment getway information';
$lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_METHOD'] = 'Payment Method:';
$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID'] = 'Merchant Id:';
$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY'] = 'Public Key:';
$lang_resource['CONTROL_PANEL_BRAINTREE_PRIVATE_KEY'] = 'Private Key:';
$lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] = 'Credit Card Number:';
$lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] = 'Expiration Date (MM/YYYY):';
$lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] = 'CVV:';
$lang_resource['CONTROL_PANEL_SELECT_CARD'] = 'Select Card NO:';
$lang_resource['SHOPPING_PAYMENT_SELECT_CARD'] = 'Select Credit Card';
$lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY'] = 'Braintree';
//AUTHORIZER PAYMENT GATEWAY'0'0'0'0
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_INFO'] = 'Authorize.Net payment getway information';
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL'] = 'API Login ID';
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY'] = 'Transaction Key';
$lang_resource['AUTHORIZE_DETAILS'] = 'Authorize Net Details';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] = 'Card No ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] = 'Expiry (MM) ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] = 'Expiry (YY)';
$lang_resource['PAYMENT_AUTHORIZE_ON_DELIVERY'] = 'Authorize.Net';
$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY_ALERT'] = 'Please Enter Expiry (YY) ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM_ALERT'] = 'Please Enter Expiry (MM) ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO_ALERT'] = 'Please Enter Card No. ';
//CARDSAVE PAYMENT GATEWAY'0'0'0'0
$lang_resource['CONTROL_PANEL_CARDSAVE_PAYMENT_INFO'] = 'CardSave payment getway information';
$lang_resource['CONTROL_PANEL_CARDSAVE_CARD_ID'] = 'Card Id';
$lang_resource['CONTROL_PANEL_CARDSAVE_CARD_PASSWORD'] = 'Card Password';
$lang_resource['PAYMENT_CARDSAVE_ON_DELIVERY'] = 'Card Save';
$lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO'] = 'Card No. ';
$lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM'] = 'Expiry (MM) ';
$lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY'] = 'Expiry (YY)';
$lang_resource['CONTROL_PANEL_CARDSAVE_CVV'] = 'CVV';
$lang_resource['CONTROL_PANEL_CARDSAVE_CITY'] = 'City';
$lang_resource['CONTROL_PANEL_CARDSAVE_ZIP'] = 'Zip Code';
$lang_resource['CONTROL_PANEL_CARDSAVE_CVV_ALERT'] = 'Please Enter CVV Code';
$lang_resource['CONTROL_PANEL_CARDSAVE_EXPYY_ALERT'] = 'Please Enter Expiry (YY) ';
$lang_resource['CONTROL_PANEL_CARDSAVE_EXPMM_ALERT'] = 'Please Enter Expiry (MM) ';
$lang_resource['CONTROL_PANEL_CARDSAVE_CARDNO_ALERT'] = 'Please Enter Card No. ';
$lang_resource['CONTROL_PANEL_CARDSAVE_CITY_ALERT'] = 'Please Enter City ';
$lang_resource['CONTROL_PANEL_CARDSAVE_ZIP_ALERT'] = 'Please Enter Zip Code ';
//18 december 2014'0'0'0'0
$lang_resource['INDEX_JOIN_OUR_NETWORK'] = 'REGISTRATI';
$lang_resource['TEMPLATE_DELIVERYCOST'] = 'Costo di consegna:';
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD'] = 'Upload image';
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD_SMALL_TEXT'] = '_';
$lang_resource['FRONT_METAKEY'] = 'Pickeat';
$lang_resource['FRONT_META_CONTENT'] = 'dont delete this tag';
$lang_resource['FRONT_TELL_US_WHERE_YOU'] = 'Per favore, dicci dove sei cliccando sul pulsante "dove sei?"';
$lang_resource['FRONT_ENTER_LOGIN_EMAIL'] = 'Per favore inserisci la tua email e password';
$lang_resource['FRONT_ENTER_LOGIN'] = 'ACCEDI';
$lang_resource['FRONT_CREATE_AN_ACCOUNT'] = 'Crea Account';
$lang_resource['FRONT_RECOVER_PASSWORD'] = 'Recupera Password';
$lang_resource['FRONT_SAVE_TIME_LATTER'] = 'Risparmi Tempo';
$lang_resource['FRONT_CORRECT_LOGIN_CREDENTIAL'] = 'Per favore inserisci correttamente in dati di accesso';
$lang_resource['FRONT_CONTINUE'] = 'Continua';
$lang_resource['FRONT_CHOOSE_OPTIONS'] = 'Seleziona un&apos;opzione';
$lang_resource['FRONT_SELECT_COUNTRY'] = 'Per favore seleziona una Paese';
$lang_resource['FRONT_SELECT_CITY'] = 'Per favore seleziona una Città';
$lang_resource['FRONT_SELECT_ADDRESS'] = 'Per favore inserisci il tuo indirizzo';
$lang_resource['FRONT_ENTER_YOUR_NAME'] = 'Per favore inserisci il tuo nome';
$lang_resource['FRONT_ENTER_YOUR_LAST_NAME'] = 'Per favore inserisci il tuo cognome';
$lang_resource['FRONT_ENTER_YOUR_PASSWORD'] = 'Per favore inserisci la tua password';
$lang_resource['FRONT_ENTER_YOUR_STREET'] = 'Per favore inserisci il tuo indirizzo';
$lang_resource['FRONT_ENTER_YOUR_COLONY'] = 'Please Enter your colony address';
$lang_resource['FRONT_SELECT_YOUR_COUNTRY'] = 'Per favore inserisci il tuo Paese';
$lang_resource['FRONT_SELECT_YOUR_CITY'] = 'Per favore seleziona la tua Città';
$lang_resource['FRONT_ENTER_YOUR_MOBILE'] = 'Per favore inserisci il tuo Numero di Telefono';
$lang_resource['FRONT_TRACK_DRIVER_GPS'] = 'Track Driver GPS';
$lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'] = 'Si prega di selezionare almeno una stanza o tavolo o posto libero';
$lang_resource['SHOPPING_SELECT_GUEST'] = 'Per favore seleziona Ospite';
$lang_resource['SHOPPING_SELECT_DATE'] = 'Per favore seleziona Data';
$lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] = 'Prezzo Minimo:';
$lang_resource['SHOPPING_INFO_CATALOG_EVERYDAY'] = 'Tutti i Giorni';
$lang_resource['SHOPPING_INFO_CATALOG_SUNDAY'] = 'Lunedì';
$lang_resource['SHOPPING_INFO_CATALOG_MONDAY'] = 'Martedì';
$lang_resource['SHOPPING_INFO_CATALOG_TUESDAY'] = 'Mercoledì';
$lang_resource['SHOPPING_INFO_CATALOG_WEDNESDAY'] = 'Giovedì';
$lang_resource['SHOPPING_INFO_CATALOG_THURSDAY'] = 'Venerdì';
$lang_resource['SHOPPING_INFO_CATALOG_FRIDAY'] = 'Sabato';
#RIF!
$lang_resource['FRONT_VISUALS_JUST_ORDERED'] = 'hai appena ordinato da';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPALADAPTIVE'] = 'PAID in PaypalAdaptive payment Method';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_AUTHORISENET'] = 'PAID in Authorise.Net payment Method';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_BRAINTREE'] = 'PAID in Braintree payment Method';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CARDSAVE'] = 'PAID in CardSave payment Method';
$lang_resource['MENU_LIST_SET_TIME'] = 'Set Time?';
$lang_resource['DESKTOP_BUSINESS_SHOW_MAP'] = 'Mostra Mapa';
$lang_resource['PAYMENT_BRAINTREE_ON_ENTER_CREDIT_CARD'] = 'Per favore inserisci il numero di carta di credito';
$lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] = 'Please Enter Expiration Date (MM/YY)';
$lang_resource['CONTROL_PANEL_AUTHORIZE_ENTER_CCV'] = 'Please Enter CVV';
$lang_resource['CONTROL_PANEL_CARDSAVE_ADDRESS_ALERT'] = 'Please Enter Address ';
$lang_resource['PAYMENT_GATEWAY_ALL_BACK'] = 'Back';
$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT_SUCCESS'] = 'Authorize.Net Payment Success';
$lang_resource['PAYMENT_GATEWAY_ALL_FROM_SITE_URL'] = 'From: Ordering Online System <orderingonline@example.com>';
$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'] = 'paypalform';
$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'] = 'Ordering Online System Order';
$lang_resource['PAYMENT_GATEWAY_ALL_ADDITIONAL_COMMENTS'] = 'Additional comments:';
$lang_resource['PAYMENT_GATEWAY_ALL_BRAINTREE'] = 'Braintree';
$lang_resource['PAYMENT_GATEWAY_ALL_PAYMENT_PROCESSING'] = 'Payment Processing................................';
$lang_resource['PAYMENT_GATEWAY_ALL_MERCADOPAGO'] = 'Mercadopago';
$lang_resource['PAYMENT_GATEWAY_ALL_CURL'] = 'cURL extension not found. You need to enable cURL in your php.ini or another configuration you have.';
$lang_resource['PAYMENT_GATEWAY_ALL_PHP_SDK_V'] = 'MercadoPago PHP SDK v';
$lang_resource['PAYMENT_GATEWAY_ALL_BRAINTREE_PAYMENT_SUCCESS'] = 'Braintree Payment Success';
$lang_resource['PAYMENT_GATEWAY_ALL_DETAILS_OF_YOUR_ORDER'] = 'Details of your Order';
$lang_resource['PAYMENT_GATEWAY_ALL_DESCRIPTION'] = 'Description';
$lang_resource['PAYMENT_GATEWAY_ALL_USER_DETAILS'] = 'User Details';
$lang_resource['PAYMENT_GATEWAY_ALL_PAYPAL'] = 'PayPal';
$lang_resource['PAYMENT_GATEWAY_ALL_OK'] = 'ok';
$lang_resource['PAYMENT_GATEWAY_ALL_TANKYOU_PAYMENT'] = 'Grazie per il tuo pagamento online';
$lang_resource['PAYMENT_GATEWAY_ALL_ADDRESS2'] = 'Indirizzo 2:';
$lang_resource['PAYMENT_GATEWAY_ALL_TELE'] = 'Telefono:';
$lang_resource['PAYMENT_GATEWAY_ALL_PAID_WITH_PAYPAL'] = 'Paga con Paypal';
$lang_resource['PAYMENT_GATEWAY_ALL_TELE'] = 'Teleforno:';
$lang_resource['PAYMENT_GATEWAY_ALL_SMTP_ERROR'] = 'SMTP Error: Data not accepted';
$lang_resource['PAYMENT_GATEWAY_ALL_ADAPTIVE_SUCCESS'] = 'Paypal Adaptive Payment Success';
$lang_resource['PAYMENT_GATEWAY_ALL_USD'] = 'EURO';
$lang_resource['PAYMENT_GATEWAY_ALL_PayPalAdaptive'] = 'PayPalAdaptive';
$lang_resource['PAYMENT_GATEWAY_ALL_CARD_SAVE_SUCCESS'] = 'Carta di credito salvata con successo';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_CARD_NO'] = 'Tipo Carta o Numenro errati';
$lang_resource['PAYMENT_GATEWAY_ALL_CV2_NUMBER'] = 'CVV errato';
$lang_resource['PAYMENT_GATEWAY_ALL_NO_CARD_ENTERED'] = 'Nessun numero di carta inserito';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_CARD_NUMBER'] = 'Numero carta non valido';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_MONTH_MISSING'] = 'Scadenza mese mancante.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_YEAR'] = 'Scadenza anno mancante.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_MONTH'] = 'Scadeza mese errata.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_ISSUE_NUMBER'] = 'Numero non valido.';
$lang_resource['PAYMENT_GATEWAY_ALL_ENTER_NEIGHBOURHOOD'] = 'Per favore inserisci zona';
$lang_resource['PAYMENT_GATEWAY_ENTER_STATE_NAME'] = 'Per favore inserisci Paese';
$lang_resource['PAYMENT_GATEWAY_ALL_ENTER_ZIP_CODE'] = 'Per favore inserisci CAP';
$lang_resource['PAYMENT_GATEWAY_ALL_GO'] = 'Vai';
$lang_resource['PAYMENT_GATEWAY_CLOSED'] = 'Chiuso';
//Email Template'0'0'0'0
$lang_resource['EMAIL_TEMPLATE_DETAILS_CUSTOMER_ORDER'] = 'Dettagli Ordine';
$lang_resource['EMAIL_TEMPLATE_DESCRIPTION'] = 'Descrizione';
$lang_resource['EMAIL_TEMPLATE_USER_DETAILS'] = 'Dettagli Utente';
$lang_resource['EMAIL_TEMPLATE_DELIVERY_TYPE'] = 'Tipo di consegna';
$lang_resource['EMAIL_TEMPLATE_PLEASE_CHOOSE_ONE_BELOW_OPTIONS'] = 'Per favore selezione un&apos;opzione per questo ordine';
$lang_resource['EMAIL_TEMPLATE_'] = 'Vai';
//SMS'0'0'0'0
$sms_resource['SMS_ORDER_STATUS_CHANGED'] = 'Commenti ordine #';
$sms_resource['SMS_ORDER_COMMENT_CHANGED'] = 'è cambiato in:';



//14 april 2015 version
$lang_resource['LOCATE_ME'] = 'Locate me';
$lang_resource['TRACK_REORDER'] = 'Reorder';
$lang_resource['ORDERS_BOX_BUSINESS_HEADER'] = 'Business';
$lang_resource['CONTROL_PANEL_USER_DRIVER'] = 'Driver';
$lang_resource['CONTROL_PANEL_USER_DRIVERMANAGER'] = 'Driver Manager';
$lang_resource['CONTROL_PANEL_BUSINESS_REORDER'] = 'Allow for Reorder';
$lang_resource['CONTROL_PANEL_BUSINESS_FEATURED'] = 'Allow for Featured';
$lang_resource['CONTROL_PANEL_BUSINESS__DISH_POPULAR'] = 'Allow for Most popular dish';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_FEATURED'] = 'Allow for feature:';

$lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE'] = 'ORDER + RESERVE';
$lang_resource['SHOPPING_RESERVE_AND_ORDER_CHECK'] = 'Please reserve your space';

$lang_resource['Pickup_details_V2'] = 'Pickup Details';
$lang_resource['create_neighborhood_V2'] = 'Create Neighborhood';
$lang_resource['edit_neighborhood_V2'] = 'Edit Neighborhood';
$lang_resource['delete_neighborhood_V2'] = 'Delete Neighborhood';
$lang_resource['my_profile_V2'] = 'My Profile';

$lang_resource['Country_V2'] = 'Country';
$lang_resource['FRONT_MAIN_HOME_DELIVERY']='Delivery without cost';
$lang_resource['FRONT_MAIN_HOME_PICKUP']='Pickup without cost';
$lang_resource['FRONT_MAIN_HOME_RESERVE']='Reservation without cost';
$lang_resource['FRONT_MAIN_HOME_ORDER_RESERVE']='Order & Reservation without cost';

$lang_resource['FRONT_MAIN_HOME_DELIVERY_WITH_COST']='Delivery cost';

$lang_resource['RESERVATION'] = 'Reservation';
$lang_resource['REVIEWSOF_V21_OF'] = 'Reviews of';
$lang_resource['BLIST_FEATURED'] = 'Featured';
$lang_resource['FRONT_DRIVER_COMMENTS'] = 'Driver Comments :';
$lang_resource['FRONT_RESERVATION_BOOKING_AVAILABILTY'] = 'Booking Availability';
$lang_resource['MYACCOUNT_MYPROFILE'] = 'My Profile';
$lang_resource['V3_ORDER_DELIVERY_TIME'] = 'Delivery time';
$lang_resource['V3_ORDER_RESERVATION_DETAILS'] = 'Reservation Details';
$lang_resource['V3_TRANSACTION'] = 'Transaction Id';
$lang_resource['MOBILE_CHECKOUT_PICKUP_DETAILS'] = 'Pickup Details';
$lang_resource['MOBILE_FRONT_VISUALS_USER_COMMENTS'] = 'User Comments';
$lang_resource['MOBILE_MORE_USEFULLINKS'] = 'USEFUL LINKS';
$lang_resource['CONTROL_PANEL_AUTHORIZE_LASTNAME_ALERT'] = 'Please Enter Last Name. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CITYNAME_ALERT'] = 'Please Enter City. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_STATE_ALERT'] = 'Please Enter State. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_COUNTRYNAME_ALERT'] = 'Please Enter Country. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_ZIP_ALERT'] = 'Please Enter Zipcode. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_FIRSTNAME_ALERT'] = 'Please Enter First Name. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_LASTNAME_ALERT'] = 'Please Enter Last Name. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CITYNAME_ALERT'] = 'Please Enter City. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_STATE_ALERT'] = 'Please Enter State. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_COUNTRYNAME_ALERT'] = 'Please Enter Country. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_ZIP_ALERT'] = 'Please Enter Zipcode. ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CVV2'] = 'CVV2 ';
$lang_resource['FRONT_ENTER_YOUR_MOBILE'] = 'Please Enter mobile number';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPAL'] = 'PAID in Paypal payment Method';
$lang_resource['EMAIL_TEMPLATE_DETAILS_OF_CUSTOMER_ORDER'] = 'Details of Customer Order No';
$lang_resource['EMAIL_TEMPLATE_CHOOSE_BELOW_OPTIONS'] = 'Please choose one below option for Order No';

//Mercury payment getway''''
$lang_resource['CONTROL_PANEL_MERCURY_PAYMENT_INFO'] = 'Mercury payment getway information';
$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_ID'] = 'Merchant Id :';
$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_PASS'] = 'Merchant Password :';



$lang_resource['MERCURY_PAYMENT_HEADER'] = 'Mercury Payment';

$lang_resource['MERCURY_PAYMENT_ACNO'] = 'A/C No.';
$lang_resource['MERCURY_PAYMENT_EXMM'] = 'Expiry (MM)';
$lang_resource['MERCURY_PAYMENT_EXYY'] = 'Expiry (YY)';
$lang_resource['CONTROL_PANEL_MERCURY_ACNO_ALERT'] = 'Please Filled Mercury A/C No.';
$lang_resource['CONTROL_PANEL_MERCURY_EXMM_ALERT'] = 'Please Filled Mercury Expiry (MM)';
$lang_resource['CONTROL_PANEL_MERCURY_EXYY_ALERT'] = 'Please Filled Mercury Expiry (YY)';

$lang_resource['PAYMENT_GATEWAY_ALL_MERCURY_SUCCESS'] = 'Mercury Payment Success';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_MERCURY'] = 'PAID in Mercury payment Method';


//panel tab seting Start
$lang_resource['DELIVERY_PICKUP_RESERVATION_VALID1'] = 'Please check delivery or pickup or reservation';
$lang_resource['COUNTRY_CITY_TABVALIDATION'] = 'Please select default country city or check country city';
$lang_resource['ADDRESS_OPTIONAL_TAB_VALIDATION'] = 'Please check address or Optional filters in delivery option';
$lang_resource['OPTIONAL_TAB_VALIDATION1'] = 'Please check  Optional filters in pickup option';
$lang_resource['OPTIONAL_TAB_VALIDATION2'] = 'Please check  Optional filters in Reservation option';



$lang_resource['REORDER_CONFIRM_ALERT'] = 'Do you want to reorder?';
$lang_resource['REORDER_CONFIRM_TAX'] = 'TAX';
$lang_resource['REORDER_CONFIRM_TAX_INCLUDED'] = 'Tax Included in Price';
$lang_resource['REORDER_CONFIRM_TAX_NOT_INCLUDED'] = 'Tax not Included in Price';
$lang_resource['TRACKORDER_TIPS'] = 'Tips';




$lang_resource['CONTROL_PANEL_BUSINESS_DELETE_CONFIRMATION'] = 'Do you want to delete this restaurant?';
$lang_resource['SHOPPING_MENU_MOST_POPULAR_DISH'] = 'Most popular dishes';

//panel order status
$lang_resource['ORDER_STATUS_PENDING'] = 'Pending';
$lang_resource['ORDER_STATUS_DELIVERED'] = 'Delivered';
$lang_resource['ORDER_STATUS_CANCELLED'] = 'Cancelled';
$lang_resource['ORDER_STATUS_Preparation'] = 'Preparation';
$lang_resource['ORDER_STATUS_ONITSWAY'] = 'Order on its way';
$lang_resource['ORDER_STATUS_CANCELLEDBYRESTAURANT'] = 'Cancelled by restaurant';
$lang_resource['ORDER_STATUS_CANCELLEDBYDRIVER'] = 'Cancelled by Driver';
$lang_resource['ORDER_STATUS_ACCEPTEDBYRESTAURANT'] = 'Accepted by Restaurant';







//SOUND ALERT POPUP SETTINGS

$lang_resource['SOUNDALERT_V2'] = 'Sound Alert Popup Settings';
$lang_resource['SOUNDSTATUS_V2'] = 'Sound Notification ';
$lang_resource['SOUNDDURATION_V2'] = 'Sound Duration ';

$lang_resource['SOUNDNEWORDERS_V2'] = 'New orders ';
$lang_resource['SOUNDPENDINGORDERS_V2'] = 'You have pending orders ';
$lang_resource['SOUNDSTOPSOUND_V2'] = 'Click on the button to stop sound';
$lang_resource['SOUNDOK_V2'] ='OK';


$lang_resource['BACK_BUTTON_RESTAURENT'] ='Restaurant';
$lang_resource['BACK_BUTTON_SEARCHBY'] ='searchBy';
$lang_resource['BACK_BUTTON_CONFIRMATION'] ='Confirmation';

//Invoice
$lang_resource['INVOICE_DETAILS'] = 'Invoice details';
$lang_resource['INVOICE_EXPORT'] = 'Export Invoice';
$lang_resource['INVOICE_DELETE'] = 'Delete Invoice';
$lang_resource['INVOICE_INVOICES'] = 'INVOICES';
$lang_resource['INVOICE_PERIOD'] = 'Period';
$lang_resource['INVOICE_TOTAL'] = 'Total Invoice';
$lang_resource['INVOICE_VIEW_PDF'] = 'View PDF';
$lang_resource['INVOICE_CREATE'] = 'CREATE INVOICE';
$lang_resource['INVOICE_EDIT'] = 'EDIT INVOICE';
$lang_resource['INVOICE_SEND_REMINDER'] = 'Send Reminder';
$lang_resource['INVOICE_DATE_RANGE'] = 'Date Range';
$lang_resource['INVOICE_TO'] = 'To';
$lang_resource['INVOICE_SELECT_BILLING_OPTION'] = 'Select Billing Option';
$lang_resource['INVOICE_SETUP_RATE_FIXED_PRICE'] = 'Setup rate (fixed price)';
$lang_resource['INVOICE_FIXED_RATE'] = 'Fixed Rate';
$lang_resource['INVOICE_RER_ORDER_COMMISSION_PERCENTAGE'] = 'Per order commission (%)';
$lang_resource['INVOICE_PER_ORDER_FIXED_RATE'] = 'per order fixed rate ($)';
$lang_resource['INVOICE_VAT'] = 'Vat';
$lang_resource['INVOICE_OTHER_RATE'] = 'Other Rate';
$lang_resource['INVOICE_CONFIGURATION'] = 'INVOICE CONFIGURATION';
$lang_resource['INVOICE_BILLING_MAIL'] = 'Website Billing Mail';
$lang_resource['INVOICE_WEBSITE_URL'] = 'Website Url';
$lang_resource['INVOICE_ADDRESS'] = 'Address';
$lang_resource['INVOICE_PHONE'] = 'Phone';
$lang_resource['INVOICE_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['INVOICE_BANK'] = 'Bank';
$lang_resource['INVOICE_PAYPAL'] = 'Paypal';
$lang_resource['INVOICE_SELECT_PAYMENT_TYPE'] = 'Select payment type';
$lang_resource['INVOICE_BANK_NAME'] = 'Bank Name';
$lang_resource['INVOICE_BANK_AC_NO'] = 'Bank A/C No';
$lang_resource['INVOICE_ROUTINE_NO'] = 'Routine No';
$lang_resource['INVOICE_SWIFT_CODE'] = 'Swift Code';
$lang_resource['INVOICE_PAYPAL_ACCOUNT_EMAIL'] = 'E-mail address of Paypal account';
$lang_resource['INVOICE_OTHER'] = 'Other';
$lang_resource['INVOICE_CUSTOM_TEXT'] = 'Custom Text';
$lang_resource['INVOICE_SAVE'] = 'Save';
$lang_resource['INVOICE_CANCEL'] = 'Cancel';
$lang_resource['INVOICE_DOWNLOAD'] = 'Download';
$lang_resource['INVOICE_INVO'] = 'INVOICE';
$lang_resource['INVOICE_PENDING_PAYMENT_TO_OOS'] = 'Pending Payment to OOS';
$lang_resource['INVOICE_PENDING_PAYMENT_TO'] = 'Pending Payment to';
$lang_resource['INVOICE_PAID_TO_OOS'] = 'Paid to OOS';
$lang_resource['INVOICE_PAID_TO'] = 'Paid to';
$lang_resource['INVOICE_CANCELED'] = 'Cancelled';
$lang_resource['INVOICE_ADMIN_COMMENT'] = 'Admin Comment';
$lang_resource['INVOICE_ADMIN_COMMENTS'] = 'Admin Comments';
$lang_resource['INVOICE_ORDER'] = 'Invoice_ORDER_';
$lang_resource['INVOICE_DATE'] = 'Invoice Date';
$lang_resource['INVOICE_TEL'] = 'Tel';
$lang_resource['INVOICE_EMAIL'] = 'Email';
$lang_resource['INVOICE_WEBSITE'] = 'Website';
$lang_resource['INVOICE_VAT_REGISTRATION'] = 'VAT Registration';
$lang_resource['INVOICE_INVOICE_BREAKDOWN'] = 'Invoice Breakdown';
$lang_resource['INVOICE_AMOUNT'] = 'Amount';
$lang_resource['INVOICE_TOTAL_VALUE_FOR'] = 'Total Value for';
$lang_resource['INVOICE_CUSTOMER_PAID_CASH_FOR'] = 'Customer paid cash for';
$lang_resource['INVOICE_ORDERS'] = 'orders';

$lang_resource['INVOICE_CUSTOMER_PAID_PAYPAL_FOR'] = 'Customer paid Paypal for';
$lang_resource['INVOICE_CUSTOMER_PREPAID_ONLINE_WITH_CARD_FOR'] = 'Customer prepaid online with card for';
$lang_resource['INVOICE_COMMISSION_ON_ORDERS'] = 'Commision on orders';
$lang_resource['INVOICE_SETUP_RATE'] = 'Setup Rate';
$lang_resource['INVOICE_FIXED_RATE'] = 'Fixed Rate';
$lang_resource['INVOICE_PER_ORDER_FIXED_RATE'] = 'Per Order Fixed Rate';
$lang_resource['INVOICE_OTHER_RATE'] = 'Other Rate';
$lang_resource['INVOICE_TOTAL_AMOUNT_CWED_TO_URL'] = 'Total amount cwed to '.$records['sitename'];
$lang_resource['INVOICE_TOTAL_AMOUNT_CWED_FROM_RESTAURANT'] = 'Total owned from restaurant';
$lang_resource['INVOICE_TOTAL_CWED_FROM_RESTAURANT'] = 'Total owned from restrunt';
$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'] = 'Account balance carried froward from previous invoice ( Note: This should be $0.00 if the previous ammount is possitive, because it had been paid by '.$records['sitename'].' )';
$lang_resource['INVOICE_TOTAL_PAYABLE_TO_OOS'] = 'Total payable to OOS (this invoice)';
$lang_resource['INVOICE_QUESTIONS'] = 'If you have any question regarding this invoice or your information, pleace contact '.$records['sitename'].' at Tel: or via e-mail at If you have any question regarding this invoice or your information, pleace contact '.$records['sitename'].' at Tel: or via e-mail at If you have any question regarding this invoice or your information, pleace contact '.$records['sitename'].' at Tel: or via e-mail at';
$lang_resource['INVOICE_SUPPORT_EMAIL'] = 'support@orderonlinesystem.com';
$lang_resource['INVOICE_INVOICE_INFORMATION'] = 'Regarding this invoice or your information, pleace contact '.$records['sitename'].' at Tel: or via e-mail at If you have any question regarding this invoice or your information, pleace contact '.$records['sitename'].' at Tel: or via e-mail at';
$lang_resource['INVOICE_PAYMENT_DETAILS'] = 'Payment Details';
$lang_resource['INVOICE_PAYMENT_TYPE'] = 'payment Type';
$lang_resource['INVOICE_EMAIL_ADDRESS'] = 'E-mail Address';
$lang_resource['INVOICE_ORDER_DETAILS'] = 'Payments Received from Business';
$lang_resource['INVOICE_DATE'] = 'Date';
$lang_resource['INVOICE_ORDER_NO'] = 'Order No.';
$lang_resource['INVOICE_PAID'] = 'Paid Mtd.';
$lang_resource['INVOICE_TOTAL_VALUE'] = 'Total Value';
$lang_resource['INVOICE_PAYMENT'] = 'Payment';
$lang_resource['INVOICE_DUE'] = 'Due';
$lang_resource['INVOICE_COMMISSION'] = 'Commission';
$lang_resource['INVOICE_FIXED_RATE'] = 'Fixed Rate';
$lang_resource['INVOICE_NO_RECORD_FOUND'] = 'No Record Found';
$lang_resource['INVOICE_YOUR_CURRENT_COMMISSION_IS'] = 'Your current commision is';
$lang_resource['INVOICE_PER_ORDER'] = 'per Order';
$lang_resource['INVOICE_SORRY_YOU_HAVE_NO_INVOICE'] = 'Sorry You have no invoice between this date range and Business type';
$lang_resource['INVOICE_PLEASE_CHECK_ANY_ONE'] = 'please check any one or more';
$lang_resource['INVOICE_CURRENT_INVOICE_STATUS_FOR_INVOICE_NO'] = 'Current Invoice Status for Invoice No';
$lang_resource['INVOICE_ADMIN_COMMENTS'] = 'Admin coments';
$lang_resource['INVOICE_COMMENTS'] = 'Coments';
$lang_resource['INVOICE_PDF_INVOICE'] = 'Invoice';
$lang_resource['INVOICE_STATUS'] = 'Invoice Status';
$lang_resource['INVOICE_ORDER_PDF'] = 'Order';
$lang_resource['INVOICE_ORDER_BILLING_TAB'] = 'Billing Tab';
$lang_resource['INVOICE_ORDER_MANUAL'] = 'Manual';
$lang_resource['INVOICE_ORDER_TOTAL_AMOUNT_OWED'] = 'Total amount owed';
$lang_resource['INVOICE_ORDER_PLEASE_ENTER_FROM_DATE_TO_DATE'] = 'Please enter From Date  greater than To Date';
$lang_resource['INVOICE_ORDER_TOTAL_PAYABLE_TO_OOS'] = 'Total payable to OOS (this invoice)';
$lang_resource['INVOICE_ORDER_TOTAL_AMOUNT_OWED_TO_US'] = 'Total amount owed to us';
$lang_resource['INVOICE_ORDER_INVOICE_DETAILS'] = 'Invoice Details';
$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT'] = 'PAYMENT';
$lang_resource['INVOICE_ORDER_INVOICE_ID'] = 'Invoice Id'; 
$lang_resource['INVOICE_ORDER_INVOICE_PAY'] = 'Invoice Pay';
$lang_resource['INVOICE_ORDER_INVOICE_TOTAL_ITEM'] = 'Total Item';
$lang_resource['INVOICE_ORDER_INVOICE_DETAILS'] = 'INVOICES DETAILS';
$lang_resource['INVOICE_ORDER_INVOICE_INVOICE'] = 'INVOICE';
$lang_resource['INVOICE_ORDER_INVOICE_INFORMATION_PAYMENT'] = 'Regarding this invoice or your information, please contact us at Tel: or via e-mail at If you have any question regarding this invoice or your information, please contact us at Tel: or via e-mail at'; 
$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_OPTION'] = 'PAYMENT OPTION';
$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_INVOICE_AMOUNT'] = 'Total Invoice Amount to be Pay';
$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_AMOUNT'] = 'Payment Amount';
$lang_resource['INVOICE_ORDER_INVOICE_PAYMENT_ALERT'] = 'Payment amount is greater than Due amount';


//Register
$lang_resource['REGISTER_FORM_CREATE_BUTTON'] = 'Create';
$lang_resource['REGISTER_FORM_UPDATE_BUTTON'] = 'Update';
//Coupon
$lang_resource['CHECKOUT_COUPON_APPLIED'] = 'Coupon applied';
//Reservation
$lang_resource['RESERVATION_NO_GUEST'] = 'Guest';
$lang_resource['RESERVATION_NO_HOUR'] = 'Hour';
$lang_resource['RESERVATION_NO_MUNITE'] = 'minute';
$lang_resource['RESERVATION_OPENING_TIME'] = 'Opening Time';
//menu-list.js
$lang_resource['MENULIST_OPENING_TIME'] = 'Opening Time';
//order-confirm.php
$lang_resource['ORDER_CONFIRM_YOU_HAVE_ACCEPTED_ORDER_NO'] = 'You have accepted Order No';
$lang_resource['ORDER_CONFIRM_YOU_HAVE_DELIVERED_ORDER_NO'] = 'You have delivered Order No';
$lang_resource['ORDER_CONFIRM_YOU_HAVE_CANCELLED_ORDER_NO'] = 'You have Cancelled Order No';
//review.js
$lang_resource['REVIEW_SUCCESS_MESSAGE'] = 'Thank you for rating us';
$lang_resource['REVIEW_ALREADY_REVIEWED'] = 'Order was already reviewed.';
//superadmin.php
$lang_resource['SUPERADMIN_YES_CITY_TAX'] = 'Yes City Tax';
$lang_resource['SUPERADMIN_NO_CITY_TAX'] = 'No';
$lang_resource['SUPERADMIN_CUSTOM_CITY_TAX'] = 'Custom';
$lang_resource['SUPERADMIN_FIXED_RATE_COMMISSION'] = 'Fixed rate of Commision($)';
$lang_resource['SUPERADMIN_INCLUDING_TAX'] = 'Including Tax';
//front-visual.js
$lang_resource['FRONT_VISUAL_TAX'] = 'TAX';
$lang_resource['SUPERADMIN_CUSTOM_CITY_TAX'] = 'Custom';


//Lang fixes by sergioaok March 11 2015
$lang_resource['CONTROL_PANEL_ITEM_DELETE_CONFIRMATION'] = 'Do you want to delete this item?';

//Settings to select miles or km 
$lang_resource['CONTROL_PANEL_DISTANNCE_FORMAT'] = 'Distance Format';
$lang_resource['CONTROL_PANEL_DISTANCE_TEXT1'] = 'Distance in Km';
$lang_resource['CONTROL_PANEL_DISTANCE_TEXT2'] = 'Distance in Miles';
$lang_resource['BUSINESS_LIST_OPTIONS_MILES'] = 'MILES';
$lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS1'] = 'Express 5 MILES';
$lang_resource['CONTROLL_PANEL_IDELIVERY_SHORTTEXT1']='Miles wise ';

 //Time selection settings.
 $lang_resource['CONTROL_PANEL_TIME_FORMAT'] = 'Time Format';

//SMS settings.
$sms_resource['SMS_ORDER_SENT_CLIENT'] = 'Thank you for your order, your order number is: ';
$sms_resource['SMS_ORDER_SENT_BUSINESS'] = 'Order confirmation #';

//17/03/2015 by Cris
$lang_resource['MENU_LIST_SEARCH_HERE'] = 'Search here';
$lang_resource['EMAIL_TEMPLATE_UPDATE_IS'] = 'is';
$lang_resource['DOSCOUND_PERCENTAGE_OF_COMMISSION'] = 'Percentage of Commision(%)';
$lang_resource['SPLIT_PAYMENTMAIL_TO_RECEIVE_PAYMENT'] = 'Mail to recieve payments';
$lang_resource['SPLIT_PAYMENTMAIL_ADAPTIVE_EMAIL'] = 'Paypal Adaptive E-mail';
$lang_resource['SPLIT_PAYMENTMAIL_ADAPTIVE'] = 'Split Payment';
$lang_resource['MENU_PAGE_DELIVERY_FEE_STATUS'] = 'Pending';
$lang_resource['SUPERADMIN_PAYPAL_ADAPTIVE'] = 'Paypal Adaptive';
$lang_resource['SUPERADMIN_SUPER_ADMIN_EMAIL'] = 'Super Admin Email';
$lang_resource['SUPERADMIN_SUPER_USERNAME'] = 'UserName';
$lang_resource['SUPERADMIN_SUPER_SIGNATURE'] = 'Signature';
$lang_resource['SUPERADMIN_SUPER_APPID'] = 'AppId';
$lang_resource['PRODUCT_OPTIONS_WHOLE'] = 'Whole';
$lang_resource['PRODUCT_OPTIONS_RIGHT'] = 'Right';
$lang_resource['PRODUCT_OPTIONS_LEFT'] = 'Left';
$lang_resource['PRODUCT_OPTIONS_SELECT'] = 'Select';
$lang_resource['EMAIL_CURRENT_ORDER_STATUS_FOR_ORDER_NO'] = 'Current Order Status for Order No';
$lang_resource['ADMIN_BUSINESS_PRICE_SETTINGS'] = 'Price Setting';
$lang_resource['ADMIN_BUSINESS_CATALOGS_ENDS'] = 'Ends';
$lang_resource['MENU_LIST_BOOKING_IS_AVAILABLE'] = 'Booking is available';
$lang_resource['ORDER_CONFIRMED_DELIVERED'] = 'Order Delivered';
$lang_resource['ORDER_CONFIRMED_ACCEPTED_BY_DRIVER'] = 'Accepted by Driver'; 
$lang_resource['ORDER_CONFIRMED_ACCEPTED_BY_DRIVER_ESTIMATED_DELIVERY_TIME'] = 'Estimated delivery time for Order No';
$lang_resource['ORDERS_DRIVER_COMMENTS'] = 'Driver comments';

$lang_resource['OOS_DIRECT_MTITLE'] = 'None';
$lang_resource['BUSINESS_ALERT_POPUP_TITLE'] = 'Not available in that city but we&#39;re...';
$lang_resource['BUSINESS_ALERT_POPUP_OPEN'] = 'open';

$lang_resource['BUSINESS_ALERT_POPUP_SUGGESTIONS'] = 'To suggestions';
$lang_resource['BUSINESS_ALERT_POPUP_SUGGEST'] = 'Suggest a shop';
$lang_resource['BUSINESS_ALERT_POPUP_CONTACT'] = 'Contact Us';
$lang_resource['RESPONSIVE_ORDER_EMAIL_TIME'] = 'time'; 
$lang_resource['ORDER_STATUS_PREPARATION'] = 'Preparation';
$lang_resource['ORDERS_CLIENT_DATA'] = 'Client data';
$lang_resource['FRONT_MAIN_GUEST_USER'] = 'Guest User';
$lang_resource['ALL_DROPDOUN_SELECT_DEFAULT'] = 'Default';
$lang_resource['EMAIL_TEMPLATE_REVIEW_NOW'] = 'Review Now';

//curerency text

$lang_resource['CURRENCY_TEXT'] = 'Currency ';

//authorize checkout
$lang_resource['LOGIN_CREATE_FIRST_NAME'] = 'First Name';
$lang_resource['LOGIN_CREATE_LAST_NAME1'] = 'Last name';
$lang_resource['LOGIN_CREATE_SECOND_LAST_NAME'] = 'Last name 2:';
$lang_resource['LOGIN_CREATE_EMAIL'] = 'E-mail:';
$lang_resource['LOGIN_CREATE_PASS'] = 'Password:';
$lang_resource['LOGIN_CREATE_STREET'] = 'Housenumber / Street:';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO'] = 'Card No';
$lang_resource['LOGIN_CREATE_SUBURB'] = 'Postcode:';
$lang_resource['LOGIN_CREATE_ZIP'] = 'Zip code:';
$lang_resource['LOGIN_CREATE_COUNTRY'] = 'Country:';
$lang_resource['LOGIN_CREATE_CITY'] = 'City:';
$lang_resource['LOGIN_CREATE_PHONE'] = 'Phone:';
$lang_resource['LOGIN_CREATE_MOBILE'] = 'Mobile:';
$lang_resource['FRONT_VISUALS_POST_CODE1'] = 'Post Code';
$lang_resource['MOBILE_MYACCOUNT_CITY'] = 'City';
$lang_resource['MOBILE_MYACCOUNT_STATE'] = 'Country';
$lang_resource['MOBILE_MYACCOUNT_STATE1'] = 'State';

//site schedule 

$lang_resource['SITE_SCHEDULE_SETTING'] ='Site Schedule Setting';
$lang_resource['SITE_SCHEDULE_SETTING_TEXT'] ='Site Schedule  Text Setting';
$lang_resource['SITE_SCHEDULE_SETTING_SORRY'] ='Text 1';
$lang_resource['SITE_SCHEDULE_SETTING_MESSAGE'] ='Text 2';
$lang_resource['SITE_SCHEDULE_SETTING_OUR_HOURS'] ='Text 3';
$lang_resource['SITE_SCHEDULE_SETTING_OPENNING'] = 'Start time:';
$lang_resource['SITE_SCHEDULE_SETTING_CLOSING'] = 'Close time:';

//Business Copy
$lang_resource['PANEL_BUSINESS_ALERT_COPY_CONFIRM'] = 'Are you want to copy this business.';
$lang_resource['PANEL_BUSINESS_ALERT_COPY_TEXT'] = 'Copy';

//Mercury payment getway''''
$lang_resource['CONTROL_PANEL_MERCURY_PAYMENT_INFO'] = 'Mercury payment getway information';
$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_ID'] = 'Merchant Id :';
$lang_resource['CONTROL_PANEL_MERCURY_MERCHENT_PASS'] = 'Merchant Password :';

$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CASH_OPTION'] = 'Accept Cash ';
$lang_resource['SHOPPING_PAYMENT_NOT_SELECTED'] = 'NO payment method enabled';
$lang_resource['BUSINESS_PAGE_SETTING'] ='Business Page Setting';
$lang_resource['BUSINESS_PAGE_PROGRESSBAR_SETTING'] ='Progressbar Hide Setting';
$lang_resource['BUSINESS_PAGE_HEADER_SETTING'] ='Header Hide Setting';
$lang_resource['BUSINESS_PAGE_FOOTER_SETTING'] ='Footer Hide Setting';
$lang_resource['BUSINESS_PAGE_CUSTOM_TEXT'] ='Custom Text For Footer';
$lang_resource['TRACK_ORDER_AND_RESERVATION'] ='Track Order & Reservation';
$lang_resource['TRACK_ORDER_RESERVATION'] ='Track Reservation';



//Apps url
$lang_resource['HOMEPAGE_IPHONE_APP_URL'] = 'https://itunes.apple.com/us/app/ordering-online-system-v3/id972982247?mt=8';
$lang_resource['HOMEPAGE_ANDROID_APP_URL'] = 'https://play.google.com/store/apps/details?id=com.OrderingOnlineSystemv3';

$lang_resource['BUSINESS_PAYMENT_VALIDATION'] ='Please Select Payment Method';


//email template

$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSACTION_CODE'] ='Transaction Code';
$lang_resource['ORDER_EMAIL_TEMPLATE_VALIDATING_PAYMENT_PAYPAL'] ='Error validating payment by Paypal'; 
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYPAL'] ='Paid Via Paypal';

$lang_resource['PANEL_PRODUCT_OPTION_PRICE_ALT1'] ="Main product price is blank so you can't add product without product option and option value";

$lang_resource['SERVICE_FEE_V2'] = 'Service Fee';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_ZONE1'] = ' Default Zone:';
$lang_resource['REVIEW_MSG1'] = 'Order was already reviewed.';
$lang_resource['REVIEW_MSG2'] = 'Order does not exist on this business to review.';
$lang_resource['REVIEW_MSG3'] = 'This Order not permission for this business.';
$lang_resource['REVIEW_MSG4'] = 'Thank you for rating us'; 

//31/03/2015
$lang_resource['YOU_WILL_DELIVER_IN'] = 'You will deliver in';
$lang_resource['YOU_WILL_DELIVER_IN_MINS'] = 'mins';
$lang_resource['BUSINESS_BILLING_BUSINESS_DETAILS'] = 'Billing business details';
$lang_resource['BUSINESS_SAME_AS_BUSINESS_ADDRESS'] = 'Same As Business Address';
$lang_resource['BUSINESS_INVOICE_ADDRESS'] = 'Invoice address'; 
$lang_resource['BUSINESS_EMAIL_ADDRESS_FOR_RESTAURANT'] = 'Email address for restaurant'; 
$lang_resource['BUSINESS_PAYMENT_METHOD_BY_BUSINESS'] = 'Payment method preferred by Business';
$lang_resource['BUSINESS_BILLING_OPTIONS'] = 'Billing options'; 
$lang_resource['BUSINESS_GENERATE_AUTO_INVOICE'] = 'Generate auto-invoice (in days)'; 
$lang_resource['BUSINESS_EMAIL_DRIVERS_COMMENTS'] = 'Driver coments';
$lang_resource['FRONT_CARD'] = ' Card';
$lang_resource['FRONT_BRAINTREE'] = ' Braintree';
$lang_resource['FRONT_AUTHORIZE'] = ' Authorize';
$lang_resource['FRONT_CARDSAVE'] = ' Cardsave';
$lang_resource['FRONT_PAYPAL'] = ' Paypal';
$lang_resource['FRONT_MACRO'] = ' Marco';
$lang_resource['FRONT_PAYPALADAPTIVE'] = ' Paypaladaptive';
$lang_resource['FRONT_AUTHORIZEDOTNET'] = ' Aauthorizednet';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CARD'] = "Upon receiving pay with Card";

$lang_resource['EMAIL_RESTAURENT_INFO'] = "Restaurant Information";
$lang_resource['EMAIL_RESTAURENT_NAME'] = "Restaurant Name";
$lang_resource['EMAIL_RESTAURENT_ADDRESS'] = "Address1";
$lang_resource['EMAIL_RESTAURENT_NEIGHBORHOOD'] = "Address2";
$lang_resource['EMAIL_RESTAURENT_CITY'] = "City";
$lang_resource['EMAIL_RESTAURENT_ZIPCODE'] = "Zipcode";


///Bringg
$lang_resource['BRINGG_COMPANY_ID'] = "Bringg company id";
$lang_resource['BRINGG_ACCESS_TOKEN'] = "Bringg Access token";
$lang_resource['BRINGG_SECRET_KEY'] = "Bringg Secret key";
$lang_resource['SET_DRIVER_DELIVERY_TIME'] = "Bringg Driver delivery time (MM)";

///
$lang_resource['MOBILE_FRONT_VISUAL_LASTNAME2'] = "Last Name2";

//02/04/2015-cris
$lang_resource['FRONT_MAIN_ORDER_STATUS_MESSAGE'] = "Order Status Message";
//03/04/2015-cris
$lang_resource['INVOICE_EXPORT_INVOICE_NUMBER'] = 'Invoice Number'; 
$lang_resource['INVOICE_EXPORT_PER_ORDER_COMMISSION'] = 'Per Order Commission';
$lang_resource['INVOICE_EXPORT_FROM_DATE'] = 'From Date';
$lang_resource['INVOICE_EXPORT_TO_DATE'] = 'To Date'; 
$lang_resource['INVOICE_EXPORT_Manually'] = 'Manually';


$lang_resource['MOBILE_CHECKOUT_RESERVATION_DETAILS'] = 'Order + Reservation Details';
$lang_resource['CHECKOUT_RESERVATION_DETAILS'] = 'Order + Reservation Details';

//business printer set
$lang_resource['PRINTER_SELECT_ALL'] = "Please choose Model";
$lang_resource['PRINTER_SET'] = 'Printer Set';
$lang_resource['PRINTER_PORT'] = 'PORT';
$lang_resource['PRINTER_SERVERIP'] = 'Server IP';
$lang_resource['PRINTER_FILE_PATH'] = 'Printer File Path';
$lang_resource['PRINTER_CONFIRMATION_FILE_PATH'] = 'Confirmation File Path';
$lang_resource['PRINTER_SET_MODEL'] = 'Set Printer Model';


?>