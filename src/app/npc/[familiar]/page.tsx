'use client'

import {ArrowLeftIcon} from 'lucide-react'
import {notFound, useParams} from 'next/navigation'
import ChatInterface from '@/components/ChatInterface'
import {FamiliarData, useFamiliarStore} from '@/lib/store'
import {useEffect, useState} from 'react'

type FamiliarType = 'duwende' | 'adarna' | 'sundo' | 'diwata'

const FamiliarProfile = () => {
  const {getFamiliar, setFamiliars, familiars} = useFamiliarStore()
  const [npc, setNPC] = useState<FamiliarData | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams<{familiar: string}>()
  const familiarName = params.familiar as FamiliarType

  useEffect(() => {
    const fetchData = async () => {
      if (familiars.length === 0) {
        await setFamiliars()
      }
      const fetchedNPC = getFamiliar(familiarName)
      setNPC(fetchedNPC || null)
      setLoading(false)
    }

    fetchData()
  }, [familiars, familiarName, setFamiliars, getFamiliar])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-800 text-white">
        <p>Loading...</p>
      </div>
    )
  }

  if (!npc) return notFound()

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-800 via-black to-gray-900 text-white">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg md:flex-row">
        <div className="relative md:w-1/4">
          <button
            className="absolute left-4 top-4 z-10 rounded bg-indigo-500 px-4 py-1 text-sm font-semibold text-white shadow hover:bg-indigo-600"
            onClick={() => window.history.back()}>
            <ArrowLeftIcon />
          </button>

          {/* Image */}
          <div className="relative mx-auto mt-10 h-40 w-40 overflow-hidden rounded-full shadow-md sm:h-48 sm:w-48">
            <img src={npc.imageUrl} alt={npc.name} className="h-full w-full object-cover" />
          </div>

          {/* Familiar Details */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold capitalize text-indigo-300">{npc.name}</h1>
            <p className="ml-5 text-left text-sm text-gray-400">
              Health: <span className="font-semibold text-indigo-400">{npc.health}</span> <br />
              Food: <span className="font-semibold text-indigo-400">{npc.food}</span> <br />
              Coins: <span className="font-semibold text-indigo-400">{npc.coins}</span> <br />
              Karmic Energy:{' '}
              <span className="font-semibold text-indigo-400">{npc.karmicEnergy}</span> <br />
              Current Location:{' '}
              <span className="font-semibold text-indigo-400">{npc.location}</span> <br />
            </p>
          </div>
        </div>

        {/* Right side: Familiar details and Chat interface */}
        <div className="flex flex-col justify-between md:w-3/4">
          <div>
            <ChatInterface familiar={npc} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FamiliarProfile
