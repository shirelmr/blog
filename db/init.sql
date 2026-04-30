--
-- PostgreSQL database dump
--

\restrict dJq3KFAXJF6rgQ27g2gkbrHQ3GFTpVNKJxE0QZv5tECH9T4DidUKvXLc3K0IDiN

-- Dumped from database version 16.13 (Homebrew)
-- Dumped by pg_dump version 16.13 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author (
    id_author integer NOT NULL,
    name character varying(100),
    lastname character varying(100),
    date_of_birth date,
    email character varying(100),
    phone_number character varying(20),
    username character varying(50),
    password character varying(255)
);


--
-- Name: author_id_author_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.author_id_author_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: author_id_author_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.author_id_author_seq OWNED BY public.author.id_author;


--
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post (
    id_post integer NOT NULL,
    title character varying(200),
    date date,
    image character varying(300),
    text text,
    id_author integer
);


--
-- Name: post_id_post_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_id_post_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_post_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_id_post_seq OWNED BY public.post.id_post;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: author id_author; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author ALTER COLUMN id_author SET DEFAULT nextval('public.author_id_author_seq'::regclass);


--
-- Name: post id_post; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post ALTER COLUMN id_post SET DEFAULT nextval('public.post_id_post_seq'::regclass);


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.author (id_author, name, lastname, date_of_birth, email, phone_number, username, password) FROM stdin;
1	Shirel	Marino	2005-10-01	A01738212@tec.mx	2224410195	\N	\N
2	Itzel	Covarrubias	2004-10-01	itzel@email.com	5559876543	\N	\N
8	Shirel	MR	\N	\N	\N	\N	\N
9	shirel	SinApellido	\N	\N	\N	\N	\N
10	Admin	Demo	\N	\N	\N	admin	1234
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post (id_post, title, date, image, text, id_author) FROM stdin;
1	sierra_negra	2026-06-25	./src/assets/sierranegra.jpeg	Contenido sobre sierra negra	1
2	iztaccíhuatl	2026-06-25	./src/assets/izta.jpeg	Contenido sobre iztaccíhuatl	1
3	nevado_de_toluca	2026-06-25	./src/assets/nevado.jpeg	Contenido sobre nevado de toluca	1
4	pinal	2026-06-25	./src/assets/pinal.jpeg	Contenido sobre pinal	1
5	mt_rainer	2026-06-25	./src/assets/mtrainier.jpeg	Contenido sobre Mt Rainier	1
6	mt_fuji	2026-06-25	./src/assets/mtfuji.jpeg	Contenido sobre Mt Fuji	1
7	la_malinche	2026-06-25	./src/assets/malinche.jpeg	Contenido sobre La Malinche	1
8	snowlake	2026-06-25	./src/assets/snowlake.jpeg	Contenido sobre Snow Lake	1
9	el_zapotecas	2026-06-25	./src/assets/zapotecas.jpeg	Contenido sobre El Zapotecas	1
10	cozumel	2026-06-25	./src/assets/cozumel.jpeg	Contenido sobre Cozumel	1
13	Post prueba fix	2026-04-22	/uploads/1776879523584-izta.jpeg	Texto de prueba fix	8
14	Post prueba final 2	2026-04-22	/uploads/1776879653942-izta.jpeg	Texto de prueba final 2	8
15	test	2026-04-22	/uploads/1776879700662-WhatsApp Image Apr 13 2026.jpeg	test	9
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- Name: author_id_author_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.author_id_author_seq', 10, true);


--
-- Name: post_id_post_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_id_post_seq', 15, true);


--
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id_author);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: post post_id_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_id_author_fkey FOREIGN KEY (id_author) REFERENCES public.author(id_author);


--
-- PostgreSQL database dump complete
--

\unrestrict dJq3KFAXJF6rgQ27g2gkbrHQ3GFTpVNKJxE0QZv5tECH9T4DidUKvXLc3K0IDiN

