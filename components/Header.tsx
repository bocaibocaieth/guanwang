'use client'

import Link from 'next/link'
import { Newspaper } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Newspaper className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Unified Labs</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              首页
            </Link>
            <Link href="/news" className="text-gray-600 hover:text-primary-600 transition-colors">
              新闻中心
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
