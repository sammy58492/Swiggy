<?php
/*
English
*/

//''''
// HOME''''
//''''

//$lang_resource1 = Langsetting();
if(count($lang_resource) == 0) {
$lang_resource =array();
}

$lang_resource['ORDER_NO_EMER'] = 'Order No.';
$lang_resource['ORDER_NO_ACCEPTED'] = 'is not accepted';

$lang_resource['MAIN_PAGE_TITLE'] = $records['sitename'];
$lang_resource['MAIN_PAGE_META_DESCRIPTION'] = $records['googleanalyticscode'];
$lang_resource['MAIN_PAGE_META_KEYWORDS'] =$records['analyticscode'];
$lang_resource['MAIN_PAGE_META_AUTHOR'] = $records['sitename'].' - Order everything online, sell franchises, restaurants mall.';

//''''
$lang_resource['AUTO_EMAIL_PAGE_HI'] = 'Hi, your order id ';
$lang_resource['AUTO_EMAIL_PAGE_ORDER_STATUS'] = ' is Pending';
  //Time selection settings. 
$lang_resource['TIME_FORMAT'] = $records['timeformat'];
$lang_resource['Panel_Currency'] = $records['currency'];
$lang_resource['SITE_CURRENCY'] = $records['currency'];
$lang_resource['INVOICE_CURRENCY'] = $records['currency'];
$lang_resource['SITE_SCHEDULE_SETTING_TIME_ZONE'] = $records['defaulttimezone'];
// BODY''''
//''''
$lang_resource['MAIN_PAGE_SEARCH_VALIDATION_MSG'] = 'Please fill all fields';
$lang_resource['MAIN_PAGE_SEARCH_ZIPCODE_VALIDATION_MSG'] = 'Enter valid zipcode';
$lang_resource['MAIN_PAGE_CHECK_ORDER'] = 'Check order status:';
$lang_resource['BODY_WHERE_ARE_YOU'] = 'Where are you?';
$lang_resource['BODY_FOLLOW_US'] = 'Like Us!';
$lang_resource['BODY_ORDER_FOOD_TITLE'] = 'Order food online from the best delivery restaurants in your area!';
$lang_resource['LOGIN_INPUT_EMAIL'] = 'e-mail';
$lang_resource['LOGIN_INPUT_PASSWORD'] = 'password';
$lang_resource['LOGIN_BUTTON_LOGIN'] = 'LOGIN';
$lang_resource['LOGIN_LINK_CREATE_ACCOUNT'] = 'Register';
$lang_resource['LOGIN_LINK_FORGOT_PASSWORD'] = 'Forgot your password?';
//''''
// USER LOGGED IN''''
//''''
$lang_resource['LOGIN_WELCOME_TEXT'] = 'Welcome';
$lang_resource['LOGIN_LINK_MY_ORDERS'] = 'My orders';
$lang_resource['LOGIN_LINK_CONTROL_PANEL'] = 'Control panel';
$lang_resource['LOGIN_LINK_SESSION_CLOSE'] = 'Sign out';
$lang_resource['LOGIN_LINK_EDIT_PROFILE'] = 'Edit my profile';
$lang_resource['LOCATE_ME'] = 'Locate me';
$lang_resource['TRACK_REORDER'] = 'Reorder';
//''''
// LOGIN FORM''''
//''''
$lang_resource['LOGIN_CREATE_TITLE'] = 'CREATE ACCOUNT';
$lang_resource['LOGIN_EDIT_TITLE'] = 'EDIT ACCOUNT';
$lang_resource['LOGIN_CREATE_NAME'] = 'Name:';
$lang_resource['LOGIN_CREATE_LAST_NAME'] = 'Last name:';
$lang_resource['LOGIN_CREATE_SECOND_LAST_NAME'] = 'Last name 2:';
$lang_resource['LOGIN_CREATE_EMAIL'] = 'E-mail:';
$lang_resource['LOGIN_CREATE_PASS'] = 'Password:';
$lang_resource['LOGIN_CREATE_STREET'] = 'Address:';
$lang_resource['LOGIN_CREATE_SUBURB'] = 'Neighborhood:';
$lang_resource['LOGIN_CREATE_ZIP'] = 'Zip code:';
$lang_resource['LOGIN_CREATE_COUNTRY'] = 'Country:';
$lang_resource['LOGIN_CREATE_CITY'] = 'City:';
$lang_resource['LOGIN_CREATE_PHONE'] = 'Phone:';
$lang_resource['LOGIN_CREATE_MOBILE'] = 'Mobile:';
//''''
// RECOVER PASS FORM''''
//''''
$lang_resource['RECOVER_PASS_TITLE'] = 'FORGOT PASSWORD?';
$lang_resource['RECOVER_PASS_EMAIL'] = 'Email:';
//''''
// ORDERS BOX''''
//''''
$lang_resource['ORDERS_BOX_TITLE'] = 'ORDERS';
$lang_resource['ORDERS_BOX_DATE_HEADER'] = 'Date';
$lang_resource['ORDERS_BOX_BUSINESS_HEADER'] = 'Business';
$lang_resource['ORDERS_BOX_CITY_HEADER'] = 'City';
$lang_resource['ORDERS_BOX_STATUS_HEADER'] = 'Status';
//''''
// CONTROL PANEL''''
//''''
$lang_resource['CONTROL_PANEL_USER_SUPER_ADMIN'] = 'Super admin';
$lang_resource['CONTROL_PANEL_USER_ADMIN'] = 'Administrator';
$lang_resource['CONTROL_PANEL_USER_RESTAURATEUR'] = 'Business owner';
$lang_resource['CONTROL_PANEL_USER_CUSTOMER'] = 'Client';
$lang_resource['CONTROL_PANEL_USER_DRIVER'] = 'Driver';
$lang_resource['CONTROL_PANEL_USER_DRIVERMANAGER'] = 'Driver Manager';
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
// SECTION FRANCHISES''''
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
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_CURRENCY'] = 'Paypal Currency:';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TAX_TYPE']= 'Tax type';
$lang_resource['CONTROL_PANEL_FRANCHISES_INPUT_TAX']= 'Tax Percentage';
// SECTION BUSINESS''''
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
$lang_resource['CONTROL_PANEL_BUSINESS_REORDER'] = 'Allow for Reorder';
$lang_resource['CONTROL_PANEL_BUSINESS_FEATURED'] = 'Allow for Featured';
$lang_resource['CONTROL_PANEL_BUSINESS__DISH_POPULAR'] = 'Allow for Most popular dish';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_DAYS'] = 'Open Days:';
$lang_resource['CONTROL_PANEL_BUSINESS_GENERAL_CATEGORIES'] = 'Categories:';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_OPENNING'] = 'Open time:';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_CLOSING'] = 'Close time:';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SUNDAY'] = 'Sunday';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_MONDAY'] = 'Monday';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_TUESDAY'] = 'Tuesday';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_WEDNESDAY'] = 'Wednesday';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_THURSDAY'] = 'Thursday';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_FRIDAY'] = 'Friday';
$lang_resource['CONTROL_PANEL_BUSINESS_SCHEDULES_SATURDAY'] = 'Saturday';
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
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CATEGORY_HEADER'] = 'Categories';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_PRICE_HEADER'] = 'Price';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_ENABLE_HEADER'] = 'Enable';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_TITLE'] = 'CREATE PRODUCT';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_EDIT_TITLE'] = 'EDIT PRODUCT';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_DESCRIPTION'] = 'Description:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_INGREDIENTS'] = 'Ingredients: (separate with , )';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_EXTRAS'] = 'Product options: (start typing)';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_CATEGORY'] = 'Category:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_CREATE_INPUT_PRICE'] = 'Price:';
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_FEATURED'] = 'Allow for feature:';
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





// SECTION USERS''''
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
// SECTION ADS''''
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
// SECTION ORDERS''''
$lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EDIT'] = 'Edit order';
$lang_resource['CONTROL_PANEL_ORDERS_BUTTON_EXPORT'] = 'Export order';
$lang_resource['CONTROL_PANEL_ORDERS_BUTTON_DELETE'] = 'Delete order';
$lang_resource['CONTROL_PANEL_ORDERS_DATE_HEADER'] = 'Date';
$lang_resource['CONTROL_PANEL_ORDERS_CITY_HEADER'] = 'City';
$lang_resource['CONTROL_PANEL_ORDERS_STATUS_HEADER'] = 'Status';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_STATUS'] = 'Status:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_INPUT_COMMENT'] = 'Comments:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_NAME'] = 'Name:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_LASTNAME'] = 'Last Name:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_APT'] = 'APT/Suit:';
$lang_resource['CONTROL_PANEL_ORDERS_EDIT_ZIPCODE'] = 'Zipcode:';
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
// SECTION STATISTICS''''
$lang_resource['CONTROL_PANEL_STATISTICS_TITLE'] = 'STATISTICS';
$lang_resource['CONTROL_PANEL_STATISTICS_SALES_TITLE'] = 'Sales';
$lang_resource['CONTROL_PANEL_STATISTICS_TOP_10'] = 'Top 10';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SUN'] = 'Sun';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MON'] = 'Mon';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_TUE'] = 'Tue';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_WED'] = 'Wed';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_THU'] = 'Thu';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_FRI'] = 'Fri';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SAT'] = 'Sat';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_SUN'] = 'Sunday';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_MON'] = 'Monday';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_TUE'] = 'Tuesday';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_WED'] = 'Wednesday';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_THU'] = 'Thursday';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_FRI'] = 'Friday';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_SAT'] = 'Saturday';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JAN'] = 'Jan';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_FEB'] = 'Feb';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MAR'] = 'Mar';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_APR'] = 'Apr';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_MAY'] = 'May';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JUN'] = 'Jun';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_JUL'] = 'Jul';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_AUG'] = 'Aug';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_SEP'] = 'Sep';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_OCT'] = 'Oct';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_NOV'] = 'Nov';
$lang_resource['CONTROL_PANEL_STATISTICS_SHORT_DEC'] = 'Dec';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_JAN'] = 'January';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_FEB'] = 'February';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAR'] = 'March';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_APR'] = 'April';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_MAY'] = 'May';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUN'] = 'June';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_JUL'] = 'July';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_AUG'] = 'August';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_SEP'] = 'September';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_OCT'] = 'October';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_NOV'] = 'November';
$lang_resource['CONTROL_PANEL_STATISTICS_LONG_DEC'] = 'December';
$lang_resource['SHOPPING_FIRST_PAGE_WHERE_AM_I'] = 'WHERE ARE YOU?';
$lang_resource['SHOPPING_FIRST_PAGE_DRAG_MAP'] = 'Right click to select your address or you can drag the marker:';
$lang_resource['SHOPPING_SECOND_SEARCH_HOLDER'] = 'Search';
$lang_resource['SHOPPING_SECOND_SHOW_HIDE_LABEL'] = 'SHOW OR HIDE';
$lang_resource['SHOPPING_SECOND_NAME_HEADER'] = 'Name';
$lang_resource['SHOPPING_SECOND_CATEGORY_HEADER'] = 'Category';
$lang_resource['SHOPPING_SECOND_SEND_HEADER'] = 'Delivery';
$lang_resource['SHOPPING_SECOND_SEND_COST'] = 'DELIVERY FEE';
$lang_resource['SHOPPING_SECOND_SEND_NO_COST'] = 'FREE DELIVERY';
$lang_resource['SHOPPING_SECOND_FREE'] = 'Free';
$lang_resource['SHOPPING_SECOND_WHERE_ARE_YOU_BUTTON'] = 'Where are you?';
$lang_resource['SHOPPING_SECOND_WHERE_MY_ORDER_BUTTON'] = 'My order';
$lang_resource['SHOPPING_SECOND_WHERE_BACK_BUTTON'] = 'Back';
$lang_resource['SHOPPING_THIRD_SEE_COMMENTS'] = 'See Comments';
$lang_resource['SHOPPING_THIRD_SEE_COMMENTSs'] = 'See Review';
$lang_resource['SHOPPING_THIRD_ACTIVE_INGREDIENT'] = 'Active ingredient';
$lang_resource['SHOPPING_THIRD_EXTRA_ACTIVE_INGREDIENT'] = 'Active Extra';
$lang_resource['SHOPPING_THIRD_EXTRA_INACTIVE_INGREDIENT'] = 'Inactive ingredient';
$lang_resource['SHOPPING_THIRD_INACTIVE_INGREDIENT'] = 'Inactive Extra';
$lang_resource['SHOPPING_FOURTH_MY_SHOPPING_CART'] = 'MY SHOPPING CART';
$lang_resource['SHOPPING_FOURTH_ORDER_NOW'] = 'ORDER NOW';
$lang_resource['SHOPPING_FOURTH_ORDER_NOW_RESERVE'] = 'ORDER + RESERVE';
$lang_resource['SHOPPING_RESERVE_AND_ORDER_CHECK'] = 'Please reserve your space';

$lang_resource['SHOPPING_FOURTH_TOTAL_PAY'] = 'TOTAL:';
$lang_resource['SHOPPING_FOURTH_NAME'] = 'Name:';
$lang_resource['SHOPPING_FOURTH_EMAIL'] = 'E-mail:';
$lang_resource['SHOPPING_FOURTH_ADDRESS'] = 'Full Address:';
$lang_resource['SHOPPING_FOURTH_NEIGHBORHOOD'] = 'Neighborhood:';
$lang_resource['SHOPPING_FOURTH_WHERE_DID_YOU_FIND_US'] = 'Where did you find about us?';
$lang_resource['SHOPPING_FOURTH_PHONE'] = 'Phone:';
$lang_resource['SHOPPING_FOURTH_PAYMENT'] = 'Payment:';
$lang_resource['SHOPPING_FOURTH_TIP'] = 'Tip for the driver:';
$lang_resource['SHOPPING_FOURTH_PAYMENT_CASH'] = 'Cash';
$lang_resource['SHOPPING_FOURTH_PAYMENT_PAYPAL'] = 'Paypal';
$lang_resource['SHOPPING_FOURTH_COMMENTS'] = 'Comments';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_1'] = 'Minimum shopping for';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_2'] = 'is ';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_3'] = 'please add any other dish. Thank you';
$lang_resource['SHOPPING_FOURTH_ERROR_MINIMUM_BUY_4'] = 'please select reference.';
$lang_resource['SHOPPING_FOURTH_ERROR_NAME'] = 'Please enter your name';
$lang_resource['SHOPPING_FOURTH_ERROR_LASTNAME'] = 'Please enter your Last name';
$lang_resource['SHOPPING_FOURTH_ERROR_APT_SUIT'] = 'Please enter your APT/Suit';
$lang_resource['SHOPPING_FOURTH_ERROR_ZIP_CODE'] = 'Please enter your Zip Code';
$lang_resource['SHOPPING_FOURTH_ERROR_CITY'] = 'Please Select your City';
$lang_resource['SHOPPING_FOURTH_ERROR_REFERENCE'] = 'Please Select your Reference';
$lang_resource['SHOPPING_FOURTH_ERROR_TWILO'] = 'Please select your Receive SMS';
$lang_resource['SHOPPING_FOURTH_ERROR_TIPS'] = 'Please enter Tips';
$lang_resource['SHOPPING_FOURTH_ERROR_DISCOUNT'] = 'Please enter Discount Code';




