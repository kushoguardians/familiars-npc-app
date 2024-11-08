'use client'

import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

type Creator = 'USER' | 'AI'

type Message = {
  id: string
  text: string
  createdAt: Date
  creator: Creator
}

type MessageState = {
  messages: Message[]
  setMessages: (creator: Creator, message: string) => void
  clearMessages: () => void
}

type FamiliarType = 'duwende' | 'adarna' | 'sundo' | 'diwata'

export interface FamiliarData {
  id: string
  name: string
  health: number
  food: number
  coins: number
  karmicEnergy: number
  location: string
  story: string
  imageUrl: string
}

interface FamiliarStore {
  familiars: FamiliarData[]
  getFamiliar: (id: string) => FamiliarData | undefined
  updateFamiliar: (id: string, updates: Partial<FamiliarData>) => void
}

const generateRandomId = () => Math.random().toString(36).substring(2, 9)

export const useMessages = create(
  persist<MessageState>(
    (set, get: any) => ({
      messages: get()?.messages || [],
      clearMessages: () => {
        return set({
          messages: [],
        })
      },
      setMessages: (creator: Creator, message: string) => {
        return set(() => {
          const storedMessages = get().messages

          const lastMessage = storedMessages[storedMessages.length - 1]
          // if (!lastMessage) return storedMessages

          if (creator === 'AI' && lastMessage.creator === 'AI') {
            return {
              messages: [...storedMessages.slice(0, -1), {...lastMessage, text: message}],
            }
          }

          return {
            messages: [
              ...storedMessages,
              {id: generateRandomId(), text: message, createdAt: new Date(), creator},
            ],
          }
        })
      },
    }),
    {
      name: 'messages', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      skipHydration: true,
    }
  )
)

export const useFamiliarStore = create<FamiliarStore>((set, get) => ({
  familiars: [
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
  ],
  getFamiliar: (id: string) => {
    return get().familiars.find((familiar) => familiar.id === id)
  },
  updateFamiliar: (id: string, updates: Partial<FamiliarData>) => {
    console.log(updates)
    set((state) => ({
      familiars: state.familiars.map((familiar) =>
        familiar.id === id ? {...familiar, ...updates} : familiar
      ),
    }))
  },
}))
