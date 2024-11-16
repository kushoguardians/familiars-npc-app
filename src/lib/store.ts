'use client'

import {create} from 'zustand'

type Message = {
  id: string
  from: string,
  to: string,
  text: string
  createdAt: Date
  type: string
}

type MessageState = {
  messages: Message[]
  setMessages: (from: string, to: string ) => void
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
}

interface FamiliarStore {
  familiars: FamiliarData[]
  getFamiliar: (id: string) => FamiliarData | undefined
  updateFamiliar: (id: string, updates: Partial<FamiliarData>) => void
}

const generateRandomId = () => Math.random().toString(36).substring(2, 9)

export const useMessages = create<MessageState>((set, get) => ({
  messages: [], // No longer retrieves from storage
  clearMessages: () => {
    set({ messages: [] });
  },
  setMessages: async (from: string, to: string ) => {
    if (from === '') return;
    try {
      const response = await fetch(`/api/chat/conversations?from=${from}&to=${to}`);
      const data = await response.json();

      if (response.ok && data.success) {
        const conversations = data.conversations.map((chat: any) => ({
          id: chat._id,
          from: chat.from,
          to: chat.to,
          text: chat.message,
          createdAt: new Date(chat.createdAt),
          type: chat.type,
        }));

        set({ messages: conversations });
      } else {
        console.error('Failed to fetch conversations:', data.error);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  },
  sendMessage: async (from: string, to: string, text: string, type: string) => {
    try {
      // Call the send API
      const response = await fetch(`/api/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, message: text, type }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const newMessage = {
          id: data.chat._id,
          from:data.from,
          to:data.to,
          text: data.chat.message,
          createdAt: new Date(data.chat.timestamp),
          type: data.chat.type,
        };

        // Update local state with the new message
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      } else {
        console.error('Failed to send message:', data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  },
}));

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
      imageUrl: '/images/duwende-idle.gif',
      address: '0x5B64D5199e0D689bFc9c78A06d7D8b480065a4B8'
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
      imageUrl: '/images/adarna-idle.gif',
      address: '0x0Ad7cb243C9846f4af7f2A47B6DDD6e0Aaf68951'
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
      imageUrl: '/images/sundo-idle.gif',
      address: '0xA8e757b5e66ba4141924F12F0De6ae8849A181F5'
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
      imageUrl: '/images/diwata-idle.gif',
      address: '0x4d61C430268d53b423DC465dC606268290cA2Ba3'
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