$lang_resource['SHOPPING_FOURTH_ERROR_EMAIL'] = 'Please enter a valid email';
$lang_resource['SHOPPING_FOURTH_ERROR_STREET'] = 'Please enter a valid address';
$lang_resource['SHOPPING_FOURTH_ERROR_NEIGHBORHOOD'] = 'Please enter a valid neighborhood';
$lang_resource['SHOPPING_FOURTH_ERROR_FIND_US'] = 'Please enter how did you find about us';
$lang_resource['SHOPPING_FOURTH_ERROR_PHONE'] = 'Please enter a valid phone';
//''''
// FOOTER''''
//''''
$lang_resource['FOOTER_ABOUT_TITLE'] = 'Our company';
$lang_resource['FOOTER_ABOUT_ABOUT'] = 'About us';
$lang_resource['FOOTER_ABOUT_BLOG'] = 'Blog';
$lang_resource['FOOTER_ABOUT_CONTACT'] = 'Contact us';
$lang_resource['FOOTER_OWNER_TITLE'] = 'Business owners';
$lang_resource['FOOTER_OWNER_WORKING'] = 'How it works?';
$lang_resource['FOOTER_OWNER_USER'] = 'Users benefits';
$lang_resource['FOOTER_OWNER_RESTAURANT'] = 'Business benefits';
$lang_resource['FOOTER_OWNER_ADD'] = 'Add business';
$lang_resource['FOOTER_INFO_TITLE'] = 'Support and Information';
$lang_resource['FOOTER_INFO_FAQ'] = 'FAQ';
$lang_resource['FOOTER_INFO_PRIVACITY'] = 'Privacy policy';
$lang_resource['FOOTER_INFO_TOS'] = 'Terms and Conditions';
$lang_resource['FOOTER_INFO_MAP'] = 'Site map';
//''''
// MOBILE''''
//''''
$lang_resource['MOBILE_MAIN_PAGE_TITLE'] = $records['sitename'];
$lang_resource['MOBILE_MAIN_PAGE_ORDER_FOOD_ONLINE'] = 'order food online';
$lang_resource['MOBILE_MAIN_PAGE_SIGN_OUT'] = 'Sign out';
$lang_resource['MOBILE_MAIN_PAGE_CHECK_ORDER_STATUS'] = 'Check order status';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_ARE_YOU'] = 'Where are you?';
$lang_resource['MOBILE_LET_US_FIND_YOU'] = 'Let us find you';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_LOGIN'] = 'Login';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_LOGIN_EMAIL'] = 'E-mail:';
$lang_resource['MOBILE_MAIN_PAGE_WHERE_LOGIN_PASSWORD'] = 'Password:';
$lang_resource['MOBILE_SECOND_PAGE_BACK'] = 'Back';
$lang_resource['MOBILE_SECOND_PAGE_NEXT'] = 'Next';
$lang_resource['MOBILE_SECOND_PAGE_COUNTRY'] = 'Country: (Ex. United States)';
$lang_resource['MOBILE_SECOND_PAGE_CITY'] = 'City: (Ex. New York)';
$lang_resource['MOBILE_SECOND_PAGE_ADDRESS'] = 'Address: (Ex. 120 Essex Street)';
$lang_resource['MOBILE_SECOND_PAGE_ORDER_NUMBER'] = 'Address: (Ex. 120 Essex Street)';
$lang_resource['MOBILE_THIRD_PAGE_WHERE_ARE_YOU_EXACTLY'] = 'Where are you exactly?';
$lang_resource['MOBILE_THIRD_PAGE_ZOOM_IN'] = 'Zoom in';
$lang_resource['MOBILE_THIRD_PAGE_ZOOM_OUT'] = 'Zoom out';
$lang_resource['MOBILE_FOURTH_PAGE_FILTER'] = 'Filter';
$lang_resource['MOBILE_FOURTH_PAGE_FREE'] = 'Free';
$lang_resource['MOBILE_FOURTH_PAGE_OK'] = 'OK';
$lang_resource['MOBILE_FIFTH_PAGE_MY_ORDER'] = 'My order';
$lang_resource['MOBILE_FIFTH_PAGE_CHECK_STATUS'] = 'Check order status';
$lang_resource['MOBILE_SIXTH_PAGE_NAME'] = 'Name:';
$lang_resource['MOBILE_SIXTH_PAGE_EMAIL'] = 'E-mail';
$lang_resource['MOBILE_SIXTH_PAGE_ADDRESS'] = 'Address:';
$lang_resource['MOBILE_SIXTH_PAGE_PHONE'] = 'Phone:';
$lang_resource['MOBILE_SIXTH_PAGE_WHERE_DID_YOU_FIND_US'] = 'Where did you find about us';
$lang_resource['MOBILE_SIXTH_PAGE_PAYPAL'] = 'Paypal';
$lang_resource['MOBILE_SIXTH_PAGE_CASH'] = 'Cash';
$lang_resource['MOBILE_SIXTH_PAGE_ORDER_NOW'] = 'ORDER NOW';
$lang_resource['MOBILE_SIXTH_PAGE_ORDER_NOW1'] = 'PAYPAL';
$lang_resource['MOBILE_SIXTH_PAGE_FREE_DELIVERY_SERVICE'] = 'FREE DELIVERY SERVICE';
$lang_resource['MOBILE_SIXTH_PAGE_DELIVERY_SERVICE_FEE'] = 'DELIVERY SERVICE FEE';
$lang_resource['MOBILE_SIXTH_PAGE_EMAIL_NOT_VALID'] = 'email not valid, please use valid email';
$lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_NAME'] = 'Please type your name';
$lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_ADDRESS'] = 'Please give us your address, we need it for your delivery';
$lang_resource['MOBILE_SIXTH_PAGE_TELL_US_FIND_US'] = 'Please tell us how you find about us';
$lang_resource['MOBILE_SIXTH_PAGE_COMMENTS'] = 'comments';
$lang_resource['MOBILE_SIXTH_PAGE_GIVE_US_YOUR_PHONE'] = 'Please give us your phone for any feedback';
$lang_resource['MOBILE_SIXTH_PAGE_RADIO'] = 'Facebook';
$lang_resource['MOBILE_SIXTH_PAGE_FLYER'] = 'Flyer';
$lang_resource['MOBILE_SIXTH_PAGE_GOOGLE'] = 'Google';
// SMS''''
$lang_resource['SMS_ENABLE_CHECKBOX'] = 'Receive SMS';
$lang_resource['SMS_BUSSINESS_SAVE_BUTTON'] = 'Save';
$lang_resource['SMS_BUSSINESS_CANCEL_BUTTON'] = 'Cancel';
$lang_resource['SMS_BUSSINESS_TWILIO_PHONE'] = 'Twilio Phone';
$lang_resource['SMS_BUSSINESS_ENABLE_SMS'] = 'Enable SMS';
$lang_resource['SMS_BUSSINESS_SID_LABEL'] = 'sid:';
$lang_resource['SMS_BUSSINESS_TOKEN_LABEL'] = 'token:';
$lang_resource['SMS_ORDER_SENT_CLIENT'] = 'Thank you for your order, your order number is: ';
$lang_resource['SMS_ORDER_SENT_BUSINESS'] = 'Order confirmation #';
$lang_resource['SMS_ORDER_STATUS_CHANGED'] = 'Order status #';
$lang_resource['SMS_ORDER_STATUS_CHANGED_2'] = ' has changed. ';
$lang_resource['SMS_ORDER_COMMENT_CHANGED'] = 'Order comment #';
$lang_resource['SMS_ORDER_COMMENT_CHANGED_2'] = ' has changed: ';
// extra''''
$lang_resource['ORDER_THANKS'] = 'Thanks for your order';
$lang_resource['ORDER_THANKS_PLCED'] = 'Your order has been placed successfully.';
$lang_resource['ORDER_PROCESSED'] = 'Your order number is:';
$lang_resource['ORDER_IMPORTANT'] = 'Important';
$lang_resource['ORDER_CHANGES'] = 'For changes or cancellation of the order please contact the restaurant or business by phone, we just sent it to your E-Mail. Share your order on Facebook or Twitter!';
$lang_resource['ORDER_SHARE'] = 'Share';
$lang_resource['ORDER_COMMENTS'] = 'Comments ex. for whom?';
$lang_resource['SEARCH_NO_RESTAURANTS'] = 'No restaurants found, please try again later or modify your search';
$lang_resource['BUSINESS_CLOSED'] = 'closed';
$lang_resource['FRONT_CASH'] = 'Cash';
$lang_resource['PASSWORD_SENT'] = 'The password has been sent to your email';
$lang_resource['EMAIL_INCORRECT'] = 'Incorrect email, please try again';
$lang_resource['MAP_NEXT'] = 'NEXT';
$lang_resource['NO_SERVICE'] = 'No service at this moment';
$lang_resource['ONE_RESTAURANT'] = 'You can only order from one restaurant at a time.';
$lang_resource['CARD_DELIVERY'] = 'Card on delivery';
$lang_resource['CASH_DELIVERY'] = 'Cash on delivery';
$lang_resource['AND_CARD'] = 'And Card';
$lang_resource['NO_SERVICE'] = 'No service at this moment';
// new v2 and extras''''
$lang_resource['COUNTRY_V2'] = 'Country';
$lang_resource['CITY_V2'] = 'City';
$lang_resource['ADDRESS_V2'] = 'Address or Zip Code';
$lang_resource['LETS_GO_V2'] = 'SEARCH';
$lang_resource['ELSE_V2'] = 'Or';
$lang_resource['SHOW_RESTAURANTS_V2'] = 'Show Restaurants';
$lang_resource['Lets_be_friends_V2'] = 'Lets be friends!';
$lang_resource['CONFUSED_V2'] = 'Still Confused, Check out our Videos on:';
$lang_resource['RECENT_ORDERS_V2'] = 'Recent Orders';
$lang_resource['HOW_IT_WORKS_V2'] = 'How it Works?';
$lang_resource['BROWSEPERCITY'] = 'Browse per city';
$lang_resource['RESTDISABLED'] = 'Restaurant is disabled by admin, please try later';
$lang_resource['Mobile_V2a'] = 'Mobile';
$lang_resource['Needhelp_V2a'] = 'Need Help?';
$lang_resource['JUST_ORDERED_V2'] = 'ordered from';
$lang_resource['Email_ID_V2'] = 'Email';
$lang_resource['Password_V2'] = 'Password';
$lang_resource['NO_PERMISSION_V2'] = 'You are not allowed to see that order';
$lang_resource['Refine_your_results_V2'] = 'Filter Results';
$lang_resource['Restaurants_Cuisines_Search_V2'] = 'Filter: Restaurants, Food Category';
$lang_resource['Dish_Search_V2'] = 'Dish';
$lang_resource['Categories_V2'] = 'Categories';
$lang_resource['Select_Restaurant_V2'] = 'Select restaurant';
$lang_resource['SEARCH_V2'] = 'SEARCH';
$lang_resource['PAYMENTS_V2'] = 'We accept:';
$lang_resource['PAYMENT_METHOD_V2'] = 'Payment Method:';
$lang_resource['DELIVERY_V2'] = 'Delivery Fee:';
$lang_resource['View_Menu_V2'] = 'Menu';
$lang_resource['SELECT_PRODUCT_V2'] = 'Select Product';
$lang_resource['SELECT_CATEGORY_V2'] = 'Category Filter';
$lang_resource['THANK_YOU_V2'] = 'Thank you very much for your order';
$lang_resource['ORDER_PLACED_V2'] = 'Order placed, number';
$lang_resource['COME_BACK_V2'] = 'Please come back soon!';
$lang_resource['ORDER_PLACED1_V2'] = 'Order placed, nice!';
$lang_resource['ORDER_DETAILS_V2'] = 'The order was placed.';
$lang_resource['Your_order_V2'] = 'Your Order';
$lang_resource['Your_order_summary_V2'] = 'Order Summary';
$lang_resource['SMS_ERROR_V2'] = 'Oops, we could not send the SMS but your order has been placed!';
$lang_resource['Your_Total_V2'] = 'Your Total';
$lang_resource['Cart_Empty_V2'] = 'Order without products, please add something';
$lang_resource['Order_details_V2'] = 'Order Details';
$lang_resource['Delivery_details_V2'] = 'Delivery Details';
$lang_resource['Pickup_details_V2'] = 'Pickup Details';
$lang_resource['Item_Name_V2'] = 'Product';
$lang_resource['Price_V2'] = 'Price';
$lang_resource['Choose_Restaurant_V2'] = 'Choose Restaurant';
$lang_resource['Ratings_V2'] = 'Ratings';
$lang_resource['Tax_V2'] = 'Tax';
$lang_resource['Tax_not_included_V2'] = 'Tax not included on price';
$lang_resource['Tax_included_V2'] = 'Tax included on price';
$lang_resource['Refine_results_V2'] = 'Refine Results';
$lang_resource['Account_suspended_V2'] = 'Suspended Account, please contact us.';
$lang_resource['No_restaurant_country_V2'] = 'No restaurants found on your country';
$lang_resource['No_restaurant_location_V2'] = 'No restaurants found on your location';
$lang_resource['Browser_no_geolocation_V2'] = 'Your browser does not allow geolocation';
$lang_resource['geolocation_failed_V2'] = 'Geolocation failed';
$lang_resource['email_repeated_V2'] = 'Email already in use, please add another one or request your password.';
$lang_resource['valid_email_V2'] = 'Please type a valid email.';
$lang_resource['catalog_not_active_V2'] = 'No products or active catalogs at this time of this day';
$lang_resource['min_V2'] = 'Min purchase of this business';
$lang_resource['min2_V2'] = 'is';
$lang_resource['min3_V2'] = 'please add more products. Thank you very much.';
$lang_resource['type_name_V2'] = 'Please type your name';
$lang_resource['review_thanks_V2'] = 'Thank you very much for rating this business, this will help other people.';
$lang_resource['order_remove_V2'] = 'Click on Order now and remove from there.';
$lang_resource['zone_V2'] = 'Zone';
$lang_resource['delete_V2'] = 'Delete';
$lang_resource['clear_zones_V2'] = 'Clear zones';
$lang_resource['Filter_V2'] = 'Filter';
$lang_resource['categories_V2'] = 'Categories';
$lang_resource['create_category_V2'] = 'Create category';
$lang_resource['edit_category_V2'] = 'Edit category';
$lang_resource['delete_category_V2'] = 'Delete category';
$lang_resource['countries_V2'] = 'Countries';
$lang_resource['create_country_V2'] = 'Create Country';
$lang_resource['edit_country_V2'] = 'Edit Country';
$lang_resource['delete_country_V2'] = 'Delete Country';
$lang_resource['neighborhood_V2'] = 'Area / Neighborhood';
$lang_resource['neighborhood_V2_CHECK'] = 'Neighborhood  name already present, please enter another name';
$lang_resource['create_neighborhood_V2'] = 'Create Neighborhood';
$lang_resource['edit_neighborhood_V2'] = 'Edit Neighborhood';
$lang_resource['delete_neighborhood_V2'] = 'Delete Neighborhood';
$lang_resource['my_profile_V2'] = 'My Profile';
$lang_resource['advertisement_V2'] = 'Advertisement';
$lang_resource['save_V2'] = 'Save';
$lang_resource['cancel_V2'] = 'Cancel';
$lang_resource['pending_V2'] = 'Waiting for response';
$lang_resource['cancelled_V2'] = 'Cancelled';
$lang_resource['completed_V2'] = 'Completed';
$lang_resource['Now_V2'] = 'Now';
$lang_resource['in_V2'] = 'in';
$lang_resource['Name_V2'] = 'Name';
$lang_resource['LastName_V2'] = 'Last Name';
$lang_resource['Order_V2'] = 'Order';
$lang_resource['Description_V2'] = 'Description';
$lang_resource['User_details_V2'] = 'Client details';
$lang_resource['Home_address_V2'] = 'Address';
$lang_resource['Neighbourhood_V2'] = 'Area / Neighborhood';
$lang_resource['Phone_V2'] = 'Phone';
$lang_resource['City_V2'] = 'City';
$lang_resource['Country_V2'] = 'Country';
$lang_resource['Referenece_V2'] = 'Reference';
$lang_resource['PAID_with_Paypal_V2'] = 'Paid with Paypal';
$lang_resource['Items_V2'] = 'Products';
$lang_resource['Item_V2'] = 'Product';
$lang_resource['Ingredients_V2'] = 'Ingredients';
$lang_resource['Comments_V2'] = 'Comments ex. for whom?';
$lang_resource['Product_Options_V2'] = 'Product Options';
$lang_resource['Extra_V2'] = 'Extra';
$lang_resource['Rate1_V2'] = 'Price';
$lang_resource['time_seconds_V2'] = 'Time (in seconds)';
$lang_resource['Every_Day_V2'] = 'Every day';
$lang_resource['Order_number_V2'] = 'Your order number is:';
$lang_resource['Thank_you_for_ordering_V2'] = 'Thank you very much for ordering on '.$records['sitename'];
$lang_resource['ADVERTISEMENT_V2'] = 'ADVERTISEMENT';
$lang_resource['COUNTRIES_V2'] = 'COUNTRIES';
$lang_resource['USERS_V2'] = 'USERS';
$lang_resource['ORDER_V2'] = 'ORDER';
$lang_resource['FREE_DELIVERY_V2'] = 'Free Delivery';
$lang_resource['Refine_Search_V2'] = 'Refine Search';
$lang_resource['Notes_V2'] = 'Notes';
$lang_resource['Tip_Message'] = 'Do you want to add a Tip?';
//EXPORT''''
$lang_resource['EXPORT_ORDER_NUMBER'] = 'Order number';
$lang_resource['EXPORT_NAME'] = 'Name';
$lang_resource['EXPORT_EMAIL'] = 'Email';
$lang_resource['EXPORT_DATE'] = 'Date';
$lang_resource['EXPORT_TELEPHONE'] = 'Telephone';
$lang_resource['EXPORT_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['EXPORT_ITEM'] = 'Item';
$lang_resource['EXPORT_ORDER_TOTAL'] = 'Order Total';
$lang_resource['EXPORT_CASH'] = 'Cash';
$lang_resource['EXPORT_CARD'] = 'Card';
$lang_resource['EXPORT_FREE_DELIVERY'] = 'Free Delivery';
$lang_resource['EXPORT_DELIVERY_COST'] = 'Delivery Cost';
$lang_resource['EXPORT_SUMMARY'] = 'Summary';
$lang_resource['EXPORT_BUSINESS_NAME'] = 'Business Name';
$lang_resource['EXPORT_TOTAL'] = 'Total';
$lang_resource['EXPORT_ADRESS'] = 'Address';
$lang_resource['EXPORT_CITY'] = 'City';
$lang_resource['EXPORT_LAST_NAME'] = 'Last Name';
$lang_resource['EXPORT_LAST_NAME_2'] = 'Last Name 2';
// mercadopago''''
$lang_resource['MERCO_ENABLE_CHECKBOX'] = 'Mercadopago Enable';
$lang_resource['MERCO_CLIENT_KEY'] = 'Mercadopago Client Id';
$lang_resource['MERCO_SECRET_KEY'] = 'Mercadopago Secret Key';
// extra''''
$lang_resource['ORDER_THANKS'] = 'Thanks for your order';
$lang_resource['ORDER_THANKS_PLCED'] = 'Your order has been placed successfully.';
$lang_resource['ORDER_PROCESSED'] = 'Your order number is:';
$lang_resource['ORDER_IMPORTANT'] = 'Important';
$lang_resource['ORDER_CHANGES'] = 'For changes or cancellation of the order please contact the restaurant or business by phone, we just sent it to your E-Mail. Share your order on Facebook or Twitter!';
$lang_resource['ORDER_SHARE'] = 'Share';
$lang_resource['ORDER_COMMENTS'] = 'Comments ex. for whom?';
$lang_resource['SEARCH_NO_RESTAURANTS'] = 'No restaurants found, please try again later or modify your search';
$lang_resource['BUSINESS_CLOSED'] = 'closed';
$lang_resource['FRONT_CASH'] = 'Cash';
$lang_resource['PASSWORD_SENT'] = 'The password has been sent to your email';
$lang_resource['EMAIL_INCORRECT'] = 'Incorrect email, please try again';
$lang_resource['MAP_NEXT'] = 'NEXT';
$lang_resource['NO_SERVICE'] = 'No service at this moment';
$lang_resource['ONE_RESTAURANT'] = 'You can only order from one restaurant at a time.';
$lang_resource['CARD_DELIVERY'] = 'Card on delivery';
$lang_resource['CASH_DELIVERY'] = 'Cash on delivery';
$lang_resource['AND_CARD'] = 'And Card';
$lang_resource['NO_SERVICE'] = 'No service at this moment';
//EXPORT''''
$lang_resource['EXPORT_ORDER_NUMBER'] = 'Order number';
$lang_resource['EXPORT_NAME'] = 'Name';
$lang_resource['EXPORT_EMAIL'] = 'Email';
$lang_resource['EXPORT_DATE'] = 'Date';
$lang_resource['EXPORT_TELEPHONE'] = 'Telephone';
$lang_resource['EXPORT_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['EXPORT_ITEM'] = 'Item';
$lang_resource['EXPORT_ORDER_TOTAL'] = 'Order Total';
$lang_resource['EXPORT_CASH'] = 'Cash';
$lang_resource['EXPORT_CARD'] = 'Card';
$lang_resource['EXPORT_FREE_DELIVERY'] = 'Free Delivery';
$lang_resource['EXPORT_DELIVERY_COST'] = 'Delivery Cost';
$lang_resource['EXPORT_SUMMARY'] = 'Summary';
$lang_resource['EXPORT_BUSINESS_NAME'] = 'Business Name';
$lang_resource['EXPORT_TOTAL'] = 'Total';
$lang_resource['EXPORT_ADRESS'] = 'Address';
$lang_resource['EXPORT_CITY'] = 'City';
$lang_resource['EXPORT_LAST_NAME'] = 'Last Name';
$lang_resource['EXPORT_LAST_NAME_2'] = 'Last Name 2';
//INDEX''''
$lang_resource['INDEX_MOBILE'] = 'Mobile';
$lang_resource['INDEX_NEED_HELP'] = 'Need Help?';
$lang_resource['INDEX_TRACK_ORDER_1'] = 'TRACK ORDER';
$lang_resource['INDEX_LOGIN'] = 'LOGIN';
$lang_resource['INDEX_TRACK_ORDER'] = 'Track Order';
$lang_resource['INDEX_SHOW_ORDER'] = 'Show Order';
$lang_resource['INDEX_ENTER_YOUR_ORDER_ID'] = 'Enter your Order ID';
$lang_resource['INDEX_YOUR_ORDER_STATUS'] = 'Your Order Status';
//FRONT BLUK''''
$lang_resource['INDEX_MOBILE'] = 'Mobile';
$lang_resource['INDEX_MOBILE'] = 'Mobile';
$lang_resource['INDEX_MOBILE'] = 'Mobile';
//TEMPLATE''''
$lang_resource['TEMPLATE_REVIEWS_AND_COMMENTS'] = 'Reviews and Comments';
$lang_resource['TEMPLATE_PAYMENTS'] = 'Payments';
$lang_resource['TEMPLATE_SEE_MENU_AND_ORDER'] = 'See Menu and Order';
$lang_resource['TEMPLATE_FIND_OTHER_RESTAURANTS'] = 'Find Other Restaurants';
$lang_resource['TEMPLATE_QUALITY_OF_FOOD'] = 'Quality of Food';
$lang_resource['TEMPLATE_PUNCTUALITY'] = 'Punctuality';
$lang_resource['TEMPLATE_SERVICE'] = 'Service';
$lang_resource['TEMPLATE_FOOD_PACKAGING'] = 'Food Packaging';
$lang_resource['TEMPLATE_RATE_NOW'] = 'Rate Now';
//FOOTER''''
$lang_resource['FOOTER_ABOUT_US'] = 'About Us';
$lang_resource['FOOTER_CONTACT_US'] = 'Contact Us';
$lang_resource['FOOTER_BLOG'] = 'Blog';
$lang_resource['FOOTER_SITE_MAP'] = 'Site Map';
$lang_resource['FOOTER_BUSINESS_OWNERS'] = 'Business Owners';
$lang_resource['FOOTER_HOW_IT_WORKS'] = 'How it Works?';
$lang_resource['FOOTER_USER_BENEFITS'] = 'User Benefits';
$lang_resource['FOOTER_BUSINESS_BENEFITS'] = 'Business Benefits';
$lang_resource['FOOTER_ADD_BUSINESS'] = 'Add Business';
$lang_resource['FOOTER_SUPPORT_INFORMATION'] = 'Support & Information';
$lang_resource['FOOTER_FAQ'] = 'FAQ';
$lang_resource['FOOTER_PRIVACY_POLICY'] = 'Privacy Policy';
$lang_resource['FOOTER_TERMS_CONDITIONS'] = 'Terms and Conditions';
$lang_resource['FOOTER_WE_ACCEPT'] = 'We Accept';
//AUTHENTICATE''''
$lang_resource['AUTHENTICATE_ERROR_PLEASE_TRY_AGAIN'] = 'Error, please try again';
$lang_resource['AUTHENTICATE_INCORRECT_DATA_PLEASE_TRY_AGAIN'] = 'Incorrect data, please try again';
//USERS''''
$lang_resource['USERS_EMAIL_ADDRESS_ALREADY_REGISTERED'] = 'Email address already registered';
$lang_resource['USERS_VALID_EMAIL_PLEASE'] = 'Valid email please';
//ADD RATING''''
$lang_resource['ADDRATING_EXPIRED_LINK'] = 'Expired link';
//PAYPAL IPN''''
$lang_resource['PAYPAL_ORDER_NUMBER'] = 'Order number';
$lang_resource['PAYPAL_NAME'] = 'Name';
$lang_resource['PAYPAL_EMAIL'] = 'Email';
$lang_resource['PAYPAL_ADDRESS'] = 'Address';
$lang_resource['PAYPAL_ADDRESS_2'] = 'Address 2';
$lang_resource['PAYPAL_TELEPHONE'] = 'Telephone';
$lang_resource['PAYPAL_CITY'] = 'City';
$lang_resource['PAYPAL_REFERENCE'] = 'Reference';
$lang_resource['PAYPAL_REFERENCE'] = 'Item';
$lang_resource['PAYPAL_EXTRAS'] = 'Extras';
$lang_resource['PAYPAL_COMMENTS'] = 'Comments';
$lang_resource['PAYPAL_PRICE'] = 'Price';
$lang_resource['PAYPAL_INGREDIENTS'] = 'Ingredients';
$lang_resource['PAYPAL_FREE_DELIVERY'] = 'Free delivery';
$lang_resource['PAYPAL_DELIVERY_COST'] = 'Delivery cost';
$lang_resource['PAYPAL_YOUR_ORDER_NUMBER_IS'] = 'Your Order Number is';
$lang_resource['PAYPAL_TANKYOU_ORDERING_SYSTEM'] = 'Thank you for '.$records['sitename'];
//REVIEW''''
$lang_resource['REVIEWS_THANKYOU_MESSAGE'] = 'Thank you very much for your review, this will help other user in the future!';
//BUSINESS''''
$lang_resource['BUSINESS_ORDER'] = 'The order does not exist !';
//FRONR MAIN MOBILE''''
$lang_resource['FRONTMOBILE_SUPER_ADMIN'] = 'Super admin';
$lang_resource['FRONTMOBILE_ADMINISTRATOR'] = 'Administrator';
$lang_resource['FRONTMOBILE_BUSINESS'] = 'Business';
$lang_resource['FRONTMOBILE_CLIENT'] = 'Client';
$lang_resource['FRONTMOBILE_PASSWORD_REQUESTED'] = 'Password requested. Your password is';
$lang_resource['FRONTMOBILE_PASSWORD_REQUESTED1'] = 'Password request';
$lang_resource['FRONTMOBILE_REQUEST_PASSWORD'] = 'Request password';
$lang_resource['CONTROL_PANEL_BUSINESS_DUPBLICATE_SLUG'] = 'Sorry! dublicate slug can not insert';
//ORDER''''
$lang_resource['ORDER_PENDING'] = 'Pending';
$lang_resource['ORDER_COMPLETED'] = 'Completed';
$lang_resource['ORDER_CANCELLED'] = 'Cancelled';
$lang_resource['ORDER_PROGRESS_TAB1'] = 'Progress1';
$lang_resource['ORDER_PROGRESS_ORDER_WAY'] = 'Order on it’s way';
$lang_resource['ORDER_PROGRESS_CAN_BY_RES'] = 'Cancelled by restaurant';
$lang_resource['ORDER_PROGRESS_CAN_BY_DRI'] = 'Cancelled by driver';
$lang_resource['ORDER_PROGRESS_ACCEPT_BY_RES'] = 'Restaurant has Accepted';
$lang_resource['ORDER_CANCELLED'] = 'Cancelled1';
$lang_resource['ORDER_STATUS_DELIVERY_15_MINS'] = 'Accepted and will deliver in 15 min';
$lang_resource['ORDER_STATUS_DELIVERY_30_MINS'] = 'Accepted and will deliver in 30 min';
$lang_resource['ORDER_STATUS_DELIVERY_45_MINS'] = 'Accepted and will deliver in 45 min';
$lang_resource['ORDER_STATUS_DELIVERY_60_MINS'] = 'Accepted and will deliver in 60 min';

$lang_resource['ORDER_STATUS_ESTIMATE_15_MINS'] = 'Estimate delivery time is 15 min';
$lang_resource['ORDER_STATUS_ESTIMATE_30_MINS'] = 'Estimate delivery time is 30 min';
$lang_resource['ORDER_STATUS_ESTIMATE_45_MINS'] = 'Estimate delivery time is 45 min';
$lang_resource['ORDER_STATUS_ESTIMATE_60_MINS'] = 'Estimate delivery time is 60 min';

$lang_resource['ORDER_CANCELLED_TAB'] = 'Cancel Order';
$lang_resource['ORDER_DELIVERED_TAB'] = 'Order Delivered';
$lang_resource['ORDER_DELIVERED'] = 'Delivered';


$lang_resource['ORDER_THERE'] = 'there';
$lang_resource['ORDER_YOUR_ORDER_STATUS_CHANGED'] = 'Your order status has been changed to';
$lang_resource['ORDER_DID_YOU_ENJOY_YOUR_ORDER'] = 'Did you enjoy your order?';
$lang_resource['ORDER_PLEASE_HELP_REVIEWING_THE_RESTAURANT'] = 'Please help other users by reviewing the restaurant that you just ordered from.';
$lang_resource['ORDER_COPY_RIGHT'] = $records['sitename'].' All Rights Reserved.';
$lang_resource['ORDER_DONT_WANT_TO_RECEIVE_THIS_EMAIL'] = 'Dont want to receive this anymore?';
$lang_resource['ORDER_UNSUBCRIBE'] = 'Unsubscribe';
//DISCOUNT''''
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT'] = 'DISCOUNT CODES';
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_LIST'] = 'discount code list';
$lang_resource['CONTROL_PANEL_DISCOUNT_MAINTEXT'] = 'Discount codes';
$lang_resource['CONTROL_PANEL_DISCOUNT_EXPIRY'] = 'Expiry Date';
$lang_resource['CONTROL_PANEL_DISCOUNT_VALID_UPTO'] = 'Valid Upto (In Days)';
$lang_resource['CONTROL_PANEL_DISCOUNT_MAXLIMIT'] = 'Maximum limit';
$lang_resource['CONTROL_PANEL_DISCOUNT_RESTURANT'] = 'Business';
$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE'] = 'Discount percentage';
$lang_resource['CONTROL_PANEL_DISCOUNT_BUSINESS_FOR_ALL'] = 'Discount for all';
$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE'] = 'Discount price';
$lang_resource['SHOPPING_DISCOUNT_CUPON'] = 'Discount coupon';
$lang_resource['SHOPPING_DISCOUNT_CUPON_ALERT'] = 'Please enter correct discount code';
$lang_resource['SHOPPING_DISCOUNT_CUPON_SORRY_MULTI'] = 'Sorry! You can use only one coupon.';
$lang_resource['SHOPPING_WRONG_COUPON'] = 'Sorry! You have enter wrong coupon code.';
$lang_resource['SHOPPING_DISCOUNT_TEXT'] = 'DISCOUNT ';
$lang_resource['CONTROL_PANEL_DISCOUNT_TYPE'] = 'Discount Type';
// SECTION DISCOUNT''''
$lang_resource['CONTROL_PANEL_DISCOUNT_ADD'] = 'Create Discount Code';
$lang_resource['CONTROL_PANEL_DISCOUNT_EDIT'] = 'Edit Discount Code';
$lang_resource['CONTROL_PANEL_DISCOUNT_DELETE'] = 'Delete Discount Code';
$lang_resource['CONTROL_PANEL_DISCOUNT_TITLE'] = 'List of General Discount Code';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN1'] = 'Discount Code';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN2'] = 'ExpiryDate';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN3'] = 'Hits';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN4'] = 'Limit';
$lang_resource['CONTROL_PANEL_DISCOUNT_COLUMN5'] = 'Enable';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN1'] = 'Name of discount';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN2'] = 'Bussiness Name';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN3'] = 'Start Date';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN4'] = 'End Date';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_COLUMN5'] = 'Accept';
$lang_resource['CONTROL_PANEL_DISCOUNT_ADD_OFFER'] = 'Create Specific discount';
$lang_resource['CONTROL_PANEL_DISCOUNT_EDIT_OFFER'] = 'Edit Specific discount';
$lang_resource['CONTROL_PANEL_DISCOUNT_DELETE_OFFER'] = 'Delete Specific discount';
$lang_resource['CONTROL_PANEL_DISCOUNT_OFFER_TITLE'] = 'List of Specific discount';
//discount offer''''
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_OFFER'] = 'AUTOMATIC DISCOUNT';
$lang_resource['CONTROL_PANEL_BUTTON_DISCOUNT_LIST_OFFER'] = 'Automatic&nbsp;discount&nbsp;list';
$lang_resource['CONTROL_PANEL_DISCOUNT_ALERT_MSG_OFFER'] = 'Please atleast any one business select';
$lang_resource['CONTROL_PANEL_DISCOUNT_CONFIRM_MSG_OFFER'] = 'Do you want to add this offer for all business';
$lang_resource['CONTROL_PANEL_DISCOUNT_DISCOUNT_TEXT'] = 'Discount text';
$lang_resource['CONTROL_PANEL_DISCOUNT_DISCOUNT_TYPE'] = 'Discount type';
$lang_resource['CONTROL_PANEL_DISCOUNT_PERCENTAGE'] = 'Percentage';
$lang_resource['CONTROL_PANEL_DISCOUNT_PRICE'] = 'Price';
$lang_resource['CONTROL_PANEL_DISCOUNT_MIN_PURCHASE'] = 'Minimum Purchase';
$lang_resource['CONTROL_PANEL_DISCOUNT_FOR_ALL'] = 'For all';
//FRONT-BULK''''
$lang_resource['FRONT_BULK_UNTIL'] = 'until ';
//Template''''
$lang_resource['TEMPLATE_REVIEWS'] = 'Reviews and Comments';
$lang_resource['TEMPLATE_PAYMENTS'] = 'Payments:';
$lang_resource['TEMPLATE_SEE_MENU'] = 'See Menu and Order';
$lang_resource['TEMPLATE_FIND_OTHER']='Find Other Restaurants';
$lang_resource['TEMPLATE_QUALITY']='Quality of Food:';
$lang_resource['TEMPLATE_PUNCTUALITY']='Punctuality:';
$lang_resource['TEMPLATE_SERVICE']='Service:';
$lang_resource['TEMPLATE_FOOD_PACKAGING']='Food Packaging:';
$lang_resource['TEMPLATE_RATE_NOW']='Rate Now';
$lang_resource['TEMPLATE_COMMENTS']='Comments:';
//Authenticate''''
$lang_resource['AUTHENTICATE_PLEASE_TRY_AGAIN']='Error, please try again';
$lang_resource['AUTHENTICATE_INCORRECT_DATA']='Incorrect data, please try again';
//Confirmation''''
$lang_resource['CONFIRMATION_COMMENTS']='GTHANK YOU FOR YOUR ORDER';
$lang_resource['CONFIRMATION_YOUR_ORDER_HAS']='Your order has been placed, number:';
$lang_resource['CONFIRMATION_COME_BACK_SOON']='Please come back soon!';
$lang_resource['CONFIRMATION_SIGN_OUT']='Sign out';
$lang_resource['CONFIRMATION_CHECK_ORDER_STATUS']='Check order status';
$lang_resource['CONFIRMATION_WHERE_ARE_YOU']='Where are you?';
$lang_resource['CONFIRMATION_LET_US_FIND_YOU']='Let us find you!';
$lang_resource['CONFIRMATION_BACK']='BACK';
//addrating''''
$lang_resource['ADDRATING_EXIRED_LINK']='Expired link';
//business''''
$lang_resource['BUISNESS_ORDER_DOES_NOT_EXSIST']='The order does not exist !';
//review''''
$lang_resource['REVIEW_THANK_YOU_VERY']='Thank you very much for your review, this will help other user in the future!';
//FRONT_MAIN''''

