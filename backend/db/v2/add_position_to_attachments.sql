ALTER TABLE attachments ADD COLUMN "position" INTEGER;
INSERT INTO "schema_migrations" (version) VALUES
('20201020194415');
