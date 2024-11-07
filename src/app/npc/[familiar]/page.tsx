'use client'

import {notFound, useParams} from 'next/navigation'

type FamiliarType = 'duwende' | 'adarna' | 'sundo' | 'diwata'

interface Props {
  params: {familiar: FamiliarType}
}

const FamiliarProfile = () => {
  const params = useParams<{familiar: string}>()
  const familiarName = params.familiar as FamiliarType

  const npcData = [
    {
      id: 'duwende',
      name: 'Duwende',
      health: 100,
      food: 5,
      coins: 5,
      karmicEnergy: 0,
      location: 'Home',
      story:
        'A quiet and enigmatic presence, Duwende emerges from the shadowed groves and hidden caves of Kusho World. Known as the guardian of hidden treasures, Duwende protects the essence of the earth, moving with unparalleled stealth and wisdom. Duwende is deeply connected to the land and senses disturbances in the karmic flow instinctively. On their quest, they gather energy with resilience and caution, compelled by an ancient duty to preserve harmony and stability.',
      imageUrl: '/images/duwende.webp',
    },
    {
      id: 'adarna',
      name: 'Adarna',
      health: 100,
      food: 5,
      coins: 5,
      karmicEnergy: 0,
      location: 'Home',
      story:
        'The mystical Adarna is a radiant bird of ethereal beauty, with feathers that shimmer in hues of twilight and dawn. Legends say its songs heal the soul and protect the lands from darkness. Adarna’s purpose is to gather karmic energy and restore vitality to Kusho’s fading balance. As a protector, Adarna moves with grace and strength, blessing those who encounter it with courage and guiding its fellow familiars through moments of crisis.',
      imageUrl: '/images/adarna.webp',
    },
    {
      id: 'sundo',
      name: 'Sundo',
      health: 100,
      food: 5,
      coins: 5,
      karmicEnergy: 0,
      location: 'Home',
      story:
        'Gentle yet powerful, Sundo is known as the soul-guide, a figure who aids in transitions and protects Kusho’s wayward spirits. Sundo’s abilities are rooted in compassion and understanding, making them a trusted figure in the familiar ranks. They bear the weight of Kusho’s troubles with calm resolve, guiding lost energies back toward harmony. Their presence is essential in the quest to maintain balance, as Sundo understands both the seen and unseen forces affecting Kusho.',
      imageUrl: '/images/sundo.webp',
    },
    {
      id: 'diwata',
      name: 'Diwata',
      health: 100,
      food: 5,
      coins: 5,
      karmicEnergy: 0,
      location: 'Home',
      story:
        'Graceful and attuned to nature, Diwata is a spirit of the forests, waters, and winds. Revered as a healer, Diwata embodies the natural elements, drawing strength from the world around them. They work to cleanse the karmic disruptions, restoring peace and helping other familiars withstand Kusho’s shifts. With a spirit as boundless as the sky, Diwata is deeply dedicated to their mission, acting as a bridge between the familiar world and the natural forces that sustain it.',
      imageUrl: '/images/diwata.webp',
    },
  ];

  const npc = npcData.find(x => x.id === familiarName);

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
            <h1>Chat here with the familiar</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FamiliarProfile
