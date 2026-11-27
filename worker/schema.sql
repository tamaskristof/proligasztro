-- One row per voter per poll: the primary key is the duplicate-vote check.
CREATE TABLE IF NOT EXISTS votes (
  poll       TEXT    NOT NULL,
  option     INTEGER NOT NULL,
  voter      TEXT    NOT NULL,             -- salted SHA-256 of the IP, never the IP itself
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  PRIMARY KEY (poll, voter)
);

-- Comments wait here until /moderate approves or rejects them. Approved ones are copied into the
-- post's MDX by hand (the site stays static); email and ip_hash are wiped once a comment is handled.
CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT    NOT NULL,
  name       TEXT,
  email      TEXT,
  url        TEXT,
  text       TEXT    NOT NULL,
  ip_hash    TEXT,
  token      TEXT,                         -- receipt: random code only the sender's browser knows
  status     TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX IF NOT EXISTS comments_status ON comments (status);
CREATE INDEX IF NOT EXISTS comments_rate ON comments (ip_hash, created_at);
CREATE UNIQUE INDEX IF NOT EXISTS comments_token ON comments (token);
