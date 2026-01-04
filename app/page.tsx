'use client'

import { Shield, TrendingUp, Globe, ArrowRight, Activity, Lock, ChevronDown, Coins, Cpu } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FluidGridBackground from '@/components/FluidGridBackground'

// Card Component
const Card = ({ title, desc, icon: Icon, features, step }: {
  title: string
  desc: string
  icon: any
  features: string[]
  step: string
}) => (
  <div className="group relative border-l border-white/10 pl-8 py-4 hover:border-white transition-colors duration-500">
    <div className="absolute -left-[5px] top-0 h-0 w-[9px] bg-white group-hover:h-full transition-all duration-700 ease-in-out"></div>

    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-gray-500">0{step}</span>
        <h3 className="text-2xl font-serif font-bold text-white group-hover:tracking-wider transition-all duration-500">{title}</h3>
      </div>
      <Icon className="text-gray-600 group-hover:text-white transition-colors" size={24} />
    </div>

    <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">
      {desc}
    </p>

    <ul className="space-y-2">
      {features.map((f, i) => (
        <li key={i} className="flex items-center text-xs text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">
          <span className="w-1.5 h-1.5 bg-gray-700 group-hover:bg-white mr-3 rounded-full transition-colors"></span>
          {f}
        </li>
      ))}
    </ul>
  </div>
)

// Data Stat Component
const DataStat = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col">
    <div className={`font-serif font-bold text-white mb-1 tracking-tight ${value === 'Coming Soon' ? 'text-xl text-cyan-400 font-mono tracking-normal' : 'text-3xl lg:text-4xl'}`}>
      {value}
    </div>
    <div className="text-sm text-gray-500 font-sans">{label}</div>
  </div>
)

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <FluidGridBackground />
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full pt-20">
          <div className="inline-flex items-center gap-3 mb-8 border border-white/20 rounded-full px-4 py-1 bg-black/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Protocol Systems Active</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-[0.9] tracking-tight mix-blend-exclusion">
            Liquidity <br />
            <span className="italic font-light opacity-80">Engineered.</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-start md:items-end border-l-2 border-white/20 pl-8 ml-2">
            <p className="max-w-xl text-lg text-gray-400 leading-relaxed">
              Unified Labs bridges the divide between <span className="text-white font-bold">Traditional Finance</span> solidity and <span className="text-white font-bold">DeFi</span> agility. We curate risk, make markets, and engineer the future of yield.
            </p>

            <button className="group flex items-center gap-4 text-white font-bold tracking-widest uppercase text-sm hover:text-gray-300 transition-colors">
              Explore The Platform
              <span className="p-2 border border-white/30 rounded-full group-hover:border-white group-hover:rotate-45 transition-all duration-300">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full text-center animate-bounce opacity-50">
          <ChevronDown className="mx-auto" />
        </div>
      </section>

      {/* --- DATA STREAM SECTION --- */}
      <section className="relative z-10 bg-black/60 backdrop-blur-xl border-y border-white/10 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

            {/* Column 1: Digital Assets */}
            <div>
              <h3 className="text-white font-sans text-xs uppercase tracking-[0.2em] font-medium mb-6 pb-2 border-b border-gray-800">
                Digital Assets
              </h3>
              <div className="space-y-8">
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-serif font-bold text-white">AuM</span>
                    <span className="text-sm font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-900/20 border border-cyan-900/50">Coming Soon</span>
                  </div>
                  <div className="text-gray-500 text-sm tracking-wide">Assets under Management</div>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-serif font-bold text-white">TVL</span>
                    <span className="text-sm font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-900/20 border border-cyan-900/50">Coming Soon</span>
                  </div>
                  <div className="text-gray-500 text-sm tracking-wide">Total Value Locked</div>
                </div>
              </div>
            </div>

            {/* Column 2: Operating Ecosystem */}
            <div>
              <h3 className="text-white font-sans text-xs uppercase tracking-[0.2em] font-medium mb-6 pb-2 border-b border-gray-800">
                Operating Ecosystem
              </h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-8">
                <DataStat value="Coming Soon" label="Underlying blockchains" />
                <DataStat value="Coming Soon" label="Whitelisted protocols" />
                <DataStat value="Coming Soon" label="Monthly on-chain volume" />
                <DataStat value="Coming Soon" label="Curated vaults" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE BUSINESS --- */}
      <section id="services" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              The Unified <br /> Architecture
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-4 md:mt-0">
              Four Pillars of Infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            <Card
              step="1"
              title="Risk Curator"
              icon={Shield}
              desc="Providing institutional-grade curation services similar to Gauntlet. We curate risks, optimize parameters dynamically for customers, and offer Curator-as-a-Service."
              features={["Vault Curation (Morpho/Aave)", "Curator-as-a-Service", "Dynamic Parameter Optimization"]}
            />
            <Card
              step="2"
              title="Market Making"
              icon={TrendingUp}
              desc="Providing deep liquidity where it matters. Our algo-trading infrastructure bridges CEX and DEX liquidity across Asia-Pacific markets."
              features={["Launch Day Liquidity", "Delta Neutral Strategy", "Cross-Venue Arbitrage"]}
            />
            <Card
              step="3"
              title="Advisory"
              icon={Globe}
              desc="Guiding institutions through the digital transition. Strategic consultancy for RWA tokenization and treasury management."
              features={["RWA Tokenization", "Treasury Management", "Risk Curator"]}
            />
            <Card
              step="4"
              title="Asset Management"
              icon={Coins}
              desc="Proprietary active management for digital assets. We leverage quantitative strategies to capture on-chain alpha and maximize risk-adjusted returns."
              features={["Proprietary Quant Strategies", "Active Yield Management", "Multi-Chain Alpha Capture"]}
            />
          </div>
        </div>
      </section>

      {/* --- TECH SHOWCASE --- */}
      <section id="technology" className="relative z-10 py-32 bg-white text-black overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-100 transform skew-x-12 translate-x-32 z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-black text-white text-xs font-mono uppercase tracking-widest mb-6">
                Proprietary Tech
              </div>
              <h2 className="text-5xl font-serif font-bold mb-8">
                Agent-Based <br />Simulation (ABS)
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed font-light">
                Traditional risk models are static. Ours are alive. <br /><br />
                We simulate millions of market scenarios daily, treating every protocol participant as an autonomous agent. This allows us to predict cascading liquidations and adjust parameters on-chain <strong>before</strong> the crisis hits.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Activity size={24} className="mt-1" />
                  <div>
                    <h4 className="font-bold text-xl">Dynamic Optimization</h4>
                    <p className="text-gray-600 text-sm">Real-time adjustment of LTVs and borrow caps based on liquidity depth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Lock size={24} className="mt-1" />
                  <div>
                    <h4 className="font-bold text-xl">Atomic Safety</h4>
                    <p className="text-gray-600 text-sm">Automated circuit breakers triggered by oracle deviations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] w-full bg-black flex items-center justify-center p-8 shadow-2xl">
              <div className="absolute inset-0 border border-gray-800">
                <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              </div>

              <div className="text-center relative z-10">
                <Cpu size={64} className="text-white mx-auto mb-6 animate-pulse" />
                <div className="font-mono text-green-500 text-sm mb-2">{'>'} SIMULATION_RUNNING</div>
                <div className="font-mono text-gray-500 text-xs">Processing Block #1829304...</div>

                <div className="mt-8 grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white opacity-20 animate-ping" style={{ animationDelay: `${i * 100}ms` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
