PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS nonces;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS sessions;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user', -- 'user' or 'admin'
  status TEXT DEFAULT 'normal', -- 'normal' or 'banned'
  verified INTEGER DEFAULT 0,
  verification_token TEXT,
  totp_secret TEXT,
  totp_enabled INTEGER DEFAULT 0,
  reset_token TEXT,
  reset_token_expires INTEGER, -- Timestamp
  pending_email TEXT,
  email_change_token TEXT,
  avatar_url TEXT,
  nickname TEXT,
  email_notifications INTEGER DEFAULT 1,
  -- 扩展个人资料字段
  age INTEGER,
  gender TEXT,
  birthday TEXT,
  bio TEXT,
  bg_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id INTEGER,
  is_pinned INTEGER DEFAULT 0,
  status TEXT DEFAULT 'normal', -- 'normal', 'hidden', 'locked'
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  parent_id INTEGER,
  author_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'normal', -- 'normal', 'hidden', 'locked'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (parent_id) REFERENCES comments(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE nonces (
  nonce TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL
);

CREATE TABLE sessions (
  jti TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details TEXT,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 初始设置
INSERT INTO settings (key, value) VALUES ('turnstile_enabled', '0');
INSERT INTO settings (key, value) VALUES ('site_title', 'CForum');
INSERT INTO settings (key, value) VALUES ('site_description', '');
INSERT INTO settings (key, value) VALUES ('site_primary_color', '#e879a0');
INSERT INTO settings (key, value) VALUES ('site_favicon_url', '');
INSERT INTO settings (key, value) VALUES ('site_announcement', '');
INSERT INTO settings (key, value) VALUES ('site_icp', '');
INSERT INTO settings (key, value) VALUES ('site_footer_html', '');
INSERT INTO settings (key, value) VALUES ('site_bg_image', '');
INSERT INTO settings (key, value) VALUES ('site_bg_opacity', '1');
INSERT INTO settings (key, value) VALUES ('site_custom_css', '');
INSERT INTO settings (key, value) VALUES ('site_custom_js', '');
INSERT INTO settings (key, value) VALUES ('site_terms', '');
INSERT INTO settings (key, value) VALUES ('site_privacy', '');
INSERT INTO settings (key, value) VALUES ('site_blocked_regions', '');
INSERT INTO settings (key, value) VALUES ('site_allowed_regions', '');
INSERT INTO settings (key, value) VALUES ('site_post_rate_limit', '');
INSERT INTO settings (key, value) VALUES ('site_comment_rate_limit', '');
INSERT INTO settings (key, value) VALUES ('site_keyword_filter', '');

-- 初始分类数据
INSERT INTO categories (name) VALUES ('General'), ('Tech'), ('Random');

-- 初始管理员账户 (admin@admin.com / admin@123)
INSERT INTO users (email, username, password, role, verified, nickname) VALUES
('admin@admin.com', 'Admin', '7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358', 'admin', 1, 'System Admin');

PRAGMA foreign_keys = ON;
