import 'highlight.js/styles/github-dark.css'
import type {Metadata} from 'next'

import Root from '@/components/Root'

import './globals.css'

export const metadata: Metadata = {
  title: 'Familiars Guardians',
  description: 'Familiars Guardians App',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <Root>{children}</Root>
}