$lang_resource['FRONT_MAIN_HOME_DELIVERY_COST']='Delivery with cost';
$lang_resource['FRONT_MAIN_HOME_DELIVERY']='Delivery without cost';
$lang_resource['FRONT_MAIN_HOME_DELIVERY_TEXT']='Delivery';
$lang_resource['FRONT_MAIN_HOME_PICKUP']='Pickup without cost';
$lang_resource['FRONT_MAIN_HOME_RESERVE']='Reservation without cost';
$lang_resource['FRONT_MAIN_HOME_ORDER_RESERVE']='Order & Reservation without cost';

$lang_resource['FRONT_MAIN_HOME_DELIVERY_WITH_COST']='Delivery cost';
$lang_resource['FRONT_MAIN_PAYMENT_METHOD']='Payment Method:';
$lang_resource['FRONT_MAIN_ANY_CHANGES_WITH']='Any changes with the Order?';
$lang_resource['FRONT_MAIN_CONTACT_RESTAURENT']='Contact Restaurant';
$lang_resource['FRONT_MAIN_CONTACT_US']='Contact Us';
$lang_resource['FRONT_MAIN_BLOG']='Blog';
$lang_resource['FRONT_MAIN_COPYRIGHT']='Copyright &copy; '.$records['sitename'].' All Rights Reserved.';
//orders''''
$lang_resource['ORDERS_YOUR_ORDER_CHANGED']='Your order status has been changed to';
$lang_resource['ORDERS_DID_YOU_ENJOY']='Did you enjoy your order?';
$lang_resource['ORDERS_PLEASE_HELP']='Please help other users by reviewing the restaurant that you just ordered from.';
$lang_resource['ORDERS_FOLLOW_US_ON']='Follow Us On:';
$lang_resource['ORDERS_ABOUT_US']='About Us';
$lang_resource['ORDERS_CONTACT_US']='Contact Us';
$lang_resource['ORDERS_BLOG']='Blog';
$lang_resource['ORDERS_DONT_WANT_TO']='Dont want to receive this anymore? -';
$lang_resource['ORDERS_UNSUBSCRIPT']='Unsubscribe';
$lang_resource['ORDERS_PANDING']='Pending';
$lang_resource['ORDERS_COMPLETED']='Completed';
$lang_resource['ORDERS_CANCLLED']='Cancelled';
// row''''
$lang_resource['SHOPPING_CLOSE_ORDER_ALERTTEXT']='This is restaurant is closed at the moment, please choose another restaurant';
// delivery area''''
$lang_resource['CONTROL_PANEL_BUTTON_DELIVERY_AREA'] = 'DELIVERY ZONE';
$lang_resource['CONTROL_PANEL_BUTTON_DELIVERY_AREA_SMALL'] = 'delivery list';
$lang_resource['CONTROL_DELIVERY_ADD'] = 'Add delivery zone';
$lang_resource['CONTROL_PANEL_DELIVERY_EDIT'] = 'Edit delivery zone';
$lang_resource['CONTROL_PANEL_DELIVERY_DELETE'] = 'Delete delivery zone';
$lang_resource['CONTROL_PANEL_DELIVERY_TITLE'] = 'List of delivery zone';
$lang_resource['CONTROL_PANEL_DELIVERY_COLUMN1'] = 'Zone name';
$lang_resource['CONTROL_PANEL_DELIVERY_COLUMN2'] = 'Price';
$lang_resource['CONTROL_PANEL_DELIVERY_COLUMN5'] = 'Enabled';
//csv''''
$lang_resource['CONTROL_PANEL_BUSINESS_DISHES_BUTTON_CSVFILE'] = 'CSV upload';
$lang_resource['PANEL_CSV_PERMISSION_BLANK'] = 'Please upload CSV file';
$lang_resource['PANEL_CSV_PERMISSION_EXT'] = 'Please upload only CSV file';
$lang_resource['PANEL_CSV_ZIP_CODE_TEXT'] = 'UPLOAD FILE ' ;
$lang_resource['PANEL_CSV_ZIP_BUSINESS_ID_TEXT'] = 'Please add business then you can upload product by CSV' ;
//index page''''
$lang_resource['MAIN_WRONG_URL'] = 'Sorry! you have entered wrong url.';
$lang_resource['MAIN_SHOPPING_MENU_NO_SERVICE_AVAILABLE'] = 'Sorry at present No Service available.';
$lang_resource['MAIN_SHOPPING_MENU_CATALOG_NO_AVAILABLE'] = 'Sorry! No menu available in this Restaurant at this moment.';
$lang_resource['MAIN_SHOPPING_MENU_CATALOG_POPUP'] = ' Menu Open time.';
// Zip code search of business''''
$lang_resource['CONTROLL_PANEL_INVOICETDTL']='invoice details';
$lang_resource['CONTROLL_PANEL_INVOICETEXT']='invoice';
$lang_resource['CONTROLL_PANEL_ZIPTEXT']='ZIP CODE ADD';
$lang_resource['CONTROLL_PANEL_ZIPBUSINESS']='business wise';
$lang_resource['CONTROL_PANEL_ZIPCODE_ADD']='Zipcode Add';
$lang_resource['CONTROL_PANEL_ZIPCODE_TITLE']='SEARCH ZIPCODE OF EVERY BUSSINESS';
$lang_resource['CONTROL_PANEL_ZIPCODELIST_TITLE']='SEARCH ZIPCODE LIST OF';
$lang_resource['CONTROL_PANEL_ZIPCODELIST_ENABLE']='enable';
$lang_resource['CONTROL_PANEL_ZIPCODE_ZIP']='Zipcode';
$lang_resource['CONTROL_PANEL_ZIPCODE_PRICE']='Delivery price';
$lang_resource['CONTROL_PANEL_ZIPCODE_BISINESS']='Business Name ';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_ADD']='Add Zipcode ';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_EDIT']='Edit Zipcode ';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_DELETE']='Delete Zipcode ';
$lang_resource['CONTROL_PANEL_ZIP_BUTTON_UPLOAD']='Upload CSV ';
$lang_resource['PANEL_CSV_PERMISSION_BLANK']='Please upload only CSV file ';
$lang_resource['PANEL_CSV_PERMISSION_EXT']='Please upload only CSV file ';
$lang_resource['PANEL_CSV_BUTTON_LEVEL']='Upload CSV ';
$lang_resource['PANEL_CSV_ZIP_CODE_TEXT']='Zipcode Upload: ';
$lang_resource['PANEL_CREATE_ZIPCODE']='CREATE ZIPCODE ';
$lang_resource['PANEL_EDIT_ZIPCODE']='EDIT ZIPCODE ';
$lang_resource['PANEL_FORM_ZIP_DELIVERYTEXT']='Delivery price ';
//new''''
$lang_resource['SHOPPING_CLOSE_ORDER_ALERTTEXT']='This is restaurant is closed at the moment, please choose another restaurant.';
//Delivery KM wise''''
$lang_resource['CONTROLL_PANEL_IDELIVERYTEXT']='Delivery Zone ';
$lang_resource['CONTROLL_PANEL_IDELIVERY_SHORTTEXT']='Km wise ';
$lang_resource['GALLERY_PANEL']='Gallery ';
$lang_resource['GALLERY_PANEL_AREA_SMAL']='Gallery Images ';
// SECTION GALLERY''''
$lang_resource['CONTROL_PANEL_GALLERY_BUTTON_CREATE'] = 'Create gallery';
$lang_resource['CONTROL_PANEL_GALLERY_BUTTON_EDIT'] = 'Edit gallery';
$lang_resource['CONTROL_PANEL_GALLERY_BUTTON_DELETE'] = 'Delete gallery';
$lang_resource['CONTROL_PANEL_GALLERY_TYPE_HEADER'] = 'Type';
$lang_resource['CONTROL_PANEL_GALLERY_BUSINESS'] = 'Business:';
//business''''
$lang_resource['CONTROL_PANEL_BUSINESS_PROMOTIONCODE'] = 'Promotion code:';
$lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_ABOUT'] = 'About Restaurant:';
$lang_resource['CONTROL_PANEL_BUSINESS_PRODUCT_DESCRIPTION'] = 'Property Description:';
$lang_resource['CONTROL_PANEL_BUTTON_FOOTER_PAGES'] = 'FOOTER PAGES';
//FOOTER DYNAMIC LINK''''
$lang_resource['CONTROL_PANEL_FOOTER_HEADER1'] = 'Page name';
$lang_resource['CONTROL_PANEL_FOOTER_HEADER2'] = 'URL';
$lang_resource['CONTROL_PANEL_FOOTER_HEADER3'] = 'Activated';
$lang_resource['CONTROL_PANEL_FOOTER_HEADER4'] = 'Footer column';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_TITLE'] = 'Pages List';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_CREATE'] = 'Create footer page';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_EDIT'] = 'Edit footer page';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_DELETE'] = 'Delete footer page';
$lang_resource['CONTROL_PANEL_FOOTER_PAGES_PANEL'] = 'Footer column';
//image upload''''
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD'] = 'Upload image';
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD_SMALL_TEXT'] = '_';
//other pending july 2014''''
$lang_resource['ELSE_HP'] = 'else';
$lang_resource['PICKUP_DELIVERY'] = 'Please select';
$lang_resource['DELIVERY'] = 'Delivery';
$lang_resource['RESERVATION'] = 'Reservation';
$lang_resource['PICKUP'] = 'Pickup';
$lang_resource['Show_Restaurants'] = 'Show Restaurants';
$lang_resource['ALERT_PICKUP_DELIVERY'] = 'Choose a service Delivery or Pickup';
$lang_resource['SHOWHIDE'] = 'Show / Hide Map';
$lang_resource['OPENEDRESTAURANTS'] = 'Opened Restaurants';
$lang_resource['CLOSEDRESTAURANTS'] = 'Closed Restaurants';
$lang_resource['DISTANCE'] = 'Distance:';
$lang_resource['PREORDER'] = 'Preorder:';
$lang_resource['CHOOSEDELTIMEPREORDER'] = 'Choose delivery time for Preorder';
$lang_resource['PREORDERDATE'] = 'Select Preorder Date';
$lang_resource['PREORDERTIME'] = 'Select Order time';
$lang_resource['Delivery_Option'] = 'Please choose delivery option';
$lang_resource['Total_Orders'] = 'Total Orders';
$lang_resource['Total_Sales'] = 'Total Sales';
$lang_resource['Total_Commissions'] = 'Total Commissions';
$lang_resource['Total_Turnover'] = 'Total Turnover';
$lang_resource['Week'] = 'Week';
$lang_resource['Month'] = 'Month';
$lang_resource['Year'] = 'Year';
$lang_resource['Today'] = 'Today';

