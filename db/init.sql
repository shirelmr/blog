-- PostgreSQL database dump (compatible con Node.js)

-- Limpiar tablas existentes
DROP TABLE IF EXISTS public.post CASCADE;
DROP TABLE IF EXISTS public.session CASCADE;
DROP TABLE IF EXISTS public.author CASCADE;
DROP SEQUENCE IF EXISTS public.author_id_author_seq CASCADE;
DROP SEQUENCE IF EXISTS public.post_id_post_seq CASCADE;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET row_security = off;

-- TABLAS

CREATE TABLE IF NOT EXISTS public.author (
    id_author integer NOT NULL,
    name character varying(100),
    lastname character varying(100),
    date_of_birth date,
    email character varying(100),
    phone_number character varying(20),
    username character varying(50),
    password character varying(255)
);

CREATE SEQUENCE IF NOT EXISTS public.author_id_author_seq
    AS integer START WITH 1 INCREMENT BY 1
    NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.author_id_author_seq OWNED BY public.author.id_author;
ALTER TABLE ONLY public.author ALTER COLUMN id_author SET DEFAULT nextval('public.author_id_author_seq'::regclass);

CREATE TABLE IF NOT EXISTS public.post (
    id_post integer NOT NULL,
    title character varying(200),
    date date,
    image character varying(300),
    text text,
    id_author integer
);

CREATE SEQUENCE IF NOT EXISTS public.post_id_post_seq
    AS integer START WITH 1 INCREMENT BY 1
    NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.post_id_post_seq OWNED BY public.post.id_post;
ALTER TABLE ONLY public.post ALTER COLUMN id_post SET DEFAULT nextval('public.post_id_post_seq'::regclass);

CREATE TABLE IF NOT EXISTS public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);

-- DATOS: author

INSERT INTO public.author (id_author, name, lastname, date_of_birth, email, phone_number, username, password) VALUES
(1, 'Shirel', 'Marino', '2005-10-01', 'A01738212@tec.mx', '2224410195', NULL, NULL),
(2, 'Itzel', 'Covarrubias', '2004-10-01', 'itzel@email.com', '5559876543', NULL, NULL),
(8, 'Shirel', 'MR', NULL, NULL, NULL, NULL, NULL),
(9, 'shirel', 'SinApellido', NULL, NULL, NULL, NULL, NULL),
(10, 'Admin', 'Demo', NULL, NULL, NULL, 'admin', '1234');

-- DATOS: post

INSERT INTO public.post (id_post, title, date, image, text, id_author) VALUES
(1, 'sierra_negra', '2026-06-25', './src/assets/sierranegra.jpeg', 'Contenido sobre sierra negra', 1),
(2, 'iztaccíhuatl', '2026-06-25', './src/assets/izta.jpeg', 'Contenido sobre iztaccíhuatl', 1),
(3, 'nevado_de_toluca', '2026-06-25', './src/assets/nevado.jpeg', 'Contenido sobre nevado de toluca', 1),
(4, 'pinal', '2026-06-25', './src/assets/pinal.jpeg', 'Contenido sobre pinal', 1),
(5, 'mt_rainer', '2026-06-25', './src/assets/mtrainier.jpeg', 'Contenido sobre Mt Rainier', 1),
(6, 'mt_fuji', '2026-06-25', './src/assets/mtfuji.jpeg', 'Contenido sobre Mt Fuji', 1),
(7, 'la_malinche', '2026-06-25', './src/assets/malinche.jpeg', 'Contenido sobre La Malinche', 1),
(8, 'snowlake', '2026-06-25', './src/assets/snowlake.jpeg', 'Contenido sobre Snow Lake', 1),
(9, 'el_zapotecas', '2026-06-25', './src/assets/zapotecas.jpeg', 'Contenido sobre El Zapotecas', 1),
(10, 'cozumel', '2026-06-25', './src/assets/cozumel.jpeg', 'Contenido sobre Cozumel', 1);

-- SECUENCIAS

SELECT pg_catalog.setval('public.author_id_author_seq', 10, true);
SELECT pg_catalog.setval('public.post_id_post_seq', 10, true);

-- CONSTRAINTS

ALTER TABLE ONLY public.author ADD CONSTRAINT author_pkey PRIMARY KEY (id_author);
ALTER TABLE ONLY public.post ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);
ALTER TABLE ONLY public.session ADD CONSTRAINT session_pkey PRIMARY KEY (sid);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON public.session USING btree (expire);

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_id_author_fkey FOREIGN KEY (id_author) REFERENCES public.author(id_author);