import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unified Labs - News',
  description: 'Latest news and updates from Unified Labs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
