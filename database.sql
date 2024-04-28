--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.1

-- Started on 2024-04-18 07:49:10 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--



ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16436)
-- Name: apicalls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apicalls (
    id integer NOT NULL,
    webshopid integer NOT NULL,
    url character varying NOT NULL,
    counter integer NOT NULL
);


ALTER TABLE public.apicalls OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16435)
-- Name: ApiCalls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ApiCalls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ApiCalls_id_seq" OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 219
-- Name: ApiCalls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ApiCalls_id_seq" OWNED BY public.apicalls.id;


--
-- TOC entry 215 (class 1259 OID 16388)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16393)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 217 (class 1259 OID 16397)
-- Name: webshop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.webshop (
    webshopid integer NOT NULL,
    userid integer NOT NULL,
    unas_api character varying(255),
    foxpost_api character varying(255),
    gls_api character varying(255),
    unas_token character varying(255),
    token_date timestamp with time zone,
    name character varying
);


ALTER TABLE public.webshop OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16402)
-- Name: webshop_webshopid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.webshop_webshopid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.webshop_webshopid_seq OWNER TO postgres;

--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 218
-- Name: webshop_webshopid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.webshop_webshopid_seq OWNED BY public.webshop.webshopid;


--
-- TOC entry 3215 (class 2604 OID 16439)
-- Name: apicalls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apicalls ALTER COLUMN id SET DEFAULT nextval('public."ApiCalls_id_seq"'::regclass);


--
-- TOC entry 3213 (class 2604 OID 16394)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 16403)
-- Name: webshop webshopid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webshop ALTER COLUMN webshopid SET DEFAULT nextval('public.webshop_webshopid_seq'::regclass);


--
-- TOC entry 3227 (class 2606 OID 16443)
-- Name: apicalls ApiCalls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apicalls
    ADD CONSTRAINT "ApiCalls_pkey" PRIMARY KEY (id);


--
-- TOC entry 3217 (class 2606 OID 16396)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3219 (class 2606 OID 16405)
-- Name: webshop webshop_foxpost_api_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webshop
    ADD CONSTRAINT webshop_foxpost_api_key UNIQUE (foxpost_api);


--
-- TOC entry 3221 (class 2606 OID 16407)
-- Name: webshop webshop_gls_api_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webshop
    ADD CONSTRAINT webshop_gls_api_key UNIQUE (gls_api);


--
-- TOC entry 3223 (class 2606 OID 16409)
-- Name: webshop webshop_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webshop
    ADD CONSTRAINT webshop_pkey PRIMARY KEY (webshopid);


--
-- TOC entry 3225 (class 2606 OID 16411)
-- Name: webshop webshop_unas_api_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webshop
    ADD CONSTRAINT webshop_unas_api_key UNIQUE (unas_api);


--
-- TOC entry 3229 (class 2606 OID 16444)
-- Name: apicalls fk_webshop; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apicalls
    ADD CONSTRAINT fk_webshop FOREIGN KEY (webshopid) REFERENCES public.webshop(webshopid) ON DELETE CASCADE;


--
-- TOC entry 3228 (class 2606 OID 16412)
-- Name: webshop webshop_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.webshop
    ADD CONSTRAINT webshop_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2024-04-18 07:49:10 UTC

--
-- PostgreSQL database dump complete
--

