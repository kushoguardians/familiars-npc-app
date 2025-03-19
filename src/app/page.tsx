'use client'

import Link from 'next/link'
// import {Button} from '@/components/ui/button'
import {useFamiliarStore} from '@/lib/store'
import {useEffect} from 'react'
import Image from 'next/image'
import {Roboto} from 'next/font/google'

const roboto = Roboto({weight: '400', subsets: ['latin']})
const robotoBold = Roboto({weight: '700', subsets: ['latin']})

export default function Home() {
  const {familiars, setFamiliars} = useFamiliarStore()

  console.log(familiars)
  useEffect(() => {
    setFamiliars()
  }, [setFamiliars])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 bg-[url('/assets/BG.png')] bg-cover bg-center p-8 text-white">
      <div className="text-center">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={662}
          height={265}
          objectFit="contain"
          className="object-cover"
        />
        <p className={`text-xl text-white ${roboto.className}`}>
          Embark on a journey to save the Kusho World!
        </p>
      </div>
      <Link href={`/familiars`}>
        <button className="relative">
          <Image
            src="/assets/play.png"
            alt="Logo"
            width={270}
            height={84}
            objectFit="contain"
            className="object-cover"
          />
          <p
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold ${robotoBold.className}`}>
            PLAY
          </p>
        </button>
      </Link>
    </div>
  )
}
