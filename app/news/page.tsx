import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
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
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-3 py-1 border border-white/20 text-xs font-mono uppercase tracking-widest mb-6 text-gray-400">
            Insights & Updates
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            News & <br />
            <span className="italic font-light opacity-80">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Stay updated with the latest developments, market insights, and announcements from Unified Labs.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-white/10">
              <p className="text-gray-400 text-lg font-serif">No news yet</p>
              <p className="text-gray-600 mt-2 font-mono text-sm">Check back soon for updates</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
