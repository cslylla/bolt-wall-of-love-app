import { useState } from 'react'

export default function FlipCard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="absolute w-full h-full bg-[#1a1a1f] border border-white/10 rounded-2xl p-8 flex items-center justify-center backface-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-shadow"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-3xl font-bold text-white">{front}</h3>
        </div>

        <div
          className="absolute w-full h-full bg-[#1a1a1f] border border-white/10 rounded-2xl p-8 flex items-center justify-center backface-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-shadow"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-lg text-gray-300 leading-relaxed">{back}</p>
        </div>
      </div>
    </div>
  )
}