$lang_resource['Orders_Today'] = 'Orders Today';
$lang_resource['Sales_Today'] = 'Sales';
$lang_resource['Pending_Orders'] = 'Pending Orders';
$lang_resource['Completed_Orders'] = 'Completed Orders';
$lang_resource['Cancelled_Orders'] = 'Cancelled Orders';
$lang_resource['Last7days'] = 'Last 7 days';
$lang_resource['Last30days'] = 'Last 30 days';
$lang_resource['INFO_V21'] = 'Info';
$lang_resource['OFFERS_V21'] = 'Offers';
$lang_resource['MENU_V21'] = 'Menu';
$lang_resource['REVIEWS_V21'] = 'Reviews';
$lang_resource['CATALOG_V21'] = 'CATALOG';
$lang_resource['PHOTOG_V21'] = 'Photo Gallery';
$lang_resource['ABOUTR_V21'] = 'About Restaurant';
$lang_resource['DELIVERYL_V21'] = 'Delivery location';
$lang_resource['DELIVERYP_V21'] = 'Delivery Price:';
$lang_resource['VIDEOG_V21'] = 'Video Gallery';
$lang_resource['REVIEWSOF_V21'] = 'Reviews';
$lang_resource['REVIEWSOF_V21_OF'] = 'Reviews of';
$lang_resource['BLIST_FEATURED'] = 'Featured';
$lang_resource['OFFERSSOF_V21'] = 'Offers of';
$lang_resource['DATE_V21'] = 'Date';
$lang_resource['NAMECITY_V21'] = 'Name / City';
$lang_resource['RATING_V21'] = 'Rating';
$lang_resource['NOREVIEW_V21'] = 'No review result found';
$lang_resource['NOOFFER_V21'] = 'No Offer avilable at the moment';
$lang_resource['OUTOF_V21'] = 'Out of';
$lang_resource['OFFERN_V21'] = 'Offer Name';
$lang_resource['OFFERP_V21'] = 'Offer Price';
$lang_resource['STARTD_V21'] = 'Start Date';
$lang_resource['ENDD_V21'] = 'End Date';
$lang_resource['GUESTUSER_V21'] = 'Guest user';
$lang_resource['COMMISSION_V21'] = 'Commission';
$lang_resource['COMMISSIONSET_V21'] = 'Commission Set';
$lang_resource['SITESETTINGS_V21'] = 'Site Settings';
$lang_resource['LOGOSETTINGS_V21'] = 'Logo Settings';
$lang_resource['SITENAME_V21'] = 'Site Name';
$lang_resource['SITEURL_V21'] = 'Site Url:';
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
$lang_resource['UPLOADLOGO_V21'] = 'UPLOAD LOGO IMAGE';
$lang_resource['TOPLOGO_V21'] = 'Top logo';
$lang_resource['BOTTOMLOGO_V21'] = 'Bottom logo';
$lang_resource['UPLOADBANNERIMAGE_V21'] = 'UPLOAD BANNER IMAGE';
$lang_resource['BANNER_V21'] = 'Banner';
$lang_resource['SELECT_V21'] = 'Select';
$lang_resource['DELIVERYL_V21'] = 'Delivery location';
$lang_resource['MINP_V21'] = 'Min Purchase';
$lang_resource['ZONEN_V21'] = 'Zone Name';
$lang_resource['DELIVERYA_V21'] = 'Delivery Address';
$lang_resource['CLOSE_V21'] = 'CLOSE';
$lang_resource['BACK_V21'] = 'BACK';
$lang_resource['TRACKNOW_V21'] = 'Track Now';
$lang_resource['NORESTAURANTONCOUNTRY_V21'] = 'No restaurant found in your Country';
$lang_resource['NOVALID_V21'] = 'Pending';
$lang_resource['CARTEMPTY_V21'] = 'Cart Empty';
$lang_resource['CHOOSERESTAURANT_V21'] = 'Choose a Restaurant';
$lang_resource['NORESTAURANTAVAILABLE_V21'] = 'Sorry! No restaurant available in your search location';
$lang_resource['ERROR_V21'] = 'Error';
$lang_resource['URL_CATALOG'] = 'URL REDIRECT (disables ordering)';
// SECTION DRIVER MANAGER''''
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
// SECTION DRIVER Group''''
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
// SECTION DRIVER1''''
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
//new from december 2014''''
$lang_resource['MAIN_HEADER_PART_COUNT_DOWN'] = 'This demo will be reseted in';
$lang_resource['LIVE_COUNTER'] = 'Demo  Reset :';
$lang_resource['LIVE_COUNTER_RENGE'] = 'Demo  Reset  In Minutes:';
// COMMONPART''''
$lang_resource['SITE_URL'] = $records['siteurl'];

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
//footer cms''''
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
//product options''''
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
//Days''''
$lang_resource['DAY1'] = 'Monday';
$lang_resource['DAY2'] = 'Tuesday';
$lang_resource['DAY3'] = 'Wednesday';
$lang_resource['DAY4'] = 'Thursday';
$lang_resource['DAY5'] = 'Friday';
$lang_resource['DAY6'] = 'Saturday';
$lang_resource['DAY7'] = 'Sunday';
//Months''''
$lang_resource['MONTH1'] = 'January';
$lang_resource['MONTH2'] = 'February';
$lang_resource['MONTH3'] = 'March';
$lang_resource['MONTH4'] = 'April';
$lang_resource['MONTH5'] = 'May';
$lang_resource['MONTH6'] = 'June';
$lang_resource['MONTH7'] = 'July';
$lang_resource['MONTH8'] = 'August';
$lang_resource['MONTH9'] = 'September';
$lang_resource['MONTH10'] = 'October';
$lang_resource['MONTH11'] = 'November';
$lang_resource['MONTH12'] = 'December';
//register''''
$lang_resource['REGISTER_CONFIRM_MAIL'] = 'Thank you for Join our team';
$lang_resource['FAVOURITE_RESTAURENT_TEXT'] = 'Favorite restaurants';
$lang_resource['MYACOUNT_ADD_EDIT'] = 'Add/Edit Address';
$lang_resource['SHOPPING_ADD_FAVOURITE'] = 'Add to favorites';
//business''''
$lang_resource['BUSINESS_PAGE_TEXT_MAP'] = 'Map';
//v3''''
$lang_resource['CONTINUE'] = 'Continue';
$lang_resource['MOBILE_BUSINESS_DROP_LIST_PICKUP'] = 'Pickup';
$lang_resource['MOBILE_BUSINESS_DROP_LIST_DELIVERY'] = 'Delivery';
//Multitag languages''''
$lang_resource['MULTITAG_LANGUAGE_RESTAURANTS'] = 'Restaurants';
$lang_resource['MULTITAG_LANGUAGE_CUISINES'] = 'Cuisines';
//Reservation''''
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
//Pickup''''
$lang_resource['SHOPPING_MENU_PICKUP_ALLOW'] = 'Sorry! this menu not allow for pickup';
$lang_resource['SHOPPING_MENU_DELIVERY_ALLOW'] = 'Sorry! this menu not allow for delivery';
$lang_resource['SHOPPING_MENU_PICKUP_DELIVERY_ALLOW'] = 'Sorry! this menu not allow for pickup or delivery';
//front.js''''
$lang_resource['FRONT_RETURNING_CUSTOMER'] = 'Returning Customer';
$lang_resource['FRONT_REMEMBER_ME'] = 'Remember Me';
$lang_resource['FRONT_SIGN_IN_TO_CHECKOUT'] = 'Sign In to Checkout';
$lang_resource['FRONT_NEW_CUSTOMER'] = 'New Customer';
$lang_resource['FRONT_SAVE_TIME_NOW'] = 'Save time Now';
$lang_resource['FRONT_YOU_DONT_HAVE_ACCOUNT'] = 'You don’t need an account to check out.';
$lang_resource['FRONT_CONTINUE_AS_A_GUEST'] = 'Continue as Guest';
$lang_resource['FRONT_CREATE_ACCOUNT'] = 'Create Account';
$lang_resource['FRONT_CREATE_ACCOUNT_FOR_FAST_CHECKOUT'] = 'Create account for fast Checkout and easy access to order history.';
$lang_resource['FRONT_MY_ACCOUNT'] = 'My Account';
$lang_resource['FRONT_MY_SUBMIT'] = 'Submit';
$lang_resource['FRONT_SELECT_PREORDER_DATE'] = 'Please select preorder date';
$lang_resource['FRONT_SELECT_PREORDER_TIME'] = 'Please select preorder time in hour';
$lang_resource['FRONT_PREORDER_TIME_IN_MINUTE'] = 'Please select preorder time in minute';
$lang_resource['FRONT_SELECT_DELIVERY_OPTION'] = 'Please select any one delivery option';
$lang_resource['FRONT_SORRY_DELIVERY_OPTION'] = 'Sorry! not for delivery in this area';
$lang_resource['FRONT_LOGIN_ADD_FAVORITE'] = 'Please login for add to favorite';
$lang_resource['FRONT_NO_RESULT_FOUND'] = 'No results found';
$lang_resource['FRONT_GEOCODER_FAILED'] = 'Geocoder failed due to:';
$lang_resource['FRONT_TRACK_ORDER'] = 'Please Enter Track Order!';
$lang_resource['FRONT_NO_PERMISSION_TO_SHOW_ORDER'] = 'You have no permission to show this order';
$lang_resource['MOBILE_NO_PERMISSION_TO_SHOW_ORDER'] = 'You have no permission to show this order';
$lang_resource['FRONT_DRIVER_COMMENTS'] = 'Driver Comments :';
$lang_resource['FRONT_DRIVER_TIME'] = 'Time :';
$lang_resource['FRONT_RESERVATION_TABLE'] = 'Table';
$lang_resource['FRONT_RESERVATION_ROOM'] = 'Room';
$lang_resource['FRONT_RESERVATION_BOOKING_AVAILABILTY'] = 'Booking Availability';
$lang_resource['FRONT_RESERVATION_FREE'] = 'Free';
$lang_resource['FRONT_No_TIENES_PERMISO'] = 'No tienes permiso para visualizar esta orden';
//shopping.js''''
$lang_resource['SHOPPING_REFINE_YOUR'] = 'Refine your';
$lang_resource['SHOPPING_REFINE_RESULTS'] = 'results';
$lang_resource['SHOPPING_HIDE_MAP'] = 'Hide Map';
$lang_resource['SHOPPING_SELECT_LOCATION'] = 'Select Location';
$lang_resource['SHOPPING_PICKUP_RESTAURANT'] = 'Select Business';
$lang_resource['SHOPPING_PLACE_ORDER'] = 'Place Order';
$lang_resource['SHOPPING_MAKE_PAYMENT'] = 'Make Payment';
$lang_resource['SHOPPING_GET_DELIVERED'] = 'Get Delivered';
$lang_resource['SHOPPING_PLACEHOLDER_RESTAURANT_FOOD_CATEGORY'] = 'Filter: Restaurants, Food Category';
$lang_resource['SHOPPING_REFINE'] = 'Refine';
$lang_resource['SHOPPING_LOCATION'] = 'Location';
$lang_resource['SHOPPING_RESTAURANT'] = 'Restaurant';
$lang_resource['SHOPPING_LOGIN_FIRST'] = 'Please Login first';
$lang_resource['SHOPPING_RESERVATION_OPTIONS'] = 'Reservation Options:';
$lang_resource['SHOPPING_YOU_HAVE'] = 'You have';
$lang_resource['SHOPPING_ITEMS'] = 'items';
$lang_resource['SHOPPING_DELIVERY_TIME_IN_HOUR'] = 'Please select delivery time in hour';
$lang_resource['SHOPPING_DELIVERY_TIME_IN_MINUTE'] = 'Please select delivery time in minute';
$lang_resource['SHOPPING_CONFIGURE_YOUR_SMS_PLUG'] = 'Please configure your SMS plug in.';
$lang_resource['SHOPPING_PROGRESS_ORDER_AND_RESERVE'] = 'Do you want know the progress of your order & reserve?';
$lang_resource['SHOPPING_NEED_CHANGE_ORDER_RESERVE'] = 'Need change on your order & reserve?';
$lang_resource['SHOPPING_KNOW_THE_PROGRESS_ORDER'] = 'Do you want know the progress of your order?';
$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_ORDER'] = 'Need change on your order?';
$lang_resource['SHOPPING_PROGRESS_OF_YOUR_RESERVE'] = 'Do you want know the progress of your Reserve?';
$lang_resource['SHOPPING_NEED_CHANGE_ON_YOUR_RESERVE'] = 'Need change on your Reserve?';
$lang_resource['SHOPPING_TRACK_NOW'] = 'TRACK NOW';
$lang_resource['SHOPPING_TRACK_NOW'] = 'Please select Reserve Date Time Guest Field';

