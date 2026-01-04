import Header from '@/components/Header'
import NewsCard from '@/components/NewsCard'
import { supabase } from '@/lib/supabase'

export const revalidate = 60

async function getAllNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

export default async function NewsListPage() {
  const news = await getAllNews()

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">新闻中心</h1>

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
    </div>
  )
}
