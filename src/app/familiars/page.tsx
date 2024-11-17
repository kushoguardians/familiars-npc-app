'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {useFamiliarStore} from '@/lib/store'
import {useEffect} from 'react'
import {Roboto} from 'next/font/google'

const roboto = Roboto({weight: '400', subsets: ['latin']})

export default function Page() {
  const {familiars, setFamiliars} = useFamiliarStore()

  useEffect(() => {
    setFamiliars()
  }, [setFamiliars])

  return (
    <div
      className={`flex min-h-screen flex-col items-center gap-16 bg-[url('/assets/BG.png')] bg-cover bg-center p-8 text-white ${roboto.className}`}>
      <header className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-indigo-300">Familiars Guardians</h1>
        <p className="text-lg text-gray-400">Embark on a journey to save the Kusho World!</p>
      </header>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2">
        {familiars.map((familiar) => (
          <Link href={`/npc/${familiar.id}`} key={familiar.name}>
            <div className="transform overflow-hidden rounded-lg bg-gray-800 shadow-lg transition duration-300 hover:scale-105 hover:bg-gray-700">
              <img
                src={familiar.imageUrl}
                alt={familiar.name}
                className="h-48 w-full object-cover opacity-80 transition duration-300 hover:opacity-100"
              />
              <div className="p-4">
                <h2 className="mb-2 text-2xl font-semibold text-indigo-200">{familiar.name}</h2>
                <p className="text-sm text-gray-400">{familiar.story.split('.')[0]}.</p>
                <Button
                  variant="outline"
                  className="mt-4 w-full justify-center border-indigo-500 text-indigo-300 hover:border-indigo-300 hover:text-indigo-100">
                  Talk to {familiar.name}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
