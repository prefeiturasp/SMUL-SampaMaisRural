--
-- Name: connections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.connections (
    id bigint NOT NULL,
    description character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: connections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.connections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: connections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.connections_id_seq OWNED BY public.connections.id;


--
-- Name: connections_partners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.connections_partners (
    connection_id bigint NOT NULL,
    partner_id bigint NOT NULL
);

ALTER TABLE ONLY public.connections ALTER COLUMN id SET DEFAULT nextval('public.connections_id_seq'::regclass);

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_pkey PRIMARY KEY (id);

    --
-- Name: index_connections_partners_on_connection_id_and_partner_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_connections_partners_on_connection_id_and_partner_id ON public.connections_partners USING btree (connection_id, partner_id);


--
-- Name: index_connections_partners_on_partner_id_and_connection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_connections_partners_on_partner_id_and_connection_id ON public.connections_partners USING btree (partner_id, connection_id);

INSERT INTO "schema_migrations" (version) VALUES
('20200929171424');
INSERT INTO "schema_migrations" (version) VALUES
('20200929171656');
INSERT INTO "schema_migrations" (version) VALUES
('20200930010039');
