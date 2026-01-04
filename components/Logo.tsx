'use client'

export default function Logo() {
  return (
    <div className="flex items-center gap-4 select-none group">
      {/* The Symbol: From Void (Blur) to Solid */}
      <div className="relative w-16 h-10 flex items-center justify-end">
        {/* 1. The "Virtual" Trail (Left side blur) */}
        <div
          className="absolute right-0 w-16 h-8 bg-gradient-to-l from-white to-transparent opacity-40 blur-md transform -translate-x-2 group-hover:-translate-x-4 transition-transform duration-700 ease-out"
          style={{ clipPath: 'polygon(0% 10%, 100% 0%, 100% 100%, 0% 90%)' }}
        ></div>

        {/* 2. The "Motion" Mid-layer (Connecting blur) */}
        <div className="absolute right-2 w-8 h-8 bg-gradient-to-l from-white/80 to-transparent blur-[2px]"></div>

        {/* 3. The "Real" Solid Object (Right side square) */}
        <div className="relative z-10 w-8 h-8 bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
      </div>

      {/* The Typography */}
      <div className="flex flex-col justify-center">
        <div className="font-serif text-2xl font-bold text-white leading-none tracking-wide">
          Unified
        </div>
        {/* The Separator Line */}
        <div className="h-[2px] w-full bg-white my-[2px] origin-left transform group-hover:scale-x-110 transition-transform duration-500"></div>
        <div className="font-serif text-2xl font-bold text-white leading-none tracking-wide">
          Labs
        </div>
      </div>
    </div>
  )
}
