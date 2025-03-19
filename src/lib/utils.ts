import {type ClassValue, clsx} from 'clsx'
import {format} from 'date-fns'
import {Children, ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return format(new Date(date), ' - dd/MM/yy HH:mm')
}

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export type CodeBlockChild = {
  props: {
    children: ReactNode[]
  }
}

export const extractTextFromCodeBlock = (child: CodeBlockChild): string => {
  if (typeof child === 'string') {
    return child
  } else if (child?.props?.children) {
    return (
      Children.toArray(child.props.children)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((nestedChild: any) => extractTextFromCodeBlock(nestedChild))
        .join('')
    )
  } else {
    return ''
  }
}

export function parseMimeType(mimeType: string) {
  switch (mimeType) {
    case 'js':
      return 'javascript'
    case 'ts':
      return 'typescript'
    case 'py':
      return 'python'
    case 'txt':
      return 'text'
    case 'md':
      return 'markdown'
    case 'jsx':
    case 'tsx':
      return 'reactjs'
    default:
      return mimeType
  }
}

export function getGifFileName(id: string) {
  return `${id}-clothes.gif`
}