$lang_resource['MYACCOUNT_MYPROFILE'] = 'My Profile';



//18/11/2014/index.php''''
$lang_resource['INDEX_SUBSCRIBE_TO_NEWSLETTER'] = 'Subscribe to newsletter';
$lang_resource['INDEX_SUBSCRIBE'] = 'Subscribe';
//front-visuals.js''''
$lang_resource['FRONT_VISUALS_DELIVERS_YOUR_NEIGHBORHOOD'] = 'See who delivers in your neighborhood';
$lang_resource['FRONT_VISUALS_MOST_POPULAR'] = 'Most Popular';
$lang_resource['FRONT_VISUALS_HOW_IT_WORKS'] = 'how it works';
$lang_resource['FRONT_VISUALS_MOST_POPULAR_CUISINE'] = 'Most Popular Cuisine';
$lang_resource['FRONT_VISUALS_FOOD_OF_THE_WEEK'] = 'Food of the week';
$lang_resource['FRONT_VISUALS_RECENTS_ORDERS'] = 'Recents Orders';
$lang_resource['FRONT_VISUALS_CAPTURE_SHARE_WORLD_MOMENTS'] = 'Amazing apps';
$lang_resource['FRONT_VISUALS_INSTAGRAM'] = $records['sitename'].' is a fast, beautiful and fun way to order your favorite food online. <br /><br />Oh yeah, did we mention it’s free?';
$lang_resource['FRONT_VISUALS_HELP'] = 'Help';
$lang_resource['FRONT_VISUALS_MOBILE_PHONE'] = 'Mobile Phone *';
$lang_resource['FRONT_VISUALS_MOBILE_APT'] = 'APT/Suit *';
$lang_resource['FRONT_VISUALS_LAND_PHONE'] = 'Land Phone';
$lang_resource['FRONT_VISUALS_POST_CODE'] = 'Post Code *';
$lang_resource['FRONT_VISUALS_CITY_WITH_ZIPCODE'] = 'City (Please Type Your Zipcode) *';

$lang_resource['FRONT_VISUALS_STREET'] = 'Street *';
$lang_resource['FRONT_VISUALS_PASSWORD_M'] = 'Password *';
$lang_resource['FRONT_VISUALS_PASSWORD'] = 'Password';
$lang_resource['FRONT_VISUALS_NAME'] = 'Name';
$lang_resource['FRONT_VISUALS_MIDDLE_NAME'] = 'Middle name';
$lang_resource['FRONT_VISUALS_LAST_NAME'] = 'Last name';
$lang_resource['FRONT_VISUALS_EMAIL'] = 'Email';
$lang_resource['FRONT_VISUALS_COLONY'] = 'Colony';
$lang_resource['FRONT_VISUALS_LETS_GO'] = 'Let’s Go!';
$lang_resource['FRONT_VISUALS_RESTAURANT'] = 'Resturant';
$lang_resource['FRONT_VISUALS_APPLY'] = 'Apply';
$lang_resource['FRONT_VISUALS_RESTAURANTS'] = 'Resturants';
$lang_resource['FRONT_VISUALS_SELECT_TYPE'] = 'Select Type';
$lang_resource['FRONT_VISUALS_RESTAURANTS_CUISINES'] = 'Filter: Restaurants, Cuisines';
$lang_resource['FRONT_VISUALS_MMDDYY'] = 'mm-dd-yyyy';
$lang_resource['FRONT_VISUALS_SKIP'] = 'Skip';
$lang_resource['RESERVATION_SEARCH'] = 'Researvation Search';
$lang_resource['FRONT_VISUALS_SAVE_CONTINUE'] = 'Save &amp; Continue';
//front-main.php''''
$lang_resource['FRONT_MAIN_EMAIL_OPTIONS'] = 'Options';
$lang_resource['FRONT_MAIN_EMAIL_HI_THERE'] = 'Hi there,';
$lang_resource['FRONT_MAIN_EMAIL_PASSWORD_REQUESTED'] = 'Password Requested is';
$lang_resource['FRONT_MAIN_EMAIL_YOUR_ORDER_AND_RESERVATION_PLACED_SUCCES'] = 'Your order &amp; Reservation has been placed successfully!';
$lang_resource['FRONT_MAIN_EMAIL_RESERVATION_HASE_BEEN_PLASSED_SUCCESS'] = 'Your Reservation has been placed successfully!';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_PLACED_SUCCESS'] = 'Your order has been placed successfully!';
$lang_resource['FRONT_MAIN_EMAIL_ORDER'] = 'Order';
$lang_resource['FRONT_MAIN_EMAIL_USER_DETAILS'] = 'User Details';
$lang_resource['FRONT_MAIN_EMAIL_PHONE'] = 'phone';
$lang_resource['FRONT_MAIN_EMAIL_HOME_ADDRESS'] = 'Home Address';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_TYPE'] = 'Order Type';
$lang_resource['FRONT_MAIN_EMAIL_PREORDER'] = 'Preorder';
$lang_resource['FRONT_MAIN_EMAIL_PREORDER_DATE_TIME'] = 'Preorder Delivery Date & Time';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CASH'] = 'Upon receiving pay with Cash';
$lang_resource['FRONT_MAIN_EMAIL_AND_CARD'] = ' and Card';
$lang_resource['FRONT_MAIN_EMAIL_ITEMS'] = 'Items';
$lang_resource['FRONT_MAIN_EMAIL_COMMENT'] = 'Comment';
$lang_resource['FRONT_MAIN_EMAIL_RATE'] = 'Rate';
$lang_resource['FRONT_MAIN_EMAIL_TAX_NOT_INCLUDED'] = 'Tax not included in price';
$lang_resource['FRONT_MAIN_EMAIL_TAX_INCLUDED'] = 'Tax included in price';
$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE'] = 'Delivery type';
$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE_DELIVERY'] = 'Delivery';
$lang_resource['FRONT_MAIN_EMAIL_DELIVERY_TYPE_PICKUP'] = 'Pickup';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_NO'] = 'Order No';
$lang_resource['FRONT_MAIN_EMAIL_ORDER_STATUS'] = 'Order Status';
$lang_resource['FRONT_MAIN_EMAIL_DRIVER_MESSAGE'] = 'Driver Message';
$lang_resource['FRONT_MAIN_EMAIL_RESTAURANT_MESSAGE'] = 'Restaurant Message';
$lang_resource['FRONT_MAIN_EMAIL_SIGNUP_CONFIRM_MESSAGE'] = 'Success! Check your email to confirm sign up.';
$lang_resource['FRONT_MAIN_EMAIL_MAIL_ALREADY_REGISTERED'] = 'Your mail is already registered';
//orders.js''''
$lang_resource['V3_ORDER_Preparation'] = 'Preparation';
$lang_resource['V3_ORDER_ORDER_ON_ITS_WAY'] = 'Order on its way';
$lang_resource['V3_ORDER_DELIVERED'] = 'Delivered';
$lang_resource['V3_ORDER_CANCELLED_RESTAURANT'] = 'Cancelled by Retaurant';
$lang_resource['V3_ORDER_CANCELLED_DRIVER'] = 'Cancelled by driver';
$lang_resource['V3_ORDER_RESTAURANT_ACCEPTED'] = 'Restaurant has Accepted';
$lang_resource['V3_ORDER_SELECT_DRIVER'] = 'Select Driver';
$lang_resource['V3_ORDER_PAID_WITH_MERCADOPAGO'] = 'PAID with mercadopago';
$lang_resource['V3_ORDER_PAID_PAYPAL_ADAPTIVE'] = 'PAID with PayPal Adaptive';
$lang_resource['V3_ORDER_PAID_AUTHORIZE'] = 'Paid via Authorize.net';
$lang_resource['V3_ORDER_PAID_BRAIN'] = 'Paid via Braintree';
$lang_resource['V3_ORDER_DELIVERY_DATE'] = 'Delivery Date';
$lang_resource['V3_ORDER_DELIVERY_TIME'] = 'Delivery time';
$lang_resource['V3_ORDER_RESERVATION_DETAILS'] = 'Reservation Details';
$lang_resource['V3_ORDER_TIME'] = 'Time';
$lang_resource['V3_TRANSACTION'] = 'Transaction Id';
//productoption.js''''
$lang_resource['PRODUCT_POTIONS_ADD_CART'] = 'Add to Cart';
$lang_resource['PRODUCT_POTIONS_EDIT_YOUR_OPTIONS'] = 'Please Edit your options';
$lang_resource['PRODUCT_POTIONS_ADD_REQUIRED'] = 'Required';
//business-list.js''''
$lang_resource['BUSINESS_LIST_OPTIONS_RESTAURANT'] = 'Opened & Closed Restaurants';
$lang_resource['BUSINESS_LIST_OPTIONS_EXPRESS'] = 'Express 5 KM';
$lang_resource['BUSINESS_LIST_OPTIONS_FAVORITES'] = 'Favorites';
$lang_resource['BUSINESS_LIST_OPTIONS_PAYMENT'] = 'Payment';
$lang_resource['BUSINESS_LIST_OPTIONS_KM'] = 'KM';
$lang_resource['BUSINESS_LIST_OPTIONS_PROMOTION'] = 'Promotion';
$lang_resource['BUSINESS_LIST_OPTIONS_PREORDER'] = 'preorder';
$lang_resource['BUSINESS_LIST_OPTIONS_ORDERANDRESERVE'] = 'ORDER + RESERVE';
$lang_resource['BUSINESS_LIST_OPTIONS_RESERVE_NOW'] = 'RESERVE NOW';
$lang_resource['BUSINESS_LIST_OPTIONS_WE_WILL_OPEN_AT'] = 'We will open at';
//myaccount.js''''
$lang_resource['MYACCOUNT_PLEASE_LOGIN_FIRST'] = 'Please Login First';
$lang_resource['MYACCOUNT_OR'] = 'OR';
$lang_resource['MYACCOUNT_EMAIL_ID'] = 'Email ID';
$lang_resource['MYACCOUNT_MY_ADDRESS'] = 'My Address';
$lang_resource['MYACCOUNT_BILLING_INFO'] = 'Billing Info';
$lang_resource['MYACCOUNT_COMPANY'] = 'Company';
$lang_resource['MYACCOUNT_STATE'] = 'State';
$lang_resource['MYACCOUNT_POSTAL_CODE'] = 'Postal Code';
$lang_resource['MYACCOUNT_SAVE_ADDRESS'] = 'Save Address';
$lang_resource['MYACCOUNT_EDIT'] = 'Edit';
$lang_resource['MYACCOUNT_SELECT_MONTH'] = 'Select Month';
$lang_resource['MYACCOUNT_CARD_NO'] = 'Card No';
$lang_resource['MYACCOUNT_EXPIRY_MONTH'] = 'Expiry Month';
$lang_resource['MYACCOUNT_EXPIRT_YEAR'] = 'Expiry Year';
$lang_resource['MYACCOUNT_CVV_NO'] = 'CVV No';
$lang_resource['MYACCOUNT_FAVORITE_RESTAURANT'] = 'Favourite Resturant';
$lang_resource['MYACCOUNT_REMOVE'] = 'Remove';
$lang_resource['MYACCOUNT_NO_SEARCH_RESULT_FOUND'] = 'No search result found';
$lang_resource['MYACCOUNT_NO_FAVORITE_RESTAURANT_ADDED'] = 'No favorite restaurant added';
$lang_resource['MYACCOUNT_MY_ACCOUNT_SETTINGS'] = 'My Account Settings';
$lang_resource['MYACCOUNT_X'] = 'X';
//front-forms.js''''
$lang_resource['FRONT_FORM_REQUIRED'] = 'Required';
//googlemap.js''''
$lang_resource['FRONT_FORM_YOU_ARE_HERE'] = 'You are here';
$lang_resource['FRONT_FORM_USER'] = 'User';
$lang_resource['FRONT_FORM_'] = 'Required';
$lang_resource['FRONT_FORM_'] = 'Required';
//payment.js''''
$lang_resource['PAYMENT_METHOD'] = 'Payment method';
$lang_resource['PAYMENT_MERCADO_PAGO'] = 'Mercado pago';
$lang_resource['PAYMENT_TRANSACTIUM_PAY'] = 'Transactium';
$lang_resource['PAYMENT_PEXPRESS_PAY'] = 'Payment Express';
$lang_resource['PAYMENT_MAKSEKSEKUS_PAY'] = 'Maksekeskus';

