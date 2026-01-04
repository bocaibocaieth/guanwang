import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black text-white pt-24 pb-12 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <div className="max-w-md">
            <Logo />
            <p className="mt-8 text-gray-400 leading-relaxed text-sm">
              Unified Labs is an institutional-grade DeFi infrastructure company. We combine deep liquidity networks with rigorous mathematical risk curation.
            </p>
          </div>

          <div className="flex gap-20">
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Business</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link href="/#services" className="hover:text-white transition-colors">Risk Curator</Link></li>
                <li><Link href="/#services" className="hover:text-white transition-colors">Market Making</Link></li>
                <li><Link href="/#services" className="hover:text-white transition-colors">Advisory</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Connect</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600 font-mono uppercase tracking-wider">
          <div>&copy; 2025 Unified Labs. All rights reserved.</div>
          <div className="mt-4 md:mt-0">Hong Kong • Singapore • Dubai</div>
        </div>
      </div>
    </footer>
  )
}
