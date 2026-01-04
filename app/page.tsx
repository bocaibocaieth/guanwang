import Header from '@/components/Header'
import NewsCard from '@/components/NewsCard'
import { supabase } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60 // 每分钟重新验证

async function getLatestNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const news = await getLatestNews()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unified Labs 新闻中心
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            获取最新的公司动态、产品更新和行业资讯
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">最新新闻</h2>
            <Link
              href="/news"
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border">
              <p className="text-gray-500 text-lg">暂无新闻</p>
              <p className="text-gray-400 mt-2">敬请期待更多内容</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Unified Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
