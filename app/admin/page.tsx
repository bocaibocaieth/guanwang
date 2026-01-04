'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Newspaper, Eye, FileText } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: allNews } = await supabase
        .from('news')
        .select('id, is_published')

      if (allNews) {
        setStats({
          total: allNews.length,
          published: allNews.filter(n => n.is_published).length,
          draft: allNews.filter(n => !n.is_published).length
        })
      }
      setLoading(false)
    }

    fetchStats()
  }, [])

  const statCards = [
    { label: '全部新闻', value: stats.total, icon: Newspaper, color: 'bg-blue-500' },
    { label: '已发布', value: stats.published, icon: Eye, color: 'bg-green-500' },
    { label: '草稿', value: stats.draft, icon: FileText, color: 'bg-yellow-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">仪表盘</h1>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {card.value}
              </div>
              <div className="text-gray-500">{card.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Newspaper className="w-5 h-5" />
          发布新新闻
        </Link>
      </div>
    </div>
  )
}