$lang_resource['PAYMENT_CC_WITH_MOBILE_TERMINA'] = 'CC with Mobile termina';
$lang_resource['PAYMENT_ADAPTIVE_ON_DELIVERY'] = 'Paypal Adaptive on delivery';
$lang_resource['PAYMENT_PAYPAL_CREDIT_CARD'] = 'Paypal &amp; Credit card through Paypal';
$lang_resource['PAYMENT_ORDER_NOW'] = 'Order Now';
$lang_resource['PAYMENT_ORDER_BACK'] = 'Back';
$lang_resource['PAYMENT_RESERVE_NOW'] = 'Reserve Now';
//checkouts.js''''
$lang_resource['CHECKOUT_API'] = 'APT/Suit';
$lang_resource['CHECKOUT_ZIP'] = 'Zipcode';
$lang_resource['CHECKOUT_CITY'] = 'City';
$lang_resource['CHECKOUT_FULL_ADDRESS'] = 'Full Address';
$lang_resource['CHECKOUT_RECEIVE_SMS'] = 'Receive SMS';
$lang_resource['CHECKOUT_YES'] = 'Yes';
$lang_resource['CHECKOUT_NO'] = 'No';
$lang_resource['CHECKOUT_TIP_FOR_THE_DRIVER'] = 'Tip for the driver';
$lang_resource['CHECKOUT_COUPON_APPLIED'] = 'Coupon Applied';
$lang_resource['CHECKOUT_COUPON_NOT_APPLIED'] = 'Coupon Not Applied';
$lang_resource['CHECKOUT_ASAP'] = 'ASAP';
$lang_resource['CHECKOUT_HH'] = 'HH';
$lang_resource['CHECKOUT_MM'] = 'MM';
$lang_resource['CHECKOUT_MIN'] = 'min';
//WhereAmIBox.js''''
$lang_resource['WHEREAMIBOX_CUISINES'] = 'cuisines';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_GUEST_FIELD'] = 'Please Choose Guest field';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_DATE'] = 'Please Choose Date field';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_HOUR_FIELD'] = 'Please Choose Hour field';
$lang_resource['WHEREAMIBOX_PLEASE_CHOOSE_MINUTE_FIELD'] = 'Please Choose Minute field';
//menu-list.js''''
$lang_resource['MENU_LIST_FREE_SHIPPING'] = 'Free Shipping';
$lang_resource['MENU_LIST_SELECT_CATEGORIES'] = 'Select Categories';
$lang_resource['MENU_LIST_YOU_HAVE'] = 'You have';
$lang_resource['MENU_LIST_CHANGE_TIME'] = 'Change Time?';
$lang_resource['MENU_LIST_OPENING_TIME'] = 'Opening time';
$lang_resource['MENU_LIST_SEARCH_SAVE'] = 'Search &amp; Save';
$lang_resource['MENU_LIST_PRICE_DETAILS'] = 'Price Details';
$lang_resource['MENU_LIST_GRAND_TOTAL'] = 'Grand Total';
$lang_resource['SHOPPING_CATEGORIES_SHOW_ALL'] = 'Show all';
//mobile''''
//menu-list.js''''
$lang_resource['WHEREAMIBOX_CUISINES'] = 'cuisines';
$lang_resource['WHEREAMIBOX_LETS_GO'] = 'Let&#39;s Go!';
$lang_resource['WHEREAMIBOX_MOBILE_PICKUP'] = 'Pickup';
$lang_resource['WHEREAMIBOX_MOBILE_RESERVATION'] = 'Reservation';
$lang_resource['MOBILE_MENU_NAVIGATION_OFFER'] = 'Offer';
$lang_resource['MOBILE_MENU_LIST_OFFER_NAME'] = 'Offer Name';
$lang_resource['MOBILE_MENU_LIST_OFFER_PRICE'] = 'Offer Price';
$lang_resource['MOBILE_MENU_LIST_START_DATE'] = 'Start Date';
$lang_resource['MOBILE_MENU_LIST_END_DATE'] = 'End Date';
$lang_resource['MOBILE_MENU_LIST_REVIEWS_OF'] = 'REVIEWS of';
$lang_resource['MOBILE_MENU_LIST_PREORDER'] = 'Preorder';
$lang_resource['MOBILE_MENU_LIST_MENU_OPEN TIME'] = 'MENU OPEN TIME';
$lang_resource['MOBILE_RESERVATION_ORDER_NOW'] = 'Order Now';
$lang_resource['MOBILE_RESERVATION_BACK'] = 'Back';
$lang_resource['MOBILE_RESERVATION_CANCEL'] = 'Cancel';
//Reservatiom''''
$lang_resource['MOBILE_RESERVATION_ROOM'] = 'Room';
$lang_resource['MOBILE_RESERVATION_TABLE'] = 'Table';
$lang_resource['MOBILE_RESERVATION_FREE'] = 'Free';
$lang_resource['MOBILE_RESERVATION_DATE'] = 'Date';
$lang_resource['MOBILE_RESERVATION_TIME'] = 'Time';
$lang_resource['MOBILE_RESERVATION_BOOKING_AVAILITY'] = 'Booking Availability';
//business-list.js''''
$lang_resource['MOBILE_BUSINESS_LIST_OPENED_CLOSED_RESTAURANT'] = 'Opened & Closed Restaurants';
$lang_resource['MOBILE_BUSINESS_LIST_EXPRESS_5KM'] = 'Express 5 KM';
$lang_resource['MOBILE_BUSINESS_LIST_BACK'] = 'Back';
$lang_resource['MOBILE_BUSINESS_LIST_SELECT_RESTAURANT'] = 'Select Restaurant';
$lang_resource['MOBILE_BUSINESS_LIST_REFINE'] = 'Refine';
$lang_resource['MOBILE_BUSINESS_LIST_LOCATION'] = 'Location';
$lang_resource['MOBILE_BUSINESS_LIST_RESTAURANT'] = 'Restaurant';
$lang_resource['MOBILE_BUSINESS_LIST_PLACE_ORDER'] = 'Place Order';
$lang_resource['MOBILE_BUSINESS_LIST_MAKE_PAYMENT'] = 'Make Payment';
$lang_resource['MOBILE_BUSINESS_LIST_GET_DELIVERED'] = 'Get Delivered';
$lang_resource['MOBILE_BUSINESS_LIST_KM'] = 'KM';
$lang_resource['MOBILE_BUSINESS_LIST_DELIVERY_COST'] = 'Delivery cost';
$lang_resource['MOBILE_BUSINESS_LIST_PROMOTION'] = 'Promotion';
$lang_resource['MOBILE_BUSINESS_LIST_SELECT_OPTIONS'] = 'Select Option';
$lang_resource['MOBILE_BUSINESS_LIST_OPTIONS_FAVORITES'] = 'Favorites';
//checkouts.js''''
$lang_resource['MOBILE_CHECKOUT_BUSINESS'] = 'Business';
$lang_resource['MOBILE_CHECKOUT_CANCEL'] = 'Cancel';
$lang_resource['MOBILE_CHECKOUT_ORDER_DETAILS'] = 'Order Details';
$lang_resource['MOBILE_CHECKOUT_DELIVERY_DETAILS'] = 'Delivery Details';
$lang_resource['MOBILE_CHECKOUT_PICKUP_DETAILS'] = 'Pickup Details';
$lang_resource['MOBILE_CHECKOUT_NAME'] = 'Name';
$lang_resource['MOBILE_CHECKOUT_LASTNAME'] = 'Last Name';
$lang_resource['MOBILE_CHECKOUT__EMAIL'] = 'Email';
$lang_resource['MOBILE_CHECKOUT_FULL_ADDRESS'] = 'Full Address';
$lang_resource['MOBILE_CHECKOUT_NEIGHBOURHOOD'] = 'Neighbourhood';
$lang_resource['MOBILE_CHECKOUT_WHERE_DID_YOU_FIND_US'] = 'Where did you find about us';
$lang_resource['MOBILE_CHECKOUT_RADIO'] = 'Facebook';
$lang_resource['MOBILE_CHECKOUT_FLYER'] = 'Flyer';
$lang_resource['MOBILE_CHECKOUT_GOOGLE'] = 'Google';
$lang_resource['MOBILE_CHECKOUT_PHONE_NUMBER'] = 'Phone Number';
$lang_resource['MOBILE_CHECKOUT_PHONE'] = 'Phone';
$lang_resource['MOBILE_CHECKOUT_RECEIVE_SMS'] = 'Receive SMS';
$lang_resource['MOBILE_CHECKOUT_YES'] = 'Yes';
$lang_resource['MOBILE_CHECKOUT_NO'] = 'No';
$lang_resource['MOBILE_CHECKOUT_TIP_FOR_THE_DRIVER'] = 'Tip for the driver';
$lang_resource['MOBILE_CHECKOUT_DISCOUNT_COUPON'] = 'Discount coupon';
$lang_resource['MOBILE_CHECKOUT_APPLY_COUPON'] = 'Apply coupon';
$lang_resource['MOBILE_CHECKOUT_COUPON_APPLIED'] = 'Coupon Applied';
$lang_resource['MOBILE_CHECKOUT_DATE'] = 'Date';
$lang_resource['MOBILE_CHECKOUT_ASAP'] = 'ASAP';
$lang_resource['MOBILE_CHECKOUT_TIME_IN_HOUR'] = 'Time in Hour';
$lang_resource['MOBILE_CHECKOUT_HH'] = 'HH';
$lang_resource['MOBILE_CHECKOUT_TIME_IN_MINUTE'] = 'Time in Minute';
$lang_resource['MOBILE_CHECKOUT_MM'] = 'MM';
$lang_resource['MOBILE_CHECKOUT_MIN'] = 'min';
$lang_resource['MOBILE_CHECKOUT_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['MOBILE_CHECKOUT_ORDER_NOW'] = 'Order Now';
$lang_resource['MOBILE_CHECKOUT_DELIVERY_FEE'] = 'Delivery Fee';
$lang_resource['MOBILE_CHECKOUT_TOTAL'] = 'Total';
$lang_resource['MOBILE_CHECKOUT_RESERVATION_OPTIONS'] = 'Reservation Options';
//front-forms.js''''
$lang_resource['MOBILE_FRONT_FORMS_REQUIRED'] = 'Required';
//front-visuals.js''''
$lang_resource['MOBILE_FRONT_VISUALS_SKIP'] = 'Skip';
$lang_resource['MOBILE_FRONT_VISUALS_SAVE_CONTINUE'] = 'Save &amp; Continue';
$lang_resource['MOBILE_FRONT_VISUALS_CUISINES'] = 'cuisines';
$lang_resource['MOBILE_FRONT_VISUALS_LETS_GO'] = 'Let&#39;s Go!';
$lang_resource['MOBILE_FRONT_VISUALS_SEARCH'] = 'Search';
$lang_resource['MOBILE_FRONT_VISUALS__DELIVERY'] = 'Delivery';
$lang_resource['MOBILE_FRONT_VISUALS_COUNTRY'] = 'Country';
$lang_resource['MOBILE_FRONT_VISUALS_CITY'] = 'City';
$lang_resource['MOBILE_FRONT_VISUALS_ADDRESS_OR_ZIPCODE'] = 'Address or Zip Code';
$lang_resource['MOBILE_FRONT_VISUALS_FILTER_OPTION'] = 'Filter Option';
$lang_resource['MOBILE_FRONT_VISUALS_BROWSE_PER_CITY'] = 'Browse per City';
$lang_resource['MOBILE_FRONT_VISUALS_LOGIN_REGISTER'] = 'Login / Register';
$lang_resource['MOBILE_FRONT_VISUALS_TRACK_ORDER'] = 'Track Order';
$lang_resource['MOBILE_FRONT_VISUALS_MORE'] = 'More';
$lang_resource['MOBILE_FRONT_VISUALS_ENTER_YOUR_ORDER_ID'] = 'Enter your Order ID';
$lang_resource['MOBILE_FRONT_VISUALS_TRACK_NOW'] = 'Track Now';
$lang_resource['MOBILE_FRONT_VISUALS_LOGIN'] = 'Login';
$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_YOUR_PASSWORD'] = 'Forgot your password ?';
$lang_resource['MOBILE_FRONT_VISUALS_REGISTER'] = 'register';
$lang_resource['MOBILE_FRONT_VISUALS_OR'] = 'Or';
$lang_resource['MOBILE_FRONT_VISUALS_LOGIN_WITH_FACEBOOK'] = 'Login with facebook';
$lang_resource['MOBILE_FRONT_VISUALS_CHOOSE_COUNTRY'] = 'Choose Country';
$lang_resource['MOBILE_FRONT_VISUALS_REGISTER'] = 'Register';
$lang_resource['MOBILE_FRONT_VISUALS_REGISTER1'] = 'register';
$lang_resource['MOBILE_FRONT_VISUALS_REGISTER2'] = 'update';
$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_PASSWORD'] = 'Forgot password';
$lang_resource['MOBILE_FRONT_VISUALS_OR_ENTER_EMAIL_ADDRESS'] = 'Enter Email Address';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT'] = 'SUBMIT';
$lang_resource['MOBILE_FRONT_VISUALS_BUSINESS'] = 'Business';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_EMAIL'] = 'E-mail';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_PASSWORD'] = 'Password';
$lang_resource['MOBILE_FRONT_VISUALS_SUBMIT_SIGN_IN_TO_CHECKOUT'] = 'Sign In to Checkout';
$lang_resource['MOBILE_FRONT_VISUALS_FORGOT_YOUR_PASSWORD'] = 'Forgot your password ?';
$lang_resource['MOBILE_FRONT_VISUALS_NEW_CUSTOMER'] = 'New Customer';
$lang_resource['MOBILE_FRONT_VISUALS_YOU_DONT_ACCOUNT'] = 'You don&#39;t need an account to check out.';
$lang_resource['MOBILE_FRONT_VISUALS_COUNTINUE_AS_GUEST'] = 'Continue as Guest';
$lang_resource['MOBILE_FRONT_VISUALS_CREATE_ACCOUNT_FAST'] = 'Create account for fast Checkout and easy access to order history.';
$lang_resource['MOBILE_FRONT_VISUALS_CREATE_ACCOUNT'] = 'Create Account';
$lang_resource['MOBILE_FRONT_VISUALS_CONTINUE'] = 'Continue';
$lang_resource['MOBILE_FRONT_VISUALS_NAME'] = 'Name';
$lang_resource['MOBILE_FRONT_VISUALS_EMAIL'] = 'Email';
$lang_resource['MOBILE_FRONT_VISUALS_ADDRESS'] = 'Address';
$lang_resource['MOBILE_FRONT_VISUALS_TEL'] = 'Tel';
$lang_resource['MOBILE_FRONT_VISUALS_COMMENTS'] = 'Comments';
$lang_resource['MOBILE_FRONT_VISUALS_DRIVER_COMMENTS'] = 'Driver Comments';
$lang_resource['MOBILE_FRONT_VISUALS_USER_COMMENTS'] = 'User Comments';
$lang_resource['MOBILE_FRONT_VISUALS_DATE'] = 'Date';
$lang_resource['MOBILE_FRONT_VISUALS_TIME'] = 'Time';
$lang_resource['MOBILE_FRONT_VISUALS_CASH'] = 'Cash';
$lang_resource['MOBILE_FRONT_VISUALS_FREE'] = 'Free';
$lang_resource['MOBILE_FRONT_VISUALS_QUANTITY'] = 'Quantity';
$lang_resource['MOBILE_FRONT_VISUALS_HELP'] = 'Help';
$lang_resource['MOBILE_FRONT_VISUALS_MOBILE'] = 'Mobile';
$lang_resource['MOBILE_FRONT_VISUALS_SELECT_TYPE'] = 'Select Type';
$lang_resource['MOBILE_FRONT_VISUALS_DELIVERY'] = 'Delivery';
$lang_resource['MOBILE_FRONT_VISUALS_PICKUP'] = 'Pickup';
$lang_resource['MOBILE_FRONT_VISUALS_RESERVATION'] = 'Reservation';
$lang_resource['MOBILE_FRONT_VISUALS_RESTAURANTS'] = 'Restaurants';
$lang_resource['MOBILE_FRONT_VISUALS_CUISINES'] = 'Cuisines';
$lang_resource['MOBILE_FRONT_VISUALS_MMDDYY'] = 'mm-dd-yyyy';
$lang_resource['MOBILE_FRONT_VISUALS_SEARCH'] = 'Search';
$lang_resource['MOBILE_FRONT_VISUALS_ZIP'] = 'Zipcode';
$lang_resource['MOBILE_FRONT_VISUALS_APT'] = 'APT/Suit';
$lang_resource['MOBILE_FRONT_VISUALS_NEIGHBOR'] = 'Area / Neighborhood';
//menu-list.js''''
$lang_resource['MOBILE_MENU_LIST_BACK'] = 'Back';
$lang_resource['MOBILE_MENU_LIST_SEARCH_DISH'] = 'Search Dish';
$lang_resource['MOBILE_MENU_LIST_REFINE'] = 'Refine';
$lang_resource['MOBILE_MENU_LIST_ALL'] = 'All';
$lang_resource['MOBILE_BUSSINESS_LIST_ALL'] = 'All';
$lang_resource['MOBILE_MENU_LIST_RATINGS'] = 'ratings';
$lang_resource['MOBILE_MENU_LIST_ADD_TO_FAVORITES'] = 'Add to favourite';
$lang_resource['MOBILE_MENU_LIST_RESERVATION'] = 'Reservation';
$lang_resource['MOBILE_MENU_LIST_RESERVE_NOW'] = 'Reserve Now';
$lang_resource['MOBILE_MENU_LIST_RESERVE_ORDER'] = 'Reserve + Order';
$lang_resource['MOBILE_MENU_LIST_PREORDER'] = 'Preorder';
$lang_resource['MOBILE_MENU_LIST_PROCEED_CHECKOUT'] = 'Proceed to checkout';
$lang_resource['MOBILE_MENU_LIST_MENU_OPEN_TIME'] = 'MENU OPEN TIME';
$lang_resource['MOBILE_MENU_LIST_NEXT'] = 'Next';
$lang_resource['MOBILE_MENU_LIST_SEARCH_SAVE'] = 'Search &amp; Save';
$lang_resource['MOBILE_MENU_LIST_RESERVATION_DETAILS'] = 'Reservation Details';
$lang_resource['MOBILE_MENU_LIST_NAME'] = 'Name';
$lang_resource['MOBILE_MENU_LIST_EMAIL'] = 'Email';
$lang_resource['MOBILE_MENU_LIST_PHONE'] = 'Phone';
$lang_resource['MOBILE_MENU_LIST_TEL'] = 'Tel';
$lang_resource['MOBILE_MENU_LIST_RECEIVE_SMS'] = 'Receive SMS';
$lang_resource['MOBILE_MENU_LIST_PRICE_DETAILS'] = 'Price Details';
$lang_resource['MOBILE_MENU_LIST_ROOM'] = 'Room';
$lang_resource['MOBILE_MENU_LIST_TABLE'] = 'Table';
$lang_resource['MOBILE_MENU_LIST_FREE'] = 'Free';
$lang_resource['MOBILE_MENU_LIST_TOTAL'] = 'Total';
$lang_resource['MOBILE_MENU_LIST_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['MOBILE_MENU_LIST_HOME'] = 'Home';
$lang_resource['MOBILE_MENU_LIST_DO_YOU_WANT_KNOW_THE_PROGRESS'] = 'Do you want know the progress of your order?';
$lang_resource['MOBILE_MENU_LIST_TRACK_NOW'] = 'TRACK NOW';
$lang_resource['MOBILE_MENU_LIST_NEED_CHANGE_ON_YOUR_ORDER'] = 'Need change on your order?';
$lang_resource['MOBILE_MENU_LIST_TOTAL'] = 'Total';
$lang_resource['MOBILE_MENU_LIST_GRAND_TOTAL'] = 'Grand Total';
$lang_resource['MOBILE_MENU_LIST_OPENING_TIME'] = 'Opening time';
$lang_resource['MOBILE_MENU_LIST_DELIVERY_LOCATION'] = 'Delivery Location';
$lang_resource['MOBILE_MENU_LIST_ABOUT_RESTAURANT'] = 'About Restaurant';
$lang_resource['MOBILE_MENU_LIST_PHOTO_GALLERY'] = 'Photo Gallery';
$lang_resource['MOBILE_MENU_LIST_VIDEO_GALLERY'] = 'Video Gallery';
//more.js''''
$lang_resource['MOBILE_MORE_MOST_POPULAR'] = 'Most popular';
$lang_resource['MOBILE_MORE_MOST_POPULAR_CUISINE'] = 'Most Popular Cuisine';
$lang_resource['MOBILE_MORE_SELECT_LOCATION'] = 'Select Location';
$lang_resource['MOBILE_MORE_PICKUP_RESTAURANT'] = 'Select Business';
$lang_resource['MOBILE_MORE_PLACE_ORDER'] = 'Place Order';
$lang_resource['MOBILE_MORE_MAKE_PAYMENT'] = 'Make Payment';
$lang_resource['MOBILE_MORE_GET_DELIVERED'] = 'Get Delivered';
$lang_resource['MOBILE_MORE_HOW_IT_WORKS'] = 'How it works';
$lang_resource['MOBILE_MORE_RECENT_ORDERS'] = 'Recent Orders';
$lang_resource['MOBILE_MORE_USEFULLINKS'] = 'USEFUL LINKS';
$lang_resource['MOBILE_MORE_LETS_BE_FRIENDS'] = 'Lets be friends!';
$lang_resource['MOBILE_MORE_BROWSE_PER_CITY'] = 'Browse per City';
//payment.js''''
$lang_resource['MOBILE_PAYMENT_BACK'] = 'Back';
$lang_resource['MOBILE_PAYMENT_BUSINESS'] = 'Business';
$lang_resource['MOBILE_PAYMENT_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['MOBILE_PAYMENT_PAYPLA_CREDIT_CARD_PAYPAL'] = 'Paypal &amp; Credit card through Paypal';
$lang_resource['MOBILE_PAYMENT_PAYPAL_ADAPTIVE_DELIVERY'] = 'Paypal Adaptive on delivery';
$lang_resource['MOBILE_PAYMENT_MERCADO_PAGO'] = 'Mercado pago';
$lang_resource['MOBILE_PAYMENT_ORDER_NOW'] = 'Order Now';
$lang_resource['MOBILE_PAYMENT_CARD_ON_DELIVERY'] = 'Card on delivery';
$lang_resource['MOBILE_PAYMENT_ORDER_NOW'] = 'Order Now';
//myaccount.js''''
$lang_resource['MOBILE_MYACCOUNT_ERROR'] = 'Error';
$lang_resource['MOBILE_MYACCOUNT_PLEASE_LOGIN_FIRST'] = 'Please Login First';
$lang_resource['MOBILE_MYACCOUNT_OR'] = 'OR';
$lang_resource['MOBILE_MYACCOUNT_EMAIL_ID'] = 'Email ID';
$lang_resource['MOBILE_MYACCOUNT_PASSWORD'] = 'Password';
$lang_resource['MOBILE_MYACCOUNT_REMEMBER_ME'] = 'Remember Me';
$lang_resource['MOBILE_MYACCOUNT_MY_ADDRESS'] = 'My Address';
$lang_resource['MOBILE_MYACCOUNT_BILLING_INFO'] = 'Billing Info';
$lang_resource['MOBILE_MYACCOUNT_EDIT_ADDRESS'] = 'Edit Address';
$lang_resource['MOBILE_MYACCOUNT_SELECT_ONE'] = 'Select One';
$lang_resource['MOBILE_MYACCOUNT_HOME'] = 'Home';
$lang_resource['MOBILE_MYACCOUNT_OFFICE'] = 'Office';
$lang_resource['MOBILE_MYACCOUNT_PUBLIC_AREA'] = 'Public Area';
$lang_resource['MOBILE_MYACCOUNT_BILLING'] = 'Billing';
$lang_resource['MOBILE_MYACCOUNT_TYPE'] = 'Type';
$lang_resource['MOBILE_MYACCOUNT_NAME'] = 'Name';
$lang_resource['MOBILE_MYACCOUNT_COMPANY'] = 'Company';
$lang_resource['MOBILE_MYACCOUNT_ADDRESS'] = 'Address';
$lang_resource['MOBILE_MYACCOUNT_CITY'] = 'City';
$lang_resource['MOBILE_MYACCOUNT_STATE'] = 'State';
$lang_resource['MOBILE_MYACCOUNT_POSTAL_CODE'] = 'Postal Code';
$lang_resource['MOBILE_MYACCOUNT_SAVE_ADDRESS'] = 'Save Address';
$lang_resource['MOBILE_MYACCOUNT_CARD_NO'] = 'Card No';
$lang_resource['MOBILE_MYACCOUNT_EDIT'] = 'Edit';
$lang_resource['MOBILE_MYACCOUNT_SELECT_TYPE'] = 'Select Type';
$lang_resource['MOBILE_MYACCOUNT_VISA'] = 'Visa';
$lang_resource['MOBILE_MYACCOUNT_MASTER'] = 'Mastercard';
$lang_resource['MOBILE_MYACCOUNT_DISCOVERY'] = 'Discovery';
$lang_resource['MOBILE_MYACCOUNT_SELECT_MONTH'] = 'Select Month';
$lang_resource['MOBILE_MYACCOUNT_JAN'] = 'January';
$lang_resource['MOBILE_MYACCOUNT_FEB'] = 'February';
$lang_resource['MOBILE_MYACCOUNT_MAR'] = 'March';
$lang_resource['MOBILE_MYACCOUNT_APR'] = 'April';
$lang_resource['MOBILE_MYACCOUNT_MAY'] = 'May';
$lang_resource['MOBILE_MYACCOUNT_JUN'] = 'June';
$lang_resource['MOBILE_MYACCOUNT_JUL'] = 'July';
$lang_resource['MOBILE_MYACCOUNT_AUG'] = 'August';
$lang_resource['MOBILE_MYACCOUNT_SEP'] = 'September';
$lang_resource['MOBILE_MYACCOUNT_OCT'] = 'October';
$lang_resource['MOBILE_MYACCOUNT_NOV'] = 'November';
$lang_resource['MOBILE_MYACCOUNT_DEC'] = 'December';
$lang_resource['MOBILE_MYACCOUNT_EXPIRY_MONTH'] = 'Expiry Month';
$lang_resource['MOBILE_MYACCOUNT_EXPIRY_YEAR'] = 'Expiry Year';
$lang_resource['MOBILE_MYACCOUNT_CVV_NO'] = 'CVV No';
$lang_resource['MOBILE_MYACCOUNT_SAVE'] = 'Save';
$lang_resource['MOBILE_MYACCOUNT_CANCEL'] = 'Cancel';
$lang_resource['MOBILE_MYACCOUNT_FAVORITE_RESTAURANT'] = 'Favourite Resturant';
$lang_resource['MOBILE_MYACCOUNT_SEARCH'] = 'Search';
$lang_resource['MOBILE_MYACCOUNT_REMOVE'] = 'Remove';
$lang_resource['MOBILE_MYACCOUNT_NO_SEARCH_RESULT_FOUND'] = 'No search result found';
$lang_resource['MOBILE_MYACCOUNT_NO_FAVORITE_RESTAURANT_ADDED'] = 'No favorite restaurant added';
$lang_resource['MOBILE_MYACCOUNT_MY_ACCOUNT_SETTINGS'] = 'My Account Settings';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Most';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Most';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Most';
$lang_resource['MOBILE_MYACCOUNT_'] = 'Most';
//Braintree Transparent payment getway''''
$lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_INFO'] = 'Braintree payment getway information';
$lang_resource['CONTROL_PANEL_BRAINTREE_PAYMENT_METHOD'] = 'Payment Method:';
$lang_resource['CONTROL_PANEL_BRAINTREE_CARDTYPE'] = 'Card Type';
$lang_resource['CONTROL_PANEL_BRAINTREE_MERCHENT_ID'] = 'Merchant Id:';
$lang_resource['CONTROL_PANEL_BRAINTREE_PUBLIC_KEY'] = 'Public Key:';
$lang_resource['CONTROL_PANEL_BRAINTREE_PRIVATE_KEY'] = 'Private Key:';
$lang_resource['CONTROL_PANEL_BRAINTREE_CCNO'] = 'Credit Card Number:';
$lang_resource['CONTROL_PANEL_BRAINTREE_EXDT'] = 'Expiration Date (MM/YYYY):';
$lang_resource['CONTROL_PANEL_BRAINTREE_CCV'] = 'CVV:';
$lang_resource['CONTROL_PANEL_SELECT_CARD'] = 'Select Card NO:';
$lang_resource['SHOPPING_PAYMENT_SELECT_CARD'] = 'Select Credit Card';
$lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY'] = 'Pay with Credit Card';
$lang_resource['CONTROL_PANEL_BRAINTREE_FIRSTNMAE'] = 'First Name';
$lang_resource['CONTROL_PANEL_BRAINTREE_LASTNAME'] = 'Last Name';
$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS1'] = 'Address1';
$lang_resource['CONTROL_PANEL_BRAINTREE_ADDRESS2'] = 'Address2';
$lang_resource['CONTROL_PANEL_BRAINTREE_CITY'] = 'City';
$lang_resource['CONTROL_PANEL_BRAINTREE_STATE'] = 'State';
$lang_resource['CONTROL_PANEL_BRAINTREE_ZIPCODE'] = 'Zipcode';
$lang_resource['CONTROL_PANEL_BRAINTREE_SAMEASDELIVERY'] = 'Billing address Same as Delivery Address';
$lang_resource['PAYMENT_BRAINTREE_ON_DELIVERY'] = 'Braintree';
$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS'] = 'Billing Address';
$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME'] = 'Billing Address same as';
$lang_resource['PAYMENT_BRAINTREE_BILL_ADDRESS_SAME_ADDRESS'] = 'Address';
//AUTHORIZER PAYMENT GATEWAY''''
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_INFO'] = 'Authorize.Net payment getway information';
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_PAYMENT_METHOD'] = 'Payment Method';
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_APL'] = 'API Login ID';
$lang_resource['CONTROL_PANEL_AUTHORIZER_PAYMENT_TRANSACTION_KEY'] = 'Transaction Key';
$lang_resource['AUTHORIZE_DETAILS'] = 'Authorize Net Details';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CARD_DETAILS'] = 'Card Details';
$lang_resource['CONTROL_PANEL_AUTHORIZE_CARDNO_ALERT'] = 'Please Enter Card No';

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
$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPMM'] = 'Expiry (MM) ';
$lang_resource['CONTROL_PANEL_AUTHORIZE_EXPYY'] = 'Expiry (YY)';
//CARDSAVE PAYMENT GATEWAY''''
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
//18 december 2014''''
$lang_resource['INDEX_JOIN_OUR_NETWORK'] = 'SIGN UP';
$lang_resource['TEMPLATE_DELIVERYCOST'] = 'Delivery Cost :';
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD'] = 'Upload image';
$lang_resource['CONTROL_PANEL_BUTTON_IMAGE_UPLOAD_SMALL_TEXT'] = '_';
$lang_resource['FRONT_METAKEY'] = $records['sitename'];
$lang_resource['FRONT_META_CONTENT'] = 'dont delete this tag';
$lang_resource['FRONT_TELL_US_WHERE_YOU'] = 'Please tell us where you are by clicking the button "Where are you?';
$lang_resource['FRONT_ENTER_LOGIN_EMAIL'] = 'Please Enter Login Email and Password!';
$lang_resource['FRONT_ENTER_LOGIN'] = 'LOG IN';
$lang_resource['FRONT_CREATE_AN_ACCOUNT'] = 'Create an account';
$lang_resource['FRONT_RECOVER_PASSWORD'] = 'Recover password';
$lang_resource['FRONT_SAVE_TIME_LATTER'] = 'Save time later';
$lang_resource['FRONT_CORRECT_LOGIN_CREDENTIAL'] = 'Please type correct login credential';
$lang_resource['FRONT_CONTINUE'] = 'Continue';
$lang_resource['FRONT_CHOOSE_OPTIONS'] = 'Please choose any one option';
$lang_resource['FRONT_SELECT_COUNTRY'] = 'Please select country';
$lang_resource['FRONT_SELECT_CITY'] = 'Please select city';
$lang_resource['FRONT_SELECT_ADDRESS'] = 'Please enter your address';
$lang_resource['FRONT_SELECT_NEIBORHOOD'] = 'Please select neighborhood';
$lang_resource['FRONT_ENTER_YOUR_NAME'] = 'Please Enter your name';
$lang_resource['FRONT_ENTER_YOUR_LAST_NAME'] = 'Please Enter your last name';
$lang_resource['FRONT_ENTER_YOUR_PASSWORD'] = 'Please Enter your password';
$lang_resource['FRONT_ENTER_YOUR_STREET'] = 'Please Enter your street address';
$lang_resource['FRONT_ENTER_YOUR_COLONY'] = 'Please select neighborhood';
$lang_resource['FRONT_ENTER_YOUR_CP'] = 'Please Enter your post code';
$lang_resource['FRONT_SELECT_YOUR_COUNTRY'] = 'Please Select your country';
$lang_resource['FRONT_SELECT_YOUR_CITY'] = 'Please Select your city';
$lang_resource['FRONT_ENTER_YOUR_MOBILE'] = 'Please Enter mobile number';
$lang_resource['FRONT_ENTER_YOUR_APT'] = 'Please Enter APT/Suit';
$lang_resource['FRONT_TRACK_DRIVER_GPS'] = 'Track Driver GPS';
$lang_resource['SHOPPING_SELECT_ROOM_TABEL_FREE'] = 'Please Select at least One Room or Table or Free space';
$lang_resource['SHOPPING_SELECT_GUEST'] = 'please select Guest';
$lang_resource['SHOPPING_SELECT_DATE'] = 'please select Date';
$lang_resource['SHOPPING_FOURTH_MINIMUM_VALUE'] = 'Min Order: ';
$lang_resource['SHOPPING_INFO_CATALOG_EVERYDAY'] = 'Everyday';
$lang_resource['SHOPPING_INFO_CATALOG_SUNDAY'] = 'Sunday';
$lang_resource['SHOPPING_INFO_CATALOG_MONDAY'] = 'Monday';
$lang_resource['SHOPPING_INFO_CATALOG_TUESDAY'] = 'Tuesday';
$lang_resource['SHOPPING_INFO_CATALOG_WEDNESDAY'] = 'Wednessday';
$lang_resource['SHOPPING_INFO_CATALOG_THURSDAY'] = 'Thursday';
$lang_resource['SHOPPING_INFO_CATALOG_FRIDAY'] = 'Friday';
$lang_resource['SHOPPING_INFO_CATALOG_SATURDAY'] = 'Saturday';
$lang_resource['FRONT_VISUALS_JUST_ORDERED'] = 'just ordered from';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPAL'] = 'PAID in Paypal payment Method';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_PAYPALADAPTIVE'] = 'PAID in PaypalAdaptive payment Method';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_AUTHORISENET'] = 'PAID in Authorise.Net payment Method';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_BRAINTREE'] = 'PAID in Braintree payment Method';
$lang_resource['FRONT_MAIN_EMAIL_UPON_RECEIVING_PAY_CARDSAVE'] = 'PAID in CardSave payment Method';
$lang_resource['MENU_LIST_SET_TIME'] = 'Set Time?';
$lang_resource['DESKTOP_BUSINESS_SHOW_MAP'] = 'Show Map';
$lang_resource['PAYMENT_BRAINTREE_ON_ENTER_CREDIT_CARD'] = 'Please Enter Credit Card Number';
$lang_resource['PAYMENT_BRAINTREE_ON_ENTER_EXP_DATE'] = 'Please Enter Expiration Date (MM/YY)';
$lang_resource['CONTROL_PANEL_AUTHORIZE_ENTER_CCV'] = 'Please Enter CVV';
$lang_resource['CONTROL_PANEL_CARDSAVE_ADDRESS_ALERT'] = 'Please Enter Address ';
$lang_resource['PAYMENT_GATEWAY_ALL_BACK'] = 'Back';
$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT_SUCCESS'] = 'Authorize.Net Payment Success';
$lang_resource['PAYMENT_GATEWAY_ALL_FROM_SITE_URL'] = 'From: '.$records['sitename'].' <'.$records['sitename'].'@example.com>';
$lang_resource['PAYMENT_GATEWAY_ALL_AUTHORIZE_PAYMENT'] = 'paypalform';
$lang_resource['PAYMENT_GATEWAY_ALL_SITE_NAME'] = $records['sitename'];
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
$lang_resource['PAYMENT_GATEWAY_ALL_TANKYOU_PAYMENT'] = 'Thank you for online payment ......................';
$lang_resource['PAYMENT_GATEWAY_ALL_ADDRESS2'] = 'Address 2:';
$lang_resource['PAYMENT_GATEWAY_ALL_TELE'] = 'Telephone:';
$lang_resource['PAYMENT_GATEWAY_ALL_PAID_WITH_PAYPAL'] = 'PAID with Paypal';
$lang_resource['PAYMENT_GATEWAY_ALL_TELE'] = 'Telephone:';
$lang_resource['PAYMENT_GATEWAY_ALL_SMTP_ERROR'] = 'SMTP Error: Data not accepted';
$lang_resource['PAYMENT_GATEWAY_ALL_ADAPTIVE_SUCCESS'] = 'Paypal Adaptive Payment Success';
$lang_resource['PAYMENT_GATEWAY_ALL_USD'] = 'USD';
$lang_resource['PAYMENT_GATEWAY_ALL_PayPalAdaptive'] = 'PayPalAdaptive';
$lang_resource['PAYMENT_GATEWAY_ALL_CARD_SAVE_SUCCESS'] = 'Card Save Payment Success';

