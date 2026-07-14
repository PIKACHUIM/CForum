# CForumWorker

一个基于 Cloudflare Workers 全栈生态构建的现代化社区论坛系统，支持帖子、评论、图片上传、双因素认证等完整功能。

本项目 Fork 自 [adysec/CForum](https://github.com/adysec/CForum)，后端架构参考 [afoim/acofork_forum_backend](https://github.com/afoim/acofork_forum_backend)。

---

## 📖 目录

- [技术栈](#-技术栈)
- [功能特性](#-功能特性)
- [架构设计](#-架构设计)
- [项目结构](#-项目结构)
- [数据库设计](#-数据库设计)
- [API 概览](#-api-概览)
- [快速开始](#-快速开始)
- [部署指南](#-部署指南)
- [环境变量](#-环境变量)
- [本地开发](#-本地开发)
- [许可证](#-许可证)

---

## 🛠 技术栈

### 后端

| 技术 | 用途 | 说明 |
|------|------|------|
| [Cloudflare Workers](https://workers.cloudflare.com/) | 运行时 | 全球边缘计算，零冷启动 |
| [TypeScript](https://www.typescriptlang.org/) | 开发语言 | 类型安全，全栈统一 |
| [Cloudflare D1](https://developers.cloudflare.com/d1/) | 数据库 | 边缘 SQLite，自动备份 |
| [Cloudflare R2](https://developers.cloudflare.com/r2/) | 对象存储 | 零出口费，S3 兼容 |
| [JOSE](https://github.com/panva/jose) | JWT 认证 | 签名/验证 Token |
| [OTPAuth](https://github.com/hectorm/otpauth) | 双因素认证 | TOTP 标准实现 |
| [Resend](https://resend.com/) | 邮件服务 | 验证邮件、密码重置 |
| [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) | 人机验证 | 隐私友好的 CAPTCHA |
| [aws4fetch](https://github.com/mhart/aws4fetch) | S3 客户端 | R2/S3 存储操作 |
| [marked](https://github.com/markedjs/marked) | Markdown 解析 | 帖子/评论内容渲染 |
| [DOMPurify](https://github.com/cure53/DOMPurify) | XSS 防护 | 内容安全过滤 |

### 前端

| 技术 | 用途 | 说明 |
|------|------|------|
| [React 19](https://react.dev/) | UI 框架 | 函数组件 + Hooks |
| [TypeScript](https://www.typescriptlang.org/) | 开发语言 | 与后端统一 |
| [Vite 7](https://vitejs.dev/) | 构建工具 | 极速 HMR |
| [Tailwind CSS 3](https://tailwindcss.com/) | 样式框架 | 原子化 CSS |
| [Ant Design 6](https://ant.design/) | 组件库 | 企业级 UI 组件 |
| [Radix UI](https://www.radix-ui.com/) | 无样式原语 | Dialog、Label 等 |
| [Lucide React](https://lucide.dev/) | 图标库 | 轻量美观 |
| [QRCode](https://github.com/soldair/node-qrcode) | 二维码 | 2FA 绑定展示 |
| [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) | 图片压缩 | 客户端压缩后上传 |

### 部署运维

| 技术 | 用途 |
|------|------|
| [Cloudflare Pages](https://pages.cloudflare.com/) | 前端托管 + API 网关 |
| [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) | API 代理层 |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | CLI 工具链 |
| [GitHub Actions](https://github.com/features/actions) | CI/CD 自动部署 |
| [Vitest](https://vitest.dev/) | 单元测试框架 |

---

## ✨ 功能特性

### 用户系统
- **注册/登录** — 邮箱注册、密码登录，支持 Turnstile 人机验证
- **邮箱验证** — 注册后发送验证邮件，确保邮箱归属
- **双因素认证 (2FA)** — 基于 TOTP 标准，支持扫码绑定
- **密码重置** — 邮箱找回密码，限时 Token
- **修改邮箱** — 先验证新邮箱再切换，安全可靠
- **个人资料** — 用户名、头像、背景图、年龄、性别、生日、个人介绍
- **邮件通知** — 可配置是否接收邮件通知
- **账号注销** — 支持两种模式：完全删除/保留内容匿名化

### 帖子系统
- **发布/编辑/删除** — 完整 CRUD，Markdown 编辑器
- **分类管理** — 管理员可创建/编辑/删除分类
- **置顶/取消置顶** — 管理员可将帖子置顶
- **锁定/解锁** — 锁定后禁止新评论
- **隐藏/显示** — 作者可隐藏自己帖子，管理员可查看所有
- **浏览量统计** — 每次访问独立计数
- **分页浏览** — 列表分页 + 分类筛选

### 评论系统
- **嵌套评论** — 支持多级回复（parent_id 自引用）
- **Markdown 内容** — 评论同样支持 Markdown + 图片
- **删除管理** — 作者和管理员可删除

### 图片管理
- **图片上传** — 支持帖子图片、头像、背景图，客户端自动压缩
- **多后端存储** — R2 原生绑定 / S3 API 兼容（AWS、MinIO 等）
- **Markdown 嵌入** — 上传后自动插入 `![描述](url)` 语法
- **孤立文件清理** — 管理员可扫描并清理未被引用的文件

### 互动功能
- **点赞/取消点赞** — 每帖每用户唯一点赞，实时切换
- **点赞列表** — 查看帖子点赞用户

### 管理后台
- **用户管理** — 修改用户信息、封禁/解封、删除账号
- **分类管理** — 增删改查帖子分类
- **站点设置** — 网站名称、图标、Logo、背景图、公告、ICP 备案、页脚 HTML、自定义 CSS
- **安全配置** — Turnstile 开关、邮件配置
- **审计日志** — 记录管理员关键操作
- **文件清理** — 分析 + 执行孤立 S3/R2 文件清理

### 国际化 (i18n)
- 内置中/英文语言切换
- 前后端统一翻译键值

### 安全机制
- **JWT 认证** — 短时效 Token (15min) + 签名验证
- **CSRF 防护** — 请求签名头（X-Timestamp + X-Nonce + HMAC）
- **密码哈希** — PBKDF2 + 随机盐 (100,000 迭代)
- **内容过滤** — DOMPurify XSS 防护
- **图片删除鉴权** — 验证图片 owner 防止越权删除
- **操作审计** — 管理员操作日志

---

## 🏗 架构设计

### 整体架构

```
┌────────────────────────────────────────────────┐
│                   用户浏览器                      │
│              forum.example.com                  │
└─────────────────────┬──────────────────────────┘
                      │ HTTPS
                      ▼
┌────────────────────────────────────────────────┐
│         Cloudflare Pages (全球 CDN)              │
│                                                  │
│  ┌──────────────────────────────────────────┐  │
│  │         Pages Functions (路由网关)         │  │
│  │                                            │  │
│  │  /api/*  ────► 转发到 Worker             │  │
│  │  /r2/*   ────► 转发到 Worker             │  │
│  │  其他     ────► 静态文件 (SPA)            │  │
│  └──────────────────────────────────────────┘  │
│                                                  │
│  ┌──────────────────────────────────────────┐  │
│  │        静态资源 (React SPA)               │  │
│  │  index.html / JS / CSS / 图片             │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────┬──────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────┐
│         Cloudflare Worker (业务逻辑)             │
│                                                  │
│  ┌─────────────┐  ┌────────────┐               │
│  │  JWT 认证    │  │  CSRF 防护  │               │
│  └─────────────┘  └────────────┘               │
│  ┌──────────────────────────────────────────┐  │
│  │              路由处理器                    │  │
│  │  /api/login   /api/posts   /api/upload   │  │
│  │  /api/admin/* /api/user/*  ...           │  │
│  └──────────────────────────────────────────┘  │
└──────┬────────────────────┬─────────────────────┘
       │                    │
       ▼                    ▼
┌──────────────┐  ┌──────────────────┐
│  D1 数据库    │  │  R2/S3 对象存储   │
│  (SQLite)    │  │  (图片文件)       │
└──────────────┘  └──────────────────┘
```

### 请求流程

```
1. 用户访问 forum.example.com
2. Cloudflare Pages CDN 接收请求
3. Pages Functions 判断路由：
   - /api/* → 代理转发到 Worker（业务逻辑）
   - /r2/*  → 代理转发到 Worker（图片访问）
   - 其他    → 返回静态文件，React Router 接管前端路由
4. Worker 处理请求：
   - 验证 JWT Token / CSRF 签名
   - 操作 D1 数据库
   - 操作 R2 存储
   - 返回 JSON 响应
5. Pages Functions 透传响应 + CORS 头
```

### 设计优势

- **单域名访问** — 用户只需一个域名，无需配置 Worker 自定义域
- **成本优化** — Pages 静态资源请求免费，Worker 仅处理 API（节省 ~90% 请求量）
- **全球加速** — Pages CDN 自动就近分发静态资源
- **关注分离** — Worker 专注业务逻辑，Pages 专注分发

---

## 📁 项目结构

```
CForumWorker/
├── src/                         # Worker 后端源码
│   ├── index.ts                 # 主入口，所有 API 路由和业务逻辑
│   └── s3.ts                    # S3/R2 存储抽象层（上传/删除/列表/URL转换）
│
├── frontend/                    # 前端 React SPA
│   ├── src/
│   │   ├── pages/               # 页面组件
│   │   │   ├── index-page.tsx    #  首页（帖子列表、分类筛选）
│   │   │   ├── post-page.tsx     #  帖子详情 + 评论
│   │   │   ├── login-page.tsx    #  登录页
│   │   │   ├── register-page.tsx #  注册页
│   │   │   ├── forgot-page.tsx   #  忘记密码
│   │   │   ├── reset-page.tsx    #  重置密码
│   │   │   ├── settings-page.tsx #  用户设置（资料/邮箱/2FA/密码/注销）
│   │   │   ├── profile-page.tsx  #  个人主页
│   │   │   └── admin-page.tsx    #  管理后台
│   │   ├── components/          # 通用组件
│   │   ├── hooks/               # 自定义 Hooks (useI18n)
│   │   ├── lib/                 # 工具库 (api, auth)
│   │   └── i18n/                # 国际化翻译文件
│   ├── vite.config.ts           # Vite 构建配置
│   └── tailwind.config.ts       # Tailwind CSS 配置
│
├── functions/                   # Cloudflare Pages Functions
│   └── [[path]].ts              # API 代理 + CORS 中间件
│
├── migrations/                  # D1 数据库迁移
│   └── 0001_init.sql            # 初始表结构
│
├── scripts/                     # 工具脚本
│   └── drop_all_tables.sql      # 数据库重置脚本
│
├── public/                      # 构建产物输出目录
├── wrangler.jsonc               # Cloudflare Worker 配置
├── wrangler.lingmo.jsonc        # 多环境配置示例
├── pages.config.ts              # Pages 部署配置
├── package.json                 # 依赖与脚本
├── tsconfig.json                # TypeScript 配置
├── vitest.config.mts            # 测试配置
└── README.md                    # 项目文档
```

---

## 🗄 数据库设计

### ER 图

```
┌──────────────┐       ┌──────────────┐
│    users     │       │  categories  │
├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │
│ email        │       │ name         │
│ username     │       │ created_at   │
│ password     │       └──────┬───────┘
│ role         │              │
│ status       │              │
│ avatar_url   │              │
│ bg_image     │              │
│ nickname     │              │
│ totp_*       │       ┌──────▼───────┐
│ ...          │       │    posts     │
└──────┬───────┘       ├──────────────┤
       │               │ id (PK)      │
       │               │ author_id FK │
       │               │ title        │
       │               │ content      │
       │               │ category_id FK
       │               │ is_pinned    │
       │               │ status       │
       │               │ view_count   │
       │               │ created_at   │
       │               └──────┬───────┘
       │                      │
       │               ┌──────▼───────┐
       │               │  comments    │
       │               ├──────────────┤
       │               │ id (PK)      │
       ├──────────────►│ post_id FK   │
       │               │ parent_id FK │
       │               │ author_id FK │
       │               │ content      │
       │               │ status       │
       │               │ created_at   │
       │               └──────────────┘
       │
       │        ┌──────────────┐
       ├───────►│   likes      │
       │        ├──────────────┤
       │        │ id (PK)      │
       │        │ post_id FK   │
       │        │ user_id FK   │
       │        │ created_at   │
       │        │ UNIQUE(p,u)  │
       │        └──────────────┘
       │
       │        ┌──────────────┐     ┌──────────────┐
       ├───────►│  sessions    │     │   settings   │
       │        ├──────────────┤     ├──────────────┤
       │        │ jti (PK)     │     │ key (PK)     │
       │        │ user_id FK   │     │ value        │
       │        │ expires_at   │     └──────────────┘
       │        │ created_at   │
       │        └──────────────┘     ┌──────────────┐
       │                             │  audit_logs  │
       │        ┌──────────────┐     ├──────────────┤
       └───────►│   nonces     │     │ id (PK)      │
                ├──────────────┤     │ user_id FK   │
                │ nonce (PK)   │     │ action       │
                │ expires_at   │     │ resource_*   │
                └──────────────┘     │ details      │
                                     │ ip_address   │
                                     │ created_at   │
                                     └──────────────┘
```

### 核心表说明

| 表名 | 说明 | 关键字段 |
|------|------|----------|
| `users` | 用户账户 | email, username, role, status, avatar_url, bg_image, totp_secret |
| `posts` | 论坛帖子 | title, content(Markdown), category_id, is_pinned, status, view_count |
| `comments` | 帖子评论 | content(Markdown), post_id, parent_id(自引用嵌套) |
| `likes` | 点赞记录 | post_id + user_id 联合唯一索引 |
| `categories` | 帖子分类 | name, created_at |
| `settings` | 站点配置 | key-value 键值对 |
| `sessions` | 用户会话 | jti + user_id + 过期时间 |
| `nonces` | CSRF nonce | nonce + 过期时间，一次性使用 |
| `audit_logs` | 操作审计 | user_id, action, resource_type, details, ip |

---

## 📡 API 概览

### 认证相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/register` | 用户注册 | — |
| POST | `/api/login` | 用户登录 | — |
| POST | `/api/verify-email` | 验证邮箱 | — |
| POST | `/api/resend-verification` | 重发验证邮件 | — |
| POST | `/api/forgot-password` | 忘记密码 | — |
| POST | `/api/reset-password` | 重置密码 | — |
| POST | `/api/logout` | 退出登录 | JWT |

### 用户相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/user/profile/:id?` | 获取用户资料 | — |
| POST | `/api/user/profile` | 更新个人资料 | JWT |
| POST | `/api/user/change-password` | 修改密码 | JWT |
| POST | `/api/user/change-email` | 修改邮箱 | JWT |
| POST | `/api/user/totp/setup` | 初始化 2FA | JWT |
| POST | `/api/user/totp/verify` | 验证激活 2FA | JWT |
| POST | `/api/user/upload-bg` | 上传背景图 | JWT |
| POST | `/api/user/delete` | 注销账号 | JWT |

### 帖子相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/posts` | 帖子列表（分页+分类） | — |
| GET | `/api/posts/:id` | 帖子详情 | — |
| POST | `/api/posts` | 发布帖子 | JWT |
| PUT | `/api/posts/:id` | 编辑帖子 | JWT(作者) |
| DELETE | `/api/posts/:id` | 删除帖子 | JWT(作者/管理员) |
| POST | `/api/posts/:id/pin` | 置顶/取消置顶 | JWT(管理员) |
| POST | `/api/posts/:id/lock` | 锁定/解锁 | JWT(管理员) |
| POST | `/api/posts/:id/hide` | 隐藏/显示 | JWT(作者) |

### 评论相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/posts/:id/comments` | 获取评论列表 | — |
| POST | `/api/posts/:id/comments` | 发布评论 | JWT |
| DELETE | `/api/comments/:id` | 删除评论 | JWT(作者/管理员) |

### 点赞相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/posts/:id/like` | 点赞/取消点赞 | JWT |
| GET | `/api/posts/:id/likes` | 查看点赞用户 | — |

### 上传

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/upload` | 上传图片（帖子/头像） | JWT |

### 管理后台

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/admin/users` | 用户列表 | JWT(管理员) |
| PUT | `/api/admin/users/:id` | 修改用户信息 | JWT(管理员) |
| POST | `/api/admin/users/:id/delete` | 删除用户 | JWT(管理员) |
| POST | `/api/admin/users/:id/ban` | 封禁用户 | JWT(管理员) |
| POST | `/api/admin/users/:id/unban` | 解封用户 | JWT(管理员) |
| GET | `/api/admin/categories` | 分类列表 | JWT(管理员) |
| POST | `/api/admin/categories` | 创建分类 | JWT(管理员) |
| PUT | `/api/admin/categories/:id` | 编辑分类 | JWT(管理员) |
| DELETE | `/api/admin/categories/:id` | 删除分类 | JWT(管理员) |
| GET | `/api/admin/settings` | 获取站点设置 | JWT(管理员) |
| POST | `/api/admin/settings` | 更新站点设置 | JWT(管理员) |
| GET | `/api/admin/cleanup/analyze` | 分析孤立文件 | JWT(管理员) |
| POST | `/api/admin/cleanup/execute` | 执行清理 | JWT(管理员) |
| GET | `/api/admin/audit-logs` | 审计日志 | JWT(管理员) |

### 站点配置相关

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/site-settings` | 公开站点配置 | — |

---

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) ≥ 18
- [Cloudflare 账号](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install -g wrangler`)

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/adysec/cfwforum-work.git
cd cfwforum-work

# 2. 安装依赖
npm install

# 3. 创建 D1 数据库
wrangler d1 create cfwforum-data

# 4. 创建 R2 存储桶
wrangler r2 bucket create cfworkforum-work

# 5. 将创建好的资源 ID 填入 wrangler.jsonc

# 6. 应用数据库迁移
npm run db:migrate:local

# 7. 启动开发服务器
npm run dev
# 访问 http://localhost:8787
```

---

## 📦 部署指南

### 方法一：GitHub Actions 自动部署（推荐）

项目内置 CI/CD，推送到 `main` 分支自动部署。

#### 1. 获取 Cloudflare API Token

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **My Profile → API Tokens → Create Token**
3. 配置权限：
   - Account → Workers Scripts: **Edit**
   - Account → D1: **Edit**
   - Account → R2: **Edit**
   - Account → Pages: **Edit**
4. 创建后复制 Token

#### 2. 获取 Account ID

Cloudflare Dashboard 首页右侧栏 → **Account ID**

#### 3. 配置 GitHub Secrets

进入仓库 **Settings → Secrets and variables → Actions**，添加以下 Secrets：

| Secret 名称 | 说明 | 是否必需 |
|------------|------|----------|
| `CF_API_TOKEN` | Cloudflare API Token | ✅ 必需 |
| `CF_ACCOUNT_ID` | Cloudflare 账户 ID | ✅ 必需 |
| `JWT_SECRET` | JWT 签名密钥（≥32 字符） | ✅ 必需 |
| `WORKER_URL` | Worker 地址（如 `https://cfwforum-work.xxx.workers.dev`） | ✅ 必需 |
| `BASE_URL` | 站点公开域名（如 `https://forum.example.com`） | ⚠️ 未配置影响邮件链接 |
| `TURNSTILE_SITE_KEY` | Turnstile 站点密钥 | ⚠️ 未配置禁用验证码 |
| `TURNSTILE_SECRET_KEY` | Turnstile 密钥 | ⚠️ 未配置禁用验证码 |
| `RESEND_KEY` | Resend API Key | ⚠️ 未配置禁用邮件 |
| `RESEND_FROM` | 发件人邮箱 | ⚠️ 未配置禁用邮件 |
| `RESEND_FROM_NAME` | 发件人名称 | 可选 |

#### 4. 触发部署

1. GitHub → **Actions** → **Deploy to Cloudflare**
2. 点击 **Run workflow** → 选择 `main` 分支 → 确认

### 方法二：手动部署

```bash
# 构建前端 + 部署 Worker + 部署 Pages
npm run deploy:hybrid

# 或分步执行：
npm run build:frontend    # 构建前端
npm run deploy:worker     # 部署 Worker
npm run deploy:pages      # 部署 Pages
```

### 方法三：一键部署按钮

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/adysec/cfwforum-work)

---

## 🔧 环境变量

所有环境变量均在 `wrangler.jsonc` 的 `vars` 和 GitHub Secrets 中配置：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `JWT_SECRET` | JWT 签名密钥 | — |
| `WORKER_URL` | Worker 访问地址 | — |
| `TURNSTILE_SITE_KEY` | Turnstile 前端 Key | 空（禁用） |
| `TURNSTILE_SECRET_KEY` | Turnstile 后端 Secret | 空（禁用） |
| `RESEND_KEY` | Resend API Key | 空（禁用邮件） |
| `RESEND_FROM` | 发件人邮箱地址 | 空 |
| `RESEND_FROM_NAME` | 发件人显示名称 | "论坛管理员" |
| `AWS_ACCESS_KEY_ID` | S3 Access Key | 空（使用 R2） |
| `AWS_SECRET_ACCESS_KEY` | S3 Secret Key | 空（使用 R2） |
| `AWS_REGION` | S3 区域 | 空 |
| `AWS_ENDPOINT` | S3 端点 URL | 空（使用 R2） |
| `AWS_BUCKET` | S3 存储桶名称 | 空（使用 R2） |
| `R2_PUBLIC_BASE_URL` | R2 公开访问基础 URL | `/r2` |

### 自定义域名绑定

采用 Pages 单域名方案，只需绑定 Pages 项目域名：

1. Cloudflare Dashboard → **Pages** → 选择 `cfwforum-page` 项目
2. **Custom domains** → 添加你的域名（如 `forum.example.com`）
3. DNS 记录自动配置完成

---

## 💻 本地开发

```bash
# 安装依赖
npm install

# 仅启动前端开发（热更新）
npm run dev:frontend

# 启动完整开发环境（Worker + 前端）
npm run dev

# 启动 Pages Functions 模式（模拟生产环境）
npm run dev:pages

# 数据库操作
npm run db:migrate        # 应用生产迁移
npm run db:migrate:local  # 应用本地迁移
npm run db:reset          # 重置生产数据库
npm run db:reset:local    # 重置本地数据库

# 运行测试
npm test

# 生成 Cloudflare 类型
npm run cf-typegen
```

### 默认管理员账号

首次部署后自动创建，**请立即修改密码**：

- 📧 邮箱：`admin@adysec.com`
- 🔑 密码：系统生成的哈希值（需通过忘记密码重置）

---

## 📄 许可证

[MIT License](LICENSE)

---

## 🙏 致谢

- 原始项目 [adysec/CForum](https://github.com/adysec/CForum)
- 后端参考 [afoim/acofork_forum_backend](https://github.com/afoim/acofork_forum_backend)
- 构建于 [Cloudflare Workers](https://workers.cloudflare.com/) 平台
