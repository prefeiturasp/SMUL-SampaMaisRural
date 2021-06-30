CREATE TABLE public.seals_groups (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
--
-- Name: seals_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seals_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: seals_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.seals_groups_id_seq OWNED BY public.seals_groups.id;

--
-- Name: seals_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seals_groups ALTER COLUMN id SET DEFAULT nextval('public.seals_groups_id_seq'::regclass);

--
-- Name: seals_groups seals_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seals_groups
    ADD CONSTRAINT seals_groups_pkey PRIMARY KEY (id);
