-- 数据库迁移：添加 status 字段到 posts、comments、users 表
-- 以及扩展 site_settings 相关初始数据

-- 为 posts 表添加 status 字段（normal/hidden/locked）
ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'normal';

-- 为 comments 表添加 status 字段（normal/hidden/locked）
ALTER TABLE comments ADD COLUMN status TEXT DEFAULT 'normal';

-- 为 users 表添加 status 字段（normal/banned）
ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'normal';

-- 初始化站点设置默认值
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_title', 'CForum');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_description', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_primary_color', '#e879a0');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_favicon_url', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_announcement', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_icp', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_footer_html', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_bg_image', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_bg_opacity', '1');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_custom_css', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_custom_js', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_terms', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_privacy', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_blocked_regions', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_post_rate_limit', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_comment_rate_limit', '');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_keyword_filter', '');
