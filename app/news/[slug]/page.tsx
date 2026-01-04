import Header from '@/components/Header'
import { supabase } from '@/lib/supabase'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function NewsDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const news = await getNewsBySlug(params.slug)

  if (!news) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回新闻列表
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(news.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {news.category}
            </span>
          </div>
        </header>

        {news.cover_image && (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={news.cover_image}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </article>
    </div>
  )
}
