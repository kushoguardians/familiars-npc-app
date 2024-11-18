'use client'

import {create} from 'zustand'
import {getGifFileName} from './utils'

type Message = {
  id: string
  from: string
  to: string
  text: string
  createdAt: Date
  type: string
}

type MessageState = {
  messages: Message[]
  setMessages: (from: string, to: string, name: string) => void
  sendMessage: (from: string, to: string, message: string, type: string) => void
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
  address: string
  tokenId: number
  item: number
}

interface FamiliarStore {
  familiars: FamiliarData[]
  setFamiliars: () => void
  getFamiliar: (id: string) => FamiliarData | undefined
  updateFamiliar: (id: string, updates: Partial<FamiliarData>) => void
}

export const useMessages = create<MessageState>((set, get) => ({
  messages: [], // No longer retrieves from storage
  clearMessages: () => {
    set({messages: []})
  },
  setMessages: async (from: string, to: string, name: string) => {
    if (from === '') return
    try {
      const response = await fetch(`/api/chat/conversations?from=${from}&to=${to}`)
      const data = await response.json()

      if (response.ok && data.success) {
        const conversations = await data.conversations.map((chat: any) => ({
          id: chat._id,
          from: chat.from,
          to: chat.to,
          text: chat.message,
          createdAt: new Date(chat.createdAt),
          type: chat.type,
        }))
        console.log('@@@ conversations:', conversations)
        if (conversations.length === 0) {
          const welcomeMessage = `Ah, greetings, adventurer! Welcome to the Kusho World, where magic and wonder collide with your destiny. My name is ${name}, and I'm here to guide you.`
          const welcomeMessage2 =
            'In this realm, Familiars like me are more than companions; we are partners in adventure, wisdom, and growth. From soaring through the skies with Adarnas to uncovering secrets with cunning Duwendes, the possibilities are as vast as the stars above.'
          const welcomeMessage3 =
            'You will care for us, guide us, and even test your mettle in thrilling challenges. Together, we will unlock the mysteries of this enchanting land. Now, step forward and begin your journey!'
          const welcomeMessage4 = 'Start by connecting your wallet and talk to us!'
          await get().sendMessage(from, to, welcomeMessage, 'AI')
          await get().sendMessage(from, to, welcomeMessage2, 'AI')

          await get().sendMessage(from, to, welcomeMessage3, 'AI')

          await get().sendMessage(from, to, welcomeMessage4, 'AI')
          return
        }
        set({messages: conversations})
      } else {
        console.error('Failed to fetch conversations:', data.error)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  },
  sendMessage: async (from: string, to: string, text: string, type: string) => {
    try {
      // Call the send API
      const response = await fetch(`/api/chat/send`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({from, to, message: text, type}),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const newMessage = {
          id: data.chat._id,
          from: data.from,
          to: data.to,
          text: data.chat.message,
          createdAt: new Date(data.chat.timestamp),
          type: data.chat.type,
        }

        // Update local state with the new message
        set((state) => ({
          messages: [...state.messages, newMessage],
        }))
      } else {
        console.error('Failed to send message:', data.error)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  },
}))

export const useFamiliarStore = create<FamiliarStore>((set, get) => ({
  familiars: [],
  getFamiliar: (id: string) => {
    return get().familiars.find((familiar) => familiar.id === id)
  },
  setFamiliars: async () => {
    try {
      const response = await fetch('/api/multicall/npc-stats', {
        method: 'post',
        body: JSON.stringify({tokenIds: [1, 2, 3, 4]}),
      })
      const data = await response.json()
      if (response.ok && data) {
        console.log(data.data)
        const familiars = data.data.map((familiar: any) => ({
          id: familiar.name.toString().toLowerCase(),
          name: familiar.name,
          health: familiar.health,
          food: parseInt(familiar.food),
          coins: parseInt(familiar.coins),
          karmicEnergy: parseInt(familiar.karmic),
          location: familiar.location,
          story: familiar.story,
          imageUrl:
            familiar.equipments.head === '0'
              ? familiar.imageUrl
              : `/images/${getGifFileName(familiar.name.toString().toLowerCase())}`,
          address: familiar.address,
          tokenId: familiar.tokenId,
          item: parseInt(familiar.equipments.head),
        }))
        set({familiars: familiars})
      } else {
        console.error('Failed to get familiar:', data.error)
      }
    } catch (error) {
      console.error('Failed to call the multicall api', error)
    }
  },
  updateFamiliar: (id: string, updates: Partial<FamiliarData>) => {
    set((state) => ({
      familiars: state.familiars.map((familiar) =>
        familiar.id === id ? {...familiar, ...updates} : familiar
      ),
    }))
  },
}))
