'use client'

import {FormEvent, useEffect, useState} from 'react'
// import { ethers } from 'ethers'

import Chat from '@/components/Chat'
import {Separator} from '@/components/ui/separator'
import {FamiliarData, useFamiliarStore, useMessages} from '@/lib/store'

const ChatInterface = ({familiar}: {familiar: FamiliarData}) => {
  const {messages, setMessages, sendMessage, clearMessages} = useMessages()

  // Input, loading, and completion state
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [completion, setCompletion] = useState<string>('')
  const [walletAddress, setWalletAddress] = useState<string>('')
  const {updateFamiliar} = useFamiliarStore()

  // MetaMask connection logic
  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed!')
        return
      }
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // Request access to the user's MetaMask accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      // Get the connected Ethereum address
      const address = accounts[0]
      // const signer = provider.getSigner()
      setWalletAddress(address)
    } catch (error) {
      console.error('Error connecting MetaMask:', error)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress('') // Clear wallet address state
  }

  const formatAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`

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

      // if (result.aiResponse) {
      //   setCompletion(result.aiResponse)
      // }
      let aiResponse = result.aiResponse
      if (result.actionToTake) {
        // Perform the action based on `actionToTake`
        switch (result.actionToTake) {
          case 'goToGatheringArea': {
            console.log('Going to the Gathering Area')
            const data = await fetch('/api/multicall/npc-actions/go-to-location', {
              method: 'post',
              body: JSON.stringify({tokenId: familiar.tokenId, locationId: 3}),
            })
            const response = await data.json()
            const stats = response.data.stats

            updateFamiliar(familiar.id, {
              health: parseInt(stats.health),
              karmicEnergy: parseInt(stats.karmic),
              location: stats.location,
            })
            break
          }

          case 'goToHome':
            console.log('Returning Home')
            if (familiar.food < 2) {
              aiResponse = 'I need more food to go Home'
            } else {
              const data = await fetch('/api/multicall/npc-actions/go-to-location', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, locationId: 2}),
              })
              const response = await data.json()
              const stats = response.data.stats

              updateFamiliar(familiar.id, {
                health: parseInt(stats.health),
                food: parseInt(stats.food),
                location: stats.location,
              })
            }
            break

          case 'goToKarmicTower': {
            console.log('Going to the Karmic Tower')

            if (familiar.food < 2) {
              aiResponse = "I'm sorry but I don't have enough food to go to the Karmic Tower."
              break
            }

            let data = await fetch('/api/multicall/npc-actions/go-to-location', {
              method: 'post',
              body: JSON.stringify({tokenId: familiar.tokenId, locationId: 1}),
            })
            const response = await data.json()
            const stats = response.data.stats

            updateFamiliar(familiar.id, {
              health: parseInt(stats.health),
              karmicEnergy: parseInt(stats.karmic),
              location: stats.location,
            })
            break
          }
          case 'deposit5KarmicEnergy':
            console.log('Depositing 5 Karmic Energy at the Karmic Wellspring')
            if (familiar.karmicEnergy < 5) {
              console.log('Not enough karmic energy to deposit')
              aiResponse = "I don't have enough karmic energy to deposit"
            } else {
              const locData = await fetch('/api/multicall/npc-actions/go-to-location', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, locationId: 0}),
              })

              const locResponse = await locData.json()
              const locStats = locResponse.data.stats

              const data = await fetch('/api/multicall/npc-actions/exchange-karmic', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, karmicEnergyAmt: 5}),
              })

              const response = await data.json()
              const stats = response.data.stats

              updateFamiliar(familiar.id, {
                karmicEnergy: familiar.karmicEnergy - 5,
                coins: familiar.coins + 3,
                food: familiar.food + 3,
                location: 'Karmic Wellspring',
              })
            }
            break

          case 'deposit10KarmicEnergy':
            console.log('Depositing 10 Karmic Energy at the Karmic Wellspring')
            if (familiar.karmicEnergy < 10) {
              console.log('Not enough karmic energy to deposit')
              aiResponse = "I don't have enough karmic energy to deposit"
            } else {
              const locData = await fetch('/api/multicall/npc-actions/go-to-location', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, locationId: 0}),
              })

              const locResponse = await locData.json()
              const locStats = locResponse.data.stats

              const data = await fetch('/api/multicall/npc-actions/exchange-karmic', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, karmicEnergyAmt: 10}),
              })

              const response = await data.json()
              const stats = response.data.stats

              updateFamiliar(familiar.id, {
                karmicEnergy: familiar.karmicEnergy - 10,
                coins: familiar.coins + 9,
                food: familiar.food + 9,
                location: 'Karmic Wellspring',
              })
            }
            break

          case 'deposit20KarmicEnergy':
            console.log('Depositing 20 Karmic Energy at the Karmic Wellspring')
            if (familiar.karmicEnergy < 20) {
              aiResponse = "I don't have enough karmic energy to deposit"
            } else {
              const locData = await fetch('/api/multicall/npc-actions/go-to-location', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, locationId: 0}),
              })

              const locResponse = await locData.json()
              const locStats = locResponse.data.stats

              const data = await fetch('/api/multicall/npc-actions/exchange-karmic', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, karmicEnergyAmt: 20}),
              })

              const response = await data.json()
              const stats = response.data.stats
              updateFamiliar(familiar.id, {
                karmicEnergy: familiar.karmicEnergy - 20,
                coins: familiar.coins + 19,
                food: familiar.food + 19,
                location: 'Karmic Wellspring',
              })
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
            if (familiar.coins < 1) {
              aiResponse = "I don't have enough coins to buy food"
            } else {
              const locData = await fetch('/api/multicall/npc-actions/go-to-location', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, locationId: 4}),
              })

              const locResponse = await locData.json()
              const locStats = locResponse.data.stats

              const data = await fetch('/api/multicall/npc-actions/buy-food', {
                method: 'post',
                body: JSON.stringify({tokenId: familiar.tokenId, coinsAmt: 1}),
              })

              const response = await data.json()
              const stats = response.data.stats

              updateFamiliar(familiar.id, {
                coins: familiar.coins - 1,
                food: familiar.food + 1,
                location: 'Marketplace',
              })
            }
            break

          default:
            console.log('No valid action')
        }
      }

      if (result.aiResponse) {
        setCompletion(aiResponse)
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

    // setMessages(walletAddress, familiar.address, input, 'USER' )
    sendMessage(walletAddress, familiar.address, input, 'USER')
    await fetchCompletion()
    setInput('')
  }

  useEffect(() => {
    if (!completion || isLoading) return
    sendMessage(familiar.address, walletAddress, completion, 'AI')
  }, [completion, isLoading, setMessages])

  useEffect(() => {
    setMessages(walletAddress, familiar.address)
  }, [walletAddress])

  useEffect(() => {
    clearMessages()
  }, [])

  return (
    <div className="z-10 flex h-screen flex-col gap-5 p-5">
      <header className="flex items-center justify-between border-b">
        <span className="text-xl">Chat with {familiar.name}</span>
        <div className="flex flex-col items-end">
          {walletAddress ? (
            <div className="text-sm">
              <span>{formatAddress(walletAddress)}</span>
              <button
                className="ml-1 mt-1 rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
              onClick={connectMetaMask}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>
      <Chat messages={messages} familiar={familiar} />
      <Separator />
      <Chat.Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onSubmit={onSubmit}
        disabled={isLoading || walletAddress === ''}
      />
    </div>
  )
}

export default ChatInterface
