'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {useFamiliarStore} from '@/lib/store'
import {useEffect} from 'react'
import Image from "next/image";


export default function Home() {
  const {familiars, setFamiliars} = useFamiliarStore()

  useEffect(() => {
    setFamiliars()
  }, [setFamiliars])

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-[url('/assets/BG.png')] bg-cover bg-center p-8 gap-16 text-white">
      <div className="text-center">
        <Image
            src="/assets/logo.png"
            alt="Logo"
            width={662}
            height={265}
            objectFit="contain"
            className="object-cover"
        />
        <p className="text-white text-xl">Embark on a journey to save the Kusho World!</p>
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
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl">PLAY</p>
        </button>
      </Link>
    </div>
  )
}
