--
-- Name: seals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seals (
    id bigint NOT NULL,
    shareable_type character varying NOT NULL,
    shareable_id bigint NOT NULL,
    file json,
    qr_code json,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: seals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: seals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.seals_id_seq OWNED BY public.seals.id;

--
-- Name: seals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seals ALTER COLUMN id SET DEFAULT nextval('public.seals_id_seq'::regclass);

--
-- Name: seals seals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seals
    ADD CONSTRAINT seals_pkey PRIMARY KEY (id);

CREATE INDEX index_seals_on_shareable_type_and_shareable_id ON public.seals USING btree (shareable_type, shareable_id);

ALTER TABLE seals ADD COLUMN status INTEGER;
ALTER TABLE seals ADD COLUMN expires_at DATE;

ALTER TABLE seals ADD COLUMN seals_group_id integer;
ALTER TABLE seals ADD COLUMN connected_partner_id integer;
ALTER TABLE seals ADD COLUMN description text;
ALTER TABLE seals ADD COLUMN detail character varying;
ALTER TABLE seals ADD COLUMN type character varying;
ALTER TABLE seals ADD COLUMN last_download_at timestamp without time zone;
