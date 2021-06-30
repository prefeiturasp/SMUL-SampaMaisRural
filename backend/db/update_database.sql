--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    name character varying,
    email character varying,
    data text,
    status integer DEFAULT 0,
    partner_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;

--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';

--
-- Name: filter_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.filter_groups (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    category character varying
);


--
-- Name: filter_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.filter_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: filter_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.filter_groups_id_seq OWNED BY public.filter_groups.id;


--
-- Name: filters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.filters (
    id bigint NOT NULL,
    group_id integer,
    field integer,
    label character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: filters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.filters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: filters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.filters_id_seq OWNED BY public.filters.id;

--
-- Name: filter_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filter_groups ALTER COLUMN id SET DEFAULT nextval('public.filter_groups_id_seq'::regclass);

--
-- Name: filter_groups filter_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filter_groups
    ADD CONSTRAINT filter_groups_pkey PRIMARY KEY (id);

    --
-- Name: filters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filters ALTER COLUMN id SET DEFAULT nextval('public.filters_id_seq'::regclass);


--
-- Name: filters filters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (id);


ALTER TABLE partners
  ADD COLUMN "authorize_information" BOOLEAN DEFAULT FALSE;

ALTER TABLE partners
  ADD COLUMN "publish_address" BOOLEAN DEFAULT TRUE;

ALTER TABLE partners
  ADD COLUMN "authorize_information" BOOLEAN DEFAULT FALSE;

INSERT INTO "schema_migrations" (version) VALUES
('20200805153748');
INSERT INTO "schema_migrations" (version) VALUES
('20200805231301');
INSERT INTO "schema_migrations" (version) VALUES
('20200805232329');
INSERT INTO "schema_migrations" (version) VALUES
('20200807201130');
INSERT INTO "schema_migrations" (version) VALUES
('20200811160102');
INSERT INTO "schema_migrations" (version) VALUES
('20200812165256');
INSERT INTO "schema_migrations" (version) VALUES
('20200831144639');
INSERT INTO "schema_migrations" (version) VALUES
('20200901195231');
INSERT INTO "schema_migrations" (version) VALUES
('20200902184220');
INSERT INTO "schema_migrations" (version) VALUES
('20200903195527');
INSERT INTO "schema_migrations" (version) VALUES
('20200904132004');
INSERT INTO "schema_migrations" (version) VALUES
('20200909165640');
