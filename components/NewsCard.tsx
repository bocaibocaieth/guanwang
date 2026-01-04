import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag } from 'lucide-react'
import { News } from '@/lib/supabase'

interface NewsCardProps {
  news: News
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link href={`/news/${news.slug}`}>
      <article className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden group">
        {news.cover_image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={news.cover_image}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(news.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {news.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {news.summary}
          </p>
        </div>
      </article>
    </Link>
  )
}
