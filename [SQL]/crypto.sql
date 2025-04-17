--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-17 20:14:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 108105)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 108690)
-- Name: Currency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Currency" (
    currency_code character varying NOT NULL,
    name character varying NOT NULL,
    price numeric(18,2)
);


ALTER TABLE public."Currency" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 108716)
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    order_id integer NOT NULL,
    wallet_id uuid NOT NULL,
    order_type character varying NOT NULL,
    from_currency character varying NOT NULL,
    amount numeric(38,18) NOT NULL,
    price numeric(38,2) NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 108786)
-- Name: Order_History; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order_History" (
    history_id integer NOT NULL,
    order_id integer NOT NULL,
    from_wallet_id uuid NOT NULL,
    order_type character varying NOT NULL,
    from_currency character varying NOT NULL,
    amount numeric(38,18) NOT NULL,
    price numeric(38,2) NOT NULL,
    change_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    to_wallet_id uuid NOT NULL
);


ALTER TABLE public."Order_History" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 108785)
-- Name: Order_History_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_History_history_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_History_history_id_seq" OWNER TO postgres;

--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 225
-- Name: Order_History_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_History_history_id_seq" OWNED BY public."Order_History".history_id;


--
-- TOC entry 221 (class 1259 OID 108715)
-- Name: Order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_order_id_seq" OWNER TO postgres;

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 221
-- Name: Order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_order_id_seq" OWNED BY public."Order".order_id;


--
-- TOC entry 224 (class 1259 OID 108740)
-- Name: Transaction_History; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction_History" (
    transaction_id integer NOT NULL,
    from_wallet_id uuid NOT NULL,
    to_wallet_id uuid NOT NULL,
    currency_code character varying NOT NULL,
    amount numeric(38,18) NOT NULL
);


ALTER TABLE public."Transaction_History" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 108739)
-- Name: Transaction_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Transaction_transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Transaction_transaction_id_seq" OWNER TO postgres;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 223
-- Name: Transaction_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transaction_transaction_id_seq" OWNED BY public."Transaction_History".transaction_id;


--
-- TOC entry 218 (class 1259 OID 108680)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    email character varying NOT NULL,
    wallet_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    password character varying NOT NULL,
    username character varying NOT NULL,
    "USD" numeric(38,2) DEFAULT '0'::numeric NOT NULL,
    "THB" numeric(38,2) DEFAULT '0'::numeric NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 108697)
-- Name: Wallet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Wallet" (
    wallet_id uuid NOT NULL,
    currency_code character varying NOT NULL,
    amount numeric(38,18) DEFAULT 0 NOT NULL
);


ALTER TABLE public."Wallet" OWNER TO postgres;

--
-- TOC entry 3247 (class 2604 OID 108719)
-- Name: Order order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN order_id SET DEFAULT nextval('public."Order_order_id_seq"'::regclass);


--
-- TOC entry 3249 (class 2604 OID 108789)
-- Name: Order_History history_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order_History" ALTER COLUMN history_id SET DEFAULT nextval('public."Order_History_history_id_seq"'::regclass);


--
-- TOC entry 3248 (class 2604 OID 108743)
-- Name: Transaction_History transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction_History" ALTER COLUMN transaction_id SET DEFAULT nextval('public."Transaction_transaction_id_seq"'::regclass);


--
-- TOC entry 3418 (class 0 OID 108690)
-- Dependencies: 219
-- Data for Name: Currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Currency" (currency_code, name, price) FROM stdin;
BTC	Bitcoin	84317.25
ETH	Ethereum	14.91
DOGE	Dogecoin 	0.16
XRP	XRP 	2.09
THB	THAILANDBATH	35.00
USD	UnitedStatesDollar	1.00
\.


--
-- TOC entry 3421 (class 0 OID 108716)
-- Dependencies: 222
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (order_id, wallet_id, order_type, from_currency, amount, price) FROM stdin;
18	00000000-0000-0000-0000-000000000000	SELL	XRP	100.000000000000000000	10000.00
19	00000000-0000-0000-0000-000000000000	SELL	ETH	100.000000000000000000	10000.00
20	00000000-0000-0000-0000-000000000000	SELL	DOGE	100.000000000000000000	10000.00
17	00000000-0000-0000-0000-000000000000	SELL	BTC	99.000000000000000000	10000.00
\.


