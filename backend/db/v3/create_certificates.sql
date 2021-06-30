--
-- Name: certificates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.certificates (
    id bigint NOT NULL,
    name character varying,
    attachment json,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: certificates_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.certificates_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: certificates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.certificates_id_seq OWNED BY public.certificates.id;


--
-- Name: certificates_partners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.certificates_partners (
    partner_id bigint NOT NULL,
    certificate_id bigint NOT NULL
);

ALTER TABLE ONLY public.certificates ALTER COLUMN id SET DEFAULT nextval('public.certificates_id_seq'::regclass);

--
-- Name: certificates certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (id);


--
-- Name: index_certificates_partners_on_certificate_id_and_partner_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_certificates_partners_on_certificate_id_and_partner_id ON public.certificates_partners USING btree (certificate_id, partner_id);


--
-- Name: index_certificates_partners_on_partner_id_and_certificate_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_certificates_partners_on_partner_id_and_certificate_id ON public.certificates_partners USING btree (partner_id, certificate_id);
