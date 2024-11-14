'use client'

import { useEffect, useRef, useState } from "react";
import StartGame from "./main";

export default function Page() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const game = useRef<Phaser.Game | null>(null!);

    useEffect(() => {
        game.current = StartGame();
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
              x: event.clientX,
              y: event.clientY,
            });
          };
      
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <main className="flex justify-center items-center h-screen">
        <div id="game-container" className="w-screen h-full m-auto">
        </div>
       <div
         className="top-0 left-0 parallax-background w-screen min-h-screen h-full bg-[url('/assets/BG.png')] bg-cover bg-center bg-repeat fixed"
         style={{
           transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px) scale(1.2)`,
           zIndex: -1,
         }}
       />
    </main>
}