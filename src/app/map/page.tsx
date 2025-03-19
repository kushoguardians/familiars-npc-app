'use client'

import dynamic from 'next/dynamic'

const GameWithoutSSR = dynamic(() => import('./game'), {ssr: false})

export default function Page() {
  return <GameWithoutSSR />
}
