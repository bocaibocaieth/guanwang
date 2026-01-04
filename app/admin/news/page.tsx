'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, News } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

export default function NewsManagePage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setNews(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('news')
      .update({ is_published: !currentStatus })
      .eq('id', id)

    if (!error) {
      setNews(news.map(n =>
        n.id === id ? { ...n, is_published: !currentStatus } : n
      ))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇新闻吗？')) return

    setDeleting(id)
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (!error) {
      setNews(news.filter(n => n.id !== id))
    }
    setDeleting(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新闻管理</h1>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          发布新闻
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">加载中...</div>
        ) : news.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            暂无新闻，点击上方按钮发布第一篇新闻
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">标题</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">分类</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">日期</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 line-clamp-1 max-w-xs">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      item.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.is_published ? (
                        <><Eye className="w-3 h-3" /> 已发布</>
                      ) : (
                        <><EyeOff className="w-3 h-3" /> 草稿</>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(item.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePublish(item.id, item.is_published)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title={item.is_published ? '下架' : '上架'}
                      >
                        {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <Link
                        href={`/admin/news/edit/${item.id}`}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleting === item.id}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
