-- ============================================
-- Supabase 数据库初始化脚本
-- 在 Supabase Dashboard > SQL Editor 中运行此脚本
-- ============================================

-- 1. 创建文章表 (支持 News 和 Insights 两种类型)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'Company Updates',
  post_type TEXT NOT NULL DEFAULT 'news' CHECK (post_type IN ('news', 'insight')),
  author TEXT,
  read_time INTEGER, -- 阅读时间（分钟），用于 Insights
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_post_type ON posts(post_type);
CREATE INDEX IF NOT EXISTS idx_posts_is_published ON posts(is_published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- 3. 启用 Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 4. 创建 RLS 策略

-- 所有人可以查看已发布的文章
CREATE POLICY "允许所有人查看已发布文章" ON posts
  FOR SELECT
  USING (is_published = true);

-- 已登录用户可以查看所有文章（包括草稿）
CREATE POLICY "已登录用户可查看所有文章" ON posts
  FOR SELECT
  TO authenticated
  USING (true);

-- 已登录用户可以创建文章
CREATE POLICY "已登录用户可创建文章" ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 已登录用户可以更新文章
CREATE POLICY "已登录用户可更新文章" ON posts
  FOR UPDATE
  TO authenticated
  USING (true);

-- 已登录用户可以删除文章
CREATE POLICY "已登录用户可删除文章" ON posts
  FOR DELETE
  TO authenticated
  USING (true);

-- 5. 插入示例数据

-- News 示例
INSERT INTO posts (title, slug, summary, content, category, post_type, is_published) VALUES
(
  'Unified Labs Launches New Risk Curation Platform',
  'unified-labs-launches-risk-curation',
  'We are excited to announce the launch of our institutional-grade risk curation platform, designed to optimize DeFi vault parameters in real-time.',
  '<p>Today marks a significant milestone for Unified Labs as we officially launch our Risk Curation Platform.</p><p>Key features include:</p><ul><li>Real-time parameter optimization</li><li>Multi-chain support</li><li>Institutional-grade security</li></ul>',
  'Company Updates',
  'news',
  true
);

-- Insight 示例
INSERT INTO posts (title, slug, summary, content, category, post_type, author, read_time, is_published) VALUES
(
  'The Future of Institutional DeFi: Bridging TradFi and On-Chain Finance',
  'future-of-institutional-defi',
  'An in-depth analysis of how institutional players are reshaping the DeFi landscape and what it means for the future of finance.',
  '<p>The convergence of traditional finance and decentralized finance represents one of the most significant shifts in the financial industry...</p><h2>The Current State of Institutional DeFi</h2><p>Over the past two years, we have witnessed a dramatic increase in institutional participation in DeFi protocols...</p><h2>Key Challenges and Opportunities</h2><p>Despite the growth, several challenges remain for institutional adoption...</p><h2>Looking Ahead</h2><p>The future of institutional DeFi will be defined by...</p>',
  'Research',
  'insight',
  'Unified Labs Research',
  12,
  true
);
