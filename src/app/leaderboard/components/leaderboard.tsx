'use client'
import React, {useCallback} from 'react'

type Guardian = {
  health: number
  location: string
  coins: string
  karmic: string
  food: string
  equipments: Record<string, unknown> // More specific type than 'object'
  name: string
  tokenId: number
  address: string
  story: string
  imageUrl: string
}

type SortCriteriaType = 'karmic' | 'food' | 'coins'

type MousePosition = {
  x: number
  y: number
}

function Leaderboard({data}: {data: Guardian[]}) {
  const [sortCriteria, setSortCriteria] = React.useState<SortCriteriaType>('karmic')
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({x: 0, y: 0})

  const handleMouseMove = React.useCallback((event: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
  }, [])

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  const getRankGradient = useCallback((rank: number): string => {
    if (rank === 1) return 'from-yellow-500/20 to-yellow-300/20'
    if (rank === 2) return 'from-gray-300/20 to-gray-100/20'
    if (rank === 3) return 'from-amber-700/20 to-amber-500/20'
    return 'from-indigo-500/20 to-purple-500/20'
  }, [])

  const getRankBorderColor = useCallback((rank: number): string => {
    if (rank === 1) return 'border-yellow-500/20'
    if (rank === 2) return 'border-gray-300/20'
    if (rank === 3) return 'border-amber-700/20'
    return 'border-indigo-500/20'
  }, [])

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => Number(b[sortCriteria]) - Number(a[sortCriteria]))
  }, [data, sortCriteria])

  return (
    <main className="font-Geist relative flex min-h-screen justify-center overflow-hidden bg-gray-900">
      <div className="relative z-10 w-full max-w-6xl bg-transparent px-4 py-[100px]">
        <h1 className="mb-4 text-3xl text-white">Guardian Leaderboard</h1>

        {/* Sort controls */}
        <div className="mb-6 flex gap-4">
          {(['karmic', 'food', 'coins'] as const).map((criteria) => (
            <button
              key={criteria}
              onClick={() => setSortCriteria(criteria)}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                sortCriteria === criteria
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}>
              Sort by {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
            </button>
          ))}
        </div>

        {/* Labels header */}
        <div className="mb-2 flex items-center px-4 text-sm text-gray-400">
          <div className="w-[80px]">Rank</div>
          <div className="w-[110px]">Guardian</div>
          <div className="flex-1">TBA/Name</div>
          <div className="ml-auto flex items-center gap-8">
            <div className="w-[80px] text-center">Karmic</div>
            <div className="w-[80px] text-center">Food</div>
            <div className="w-[80px] text-center">Coins</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {sortedData.map((guardian, index) => (
            <div
              key={guardian.tokenId}
              className={`relative w-full border ${getRankBorderColor(index + 1)} bg-[#0F0F1A]`}>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${getRankGradient(index + 1)} blur-sm`}
              />

              <div className="relative flex items-center gap-4 p-4">
                <div className="w-[60px] font-bold text-indigo-400">#{index + 1}</div>

                <div className="w-[100px]">
                  <img
                    src={guardian.imageUrl}
                    alt={guardian.name}
                    className="h-12 w-12 rounded-full"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="text-sm text-gray-400">{guardian.address}</div>
                  <div className="text-xs text-gray-500">{guardian.name}</div>
                </div>

                <div className="ml-auto flex items-center gap-8">
                  <div className="w-[80px] text-center text-purple-400">{guardian.karmic}</div>
                  <div className="w-[80px] text-center text-green-400">{guardian.food}</div>
                  <div className="w-[80px] text-center text-yellow-400">{guardian.coins}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="parallax-background fixed left-0 top-0 h-full min-h-screen w-screen bg-[url('/assets/BG.png')] bg-cover bg-center bg-repeat"
        style={{
          transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px) scale(1.2)`,
          zIndex: 1,
        }}
      />
    </main>
  )
}

export default Leaderboard
