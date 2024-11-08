'use client'

import {notFound, useParams} from 'next/navigation'
import ChatInterface from '@/components/ChatInterface'
import {useFamiliarStore} from '@/lib/store'
import {useEffect, useState} from 'react'

type FamiliarType = 'duwende' | 'adarna' | 'sundo' | 'diwata'

interface Props {
  params: {familiar: FamiliarType}
}

const FamiliarProfile = () => {
  const params = useParams<{familiar: string}>()
  const familiarName = params.familiar as FamiliarType

  // Zustand selector for the specific familiar, with reactivity to changes
  const npc = useFamiliarStore((state: any) => state.getFamiliar(familiarName))

  if (!npc) return notFound()
  console.log('@@@ NPC:', npc)
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-800 via-black to-gray-900 text-white">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg md:flex-row">
        {/* Left side: Image and details */}
        <div className="md:w-1/4">
          <div className="w-50 h-50 overflow-hidden rounded-full shadow-md">
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
