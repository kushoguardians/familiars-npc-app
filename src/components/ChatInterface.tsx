'use client'

import {Trash} from 'lucide-react'
import {FormEvent, useEffect, useState} from 'react'

import Chat from '@/components/Chat'
import {Separator} from '@/components/ui/separator'
import {FamiliarData, useFamiliarStore, useMessages} from '@/lib/store'

const ChatInterface = ({familiar}: {familiar: FamiliarData}) => {
  const {messages, setMessages, clearMessages} = useMessages()

  // Input, loading, and completion state
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [completion, setCompletion] = useState<string>('')
  const {updateFamiliar} = useFamiliarStore()

  const fetchCompletion = async () => {
    try {
      setIsLoading(true)
      setCompletion('')

      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: input, familiar}),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.aiResponse) {
        setCompletion(result.aiResponse)
      }

      if (result.actionToTake) {
        // Perform the action based on `actionToTake`
        switch (result.actionToTake) {
          case 'goToGatheringArea':
            console.log('Going to the Gathering Area')
            updateFamiliar(familiar.id, {
              health: familiar.health - 2,
              karmicEnergy: familiar.karmicEnergy + Math.floor(Math.random() * 2), // Adds 0 or 1 karmic energy
              location: 'Gathering Area',
            })
            break

          case 'goToHome':
            console.log('Returning Home')
            if (familiar.food >= 2) {
              updateFamiliar(familiar.id, {
                location: 'Home',
                health: Math.min(100, familiar.health + 2), // Cap health at 100
                food: familiar.food - 2,
              })
            } else {
              console.log('Not enough food to go Home')
            }
            break

          case 'goToKarmicTower':
            console.log('Going to the Karmic Tower')
            updateFamiliar(familiar.id, {
              location: 'Karmic Tower',
              karmicEnergy: familiar.karmicEnergy + Math.floor(Math.random() * 3) + 1, // Adds 1-3 karmic energy
              health: familiar.health - 1,
            })
            break

          case 'deposit5KarmicEnergy':
            console.log('Depositing 5 Karmic Energy at the Karmic Wellspring')
            if (familiar.karmicEnergy >= 5) {
              updateFamiliar(familiar.id, {
                karmicEnergy: familiar.karmicEnergy - 5,
                coins: familiar.coins + 3,
                food: familiar.food + 3,
                location: 'Karmic Wellspring',
              })
            } else {
              console.log('Not enough karmic energy to deposit')
            }
            break

          case 'deposit10KarmicEnergy':
            console.log('Depositing 10 Karmic Energy at the Karmic Wellspring')
            if (familiar.karmicEnergy >= 10) {
              updateFamiliar(familiar.id, {
                karmicEnergy: familiar.karmicEnergy - 10,
                coins: familiar.coins + 9,
                food: familiar.food + 9,
                location: 'Karmic Wellspring',
              })
            } else {
              console.log('Not enough karmic energy to deposit')
            }
            break

          case 'deposit20KarmicEnergy':
            console.log('Depositing 20 Karmic Energy at the Karmic Wellspring')
            if (familiar.karmicEnergy >= 20) {
              updateFamiliar(familiar.id, {
                karmicEnergy: familiar.karmicEnergy - 20,
                coins: familiar.coins + 19,
                food: familiar.food + 19,
                location: 'Karmic Wellspring',
              })
            } else {
              console.log('Not enough karmic energy to deposit')
            }
            break

          case 'buyTreasureBox':
            console.log('Buying a Treasure Box')
            if (familiar.coins >= 5) {
              const treasure = Math.floor(Math.random() * 20) + 1 // Gacha system for 1-20 coins
              updateFamiliar(familiar.id, {
                coins: familiar.coins - 5 + treasure,
                location: 'Marketplace',
              })
              console.log(`Treasure box yielded ${treasure} coins`)
            } else {
              console.log('Not enough coins to buy a treasure box')
            }
            break

          case 'buyFood':
            console.log('Buying Food')
            if (familiar.coins >= 1) {
              updateFamiliar(familiar.id, {
                coins: familiar.coins - 1,
                food: familiar.food + 1,
                location: 'Marketplace',
              })
            } else {
              console.log('Not enough coins to buy food')
            }
            break

          default:
            console.log('No valid action')
        }
      }
    } catch (error) {
      console.error('Error fetching completion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input) return

    setMessages('USER', input)
    await fetchCompletion()
    setInput('')
  }

  useEffect(() => {
    if (!completion || isLoading) return
    setMessages('AI', completion)
  }, [completion, isLoading, setMessages])

  return (
    <div className="z-10 flex h-screen flex-col gap-5 p-5">
      <header className="flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Chat with {familiar.name} </h1>
      </header>
      <Chat messages={messages} />
      <Separator />
      <Chat.Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onSubmit={onSubmit}
        disabled={isLoading}
      />
      <div
        className="flex cursor-pointer items-center gap-2 text-xs text-red-500"
        onClick={clearMessages}>
        <Trash className="h-4 w-4" /> Clear Chat
      </div>
    </div>
  )
}

export default ChatInterface
