--
-- PostgreSQL database dump
--

\restrict VaiWEMuxnUpmIuq2ve28NrIqiMeDns6w696VOQa2xMBZwgeWFzE8auHE43J0uau

-- Dumped from database version 18.6 (Homebrew)
-- Dumped by pg_dump version 18.6 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: anujsharma
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    title character varying(100) NOT NULL
);


ALTER TABLE public.courses OWNER TO anujsharma;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: anujsharma
--

ALTER TABLE public.courses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: anujsharma
--

CREATE TABLE public.enrollments (
    id integer NOT NULL,
    student_id integer NOT NULL,
    course_id integer NOT NULL
);


ALTER TABLE public.enrollments OWNER TO anujsharma;

--
-- Name: enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: anujsharma
--

ALTER TABLE public.enrollments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.enrollments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: students; Type: TABLE; Schema: public; Owner: anujsharma
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255),
    age integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT students_age_check CHECK ((age >= 0))
);


ALTER TABLE public.students OWNER TO anujsharma;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: anujsharma
--

ALTER TABLE public.students ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: anujsharma
--

COPY public.courses (id, title) FROM stdin;
1	Backend Development
2	Database Management
3	Python Programming
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: anujsharma
--

COPY public.enrollments (id, student_id, course_id) FROM stdin;
1	2	1
2	3	1
3	3	2
4	4	3
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: anujsharma
--

COPY public.students (id, name, email, age, created_at) FROM stdin;
3	Carol	carol@example.com	24	2026-09-17 15:21:33.925294
4	David	david@example.com	20	2026-09-17 15:21:37.85098
2	Bob	bob@example.com	23	2026-09-17 15:21:33.925294
\.


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anujsharma
--

SELECT pg_catalog.setval('public.courses_id_seq', 3, true);


--
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anujsharma
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 4, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anujsharma
--

SELECT pg_catalog.setval('public.students_id_seq', 4, true);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: anujsharma
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: anujsharma
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_student_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: anujsharma
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_course_id_key UNIQUE (student_id, course_id);


--
-- Name: students students_email_key; Type: CONSTRAINT; Schema: public; Owner: anujsharma
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: anujsharma
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anujsharma
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: enrollments enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anujsharma
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: TABLE students; Type: ACL; Schema: public; Owner: anujsharma
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.students TO school_user;


--
-- PostgreSQL database dump complete
--

\unrestrict VaiWEMuxnUpmIuq2ve28NrIqiMeDns6w696VOQa2xMBZwgeWFzE8auHE43J0uau

