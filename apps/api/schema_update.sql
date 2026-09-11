CREATE TABLE IF NOT EXISTS members (
  model_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  member TEXT NOT NULL,
  spend_usd REAL DEFAULT 0,
  tips INTEGER DEFAULT 0,
  active_days INTEGER DEFAULT 0,
  repeat TEXT,
  last_date TEXT,
  rank_in_site INTEGER,
  PRIMARY KEY (model_name, platform, member)
);

CREATE TABLE IF NOT EXISTS daily_tips (
  model_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  date TEXT NOT NULL,
  tip_income_usd REAL DEFAULT 0,
  tips INTEGER DEFAULT 0,
  unique_tippers INTEGER DEFAULT 0,
  PRIMARY KEY (model_name, platform, date)
);

CREATE TABLE IF NOT EXISTS hourly (
  model_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  hour TEXT NOT NULL,
  exposure_h REAL DEFAULT 0,
  tip_income_usd REAL DEFAULT 0,
  tip_per_h REAL DEFAULT 0,
  tips INTEGER DEFAULT 0,
  unique_tippers INTEGER DEFAULT 0,
  PRIMARY KEY (model_name, platform, hour)
);

CREATE TABLE IF NOT EXISTS model_site (
  model_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  income_usd REAL, hours REAL, usd_per_h REAL, sessions INTEGER,
  tips INTEGER, unique_tippers INTEGER, repeat INTEGER, repeat_rate REAL,
  avg_spend REAL, median_spend REAL, top1_share REAL, top5_share REAL, top10_share REAL,
  zero_segments REAL, zero_hours REAL, active_days INTEGER,
  best_hour TEXT, best_tip_per_h REAL, weak_hour TEXT, weak_tip_per_h REAL,
  signal TEXT,
  PRIMARY KEY (model_name, platform)
);

CREATE TABLE IF NOT EXISTS spenders (
  model_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  scope TEXT NOT NULL,
  type TEXT NOT NULL,
  rank INTEGER,
  member TEXT NOT NULL,
  spend_usd REAL DEFAULT 0,
  tips INTEGER DEFAULT 0,
  active_days INTEGER DEFAULT 0,
  last_date TEXT,
  PRIMARY KEY (model_name, platform, scope, type, member)
);

CREATE INDEX IF NOT EXISTS idx_daily_model ON daily_tips(model_name, date);
CREATE INDEX IF NOT EXISTS idx_hourly_model ON hourly(model_name, hour);
CREATE INDEX IF NOT EXISTS idx_members_model ON members(model_name);