--
-- TOC entry 3425 (class 0 OID 108786)
-- Dependencies: 226
-- Data for Name: Order_History; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order_History" (history_id, order_id, from_wallet_id, order_type, from_currency, amount, price, change_timestamp, to_wallet_id) FROM stdin;
24	17	00000000-0000-0000-0000-000000000000	Seller	BTC	100.000000000000000000	10000.00	2025-04-17 12:50:55.413	00000000-0000-0000-0000-000000000000
25	18	00000000-0000-0000-0000-000000000000	Seller	XRP	100.000000000000000000	10000.00	2025-04-17 12:51:07.973	00000000-0000-0000-0000-000000000000
26	19	00000000-0000-0000-0000-000000000000	Seller	ETH	100.000000000000000000	10000.00	2025-04-17 12:51:17.73	00000000-0000-0000-0000-000000000000
27	20	00000000-0000-0000-0000-000000000000	Seller	DOGE	100.000000000000000000	10000.00	2025-04-17 12:51:28.574	00000000-0000-0000-0000-000000000000
\.


--
-- TOC entry 3423 (class 0 OID 108740)
-- Dependencies: 224
-- Data for Name: Transaction_History; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transaction_History" (transaction_id, from_wallet_id, to_wallet_id, currency_code, amount) FROM stdin;
7	9f0d2988-f82a-4fac-a116-b3835639ca8a	00000000-0000-0000-0000-000000000000	BTC	1.000000000000000000
\.


--
-- TOC entry 3417 (class 0 OID 108680)
-- Dependencies: 218
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (email, wallet_id, password, username, "USD", "THB") FROM stdin;
Product@System.com	00000000-0000-0000-0000-000000000000	0000	System	0.00	0.00
Buying_Start@gmail.com	9f0d2988-f82a-4fac-a116-b3835639ca8a	0000	Buying	1000000.00	1000000.00
\.


--
-- TOC entry 3419 (class 0 OID 108697)
-- Dependencies: 220
-- Data for Name: Wallet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Wallet" (wallet_id, currency_code, amount) FROM stdin;
00000000-0000-0000-0000-000000000000	XRP	900.000000000000000000
00000000-0000-0000-0000-000000000000	ETH	900.000000000000000000
00000000-0000-0000-0000-000000000000	DOGE	900.000000000000000000
00000000-0000-0000-0000-000000000000	BTC	901.000000000000000000
\.


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 225
-- Name: Order_History_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_History_history_id_seq"', 28, true);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 221
-- Name: Order_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_order_id_seq"', 20, true);


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 223
-- Name: Transaction_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transaction_transaction_id_seq"', 7, true);


--
-- TOC entry 3256 (class 2606 OID 108696)
-- Name: Currency Currency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Currency"
    ADD CONSTRAINT "Currency_pkey" PRIMARY KEY (currency_code);


--
-- TOC entry 3266 (class 2606 OID 108794)
-- Name: Order_History Order_History_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order_History"
    ADD CONSTRAINT "Order_History_pkey" PRIMARY KEY (history_id);


--
-- TOC entry 3260 (class 2606 OID 108723)
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (order_id);


--
-- TOC entry 3262 (class 2606 OID 108861)
-- Name: Order Order_wallet_id_from_currency_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_wallet_id_from_currency_key" UNIQUE (wallet_id, from_currency);


--
-- TOC entry 3264 (class 2606 OID 108747)
-- Name: Transaction_History Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction_History"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (transaction_id);


--
-- TOC entry 3252 (class 2606 OID 108687)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (email);


--
-- TOC entry 3254 (class 2606 OID 108689)
-- Name: User User_wallet_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_wallet_id_key" UNIQUE (wallet_id);


--
-- TOC entry 3258 (class 2606 OID 108704)
-- Name: Wallet Wallet_wallet_id_currency_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wallet"
    ADD CONSTRAINT "Wallet_wallet_id_currency_code_key" UNIQUE (wallet_id, currency_code);


--
-- TOC entry 3269 (class 2606 OID 108724)
-- Name: Order Order_from_currency_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_from_currency_fkey" FOREIGN KEY (from_currency) REFERENCES public."Currency"(currency_code);


--
-- TOC entry 3271 (class 2606 OID 108748)
-- Name: Transaction_History Transaction_currency_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction_History"
    ADD CONSTRAINT "Transaction_currency_code_fkey" FOREIGN KEY (currency_code) REFERENCES public."Currency"(currency_code);


--
-- TOC entry 3267 (class 2606 OID 108710)
-- Name: Wallet Wallet_currency_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wallet"
    ADD CONSTRAINT "Wallet_currency_code_fkey" FOREIGN KEY (currency_code) REFERENCES public."Currency"(currency_code);


--
-- TOC entry 3268 (class 2606 OID 108705)
-- Name: Wallet Wallet_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wallet"
    ADD CONSTRAINT "Wallet_wallet_id_fkey" FOREIGN KEY (wallet_id) REFERENCES public."User"(wallet_id);


--
-- TOC entry 3270 (class 2606 OID 108734)
-- Name: Order fk_wallet; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT fk_wallet FOREIGN KEY (wallet_id, from_currency) REFERENCES public."Wallet"(wallet_id, currency_code);


-- Completed on 2025-04-17 20:14:47

--
-- PostgreSQL database dump complete
--