$lang_resource['PAYMENT_GATEWAY_ALL_TRANSACTIUM_SAVE_SUCCESS'] = 'Transactium Payment Success';

$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_CARD_NO'] = 'Invalid card type/number.';
$lang_resource['PAYMENT_GATEWAY_ALL_CV2_NUMBER'] = 'Invalid CV2 number.';
$lang_resource['PAYMENT_GATEWAY_ALL_NO_CARD_ENTERED'] = 'No card number entered.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_CARD_NUMBER'] = 'Invalid card number.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_MONTH_MISSING'] = 'Expiry month missing.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_YEAR'] = 'Invalid expiry year.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_MONTH'] = 'Invalid expiry month.';
$lang_resource['PAYMENT_GATEWAY_ALL_INVALID_ISSUE_NUMBER'] = 'Invalid issue number.';
$lang_resource['PAYMENT_GATEWAY_ALL_ENTER_NEIGHBOURHOOD'] = 'Please Enter Neighbour';
$lang_resource['PAYMENT_GATEWAY_ENTER_STATE_NAME'] = 'Please Enter State Name';
$lang_resource['PAYMENT_GATEWAY_ALL_ENTER_ZIP_CODE'] = 'Please Enter Zip Code';
$lang_resource['PAYMENT_GATEWAY_ALL_GO'] = 'Go';
$lang_resource['PAYMENT_GATEWAY_CLOSED'] = 'Closed';
//Email Template''''
$lang_resource['EMAIL_TEMPLATE_DETAILS_CUSTOMER_ORDER'] = 'Details of Customer Order';
$lang_resource['EMAIL_TEMPLATE_DESCRIPTION'] = 'Description';
$lang_resource['EMAIL_TEMPLATE_USER_DETAILS'] = 'User Details';
$lang_resource['EMAIL_TEMPLATE_DELIVERY_TYPE'] = 'Delivery Type';
$lang_resource['EMAIL_TEMPLATE_PLEASE_CHOOSE_ONE_BELOW_OPTIONS'] = 'Please choose one below option for Order No:';
$lang_resource['EMAIL_TEMPLATE_'] = 'Go';
$lang_resource['EMAIL_TEMPLATE_DETAILS_OF_CUSTOMER_ORDER'] = 'Details of Customer Order No';
$lang_resource['EMAIL_TEMPLATE_CHOOSE_BELOW_OPTIONS'] = 'Please choose one below option for Order No';
//SMS''''
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
$lang_resource['ADDRESS_OPTIONAL_TAB_VALIDATION'] = 'Please check address or Optional filters or Neighborhood in delivery option';
$lang_resource['OPTIONAL_TAB_VALIDATION1'] = 'Please check  Optional filters in pickup option';
$lang_resource['OPTIONAL_TAB_VALIDATION2'] = 'Please check  Optional filters in Reservation option';

