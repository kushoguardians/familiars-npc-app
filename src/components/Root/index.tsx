'use client'

import {Inter} from 'next/font/google'
import {cn} from '@/lib/utils'

const inter = Inter({subsets: ['latin']})

type Props = {
  children: React.ReactNode
}

const Root = ({children}: Props) => {

  return (
    <html lang="en" className={'dark'}>
      <body className={cn(inter.className, 'dark:bg-zinc-900')}>
        {children}
      </body>
    </html>
  )
}

export default Root