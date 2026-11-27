-- Run once on a database created before receipts existed (2026-11-27):
--   npx wrangler d1 execute proligasztro --remote --file=migrations-001-receipt.sql
ALTER TABLE comments ADD COLUMN token TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS comments_token ON comments (token);
