-- ============================================
-- Supabase 数据库初始化脚本
-- 在 Supabase Dashboard > SQL Editor 中运行此脚本
-- ============================================

-- 1. 创建新闻表
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT '公司动态',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_is_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

-- 3. 启用 Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 4. 创建 RLS 策略

-- 所有人可以查看已发布的新闻
CREATE POLICY "允许所有人查看已发布新闻" ON news
  FOR SELECT
  USING (is_published = true);

-- 已登录用户可以查看所有新闻（包括草稿）
CREATE POLICY "已登录用户可查看所有新闻" ON news
  FOR SELECT
  TO authenticated
  USING (true);

-- 已登录用户可以创建新闻
CREATE POLICY "已登录用户可创建新闻" ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 已登录用户可以更新新闻
CREATE POLICY "已登录用户可更新新闻" ON news
  FOR UPDATE
  TO authenticated
  USING (true);

-- 已登录用户可以删除新闻
CREATE POLICY "已登录用户可删除新闻" ON news
  FOR DELETE
  TO authenticated
  USING (true);

-- 5. 插入一些示例数据（可选）
INSERT INTO news (title, slug, summary, content, category, is_published) VALUES
(
  '欢迎使用新闻管理系统',
  'welcome-to-news-system',
  '这是一个基于 Next.js 和 Supabase 构建的全栈新闻管理系统，支持发布、编辑和管理新闻内容。',
  '<p>欢迎使用我们的新闻管理系统！</p><p>这个系统具有以下特点：</p><ul><li>简洁现代的用户界面</li><li>便捷的后台管理</li><li>支持草稿和发布状态切换</li><li>响应式设计，支持移动端</li></ul><p>开始使用吧！</p>',
  '公司动态',
  true
);
