'use client'

import {useEffect, useRef, useState} from 'react'
import StartGame from './main'
import {useFamiliarStore} from '@/lib/store'
import {EventBus} from './EventBus'

export default function Game() {
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setFamiliars = useFamiliarStore((state: any) => state.setFamiliars)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const familiars = useFamiliarStore((state: any) => state.familiars)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const duwendeLoc = useFamiliarStore((state: any) => state.getFamiliar('duwende')?.location)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adarnaLoc = useFamiliarStore((state: any) => state.getFamiliar('adarna')?.location)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sundoLoc = useFamiliarStore((state: any) => state.getFamiliar('sundo')?.location)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const diwataLoc = useFamiliarStore((state: any) => state.getFamiliar('diwata')?.location)
  const game = useRef<Phaser.Game | null>(null!)

  useEffect(() => {
    EventBus.emit('changeLoc', {familiar: 'duwende', location: duwendeLoc})
  }, [duwendeLoc])

  useEffect(() => {
    EventBus.emit('changeLoc', {familiar: 'diwata', location: diwataLoc})
  }, [diwataLoc])

  useEffect(() => {
    EventBus.emit('changeLoc', {familiar: 'sundo', location: sundoLoc})
  }, [sundoLoc])

  useEffect(() => {
    EventBus.emit('changeLoc', {familiar: 'adarna', location: adarnaLoc})
  }, [adarnaLoc])

  useEffect(() => {
    if (familiars.length == 0) {
      setFamiliars()
    }
  }, [familiars])

  useEffect(() => {
    game.current = StartGame({
      adarna: adarnaLoc,
      sundo: sundoLoc,
      diwata: diwataLoc,
      duwende: duwendeLoc,
    })
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    //TODO: Change to listen to goTo events from smartcontract;
    const interval = setInterval(setFamiliars, 5000)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
      if (game.current) {
        game.current.destroy(true)
      }
    }
  }, [])

  return (
    <main className="flex h-screen items-center justify-center">
      <div id="game-container" className="m-auto h-full w-screen"></div>
      <div
        className="parallax-background fixed left-0 top-0 h-full min-h-screen w-screen bg-[url('/assets/BG.png')] bg-cover bg-center bg-repeat"
        style={{
          transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px) scale(1.2)`,
          zIndex: -1,
        }}
      />
    </main>
  )
}
