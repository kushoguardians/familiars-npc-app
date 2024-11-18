'use client'

import {FamiliarData, useFamiliarStore} from '@/lib/store'
import {getGifFileName} from '@/lib/utils'
import {CheckCircle} from 'lucide-react'
import React, {useEffect, useState} from 'react'

interface EquipModalProps {
  isOpen: boolean
  familiar: FamiliarData
  onClose: () => void
}

interface Item {
  id: number
  name: string
  image: string
  isEquipped: boolean
  isDisabled: boolean
}

const EquipModal = ({isOpen, familiar, onClose}: EquipModalProps) => {
  const [items, setItems] = useState<Item[]>([
    {id: 1, name: 'Sundo Cloak', image: '/items/1.png', isEquipped: false, isDisabled: true},
    {id: 2, name: 'Adarna Feather', image: '/items/2.png', isEquipped: false, isDisabled: true},
    {id: 3, name: 'Diwata Leaf', image: '/items/3.png', isEquipped: false, isDisabled: true},
    {id: 4, name: 'Duwende Helmet', image: '/items/4.png', isEquipped: false, isDisabled: true},
  ])
  const [loading, setLoading] = useState(true)
  const {updateFamiliar} = useFamiliarStore()

  useEffect(() => {
    const initializeItems = async () => {
      setLoading(true)
      try {
        const updatedItems = await Promise.all(
          items.map(async (item) => {
            const response = await fetch('/api/multicall/npc-items/get-item', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({account: familiar.address, id: item.id}),
            })

            if (!response.ok) {
              console.error(`Failed to fetch status for item ${item.name}`)
              return item
            }

            const {data} = await response.json()
            return {
              ...item,
              isDisabled: parseInt(data) === 0,
              isEquipped: familiar.item === item.id,
            }
          })
        )

        setItems(updatedItems)
      } catch (error) {
        console.error('Error initializing items:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      initializeItems()
    }
  }, [isOpen, familiar.address, familiar.item])

  const toggleEquip = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isEquipped: item.id === id ? !item.isEquipped : false, // Only one equipped at a time
      }))
    )
  }

  const handleDone = async () => {
    try {
      const equippedItem = items.find((item) => item.isEquipped)
      console.log(equippedItem)
      // const data = await fetch('/api/multicall/npc-items/equip-item', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({
      //     tokenId: familiar.tokenId,
      //     headTokenId: equippedItem?.id || 0,
      //     mouthTokenId: 0,
      //   }),
      // })

      const data = await fetch('/api/multicall/npc-items/equip-item', {
        method: 'post',
        body: JSON.stringify({
          tokenId: familiar.tokenId,
          headTokenId: equippedItem?.id || 0,
          mouthTokenId: familiar.item,
        }),
      })
      const response = await data.json()
      const stats = response.data.stats
      updateFamiliar(familiar.id, {
        item: parseInt(stats.equipments.head),
        imageUrl:
          stats.equipments.head === '0'
            ? familiar.imageUrl
            : `/images/${getGifFileName(familiar.name.toString().toLowerCase())}`,
      })
      onClose() // Close modal after saving
    } catch (error) {
      console.error('Error saving equipped item:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[600px] rounded-lg bg-gray-800 p-6 text-white shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Equip Items</h2>
        {loading ? (
          <p>Loading items...</p>
        ) : (
          <>
            <p>Select an item to equip for your familiar.</p>
            <div className="flex justify-center gap-4 overflow-x-auto py-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleEquip(item.id)}
                  disabled={item.isDisabled}
                  className={`relative flex flex-col items-center rounded-lg p-3 ${
                    item.isDisabled
                      ? 'cursor-not-allowed bg-gray-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`mb-2 h-20 w-20 object-contain ${
                      item.isDisabled ? 'grayscale' : ''
                    }`}
                  />
                  <span className="text-sm font-semibold">{item.name}</span>
                  {/* Checkmark */}
                  {item.isEquipped && (
                    <CheckCircle className="absolute -right-2 -top-2 h-6 w-6 text-green-500" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-5 rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                onClick={onClose}>
                Close
              </button>
              <button
                className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
                onClick={handleDone}>
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EquipModal
