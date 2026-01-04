'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image: '',
    category: '公司动态',
    is_published: false
  })

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !data) {
        alert('新闻不存在')
        router.push('/admin/news')
      } else {
        setFormData({
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          content: data.content,
          cover_image: data.cover_image || '',
          category: data.category,
          is_published: data.is_published
        })
      }
      setLoading(false)
    }

    fetchNews()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('news')
      .update({
        ...formData,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)

    if (error) {
      alert('保存失败：' + error.message)
      setSaving(false)
    } else {
      router.push('/admin/news')
    }
  }

  const categories = ['公司动态', '产品更新', '行业资讯', '技术分享', '活动公告']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/news"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">编辑新闻</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid gap-6">
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标题 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="输入新闻标题"
              required
            />
          </div>

          {/* 分类 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              分类 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 封面图片 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              封面图片 URL
            </label>
            <input
              type="url"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* 摘要 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              摘要 *
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
              rows={3}
              placeholder="简短描述新闻内容（显示在列表页）"
              required
            />
          </div>

          {/* 正文内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              正文内容 * <span className="text-gray-400 font-normal">(支持 HTML)</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none font-mono text-sm"
              rows={12}
              placeholder="<p>在这里输入新闻正文内容...</p>"
              required
            />
          </div>

          {/* 发布状态 */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="is_published" className="text-sm text-gray-700">
              已发布（不勾选则保存为草稿）
            </label>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? '保存中...' : '保存更改'}
          </button>
          <Link
            href="/admin/news"
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  )
}