//panel tab seting  end
$sms_resource['SMS_ORDER_STATUS_CHANGED'] = 'Order comment #';
$sms_resource['SMS_ORDER_COMMENT_CHANGED'] = ' has changed: ';

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
$lang_resource['INVOICE_ACCOUNT_BALANCE_CARRIED'] = 'Account balance carried froward from previous invoice ( Note: This should be 0.00 if the previous ammount is possitive, because it had been paid by '.$records['sitename'].' )';
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
$lang_resource['RESERVATION_NO_MUNITE'] = 'Minute';
$lang_resource['RESERVATION_NO_TIME_FORMAT'] = 'mm-dd-yyyy';
$lang_resource['RESERVATION_OPENING_TIME'] = 'Opening Time';
//menu-list.js
$lang_resource['MENULIST_OPENING_TIME'] = 'Opening Time';
$lang_resource['MENULIST_ESTIMATE_DELIVERY_TIME'] = 'Estimate Delivery Time';
$lang_resource['MENULIST_ESTIMATE_PICKUP_TIME'] = 'Estimate Pickup Time';
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
$lang_resource['ORDER_STATUS_TEXT'] = 'Order Status';
$lang_resource['EMAIL_CURRENT_ORDER_STATUS_FOR_ORDER_NO'] = 'Current Order Status for Order No';
$lang_resource['EMAIL_PRINTER_STATUS_UPDATE_RESTAURANT'] = 'The restaurant has accepted the order at:';
$lang_resource['EMAIL_PRINTER_STATUS_COMMENTS'] = 'Comments:';
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

//panel setting
$lang_resource['SITE_PANEL_SETTING_TEXT'] ='Panel Setting';
$lang_resource['SITE_PANEL_TYPE_TEXT'] ='Panel Setting';

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
$lang_resource['FRONT_TRANSACTIUM'] = ' Transactium';
$lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_CODE'] = 'Transation Code: ';
$lang_resource['V3_ORDER_PAID_WITH_TRANSACTIUM_STATUS'] = 'Transation Status: ';

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
$lang_resource['CONTROL_PANEL_STATISTIC_SALES'] = 'sales';
$lang_resource['CONTROL_PANEL_STATISTIC_WITH'] = 'with';
$lang_resource['LOGIN_CREATE_SUBURB1'] = 'Area / Neighborhood';

//20/04/2015 Cris

$lang_resource['SUPERADMIN_SPECIAL_SETTINGS_FOR_HOME_PAGE'] = 'Special Settings for Home Page'; 
$lang_resource['SUPERADMIN_OPTIONAL_FILTERS'] = 'Optional filters'; 
$lang_resource['SUPERADMIN_TAB'] = 'Tab'; 
$lang_resource['SUPERADMIN_TAB_SETTINGS'] = 'Tab Settings'; 
$lang_resource['SUPERADMIN_MODE_OF_PAYMENTS'] = 'Mode of payment'; 
$lang_resource['SUPERADMIN_SET_SPLIT_SETTINGS'] = 'SET SPLIT SETTINGS'; 
$lang_resource['SUPERADMIN_SET_FRONT_SETTINGS'] = 'Front Settings';

//21/04/15
$lang_resource['ORDER_MAIL_SUBJECT'] = 'Order ';
$lang_resource['ORDER_PDF_TITLE'] = 'Order # ';


//Catagories
$lang_resource['CATAGORIES_NAME'] = 'Name';
$lang_resource['CATAGORIES_RANK'] = 'Rank';
$lang_resource['CATAGORIES_SELECTRANK'] = 'Select Rank';
$lang_resource['CONTROL_PANEL_BUSINESS_TAB_CATAGORIES'] = 'CATAGORIES';
$lang_resource['CATAGORIES_SELECTRANK_ALERT'] = 'Rank Must be Greater than 0';

//links

$lang_resource['POPUP_SUGGEST_SHOP_LINK'] = 'http://beta.orderingonlinesystem.com/paiement';
$lang_resource['CONTACT_US_LINK'] = 'http://beta.orderingonlinesystem.com/a';

$lang_resource['bringg_Item'] = 'Item';
$lang_resource['bringg_Comment'] = 'Comment';
$lang_resource['bringg_Options'] = 'options';
$lang_resource['bringg_Price'] = 'Price';
$lang_resource['bringg_Delivery_charge'] = 'Delivery Price';
$lang_resource['bringg_Delivery_Tips']= 'Tips';
$lang_resource['bringg_Delivery_Total']= 'Delivery Total';
$lang_resource['bringg_Delivery_taxtype']= 'Tax';
//new home page for mobile
$lang_resource['NEW_MOBILE_HOME_HUNGRY']= 'Hungry ?'; 
$lang_resource['NEW_MOBILE_HOME_START_YOUR_ORDER']= 'START YOUR ORDER';
$lang_resource['NEW_MOBILE_HOME_START_FIND_RESTAURANT']= 'FIND RESTAURANT'; 
$lang_resource['DRIVER_MANAGER_MESSAGE']= 'Driver Manager Message'; 
$lang_resource['DRIVER_BUSINESS_MESSAGE']= 'Business Message';




$lang_resource['RESERVATION_SELECT_GUEST']= 'Select Guest';
$lang_resource['RESERVATION_SELECT_DATE']= 'Select Date';
$lang_resource['RESERVATION_SELECT_HOUR']= 'Select Hour';
$lang_resource['RESERVATION_SELECT_MINUTE']= 'Select Minute';


$lang_resource['GET_DIRECTION_FOR_TAKEWAY'] = 'Get Direction for Takeway';


//business Owner register
$lang_resource['BUSINESS_OWNER_WELCOME_TEXT'] = "Business Owner Welcome Email";
$lang_resource['BUSINESS_OWNER_WELCOME_LINE1'] = "Thank you very much for signing up as a business ";
$lang_resource['BUSINESS_OWNER_WELCOME_LINE2'] = 'You can login to your business area on '.$records['siteurl'].'/admin <br> Your username is';
$lang_resource['BUSINESS_OWNER_WELCOME_LINE3'] = "Your password is";
$lang_resource['BUSINESS_OWNER_VALIDATION_MSG'] = "Please select user type";
$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE1'] = "FOOD LOVER";
$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE2'] = "Are you a foodlover? Do you want to discover authentic homemade foodarea?";
$lang_resource['BUSINESS_USER_FRONT_VISUAL_LINE3'] = "I want to explore homemade food in my area.";
$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE1'] = "HOME CHEF & BAKER";
$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE2'] = "Are you a passionate Home Chef? Would you like to showcase your extraor";
$lang_resource['BUSINESS_OWNER_FRONT_VISUAL_LINE3'] = "I am ready to create my shop front so I can display and sell my amazing cookingtalents.";

//request collection start
$lang_resource['FRONT_VISUAL_HEADER_TAG'] ='We can Deliver any Pre-Ordered Takeaway';
$lang_resource['FRONT_VISUAL_REQUEST_COLLECTION'] ='Request Collection';

//Request collection
$lang_resource['REQUEST_COLLECTION_SETTING'] ='Request collection setting'; 
$lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'] ='Request collection delivery fee';
$lang_resource['REQUEST_COLLECTIO_DELIVERY_ZONE'] = 'Delivery zone';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_DETAILS'] = 'Customer Details';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_NAME'] = 'Customer Name';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_ADDRESS'] = 'Customer Address';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE1'] = 'Line 1';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_LINE2'] = 'Line 2';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_TOWN'] = 'Town';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_POSTERCODE'] = 'Postal code';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_CONTACT_NUMBER'] = 'Customer Contact Number';
$lang_resource['REQUEST_COLLECTION_CUSTOMER_NOTES'] = 'Notes';
$lang_resource['REQUEST_COLLECTION_RESTURENT_DETAILS'] = 'Restaurant Details';
$lang_resource['REQUEST_COLLECTION_RESTURENT_NAME'] = 'Restaurant Name';
$lang_resource['REQUEST_COLLECTION_RESTURENT_ADDRESS'] = 'Restaurant Address';
$lang_resource['REQUEST_COLLECTION_RESTURENT_CONTACT_NUMBER'] = 'Restaurant Contact Number';
$lang_resource['REQUEST_COLLECTION_CONDITION_CHK'] = 'I confirm I have paid for the order in full';
$lang_resource['REQUEST_COLLECTION'] = 'Request collection';
$lang_resource['REQUEST_COLLECTION_RESTURENT_COLLECTION_TIME'] = 'Collection Time ';
$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_VALUE'] = 'Order Value';
$lang_resource['REQUEST_COLLECTION_RESTURENT_OTHER_REFERENCE'] = 'Order Reference (If Any)';

$lang_resource['CUSTOMER_NAME_VV1'] = 'Please Enter Customer Name';
$lang_resource['CUSTOMER_ADDRESS1_VV1'] = 'Please Enter Customer Line1 Address';
$lang_resource['CUSTOMER_ADDRESS2_VV1'] = 'Please Enter Customer Line2 Address';
$lang_resource['CUSTOMER_TOWN_VV1'] = 'Please Enter Customer Town Name';
$lang_resource['CUSTOMER_POSTCODE_VV1'] = 'Please Enter Customer Postcode Number';
$lang_resource['CUSTOMER_CNO_VV1'] = 'Please Enter Customer Contact Number';
$lang_resource['RESTURENT_NAME_VV1'] = 'Please Enter Resturent Name';
$lang_resource['RESTURENT_ADDRESS1_VV1'] = 'Please Enter Resturent Line1 Address';
$lang_resource['RESTURENT_ADDRESS2_VV1'] = 'Please Enter Resturent Line2 Address';
$lang_resource['RESTURENT_TOWN_VV1'] = 'Please Enter Resturent Town Name';
$lang_resource['RESTURENT_POSTCODE_VV1'] = 'Please Enter Resturent Postcode Number';
$lang_resource['RESTURENT_CNO_VV1'] = 'Please Enter Collection Time';
$lang_resource['RESTURENT_CHK_VV1'] = 'Please Confirm You have paid for the order in full ';

$lang_resource['REQUEST_COLLECTION_SEARCH_RESULT'] = 'SEARCH RESULT ';
$lang_resource['REQUEST_COLLECTION_SEARCH_AGAIN'] = 'SEARCH AGAIN ';
$lang_resource['REQUEST_COLLECTION_Faliour_MSG'] = 'Your collection is not within our delivery location';
$lang_resource['REQUEST_COLLECTION_Faliour_MSG1'] = 'Your collection  is not within our delivery time';
$lang_resource['REQUEST_COLLECTION_AND'] = '  AND ';
$lang_resource['FRONT_MAIN_EMAIL_RESTRENT_DETAILS'] = 'Resturent Details';
$lang_resource['REQUEST_COLLECTION_DELIVERY_FEE'] = 'Delivery Fee';


$lang_resource['PAYMENT_GATEWAY_ALL_PXPAY_SAVE_SUCCESS'] = 'Express Payment Transaction Success';
$lang_resource['PAYMENT_GATEWAY_ALL_PXPAY_SAVE_FAILED'] = 'Express Payment Transaction Failed';

$lang_resource['PAYMENT_GATEWAY_ALL_MAKESKESKUS_SAVE_FAILED'] = 'Makeskeskus Payment Transaction Failed';
$lang_resource['PAYMENT_GATEWAY_ALL_MAKESKESKUS_SAVE_SCCESS'] = 'Makeskeskus Payment Transaction Success';


$lang_resource['PAYMENT_GATEWAY_ALL_VOUGEPAY_SAVE_SUCCESS'] = 'VougePay Payment Transaction Success';
$lang_resource['PAYMENT_GATEWAY_ALL_VOUGEPAY_SAVE_FAILED'] = 'VougePay Payment Transaction Failed';

//request collection end

$lang_resource['PAYMENT_GATEWAY_LOADING_TEXT'] = 'We are connecting, this could take a couple of seconds, please wait';
$lang_resource['PAYMENT_VOGUEPAY_PAY'] = 'VoguePay';

$lang_resource['PAYMENT_SKRILL_PAY'] = 'SKRILL';
$lang_resource['PAYMENT_GATEWAY_ALL_SKRILL_SAVE_SUCCESS'] = 'Skrill Payment Transaction Success';
$lang_resource['PAYMENT_GATEWAY_ALL_SKRILL_SAVE_FAILED'] = 'Skrill Payment Transaction Failed';

//Added on 22.07.2015
$lang_resource['MY_ACCOUNT_SEARCH'] = 'Search';


///FOR PAYMENT
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_CASH'] = 'Paid via Cash';
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_NOT_TRANSACTIUM'] = 'Not Paid By Transactium';
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_TRANSACTIUM'] = 'Paid via Transactium';
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYMENTEXPRESS'] = 'Paid via Paymentexpress';
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_MAKSEKESKUS'] = 'Paid via Maksekeskus';
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_VOGUEPAY'] = 'Paid via VoguePay';
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_SKRILL'] = 'Paid via Skrill';
$lang_resource['ORDER_EMAIL_TEMPLATE_PAID_VIA_PAYEEZY'] = 'Paid via Payeezy';
$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSATION_FAILED'] = 'Transaction Failed';
$lang_resource['ORDER_EMAIL_TEMPLATE_TRANSATION_SUCCESSFULL'] = 'Transaction Successfull';


//contact us
$lang_resource['CONTACTUS_TITLE'] = 'Contact Us';
$lang_resource['CONTACTUS_NAME'] = 'Name';
$lang_resource['CONTACTUS_ADDRESS'] = 'Address';
$lang_resource['CONTACTUS_EMAIL'] = 'Email';
$lang_resource['CONTACTUS_PHONE'] = 'Phone';
$lang_resource['CONTACTUS_SUBJECT'] = 'Subject';
$lang_resource['CONTACTUS_COMMENT'] = 'Comment';
$lang_resource['CONTACTUS_REQUEST'] = 'SUBMIT';
$lang_resource['CONTACTUS_DESCRIPTION'] = 'Description';
$lang_resource['CONTACTUS_NEW_CONTACTEMAIL'] = 'New Contact Email';
$lang_resource['CONTACTUS_DETAILS'] = 'Contact Details';
$lang_resource['CONTACTUS_SUCCESSMSG'] = 'Message sent!';
$lang_resource['CONTACTUS_EMAIL_ALART'] = 'Please provide a valid email address';
$lang_resource['CONTACTUS_CAPTCHA'] = 'Enter The Captcha Code';
$lang_resource['CONTACTUS_CAPTCHA_ALART'] = 'Plaese Enter The Correct Captcha!';

$lang_resource['CONTACTUS_REQUEST_CAN_NOT_READ'] = "Can not read the image? click";
$lang_resource['CONTACTUS_HERE'] = 'here';
$lang_resource['CONTACTUS_REFRESH'] = ' to refresh.';
$lang_resource['CONTACTUS_ENTER_CODE'] = 'Enter the code above here';
$lang_resource['CONTACTUS_VALIDATION_CODE'] = ' Validation code:';

//$lang_resource['CONTACTUS_RECEIVER_EMAIL'] = 'sales@orderingonlinesystem.com';



?>
