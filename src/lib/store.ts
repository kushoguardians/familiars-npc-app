'use client'

import {create} from 'zustand'

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
  setMessages: (from: string, to: string) => void
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
  setMessages: async (from: string, to: string) => {
    if (from === '') return
    try {
      const response = await fetch(`/api/chat/conversations?from=${from}&to=${to}`)
      const data = await response.json()

      if (response.ok && data.success) {
        const conversations = data.conversations.map((chat: any) => ({
          id: chat._id,
          from: chat.from,
          to: chat.to,
          text: chat.message,
          createdAt: new Date(chat.createdAt),
          type: chat.type,
        }))

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
        const familiars = data.data.map((familiar: any) => ({
          id: familiar.name.toString().toLowerCase(),
          name: familiar.name,
          health: familiar.health,
          food: parseInt(familiar.food),
          coins: parseInt(familiar.coins),
          karmicEnergy: parseInt(familiar.karmic),
          location: familiar.location,
          story: familiar.story,
          imageUrl: familiar.imageUrl,
          address: familiar.address,
          tokenId: familiar.tokenId,
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
