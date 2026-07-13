-- 删除所有表（用于重置数据库）
-- 使用方法: npx wrangler d1 execute cfwforum_db --remote --file=./scripts/drop_all_tables.sql

PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS nonces;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS d1_migrations;

PRAGMA foreign_keys = ON;
