--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: w_account; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_account (
    id integer NOT NULL,
    billingtype integer DEFAULT (-1),
    name text,
    company text,
    address text,
    city text,
    state text,
    pcode text,
    country integer DEFAULT (-1),
    phone text,
    usr integer,
    cityname text,
    status integer DEFAULT 0,
    cardno text,
    month text,
    year text,
    cvvno text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_account OWNER TO oos_beta;

--
-- Name: w_account_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_account_id_seq OWNER TO oos_beta;

--
-- Name: w_ads; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_ads (
    id integer NOT NULL,
    link text,
    city integer,
    type integer,
    name text,
    enabled boolean DEFAULT true,
    "time" integer,
    hits integer DEFAULT 0,
    isimg integer DEFAULT 0,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_ads OWNER TO oos_beta;

--
-- Name: w_ads_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_ads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_ads_id_seq OWNER TO oos_beta;

--
-- Name: w_ads_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_ads_lang (
    id integer NOT NULL,
    ads_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_ads_lang OWNER TO oos_beta;

--
-- Name: w_ads_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_ads_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_ads_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_bringg_driver; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_bringg_driver (
    id integer,
    driver_id integer,
    company_id text,
    bringg_driver_id text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_bringg_driver OWNER TO oos_beta;

--
-- Name: w_business; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business (
    id integer NOT NULL,
    name text,
    street text,
    colony text,
    cp text,
    tel text,
    cel text,
    email text,
    categories text,
    location text,
    city integer,
    provider integer DEFAULT 2,
    enabled boolean DEFAULT true,
    zones text,
    acceptcard boolean DEFAULT false,
    opens text,
    closes text,
    buys integer DEFAULT 0,
    country integer,
    schedule text,
    mkeywords text,
    mdescription text,
    minimum text,
    paypal text,
    twiliophone text,
    twilioenabled boolean DEFAULT false,
    secretkey text,
    clientkey text,
    searchzip text,
    burl text,
    vatregistration text,
    invoiceaddress text,
    vatemail text,
    payby text,
    bankname text,
    bankac text,
    routineno text,
    swiftcode text,
    billingfxprice text,
    billingperorder text,
    billingperorderfixrate text,
    autoinvoiceday text,
    pdesc text,
    abusiness text,
    customslug text,
    isimg integer DEFAULT 0,
    vatpaypalemail text,
    promotion text,
    fixedrate text,
    otherrate text,
    vat text,
    is_active text DEFAULT 3,
    apk text,
    pfp text,
    cfp text,
    acceptcash boolean DEFAULT true,
    acceptpaypal boolean DEFAULT false,
    acceptmarco boolean DEFAULT false,
    anotherpayment boolean DEFAULT false,
    anotherpaymenttext text,
    isimgh text DEFAULT 0,
    environment text DEFAULT 0,
    merchant_id text,
    public_key text,
    private_key text,
    payment_type text DEFAULT 0,
    aplid text,
    tkey text,
    cardsaveid text,
    cardsavepass text,
    reorder boolean DEFAULT false,
    feature boolean DEFAULT false,
    acceptemail boolean DEFAULT true,
    acceptgprs boolean DEFAULT false,
    acceptsms boolean DEFAULT false,
    acceptinvoice boolean DEFAULT false,
    sameadd boolean DEFAULT false,
    acceptpaypaladaptive boolean DEFAULT false,
    acceptauthorize boolean DEFAULT false,
    acceptbraintree boolean DEFAULT false,
    paypal_type integer DEFAULT 0,
    mercury_id text,
    mercury_pass text,
    businesspagecustomtext text,
    printer_model text,
    acceptmercury boolean DEFAULT false,
    acceptworldpay boolean DEFAULT false,
    last_update_invoice timestamp without time zone,
    accepttransactium boolean DEFAULT false,
    transactiumusername text,
    transactiumpass text,
    transactiumtag text,
    bringgcompanyid text,
    acceptpexpress boolean DEFAULT false,
    pexpressusername text,
    pexpresspass text,
    acceptmaksekeskus boolean DEFAULT false,
    maksekeskus_pay text,
    maksekeskus_shopid text,
    maksekeskus_secretkey text,
    paypalcurrency text,
    timezone text,
    currency text,
    tax text,
    taxtype integer,
    googleanalytic text,
    acceptvoguepay boolean DEFAULT false,
    vogue_pay text,
    vogue_merchant_id text,
    bringpermission integer DEFAULT 0,
    acceptskrill boolean DEFAULT false,
    skrillemail text,
    deliverytime text,
    pickuptime text,
    acceptpayeezy boolean DEFAULT false,
    payeezyapikey text,
    payeezyapisecret text,
    payeezyjssecurity text,
    payeezymerchant text,
    bringg_userid integer DEFAULT 0,
    bringg_password text,
    bringg_address text,
    bringg_username text,
    bringg_email text,
    bring_permission_type boolean DEFAULT false,
    bring_access_token_live text,
    bring_secret_key_live text,
    bring_access_token_test text,
    bring_secret_key_test text,
    review_status integer DEFAULT 0 NOT NULL,
    photo_upload_status integer DEFAULT 0 NOT NULL,
    bringg_company_id_test text,
    bringg_company_id_live text,
    bringg_company_name_live text,
    bringg_company_name_test text,
    bringg_key_type boolean DEFAULT false,
    acceptpayu boolean DEFAULT false,
    payumerchantkey text,
    payumerchantsalt text,
    payumerchantid text,
    is_popular boolean DEFAULT false,
    scriptid integer DEFAULT 0,
    emer_no text,
    acceptstripe boolean DEFAULT false,
    stripeapikey text,
    publishablekey text,
    stripe_pay text,
    acceptpaypalpro boolean DEFAULT false,
    p_api_username text,
    p_api_password text,
    p_api_signature text,
    paypalpro_pay text,
    paygistix_pay text,
    paygistix_username text,
    paygistix_password text,
    acceptpaygistix boolean DEFAULT false,
    express_service boolean DEFAULT false,
    acceptglobal boolean DEFAULT false,
    global_pay text,
    global_sresecureid text,
    global_password text,
    acceptbtrans boolean DEFAULT false,
    btrans_pay text DEFAULT 0,
    btrans_merchantname text,
    btrans_merchantnumber text,
    btrans_merchanttype text,
    btrans_merchantterminal text,
    emer_email text,
    expresscheck boolean DEFAULT false,
    expresscheckprice text,
    acceptbsa boolean DEFAULT false,
    bsapay text,
    bsachannels text,
    bsamerchantcode text,
    bsaterminal text,
    bsatransationtype text,
    bsacurrency text,
    acceptazul boolean DEFAULT false,
    azul_pay text,
    azul_merchantname text,
    azul_merchantid text,
    azul_merchanttype text,
    azul_authkey text,
    acceptquickpay boolean DEFAULT false,
    quick_pay text,
    quickpay_merchant text,
    quickpay_md5secret text,
    acceptpaynl boolean DEFAULT false,
    paynl_pay text,
    paynl_apitoken text,
    paynl_serviceid text,
    acceptzaakpay boolean DEFAULT false,
    zaakpay_pay text,
    zaakpay_merchantid text,
    zaakpay_secretkey text
);


ALTER TABLE public.w_business OWNER TO oos_beta;

--
-- Name: w_business_emer_no_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_emer_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_business_emer_no_seq OWNER TO oos_beta;

--
-- Name: w_business_emer_no_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_business_emer_no_seq OWNED BY w_business.emer_no;


--
-- Name: w_business_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_business_id_seq OWNER TO oos_beta;

--
-- Name: w_business_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business_lang (
    id integer NOT NULL,
    business_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    street_lang text NOT NULL,
    status boolean DEFAULT true,
    colony_lang text
);


ALTER TABLE public.w_business_lang OWNER TO oos_beta;

--
-- Name: w_business_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_business_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_business_meta_seo_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business_meta_seo_lang (
    id integer NOT NULL,
    business_id integer NOT NULL,
    lang_id integer NOT NULL,
    promotion_lang text,
    abusiness_lang text,
    status boolean DEFAULT true
);


ALTER TABLE public.w_business_meta_seo_lang OWNER TO oos_beta;

--
-- Name: w_business_meta_seo_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_meta_seo_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_business_meta_seo_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_business_photos; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business_photos (
    id integer NOT NULL,
    name text,
    email text,
    business_id integer,
    photos text,
    view_status boolean DEFAULT false,
    enabled boolean DEFAULT false,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_business_photos OWNER TO oos_beta;

--
-- Name: w_business_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;


ALTER TABLE public.w_business_photos_id_seq OWNER TO oos_beta;

--
-- Name: w_business_points; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business_points (
    id integer NOT NULL,
    business_id integer,
    point_type text,
    number_of_points integer,
    point_values integer,
    fb_point_values integer,
    twitter_point_values integer,
    enabled boolean DEFAULT true,
    date_of_creation date DEFAULT now(),
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_business_points OWNER TO oos_beta;

--
-- Name: w_business_points_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_points_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999999
    CACHE 1;


ALTER TABLE public.w_business_points_id_seq OWNER TO oos_beta;

--
-- Name: w_business_points_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_points_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999999
    CACHE 1;


ALTER TABLE public.w_business_points_seq OWNER TO oos_beta;

--
-- Name: w_business_widget_button; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business_widget_button (
    id integer NOT NULL,
    business_id integer,
    embeddedcode text,
    enabled boolean DEFAULT false,
    date date DEFAULT now(),
    name text
);


ALTER TABLE public.w_business_widget_button OWNER TO oos_beta;

--
-- Name: w_business_widget_button_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_widget_button_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999999999
    CACHE 1;


ALTER TABLE public.w_business_widget_button_id_seq OWNER TO oos_beta;

--
-- Name: w_business_widget_float; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business_widget_float (
    id integer NOT NULL,
    business_id integer NOT NULL,
    embeddedcode text,
    date date DEFAULT now(),
    enabled boolean DEFAULT false,
    name text
);


ALTER TABLE public.w_business_widget_float OWNER TO oos_beta;

--
-- Name: w_business_widget_float_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_widget_float_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999999999
    CACHE 1;


ALTER TABLE public.w_business_widget_float_id_seq OWNER TO oos_beta;

--
-- Name: w_business_widget_iframe; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_business_widget_iframe (
    id integer NOT NULL,
    business_id integer,
    embedded_code text,
    date date DEFAULT now(),
    enabled boolean DEFAULT false,
    name text
);


ALTER TABLE public.w_business_widget_iframe OWNER TO oos_beta;

--
-- Name: w_business_widget_iframe_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_business_widget_iframe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;


ALTER TABLE public.w_business_widget_iframe_id_seq OWNER TO oos_beta;

--
-- Name: w_categories; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_categories (
    id integer NOT NULL,
    name text,
    isimg integer DEFAULT 0,
    business integer,
    rank integer,
    enabled boolean DEFAULT true,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_categories OWNER TO oos_beta;

--
-- Name: w_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_categories_id_seq OWNER TO oos_beta;

--
-- Name: w_categories_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_categories_lang (
    id integer NOT NULL,
    categories_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true,
    business_id integer NOT NULL
);


ALTER TABLE public.w_categories_lang OWNER TO oos_beta;

--
-- Name: w_categories_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_categories_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_categories_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_checkout; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_checkout (
    id integer NOT NULL,
    field_name text NOT NULL,
    required boolean DEFAULT false NOT NULL,
    status boolean DEFAULT true NOT NULL,
    type text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_checkout OWNER TO oos_beta;

--
-- Name: w_checkout_field_name_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_checkout_field_name_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_checkout_field_name_seq OWNER TO oos_beta;

--
-- Name: w_checkout_field_name_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_checkout_field_name_seq OWNED BY w_checkout.field_name;


--
-- Name: w_config_unchanged; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_config_unchanged (
    id integer NOT NULL,
    name text,
    value text
);


ALTER TABLE public.w_config_unchanged OWNER TO oos_beta;

--
-- Name: w_config_unchanged_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_config_unchanged_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_config_unchanged_id_seq OWNER TO oos_beta;

--
-- Name: w_configs_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_configs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_configs_id_seq OWNER TO oos_beta;

--
-- Name: w_configs; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_configs (
    id integer DEFAULT nextval('w_configs_id_seq'::regclass) NOT NULL,
    name text,
    value text
);


ALTER TABLE public.w_configs OWNER TO oos_beta;

--
-- Name: w_configs_email; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_configs_email (
    id integer NOT NULL,
    name text,
    status boolean DEFAULT true,
    scriptid integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.w_configs_email OWNER TO oos_beta;

--
-- Name: w_configs_email_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_configs_email_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_configs_email_id_seq OWNER TO oos_beta;

--
-- Name: w_contactus; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_contactus (
    id integer NOT NULL,
    name text,
    address text,
    phoneno text,
    email text,
    subject text,
    comment text,
    scriptid integer DEFAULT 0,
    orderno integer
);


ALTER TABLE public.w_contactus OWNER TO oos_beta;

--
-- Name: w_contactus_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_contactus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_contactus_id_seq OWNER TO oos_beta;

--
-- Name: w_countries; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_countries (
    id integer NOT NULL,
    name text,
    scriptid integer DEFAULT 0,
    enabled boolean DEFAULT true
);


ALTER TABLE public.w_countries OWNER TO oos_beta;

--
-- Name: w_countries_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_countries_id_seq OWNER TO oos_beta;

--
-- Name: w_countries_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_countries_lang (
    id integer NOT NULL,
    country_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_countries_lang OWNER TO oos_beta;

--
-- Name: w_countries_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_countries_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.w_countries_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_delevery_neighborhood_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_delevery_neighborhood_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_delevery_neighborhood_id_seq OWNER TO oos_beta;

--
-- Name: w_delivary_neighborhood; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_delivary_neighborhood (
    id integer NOT NULL,
    zone_name text,
    delivery_price text,
    days text,
    business text,
    area text,
    schedule text,
    minimum_purchase text,
    enabled boolean DEFAULT true,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_delivary_neighborhood OWNER TO oos_beta;

--
-- Name: w_delivary_neighborhood_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_delivary_neighborhood_lang (
    id integer NOT NULL,
    neighborhood_id integer NOT NULL,
    lang_id integer NOT NULL,
    zone_name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_delivary_neighborhood_lang OWNER TO oos_beta;

--
-- Name: w_delivary_neighborhood_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_delivary_neighborhood_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_delivary_neighborhood_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_deliverycity; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_deliverycity (
    id integer NOT NULL,
    businessid integer,
    delcity text,
    citydelivery_fee text,
    citydelivery_minper text,
    citydelivery_minperfree text,
    enabled boolean DEFAULT true,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_deliverycity OWNER TO oos_beta;

--
-- Name: w_deliverycity_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliverycity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_deliverycity_id_seq OWNER TO oos_beta;

--
-- Name: w_deliverykm; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_deliverykm (
    id integer NOT NULL,
    business text,
    servearea text,
    maxallow text,
    enabled boolean DEFAULT true,
    name text,
    businessid integer,
    businessinsertid integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_deliverykm OWNER TO oos_beta;

--
-- Name: TABLE w_deliverykm; Type: COMMENT; Schema: public; Owner: oos_beta
--

COMMENT ON TABLE w_deliverykm IS 'km wise calculation';


--
-- Name: w_deliverykm_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_deliverykm_lang (
    id integer NOT NULL,
    deliverykm_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_deliverykm_lang OWNER TO oos_beta;

--
-- Name: w_deliverykm_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliverykm_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_deliverykm_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_deliveryzone (
    id integer NOT NULL,
    zonename text,
    location text,
    deliveryprice text,
    business text,
    address text,
    minpurchase text,
    schedule text,
    days text,
    enabled boolean DEFAULT true,
    businessid integer,
    businessinsertid integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_deliveryzone OWNER TO oos_beta;

--
-- Name: w_deliveryzone_address_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_address_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_address_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_address_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_address_seq OWNED BY w_deliveryzone.address;


--
-- Name: w_deliveryzone_business_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_business_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_business_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_business_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_business_seq OWNED BY w_deliveryzone.business;


--
-- Name: w_deliveryzone_days_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_days_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_days_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_days_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_days_seq OWNED BY w_deliveryzone.days;


--
-- Name: w_deliveryzone_deliveryprice_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_deliveryprice_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_deliveryprice_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_deliveryprice_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_deliveryprice_seq OWNED BY w_deliveryzone.deliveryprice;


--
-- Name: w_deliveryzone_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_id_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_id_seq OWNED BY w_deliveryzone.id;


--
-- Name: w_deliveryzone_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_deliveryzone_lang (
    id integer NOT NULL,
    deliveryzone_id integer NOT NULL,
    lang_id integer NOT NULL,
    zonename_lang text NOT NULL,
    address_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_deliveryzone_lang OWNER TO oos_beta;

--
-- Name: w_deliveryzone_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_deliveryzone_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_location_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_location_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_location_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_location_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_location_seq OWNED BY w_deliveryzone.location;


--
-- Name: w_deliveryzone_minpurchase_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_minpurchase_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_minpurchase_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_minpurchase_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_minpurchase_seq OWNED BY w_deliveryzone.minpurchase;


--
-- Name: w_deliveryzone_schedule_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_schedule_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_schedule_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_schedule_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_schedule_seq OWNED BY w_deliveryzone.schedule;


--
-- Name: w_deliveryzone_zonename_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_deliveryzone_zonename_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_deliveryzone_zonename_seq OWNER TO oos_beta;

--
-- Name: w_deliveryzone_zonename_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_deliveryzone_zonename_seq OWNED BY w_deliveryzone.zonename;


--
-- Name: w_discount; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_discount (
    id integer NOT NULL,
    code text,
    business text,
    hits integer DEFAULT 0,
    commonrate text,
    maxallow integer DEFAULT 0,
    validdays integer,
    payby integer,
    expirydate date,
    enabled boolean DEFAULT true,
    "effectDate" integer,
    currentdate date,
    minshop text DEFAULT 0,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_discount OWNER TO oos_beta;

--
-- Name: TABLE w_discount; Type: COMMENT; Schema: public; Owner: oos_beta
--

COMMENT ON TABLE w_discount IS 'discount code';


--
-- Name: w_discountoffer; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_discountoffer (
    id integer NOT NULL,
    discountype integer DEFAULT 1,
    rate double precision DEFAULT 0,
    minshop integer,
    startdate date,
    enddate date,
    validdays integer,
    createdate date,
    discounttext text,
    accept boolean DEFAULT false,
    business integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_discountoffer OWNER TO oos_beta;

--
-- Name: w_discountoffer_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_discountoffer_lang (
    id integer NOT NULL,
    disoffer_id integer NOT NULL,
    lang_id integer NOT NULL,
    discounttext_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_discountoffer_lang OWNER TO oos_beta;

--
-- Name: w_discountoffer_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_discountoffer_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_discountoffer_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_dishes; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_dishes (
    id integer NOT NULL,
    description text,
    ingredients text,
    extras text,
    price text,
    business integer,
    category integer,
    name text,
    enabled boolean DEFAULT true,
    isimg integer DEFAULT 0,
    isimg2 integer DEFAULT 0,
    isimg3 integer DEFAULT 0,
    feature boolean DEFAULT false,
    rank_cat integer DEFAULT 0,
    points text,
    scriptid integer DEFAULT 0,
    seller_winelibary text,
    origin_winelibary text,
    subcategory text,
    deliveryprice text,
    stock_qty integer DEFAULT 0
);


ALTER TABLE public.w_dishes OWNER TO oos_beta;

--
-- Name: w_dishes_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_dishes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_dishes_id_seq OWNER TO oos_beta;

--
-- Name: w_dishes_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_dishes_lang (
    id integer NOT NULL,
    dishes_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    description_lang text NOT NULL,
    status boolean DEFAULT true,
    origin_winelibary_lang text,
    seller_winelibary_lang text
);


ALTER TABLE public.w_dishes_lang OWNER TO oos_beta;

--
-- Name: w_dishes_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_dishes_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999999999
    CACHE 1;


ALTER TABLE public.w_dishes_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_driver; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_driver (
    id integer NOT NULL,
    group_id integer,
    name text,
    lastname text,
    email text,
    address text,
    zip text,
    mobile text,
    enabled boolean DEFAULT true,
    country integer,
    city integer,
    background text,
    gprs_url text,
    delivering_orders integer,
    pwd text,
    usr integer,
    bringg_driverid text DEFAULT 0,
    bringg_company_id text DEFAULT 0,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_driver OWNER TO oos_beta;

--
-- Name: w_driver_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_driver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_driver_id_seq OWNER TO oos_beta;

--
-- Name: w_driver_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_driver_lang (
    id integer NOT NULL,
    driver_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    lastname_lang text NOT NULL,
    address_lang text NOT NULL,
    background_lang text,
    status boolean DEFAULT true
);


ALTER TABLE public.w_driver_lang OWNER TO oos_beta;

--
-- Name: w_driver_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_driver_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_driver_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_drivergroup; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_drivergroup (
    id integer NOT NULL,
    drivermanager_id integer,
    group_name text,
    per_day text,
    per_month text,
    per_year text,
    com_rate double precision,
    business text,
    enabled boolean DEFAULT true,
    com_rate1 double precision,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_drivergroup OWNER TO oos_beta;

--
-- Name: w_drivergroup_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_drivergroup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_drivergroup_id_seq OWNER TO oos_beta;

--
-- Name: w_drivergroup_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_drivergroup_lang (
    id integer NOT NULL,
    drivergroup_id integer NOT NULL,
    lang_id integer NOT NULL,
    group_name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_drivergroup_lang OWNER TO oos_beta;

--
-- Name: w_drivergroup_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_drivergroup_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_drivergroup_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_drivermanager; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_drivermanager (
    id integer NOT NULL,
    name text,
    lastname text,
    email text,
    address text,
    cp text,
    country integer,
    city integer,
    cel text,
    enabled boolean DEFAULT true,
    pwd text,
    usr integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_drivermanager OWNER TO oos_beta;

--
-- Name: w_drivermanager_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_drivermanager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_drivermanager_id_seq OWNER TO oos_beta;

--
-- Name: w_drivermanager_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_drivermanager_lang (
    id integer NOT NULL,
    drivermanager_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    lastname_lang text NOT NULL,
    address_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_drivermanager_lang OWNER TO oos_beta;

--
-- Name: w_drivermanager_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_drivermanager_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_drivermanager_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_extras; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_extras (
    id integer NOT NULL,
    name text,
    description text,
    price text,
    business integer,
    enabled boolean DEFAULT true,
    set text,
    mrank integer,
    text_to_end_user text,
    qty integer DEFAULT 0 NOT NULL,
    person integer DEFAULT 0 NOT NULL,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_extras OWNER TO oos_beta;

--
-- Name: w_extras_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_extras_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_extras_id_seq OWNER TO oos_beta;

--
-- Name: w_extras_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_extras_lang (
    id integer NOT NULL,
    extras_id integer NOT NULL,
    lang_id integer NOT NULL,
    set_lang text NOT NULL,
    text_to_end_user_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_extras_lang OWNER TO oos_beta;

--
-- Name: w_extras_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_extras_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_extras_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_extras_options; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_extras_options (
    id integer NOT NULL,
    set_id integer,
    option_id integer,
    option_name text,
    choice_name text,
    choice_id integer,
    with_respect_to text,
    conditional text,
    copy integer DEFAULT 0,
    price text,
    rank integer,
    option_text_to_end_user text,
    max_sel integer,
    min_sel integer,
    ingredients boolean DEFAULT false,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_extras_options OWNER TO oos_beta;

--
-- Name: w_extras_options_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_extras_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_extras_options_id_seq OWNER TO oos_beta;

--
-- Name: w_extras_options_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_extras_options_lang (
    id integer NOT NULL,
    extras_options_id integer NOT NULL,
    lang_id integer NOT NULL,
    option_name_lang text NOT NULL,
    option_text_to_end_user_lang text,
    status boolean DEFAULT true,
    choice_name_lang text,
    extras_choice_id integer,
    extras_id integer
);


ALTER TABLE public.w_extras_options_lang OWNER TO oos_beta;

--
-- Name: w_extras_options_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_extras_options_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_extras_options_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_favbus; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_favbus (
    id integer,
    bid integer,
    badd text,
    usr integer,
    bname text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_favbus OWNER TO oos_beta;

--
-- Name: w_favbus_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_favbus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 30;


ALTER TABLE public.w_favbus_id_seq OWNER TO oos_beta;

--
-- Name: w_footer; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_footer (
    id integer,
    pagename text,
    pageurl text,
    enabled boolean DEFAULT true,
    type text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_footer OWNER TO oos_beta;

--
-- Name: w_footer_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_footer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_footer_id_seq OWNER TO oos_beta;

--
-- Name: w_footer_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_footer_lang (
    id integer NOT NULL,
    footer_id integer NOT NULL,
    lang_id integer NOT NULL,
    pagename_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_footer_lang OWNER TO oos_beta;

--
-- Name: w_footer_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_footer_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_footer_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_footercms; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_footercms (
    id integer NOT NULL,
    pagetitle text,
    pageheading text,
    pagecontent text,
    enabled boolean DEFAULT true,
    type text,
    metakeyword text,
    metacontent text,
    customurl text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_footercms OWNER TO oos_beta;

--
-- Name: w_footercms_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_footercms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_footercms_id_seq OWNER TO oos_beta;

--
-- Name: w_footercms_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_footercms_lang (
    id integer NOT NULL,
    footercms_id integer NOT NULL,
    lang_id integer NOT NULL,
    pagetitle_lang text NOT NULL,
    pageheading_lang text NOT NULL,
    pagecontent_lang text,
    metakeyword_lang text NOT NULL,
    metacontent_lang text NOT NULL,
    customurl_lang text,
    status boolean DEFAULT true
);


ALTER TABLE public.w_footercms_lang OWNER TO oos_beta;

--
-- Name: w_footercms_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_footercms_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_footercms_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_franchises; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_franchises (
    id integer NOT NULL,
    city text,
    admin integer,
    enabled boolean DEFAULT true,
    email text,
    country integer NOT NULL,
    ga text,
    timezone text,
    currency text,
    tax text,
    taxtype text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_franchises OWNER TO oos_beta;

--
-- Name: w_franchises_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_franchises_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_franchises_id_seq OWNER TO oos_beta;

--
-- Name: w_franchises_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_franchises_lang (
    id integer NOT NULL,
    city_id integer NOT NULL,
    lang_id integer NOT NULL,
    city_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_franchises_lang OWNER TO oos_beta;

--
-- Name: w_franchises_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_franchises_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_franchises_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_frontsettings; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_frontsettings (
    id integer NOT NULL,
    countrytag text DEFAULT (-1),
    citytag text DEFAULT (-1),
    restaurant text DEFAULT (-1),
    browse_per_city boolean DEFAULT true,
    popular_restaurant boolean DEFAULT true,
    popular_cuisine boolean DEFAULT true,
    map_posititon boolean DEFAULT true,
    business_owner_register boolean DEFAULT false,
    product_image boolean DEFAULT false,
    slider_duration integer,
    sildersetiings boolean DEFAULT false,
    reviewsetting boolean DEFAULT false,
    emailsettings boolean DEFAULT false,
    cityhomepage boolean DEFAULT false,
    homedefaultcity text,
    how_it_works boolean DEFAULT true,
    foodof_the_week boolean DEFAULT true,
    recent_orders boolean DEFAULT true,
    lets_be_friends boolean DEFAULT true,
    amazing_apps boolean DEFAULT true
);


ALTER TABLE public.w_frontsettings OWNER TO oos_beta;

--
-- Name: w_frontsettings_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_frontsettings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_frontsettings_id_seq OWNER TO oos_beta;

--
-- Name: w_gallery; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_gallery (
    id integer NOT NULL,
    name text,
    enabled boolean DEFAULT true,
    hit integer DEFAULT 0,
    link text,
    type integer,
    business integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_gallery OWNER TO oos_beta;

--
-- Name: w_gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_gallery_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999
    CACHE 1;


ALTER TABLE public.w_gallery_id_seq OWNER TO oos_beta;

--
-- Name: w_gallery_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_gallery_lang (
    id integer NOT NULL,
    gallery_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_gallery_lang OWNER TO oos_beta;

--
-- Name: w_gallery_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_gallery_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_gallery_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_gcm; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_gcm (
    id integer NOT NULL,
    user_id integer NOT NULL,
    gcm_id text NOT NULL,
    login_status integer DEFAULT 1 NOT NULL,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_gcm OWNER TO oos_beta;

--
-- Name: w_invoice; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_invoice (
    id integer NOT NULL,
    date timestamp without time zone,
    city integer,
    resturant text,
    status integer DEFAULT 0,
    total_invoice text,
    businessi integer,
    billing integer,
    setuprate text,
    fixedrate text,
    perordercommission text,
    perorderfixedrate text,
    otherrate text,
    dfrm date,
    tfrm date,
    totalorder integer,
    orderid text,
    count text,
    total text,
    vat text,
    invoicepay text,
    admin_comment text,
    comment text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_invoice OWNER TO oos_beta;

--
-- Name: w_invoice_fixedrate_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_invoice_fixedrate_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_invoice_fixedrate_seq OWNER TO oos_beta;

--
-- Name: w_invoice_fixedrate_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oos_beta
--

ALTER SEQUENCE w_invoice_fixedrate_seq OWNED BY w_invoice.fixedrate;


--
-- Name: w_invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_invoice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_invoice_id_seq OWNER TO oos_beta;

--
-- Name: w_invoiceconf; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_invoiceconf (
    id integer NOT NULL,
    wbmail text,
    wurl text,
    address text,
    phone text,
    payby integer,
    bankname text,
    bankac text,
    routineno text,
    swiftcode text,
    vatpaypalemail text,
    ctext text,
    isimg integer DEFAULT 0,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_invoiceconf OWNER TO oos_beta;

--
-- Name: w_invoiceconf_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_invoiceconf_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2
    CACHE 1;


ALTER TABLE public.w_invoiceconf_id_seq OWNER TO oos_beta;

--
-- Name: w_landing_page_settings; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_landing_page_settings (
    id integer NOT NULL,
    page_title text NOT NULL,
    page_heading text NOT NULL,
    background_image text NOT NULL,
    page_content text,
    name text NOT NULL,
    email text NOT NULL,
    postcode text NOT NULL,
    terms_conditions text NOT NULL,
    name_enabled boolean DEFAULT true,
    email_enabled boolean DEFAULT true,
    postcode_enabled boolean DEFAULT true,
    terms_conditions_enabled boolean DEFAULT true,
    mailchimp_api text NOT NULL,
    mailchimp_listid text NOT NULL,
    jscode text NOT NULL,
    home_page_of_system boolean,
    unique_url text NOT NULL,
    meta_keyword text NOT NULL,
    meta_content text NOT NULL,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_landing_page_settings OWNER TO oos_beta;

--
-- Name: w_landing_page_settings_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_landing_page_settings_lang (
    id integer NOT NULL,
    landing_settings_id integer NOT NULL,
    lang_id integer NOT NULL,
    pagetittle_lang text NOT NULL,
    page_heading_lang text NOT NULL,
    name_lang text NOT NULL,
    email_lang text NOT NULL,
    postcode_lang text NOT NULL,
    terms_conditions_lang text NOT NULL,
    status boolean DEFAULT true,
    metakeyword_lang text,
    metacontent_lang text
);


ALTER TABLE public.w_landing_page_settings_lang OWNER TO oos_beta;

--
-- Name: w_landing_page_settings_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_landing_page_settings_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999999
    CACHE 1;


ALTER TABLE public.w_landing_page_settings_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_lang_admin; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_lang_admin (
    id integer NOT NULL,
    lang_key text,
    enabled boolean DEFAULT true,
    langid integer,
    langtext_1 text,
    langtext_2 text,
    langtext_3 text,
    langtext_4 text,
    langtext_5 text,
    langtext_6 text,
    langtext_7 text,
    langtext_8 text,
    langtext_9 text,
    langtext_10 text,
    langtext_11 text,
    langtext_12 text,
    langtext_13 text,
    langtext_14 text,
    langtext_15 text,
    langtext_16 text,
    langtext_17 text,
    langtext_18 text,
    langtext_19 text,
    langtext_20 text,
    langtext_21 text,
    langtext_22 text,
    langtext_23 text,
    langtext_24 text,
    langtext_25 text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_lang_admin OWNER TO oos_beta;

--
-- Name: w_lang_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_lang_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_lang_admin_id_seq OWNER TO oos_beta;

--
-- Name: w_lang_setting; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_lang_setting (
    id integer NOT NULL,
    lang_text text,
    opdefault integer,
    enabled boolean DEFAULT true,
    lang_short_code text,
    isimg integer DEFAULT 0
);


ALTER TABLE public.w_lang_setting OWNER TO oos_beta;

--
-- Name: w_lang_setting_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_lang_setting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999
    CACHE 1;


ALTER TABLE public.w_lang_setting_id_seq OWNER TO oos_beta;

--
-- Name: w_lang_static; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_lang_static (
    id integer NOT NULL,
    lang_key text,
    enabled boolean DEFAULT true,
    langid integer,
    langtext_1 text,
    langtext_2 text,
    langtext_3 text,
    langtext_4 text,
    langtext_5 text,
    langtext_6 text,
    langtext_7 text,
    langtext_8 text,
    langtext_9 text,
    langtext_10 text,
    langtext_11 text,
    langtext_12 text,
    langtext_13 text,
    langtext_14 text,
    langtext_15 text,
    langtext_16 text,
    langtext_17 text,
    langtext_18 text,
    langtext_19 text,
    langtext_20 text,
    langtext_21 text,
    langtext_22 text,
    langtext_23 text,
    langtext_24 text,
    langtext_25 text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_lang_static OWNER TO oos_beta;

--
-- Name: w_lang_static_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_lang_static_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999
    CACHE 1;


ALTER TABLE public.w_lang_static_id_seq OWNER TO oos_beta;

--
-- Name: w_makepayment; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_makepayment (
    id integer NOT NULL,
    business_id integer,
    invoice_id integer,
    invoicepay text,
    total_invoiceitem text,
    payment text,
    pdue text,
    date date,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_makepayment OWNER TO oos_beta;

--
-- Name: w_makepayment_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_makepayment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_makepayment_id_seq OWNER TO oos_beta;

--
-- Name: w_menus; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_menus (
    id integer NOT NULL,
    days text,
    dishes text,
    comments text,
    business integer,
    name text,
    enabled boolean DEFAULT true,
    schedule text,
    pickup boolean DEFAULT false,
    delivery boolean DEFAULT false,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_menus OWNER TO oos_beta;

--
-- Name: w_menus_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_menus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_menus_id_seq OWNER TO oos_beta;

--
-- Name: w_menus_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_menus_lang (
    id integer NOT NULL,
    menus_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    comments_lang text,
    status boolean DEFAULT true
);


ALTER TABLE public.w_menus_lang OWNER TO oos_beta;

--
-- Name: w_menus_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_menus_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_menus_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_neighborhood; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_neighborhood (
    id integer NOT NULL,
    country integer,
    city integer,
    name text,
    enabled boolean DEFAULT true,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_neighborhood OWNER TO oos_beta;

--
-- Name: w_neighborhood_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_neighborhood_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_neighborhood_id_seq OWNER TO oos_beta;

--
-- Name: w_neighborhood_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_neighborhood_lang (
    id integer NOT NULL,
    neighborhood_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_neighborhood_lang OWNER TO oos_beta;

--
-- Name: w_neighborhood_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_neighborhood_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_neighborhood_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_order_request; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_order_request (
    id integer NOT NULL,
    order_id integer NOT NULL,
    name text,
    phone text,
    address text,
    postcode text,
    collectiontime text,
    notes text,
    date timestamp without time zone,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_order_request OWNER TO oos_beta;

--
-- Name: w_order_request_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_order_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;


ALTER TABLE public.w_order_request_id_seq OWNER TO oos_beta;

--
-- Name: w_orders; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_orders (
    id integer NOT NULL,
    data text,
    usr integer DEFAULT (-1),
    date timestamp without time zone,
    recentdata text,
    status integer DEFAULT 0,
    comment text,
    twilioenabled boolean,
    paypalinfo text,
    driver_id integer DEFAULT 0,
    invoicestatus integer DEFAULT 0,
    driver_comment text,
    printer_comment text,
    printer_stime text,
    a_trnx_code text,
    a_trnx_statement text,
    merchantval text,
    soundstatus integer DEFAULT 0,
    paypaltx text,
    collection_id text,
    bringg_order_id integer DEFAULT 0,
    bringg_customer_id text,
    transactium_tid text,
    transactium_status text,
    requestcollectiondata text,
    px_result text,
    px_userid text,
    bringg_company_id text,
    driver_bring_id text,
    bringg_access_token text,
    bringg_secret_token text,
    deliverytime text,
    request_collection boolean DEFAULT false,
    parent_id text DEFAULT 0,
    scriptid integer DEFAULT 0,
    stripe_result text,
    payu_result text,
    payeezy_result text,
    paypalpro_result text,
    global_result text,
    btrans_result text,
    bsa_result text,
    azul_result text,
    quickpay_result text,
    paynl_result text,
    zaakpay_result text
);


ALTER TABLE public.w_orders OWNER TO oos_beta;

--
-- Name: w_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_orders_id_seq OWNER TO oos_beta;

--
-- Name: w_paymentgateway; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_paymentgateway (
    id integer NOT NULL,
    name text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_paymentgateway OWNER TO oos_beta;

--
-- Name: w_paymentgateway_details; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_paymentgateway_details (
    id integer NOT NULL,
    paymentgateway_id integer DEFAULT 0,
    business_id integer DEFAULT 0,
    user_type integer DEFAULT 0,
    credential text,
    enabled text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_paymentgateway_details OWNER TO oos_beta;

--
-- Name: w_paymentgateway_details_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_paymentgateway_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_paymentgateway_details_id_seq OWNER TO oos_beta;

--
-- Name: w_paypal_payments; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_paypal_payments (
    id integer NOT NULL,
    itemid text,
    taken boolean DEFAULT false,
    date timestamp without time zone,
    orderid integer DEFAULT 0,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_paypal_payments OWNER TO oos_beta;

--
-- Name: w_paypal_payments_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_paypal_payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_paypal_payments_id_seq OWNER TO oos_beta;

--
-- Name: w_printer_model; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_printer_model (
    id text NOT NULL,
    model_name text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_printer_model OWNER TO oos_beta;

--
-- Name: w_printer_model_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_printer_model_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_printer_model_id_seq OWNER TO oos_beta;

--
-- Name: w_printerpath; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_printerpath (
    id integer NOT NULL,
    path integer,
    printer_restaurant text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_printerpath OWNER TO oos_beta;

--
-- Name: w_printerpath_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_printerpath_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_printerpath_id_seq OWNER TO oos_beta;

--
-- Name: w_reg_users_data; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_reg_users_data (
    id integer NOT NULL,
    name text NOT NULL,
    postcode text,
    email text NOT NULL
);


ALTER TABLE public.w_reg_users_data OWNER TO oos_beta;

--
-- Name: w_reg_users_data_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_reg_users_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;


ALTER TABLE public.w_reg_users_data_id_seq OWNER TO oos_beta;

--
-- Name: w_requestcollectiondeliveryfee; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_requestcollectiondeliveryfee (
    id integer NOT NULL,
    distanceto integer,
    distancefrom integer,
    price double precision,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_requestcollectiondeliveryfee OWNER TO oos_beta;

--
-- Name: w_requestcollectiondeliveryfee_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_requestcollectiondeliveryfee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 100000
    CACHE 1;


ALTER TABLE public.w_requestcollectiondeliveryfee_id_seq OWNER TO oos_beta;

--
-- Name: w_reserve; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_reserve (
    id integer NOT NULL,
    days text,
    schedule text,
    rtype integer,
    guest integer,
    duration text,
    name text,
    enabled boolean DEFAULT true,
    business integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_reserve OWNER TO oos_beta;

--
-- Name: w_reserve_book_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_reserve_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_reserve_book_id_seq OWNER TO oos_beta;

--
-- Name: w_reserve_book; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_reserve_book (
    id integer DEFAULT nextval('w_reserve_book_id_seq'::regclass) NOT NULL,
    rtype integer,
    business integer,
    booked text,
    rid text,
    date text,
    "time" text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_reserve_book OWNER TO oos_beta;

--
-- Name: w_reserve_chart; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_reserve_chart (
    id integer NOT NULL,
    rtype integer,
    price text,
    business integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_reserve_chart OWNER TO oos_beta;

--
-- Name: w_reserve_chart_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_reserve_chart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_reserve_chart_id_seq OWNER TO oos_beta;

--
-- Name: w_reserve_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_reserve_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_reserve_id_seq OWNER TO oos_beta;

--
-- Name: w_reserve_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_reserve_lang (
    id integer NOT NULL,
    reserve_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.w_reserve_lang OWNER TO oos_beta;

--
-- Name: w_reserve_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_reserve_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_reserve_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_review; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_review (
    id integer NOT NULL,
    id_w_business integer NOT NULL,
    id_order integer DEFAULT 0,
    quality integer DEFAULT 0,
    delivery integer DEFAULT 0,
    dealer integer DEFAULT 0,
    package integer DEFAULT 0,
    date date DEFAULT now(),
    usr integer DEFAULT (-1),
    name text,
    email text,
    city integer,
    comment text,
    status boolean DEFAULT false,
    view_status boolean DEFAULT false,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_review OWNER TO oos_beta;

--
-- Name: w_review_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_review_id_seq OWNER TO oos_beta;

--
-- Name: w_search_statistic; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_search_statistic (
    id integer NOT NULL,
    city text,
    country text,
    zipcode text,
    address text,
    hit integer,
    point text,
    session_id text,
    confirm_order integer,
    status integer,
    categories text,
    date date,
    result text,
    resturant text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_search_statistic OWNER TO oos_beta;

--
-- Name: w_search_statistic_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_search_statistic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_search_statistic_id_seq OWNER TO oos_beta;

--
-- Name: w_splitpaymain; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_splitpaymain (
    id integer,
    splitcase integer,
    com_per double precision,
    com_rate double precision,
    tax integer,
    applytax integer,
    citytax double precision,
    custom double precision,
    usr integer DEFAULT 0,
    bus_id integer,
    paymail integer,
    payadaptivemail text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_splitpaymain OWNER TO oos_beta;

--
-- Name: w_splitpaymain_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_splitpaymain_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_splitpaymain_id_seq OWNER TO oos_beta;

--
-- Name: w_subcategories; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_subcategories (
    id integer NOT NULL,
    name text,
    category integer,
    business integer,
    scriptid integer DEFAULT 0,
    enabled boolean DEFAULT true
);


ALTER TABLE public.w_subcategories OWNER TO oos_beta;

--
-- Name: w_subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_subcategories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_subcategories_id_seq OWNER TO oos_beta;

--
-- Name: w_subcategories_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_subcategories_lang (
    id integer NOT NULL,
    subcategories_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text NOT NULL,
    status boolean DEFAULT true,
    business_id integer
);


ALTER TABLE public.w_subcategories_lang OWNER TO oos_beta;

--
-- Name: w_subcategories_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_subcategories_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_subcategories_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_switch_config; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_switch_config (
    id integer NOT NULL,
    name text,
    value text
);


ALTER TABLE public.w_switch_config OWNER TO oos_beta;

--
-- Name: w_switch_script; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_switch_script (
    id integer NOT NULL,
    name text NOT NULL,
    enabled boolean DEFAULT false NOT NULL
);


ALTER TABLE public.w_switch_script OWNER TO oos_beta;

--
-- Name: w_switch_script_theme; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_switch_script_theme (
    id integer NOT NULL,
    name text,
    type integer DEFAULT 1 NOT NULL,
    script_type integer NOT NULL,
    is_admin boolean DEFAULT false,
    enabled boolean DEFAULT false,
    is_device integer DEFAULT 1,
    is_separate integer DEFAULT 0
);


ALTER TABLE public.w_switch_script_theme OWNER TO oos_beta;

--
-- Name: COLUMN w_switch_script_theme.type; Type: COMMENT; Schema: public; Owner: oos_beta
--

COMMENT ON COLUMN w_switch_script_theme.type IS ' "2" for Responsive, "1" for Desktop & Mobile';


--
-- Name: COLUMN w_switch_script_theme.is_device; Type: COMMENT; Schema: public; Owner: oos_beta
--

COMMENT ON COLUMN w_switch_script_theme.is_device IS '"2" for Mobile, "1" for Desktop, "0" for Responsive';


--
-- Name: w_tabsettings; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_tabsettings (
    id integer NOT NULL,
    country integer,
    city integer,
    tab_delivery boolean DEFAULT true,
    tab_delivery_country boolean DEFAULT true,
    tab_delivery_city boolean DEFAULT true,
    tab_delivery_address boolean DEFAULT true,
    tab_delivery_option boolean DEFAULT true,
    tab_pickup boolean DEFAULT true,
    tab_pickup_country boolean DEFAULT true,
    tab_pickup_city boolean DEFAULT true,
    tab_pickup_option boolean DEFAULT true,
    tab_reservation boolean DEFAULT true,
    tab_reservation_country boolean DEFAULT true,
    tab_reservation_city boolean DEFAULT true,
    tab_reservation_option boolean DEFAULT true,
    list_step boolean DEFAULT true,
    tab_delivery_neighborhood boolean DEFAULT false,
    autocomplete boolean DEFAULT false,
    scriptid integer DEFAULT 0,
    search_city boolean DEFAULT false,
    gibberish boolean DEFAULT false
);


ALTER TABLE public.w_tabsettings OWNER TO oos_beta;

--
-- Name: w_tabsettings_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_tabsettings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_tabsettings_id_seq OWNER TO oos_beta;

--
-- Name: w_user_extras; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_user_extras (
    id integer,
    set_id integer,
    data text,
    user_id integer,
    quantity integer,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_user_extras OWNER TO oos_beta;

--
-- Name: w_user_extras_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_user_extras_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_user_extras_seq OWNER TO oos_beta;

--
-- Name: w_user_points; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_user_points (
    id integer NOT NULL,
    customer_id integer,
    business_id integer,
    order_id integer,
    points_received integer DEFAULT 0,
    points_used integer DEFAULT 0,
    date date DEFAULT now(),
    scriptid integer DEFAULT 0,
    price numeric
);


ALTER TABLE public.w_user_points OWNER TO oos_beta;

--
-- Name: w_user_points_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_user_points_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;


ALTER TABLE public.w_user_points_id_seq OWNER TO oos_beta;

--
-- Name: w_users; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_users (
    id integer NOT NULL,
    name text,
    lastname text,
    lastname2 text,
    email text,
    pwd text,
    street text,
    colony text,
    cp text,
    tel text,
    cel text,
    job text,
    location text,
    level integer DEFAULT 0,
    config text,
    city integer DEFAULT 0,
    fbid text,
    twid text,
    enabled boolean DEFAULT true,
    country integer DEFAULT 0,
    findfrom text,
    isimg integer DEFAULT 0,
    desire_url text,
    fav_feature text,
    i_am text,
    business_plan text,
    api text,
    extra_point_added_by_super_admin integer DEFAULT 0,
    scriptid integer DEFAULT 0,
    smscode text,
    userreference text,
    userday text,
    usermonth integer,
    useryear integer
);


ALTER TABLE public.w_users OWNER TO oos_beta;

--
-- Name: w_users_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.w_users_id_seq OWNER TO oos_beta;

--
-- Name: w_users_lang; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_users_lang (
    id integer NOT NULL,
    users_id integer NOT NULL,
    lang_id integer NOT NULL,
    name_lang text,
    lastname_lang text,
    lastname2_lang text,
    street_lang text,
    colony_lang text,
    job_lang text,
    status boolean DEFAULT true
);


ALTER TABLE public.w_users_lang OWNER TO oos_beta;

--
-- Name: w_users_lang_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_users_lang_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999
    CACHE 1;


ALTER TABLE public.w_users_lang_id_seq OWNER TO oos_beta;

--
-- Name: w_website_review; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_website_review (
    id integer NOT NULL,
    reviewsite integer DEFAULT 0,
    date date DEFAULT now(),
    usr integer DEFAULT (-1),
    name text,
    email text,
    comment text,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_website_review OWNER TO oos_beta;

--
-- Name: w_website_review_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_website_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999
    CACHE 1;


ALTER TABLE public.w_website_review_id_seq OWNER TO oos_beta;

--
-- Name: w_widget; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_widget (
    id integer NOT NULL,
    widget text,
    widget_name text,
    date date,
    scriptid integer,
    status boolean DEFAULT true
);


ALTER TABLE public.w_widget OWNER TO oos_beta;

--
-- Name: w_zipcode; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_zipcode (
    id integer NOT NULL,
    zipcode text,
    cost text,
    businessid integer,
    enabled boolean DEFAULT true,
    businessinsertid integer,
    scriptid integer DEFAULT 0,
    deliverytime text,
    minimumprice text
);


ALTER TABLE public.w_zipcode OWNER TO oos_beta;

--
-- Name: TABLE w_zipcode; Type: COMMENT; Schema: public; Owner: oos_beta
--

COMMENT ON TABLE w_zipcode IS 'zipcode';


--
-- Name: w_zipcode_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_zipcode_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.w_zipcode_id_seq OWNER TO oos_beta;

--
-- Name: w_zipcodevalidation; Type: TABLE; Schema: public; Owner: oos_beta; Tablespace: 
--

CREATE TABLE w_zipcodevalidation (
    id integer NOT NULL,
    length integer DEFAULT 0,
    "position" integer DEFAULT 0,
    value integer DEFAULT 0,
    scriptid integer DEFAULT 0
);


ALTER TABLE public.w_zipcodevalidation OWNER TO oos_beta;

--
-- Name: w_zipcodevalidation_id_seq; Type: SEQUENCE; Schema: public; Owner: oos_beta
--

CREATE SEQUENCE w_zipcodevalidation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999
    CACHE 1;


ALTER TABLE public.w_zipcodevalidation_id_seq OWNER TO oos_beta;

--
-- Name: deliverykm_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_deliverykm
    ADD CONSTRAINT deliverykm_pkey PRIMARY KEY (id);


--
-- Name: w_ads_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_ads_lang
    ADD CONSTRAINT w_ads_lang_pkey PRIMARY KEY (id);


--
-- Name: w_ads_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_ads
    ADD CONSTRAINT w_ads_pkey PRIMARY KEY (id);


--
-- Name: w_business_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business_lang
    ADD CONSTRAINT w_business_lang_pkey PRIMARY KEY (id);


--
-- Name: w_business_meta_seo_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business_meta_seo_lang
    ADD CONSTRAINT w_business_meta_seo_lang_pkey PRIMARY KEY (id);


--
-- Name: w_business_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business_photos
    ADD CONSTRAINT w_business_photos_pkey PRIMARY KEY (id);


--
-- Name: w_business_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business
    ADD CONSTRAINT w_business_pkey PRIMARY KEY (id);


--
-- Name: w_business_points_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business_points
    ADD CONSTRAINT w_business_points_pkey PRIMARY KEY (id);


--
-- Name: w_business_widget_button_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business_widget_button
    ADD CONSTRAINT w_business_widget_button_pkey PRIMARY KEY (id);


--
-- Name: w_business_widget_float_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business_widget_float
    ADD CONSTRAINT w_business_widget_float_pkey PRIMARY KEY (id);


--
-- Name: w_business_widget_iframe_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_business_widget_iframe
    ADD CONSTRAINT w_business_widget_iframe_pkey PRIMARY KEY (id);


--
-- Name: w_categories_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_categories_lang
    ADD CONSTRAINT w_categories_lang_pkey PRIMARY KEY (id);


--
-- Name: w_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_categories
    ADD CONSTRAINT w_categories_pkey PRIMARY KEY (id);


--
-- Name: w_checkout_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_checkout
    ADD CONSTRAINT w_checkout_pkey PRIMARY KEY (id);


--
-- Name: w_config_unchanged_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_config_unchanged
    ADD CONSTRAINT w_config_unchanged_pkey PRIMARY KEY (id);


--
-- Name: w_configs_email_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_configs_email
    ADD CONSTRAINT w_configs_email_pkey PRIMARY KEY (id);


--
-- Name: w_configs_name_key; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_configs
    ADD CONSTRAINT w_configs_name_key UNIQUE (name);


--
-- Name: w_configs_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_configs
    ADD CONSTRAINT w_configs_pkey PRIMARY KEY (id);


--
-- Name: w_contactus_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_contactus
    ADD CONSTRAINT w_contactus_pkey PRIMARY KEY (id);


--
-- Name: w_countries_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_countries_lang
    ADD CONSTRAINT w_countries_lang_pkey PRIMARY KEY (id);


--
-- Name: w_countries_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_countries
    ADD CONSTRAINT w_countries_pkey PRIMARY KEY (id);


--
-- Name: w_delivary_neighborhood_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_delivary_neighborhood_lang
    ADD CONSTRAINT w_delivary_neighborhood_lang_pkey PRIMARY KEY (id);


--
-- Name: w_deliverycity_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_deliverycity
    ADD CONSTRAINT w_deliverycity_pkey PRIMARY KEY (id);


--
-- Name: w_deliverykm_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_deliverykm_lang
    ADD CONSTRAINT w_deliverykm_lang_pkey PRIMARY KEY (id);


--
-- Name: w_deliveryzone_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_deliveryzone_lang
    ADD CONSTRAINT w_deliveryzone_lang_pkey PRIMARY KEY (id);



-- Name: w_deliveryzone_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_deliveryzone
    ADD CONSTRAINT w_deliveryzone_pkey PRIMARY KEY (id);

--
-- Name: w_discount_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_discount
    ADD CONSTRAINT w_discount_pkey PRIMARY KEY (id);


--
-- Name: w_discountoffer_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_discountoffer_lang
    ADD CONSTRAINT w_discountoffer_lang_pkey PRIMARY KEY (id);


--
-- Name: w_discountoffer_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_discountoffer
    ADD CONSTRAINT w_discountoffer_pkey PRIMARY KEY (id);


--
-- Name: w_dishes_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_dishes_lang
    ADD CONSTRAINT w_dishes_lang_pkey PRIMARY KEY (id);


--
-- Name: w_dishes_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_dishes
    ADD CONSTRAINT w_dishes_pkey PRIMARY KEY (id);


--
-- Name: w_driver_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_driver_lang
    ADD CONSTRAINT w_driver_lang_pkey PRIMARY KEY (id);


--
-- Name: w_driver_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_drivermanager
    ADD CONSTRAINT w_driver_pkey PRIMARY KEY (id);


--
-- Name: w_driver_pkey1; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_driver
    ADD CONSTRAINT w_driver_pkey1 PRIMARY KEY (id);


--
-- Name: w_drivergroup_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_drivergroup_lang
    ADD CONSTRAINT w_drivergroup_lang_pkey PRIMARY KEY (id);


--
-- Name: w_drivergroup_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_drivergroup
    ADD CONSTRAINT w_drivergroup_pkey PRIMARY KEY (id);


--
-- Name: w_drivermanager_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_drivermanager_lang
    ADD CONSTRAINT w_drivermanager_lang_pkey PRIMARY KEY (id);


--
-- Name: w_extras_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_extras
    ADD CONSTRAINT w_extras_pkey PRIMARY KEY (id);

ALTER TABLE ONLY w_extras_lang
    ADD CONSTRAINT w_extras_lang_pkey PRIMARY KEY (id);


--
-- Name: w_extras_options_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_extras_options
    ADD CONSTRAINT w_extras_options_pkey PRIMARY KEY (id);

--
-- Name: w_extras_options_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_extras_options_lang
    ADD CONSTRAINT w_extras_options_lang_pkey PRIMARY KEY (id);


--
-- Name: w_extras_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_extras
    ADD CONSTRAINT w_extras_pkey PRIMARY KEY (id);


--
-- Name: w_footer_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_footer_lang
    ADD CONSTRAINT w_footer_lang_pkey PRIMARY KEY (id);


--
-- Name: w_footercms_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_footercms_lang
    ADD CONSTRAINT w_footercms_lang_pkey PRIMARY KEY (id);


--
-- Name: w_footercms_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_footercms
    ADD CONSTRAINT w_footercms_pkey PRIMARY KEY (id);

    

--
-- Name: w_franchises_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_franchises_lang
    ADD CONSTRAINT w_franchises_lang_pkey PRIMARY KEY (id);


--
-- Name: w_franchises_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_franchises
    ADD CONSTRAINT w_franchises_pkey PRIMARY KEY (id);


--
-- Name: w_frontsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_frontsettings
    ADD CONSTRAINT w_frontsettings_pkey PRIMARY KEY (id);


--
-- Name: w_gallery_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_gallery_lang
    ADD CONSTRAINT w_gallery_lang_pkey PRIMARY KEY (id);


--
-- Name: w_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_gallery
    ADD CONSTRAINT w_gallery_pkey PRIMARY KEY (id);


--
-- Name: w_gcm_id_key; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_gcm
    ADD CONSTRAINT w_gcm_id_key UNIQUE (id);


--
-- Name: w_invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_invoice
    ADD CONSTRAINT w_invoice_pkey PRIMARY KEY (id);


--
-- Name: w_invoiceconf_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_invoiceconf
    ADD CONSTRAINT w_invoiceconf_pkey PRIMARY KEY (id);


--
-- Name: w_landing_page_settings_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_landing_page_settings_lang
    ADD CONSTRAINT w_landing_page_settings_lang_pkey PRIMARY KEY (id);


--
-- Name: w_landing_page_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_landing_page_settings
    ADD CONSTRAINT w_landing_page_settings_pkey PRIMARY KEY (id);


--
-- Name: w_makepayment_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_makepayment
    ADD CONSTRAINT w_makepayment_pkey PRIMARY KEY (id);


--
-- Name: w_menus_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_menus_lang
    ADD CONSTRAINT w_menus_lang_pkey PRIMARY KEY (id);


--
-- Name: w_menus_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_menus
    ADD CONSTRAINT w_menus_pkey PRIMARY KEY (id);


--
-- Name: w_neighborhood_country_city_name_key; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_neighborhood
    ADD CONSTRAINT w_neighborhood_country_city_name_key UNIQUE (country, city, name);


--
-- Name: w_neighborhood_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_neighborhood_lang
    ADD CONSTRAINT w_neighborhood_lang_pkey PRIMARY KEY (id);


--
-- Name: w_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_orders
    ADD CONSTRAINT w_orders_pkey PRIMARY KEY (id);


--
-- Name: w_paymentgateway_details_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_paymentgateway_details
    ADD CONSTRAINT w_paymentgateway_details_pkey PRIMARY KEY (id);


--
-- Name: w_paymentgateway_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_paymentgateway
    ADD CONSTRAINT w_paymentgateway_pkey PRIMARY KEY (id);


--
-- Name: w_paypal_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_paypal_payments
    ADD CONSTRAINT w_paypal_payments_pkey PRIMARY KEY (id);

ALTER TABLE ONLY w_printer_model
    ADD CONSTRAINT w_printer_model_pkey PRIMARY KEY (id);

--
-- Name: w_reg_users_data_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_reg_users_data
    ADD CONSTRAINT w_reg_users_data_pkey PRIMARY KEY (id);


--
-- Name: w_requestcollectiondeliveryfee_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_requestcollectiondeliveryfee
    ADD CONSTRAINT w_requestcollectiondeliveryfee_pkey PRIMARY KEY (id);


--
-- Name: w_reserve_book_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_reserve_book
    ADD CONSTRAINT w_reserve_book_pkey PRIMARY KEY (id);


--
-- Name: w_reserve_chart_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_reserve_chart
    ADD CONSTRAINT w_reserve_chart_pkey PRIMARY KEY (id);


--
-- Name: w_reserve_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_reserve_lang
    ADD CONSTRAINT w_reserve_lang_pkey PRIMARY KEY (id);


--
-- Name: w_reserve_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_reserve
    ADD CONSTRAINT w_reserve_pkey PRIMARY KEY (id);


--
-- Name: w_review_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_review
    ADD CONSTRAINT w_review_pkey PRIMARY KEY (id);


--
-- Name: w_subcategories_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_subcategories_lang
    ADD CONSTRAINT w_subcategories_lang_pkey PRIMARY KEY (id);


--
-- Name: w_subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_subcategories
    ADD CONSTRAINT w_subcategories_pkey PRIMARY KEY (id);


--
-- Name: w_switch_config_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_switch_config
    ADD CONSTRAINT w_switch_config_pkey PRIMARY KEY (id);


--
-- Name: w_switch_script_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_switch_script
    ADD CONSTRAINT w_switch_script_pkey PRIMARY KEY (id);


--
-- Name: w_switch_script_theme_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_switch_script_theme
    ADD CONSTRAINT w_switch_script_theme_pkey PRIMARY KEY (id);


--
-- Name: w_tabsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_tabsettings
    ADD CONSTRAINT w_tabsettings_pkey PRIMARY KEY (id);


--
-- Name: w_user_points_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_user_points
    ADD CONSTRAINT w_user_points_pkey PRIMARY KEY (id);


--
-- Name: w_users_email_key; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_users
    ADD CONSTRAINT w_users_email_key UNIQUE (email);


--
-- Name: w_users_lang_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_users_lang
    ADD CONSTRAINT w_users_lang_pkey PRIMARY KEY (id);


--
-- Name: w_users_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_users
    ADD CONSTRAINT w_users_pkey PRIMARY KEY (id);


--
-- Name: w_website_review_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_website_review
    ADD CONSTRAINT w_website_review_pkey PRIMARY KEY (id);


--
-- Name: w_widget_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_widget
    ADD CONSTRAINT w_widget_pkey PRIMARY KEY (id);

--
-- Name: w_zipcode_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_zipcode
    ADD CONSTRAINT w_zipcode_pkey PRIMARY KEY (id);


--
-- Name: w_zipcodevalidation_pkey; Type: CONSTRAINT; Schema: public; Owner: oos_beta; Tablespace: 
--

ALTER TABLE ONLY w_zipcodevalidation
    ADD CONSTRAINT w_zipcodevalidation_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: w_ads_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_ads_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_ads_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_ads_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_ads_id_seq TO oos_beta;


--
-- Name: w_business_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_business_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_business_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_business_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_business_id_seq TO oos_beta;


--
-- Name: w_categories_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_categories_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_categories_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_categories_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_categories_id_seq TO oos_beta;


--
-- Name: w_configs_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_configs_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_configs_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_configs_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_configs_id_seq TO oos_beta;


--
-- Name: w_countries_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_countries_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_countries_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_countries_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_countries_id_seq TO oos_beta;


--
-- Name: w_dishes_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_dishes_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_dishes_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_dishes_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_dishes_id_seq TO oos_beta;


--
-- Name: w_extras_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_extras_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_extras_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_extras_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_extras_id_seq TO oos_beta;


--
-- Name: w_franchises_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_franchises_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_franchises_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_franchises_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_franchises_id_seq TO oos_beta;


--
-- Name: w_menus_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_menus_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_menus_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_menus_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_menus_id_seq TO oos_beta;


--
-- Name: w_orders_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_orders_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_orders_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_orders_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_orders_id_seq TO oos_beta;


--
-- Name: w_paypal_payments_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_paypal_payments_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_paypal_payments_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_paypal_payments_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_paypal_payments_id_seq TO oos_beta;


--
-- Name: w_review_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_review_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_review_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_review_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_review_id_seq TO oos_beta;


--
-- Name: w_users_id_seq; Type: ACL; Schema: public; Owner: oos_beta
--

REVOKE ALL ON SEQUENCE w_users_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_users_id_seq FROM oos_beta;
GRANT ALL ON SEQUENCE w_users_id_seq TO oos_beta;
GRANT ALL ON SEQUENCE w_users_id_seq TO oos_beta;


--
-- PostgreSQL database dump complete
--







ALTER TABLE ONLY w_lang_admin
    ADD CONSTRAINT w_lang_admin_id_key UNIQUE (id);

ALTER TABLE ONLY w_lang_setting
    ADD CONSTRAINT w_lang_setting_id_key UNIQUE (id);

ALTER TABLE ONLY w_lang_static
    ADD CONSTRAINT w_lang_static_id_key UNIQUE (id);





ALTER TABLE ONLY w_lang_admin
    ADD CONSTRAINT w_lang_admin_pkey PRIMARY KEY (id);



ALTER TABLE ONLY w_lang_setting
    ADD CONSTRAINT w_lang_setting_pkey PRIMARY KEY (id);



ALTER TABLE ONLY w_lang_static
    ADD CONSTRAINT w_lang_static_pkey PRIMARY KEY (id);



REVOKE ALL ON SEQUENCE w_lang_admin_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_lang_admin_id_seq FROM sf197;
GRANT ALL ON SEQUENCE w_lang_admin_id_seq TO sf197;


REVOKE ALL ON SEQUENCE w_lang_setting_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_lang_setting_id_seq FROM sf197;
GRANT ALL ON SEQUENCE w_lang_setting_id_seq TO sf197;


REVOKE ALL ON SEQUENCE w_lang_static_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE w_lang_static_id_seq FROM sf197;
GRANT ALL ON SEQUENCE w_lang_static_id_seq TO sf197;




